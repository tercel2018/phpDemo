/*
 * @Author: 陈航
 * @Date: 2018-09-17 14:35:55
 * @Last Modified by: 陈航
 * @说明：短信发送记录
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  justify-content: @justify;
  align-items: @align;
}
.wrapper{
  font-size: @f7;
  padding-bottom:20vw;
  .tab-wrapper{
    position:fixed;
    top:12vw;
    left:0;
    width:100%;
  }
  ul{
    padding-top:calc(~'16vw + 44px');
    padding-top:-webkit-calc(~'16vw + 44px');
    li{
      background-color: #fff;
      margin-bottom: 4vw;
      padding:2vw 4vw;
      .top{
        .flexUi(space-between);
        padding:1vw 0;
      }
      .middle{
        .flexUi(space-between);
        padding:1vw 0;
        font-size:@f5;
        color:@6;
      }
      .bottom{
        padding-top:1vw;
        font-size:@f5;
        line-height: 150%;
        text-align: justify;
      }
    }
  }
}
</style>
<template>
  <div class="wrapper">
    <!-- 头部 -->
    <header-basic title="短信发送记录"></header-basic>
    <!-- 导航 -->
    <div class="tab-wrapper">
      <tab bar-active-color="#1699e7" active-color="#1997e3" :scroll-threshold="5">
        <tab-item :selected="currLi===''?true:false" @on-item-click="filterFun('')">全部</tab-item>
        <tab-item v-for="(i,j,index) in status" :selected="currLi===j?true:false" :key="index" @on-item-click="filterFun(j)">{{i}}</tab-item>
      </tab>
    </div>
    <ul v-if="smsRecordList && smsRecordList.length">
      <li v-for="(i,j) in smsRecordList" :key="j">
        <div class="top">
            <p class="left">{{i.phone}}</p>
            <p class="right">{{i.status}}</p>
          </div>
          <div class="middle">
            <p class="left">公司名称：{{i.tenant_name}}</p>
            <p class="right"></p>
            </div>
          <div class="middle">
            <p class="left">发送数量：{{i.count}}</p>
            <p class="right">发送时间：{{i.add_time}}</p>
          </div>
          <div class="bottom">
            发送内容：{{i.content}}
          </div>
      </li>
    </ul>
    <!-- 没有数据 -->
    <no-data v-else :tips="tips" router="service_serviceBuy"></no-data>
    <!-- 加载更多 -->
    <load-more v-show="smsRecordList && smsRecordList.length" :show-loading="loadMoreStatus" :tip="loadMoreMsg" background-color="#fbf9fe"></load-more>
  </div>
</template>
<script>
import { Tab, TabItem, LoadMore } from 'vux'
import noData from '@/components/common/noData'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { Tab, TabItem, LoadMore, noData, headerBasic },
  data() {
    return {
      // 短信记录列表
      smsRecordList: [],
      // 短信发送状态
      status: {},
      // 时间范围数据
      add_time: '',
      // 请求次数
      requestNum: 0,
      // 当前页数
      currPage: 1,
      // 当前导航条数
      currTotalCount: 0,
      // 每页条数
      pageSize: 10,
      // 当前服务 ''默认全部
      currLi: '',
      // 是否正在加载
      loadMoreStatus: false,
      // 加载更多：正在加载 ；我是有底线的；加载更多
      loadMoreMsg: '加载更多',
      // 保存函数LoadMore的指针
      loadMoreFun: null,
      tips: ''
    }
  },
  watch: {
    requestNum(val) {
      if (val === 2) {
        this.$nextTick(() => {
          this.$loading()
        })
      }
    }
  },
  methods: {
    // 点击导航
    filterFun(key) {
      let field = ''
      if (this.currLi === key) return false
      if (key !== '' && key !== undefined) field = '&status=' + key
      this.currLi = key
      this.currPage = 1
      this.currTotalCount = 0
      this.getSmsRecord(field)
    },
    // 获取表格数据
    getSmsRecord(field = '') {
      this.loadMoreStatus = true
      this.loadMoreMsg = '正在加载'
      field += '&page_size=' + this.pageSize + '&page=' + this.currPage
      let msg = '发送记录'
      if (this.status[this.currLi]) msg = this.status[this.currLi] + '的发送记录'
      this.tips = msg
      if (this.currPage <= 1) {
        this.$loading(`加载${msg}...`)
      }
      this.$fetch.serviceUserSmsLog(field).then(({ list, pagination }) => {
        if (this.currPage === 1) {
          this.smsRecordList = list
        } else {
          this.smsRecordList = this.smsRecordList.concat(list)
        }
        this.currTotalCount = pagination.totalCount
        let maxPage = Math.ceil(this.currTotalCount / this.pageSize)
        if (maxPage > this.currPage) {
          this.loadMoreMsg = '加载更多'
        } else {
          this.loadMoreMsg = '我是有底线的'
        }
        this.loadMoreStatus = false
        if (this.requestNum < 2) this.requestNum++
        else this.$loading()
      })
    },
    // 获取短信发送状态
    serviceSmsStatus() {
      this.$fetch.serviceSmsStatus().then(data => {
        this.status = data
        this.requestNum++
      })
    },
    loadMore() {
      if (this.loadMoreStatus) return false
      let isnearBottom = this.$willScrollToBottom(30)
      let maxPage = 0
      let field = '&status=' + this.currLi
      if (isnearBottom) {
        maxPage = Math.ceil(this.currTotalCount / this.pageSize)
        if (this.currPage >= maxPage) return false
        this.currPage++
        if (this.currLi === '') field = ''
        this.getSmsRecord(field)
      }
    }
  },
  activated() {
    this.requestNum = 0
    this.getSmsRecord()
    this.serviceSmsStatus()
    this.loadMoreFun = () => this.loadMore()
    window.addEventListener('scroll', this.loadMoreFun, false)
  },
  deactivated() {
    this.currLi = ''
    this.smsRecordList = []
    window.removeEventListener('scroll', this.loadMoreFun)
  }
}
</script>
