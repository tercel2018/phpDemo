/*
 * @Author: 黄智强
 * @Date: 2018-05-03 13:33:58
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-01-09 15:57:13
 * @说明：注册页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.register {
  .title {
    text-align: center;
    font-size: @f10;
    color: @blue;
  }
  .x-form {
    .group {
      margin: 6vw 0 6vw;
    }
    .auth_wrapper{
      margin:0vw 0 8vw;
      .flexUi;
      span.protocol{
        font-size:@f6;
        vertical-align: middle;
      }
    }
    .iconfont {
      font-size: @f10;
    }
    .red {
      font-size: @f7;
    }
  }
}
</style>
<template>
  <div class="register">
    <div class="title">注册</div>
    <div class="x-form">
      <group label-width="30vw" class="group vux-group-border-bottom" gutter="0">
        <popup-radio title="注册类型" :options="user_role_arr" v-model="user_role_ele" @on-change="changeUserRole"></popup-radio>
        <x-input title="用户名称" :max="11" type="text" placeholder="个人/公司名称" v-model="full_name"></x-input>
        <x-input title="手机号码" :max="11" type="tel" placeholder="手机号" is-type="china-mobile" v-model="form.user_mobile"></x-input>
        <x-input title="短信验证码" type="tel" placeholder="验证码" :min="6" :max="6" :show-clear="false" v-model="form.code">
          <span slot="right" v-if="seconds===-1" class="red" @click="sendCode">获取验证码</span>
          <span slot="right" v-else class="red">{{seconds}}秒后获取</span>
        </x-input>
        <x-input title="设置密码" placeholder="密码" :type="passType" v-model="form.login_password" :min="6" :max="16">
          <i slot="right" v-if="passType==='password'" class="iconfont icon-mimabukejian blue" @click="passType='text'"></i>
          <i slot="right" v-else class="iconfont icon-mimakejian blue" @click="passType='password'"></i>
        </x-input>
      </group>
      <!-- 勾选协议 -->
      <div class="auth_wrapper" v-if="user_role_ele==='代理商'">
        <check-icon :value.sync="is_auth" type="plain">我已阅读、同意并接受</check-icon>
        <span class="blue protocol" @click="toProtocol">《云玺印代理协议》</span>
      </div>
      <x-button class="x-btn w100" v-if="isRegister" type="primary" @click.native="register">注册</x-button>
      <x-button class="x-btn w100" v-else>注册</x-button>
    </div>
  </div>
</template>
<script>
import { XInput, Group, XAddress, XButton, CheckIcon, PopupRadio } from 'vux'
export default {
  components: { XInput, Group, XAddress, XButton, CheckIcon, PopupRadio },
  props: ['type'],
  data() {
    return {
      form: {
        // 用户名：手机号码
        user_mobile: '',
        // 用户输入的验证码
        code: '',
        // 用户输入的密码
        login_password: ''
      },
      // 公司或个人名称
      full_name: '',
      user_role_ele: '会员',
      user_role_arr: ['会员', '代理商'],
      // 密码框类型
      passType: 'password',
      // 短信验证码的秒数 60秒，初始为-1
      seconds: -1,
      // 是否同意授权
      is_auth: false,
      // 授权auth_id
      auth_id: ''
    }
  },
  computed: {
    // 注册按钮是否可点击
    isRegister() {
      let flag = true
      if (this.full_name.trim() === '') {
        flag = false
      }
      for (let key in this.form) {
        if (typeof this.form[key] === 'string') {
          if (this.form[key].length < 6) {
            flag = false
            break
          }
        } else if (this.form[key].length === 0) {
          flag = false
          break
        }
      }
      return flag
    }
  },
  methods: {
    // 显示弹窗事件
    showToastFun(text) {
      this.$vux.toast.show({ text, type: 'text' })
    },
    // 改变用户角色
    changeUserRole(val) {
      if (val === '会员') {
        this.$router.replace('/register')
      } else {
        this.$router.replace('/register?type=agent')
      }
    },
    // 发送验证码
    sendCode() {
      let user_mobile = this.form.user_mobile
      if (!user_mobile) {
        this.showToastFun('请输入手机号码')
        return
      }
      if (_isPhone.test(user_mobile)) {
        this.seconds = 60
        let interval = setInterval(() => (this.seconds === -1 ? clearInterval(interval) : this.seconds--), 1000)
        this.$fetch.checkUserMobile({ user_mobile }).then(({ phone_exist }) => {
          if (phone_exist) {
            this.seconds = -1
            this.showToastFun('该手机号已注册')
          } else {
            this.$fetch.sendVerifyCodeSms({ phone: user_mobile }).then(data => {
              // this.form.code = data
            })
          }
        })
      } else this.showToastFun('手机号码格式错误')
    },
    // 注册
    register() {
      if (this.full_name.trim() === '') {
        this.showToastFun('请输入用户名称')
        return false
      }
      if (this.user_role_ele === '代理商' && !this.is_auth) {
        this.showToastFun('请先勾选协议')
        return false
      }
      this.$vux.loading.show({ text: '正在注册，请稍等...' })
      let user_role = this.user_role_ele === '会员' ? 1 : 11
      let obj = {
        user_role: user_role,
        type: 'register',
        full_name: this.full_name,
        ...this.form
      }
      // 绑定注册
      if (this.auth_id) {
        obj.auth_id = this.auth_id
        this.$fetch.accountBindLogin(obj).then(data => {
          // token
          localStorage.access_token = data.access_token
          // 绑定成功
          this.$router.push('/bind?type=1')
        })
      } else {
        this.$fetch.register(obj).then(data => {
          // token
          localStorage.access_token = data.access_token
          this.$router.push('/main/index')
        }).catch(err => console.log('register => errMsg: ', err))
      }
    },
    // 跳转到授权页面
    toProtocol() {
      sessionStorage.routerFrom = 'register'
      this.$router.push('/protocol')
    }
  },
  activated() {
    // document.title = '云玺印注册'
    this.user_role_ele = '会员'
    if (this.$route.query.type && this.$route.query.type === 'agent') {
      this.user_role_ele = '代理商'
    }
    if (localStorage.auth_id) this.auth_id = localStorage.auth_id
    else this.auth_id = ''
    this.form.code = ''
    this.form.user_mobile = ''
    this.form.login_password = ''
    this.seconds = -1
    this.$nextTick(() => this.$vux.loading.hide())
  }
}
</script>
