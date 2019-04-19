/*
 * @Author: 黄智强
 * @Date: 2018-05-05 13:39:19
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-04-10 18:43:00
 * @说明：系统首页，默认一进来显示的页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.all {
  font-size: @f7;
  .userWarp {
    padding-left: 6vw;
    padding-bottom: 5vw;
    color: #fff;
    background-color: @blue;
    .userInfo {
      .flexUi(space-between);
      padding: 7vw 0 5vw;
      .left {
        .flexUi;
        img {
          width: 10vh;
        }
        .info {
          margin-left: 5vw;
          color: #fff;
          p {
            font-size: @f7;
          }
          span {
            font-size: @f6;
          }
          .rankPage {
            margin-left: 2vw;
            font-size: @f5;
          }
        }
      }
      .right {
        height: 9vw;
      }
    }
    .message {
      .flexUi(center);
      font-size: @f6;
      .center {
        height: 8vw;
        width: 1px;
        margin: 0 5vw;
        background-color: #fff;
      }
      .left,
      .right {
        width: calc(~"39vw - 1px");
      }
      .left {
        text-align: right;
      }
    }
    .wallet {
      .flexUi(space-between);
      margin-right: 6vw;
      margin-top: 5vw;
      padding-top: 5vw;
      border-top: 1px solid #fff;
      .left {
        .flexUi;
        .iconfont {
          display: inline-block;
          font-size: @f9;
          margin-right: 1vw;
          height: @f8;
          line-height: @f8;
        }
        span {
          display: inline-block;
          height: @f8;
          line-height: @f8;
        }
      }
      .right {
        height: 9vw;
      }
    }
  }
  .title {
    .flexUi(space-between);
    padding: 2vw 4vw;
    background-color: #f5f5f5;
    .right {
      color: @6;
    }
  }
  .store {
    background-color: #fff;
    .storeList {
      padding: 3vw 4vw;
      .flexUi;
      font-size: @f6;
      li {
        width: 20vw;
        text-align: center;
        margin-right: 4vw;
        .top {
          position: relative;
          padding-bottom: 100%;
          margin-bottom: 2vw;
          div {
            .flexUi(center);
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 100%;
            color: #fff;
            border-radius: 100%;
            .iconfont {
              font-size: @f12;
              opacity: 0.2;
            }
            span {
              position: absolute;
            }
          }
        }
        .bottom {
          font-size: @f5;
          color: @9;
          height: 0.8rem;
          line-height: 0.8rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      li:nth-child(4) {
        margin-right: 0;
      }
    }
    .noStore {
      padding: 10vw 0;
      color: @9;
      font-size: @f6;
      text-align: center;
    }
  }
  .service {
    .serviceList {
      height: max-content;
      li {
        position: relative;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding: 3vw 4vw;
        width: 100%;
        margin-bottom: 4vw;
        background-color: #fff;
        .flexUi;
        img {
          width: 18%;
        }
        .right {
          margin-left: 5vw;
          line-height: @f8;
          .name {
            font-size: @f7;
            padding-bottom: 1vw;
            .sub {
              font-size: @f6;
            }
          }
          .code {
            font-size: @f5;
            color: @9;
          }
          .count {
            font-size: @f5;
          }
          .operate {
            margin-top: 2vw;
            .flexUi(flex-end);
            span {
              font-size: @f6;
              margin-right: 3vw;
            }
          }
        }
        .operate-buy {
          display: inline-block;
          position: absolute;
          bottom: 4vw;
          right: 4vw;
          padding: 2vw 3vw;
          font-size: @f5;
          line-height: 100%;
          background-color: @blue;
          border-radius: 0.5vw;
          color: #fff;
        }
      }
    }
  }
}
</style>
<template>
  <div class="all">
    <!-- 头部用户信息、账户余额 -->
    <div class="userWarp">
      <div class="userInfo">
        <div class="left">
          <img :src="loginInfo.host + loginInfo.rank_image"
               @click="$router.push('rankPage')" />
          <div class="info">
            <p>{{loginInfo.user_mobile}}</p>
            <span @click="$router.push('rankPage')">{{loginInfo.rank_name}}
              <span class="rankPage"
                    v-if="loginInfo.user_role=== 11">提升等级</span>
            </span>
          </div>
        </div>
        <img class="right"
             src="../../assets/image/iconbg.png"
             @click="$router.push('personal')">
      </div>
      <div class="message">
        <div class="left"
             v-if="loginInfo.user_role==11"
             @click="$router.push('/auditProcess')">
          <i class="iconfont icon-renzheng"></i>
          <span>代理商认证</span>
        </div>
        <div class="left"
             v-else
             @click="$router.push('/signAgreement')">
          <i class="iconfont icon-renzheng"></i>
          <span>马上成为代理商</span>
        </div>
        <div class="center"></div>
        <div class="right"
             @click="inviteFun">
          <i class="iconfont icon-yaoqinghaoyou"></i>
          <span>邀请 {{loginInfo.user_role=== 11?'客户':'好友'}}</span>
        </div>
      </div>
      <div class="wallet">
        <div class="left"
             @click="$router.push('finance_walletDetail')">
          <i class="iconfont icon-qianbao"></i>
          <span>账户余额: {{$f(loginInfo.user_money)}}</span>
        </div>
        <img class="right"
             src="../../assets/image/recharge.png"
             @click="$router.push('finance_myWallet')">
      </div>
    </div>
    <!-- 我的门店 -->
    <div class="store">
      <div class="title">
        <div class="left">我的门店</div>
        <div class="right"
             @click="toMyStore">更多门店</div>
      </div>
      <ul class="storeList"
          v-if="storeList && storeList.length">
        <li v-for="(i,j) in storeList"
            :key="j">
          <div class="top">
            <div :style="{'background-color':i.bg_color}">
              <i class="iconfont icon-mendianguanli"></i>
              <span>{{i.product_name}}</span>
            </div>
          </div>
          <div class="bottom">{{i.store_name}}</div>
        </li>
      </ul>
      <div v-else
           class="noStore">
        您还没有门店哦
      </div>
    </div>
    <!-- 我的服务 -->
    <div class="service"
         v-if="userService.length">
      <div class="title">
        <div class="left">我的服务</div>
        <div class="right"
             @click="$router.push('/main/service_serviceBuy')">查看所有</div>
      </div>
      <ul class="serviceList">
        <li v-for="(i,j) in userService"
            :key="j">
          <img :src="uploadHost + i.image_url"
               alt="">
          <div class="right">
            <div class="name">
              {{i.service_name}}
              <span class="sub">
                <!-- (<span class="red">{{i.is_buy===1?'已购买':'未购买'}}</span>) -->
              </span>
            </div>
            <div class="code">{{i.service_code}}</div>
            <div class="count">
              <span class="red">{{i.is_buy===1?'已购买':'未购买'}}</span>
            </div>
            <!-- <div class="operate" v-if="i.is_buy===1">
            <div class="count">{{i.service_name && i.service_name.replace('服务','')}}剩余{{i.num + i.unit_name}}</div> -->
            <!-- <div class="operate" v-if="i.is_buy===1">
              <span class="blue" v-if="i.service_code ==='service_sms'" @click="toSmsRecord(i)">发送记录</span>
              <span class="blue" @click="toBuyRecord(i)">订购记录</span>
              <span class="green" @click="toServiceBuy(i)">再次购买</span>
            </div>
            <div class="operate" v-else>
              <span class="red" @click="$router.push('service_serviceBuy')">立即订购</span>
            </div> -->
          </div>
          <span class="operate-buy red"
                @click="$router.push('service_serviceBuy')">立即订购</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 请求次数
      requestNum: 0,
      // 用户信息
      loginInfo: {},
      // 门店
      storeColor: ['#7ed3ff', '#55d9ad', '#fed302', '#8391da'],
      // 门店列表
      storeList: [],
      // 服务列表
      userService: [{}],
      // 图片域名
      uploadHost: ''
    }
  },
  filters: {
    formatMoney (val) {
      val = Number(val).toFixed()
      if (Number(val) > 1) val = val.split('.')[0].replace(/\B(?=(?:\d{3})+$)/g, ',')
      return '¥' + val
    }
  },
  watch: {
    requestNum (val) {
      if (val === 3) this.$loading()
    }
  },
  methods: {
    // 邀请
    inviteFun () {
      if (this.loginInfo.user_role === 11) this.$router.push('agent_invite')
      else this.$router.push('member_invite')
    },
    // 跳转到我的门店
    toMyStore () {
      this.$router.push('/main/store_myStore')
    },
    // 跳转到发送记录
    toSmsRecord (i) {
      sessionStorage.smsRecordObj = JSON.stringify(i)
      this.$router.push('service_smsRecord')
    },
    // 跳转到订购记录页面
    toBuyRecord (i) {
      sessionStorage.buyRecordObj = JSON.stringify(i)
      this.$router.push('service_buyRecord')
    },
    // 跳转到服务购买页面
    toServiceBuy (i) {
      sessionStorage.serviceObj = JSON.stringify(i)
      this.$router.push('service_serviceBuy')
    },
    // 获取用户信息
    getUserInfo () {
      this.$fetch.getUserInfo().then(data => {
        this.loginInfo = data
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
      }).catch(err => console.log('getUserInfo => errMsg:', err))
    },
    // 获取门店
    getStore (params) {
      this.$fetch.getStore(params).then(data => {
        let num = 0
        let target = []
        data.some(item => {
          item.store_list.some(val => {
            target.push(val)
            return ++num === 4
          })
          return num === 4
        })
        if (target.length) {
          target.map((item, index) => {
            item.bg_color = this.storeColor[index]
          })
        }
        this.storeList = target
        this.requestNum++
      })
    },
    // 获取服务
    getService () {
      this.$fetch.serviceServiceList('&user_service=1').then(data => {
        this.userService = data
        this.requestNum++
      })
    }
  },
  activated () {
    this.$loading('加载首页...')
    this.requestNum = 0
    this.getUserInfo()
    this.getStore()
    this.getService()
  }
}
</script>
