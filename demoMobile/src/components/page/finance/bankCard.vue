/*
 * @Author: 陈航
 * @Date: 2018-09-17 14:35:55
 * @Last Modified by: 陈航
 * @说明：添加银行卡
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.account-wrapper{
  padding-top:12vw;
  padding-bottom:13vw;
  font-size:@f6;
  color:@6;
  .account-content{
    margin:3vw 0 0;
    width:100vw;
    .my-radio-container{
      padding-left:15px;
      background-color: #fff;
      .my-radio{
        position:relative;
        padding:3vw 0;
        width:calc(~'100vw - 15px');
        width:-webkit-calc(~'100vw - 15px');
        &:after{
          position:absolute;
          content: '';
          left:0;
          bottom:0;
          width:calc(~'100vw - 15px');
          width:-webkit-calc(~'100vw - 15px');
          height:1px;
          transform: scaleY(0.5);
          background-color: #D9D9D9;
        }
      }
    }
    .no-border-top-group{
      color:@3;
    }
  }
  .audit-submit{
    position:fixed;
    bottom:0;
    left:0;
    width:100vw;
    height:13vw;
    text-align: center;
    line-height: 13vw;
    background-color: @blue;
    color:#fff;
    font-size:@f7;
    letter-spacing: .1*@f7;
  }
}
</style>
<template>
  <div class="account-wrapper" component-fixed-offset="13vw">
    <header-basic title="添加银行卡"></header-basic>
    <div class="account-content" id="account-content">
      <div class="my-radio-container">
        <my-radio title="银行卡信息：" class="my-radio" :radioList="radioList" direction="vertical" @change="getCurrentRadio"></my-radio>
      </div>
      <group class="no-border-top-group">
        <popup-radio class="element-value-required" title="开户行：" :options="bankList" v-model="accountObj.bank_name.value" placeholder="请选择开户行"></popup-radio>
        <x-input class="element-value-required" title="开户名称：" v-model.trim="accountObj.account_name.value" :ref="accountObj.account_name.ref" type="text" label-width="24vw" placeholder="请填写开户名称" required></x-input>
        <x-input class="element-value-required" title="银行账号：" v-model.trim="accountObj.account_number.value" :ref="accountObj.account_number.ref" type="number" label-width="24vw" placeholder="请填写银行账号" required></x-input>
      </group>
    </div>
    <div class="audit-submit" @click="submitAccount" data-fixed-bottom="component">提交</div>
  </div>
</template>
<script>
import { Group, XInput, PopupRadio } from 'vux'
import headerBasic from '@/components/common/headerBasic'
import myRadio from '@/components/common/myRadio'
export default {
  components: { headerBasic, Group, XInput, myRadio, PopupRadio },
  data() {
    return {
      // 获取开户行
      bankList: [],
      // 是否添加银行
      editAccount: false,
      // 账户类别
      radioList: [
        {
          value: 0,
          text: '对公账户',
          tips: '企业、个体工商户可填写',
          checked: true
        },
        {
          value: 1,
          text: '对私账户',
          tips: '个体工商户、个人可填写',
          checked: false
        }
      ],
      accountObj: {
        bank_name: {
          value: '',
          required: true,
          errMsg: '请选择#开户行'
        },
        account_name: {
          value: '',
          required: true,
          ref: 'accountObj.account_name',
          errMsg: '请填写#开户名称'
        },
        account_number: {
          value: '',
          required: true,
          pattern: 'ACCOUNT_NO',
          ref: 'accountObj.account_number',
          errMsg: '请填写#银行账号#为15~19位，且无空格'
        }
      }
    }
  },
  computed: {
    currentAccoutType() {
      return this.radioList.filter(item => item.checked)[0].value
    }
  },
  methods: {
    // 获取开户行
    getBankList() {
      this.bankList = []
      this.$fetch.bankList().then(data => {
        for (let [key, value] of Object.entries(data)) {
          this.bankList.push({ key, value: value.text })
        }
      })
      this.pocketGetAccountInfo()
    },
    // 获取账户信息
    pocketGetAccountInfo() {
      this.$fetch.pocketGetAccountInfo().then(data => {
        if (Number(data.account_info.account_type) === 1) {
          this.radioList[0].checked = false
          this.radioList[1].checked = true
        }
        if (this.editAccount) {
          this.accountObj.bank_name.value = data.account_info.bank_name
          this.accountObj.account_name.value = data.account_info.account_name
          this.accountObj.account_number.value = data.account_info.account_number
        }
      }).catch(err => {
        console.log('pocketGetAccountInfo => ' + err)
      })
    },
    // 开户类型改变通知订阅者
    getCurrentRadio(i) {
      console.log(JSON.stringify(i, null, 2))
    },
    // 提交账户
    submitAccount() {
      let result = this.$formValidate(this.accountObj)
      if (!result) {
        return false
      }
      result['account_type'] = this.currentAccoutType
      this.$loading('添加银行卡...')
      this.$fetch.receiveAaccount(result).then(() => {
        this.$loading()
        this.$router.go(-1)
      }).catch(err => {
        this.$loading()
        console.log('receiveAaccount => ' + err)
      })
    }
  },
  activated() {
    if (this.$route.query.type && Number(this.$route.query.type) === 1) {
      this.editAccount = true
    } else {
      this.editAccount = false
    }
    this.getBankList()
    let refer = document.querySelector('#account-content')
    let clientHeight = document.documentElement.clientHeight
    let offTop = refer && refer.offsetTop
    let offsetHeight = refer && refer.offsetHeight
    refer && (refer.style.marginBottom = (clientHeight - offsetHeight - offTop * (28 / 15)) + 'px')
    document.querySelector('#footerBar').style.display = 'none'
  },
  deactivated() {
    document.querySelector('#footerBar').style.display = 'block'
  }
}
</script>
