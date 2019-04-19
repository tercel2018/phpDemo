/*
 * @Author: 陈航
 * @Date: 2018-09-17 14:35:55
 * @Last Modified by: 陈航
 * @说明：订购记录
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  justify-content: @justify;
  align-items: @align;
}
.wrapper{
  font-size: @f7;
  text-align: center;
  padding-bottom: 20vw;
  .tab-wrapper{
    position:fixed;
    top:12vw;
    left:0;
    z-index:99;
    width:100%;
  }
  .vux-search-fixed-wrapper{
    position:fixed;
    top:calc(~'24px + 12vw');
    top:-webkit-calc(~'44px + 12vw');
    left:0;
    width:100%;
    height:44px;
    z-index:899;
    background-color: #EFEFF4;
    font-size: @f7;
    line-height: 28px;
  }
  .recordList{
    padding:12vw 3vw 0;
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
          .left{
            .sub{
              font-size:@f6;
            }
          }
        }
        .bottom{
          .flexUi(space-between);
          padding:1vw 0;
          font-size:@f5;
          color:@6;
        }
      }
    }
  }
}
</style>
<template>
  <div class="wrapper">
    <!-- 头部 -->
    <header-basic title="订购记录"></header-basic>
    <!-- 导航 -->
    <div class="tab-wrapper">
      <tab bar-active-color="#1699e7" active-color="#1997e3" :scroll-threshold="4">
        <tab-item style="min-width: 110px;padding: 0 5px" :selected="currLi===-1?true:false" @on-item-click="filterFun(-1)">全部</tab-item>
        <tab-item style="min-width: 110px;padding: 0 5px" v-for="(i,index) in serviceList" :selected="currLi===i.service_id?true:false" :key="index" @on-item-click="filterFun(i.service_id)">{{i.service_name}}</tab-item>
      </tab>
    </div>
    <!-- 搜索框 -->
    <div class="vux-search-fixed-wrapper" v-if="recordList && recordList.length">
      <search v-model="tenant_name" @on-submit="searchService"  @on-blur="searchService" @on-clear="searchService" ref="search" placeholder = "输入公司名称"></search>
    </div>
    <div class="recordList">
      <ul v-if="recordList && recordList.length">
        <li v-for="(i,j) in recordList" :key="j">
          <div class="top">
            <p class="left">{{i.service_name}}x{{i.duration_name}} <span class="sub">(<span class="red">{{i.status}}</span>)</span></p>
            <p class="right">{{$f(i.amount)}}</p>
          </div>
          <div class="bottom">
            <p class="left">公司名称：{{i.tenant_name}}</p>
            <p class="right">购买时间：{{i.add_time}}</p>
          </div>
        </li>
      </ul>
      <!-- 没有订购记录 -->
      <no-data v-if="!serviceCount" tips="订购记录">
        <span class="blue" @click="$router.push('service_serviceBuy')">服务购买</span>
      </no-data>
      <no-data v-else-if="!loadMoreStatus && !recordList.length" :tips="tips"></no-data>
      <!-- 加载更多 -->
      <load-more v-show="recordList && recordList.length" :show-loading="loadMoreStatus" :tip="loadMoreMsg" background-color="#fbf9fe"></load-more>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, LoadMore, Search } from 'vux'
import noData from '@/components/common/noData'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { Tab, TabItem, LoadMore, noData, headerBasic, Search },
  data() {
    return {
      // 服务检索
      serviceList: null,
      // 订购记录列表
      recordList: [],
      // 会员服务信息
      serviceCount: 0,
      // 公司名称检索
      tenant_name: '',
      // sesssionStorage.buyRecordObj数据来自
      buyRecordFromSession: false,
      // 请求次数
      requestNum: 0,
      // 每页数据条数
      pageSize: 10,
      // 当前导航条数
      currTotalCount: 0,
      // 当前页数
      currPage: 1,
      // 当前服务 -1默认全部，其他为字段service_id
      currLi: -1,
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
      if (val === 3) {
        this.$nextTick(() => {
          this.$loading()
        })
      }
    }
  },
  methods: {
    // 检索订单
    searchService() {
      this.$nextTick(() => {
        this.currPage = 1
        this.currTotalCount = 0
        this.getRecordList()
      })
    },
    // 点击导航
    filterFun(id) {
      if (this.currLi === id) return false
      this.currLi = id
      this.currPage = 1
      this.currTotalCount = 0
      this.getRecordList()
    },
    // 获取订购数据
    getRecordList(field = '') {
      this.loadMoreStatus = true
      this.loadMoreMsg = '正在加载'
      let msg = '订购记录'
      if (this.currLi !== -1) field += '&service_id=' + this.currLi
      field += '&tenant_name=' + this.tenant_name + '&page_size=' + this.pageSize + '&page=' + this.currPage
      this.tips = msg
      if (this.currPage <= 1) {
        this.$loading(`加载${msg}数据...`)
      }
      this.$fetch.serviceBuyRecord(field).then(({ list, pagination }) => {
        if (this.currPage === 1) {
          this.recordList = list
        } else {
          this.recordList = this.recordList.concat(list)
        }
        this.currTotalCount = pagination.totalCount
        let maxPage = Math.ceil(this.currTotalCount / this.pageSize)
        if (maxPage > this.currPage) {
          this.loadMoreMsg = '加载更多'
        } else {
          this.loadMoreMsg = '我是有底线的'
        }
        this.loadMoreStatus = false
        if (this.requestNum < 3) this.requestNum++
        else this.$loading()
      })
    },
    // 获取会员服务列表
    serviceUserServiceCount() {
      let service_id = ''
      if (sessionStorage.buyRecordObj) {
        let buyObj = JSON.parse(sessionStorage.buyRecordObj)
        service_id = buyObj.service_id
      }
      this.$fetch.serviceUserServiceCount('&service_id=' + service_id).then(data => {
        this.serviceCount = data.total_count
        this.requestNum++
      })
    },
    // 获取服务列表
    getServiceList() {
      this.$fetch.serviceServiceList().then(data => {
        this.serviceList = data
        this.requestNum++
      })
    },
    loadMore() {
      if (this.loadMoreStatus) return false
      let isnearBottom = this.$willScrollToBottom(30)
      let maxPage = 0
      if (isnearBottom) {
        maxPage = Math.ceil(this.currTotalCount / this.pageSize)
        if (this.currPage >= maxPage) return false
        this.currPage++
        this.getRecordList()
      }
    }
  },
  activated() {
    this.requestNum = 0
    if (sessionStorage.buyRecordObj) {
      let buyObj = JSON.parse(sessionStorage.buyRecordObj)
      this.tenant_name = buyObj.tenant_name
      this.currLi = buyObj.service_id
    }
    this.getRecordList()
    this.serviceUserServiceCount()
    this.getServiceList()
    this.loadMoreFun = () => this.loadMore()
    window.addEventListener('scroll', this.loadMoreFun, false)
  },
  deactivated() {
    this.currLi = -1
    window.removeEventListener('scroll', this.loadMoreFun)
  }
}
</script>
