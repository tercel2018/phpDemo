/*
 * @Author: 陈航
 * @Date: 2018-11-22 11:54:17
 * @Last Modified time: 2018-11-22 11:54:17
 * @说明：邀请组件
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
.invite-components-wrapper{
  width:100%;
  background-color: #f7db9f;
  padding-bottom:4vh;
  min-height:96vh;
  .invite-content{
    width:100%;
    height:146.2vw;
    background-size:100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image:url(../../assets/image/invite_wrapper_bg.png);
    .invite_rule{
      color:#fff;
      padding-top:3.22vw;
      padding-right:4.15vw;
      line-height: 100%;
      text-align: right;
      font-size:@f5;
      position:relative;
      &:before{
        position: absolute;
        content:'';
        left: 0;
        right: 0;
        top: -3vw;
        bottom: -3vw;
      }
    }
    .invite-content-text{
      margin-left:22.96vw;
      width:61.85vw;
      height:19.54vw;
      position: relative;
      .text{
        height:19.54vw;
        mix-blend-mode: screen;
      }
      .gold{
        position: absolute;
        top:50%;
        right:0;
        transform: translateY(-50%);
        height:6.48vw;
      }
    }
    .invite-qrcode-box{
      margin:4vw auto 0;
      .invite-qrcode-text{
        color:#fff;
        text-align: center;
        font-weight: 700;
        line-height: 110%;
        text-shadow: 0 0.2rem 0.4rem rgba(255,72,0,.75);
      }
      .small{
        font-size:0.65rem;
      }
      .big{
        font-size:1.5rem;
        margin-bottom:1.7vw;
      }
      .invite-qrcode{
        margin:0 auto;
        width:46.3vw;
        padding-top:3.3vw;
        height:43vw;
        background-color: #fff;
        border-radius:0.93vw;
        img{
          margin:0 auto;
          width:33.3vw;
          height:33.3vw;
        }
        p{
          text-align: center;
          line-height:300%;
          color:#333;
          font-size:@f5;
        }
      }
    }
    .invite-steps{
      width:max-content;
      .flexUi(space-between);
      margin:7vw auto 0;
      max-width:90.4vw;
      overflow: hidden;
      li{
        width: max-content;
        padding: 0 2.5vw;
        img{
          display: block;
          margin:0 auto 2vw;
          width:auto;
          height:11.4vw;
        }
        p{
          font-size:0.5rem;
          color:#333;
          text-align: center;
        }
      }
      .next{
        position: relative;
        &:after{
          content: '';
          position: absolute;
          top:5.7vw;
          right:-0.8vw;
          transform: translateY(-50%);
          width:1.6vw;
          height:3.2vw;
          background-size:100% 100%;
          background-position: center;
          background-repeat: no-repeat;
          background-image:url(../../assets/image/invite_steps_arrow.png);
        }
      }
    }
    .shareTo{
      margin:5vw auto 0;
      text-align: center;
      width:22vw;
      position: relative;
      font-size:@f6;
      color:#ff7f01;
      font-weight:700;
      &:after, &:before{
        position: absolute;
        content: '';
        top:50%;
        transform: translateY(-50%);
        height:1px;
        width:29vw;
        background-color: #f7db9f;
      }
      &:after{
        left:21vw;
      }
      &:before{
        left:-28vw;
      }
    }
    .invite-platform{
      .flexUi(space-between);
      width:63vw;
      margin:1vw auto 0;
      li{
        width:15vw;
        height:15vw;
        background-size:100% 100%;
        background-position: center;
        background-repeat: no-repeat;
      }
      .qq{
        background-image:url(../../assets/image/invite_txqq.png);
      }
      .wechat{
        background-image:url(../../assets/image/invite_wx.png);
      }
      .sina{
        background-image:url(../../assets/image/invite_wb.png);
      }
    }
    @media screen and (max-width:360px) {
      .shareTo{
        margin:3vw auto 0;
      }
      .invite-platform{
        margin:0 auto;
      }
    }
  }
  .invite_table_wrapper{
    margin: 6.8vw auto 0;
    padding:8.9vw 2.5vw 3.3vw;
    width:85.4vw;
    border-radius:1.86vw;
    background-color:#fdfaf3;
    box-shadow: 0 0 0.4rem #f7d490;
    position:relative;
    .invite_table_top{
      position:absolute;
      top:-6.5vw;
      left:1.5vw;
      padding-top:1.96vw;
      width:87.3vw;
      height:11.1vw;
      font-size:@f7;
      color:#fff;
      letter-spacing: @f7*0.1;
      line-height:11.1vw;
      text-align: center;
      background-size:73.15vw 13.06vw;
      background-position: left center;
      background-repeat: no-repeat;
      background-image:url(../../assets/image/invite_table_top.png);
    }
    .invite_table{
      width:100%;
      border-collapse:collapse;
      thead{
        background-color: #fff;
      }
      th{
        white-space: nowrap;
      }
      tr, th, td{
        line-height: 0.8rem;
      }
      th, td{
        border:solid 1px #e7e7e7;
        font-size: 0.55rem;
        color:#60482e;
        font-weight: 400;
        text-align: center;
        padding: 0.3rem 0;
      }
      th:first-child, td:first-child{
        border-left:0;
      }
      th:last-child, td:last-child{
        border-right:0;
      }
      tbody tr:nth-child(2n-1) td{
        background-color: #fdfaf3;
      }
      tbody tr:nth-child(2n) td{
        background-color: #fff;
      }
    }
  }
  .invite_table_bottom{
    margin:2vw auto;
    width:90.4vw;
    text-align: right;
    font-size: @f5;
    color:#676564;
    span{
      color:#fe8222;
    }
  }
  .activity-rule-mask{
    position: fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    z-index:9999;
    background-color: rgba(0,0,0,.6);
    .activity-rule-container{
      position: fixed;
      left:50%;
      top:50%;
      width:76.4vw;
      // min-height:60vh;
      transform: translate(-50%, -50%);
      .activity-rule-inner{
        box-sizing: border-box;
        padding:5.5vw 4.4vw;
        position:relative;
        width:76.4vw;
        background-color: #f6e7d2;
        &:before,&:after{
          content:'';
          display:block;
          position:absolute;
          left:50%;
          width:79.44vw;
          height:3.8vw;
          background-size:79.44vw 3.8vw;
          background-position:center;
          background-repeat: no-repeat;
        }
        &:before{
          bottom:0;
          transform: translate(-50%, 100%);
          background-image:url(../../assets/image/activity_rule_down.png);
        }
        &:after{
          top:0;
          transform: translate(-50%, -100%);
          background-image:url(../../assets/image/activity_rule_up.png);
        }
        .activity-rule-content{
          box-sizing: border-box;
          padding:4.5vw;
          width:65.4vw;
          border:solid 1px #e3ba80;
          h4{
            margin: 0 auto;
            text-align: center;
            padding: 1vw 0;
            line-height: 100%;
            width:5*@f7;
            font-size: @f7;
            color:#e96f25;
            position: relative;
            &:before,&:after{
              content:'';
              display:block;
              position:absolute;
              width:14vw;
              height:2.22vw;
              top:50%;
              background-size:14vw 2.22vw;
              background-position:center;
              background-repeat: no-repeat;
            }
            &:after{
              left: 5.5*@f7;
              transform: translateY(-50%);
              background-image:url(../../assets/image/activity_rule_title.png);
            }
            &:before{
              left: calc(~'-0.35rem - 14vw');
              left: -webkit-calc(~'-0.35rem - 14vw');
              transform-origin: center center;
              -webkit-transform-origin: center center;
              transform: translateY(-50%) rotate(180deg);
              -webkit-transform: translateY(-50%) rotate(180deg);
              background-image:url(../../assets/image/activity_rule_title.png);
            }
          }
          .activity-rule-list{
            color:#48271d;
            font-size:@f5;
            text-align: justify;
            min-height:40vh;
            li{
              padding: 3vw 0 1vw;
              line-height:150%;
            }
            li:last-child{
              padding: 3vw 0 0;
            }
          }
        }
      }
      .activity-rule-close{
        margin:10vw auto 0;
        width:10vw;
        height:10vw;
        background-color: #f6e7d2;
        border-radius:50%;
        i{
          display: block;
          margin: 0;
          text-align: center;
          line-height: 10vw;
          color:#656462;
        }
      }
    }
  }
}
</style>
<template>
  <div class="invite-components-wrapper" :id="id">
    <div class="invite-content">
      <p class="invite_rule" @click="showActivityRuleMask=true">活动规则</p>
      <div class="invite-content-text">
        <img class="text" src="../../assets/image/invite_title1.png"/>
        <img class="gold" src="../../assets/image/guide_gold.png"/>
      </div>
      <div class="invite-qrcode-box">
        <template v-if="current_role === 1">
          <p class="invite-qrcode-text small">邀约成功付费双方各领</p>
          <p class="invite-qrcode-text big">{{Number(memberCommission) > 0? memberCommission:'150'}}元奖励金</p>
        </template>
        <template v-else>
          <p class="invite-qrcode-text small">邀约成功付费代理商最高获</p>
          <p class="invite-qrcode-text big">50%返佣</p>
        </template>
        <div class="invite-qrcode">
          <img :src="'http://zixuephp.net/inc/qrcode_img.php?url=' + invitedUrl"/>
          <p>{{isWxBrowser?'长按二维码并发送给朋友':'我的分享二维码'}}</p>
        </div>
      </div>
      <ul class="invite-steps">
        <li class="next">
          <img src="../../assets/image/invite_steps_link.png"/>
          <p>分享邀请链接</p>
        </li>
        <li class="next">
          <img src="../../assets/image/invite_steps_store.png"/>
          <p>{{current_role===11?'客户':'好友'}}点击链接注册并开店</p>
        </li>
        <li class="invite-step-wallet">
          <img src="../../assets/image/invite_steps_wallet.png"/>
          <p>获得{{current_role===11?'佣金':'奖现金'}}</p>
        </li>
      </ul>
      <p class="shareTo">分享到</p>
      <ul class="invite-platform">
        <li class="qq" @click="shareTo('qqFriend')"></li>
        <li class="wechat" @click="shareTo('wechatFriend')"></li>
        <li class="sina" @click="shareTo('weibo')"></li>
      </ul>
    </div>
    <!-- 邀请列表 -->
    <div class="invite_table_wrapper">
      <p class="invite_table_top">我的邀请</p>
      <table class="invite_table">
        <thead>
          <tr v-if="current_role === 1">
            <th>会员手机号</th>
            <th>奖励金</th>
            <th>状态</th>
            <th>注册时间</th>
          </tr>
          <tr v-else-if="current_role === 11">
            <th>客户手机号</th>
            <th>佣金回报</th>
            <th>添加时间</th>
          </tr>
        </thead>
        <template v-if="current_role === 1">
          <tbody v-if="userList && userList.length">
            <tr v-for="(i, index) in userList" :key="index">
              <td>{{i.user_mobile?(String(i.user_mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')):''}}</td>
              <td>{{i.commission}}</td>
              <td>{{i.status}}</td>
              <td>{{i.reg_time}}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <tr><td colspan="4">无数据</td>
            </tr>
          </tbody>
        </template>
        <template v-else-if="current_role === 11">
          <tbody v-if="userList && userList.length">
            <tr v-for="(i, index) in userList" :key="index">
              <td>{{i.cus_mobile?(String(i.cus_mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')):''}}</td>
              <td>{{i.total_amount}}</td>
              <td>{{i.add_time}}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="3">无数据</td>
            </tr>
          </tbody>
        </template>
      </table>
      <load-more v-show="userList && userList.length && (maxPageNum > 1)" :show-loading="loadMoreStatus" :tip="loadMoreMsg" background-color="#fbf9fe"></load-more>
    </div>
    <p class="invite_table_bottom" v-if="commission">共获得奖励金<span>{{commission}}</span>元</p>
    <!-- 活动规则  -->
    <div class="activity-rule-mask" v-if="showActivityRuleMask" @click="showActivityRuleMask=false" @touchmove.prevent>
      <div class="activity-rule-container">
        <div class="activity-rule-inner" @click.stop>
          <div class="activity-rule-content">
          <h4>活动规则</h4>
          <div class="activity-rule-list">
              <ul v-if="current_role === 11">
                <li>1.你可以点击页面右上方把邀请链接分享到QQ或微信，或者长按邀请二维码发送给微信好友。</li>
                <li>2.客户直接打开邀请链接或通过微信长按识别二维码完成注册。</li>
                <li>3.客户注册成功后可在【邀请客户】中查看详情。</li>
              </ul>
              <ul v-else>
                <li>1.你可以点击页面右上方把邀请链接分享到QQ或微信，或者长按邀请二维码发送给微信好友。</li>
                <li>2.好友直接打开邀请链接或通过微信长按识别二维码完成注册。</li>
                <li>3.好友注册成功后可在【邀请好友】中查看详情。</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="activity-rule-close" @click="showActivityRuleMask=false">
          <i class="iconfont icon-cha"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LoadMore } from 'vux'
export default {
  props: ['userRole', 'id'],
  components: { LoadMore },
  data() {
    return {
      // 用户角色
      current_role: 0,
      // 好友（客户）列表数据
      userList: [],
      // 当前页数
      currPage: 1,
      // 分页条数
      pageSize: 20,
      // 最大页数
      maxPageNum: 0,
      // 请求次数
      invitedUrl: '',
      // 邀请会员(客户)获得奖励金（佣金）
      memberCommission: '',
      // 邀请好友（客户）总数
      totalCount: 0,
      // 奖励金（佣金）总数
      commission: 0,
      // 请求次数
      requestNum: 0,
      // 加载更多
      loadMoreIndicator: null,
      // 加载状态
      loadMoreStatus: false,
      // 加载更多：正在加载 ；我是有底线的；加载更多
      loadMoreMsg: '加载更多',
      // 是否微信浏览器
      isWxBrowser: false,
      // 微信配置信息
      signPackage: {},
      // 显示活动规则弹窗
      showActivityRuleMask: false
    }
  },
  watch: {
    'userRole'(newVal, oldVal) {
      if (!this.current_role) {
        if (Number(newVal) === 1 || Number(newVal) === 11) {
          this.current_role = Number(newVal)
          this.initEvent()
        }
      } else {
        if (this.current_role !== Number(newVal)) {
          this.current_role = Number(newVal)
          this.initEvent()
        }
      }
    }
  },
  methods: {
    // 获取会员（代理商）邀请码
    inviteGetInvitedCode() {
      this.$fetch.inviteGetInvitedCode().then(({ invited_code, member_commission }) => {
        let invitedUrl = window.location.origin.trim().replace(/^(.*)\/$/, '$1') + '/invitedEntry?invited_code=' + invited_code
        this.invitedUrl = invitedUrl
        if (this.isWxBrowser) {
          this.getWxConfig(invitedUrl)
        }
        this.memberCommission = member_commission
      })
    },
    // 邀请好友（客户）列表
    getInvitedUserList(field = '') {
      // this.$loading('好友列表')
      if (this.requestNum < 1) this.$loading('邀请' + (this.current_role === 1 ? '好友' : '客户') + '...')
      this.loadMoreStatus = true
      this.loadMoreMsg = '正在加载'
      if (this.current_role === 1) {
        field += '&is_invited=1&page_size=' + this.pageSize + '&page=' + this.currPage
        this.$fetch.inviteGetInvitedUserList(field).then(({ list, pagination, commission }) => {
          getList(this, list, pagination, commission)
        }).catch(err => {
          this.$loading()
          console.log('errMsg => ' + err)
        })
      } else {
        field += '&is_invited=1&statistics=1&page_size=' + this.pageSize + '&page=' + this.currPage
        this.$fetch.customerList(field).then(({ customer_list, pagination, agent_set_user_rank }) => {
          getList(this, customer_list, pagination, 0)
        }).catch(err => {
          this.$loading()
          console.log('errMsg => ' + err)
        })
      }
      // 处理数据
      function getList(self, list, pagination, commission) {
        if (self.currPage === 1) {
          self.userList = list
        } else {
          self.userList = self.userList.concat(list)
        }
        self.maxPageNum = Math.ceil(pagination.totalCount / self.pageSize)
        self.loadMoreStatus = false
        if (self.maxPageNum > self.currPage) {
          self.loadMoreMsg = '加载更多'
        } else {
          self.loadMoreMsg = '我是有底线的'
        }
        self.commission = commission
        if (self.requestNum < 1) self.$loading()
        self.requestNum++
      }
    },
    // 初始化事件
    initEvent() {
      let token = localStorage.access_token
      if ((this.current_role === 1 || this.current_role === 11) && token) {
        this.inviteGetInvitedCode()
        this.getInvitedUserList()
        this.loadMoreIndicator = () => this.loadMoreFun()
        window.addEventListener('scroll', this.loadMoreIndicator, false)
      }
    },
    // 加载更多
    loadMoreFun() {
      let self = this
      if (self.loadMoreStatus) return false
      let isnearBottom = self.$willScrollToBottom(30)
      if (isnearBottom && this.maxPageNum > self.currPage) {
        self.currPage++
        self.getInvitedUserList()
      }
    },
    // 获取微信配置信息
    getWxConfig(invited_url) {
      this.$fetch.inviteGetWxConfig({ url: window.location.href }).then(data => {
        this.signPackage = data
        this.wxShare(invited_url)
      }).catch(err => {
        this.$toast(err)
      })
    },
    // 微信分享
    wxShare(invited_url) {
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
          link: invited_url,
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
      wx.error(function(res) {
        console.log('wx.error------begin')
        console.log(res)
        console.log('wx.error------end')
      })
    },
    // 第三方分享
    shareTo(stype) {
      let title = '云玺印ERP-图文广告行业业绩提升的秘密武器'
      let desc = '邀约有礼，马上分享！'
      let imgLink = ''
      // 不支持原生分享降级处理
      let that = this
      function shareFun(stype, title, imgLink, that) {
        // 分享到新浪微博
        if (stype === 'weibo') {
          window.open('http://service.weibo.com/share/share.php?sharesource=weibo&title=' + title + '&pic=' + imgLink + '&appkey=2706825840&url=' + that.invitedUrl)
        }
        // 分享到qq或微信
        if (that.isWxBrowser) {
          if (stype === 'qqFriend') {
            that.$toast('请先确保您的手机已经安装QQ应用，点击右上角即可分享到手机QQ')
          } else if (stype === 'wechatFriend') {
            that.$toast('点击右上角发送给朋友')
          }
        } else {
          if (stype === 'qqFriend') {
            that.$toast('当前浏览器不支持QQ分享')
          } else if (stype === 'wechatFriend') {
            that.$toast('当前浏览器不支持微信分享')
          }
        }
      }
      // 浏览器原生分享
      if (!this.isWxBrowser) {
        let nativeShare = new NativeShare()
        // 分享信息设置
        nativeShare.setShareData({
          title: title,
          desc: desc,
          link: this.invitedUrl,
          icon: imgLink,
          success: function () {
            console.log('success')
          },
          fail: function () {
            console.log('fail')
          }
        })
        try {
          nativeShare.call(stype)
        } catch (err) {
          // 如果不支持原生分享，你可以在这里做降级处理
          shareFun(stype, title, imgLink, that)
        }
      } else {
        // 微信浏览器分享
        shareFun(stype, title, imgLink, that)
      }
    }
  },
  activated() {
    this.invitedUrl = ''
    this.currPage = 1
    this.requestNum = 0
    this.totalCount = 0
    this.commission = 0
    this.memberCommission = 0
    this.maxPageNum = 0
    this.userList = []
    this.signPackage = {}
    this.isWxBrowser = this.$isWxBrowser()
    this.current_role = 0
    if (sessionStorage.user_role) {
      let role = sessionStorage.user_role
      this.current_role = Number(role)
    } else if (this.useRole) {
      this.current_role = Number(this.useRole)
    }
    this.initEvent()
  },
  deactivated() {
    if (this.loadMoreIndicator) {
      window.removeEventListener('scroll', this.loadMoreIndicator)
    }
  }
}
</script>
