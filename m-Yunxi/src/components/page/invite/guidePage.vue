/*
 * @Author: 陈航
 * @Date: 2018-11-22 11:54:17
 * @Last Modified time: 2018-11-22 11:54:17
 * @说明：邀请引导页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
img{
  display: block;
  border:0;
  padding:0;
  margin:0;
}
.guide-wrapper{
  width:100vw;
  background: none;
  .guide-first-screen{
    padding-top:7vh;
    width:100vw;
    height:93vh;
    background: none;
    position: relative;
    .guide-wrapper-bg{
      position: absolute;
      top:0;
      left:0;
      width:100vw;
      height:100vh;
      z-index:-1;
    }
    .guide-title{
      width:26.15vh;
      margin:0 auto 6.5vh;
      height:13.76vh;
      background-size:100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-image:url(../../../assets/image/guide_title.png);
      position: relative;
      .icon{
        position: absolute;
      }
      .pos1{
        top:11vh;
        left:-6vh;
        height:6.2vh;
      }
      .pos2{
        top:-6.1vh;
        right:-8vh;
        height:4.7vh;
      }
      .pos3{
        top:5.5vh;
        right:-4.2vh;
        height:3.8vh;
      }
    }
    .guide-box{
      margin:0 auto 5.5vh;
      width:82vw;
      height:26.85vw;
      background-size:100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-image:url(../../../assets/image/guide_box.png);
      position: relative;
      &:after{
        content:"";
        position: absolute;
        top:13.5vw;
        left:50%;
        transform: translateX(-50%);
        height:22vw;
        width:69vw;
        background-size:100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-image:url(../../../assets/image/guide_light.png);
        mix-blend-mode: screen;
        z-index:0;
      }
      .icon{
        position: absolute;
        height:4.5vh;
        right:8.14vw;
        top:-2.25vh;
      }
      h3{
        position: absolute;
        width:max-content;
        left:50%;
        top:-@f7/2;
        transform: translateX(-50%);
        font-size: @f7;
        color:#fff;
        font-weight:400;
      }
      p{
        color:#fff;
        .flexUi(space-between);
        position: absolute;
        width:84%;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        span{
          font-weight: 700;
          line-height: 100%;
          text-shadow: 0 0.2rem 0.4rem rgba(255,72,0,.75);
        }
        .left{
          font-size:2.4rem;
          white-space: nowrap;
        }
        .right{
          line-height: 120%;
          font-size:1.2rem;
          width:1.2rem;
        }
      }
    }
    .guide-inset{
      margin:0 auto 2.5vh;
      height:17.6vh;
      background-size:auto 17.6vh;
      background-position: center;
      background-repeat: no-repeat;
      background-image:url(../../../assets/image/guide_inset.png);
    }
    .guide-info{
      margin:0 auto 5vh;
      width:max-content;
      padding: 1vw;
      border-top:solid 2px rgba(255, 255, 255, .9);
      border-bottom:solid 2px rgba(255, 255, 255, .9);
      p{
        color: #fff;
        text-align: center;
        font-size:@f6;
        line-height: 150%;
      }
    }
    .guide-invite-button{
      margin:0 auto 1.5vh;
      width:60vw;
      height:13.8vw;
      background-size:60vw 13.8vw;
      background-position: center;
      background-repeat: no-repeat;
      background-image:url(../../../assets/image/guide_invite_btn.png);
      line-height:12.9vw;
      text-align: center;
      font-size:@f8;
      color:#ff7202;
      letter-spacing: @f8*0.05;
      font-weight:700;
    }
    .guide-invite-info{
      text-align: center;
      font-size:@f6;
      color:#fff;
    }
  }
}
</style>
<template>
  <div class="guide-wrapper" id="guide-wrapper-only">
    <!-- 第一屏 -->
    <div class="guide-first-screen">
      <img class="guide-wrapper-bg" src="../../../assets/image/guide_wrapper_bg.png">
      <div class="guide-title">
        <img v-for="i in 3" class="icon" :class="'pos'+i"   src="../../../assets/image/guide_red_package.png" :key="i"/>
      </div>
      <div class="guide-box">
        <img class="icon" src="../../../assets/image/guide_gold.png"/>
        <h3>邀约成功注册付费</h3>
        <template v-if="$store.state.userRole === 1">
          <p><span class="left">领{{commission}}元</span><span class="right">现金</span></p>
        </template>
        <template v-else>
          <p><span class="left">最高50%</span><span class="right">返佣</span></p>
        </template>
      </div>
      <div class="guide-inset"></div>
      <div class="guide-info">
        <p>新用户专享</p>
        <p>一个月体验券</p>
      </div>
      <div class="guide-invite-button" @click="shareNow">
        马上分享
      </div>
      <div class="guide-invite-info">
        马上获取专属二维码分享给好友
      </div>
    </div>
    <!-- 第二屏 -->
    <my-invite v-show="showInvite" id="guide-second-screen" :userRole="userRole"></my-invite>
  </div>
</template>
<script>
import { setTimeout, setInterval, clearInterval } from 'timers'
import myInvite from '@/components/common/myInvite'
import assign from '@/mixins/assign.js'
export default {
  components: { myInvite },
  mixins: [assign],
  data() {
    return {
      // 是否显示第二屏
      showInvite: false,
      // 用户角色
      userRole: 0,
      // 奖励金或佣金
      commission: 0
    }
  },
  methods: {
    // 获取奖励金
    accountGetCommission() {
      this.$fetch.accountGetCommission({}, null).then(({ commission }) => {
        this.commission = commission
      }).catch(err => {
        console.log('errMsg => accountGetCommission: ' + err)
      })
    },
    shareNow() {
      // 是否是微信浏览器
      let isWxBrowser = this.$isWxBrowser()
      if (isWxBrowser) {
        if (this.existAuthIdAndToken()) {
          this.showInvite = true
          let height = window.innerHeight
          let per_add_height = Math.ceil(height / 20)
          let start = 0
          let useDocumentBody = this.scrollUseApiDocumentBody()
          setTimeout(() => {
            let timer = setInterval(() => {
              if (start >= height) {
                start = height
                clearInterval(timer)
              } else {
                start += per_add_height
              }
              if (useDocumentBody) document.body.scrollTop = start
              else document.documentElement.scrollTop = start
            }, 15)
            this.getUserInfo()
          }, 200)
        } else {
          this.$router.push('/')
        }
      } else {
        this.$router.push('/')
      }
    },
    // 判断浏览器是否用document.body（返回true）或document.documentElement（返回false）做滚动
    scrollUseApiDocumentBody() {
      let userAgent = window.navigator.userAgent.toLowerCase()
      // 判断浏览器是否是火狐浏览器
      let isFirefox = false
      // 是否声明DTD文档
      let isDTD = true
      // 浏览器是否用document.body做滚动
      let useDocumentBody = true
      if (userAgent.indexOf('firefox') > -1) {
        isFirefox = true
      }
      // 判断是否有DTD
      if (document.compatMode.toLowerCase() === 'backcompat') {
        isDTD = false
      }
      if (isFirefox) {
        if (isDTD) useDocumentBody = false
        else useDocumentBody = true
      } else {
        useDocumentBody = true
      }
      return useDocumentBody
    },
    // 是否有auth_id 和 access_token
    existAuthIdAndToken() {
      // 是否有auth_id
      let auth_id = localStorage.auth_id
      // 是否有token
      let token = localStorage.access_token
      if (auth_id && token) return true
      return false
    },
    // 获取用户信息
    getUserInfo() {
      this.$fetch.getUserInfo().then(data => {
        this.userRole = data.user_role
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
      }).catch(err => console.log('getUserInfo => errMsg:', err))
    }
  },
  activated() {
    if (localStorage.access_token) {
      this.$fetch.getUserInfo().then(data => {
        this.$store.dispatch('CHANGE_USER_ROLE', data.user_role)
      })
    }
    this.showInvite = false
    this.userRole = 0
    this.commission = 0
    this.accountGetCommission()
  }
}
</script>
