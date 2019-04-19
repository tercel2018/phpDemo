/*
 * @Author: 陈航
 * @Date: 2018-09-07 13:38:36
 * @Last Modified by: 陈航
 * @说明：订单详情页面
 */
<style lang="less" scoped>
.wrapper{
  font-size: @f7;
  padding-bottom:20vw;
  .time{
    color:@6;
    margin-left:5vw;
    font-size: @f5;
  }
  .htitle{
    position:relative;
    margin-left:6vw;
    margin-right:6vw;
    padding-left:10px;
    border-left:solid 4px @blue;
    font-size: @f8;
    &:after{
      position:absolute;
      left:-4px;
      bottom:-2vw;
      content:'';
      height:1px;
      width:calc(~'100% + 4px');
      width:-webkit-calc(~'100% + 4px');
      background-color: #dedede;
    }
  }
  .offsetTop{
     margin-top:6vw;
  }
  .inline_unit{
    padding:1vw 0;
    span{
      display: inline-block;
    }
    font-size: @f6;
    .label{
      width:24vw;
      color:@6;
    }
    .gotoPay{
      color:@blue;
      padding:2vw 3vw;
      background-color: @blue;
      color:#fff;
      line-height: 100%;
      border-radius:0.5vw;
      margin-left:3vw;
    }
    .note{
      color:#1a97e3;
      font-size:@f5;
    }
  }
  .order_num{
    padding-top: 3vw;
  }
  .order_info{
    margin-left:6vw;
    margin-top:3vw;
  }
  .companyList{
    margin-left:6vw;
    margin-top:3vw;
  }
  .companyList{
    .company_item{
      .company_info{
         padding:2vw 0;
        .company_name{
          color:@blue;
          padding:1vw 0;
        }
        .domain{
          color:@6;
          font-size: @f5;
        }
      }
      .stores_item{
        padding-bottom:2vw;
        margin-right:6vw;
        border-bottom:solid 1px #dedede;
      }
      .noborder{
        border:0;
      }
      .service_info{
        margin-right:6vw;
        padding-top:2vw;
        padding-bottom:2vw;
      }
    }
  }
  .activity_content {
    color: #ff6c00;
  }
}
</style>
<template>
  <div class="wrapper">
    <!-- 订单状态 -->
    <div class="htitle offsetTop">订单状态</div>
    <div class="order_info">
      <p class="inline_unit order_num">
        <span class="label">订单编号</span>
        <span class="text">{{order_info.order_sn}}</span>
      </p>
      <p class="inline_unit order_num">
        <span class="label">订单金额</span>
        <span class="text">{{$f(order_info.order_price)}}</span>
      </p>
      <p class="inline_unit order_num">
        <span class="label">订单状态</span>
        <span class="text">{{order_info.order_status_name}}</span>
        <span class="gotoPay" v-if="order_info.order_status===10" @click="gotoPay(order_info.order_sn)">去支付</span>
        <span class="note" v-else-if="order_info.order_status===30 && order_info.cus_user_id <= 0"><br/>您的订单正在处理中，大概需要3分钟，请稍后在我的门店中查看。</span>
        <span class="note" v-else-if="order_info.order_status===30 && order_info.cus_user_id > 0"><br/>您的订单正在处理中，大概需要3分钟。</span>
      </p>
    </div>
    <!-- 状态流 -->
    <flow orientation="vertical" style="height:150px;" v-if="status_bar && status_bar.length">
      <template v-for="(i,j) in status_bar">
        <flow-state :state="j+1" :is-done="i.time !==0?true:false" :key="j">
          <span slot="title">{{i.name}}<span class="time" v-if="i.time !==0">{{i.time}}</span></span>
        </flow-state>
        <flow-line  v-if="j<3"  :is-done="i.time !==0?true:false" :key="j+status_bar.length"></flow-line>
      </template>
    </flow>
    <!-- 订单详情 -->
    <div class="htitle">订单详情</div>
    <ul class="companyList" v-if="company && company.length && order_info.product_type">
      <li class="company_item" v-for="(i,index) in company" :key="index">
        <template v-if="order_info.product_type !== 'service'">
          <div class="company_info">
            <p class="company_name">{{i.company}}</p>
            <p class="domain">{{i.domain}}.{{threeDomain}}</p>
          </div>
          <ul class="company_stores">
            <li class="stores_item" v-for="(j,_index) in i.store_list" :key="_index" :class="{'noborder':(index===company.length-1) && (_index===i.store_list.length-1)}">
              <p class="inline_unit">
                <span class="label">门店名称</span>
                <span class="text">{{j.store_name}}</span>
              </p>
              <p class="inline_unit">
                <span class="label">购买内容</span>
                <span class="text">{{j.buy_content}}</span>
              </p>
              <p class="inline_unit">
                <span class="label">优惠信息</span>
                <span class="text" :class="{activity_content:j.activity_content}">{{j.activity_content || '无'}}</span>
              </p>
            </li>
          </ul>
        </template>
        <div v-else class="service_info" v-for="j in i.store_list" :key="j.store_name">
          <p class="inline_unit">
            <span class="label">服务名称</span>
            <span class="text">{{j.product_name}}</span>
          </p>
          <p class="inline_unit">
            <span class="label">购买单位</span>
            <span class="text">{{j.duration_name}}</span>
          </p>
          <p class="inline_unit">
            <span class="label">优惠信息</span>
            <span class="text" :class="{activity_content:j.activity_content}">{{j.activity_content || '无'}}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Flow, FlowState, FlowLine } from 'vux'
export default {
  components: {
    Flow,
    FlowState,
    FlowLine
  },
  data() {
    return {
      // 公司数据
      company: [],
      // 订单信息
      order_info: { order_sn: '' },
      // 订单类型
      order_type: 0,
      // 门店信息
      storeInfo: null,
      // 门店套餐价格
      storePackagePrice: 0,
      // 三级域名
      threeDomain: sessionStorage.threeDomain,
      // 状态数据
      status_bar: null,
      // 是否显示弹窗
      showPopup: false,
      // 购买的模块功能详情
      purchaseFunction: null,
      // 购买的模块功能时长
      duration: 0
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
    // 获取订单详情数据
    getOrderDetail() {
      this.$fetch.view('&order_sn=' + sessionStorage.order_sn).then(({ company, order_info, status_bar }) => {
        this.status_bar = status_bar
        this.order_info = order_info
        this.company = company
        this.$nextTick(() => this.$loading())
      })
    },
    // 去支付
    gotoPay(order_sn) {
      sessionStorage.order_type = this.order_type
      sessionStorage.order_sn = order_sn
      this.$router.push('/main/store_orderPay')
    }
  },
  activated() {
    this.$loading('加载订单详情...')
    this.getOrderDetail()
    this.threeDomain = sessionStorage.threeDomain
  }
}
</script>
