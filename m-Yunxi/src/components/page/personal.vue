/*
 * @Author: 陈航
 * @Date: 2018-12-19 10:04:34
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-02-21 10:11:51
 * @Desc: 个人中心页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.personal-wrapper{
  font-size:@f7;
  padding-top:4vw;
  padding-bottom: 10vw;
  .head{
    padding: 3vw 4vw;
    background-color: #fff;
    .flexUi;
    img{
      display:block;
      width:15vw;
      height:auto;
    }
    .info{
      margin-left:4vw;
      p{
        line-height: 180%;
        font-size:@f7;
      }
      .mobile{
        color:@6;
        font-size:@f6;
        line-height: 120%;
      }
      .level{
        font-size:@f6;
        line-height: 120%;
        color:@6;
      }
      .c3{
        color:@3;
        line-height: 180%;
        font-size:@f7;
      }
    }
  }
  .wallet{
    padding:0 4vw;
    background-color: #fff;
    width:92vw;
    margin:4vw 0;
    border:0!important;
  }
  .oper{
    padding:0 4vw;
    background-color: #fff;
    width:92vw;
  }
  .icon_nav{
    width:92vw;
    padding-top:3vw;
    padding-bottom:3vw;
    border-bottom:#eee solid 1px;
    .flexUi;
    i{
      color:@blue;
      font-size:@f10;
      margin-right:2vw;
    }
    .fw-700{
      font-weight: 700;
    }
    span{
      color:@6;
    }
  }
  li:last-child{
    border-bottom:0;
  }
  .loginout{
    margin-top:4vw;
    background-color: #fff;
    padding:3vw 0;
    width:100%;
    text-align: center;
    color:@blue;
    font-size:0.75rem;
  }
}
</style>
<template>
  <div class="personal-wrapper">
    <!-- 头像信息 -->
    <div class="head">
      <img :src="uploadHost + personalInfo.rank_image" @click="$router.push('rankPage')"/>
      <div class="info">
        <p class="name" v-if="personalInfo.full_name">{{personalInfo.full_name}}</p>
        <p class="mobile" :class="{c3:!personalInfo.full_name}">{{personalInfo.user_mobile}}</p>
        <p class="level" @click="$router.push('rankPage')">{{personalInfo.rank_name}}</p>
      </div>
    </div>
    <!-- 我的钱包 -->
    <div class="wallet icon_nav" @click="$router.push('finance_myWallet')">
      <i class="iconfont icon-qianbao"></i><span>账户余额：{{$f(personalInfo.user_money)}}</span>
    </div>
    <!-- 其他操作 -->
    <ul class="oper">
      <li class="icon_nav" @click="$router.push('finance_paymentDetail')">
        <i class="iconfont icon-caiwu"></i><span>财务中心</span>
      </li>
      <!-- <li class="icon_nav"  v-if="personalInfo.user_role === 11" @click="$router.push('employee_list')">
        <i class="iconfont icon-yuangongguanli"></i><span>员工管理</span>
      </li> -->
      <li class="icon_nav" @click="$router.push('safe_center')">
        <i class="iconfont icon-anquan"></i><span>安全管理</span>
      </li>
      <li class="icon_nav" v-if="personalInfo.user_role === 11" @click="$router.push('rankPage')">
        <i class="iconfont icon-agent-dengji"></i><span>提升等级</span>
      </li>
      <li class="icon_nav" @click="$router.push('myBuy_orderList')">
        <i class="iconfont icon-yigoumai fw-700"></i><span>{{personalInfo.user_role === 11?'购买记录':'订单中心'}}</span>
      </li>
      <li class="icon_nav" v-if="personalInfo.user_role === 11" @click="$router.push('myBuy_orderList?order_type=1')">
        <i class="iconfont icon-goumai"></i><span>代销记录</span>
      </li>
      <!-- <li class="icon_nav" v-if="personalInfo.user_role === 11" @click="$router.push('agent_addCustomer')">
        <i class="iconfont icon-addkehu"></i><span>添加客户</span>
      </li> -->
      <li class="icon_nav" v-if="personalInfo.user_role === 11" @click="$router.push('agent_customerList')">
        <i class="iconfont icon-kehu"></i><span>客户列表</span>
      </li>
      <li class="icon_nav" v-if="personalInfo.user_role === 11" @click="$router.push('agent_invite')">
        <i class="iconfont icon-yaoqinghaoyou"></i><span>邀请客户</span>
      </li>
      <li class="icon_nav" v-if="personalInfo.user_role === 1" @click="$router.push('member_invite')">
        <i class="iconfont icon-yaoqinghaoyou"></i><span>邀请好友</span>
      </li>
      <!-- <li class="icon_nav" @click="$router.push('message_remind')">
        <i class="iconfont icon-message_icon"></i><span>消息提醒</span><span class="count" v-if="count">{{count}}</span>
      </li> -->
    </ul>
    <!-- 退出登录 -->
    <div class="loginout" @click="exitLogin">退出登录</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 图片域名
      uploadHost: sessionStorage.uploadHost,
      // 个人信息
      personalInfo: {},
      // 未读消息数量
      count: 0,
      // 请求数量
      requestNum: 0
    }
  },
  watch: {
    requestNum(newVal) {
      if (newVal === 1) this.$loading()
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.$fetch.getUserInfo().then(data => {
        this.personalInfo = data
        // 更新用户角色
        this.$store.dispatch('CHANGE_USER_ROLE', data.user_role)
        // 图片地址
        this.uploadHost = data.host
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
        this.requestNum++
      }).catch(err => {
        this.$loading()
        console.log('getUserInfo => errMsg:', err)
      })
    },
    // 获取未读消息计数
    // notificationNoticeCount() {
    //   this.$fetch.notificationNoticeCount().then(({ count }) => {
    //     this.count = count
    //     this.requestNum++
    //   }).catch(err => {
    //     this.$loading()
    //     console.log('notificationNoticeCount => errMsg:', err)
    //   })
    // },
    // 退出登录
    exitLogin() {
      this.$fetch.logout()
      // 微信授权
      for (let key in sessionStorage) delete sessionStorage[key]
      localStorage.access_token = ''
      localStorage.auth_id = ''
      delete localStorage.access_token
      delete localStorage.auth_id
      // 更新用户角色
      this.$store.dispatch('CHANGE_USER_ROLE', 1)
      this.$router.push('/login')
    }
  },
  activated() {
    this.$loading('加载个人中心...')
    this.requestNum = 0
    this.getUserInfo()
    // this.notificationNoticeCount()
  }
}
</script>
