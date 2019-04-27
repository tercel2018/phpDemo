/*
 * @Author: 陈航
 * @Date: 2018-12-13 10:20:55
 * @Last Modified by: 陈航
 * @说明：邀请入口
 */
<style scoped lang='less'>
.exchangeWarp {
  width: 100vw;
  min-height: 100vh;
  background: url('../../../assets/image/invited_bj.png') no-repeat;
  background-size: 100% 100%;
  .content {
    position: relative;
    width: 100vw;
    height: 125.9vw;
    margin: 0 auto;
    padding-top: calc(~'33.3vh - 46vw');
    padding-top: -webkit-calc(~'33.3vh - 46vw');
    padding-bottom: calc(~'33.3vh - 48vw');
    padding-bottom: -webkit-calc(~'33.3vh - 46vw');
    img.up {
      width: 100vw;
      height:84.7vw;
    }
    h1{
      padding-bottom:2vw;
      line-height: 8vw;
      color:#fff;
      text-align: center;
      font-size: @f7;
    }
    img.down{
      width: 98.1vw;
      height: 31.2vw;
    }
  }
  .registerBut {
    width: 100vw;
    height:12vw;
    button {
      display: block;
      margin: 0 auto;
      width: 55.6vw;
      height: 12vw;
      line-height: 12vw;
      border-radius: 6vw;
      border: 0;
      background-color: #fff;
      color: #ff0E0E;
      font-size: @f8;
    }
  }
}
</style>
<template>
  <div class="exchangeWarp" v-show="showPage">
    <div class="content">
      <img class="up" src="../../../assets/image/invited_guide_up.png">
      <h1>数字印刷全产业链信息化解决方案</h1>
      <img class="down" src="../../../assets/image/invited_guide_down.png"/>
    </div>
    <div class="registerBut">
      <button @click="$router.push('/invitedRegister' + (invited_code ? ('?invited_code=' + invited_code) : ''))">立即注册</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 是否显示页面
      showPage: false,
      // 判断客户端类型：true为手机端，false为PC端
      flag: true,
      // 微信配置信息
      signPackage: null,
      // 当前网页url地址
      url: '',
      // 邀请码
      invited_code: ''
    }
  },
  methods: {
    // 获取微信配置信息
    getWxConfig() {
      this.$fetch.inviteGetWxConfig({ url: this.url }).then(data => {
        this.signPackage = data
        this.wxShare()
      })
    },
    wxShare() {
      wx.config({
        debug: false,
        appId: this.signPackage.appId,
        timestamp: parseInt(this.signPackage.timestamp),
        nonceStr: this.signPackage.nonceStr,
        signature: this.signPackage.signature,
        jsApiList: [
          'onMenuShareAppMessage',
          'onMenuShareTimeline',
          'onMenuShareQQ',
          'onMenuShareQZone',
          'onMenuShareWeibo',
          'updateAppMessageShareData',
          'updateTimelineShareData'
        ]
      })
      wx.ready(function () {
        let shareData = {
          title: '云玺印ERP-图文广告行业业绩提升的秘密武器',
          desc: '邀约有礼、立即分享',
          link: window.location.href,
          imgUrl: ''
        }
        if (wx.onMenuShareAppMessage) {
          // 兼容1.0接口
          // 分享给微信朋友
          wx.onMenuShareAppMessage(shareData)
          // 分享到朋友圈
          wx.onMenuShareTimeline(shareData)
          // 分享到手机QQ
          wx.onMenuShareQQ(shareData)
          // 分享到QQ空间
          wx.onMenuShareQZone(shareData)
        } else {
          // 1.4接口
          // 分享到手机QQ或微信朋友
          wx.updateAppMessageShareData(shareData)
          // 分享到朋友圈或QQ空间
          wx.updateTimelineShareData(shareData)
        }
        // 分享到微博
        if (wx.onMenuShareWeibo && (typeof (wx.onMenuShareWeibo) === 'function')) wx.onMenuShareWeibo(shareData)
      })
    }
  },
  activated() {
    this.url = window.location.href
    this.invited_code = ''
    let invited_code = this.$route.query.invited_code
    if (invited_code && invited_code !== 'undefined') {
      this.invited_code = invited_code
    }
    this.showPage = false
    // true为手机端，false为PC端
    this.flag = window._isMobilePlatform
    if (!this.flag) {
      this.$fetch.actionGetDomain().then(({ domain }) => {
        let agent_domain = domain.replace(/(.*)\/$/, '$1')
        if (this.invited_code) {
          window.location.href = agent_domain + '/invitedRegister?invited_code=' + this.invited_code
        } else {
          window.location.href = agent_domain + '/register/member'
        }
      }).catch(msg => {
        this.$toast(msg)
      })
    } else {
      this.showPage = true
      // 判断是否是微信内置浏览器
      if (window._isWxPlatform) {
        this.getWxConfig()
      }
    }
  }
}
</script>
