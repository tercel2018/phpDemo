/*
 * @Author: 陈航
 * @Date: 2019-01-14 10:55:31
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-02-21 09:49:24
 * @Desc: 员工验证
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.verify-wrapper{
  margin-bottom:20vw;
  font-size: @f7;
  padding-top:calc(~'44px + 12vw');
  padding-top:-webkit-calc(~'44px + 12vw');
  .tab-wrapper{
    position:fixed;
    top:12vw;
    left:0;
    z-index:99;
    width:100%;
  }
  .qrcode-verify{
    text-align: center;
    h2{
      padding: 10vw 0 3vw;
      font-size: @f7;
    }
    p{
      font-size: @f5;
    }
    img{
      display: block;
      margin: 10vw auto 0;
      width:50vw;
    }
  }
  .sms-verify{
    p{
      padding: 10vw 0 1vw;
      text-align: center;
      font-size: @f5;
    }
    .btn{
      margin:3vw auto;
      width:90vw;
      height:10.8vw;
      line-height: 10.8vw;
      border-radius:1.1vw;
      background-color: #eeeded;
      color:#9c9b9b;
      text-align: center;
      font-size:@f7;
    }
    .input{
      margin:3vw auto;
      background-color: #fff;
      height:12.5vw;
      line-height: 12.5vw;
      border-radius:1.6vw;
      .flexUi(space-between);
      font-size: @f7;
      input{
        border:0;
        background: none;
        outline: none;
        display: inline-block;
        line-height: 12.5vw;
        padding-left:4vw;
        width:82vw;
        font-size: 0.75rem;
        color:@3;
      }
      .phone{
        width:70vw;
      }
      .red{
        color:@red;
      }
      span{
        padding-right:4vw;
      }
    }
    .change{
      margin:6vh auto;
      background-color: @blue;
      color:#fff;
    }
    .code input{
      width:40vw;
    }
  }
}
</style>
<template>
  <div class="verify-wrapper">
    <header-basic title="验证员工"></header-basic>
    <!-- 导航 -->
    <div class="tab-wrapper">
      <tab bar-active-color="#1699e7" active-color="#1997e3" :scroll-threshold="5">
        <tab-item v-for="i in tab_obj" :selected="currLi===i.id?true:false" :key="i.id" @on-item-click="filterFun(i.id)" badge-background="#ff8542" badge-color="#fff">{{i.name}}</tab-item>
      </tab>
    </div>
    <!-- 扫码 -->
    <div class="qrcode-verify" v-if="currLi == 1">
      <h2> 扫描二维码验证</h2>
      <p>扫描二维码，完成短信验证后，即可成为您的员工。</p>
      <img :src="verifyUrl">
    </div>
    <!-- 短信验证码 -->
    <div class="sms-verify" v-else>
      <p> 发送验证短信到【{{employeeInfo.full_name}}：{{employeeInfo.user_mobile}}】手机</p>
      <div class="btn input code">
        <input type="number" placeholder="请输入验证码" v-model.trim="formField.code.value" :ref="formField.code.ref" autofocus/>
        <span v-if="seconds <= 0" class="blue" @click="sendCode">获取验证码</span>
        <span v-else>{{seconds}}秒后获取</span>
      </div>
      <div class="btn change" @click="smsVerify">确认</div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { Tab, TabItem, headerBasic },
  data() {
    return {
      // 验证类型
      tab_obj: [
        {
          id: 1,
          name: '扫码验证'
        },
        {
          id: 2,
          name: '短信验证'
        }
      ],
      // 当前菜单
      currLi: 1,
      seconds: 0,
      // 表单数据
      formField: {
        code: {
          value: '',
          required: true,
          pattern: 'VERIFY_CODE',
          ref: 'formField.code',
          errMsg: '请填写#验证码#为6位数字'
        }
      },
      // 员工信息
      employeeInfo: {},
      // 验证地址
      verifyUrl: ''
    }
  },
  methods: {
    // 第一行，点击筛选事件
    filterFun(key) {
      this.currLi = key
    },
    // 获取验证码
    sendCode() {
      this.seconds = 59
      this.timer = setInterval(() => {
        if (this.seconds <= 0) clearInterval(this.timer)
        else this.seconds--
      }, 1000)
      this.$fetch.sendVerifyCodeSms({ phone: this.employeeInfo.user_mobile }).then(data => {
        this.code = data
      })
    },
    // 验证
    smsVerify() {
      let result = this.$formValidate(this.formField)
      if (!result) return
      console.log(result)
      result.user_mobile = this.employeeInfo.user_mobile
      this.$loading('提交验证...')
      this.$fetch.subAccountVerify(result).then(data => {
        this.$loading()
        this.$router.push('employee_list')
      }).catch(msg => {
        this.$refs[this.formField.code.ref].focus()
        this.$loading()
        this.$toast(msg)
      })
    }
  },
  activated() {
    this.currLi = 1
    this.verifyUrl = ''
    this.employeeInfo = {}
    if (sessionStorage.employeeInfo) {
      this.employeeInfo = JSON.parse(sessionStorage.employeeInfo)
      let Url = location.origin + '/qrcodeVerify' + '?verify_code=' + this.employeeInfo.user_code
      this.verifyUrl = sessionStorage.agentHost + '/qrcode/generate?content=' + Url
    }
  }
}
</script>
