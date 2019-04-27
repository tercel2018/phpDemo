/*
 * @Author: 陈航
 * @Date: 2018-08-24 11:00:00
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-22 11:02:22
 * @说明：支付成功页面
 */
<style lang="less" scoped>
.payBox{
  padding-top:10vw;
  .orderInfo{
    margin:0 auto;
    width: max-content;
    font-size: @f6;
    color:@6;
    li{
      line-height: 240%;
      span{
        color:@3;
      }
      .price{
        color:@blue;
        font-size: @f7;
      }
    }
  }
  .btn{
    margin-top:4vw;
    text-align: center;
    span{
      color:@blue;
      font-size: @f7;
      margin:0 2vw;
    }
  }
}
</style>
<template>
  <div class="payBox">
    <!-- 支付状态 -->
    <msg :title="payTitle" :icon="payIcon"></msg>
    <!-- 订单信息 -->
    <ul v-if="payResultObj.trade_state==='SUCCESS'" class="orderInfo">
      <li>支付金额：
        <span class="price">{{$f(payResultObj.total_fee)}}</span>
      </li>
      <li v-if="order_type!=3">交易订单号：<span>{{payResultObj.out_trade_no}}</span></li>
      <li v-if="order_type!=3 && payType!=='wallet' && payResultObj.transaction_id">支付订单号：<span>{{payResultObj.transaction_id}}</span></li>
      <li>支付时间：<span>{{payResultObj.pay_time}}</span></li>
    </ul>
    <!-- 路由跳转 -->
    <div class="btn" v-if="payResultObj.trade_state==='SUCCESS'">
      <router-link v-if="order_type==3" to="finance_myWallet" tag="span">查看余额</router-link>
      <template v-else>
        <span @click="checkOrder">查看订单</span>
        <router-link v-if="order_type == 4" to="service_myService" tag="span">查看服务</router-link>
        <router-link v-if="order_type != 4 && cus_user_id <= 0" to="store_myStore" tag="span">查看门店</router-link>
      </template>
    </div>
  </div>
</template>
<script>
import { Msg } from 'vux'
export default {
  components: {
    Msg
  },
  data() {
    return {
      // 支付结果信息
      payResultObj: {},
      // 支付结果状态
      payTitle: '支付成功',
      // 展示图标
      payIcon: 'success',
      // 支付类型：微信、支付宝、余额
      payType: '',
      // 订单类型 0：开店，1：升级续费，3：充值， 4：服务订单
      order_type: -1,
      // cus_user_id(大于零，代理商为客户开店)
      cus_user_id: -1
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
    // 更新用户信息
    getUserInfo() {
      this.$loading('加载订单详情...')
      this.$fetch.getUserInfo().then(data => {
        this.$loading()
        // 更新用户角色
        this.$store.dispatch('CHANGE_USER_ROLE', data.user_role)
        // 用户折扣
        sessionStorage.discount = data.discount
        // 图片域名
        sessionStorage.uploadHost = data.host
        // 前台域名
        sessionStorage.agentHost = data.agent_host
        // 三级域名
        sessionStorage.threeDomain = data.member_domain
        // 是否设置了支付密码
        sessionStorage.isExist = data.pay_password
        // 是否认证成功
        sessionStorage.is_auth = data.is_auth
        // 用户登录手机号码
        sessionStorage.user_mobile = data.user_mobile
        // 会员剩余金额 user_money
        sessionStorage.user_money = data.user_money
        // 会员等级名称  rank_name
        sessionStorage.rank_name = data.rank_name
        // 会员等级头像 rank_image
        sessionStorage.rank_image = data.rank_image
        // 会员等级 user_rank
        sessionStorage.user_rank = data.user_rank
        // user_role
        sessionStorage.user_role = data.user_role
        // user_type
        sessionStorage.user_type = data.user_type
        // 是否为已认证的代理商
        sessionStorage.realyAgent = data.is_auth === 1 && data.user_role === 11 ? '1' : ''
        // 是否显示设置密码引导
        sessionStorage.alert_set_password = data.alert_set_password
        // 是否设置支付密码
        sessionStorage.set_pay_password = data.pay_password === 0 ? '' : '1'
        // 前台域名
        sessionStorage.website_domain = data.website_domain
      }).catch(err => {
        this.$loading()
        console.log('getUserInfo => errMsg:', err)
      })
    },
    // 查看订单
    checkOrder() {
      let order_sn = ''
      if (Number(this.order_type) !== 3 && this.payResultObj.out_trade_no) {
        order_sn = this.payResultObj.out_trade_no
      }
      sessionStorage.order_sn = order_sn
      this.$router.push('/main/myBuy_orderDetail')
    }
  },
  activated() {
    this.$loading()
    // 订单类型
    this.order_type = -1
    this.cus_user_id = -1
    if (this.$route.query.order_type) {
      this.order_type = Number(this.$route.query.order_type)
    } else if (sessionStorage.order_type) {
      this.order_type = Number(sessionStorage.order_type)
    }
    if (this.$route.query.cus_user_id) {
      this.cus_user_id = Number(this.$route.query.cus_user_id)
    } else if (sessionStorage.cus_user_id) {
      this.cus_user_id = Number(sessionStorage.cus_user_id)
    }
    // 支付状态判断 不是从支付页面过来的回到首页
    if (sessionStorage.payType) {
      this.payType = sessionStorage.payType
    } else {
      this.$router.push('/main/index')
    }
    // 支付结果信息
    this.payResultObj = {}
    if (sessionStorage.payResultObj) {
      let payObj = JSON.parse(sessionStorage.payResultObj)
      this.payResultObj = payObj
      if (payObj.trade_state === 'SUCCESS') {
        this.payTitle = '支付成功'
        this.payIcon = 'success'
      } else {
        this.payTitle = '支付失败'
        this.payIcon = 'error'
      }
    }
    // 充值(代理商等级提升或是钱包储值)后更新用户信息和session
    if (Number(this.order_type) === 3) {
      this.getUserInfo()
    }
  },
  deactivated() {
    delete sessionStorage.order_type
    delete sessionStorage.cus_user_id
    delete sessionStorage.payType
    delete sessionStorage.payResultObj
  }
}
</script>
