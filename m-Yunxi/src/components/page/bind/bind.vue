/*
 * @Author: 黄智强
 * @Date: 2018-05-05 13:39:19
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-22 10:56:14
 * @说明：绑定成功页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.bindOk-wrapper{
  position:relative;
  padding-top:17vh;
  height:83vh;
  background-color: #f5f5f5;
  img{
    display:block;
    margin:0 auto;
    width:18.75vw;
    border:0;
  }
  .binded{
    width:23vw;
  }
  h3{
    text-align: center;
    margin:4.5vw 0 3.2vw;
    line-height: 100%;
    color:#656565;
    font-size:@f8;
  }
  p{
    text-align: center;
    line-height: 100%;
    color:#656565;
    font-size:@f7;
  }
  .btn{
    margin:0 auto 5.8vw;
    width:72vw;
    height:10.8vw;
    line-height: 10.8vw;
    border-radius:1.1vw;
    background-color: #eeeded;
    color:#9c9b9b;
    text-align: center;
    font-size:@f7;
  }
  .index{
    margin:12vh auto 5.8vw;
    background-color: #1a97e3;
    color:#fff;
  }
  .unbind{
    position:absolute;
    left:50%;
    bottom:1vh;
    margin:3vw auto;
    transform:translateX(-50%);
    color:@blue;
    background:none;
  }
}
</style>
<template>
  <div class="bindOk-wrapper">
    <img v-if="isFirstBind" src="../../../assets/image/bind_ok.png"/>
    <img v-else class="binded" src="../../../assets/image/binded.png"/>
    <h3>{{isFirstBind?'绑定成功':'你已经绑定'}}</h3>
    <p v-if="phone">手机号{{String(phone).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}已绑定到云玺印公众号</p>
    <div class="btn index" @click="$router.push('/main/index')">进入首页</div>
    <div class="btn unbind" @click="unbindFun">解除绑定</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: '',
      // 是否初次绑定
      isFirstBind: false
    }
  },
  methods: {
    // 解除绑定
    unbindFun() {
      // delete localStorage.access_token
      // delete localStorage.auth_id
      this.$router.push('/unbind')
    },
    // 获取信息
    getUserInfo() {
      this.$fetch.getUserInfo().then(data => {
        this.phone = data.user_mobile
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
      })
    }
  },
  created() {
    this.$loading()
  },
  activated() {
    this.$loading()
    this.isFirstBind = false
    let type = this.$route.query.type
    if (type && Number(type) === 1) {
      document.title = '绑定成功'
      this.isFirstBind = true
    } else {
      document.title = '我的绑定'
    }
    if (sessionStorage.user_mobile) {
      this.phone = sessionStorage.user_mobile
    } else {
      this.phone = null
    }
    // if (!localStorage.auth_id) {
    //   this.$router.go(-1)
    // }
    this.getUserInfo()
  },
  deactivated() {
    document.title = '云玺印ERP-图文广告行业业绩提升的秘密武器'
  }
}
</script>
