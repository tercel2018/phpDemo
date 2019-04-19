/*
 * @Author: 陈航
 * @Date: 2019-01-03 15:01:10
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-01-10 17:48:03
 * @Desc: 提现页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.widthdraw-wrapper{
  padding-top:12vw;
  font-size: @f7;
  .widthdraw-header{
    margin:5vw auto;
    width:92vw;
    .top{
      .flexUi(@align:flex-start);
      padding:6vw 8vw;
      background-color: rgba(255,255,255,.7);
      line-height: 100%;
      .title{
        margin-right:5vw;
        flex-shrink: 0;
      }
      .bankcard{
        .bank{
          color:@blue;
          margin-bottom:3vw;
        }
        .user{
          font-size:@f6;
          color:@6;
        }
      }
    }
    .top.addbank{
      color:@6;
    }
    .bottom{
      padding:5vw 8vw 5vw;
      line-height: 100%;
      background-color: #fff;
      .input{
        padding:4vw 0;
        width:76vw;
        border-bottom:solid 1px #e2e2e2;
        .flexUi;
        font-weight: 700;
        label{
          margin-right:2vw;
          font-size:1.2rem;
        }
        input{
          width:50vw;
          font-size:1.2rem;
          border:0;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
          &.error{
            color:@red;
          }
          &:focus{
            background-color: none;
          }
        }
      }
      .tip{
        margin-bottom: 4vw;
        padding:4vw 0;
        color:@6;
        font-size:@f6;
        &.error{
          color:@red;
        }
        .blue{
          margin-left: 2vw;
        }
      }
      .btn{
        color:#fff;
        width:76vw;
        text-align: center;
        background-color: @blue;
        padding: 3vw 0;
        border-radius:1vw;
        &.error{
          background-color: rgba(26,151,227,.5);
        }
      }
    }
    .bottom.addbank{
      .money{
        margin-bottom: 4vw;
        font-size:@f6;
        .blue{
          margin-left: 2vw;
        }
      }
    }
  }
  .widthdraw-tips{
    margin: 0 auto;
    width:92vw;
    h2{
      line-height: 300%;
      text-align: center;
      font-size:@f6;
      color:@6;
    }
    ul{
      margin:0 auto;
      width:max-content;
      max-width:76vw;
      li{
        margin-bottom: 2vw;
        font-size:@f5;
        color:@6;
        text-align: justify;
      }
    }
  }
}
</style>
<template>
  <div class="widthdraw-wrapper" v-show="requestNum >= 3">
    <header-basic title="申请提现"></header-basic>
    <div class="widthdraw-header">
      <template v-if="accountInfo.account_info.bank_name">
        <div class="top">
          <p class="title">到账银行卡</p>
          <div class="bankcard" v-if="userRole=='1'" @click="$router.push('finance_bankCard?type=1')">
            <p class="bank">{{accountInfo.account_info.bank_name}}({{ accountInfo.account_info.account_number | accountNumber }}) </p>
            <p class="user">{{accountInfo.account_info.account_name}}</p>
          </div>
          <div class="bankcard" v-else>
            <p class="bank">{{accountInfo.account_info.bank_name}}({{ accountInfo.account_info.account_number | accountNumber }}) </p>
            <p class="user">{{accountInfo.account_info.account_name}}</p>
          </div>
        </div>
        <div class="bottom">
          <p class="title">提现金额</p>
          <p class="input">
            <label>￥</label>
            <input :class="{error: (Number(withdraw_money) > Number(accountInfo.withdraw_money))}" type="number" step="0.01" :value="withdraw_money" @input="checkWithdraw($event)" autofocus="autofocus"/>
          </p>
          <p class="tip" v-if="Number(withdraw_money) <= Number(accountInfo.withdraw_money)">当前可提现金额{{$f(accountInfo.withdraw_money)}}<span class="blue" @click="withdraw_money = accountInfo.withdraw_money">全部提现</span></p>
          <p class="tip error" v-else>
            输入金额超过可提现金额
          </p>
          <div class="withdraw-btn btn"  v-if="Math.ceil(withdraw_money) > 0 && (Number(withdraw_money) <= Number(accountInfo.withdraw_money))" @click="withdrawFun">提现</div>
          <div class="withdraw-btn btn error"  v-else>提现</div>
        </div>
      </template>
      <template v-else>
        <div class="top addbank">
          您暂无银行卡
        </div>
        <div class="bottom addbank">
          <p class="money">当前可提现金额<span class="blue">￥0.00</span></p>
          <div class="withdraw-btn btn" @click="$router.push('finance_bankCard')">添加银行卡</div>
        </div>
      </template>
    </div>
    <div class="widthdraw-tips" v-if="accountInfo.account_info.bank_name">
      <h2>重要提示</h2>
      <ul>
        <li>1.单次提现不可超过1万元，每日提现额度不可超过1万元。</li>
        <li>2.提交申请后我们将会在7个工作日之内处理。</li>
        <li>3.如有疑问可联系客户，客户热线：{{userInfo.customer_phone?userInfo.customer_phone:'0755-36564131'}}。</li>
      </ul>
    </div>
    <!-- 添加银行卡 -->
  </div>
</template>
<script>
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { headerBasic },
  data() {
    return {
      // 用户信息
      userInfo: {},
      // 用户角色
      userRole: '1',
      // 账户余额
      account: 0,
      // 账户信息
      accountInfo: {
        withdraw_money: 0,
        user_money: 0,
        account_info: { account_type: 1, account_name: '', bank_name: '', account_number: '' }
      },
      // 提现金额
      withdraw_money: '',
      // 接口请求次数
      requestNum: 0
    }
  },
  filters: {
    accountNumber(num) {
      let str = (num === null || typeof num === 'undefined') ? '' : String(num)
      return str.replace(/^\d*(\d{4})$/, '$1')
    }
  },
  watch: {
    requestNum(newVal) {
      if (newVal === 3) this.$loading()
    }
  },
  methods: {
    // 校验提现金额
    checkWithdraw(e) {
      let _value = String(e.target.value)
      // 去掉多余的小数点, 保留两位小数
      _value = _value.replace(/^(\d+\.)\.+(\d*)$/, '$1$2').replace(/^(\d+\.)(\d{2})\d+$/, '$1$2')
      e.target.value = _value
      this.withdraw_money = e.target.value
    },
    // 获取用户信息
    getUserInfo() {
      this.$fetch.getUserInfo().then(data => {
        this.userInfo = data
        this.requestNum++
      }).catch(err => {
        console.log('getUserInfo => ' + err)
        this.requestNum++
      })
    },
    // 获取用户余额信息
    pocketGetUserAccount() {
      this.$fetch.pocketGetUserAccount().then(data => {
        this.account = data.user_account
        this.requestNum++
      }).catch(err => {
        console.log('pocketGetUserAccount => ' + err)
        this.requestNum++
      })
    },
    // 获取账户信息
    pocketGetAccountInfo() {
      this.$fetch.pocketGetAccountInfo().then(data => {
        this.userRole = data.user_role
        this.accountInfo.withdraw_money = data.withdraw_money
        this.accountInfo.user_money = data.user_money
        if (data.account_info.account_type !== null && typeof data.account_info.account_type !== 'undefined') {
          this.accountInfo.account_info = data.account_info
        }
        this.requestNum++
      }).catch(err => {
        console.log('pocketGetAccountInfo => ' + err)
        this.requestNum++
      })
    },
    // 提现
    withdrawFun() {
      let amount = Number(this.withdraw_money)
      if (amount === 0 || amount === 0.0 || amount === 0.00) {
        this.$toast('输入金额必须大于零')
      } else if (amount > Number(this.accountInfo.withdraw_money)) {
        this.$toast('输入金额不能大于可提现金额')
      }
      this.$loading('正在提交申请')
      this.$fetch.pocketWithdraw({ amount }).then(() => {
        this.pocketGetUserAccount()
        this.pocketGetAccountInfo()
        this.$loading()
        this.withdraw_money = ''
        this.$toast('申请提交成功，将在7个工作日之内为您处理')
        setTimeout(() => {
          this.$router.push('finance_myWallet')
        }, 1500)
      }).catch(msg => {})
    }
  },
  activated() {
    this.requestNum = 0
    this.accountInfo = {
      withdraw_money: 0,
      user_money: 0,
      account_info: { account_type: 1, account_name: '', bank_name: '', account_number: '' }
    }
    this.$loading('申请提现...')
    this.getUserInfo()
    this.pocketGetUserAccount()
    this.pocketGetAccountInfo()
  }
}
</script>
