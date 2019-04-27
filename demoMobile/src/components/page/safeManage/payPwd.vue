/*
 * @Author: 陈航
 * @Date: 2018-12-21 15:40:41
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-22 14:27:49
 * @Desc: 修改支付密码页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.payPwd-wrapper{
  position:relative;
  padding-top:15vw;
  background-color: #f5f5f5;
  h3{
    padding:6vw 0 4vw;
    font-size:@f8;
    text-align: center;
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
  .code input{
    width:40vw;
  }
  .showPwd{
    .flexUi(flex-end);
    padding-right:5vw;
    font-size:@f6;
    .circle{
      width:@f6;
      height:@f6;
      border-radius:50%;
      background-color:@grey;
      margin-right:1vw;
    }
    .blue{
      background-color:@blue;
      .flexUi(center);
      i{
        font-size:0.4rem;
        color:#fff;
      }
    }
  }
  .change{
    margin:6vh auto;
    background-color: @blue;
    color:#fff;
  }
  .grey{
    background-color: #ccc;
  }
  .index{
    position:fixed;
    background:none;
    margin-left:5vw;
    left:0;
    bottom:1vh;
  }
}
</style>
<template>
  <div class="payPwd-wrapper">
    <header-basic :title="hasSetPayPwd?'修改支付密码':'设置支付密码'"></header-basic>
    <h3>+86 {{phone?(String(phone).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')):'***********'}}</h3>
    <div class="btn input code">
      <input type="number" placeholder="请输入验证码" v-model.trim="formField.verify_code.value" :ref="formField.verify_code.ref" autofocus/>
      <span v-if="seconds <= 0" class="blue" @click="sendCode">获取验证码</span>
      <span v-else>{{seconds}}秒后获取</span>
    </div>
    <div class="btn input">
      <input :type="showPwd?'text':'password'" placeholder="请输入6-16位支付密码" v-model.trim="formField.password.value" :ref="formField.password.ref" autofocus/>
    </div>
    <div class="btn input">
      <input :type="showPwd?'text':'password'" placeholder="请再次输入支付密码" v-model.trim="formField.re_password.value" :ref="formField.re_password.ref" autofocus/>
    </div>
    <div class="showPwd" @click="showPwd=!showPwd">
      <span class="circle" :class="{blue:showPwd}"><i v-if="showPwd" class="iconfont icon-gouxuan"></i></span><span>显示密码</span>
    </div>
    <div class="btn change" @click="changePwd">{{hasSetPayPwd?'确认修改':'确认设置'}}</div>
  </div>
</template>
<script>
import headerBasic from '@/components/common/headerBasic'
import { setInterval, clearInterval } from 'timers'
export default {
  components: { headerBasic },
  data() {
    return {
      // 用户手机号
      phone: '',
      // 倒计时
      seconds: -1,
      // 当前的验证码
      code: '',
      // 时间
      timer: null,
      // 是否设置过支付密码
      hasSetPayPwd: false,
      // 是否显示密码
      showPwd: false,
      // 表单数据
      formField: {
        verify_code: {
          value: '',
          required: true,
          pattern: 'VERIFY_CODE',
          ref: 'formField.verify_code',
          errMsg: '请填写#验证码#为6位数字'
        },
        password: {
          value: '',
          required: true,
          pattern: 'PASSWORD',
          ref: 'formField.password',
          errMsg: '请填写#支付密码#为6-16位不含空格的任意字符'
        },
        re_password: {
          value: '',
          required: true,
          pattern: 'PASSWORD',
          ref: 'formField.re_password',
          errMsg: '请再次输入#支付密码#为6-16位不含空格的任意字符'
        }
      }
    }
  },
  methods: {
    // 获取验证码
    sendCode() {
      this.seconds = 59
      this.timer = setInterval(() => {
        if (this.seconds <= 0) clearInterval(this.timer)
        else this.seconds--
      }, 1000)
      this.$fetch.sendVerifyCodeSms({ phone: this.phone }).then(data => {
        this.code = data
      })
    },
    // 修改支付密码
    changePwd() {
      let result = this.$formValidate(this.formField)
      if (!result) {
        return false
      } else if (this.formField.password.value !== this.formField.re_password.value) {
        this.$toast('支付密码两次输入不一致')
        return false
      }
      result.user_mobile = this.phone
      let loadMsg = '设置支付'
      if (this.hasSetPayPwd) loadMsg = '修改支付'
      this.$loading(loadMsg + '密码...')
      this.$fetch.accountSetPayPassword(result).then(() => {
        this.$loading()
        this.$toast(loadMsg + '成功')
        sessionStorage.set_pay_password = '1'
        this.$router.go(-1)
      }).catch(msg => {
        this.$loading()
        if (msg.indexOf('验证码') > -1) {
          this.$refs[this.formField.verify_code.ref].focus()
        } else {
          this.$refs[this.formField.password.ref].focus()
        }
        this.$toast(msg)
      })
    },
    // 获取信息
    getUserInfo() {
      this.$fetch.getUserInfo().then(data => {
        if (!sessionStorage.user_mobile) this.phone = data.user_mobile
        let hasSetPayPwd = false
        if (data.pay_password !== 0) {
          hasSetPayPwd = true
        }
        if (this.hasSetPayPwd !== hasSetPayPwd) {
          this.hasSetPayPwd = hasSetPayPwd
        }
      })
    }
  },
  activated() {
    this.showPwd = false
    this.seconds = -1
    this.code = 0
    this.timer = null
    this.phone = sessionStorage.user_mobile ? sessionStorage.user_mobile : ''
    for (let val of Object.values(this.formField)) {
      val.value = null
    }
    this.hasSetPayPwd = false
    if (sessionStorage.set_pay_password === '1') {
      this.hasSetPayPwd = true
    }
    this.getUserInfo()
  },
  deactivated() {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>
