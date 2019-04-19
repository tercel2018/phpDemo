/*
 * @Author: 陈航
 * @Date: 2018-12-21 15:40:41
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-22 16:04:12
 * @Desc: 验证手机号页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.mobile-wrapper{
  position:relative;
  padding-top:calc(~'12vw + 6vh');
  background-color: #f5f5f5;
  img{
    display:block;
    margin:0 auto 5.5vh;
    width:15vw;
    border:0;
  }
  h3{
    margin:0 auto 8vh;
    text-align: center;
    line-height: 100%;
    color:#333;
    font-size:@f8;
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
      width:40vw;
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
  .new-phone{
    .flexUi;
    .blue{
      height:5vw;
      line-height:5vw;
      border-right:solid 2px @9;
      padding-left:4vw;
    }
    input{
      width:58vw;
    }
  }
  .check-mobile-code{
    margin:6vh auto;
    background-color: #1a97e3;
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
  <div class="mobile-wrapper">
    <header-basic title="验证手机"></header-basic>
    <template v-if="step === 1">
      <img src="../../../assets/image/safe_mobile.png"/>
      <h3>+86 {{orig_phone?(String(orig_phone).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')):'***********'}}</h3>
      <div class="btn input">
        <input type="number" placeholder="请输入验证码" autofocus :value="orig_phone_code" ref="orig_phone_code" @input="checkLength(6, 'orig_phone_code', $event)" :class="{'red':orig_phone_code.length!==6}"/>
        <span v-if="seconds <= 0" class="blue" @click="sendCode('orig_phone')">获取验证码</span>
        <span v-else>{{seconds}}秒后获取</span>
      </div>
      <div class="btn check-mobile-code" v-if="orig_phone_code.length===6" @click="checkMobileAndCode('orig_phone')">下一步</div>
      <div class="btn check-mobile-code grey" v-else>下一步</div>
    </template>
    <template v-else>
      <div class="btn input new-phone">
        <span class="blue ">CN + 86</span>
        <input type="number" placeholder="请输入新手机号" autofocus :value="new_phone" ref="new_phone" @input="checkLength(11, 'new_phone', $event)" :class="{'red':new_phone.length!==11}"/>
      </div>
      <div class="btn input">
        <input type="number" placeholder="请输入验证码" autofocus :value="new_phone_code" ref="new_phone_code" @input="checkLength(6, 'new_phone_code', $event)" :class="{'red':new_phone_code.length!==6}"/>
        <span v-if="seconds <= 0" class="blue" @click="sendCode('new_phone')">获取验证码</span>
        <span v-else>{{seconds}}秒后获取</span>
      </div>
      <div class="btn check-mobile-code" v-if="new_phone_code.length===6 && new_phone.length===11" @click="checkMobileAndCode('new_phone')">确认修改</div>
      <div class="btn check-mobile-code grey" v-else>确认修改</div>
    </template>
  </div>
</template>
<script>
import headerBasic from '@/components/common/headerBasic'
import { setInterval, clearInterval } from 'timers'
export default {
  components: { headerBasic },
  data() {
    return {
      // 当前步骤
      step: 1,
      // 用户旧手机
      orig_phone: '',
      // 新手机
      new_phone: '',
      // 旧手机验证码
      orig_phone_code: '',
      // 新手机验证码
      new_phone_code: '',
      // 倒计时
      seconds: -1,
      // 定时器
      timer: null
    }
  },
  methods: {
    sendCode(phone) {
      this.seconds = 59
      this.timer = setInterval(() => {
        if (this.seconds <= 0) clearInterval(this.timer)
        else this.seconds--
      }, 1000)
      if (phone === 'orig_phone') {
        this.$fetch.sendVerifyCodeSms({ phone: this[phone] }).catch(() => {
          this.seconds = -1
          if (this.timer) clearInterval(this.timer)
          this.timer = null
        })
      } else {
        this.$fetch.checkUserMobile({ user_mobile: phone }).then(({ phone_exist }) => {
          if (phone_exist) {
            this.seconds = -1
            this.$toast('手机号码已存在')
            this.$refs['new_phone'].focus()
          } else {
            this.$fetch.sendVerifyCodeSms({ phone: this[phone] }).catch(() => {
              this.seconds = -1
              if (this.timer) clearInterval(this.timer)
              this.timer = null
            })
          }
        })
      }
    },
    // 检查验证码输入长度
    checkLength(len, type, event) {
      let _value = event.target.value
      if (_value && _value.length > len) {
        event.target.value = _value.substring(0, len)
      }
      this[type] = event.target.value
    },
    // 手机验证
    checkMobileAndCode(_phone) {
      let code = this[(_phone + '_code')]
      let phone = this[_phone]
      if (_phone !== 'orig_phone') {
        if (!phone) {
          this.$toast('请输入新手机号')
          this.$refs['new_phone'].focus()
          return false
        } else if (!(/^\s*1[3,4,5,7,8,9]\d{9}\s*$/.test(phone))) {
          this.$toast('手机号码格式错误')
          this.$refs['new_phone'].focus()
          return false
        }
      }
      if (!code) {
        this.$toast('请输入验证码')
        this.$refs[(_phone + '_code')].focus()
        return false
      } else if (code.length !== 6) {
        this.$toast('验证码为6位数字')
        this.$refs[(_phone + '_code')].focus()
        return false
      }
      if (_phone === 'orig_phone') {
        this.$loading('验证中...')
      } else {
        this.$loading('修改中...')
      }
      this.$fetch.checkSmsVerifyCode({ phone, code }).then(() => {
        if (_phone === 'orig_phone') {
          this.$fetch.modifyPhoneStep1().then(data => {
            this.$loading()
            this.step = 2
            this.seconds = -1
            if (this.timer) clearInterval(this.timer)
            this.timer = null
            sessionStorage.password_reset_token = data.password_reset_token
            this.$router.replace({ query: { step: this.step } })
          }).catch((msg) => {
            this.$loading()
            this.$toast(msg)
            this.$refs['orig_phone_code'].focus()
          })
        } else {
          let password_reset_token = sessionStorage.password_reset_token
          let user_mobile = this.new_phone
          this.$fetch.modifyPhone({ user_mobile, password_reset_token }).then(() => {
            this.$loading()
            sessionStorage.user_mobile = user_mobile
            this.$router.go(-1)
          }).catch((msg) => {
            this.$loading()
            this.$toast(msg)
            if (msg.indexOf('验证码') > -1) {
              this.$refs['new_phone_code'].focus()
            } else {
              this.$refs['new_phone'].focus()
            }
          })
        }
      }).catch((msg) => {
        this.$loading()
        this.$toast(msg)
        if (_phone === 'orig_phone') {
          this.$refs['orig_phone_code'].focus()
        } else {
          if (msg.indexOf('验证码') > -1) {
            this.$refs['new_phone_code'].focus()
          } else {
            this.$refs['new_phone'].focus()
          }
        }
      })
    },
    // 获取信息
    getUserInfo() {
      this.$fetch.getUserInfo().then(data => {
        if (!sessionStorage.user_mobile || data.user_mobile !== this.orig_phone) {
          sessionStorage.user_mobile = this.orig_phone = data.user_mobile
        }
      })
    }
  },
  activated() {
    this.seconds = -1
    this.timer = null
    this.orig_phone_code = ''
    this.new_phone_code = ''
    this.orig_phone = sessionStorage.user_mobile || ''
    this.new_phone = ''
    this.step = this.$route.query.step || 1
    this.getUserInfo()
  },
  deactivated() {
    if (this.timer) clearInterval(this.timer)
    delete sessionStorage.password_reset_token
  }
}
</script>
