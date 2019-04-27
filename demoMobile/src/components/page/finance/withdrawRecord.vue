/*
 * @Author: 陈航
 * @Date: 2019-01-03 15:03:46
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-01-09 11:54:02
 * @Desc: 提现记录页面
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
    width:100%;
  }
  ul{
    padding-top:calc(~'16vw + 44px');
    padding-top:-webkit-calc(~'16vw + 44px');
    li{
      text-align: left;
      background-color: #fff;
      margin-bottom: 4vw;
      padding:2vw 4vw;
      .top{
        .flexUi(space-between);
        padding:1vw 0;
        .left{
          .sub{
            font-size:@f5;
            color:@6;
          }
        }
      }
      .middle{
        padding:0.5vw 0;
        font-size:@f5;
        color:@6;
      }
    }
  }
}
</style>
<template>
  <div class="wrapper" v-show="requestNum>=2">
    <!-- 头部 -->
    <header-basic title="提现记录"></header-basic>
    <!-- 导航 -->
    <div class="tab-wrapper">
      <tab bar-active-color="#1699e7" active-color="#1997e3" :scroll-threshold="5">
        <tab-item :selected="currLi===null?true:false" @on-item-click="filterFun(null)">全部</tab-item>
        <tab-item v-for="(i,index) in withdrawStep" :selected="currLi===index?true:false" :key="index" @on-item-click="filterFun(index)">{{i}}</tab-item>
      </tab>
    </div>
    <div>
      <ul v-if="recordList && recordList.length">
        <li v-for="(i,j) in recordList" :key="j">
          <div class="top">
            <p class="left">工单号：{{i.order_sn}}</p>
            <p class="right">{{$f(parseFloat(i.amount))}}</p>
          </div>
          <p class="middle">手机号：{{i.user_mobile}}</p>
          <p class="middle">状态：{{i.status_name}}</p>
          <p class="middle" v-if="i.trade_no">交易订单号：{{i.trade_no}}</p>
          <p class="middle">申请时间：{{i.add_time}}</p>
        </li>
      </ul>
      <!-- 没有订购记录 -->
      <no-data v-if="!loadMoreStatus && !recordList.length" :tips="tips"></no-data>
      <!-- 加载更多 -->
      <load-more v-show="recordList && recordList.length" :show-loading="loadMoreStatus" :tip="loadMoreMsg" background-color="#fbf9fe"></load-more>
    </div>
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
      // 提现状态列表
      withdrawStep: {},
      // 订购记录列表
      recordList: [],
      // 请求次数
      requestNum: 0,
      // 每页数据条数
      pageSize: 10,
      // 当前导航条数
      currTotalCount: 0,
      // 当前页数
      currPage: 1,
      // 当前服务null默认全部
      currLi: null,
      // 是否正在加载
      loadMoreStatus: false,
      // 加载更多：正在加载 ；我是有底线的；加载更多
      loadMoreMsg: '加载更多',
      // 保存函数LoadMore的指针
      loadMoreFun: null,
      tips: '提现记录'
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
    filterFun(id) {
      let field = ''
      if (this.currLi === id) return false
      this.currLi = id
      if (id !== null) field = '&status=' + id
      this.currPage = 1
      this.currTotalCount = 0
      this.getRecordList(field)
    },
    // 获取订购数据
    getRecordList(field = '') {
      this.loadMoreStatus = true
      this.loadMoreMsg = '正在加载'
      let msg = '提现记录'
      for (let [_key, _value] of Object.entries(this.withdrawStep)) {
        if (_key === this.currLi) {
          msg = _value + '的提现记录'
        }
      }
      this.tips = msg
      if (this.currPage <= 1) {
        this.$loading(`加载${msg}数据...`)
      }
      field += '&page_size=' + this.pageSize + '&page=' + this.currPage
      this.$fetch.pocketGetWithdrawRecord(field).then(({ list, pagination }) => {
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
        if (this.requestNum < 2) this.requestNum++
        else this.$loading()
      })
    },
    // 获取提现状态列表
    pocketGetWithdrawStep() {
      this.$fetch.pocketGetWithdrawStep().then(data => {
        this.withdrawStep = data
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
        if (this.currLi === null) field = ''
        this.getRecordList(field)
      }
    }
  },
  activated() {
    this.requestNum = 0
    this.getRecordList()
    this.pocketGetWithdrawStep()
    this.loadMoreFun = () => this.loadMore()
    window.addEventListener('scroll', this.loadMoreFun, false)
  },
  deactivated() {
    this.currLi = null
    this.withdrawStep = {}
    window.removeEventListener('scroll', this.loadMoreFun)
  }
}
</script>
