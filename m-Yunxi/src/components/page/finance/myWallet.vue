/*
 * @Author: 陈航
 * @Date: 2018-10-10 10:32:54
 * @Last Modified by: 陈航
 * @说明：我的钱包页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.wallet-wrapper{
  font-size:@f7;
  text-align: center;
  .head{
    width:92vw;
    padding:8vw 4vw 3.5vw;
    background-color: @blue;
    color:#fff;
    .money{
      font-size:@f12;
      line-height: 150%;
    }
    .detail-card{
      margin:6vw 0;
      width:100%;
      .flexUi;
      li{
        width:50%;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        i{
          font-size:1.6rem;
        }
        span{
          line-height: 200%;
        }
      }
      .border{
        border-right:solid 1px #eee;
      }
    }
    .action-recharge,
    .action-withdraw{
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      margin-bottom:3.5vw;
      padding:2vw 0;
      width:100%;
      border-radius:0.15rem;
    }
    .action-recharge{
      background-color: rgba(255, 255, 255, .9);
      border:solid 1px rgba(255, 255, 255, .9);
      color:@blue;
    }
    .action-withdraw{
      color:rgba(255, 255, 255, .8);
      border:solid 1px rgba(255, 255, 255, .5);
    }
    .action-record{
      font-size: @f5;
      color:rgba(255, 255, 255, .8);
    }
  }
  .recharge-popup-mask{
    position: fixed;
    top:0;
    left:0;
    opacity: 0;
    z-index:-999;
    width:100%;
    height:100%;
    background-color: rgba(33,33,33,.5);
    transition: opacity 0 0.5s, z-index 0s;
    -webkit-transition: opacity 0 0.5s, z-index 0s;
  }
  .recharge-popup-mask.show{
    opacity: 1;
    z-index:899;
  }
  .recharge-popup{
    position: fixed;
    bottom:-100vh;
    left:0;
    width:100%;
    z-index:900;
    background-color: #f3f3f3;
    transition: bottom 0.5s;
    -webkit-transition: bottom 0.5s;
    h4{
      line-height: 240%;
      font-weight: 400;
    }
    .recharge-popup-section{
      background-color: #fff;
      width:92vw;
      padding:4vw;
      .recharge-activity-list{
        width:100%;
        .flexUi;
        li{
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          width:48vw;
          margin-bottom:4vw;
          border:solid 1px #ccc;
          border-radius:0.15rem;
          line-height:240%;
          font-size:@f6;
        }
        li:nth-child(odd){
          margin-right:4vw;
        }
        li.active{
          color:@blue;
          border:solid 1px @blue;
        }
      }
    }
    .recharge-money-input{
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      width:100%;
      margin-bottom:3vw;
      border:solid 1px #ccc;
      border-radius:0.15rem;
      line-height:240%;
      font-size:@f7;
      padding:0 4vw;
      .flexUi(space-between);
      input{
        border:0;
        display: inline-block;
        line-height: 200%;
        font-size:@f8;
        width:55vw;
        text-align: right;
        outline:none;
      }
    }
    .recharge-activity-msg{
      text-align:left;
      color:#e53738;
      font-size:@f5;
    }
    .nowPay{
      width:100%;
      line-height: 240%;
      background-color: @blue;
      color:#fff;
      border-radius:0.15rem;
    }
  }
  .recharge-popup.show{
    bottom:0;
  }
  .card-voucher{
    h4.card-voucher-title{
      padding:4vw 0;
      font-weight: 400;
    }
    .quanList{
      margin-top:2vw;
      padding:3vw 0;
      width:100%;
      background-color: #fff;
      text-align: left;
      .quanItem{
        .flexUi(space-between);
        width:90vw;
        margin:0 auto 5vw;
        height:39vw;
        background-image:url(../../../assets/image/coupon.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
        position: relative;
        .left{
          margin-left:7.4vw;
          h3{
            font-size:@f7;
            line-height:150%;
            padding-bottom:1.5vw;
            color:@3;
            font-weight:550;
            span{
              font-size:@f5;
              margin-left:2vw;
              color:@6;
            }
          }
          .version{
            overflow: hidden;
            p{
              float:left;
              font-size:@f6;
              margin-right:2vw;
              padding:1vw 2vw;
              border:solid 1px #cdcdcd;
              border-radius:3px;
              color:#5f5f5f;
            }
          }
          .intro{
            padding-top:3vw;
            p{
              font-size:@f5;
              color:#9c9c9c;
            }
          }
        }
        p.oper{
          position: absolute;
          top:50%;
          right:7vw;
          transform: translateY(-50%);
          color:@blue;
          font-size:0.65rem;
          padding: 2vw 2vw 4vw;
        }
      }
      .disabled{
          background-image:url(../../../assets/image/coupon-disabled.png);
      }
    }
  }
}
</style>
<template>
  <div class="wallet-wrapper" v-show="requestNum >= 4">
    <!-- 我的余额 -->
    <div class="head">
      <p class="money">{{$f(accountInfo.user_money)}}</p>
      <p class="title">我的余额</p>
      <ul class="detail-card">
        <li class="border" @click="$router.push('finance_walletDetail')">
          <i class="iconfont icon-mingxi"></i><br/>
          <span>钱包明细</span>
        </li>
        <li @click="$router.push('finance_paymentDetail')">
          <i class="iconfont icon-caiwu"></i><br/>
          <span>财务中心</span>
        </li>
      </ul>
      <p class="action-recharge" @click="popupShow = true">立即充值</p>
      <p class="action-withdraw" @click="willWithdraw">申请提现</p>
      <p class="action-record" @click="$router.push('finance_withdrawRecord')">提现记录</p>
    </div>
    <!-- 我的卡券 -->
    <div class="card-voucher">
      <h4 class="card-voucher-title">我的卡券</h4>
      <tab bar-active-color="#1699e7" active-color="#1997e3" :scroll-threshold="4">
        <tab-item v-for="(i, index) in status" :selected="current_status==index?true:false" @on-item-click="filterFun(index, i)" :key="index">{{i}}</tab-item>
      </tab>
      <ul class="quanList" v-if="cardList && cardList.length">
        <li class="quanItem"  v-for="(i,index) in cardList" v-if="i.activity_type_code=='coupon' || i.activity_type_code=='trial'"  :key="index" :class="{'disabled':i.status!=='未使用' && !i.is_new_activity}">
          <template v-if="i.activity_type_code=='coupon'">
            <div class="left">
              <h3>{{i.activity_type}}
                <span :class="{'blue':(i.status==='未使用' || i.is_new_activity)}">
                  {{i.is_new_activity?'未领取':i.status}}
                </span>
              </h3>
              <div class="version">
                <p v-if="i.activity_package_name">{{i.activity_package_name}}</p>
              </div>
              <div class="intro">
                <p>{{i.apply_product}}</p>
                <p>活动时间：{{i.start_time.split(' ')[0]}} 到 {{i.end_time.split(' ')[0]}}</p>
              </div>
            </div>
            <p class="oper" v-if="i.is_new_activity" @click="receiveTicket(i.activity_id)">立即领取</p>
            <p class="oper" v-else-if="i.status==='未使用'" @click="$router.push('store_openStore')">立即使用</p>
          </template>
          <template v-else-if="i.activity_type_code=='trial'">
            <div class="left">
              <h3>{{i.activity_type}}
                <span :class="{'blue':(i.status==='未使用' || i.is_new_activity)}">
                  {{i.is_new_activity?'未领取':i.status}}
                </span>
              </h3>
              <div class="version">
                <p>{{i.package_name}}</p>
                <p>{{i.month}}个月</p>
              </div>
              <div class="intro">
                <p>最多可开{{i.max_store_count}}家店</p>
                <p>活动时间：{{i.start_time.split(' ')[0]}} 到 {{i.end_time.split(' ')[0]}}</p>
              </div>
            </div>
            <p class="oper" v-if="i.is_new_activity" @click="receiveTicket(i.activity_id)">立即领取</p>
            <p class="oper" v-else-if="i.status==='未使用'" @click="$router.push('store_openStore')">立即使用</p>
          </template>
          <!-- <template v-else-if="i.activity_type_code=='activity_package'">
            <div class="left">
              <h3>{{i.activity_type}}
                <span :class="{'blue':(i.status==='未使用' || i.is_new_activity)}">
                  {{i.is_new_activity?'未领取':i.status}}
                </span>
              </h3>
              <div class="version">
                <p>{{i.activity_name}}</p>
              </div>
              <div class="intro">
                <p>活动时间：{{i.start_time.split(' ')[0]}} 到 {{i.end_time.split(' ')[0]}}</p>
              </div>
            </div>
            <p class="oper" v-if="i.is_new_activity" @click="receiveTicket(i.activity_id)">立即领取</p>
            <p class="oper" v-else-if="i.status==='未使用'" @click="$router.push('store_openStore')">立即使用</p>
          </template> -->
        </li>
      </ul>
      <no-data v-else position="static" :tips="tips"></no-data>
    </div>
    <!-- 充值弹窗 -->
    <div class="recharge-popup-mask" :class="{show:popupShow}" @click="popupShow = false"></div>
    <div class="recharge-popup" :class="{show:popupShow}">
      <h4>余额充值</h4>
      <div class="recharge-popup-section">
        <ul class="recharge-activity-list" v-if="rankList.length && accountInfo.user_role === 11">
          <li v-for="(i,index) in rankList" :class="{'active':i.checked}" :key="index" v-if="i.discount<accountInfo.discount && i.deposit_amount != 0" @click="rechargeActivety(i)">
            预存{{Number(i.deposit_amount)}}成为{{i.rank_name}}
          </li>
        </ul>
        <div class="recharge-money-input">
          <label>充值金额</label>
          <p class="input">
            <input type="number" v-model="rechargeMoney">
            <span>元</span>
          </p>
        </div>
        <p class="nowPay" @click="nowRecharge">立即充值</p>
      </div>
    </div>
    <!-- 确定按钮 -->
    <div v-transfer-dom>
      <confirm v-model="showConfirm"
      title="代理商认证"
      confirm-text="立即认证"
      @on-confirm="routerToAuth">
        <p style="text-align:center;">您尚未进行代理商资料认证或资料暂未通过审核，请前往认证。</p>
      </confirm>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, LoadMore, Confirm, TransferDomDirective as TransferDom } from 'vux'
import noData from '@/components/common/noData'
export default {
  components: { Tab, TabItem, LoadMore, noData, Confirm },
  directives: {
    TransferDom
  },
  data() {
    return {
      // 请求次数
      requestNum: 0,
      // 用户信息
      userInfo: {},
      // 显示确定弹窗
      showConfirm: false,
      // 是否显示充值弹窗
      popupShow: false,
      // 充值金额
      rechargeMoney: '',
      // 用户等级列表
      rankList: [],
      // 账户信息
      accountInfo: {},
      // 卡券数据
      cardList: [],
      // 卡券状态数据
      status: {},
      // 当前卡券状态
      current_status: '',
      // 没有数据提示
      tips: ''
    }
  },
  watch: {
    rechargeMoney(val) {
      let _val = Number(val)
      let _boo = false
      this.rankList.forEach((item, idx) => {
        if (!_boo) {
          let len = this.rankList.length
          let item_after = 0
          let _indexObj = this.rankList[(idx + 1)]
          if (_indexObj && _indexObj.deposit_amount) {
            item_after = Number(_indexObj.deposit_amount)
          }
          if (Number(item.deposit_amount) <= _val) {
            if (len === (idx + 1)) {
              _boo = true
              item.checked = true
            } else if (item_after > _val) {
              _boo = true
              item.checked = true
            } else {
              item.checked = false
            }
          } else {
            item.checked = false
          }
        } else {
          item.checked = false
        }
      })
    },
    requestNum(newVal) {
      if (newVal === 4) this.$loading()
    }
  },
  methods: {
    // 点击导航
    filterFun(type, tips) {
      this.current_status = type
      if (type === '-10' || type === -10) {
        this.tips = '可以领的卡券'
        this.getActivityList(-10, this.tips)
      } else {
        this.tips = tips + '的卡券'
        this.getUserCardList(type, this.tips)
      }
    },
    // 获取用户等级列表
    accountGetRankList() {
      this.$fetch.accountGetRankList('&rank_type=' + this.$store.state.user_role).then(data => {
        data.forEach(item => {
          item.checked = false
        })
        this.rankList = data
        this.requestNum++
      }).catch(err => {
        this.$loading()
        console.log('accountGetRankList => errMsg: ', err)
      })
    },
    // 获取账户信息
    getAccountInfo() {
      this.$fetch.pocketGetAccountInfo().then(data => {
        this.accountInfo = data
        this.requestNum++
      }).catch(err => {
        this.$loading()
        console.log('getAccountInfo => errMsg: ', err)
      })
    },
    // 代理商充值
    rechargeActivety(i) {
      if (i.checked) return false
      else {
        this.rechargeMoney = Number(i.deposit_amount)
      }
    },
    // 立即充值
    nowRecharge() {
      this.$loading('正在充值')
      // sessionStorage.order_type = '0'
      let field = { amount: this.rechargeMoney }
      this.$fetch.pocketDeposit(field).then(data => {
        this.popupShow = false
        sessionStorage.order_sn = data
        sessionStorage.deposit = 'deposit'
        this.$router.push('store_orderPay')
      })
    },
    // 提现
    willWithdraw() {
      if (Number(this.userInfo.user_role) === 11 && Number(this.userInfo.is_auth) === 0) {
        this.showConfirm = true
      } else {
        this.showConfirm = false
        this.$router.push('finance_withdraw')
      }
    },
    // 去认证
    routerToAuth() {
      this.$router.push('/auditProcess')
    },
    // 获取活动卡券状态
    getActivityStatus() {
      this.$fetch.pocketGetActivityStatus().then(data => {
        if (typeof data === 'object' && data instanceof Object) {
          data['-10'] = '领券中心'
        } else {
          data = { '-10': '领券中心' }
        }
        let keys = Object.keys(data)
        this.status = data
        this.requestNum++
        this.filterFun(keys[0], data[keys[0]])
      }).catch(err => {
        this.$loading()
        console.log('getActivityStatus => errMsg: ', err)
      })
    },
    // 获取卡包列表
    getUserCardList(_key, tips) {
      let activeObj = { 'activity_status': _key }
      if (this.requestNum >= 4) this.$loading(`获取${tips}...`)
      this.$fetch.pocketGetUserCardList(activeObj).then(data => {
        this.cardList = data
        if (this.requestNum < 4) this.requestNum++
        else this.$loading()
      }).catch(err => {
        this.$loading()
        console.log('getUserCardList => errMsg: ', err)
      })
    },
    // 领券中心-卡券列表
    getActivityList(_key, tips) {
      if (this.requestNum >= 4) this.$loading(`获取${tips}...`)
      this.$fetch.getActivityList().then(data => {
        let dataList = data.list
        if (dataList && Object.prototype.toString.call(dataList).toLowerCase() === '[object array]') {
          dataList.map(item => {
            // is_new_activity字段用来标识该卡券是未领取的
            item.is_new_activity = true
          })
          this.cardList = dataList
        } else if (dataList && Object.prototype.toString.call(dataList).toLowerCase() === '[object object]') {
          this.cardList = []
          for (let key in dataList) {
            dataList[key]['is_new_activity'] = true
            this.cardList.push(dataList[key])
          }
        }
        if (this.requestNum < 4) this.requestNum++
        else this.$loading()
      }).catch(err => {
        this.$loading()
        console.log('getActivityList => errMsg: ', err)
      })
    },
    // 立即领取卡券
    receiveTicket(_id) {
      let field = '&activity_id=' + _id
      this.$loading('正在领取中...')
      this.$fetch.receiveTicket(field).then(data => {
        this.$loading()
        let _key = Object.keys(this.status)[0]
        this.filterFun(_key, this.status[_key])
      }).catch(err => {
        this.$loading()
        this.$toast(err)
        console.log('receiveTicket => errMsg: ', err)
      })
    },
    // 获取用户信息
    getUserInfo() {
      this.$fetch.getUserInfo().then(data => {
        this.userInfo = data
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
        this.requestNum++
      }).catch(err => console.log('getUserInfo => errMsg:', err))
    }
  },
  created() {
    // this.getUserInfo()
  },
  activated() {
    this.$loading('加载我的钱包...')
    this.showConfirm = false
    this.requestNum = 0
    this.getUserInfo()
    this.accountGetRankList()
    this.getAccountInfo()
    this.getActivityStatus()
  },
  deactivated() {
    this.rechargeMoney = ''
  }
}
</script>
