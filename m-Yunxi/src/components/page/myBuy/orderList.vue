/*
 * @Author: 陈航
 * @Date: 2018-09-17 14:35:55
 * @Last Modified by: 陈航
 * @说明：订单列表
 */
<style lang="less" scoped>
@borderColor:#eee;
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.flexBox{
  .flexUi(space-between);
  padding:1vw 0;
  .label{
    color:@9;
    font-size:@f6;
  }
  .text{
    font-size:@f6;
  }
}
.wrapper{
  margin-bottom:20vw;
  font-size: @f7;
  padding-top:calc(~'88px + 12vw');
  padding-top:-webkit-calc(~'88px + 12vw');
  .tab-wrapper{
    position:fixed;
    top:12vw;
    left:0;
    z-index:99;
    width:100%;
  }
  .vux-search-fixed-wrapper{
    position:fixed;
    top:calc(~'44px + 12vw');
    top:-webkit-calc(~'44px + 12vw');
    left:0;
    width:100%;
    height:44px;
    z-index:899;
    background-color: #EFEFF4;
  }
  .orderList{
    padding:3vw 3vw 0;
    .order_item{
      padding:3vw;
      border-radius:3vw;
      background-color: #fff;
      margin-bottom:3vw;
      .order_info{
        .orderNum{
          .label{
             color:@3;
          }
          .text{
            color:@blue;
            font-size: @f7;
          }
        }
        .money{
          color:#ff8542;
          font-size: @f7;
        }
      }
      .top{
        padding:2vw 0;
        border-top:solid 1px @borderColor;
        border-bottom:solid 1px @borderColor;
        .company{
          .company_name{
            padding-left:10px;
            border-left:solid 4px @blue;
          }
        }
        .domain{
          padding:1vw 0;
          color: @6;
          font-size:@f6;
        }
      }
      .noborder{
        border-bottom:0;
      }
      .content{
        .store_item{
          padding:2vw 0;
          border-bottom:solid 1px @borderColor;
          .store_name{
            color:@blue;
          }
          .product{
            color: @6;
          }
          .benefit{
            color:@6;
            .activity_content {
              color: #ff6c00;
            }
          }
        }
        .noborder{
          border:0;
        }
      }
      .bottom{
        padding-top: 3vw;
        border-top:solid 1px @borderColor;
        .todoList{
          .flexUi(flex-end);
          li{
            margin-left:4vw;
            padding:1vw 2vw;
            color:@6;
            font-size:@f6;
            border:solid 1px #dcdcdc;
            border-radius:0.8vw;
          }
          .goPay{
            color:@blue;
            border:solid 1px @blue;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="wrapper">
    <!-- 头部导航 -->
    <header-and-nav :title="pageTitle" v-model="navOpen" :more="user_role==11?true:false">
      <side-nav-cell icon="icon-mendian" title="购买记录" @on-click="buyRecord"></side-nav-cell>
      <side-nav-cell v-if="user_role==11" icon="icon-gouwuche" title="代销记录" @on-click="payRecord"></side-nav-cell>
    </header-and-nav>
    <!-- 导航 -->
    <div class="tab-wrapper">
      <tab bar-active-color="#1699e7" active-color="#1997e3" :scroll-threshold="5">
        <tab-item :selected="currLi==='0'?true:false" @on-item-click="filterFun('0')">全部</tab-item>
        <tab-item v-for="(i,index) in count_list" :selected="currLi===i?true:false" :key="index" @on-item-click="filterFun(index)" badge-background="#ff8542" badge-color="#fff" :badge-label="(statusObj[index]=='待支付')?(
        (Number(i)>99)?'99+':(Number(i)===0?'':i.toString())):''">{{statusObj[index]}}</tab-item>
      </tab>
    </div>
    <div class="vux-search-fixed-wrapper">
      <search placeholder = "输入订单编号" v-model="order_code" @on-submit="searchOrder"  @on-blur="searchOrder" @on-clear="searchOrder" ref="search"></search>
    </div>
    <ul class="orderList">
      <li class="order_item" v-for="(i,index) in orderList" :key="index" @click="watchOrder(i.order_sn)">
        <div class="order_info">
            <div class="flexBox orderNum">
              <p class="label">订单号</p>
              <p class="text">{{i.order_sn}}</p>
            </div>
            <div class="flexBox">
              <p class="label">下单时间</p>
              <p class="text">{{i.add_time}}</p>
            </div>
            <div class="flexBox">
              <p class="label">订单金额</p>
              <p class="text money">{{$f(i.order_price)}}</p>
            </div>
            <div class="flexBox">
              <p class="label">订单类型</p>
              <p class="text">{{i.order_type}}</p>
            </div>
            <div class="flexBox">
              <p class="label">订单状态</p>
              <p class="text">{{i.order_status_name}}<span v-if="i.payment_id==5&&i.pay_status==0" style="color:#ff6c00">(已转账)</span></p>
            </div>
        </div>
        <ul class="company_list">
          <li class="company_item" v-for="(j,_j) in i.company" :key="_j" >
            <div v-if="i.product_type==='package' || i.product_type==='function'">
              <div class="top">
                <div class="flexBox company">
                  <p class="company_name">{{j.company_name}}</p>
                </div>
                <p class="domain">{{j.domain}}.{{threeDomain}}</p>
              </div>
              <div class="content">
                <ul class="storeList">
                  <li class="store_item" v-for="(k,_k) in j.store_list" :key="_k" :class="{noborder:_k===(j.store_list.length-1)}">
                    <div class="flexBox store_info">
                      <p class="store_name">{{k.store_name}}</p>
                      <p class="product">{{k.buy_content}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div v-else>
              <div class="top" v-for="(k,t) in j.store_list" :key="t" :class="{noborder:t===(j.store_list.length-1)}">
                <div class="flexBox company">
                  <p class="company_name">{{k.product_name}}</p>
                </div>
                <div class="flexBox benefit">
                  <p class="label">购买单位</p>
                  <p class="text">{{k.duration}}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="bottom">
          <ul class="todoList">
            <li v-if="i.order_status===10" @click.stop="cancelOrderFun(i.order_sn)">取消订单</li>
            <li @click.stop="watchOrder(i.order_sn)">查看订单</li>
            <li class="goPay" v-if="i.order_status===10" @click.stop="gotoPay(i.order_sn)">去支付</li>
          </ul>
        </div>
      </li>
    </ul>
    <load-more v-show="orderList.length" :show-loading="loadMoreStatus" :tip="loadMoreMsg" background-color="#fbf9fe"></load-more>
    <no-data v-show="!loadMoreStatus && !orderList.length" :tips="tips" position="static"></no-data>
  </div>
</template>
<script>
import Vue from 'vue'
import { Tab, TabItem, ConfirmPlugin, LoadMore, Search } from 'vux'
import noData from '@/components/common/noData'
import headerAndNav from '@/components/common/headerAndNav'
import sideNavCell from '@/components/common/sideNavCell'
Vue.use(ConfirmPlugin)
export default {
  components: { Tab, TabItem, LoadMore, noData, Search, headerAndNav, sideNavCell },
  data() {
    return {
      // 侧边导航隐藏
      navOpen: false,
      // 页面标题
      pageTitle: '订单中心',
      // 用户角色
      user_role: 1,
      // 第一行，左侧订单状态数据
      statusObj: {},
      // 第一行，当前选中的下标
      currLi: '0',
      // 是否显示取消订单弹框，false 不显示
      cancleOrder: false,
      // 取消订单原因
      cancelReason: '',
      // 订单类型 （购买记录、代销记录）
      orderListType: '',
      // 订单列表数据
      orderList: [],
      // 对应状态的数量
      count_list: {},
      // 页码数据
      pagination: {},
      // 请求次数
      requestNum: 0,
      // 三级域名
      threeDomain: sessionStorage.threeDomain,
      // 当前页数
      currPage: 1,
      // 每页数据
      currPageSize: 5,
      // 最大数据条数
      currTotalCount: 0,
      // 取消订单的sn
      cancelSn: '',
      // 订单类型：目前手机端只支持会员/代理商为自己开店，默认0
      order_type: 0,
      // 是否正在加载
      loadMoreStatus: false,
      // 加载更多：正在加载 ；我是有底线的；加载更多
      loadMoreMsg: '加载更多',
      // 保存加载更多函数的指针
      loadMoreFun: null,
      // 没有数据的提示
      tips: '',
      // 检索条件
      order_code: ''
    }
  },
  watch: {
    requestNum(val) {
      if (val === 2) this.$loading()
    }
  },
  computed: {
    // 没有数据时的类型：1:没有订单；2:没有找到订单
    noDataType() {
      if (this.orderList.length) return ''
      else if (this.searchValue) return 2
      else return 1
    }
  },
  filters: {
    formatMoney(val) {
      val = Number(val).toFixed(2)
      if (Number(val) > 1) {
        let int = val.split('.')[0]
        let float = val.split('.')[1]
        val = int.replace(/\B(?=(?:\d{3})+$)/g, ',') + '.' + float
      }
      return '￥' + val
    }
  },
  methods: {
    // 购买记录
    buyRecord() {
      this.navOpen = false
      this.order_code = ''
      this.orderListType = ''
      this.pageTitle = '订单中心 - 购买记录'
      this.$loading('加载订单列表...')
      this.requestNum = 0
      this.currLi = '0'
      this.currPage = 1
      this.getStatusList()
      this.getOrderList(1)
      this.$router.push('myBuy_orderList')
    },
    // 代销记录
    payRecord() {
      this.navOpen = false
      this.order_code = ''
      this.orderListType = '1'
      this.pageTitle = '订单中心 - 代销记录'
      this.$loading('加载订单列表...')
      this.requestNum = 0
      this.currLi = '0'
      this.currPage = 1
      this.getStatusList()
      this.getOrderList(1)
      this.$router.push('myBuy_orderList?order_type=1')
    },
    // 第一行，点击筛选事件
    filterFun(key) {
      let order_status = ''
      if (key !== '' && key !== undefined && key !== '0') {
        if (this.currLi === key) return false
        this.currLi = order_status = key
      } else {
        if (this.currLi === '0') return false
        this.currLi = '0'
      }
      this.currPage = 1
      this.currTotalCount = 0
      this.orderList = []
      this.getOrderList(1, Number(order_status))
    },
    // 取消订单
    cancelOrderFun(order_sn) {
      this.cancelSn = order_sn
      let self = this
      self.$vux.confirm.prompt('请输入取消订单的原因', {
        title: '你要取消此订单吗?',
        onShow () {
          self.$vux.confirm.setInputValue(self.cancelReason)
        },
        // 确认取消订单
        onConfirm (msg) {
          self.cancelReason = msg
          if (self.cancelReason === '') {
            self.$toast('请输入取消订单的原因')
            // 如果没输入的话递归调用
            self.cancelOrderFun(order_sn)
            return false
          }
          self.$loading('正在取消...')
          self.$fetch.orderCancel({order_sn: order_sn, reason: self.cancelReason}).then(() => {
            self.$loading('取消成功')
            self.cancleOrder = false
            let order_status = ''
            if (self.currLi !== '0') order_status = self.currLi
            self.currPage = 1
            self.orderList = []
            self.getOrderList(1, Number(order_status))
          })
        }
      })
    },
    // 获取订单列表数据
    getOrderList(type = 1, order_status = '', order_sn = '') {
      this.loadMoreStatus = true
      this.loadMoreMsg = '正在加载'
      let str = ''
      let _status = Number(order_status)
      if (_status === 10) {
        str = '待支付'
      } else if (_status === 20) {
        str = '已支付'
      } else if (_status === 40) {
        str = '已完成'
      } else if (_status === 50) {
        str = '已取消'
      }
      if (this.currPage <= 1) {
        this.$loading(`加载${str}订单数据...`)
      }
      if (type === 2) {
        this.$loading('搜索订单...')
        this.tips = `此订单`
      } else {
        this.tips = `${str}订单`
      }
      this.$fetch
        .list(
          '&page=' +
            this.currPage +
            '&order_status=' +
            order_status +
            '&order_sn=' +
            order_sn +
            '&order_type=' +
            this.orderListType
        )
        .then(({ order_list, count_list, pagination }) => {
          if (this.currPage === 1) {
            this.orderList = order_list
          } else {
            this.orderList = this.orderList.concat(order_list)
          }
          this.count_list = count_list
          this.pagination = pagination
          this.currPageSize = pagination.defaultPageSize
          this.currTotalCount = pagination.totalCount
          let maxPage = Math.ceil(this.currTotalCount / this.currPageSize)
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
    // 获取订单状态参数列表
    getStatusList() {
      this.$fetch.statusList().then(data => {
        this.statusObj = data
        this.requestNum++
      })
    },
    // 检索订单
    searchOrder() {
      this.$nextTick(() => {
        let order_status = ''
        if (this.currLi && Number(this.currLi) !== 0) order_status = this.currLi
        this.currPage = 1
        this.currTotalCount = 0
        this.orderList = []
        this.getOrderList(2, Number(order_status), this.order_code)
      })
    },
    // 查看订单
    watchOrder(order_sn) {
      sessionStorage.order_sn = order_sn
      this.$router.push('/main/myBuy_orderDetail')
    },
    // 去支付
    gotoPay(order_sn) {
      sessionStorage.order_type = this.order_type
      sessionStorage.order_sn = order_sn
      this.$router.push('/main/store_orderPay')
    },
    // 加载更多
    loadMore() {
      let self = this
      if (self.loadMoreStatus) return false
      let isnearBottom = self.$willScrollToBottom(30)
      let maxPage = 0
      let status = self.currLi
      if (isnearBottom) {
        maxPage = Math.ceil(self.currTotalCount / self.currPageSize)
        if (self.currPage >= maxPage) return false
        self.currPage++
        if (self.currLi === '0') status = ''
        self.getOrderList(1, Number(status))
      }
    }
  },
  activated() {
    this.currLi = '0'
    this.user_role = sessionStorage.user_role
    if (Number(this.user_role) === 1) {
      this.pageTitle = '订单中心'
    } else {
      if (this.$route.query.order_type && this.$route.query.order_type === '1') {
        this.orderListType = '1'
        this.pageTitle = '订单中心 - 代销记录'
      } else {
        this.orderListType = ''
        this.pageTitle = '订单中心 - 购买记录'
      }
    }
    this.$loading('加载订单列表...')
    this.order_code = ''
    this.currPage = 1
    this.getStatusList()
    this.getOrderList(1)
    this.loadMoreFun = () => this.loadMore()
    window.addEventListener('scroll', this.loadMoreFun, false)
  },
  deactivated() {
    this.requestNum = 0
    window.removeEventListener('scroll', this.loadMoreFun)
    this.order_code = ''
  }
}
</script>
