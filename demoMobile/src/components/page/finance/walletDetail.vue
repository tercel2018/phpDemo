/*
 * @Author: 陈航
 * @Date: 2018-09-17 14:35:55
 * @Last Modified by: 陈航
 * @说明：钱包明细
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  justify-content: @justify;
  align-items: @align;
}
.wrapper{
  font-size: @f7;
  padding-bottom: 20vw;
  padding-top:calc(~'12vw + 44px');
  padding-top:-webkit-calc(~'12vw + 44px');
  .tab-wrapper{
    position:fixed;
    top:12vw;
    left:0;
    z-index: 99;
    width:100%;
  }
  ul.accountlogList{
    margin-top:4vw;
    li{
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
  <div class="wrapper">
    <!-- 头部 -->
    <header-basic title="钱包明细"></header-basic>
    <!-- 导航 -->
    <div class="tab-wrapper">
      <tab bar-active-color="#1699e7" active-color="#1997e3" :scroll-threshold="5">
        <tab-item :selected="currLi==''?true:false" @on-item-click="filterFun('')">全部</tab-item>
        <tab-item v-for="(i,index) in trade_type" :selected="currLi==index?true:false" :key="index" @on-item-click="filterFun(index)">{{i}}</tab-item>
      </tab>
    </div>
    <group title="选择交易时间">
      <datetime v-model="start_time" title="开始时间" clear-text="清除" @on-clear="start_time=''"></datetime>
      <datetime v-model="end_time" title="结束时间" clear-text="清除" @on-clear="end_time=''"></datetime>
    </group>
    <div>
      <ul class="accountlogList" v-if="accountlogList && accountlogList.length">
        <li v-for="(i,j) in accountlogList" :key="j">
          <div class="top">
            <p class="left">{{i.desc}}<span class="sub" v-if="currLi==''">（{{i.trade_type=='0'?'支出':'收入'}}）</span></p>
            <p class="right">{{$f(i.amount)}}</p>
          </div>
          <div class="middle">
            <p class="left">交易订单号：{{i.order_sn}}</p>
          </div>
          <div class="middle" v-if="i.trade_no">
            <p class="left">支付订单号：{{i.trade_no}}</p>
          </div>
          <div class="middle">
            <p class="left">交易时间：{{i.add_time}}</p>
          </div>
          <div class="middle">
            <p class="left">支付方式：{{i.pay_name}}</p>
          </div>
        </li>
      </ul>
      <!-- 没有钱包明细 -->
      <no-data v-if="!loadMoreStatus && !accountlogList.length" :tips="tips" position="static"></no-data>
      <!-- 加载更多 -->
      <load-more v-show="accountlogList && accountlogList.length" :show-loading="loadMoreStatus" :tip="loadMoreMsg" background-color="#fbf9fe"></load-more>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, LoadMore, Datetime, Group, XButton } from 'vux'
import noData from '@/components/common/noData'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { Tab, TabItem, LoadMore, noData, headerBasic, Datetime, Group, XButton },
  data() {
    return {
      // 钱包明细
      accountlogList: [],
      // 支付方式列表
      paymentList: [],
      // 明细类型数据
      trade_type: {},
      // 统计数据
      statistics: {},
      // 开始时间
      start_time: '',
      // 结束时间
      end_time: '',
      // 请求次数
      requestNum: 0,
      // 每页数据条数
      pageSize: 15,
      // 当前页数
      currPage: 1,
      // 总条数
      currTotalCount: 0,
      // 当前明细类型
      currLi: '',
      // 是否正在加载
      loadMoreStatus: false,
      // 加载更多：正在加载 ；我是有底线的；加载更多
      loadMoreMsg: '加载更多',
      // 保存函数LoadMore的指针
      loadMoreFun: null,
      // 没有数据提示
      tips: ''
    }
  },
  watch: {
    requestNum(val) {
      if (val === 1) {
        this.$nextTick(() => {
          this.$loading()
        })
      }
    },
    start_time(newVal) {
      let field = ''
      if (this.currLi !== '') field = '&trade-type=' + this.currLi
      this.getAccountLogList(field)
    },
    end_time(newVal) {
      let field = ''
      if (this.currLi !== '') field = '&trade-type=' + this.currLi
      this.getAccountLogList(field)
    }
  },
  methods: {
    // 点击导航
    filterFun(id) {
      let field = ''
      if (this.currLi === id) return false
      this.currLi = id
      if (id !== '') field = '&trade_type=' + id
      this.currPage = 1
      this.currTotalCount = 0
      this.getAccountLogList(field)
    },
    // 获取钱包明细数据
    getAccountLogList(field = '') {
      let tradeType = ''
      this.tips = '钱包明细记录'
      if (field.match(/&trade_type=(\S*)&?/ig)) {
        tradeType = Number(field.match(/&trade_type=(\S*)&?/ig)[0].replace(/&trade_type=/ig, ''))
      }
      if (tradeType === 0) {
        this.tips = '支出明细记录'
      } else if (tradeType === 1) {
        this.tips = '收入明细记录'
      }
      this.loadMoreStatus = true
      this.loadMoreMsg = '正在加载'
      field += '&page_size=' + this.pageSize + '&page=' + this.currPage + '&log_type=1' + '&add_time_start=' + this.start_time + '&add_time_end=' + this.end_time
      this.$fetch.accountLogList(field).then(({ list, trade_type, statistics, pagination }) => {
        this.statistics = statistics
        this.trade_type = trade_type
        if (this.currPage === 1) {
          this.accountlogList = list
        } else {
          this.accountlogList = this.accountlogList.concat(list)
        }
        this.currTotalCount = pagination.totalCount
        let maxPage = Math.ceil(this.currTotalCount / this.pageSize)
        if (maxPage > this.currPage) {
          this.loadMoreMsg = '加载更多'
        } else {
          this.loadMoreMsg = '我是有底线的'
        }
        this.loadMoreStatus = false
        if (this.requestNum < 1) this.requestNum++
        else this.$loading()
      }).catch(err => {
        this.$loading()
        console.log(err)
      })
    },
    loadMore() {
      if (this.loadMoreStatus) return false
      let isnearBottom = this.$willScrollToBottom(30)
      let maxPage = 0
      let field = '&trade_type=' + this.currLi
      if (isnearBottom) {
        maxPage = Math.ceil(this.currTotalCount / this.pageSize)
        if (this.currPage >= maxPage) return false
        this.currPage++
        if (this.currLi === '') field = ''
        this.getAccountLogList(field)
      }
    }
  },
  activated() {
    this.$loading('加载钱包明细...')
    this.requestNum = 0
    this.getAccountLogList()
    this.loadMoreFun = () => this.loadMore()
    window.addEventListener('scroll', this.loadMoreFun, false)
  },
  deactivated() {
    this.currLi = ''
    window.removeEventListener('scroll', this.loadMoreFun)
  }
}
</script>
