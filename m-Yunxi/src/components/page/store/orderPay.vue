/*
 * @Author: 陈航
 * @Date: 2018-05-10 15:42:49
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-01-09 16:31:45
 * @说明：订单支付
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.all {
  padding: 6vw 0 0vw;
  background-color: #fff;
  font-size: @f7;
  .price {
    margin: 0 15px;
    .red {
      font-size: @f8;
    }
  }
  .orderInfo {
    margin: 6vw 15px;
    font-size: @f7;
    p {
      margin-top: 1.5vw;
    }
  }
  .user_money {
    margin: 3vw 15px 0;
    .blue {
      padding: 0 8vw;
    }
    .enough {
      margin-top: 1.5vw;
      font-size: @f6;
    }
    p:last-child{
      padding-bottom:3vw;
    }
  }
  .btnWarp {
    margin-top: 6vw;
    text-align: center;
  }
  .qrcode{
    text-align:center;
    margin-top:6vw;
    img{
      width:40vw;
      height:40vw;
    }
  }
  .flexInlineUI{
    .flexUi;
    line-height: 1.5*@f7;
    span{
      line-height: 1.5*@f7;
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
  }
}
</style>
<template>
  <div class="all">
    <div class="price flexInlineUI">
      <span>应付金额：</span>
      <inline-loading v-if="orderLoading"></inline-loading>
      <span v-else class="red">{{$f(order_price)}}</span>
    </div>
    <div class="orderInfo">
      <p>请及时付款，以便您的订单可以尽快处理，谢谢</p>
      <p class="flexInlineUI">
        <span>订单编号：</span>
        <inline-loading v-if="orderLoading"></inline-loading>
        <span v-else class="red">{{order_sn}}</span>
      </p>
      <p class="flexInlineUI">
        <span>下单时间：</span>
        <inline-loading v-if="orderLoading"></inline-loading>
        <span v-else>{{add_time}}</span>
      </p>
      <p class="red">如果48小时未付款，订单会自动取消</p>
    </div>
    <div class="split"></div>
    <!-- 余额支付 -->
    <div class="user_money">
      <p class="flexInlineUI">
        <span>当前余额：</span>
        <inline-loading v-if="orderLoading"></inline-loading>
        <template v-else>
          <span class="red">{{$f(user_money)}}</span>
          <span v-if="!balanceEnough && order_type !== 3" class="blue gotoPay" @click="$router.push('finance_myWallet')">去充值</span>
        </template>
      </p>
      <p v-if="!balanceEnough && order_type !== 3" class="red enough">
        <span>余额不足，无法使用余额支付，请选择其他方式支付</span>
      </p>
    </div>
    <!-- 支付组件 -->
    <pay :order_sn="order_sn" :enough="balanceSupport" bgColor="#fff"></pay>
  </div>
</template>
<script>
import { Checklist, XButton, InlineLoading, XInput, Group } from 'vux'
import pay from '@/components/common/pay'
export default {
  components: { Checklist, XButton, InlineLoading, XInput, Group, pay },
  data() {
    return {
      // 订单编号
      order_sn: '',
      // 应付金额
      order_price: 0,
      // 下单时间
      add_time: '',
      // 账户余额
      user_money: 0,
      // 余额是否足够
      balanceEnough: false,
      // 是否设置过密码
      isExist: sessionStorage.isExist === '1',
      // 余额支付是否支持
      balanceSupport: false,
      // 余额充值过来
      order_type: -1,
      // 是否查询订单中
      orderLoading: true
    }
  },
  methods: {
    // 获取openId
    getOpenId() {
      // 订单编号
      let order_sn = this.$route.query.order_sn
      if (order_sn && order_sn !== 'undefined') {
        this.order_sn = order_sn
        sessionStorage.order_sn = order_sn
      }
      // access_token
      let access_token = this.$route.query.access_token
      if (access_token && access_token !== 'undefined') {
        localStorage.access_token = access_token
      }
      // 判断微信浏览器
      let isWXBrowser = this.$isWxBrowser()
      if (isWXBrowser) {
        let route_openId = this.$route.query.openId
        let local_openId = ''
        if (localStorage.wxOpenId) local_openId = localStorage.wxOpenId
        // 微信浏览器，无openId则授权，有则跳过
        if (!local_openId && !route_openId) {
          let field = '&order_sn=' + this.order_sn
          this.$loading('订单支付...')
          this.$fetch.payGetOpenId(field).then(data => {
            this.$loading()
            window.location.href = data
          }).catch(err => {
            this.$loading()
            this.$toast(err)
          })
        } else {
          if (route_openId) localStorage.wxOpenId = route_openId
          console.log('已授权openId: ' + localStorage.wxOpenId)
          // 获取订单信息
          this.getOrderInfo()
        }
      } else {
        // 获取订单信息
        this.getOrderInfo()
      }
    },
    // 获取订单支付信息
    getOrderInfo() {
      this.$loading('订单支付...')
      this.$fetch.payIndex({ order_sn: this.order_sn }).then(({ order_price, add_time, user_money, frozen_money, order_type, cus_user_id }) => {
        this.$loading()
        this.orderLoading = false
        // order_type
        let orderType = Number(order_type)
        this.order_type = orderType
        sessionStorage.order_type = orderType
        sessionStorage.cus_user_id = cus_user_id
        // 余额是否充足
        if ((Number(user_money) - Number(frozen_money) - Number(order_price)) >= 0) {
          if (orderType !== 3) {
            this.balanceSupport = true
          } else {
            this.balanceSupport = false
          }
          this.balanceEnough = true
        }
        this.order_price = order_price
        this.add_time = add_time
        this.user_money = user_money
      }).catch(err => {
        this.$loading()
        this.$toast(err)
        console.log('err => ' + err)
      })
    }
  },
  activated() {
    this.$loading()
    this.orderLoading = true
    this.order_sn = sessionStorage.order_sn
    this.balanceEnough = false
    this.balanceSupport = false
    this.order_type = -1
    // 微信浏览器获取openId
    this.getOpenId()
  }
}
</script>
