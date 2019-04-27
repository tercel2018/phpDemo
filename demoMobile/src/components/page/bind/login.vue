/*
 * @Author: 黄智强
 * @Date: 2018-05-03 13:33:58
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-01-10 09:51:39
 * @说明：登录页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.login {
  .title {
    text-align: center;
    font-size: @f10;
    color: @blue;
  }
  .x-form {
    .group {
      margin: 6vw 0 8vw;
      .red {
        position: relative;
        right: -15px;
        font-size:@f7;
      }
    }
    .tips {
      .flexUi(space-between);
      margin-bottom: 10vw;
      font-size: @f6;
      color: @9;
      .red {
        margin-left: 3vw;
      }
    }
  }
}
</style>
<template>
  <div class="login">
    <div class="title">{{pageTitle}}</div>
    <div class="x-form">
      <group label-width="28vw" class="group vux-group-border-bottom" gutter="0">
        <x-input title="手机号码" :max="11" type="tel" is-type="china-mobile" v-model="user_mobile" placeholder="手机号" @on-change="checkUserMobile"></x-input>
        <x-input v-if="loginType==='password'" placeholder="密码" title="登录密码" type="password" v-model="login_password" :min="6" :max="16" @on-enter="isLogin&&login()">
        </x-input>
        <x-input v-if="loginType==='code'" title="短信验证码" placeholder="验证码" type="tel" :show-clear="false" :min="6" :max="6" v-model="code">
          <span slot="right" v-if="seconds===-1" class="red" @click="sendCode">获取验证码</span>
          <span slot="right" v-else class="red">{{seconds}}秒后获取</span>
        </x-input>
      </group>
      <div class="tips">
        <div v-if="!auth_id && loginType==='password'" @click="codeLogin">手机动态码登录</div>
        <div v-if="!auth_id && loginType==='code'" @click="passwordLogin">密码登录</div>
        <div>
          <!-- <span>忘记密码</span> -->
        </div>
      </div>
      <x-button class="x-btn w100" v-if="isLogin" type="primary" @click.native="login">{{auth_id?'绑定':'登录'}}</x-button>
      <x-button class="x-btn w100" v-else>{{auth_id?'绑定':'登录'}}</x-button>
    </div>
  </div>
</template>
<script>
import { XInput, Group, XButton } from 'vux'
export default {
  components: { XInput, Group, XButton },
  props: ['type'],
  data() {
    return {
      // 登录方式：密码登录：password、动态码登录：code
      loginType: 'password',
      // 用户名：手机号码
      user_mobile: '',
      // 用户角色
      user_role: '',
      // 用户输入的密码
      login_password: '',
      // 用户输入的验证码
      code: '',
      // 手机号是否注册
      isRegister: true,
      // 短信验证码的秒数 60秒，初始为-1
      seconds: -1,
      // 授权auth_id
      auth_id: '',
      // 页面标题
      pageTitle: '登录'
    }
  },
  computed: {
    // 登录按钮是否可点击
    isLogin() {
      let flag = false
      if (_isPhone.test(this.user_mobile)) {
        if (this.loginType === 'code') flag = this.code.length === 6
        else flag = this.login_password.length >= 6
      }
      return flag
    }
  },
  methods: {
    // 手机登录
    codeLogin() {
      this.loginType = 'code'
      this.code = ''
    },
    passwordLogin() {
      this.loginType = 'password'
      this.login_password = ''
    },
    // 显示弹窗事件
    showToastFun(text) {
      this.$vux.toast.show({ text, type: 'text' })
    },
    // 失去焦点，检查手机号是否已注册
    checkUserMobile(value) {
      let user_mobile = this.user_mobile
      if (_isPhone.test(user_mobile)) {
        this.$fetch.checkUserMobile({ user_mobile }).then(data => {
          this.user_role = data.user_role
          this.isRegister = data.phone_exist
          if (!data.phone_exist) this.showToastFun('该手机号未注册')
        })
      }
    },
    // 发送验证码
    sendCode() {
      let user_mobile = this.user_mobile
      if (!user_mobile) {
        this.showToastFun('请输入手机号码')
        return
      }
      if (_isPhone.test(user_mobile)) {
        this.seconds = 60
        let interval = setInterval(() => (this.seconds === -1 ? clearInterval(interval) : this.seconds--), 1000)
        this.$fetch.checkUserMobile({ user_mobile }).then(data => {
          this.user_role = data.user_role
          this.isRegister = data.phone_exist
          if (data.phone_exist) {
            this.$fetch.sendVerifyCodeSms({ phone: user_mobile }).then(data => {
              // this.code = data
            })
          } else {
            this.seconds = -1
            this.showToastFun('该手机号未注册')
          }
        })
      } else this.showToastFun('手机号码格式错误')
    },
    // 登录事件
    login() {
      if (!this.isRegister) {
        this.showToastFun('该手机号未注册')
        return false
      }
      this.$loading('正在登陆，请稍等...')
      // 登录方式loginType：password  || code
      // 绑定登录
      if (this.auth_id) {
        let parmas = {
          user_role: this.user_role,
          user_mobile: this.user_mobile,
          code: this.code,
          auth_id: this.auth_id,
          type: 'login'
        }
        this.$fetch.accountBindLogin(parmas).then(data => {
          // token
          localStorage.access_token = data.access_token
          // 绑定成功
          this.$router.push('/bind?type=1')
        })
      } else {
        let url = 'dynamicLogin'
        let parmas = {
          user_role: this.user_role,
          user_mobile: this.user_mobile
        }
        let _loginType = this.loginType
        if (_loginType === 'password') {
          url = 'accountLogin'
          parmas.login_password = this.login_password
        } else {
          parmas.code = this.code
        }
        this.$fetch[url](parmas).then(data => {
          // token
          localStorage.access_token = data.access_token
          this.$router.push('/main/index')
        }).catch(msg => console.log('login => errMsg:', msg))
      }
    }
  },
  activated() {
    // document.title = '云玺印登录'
    this.pageTitle = '登录'
    if (localStorage.auth_id) {
      this.auth_id = localStorage.auth_id
      this.pageTitle = '绑定账号'
      this.loginType = 'code'
    } else {
      this.auth_id = ''
      this.loginType = 'password'
    }
    this.code = ''
    this.login_password = ''
    this.seconds = -1
    // for (let k in sessionStorage) delete sessionStorage[k]
  }
}
</script>
