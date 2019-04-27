/*
 * @Author: 陈航
 * @Date: 2019-02-19 18:02:37
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-02-21 09:50:16
 * @Desc: 扫码验证
 */

<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.qrcode-verify-wrapper {
  height: 100vh;
  background-color:#f9f9f9;
  .company-info {
    width: 100%;
    height: 50vw;
    text-align: center;
    background-color: #fff;
    img {
      width: 24vw;
      margin: 13.5vw auto 3vw;
    }
    p {
      font-size: @f8;
    }
  }
  .x-form {
    margin: 8vw 0;
    padding:3vw 6vw 6vw;
    background-color: #fff;
    .group {
      .red {
        position: relative;
        right: -15px;
        font-size:@f7;
      }
    }
  }
  .x-btn-wrapper{
    margin:0 auto!important;
    width:88vw!important;
    .x-btn{
      width:88vw!important;
    }
  }
  .verify-success{
    width: 100%;
    height: 100vh;
    text-align: center;
    background-color: #fff;
    .success-img {
      padding: 20vw 0 0;
      img {
        width: 25vw;
      }
      p {
        font-size: @f8;
        padding: 2vw 0;
      }
    }
    .success-desc {
      line-height: @f12;
      font-size: @f7;
      margin-bottom: 4vw;
    }
    .share-qrcode {
      img {
        width: 50vw;
      }
      p {
        line-height: @f10;
        font-size: @f6;
      }
    }
  }
}
</style>
<template>
  <div class="qrcode-verify-wrapper" v-if="employeeInfo">
    <div v-if="employeeInfo.agent_verified == 0">
      <div class="company-info">
        <img src="../../../assets/image/newlogo2.png" />
        <p>【{{employeeInfo.agent_name}}】邀请您加入公司</p>
      </div>
      <div class="x-form">
        <group label-width="28vw" class="group vux-group-border-bottom" gutter="0">
          <x-input title="员工姓名" type="text" v-model="employeeInfo.full_name" readonly></x-input>
          <x-input title="手机号码" :max="11" type="tel" is-type="china-mobile" v-model="employeeInfo.user_mobile" readonly></x-input>
          <x-input title="短信验证码" placeholder="请填写验证码" type="tel" :show-clear="false" :min="6" :max="6" v-model="formField.code.value" :ref="formField.code.ref">
            <span slot="right" v-if="time===-1" class="red" @click="getCode">获取验证码</span>
            <span slot="right" v-else class="red">{{time}}秒后获取</span>
          </x-input>
        </group>
      </div>
      <div class="x-btn-wrapper">
        <x-button class="x-btn" type="primary" @click.native="submitVerify">立即验证</x-button>
      </div>
    </div>
    <div v-else>
      <div class="verify-success">
        <div class="success-img">
          <img src="../../../assets/image/success.png"/>
          <p>验证成功</p>
        </div>
        <div class="success-desc">
          <p>恭喜您已成功加入【{{employeeInfo.agent_name}}】</p>
        </div>
        <div class="share-qrcode">
          <p><img class="share-qrcode-img" :src="shareUrl"/></p>
          <p>长按保存分享二维码</p>
          <p>马上分享您的专属二维码给客户吧</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { XInput, Group, XButton } from 'vux'
export default {
  components: { XInput, Group, XButton },
  data() {
    return {
      // 员工信息
      employeeInfo: {},
      // 短信验证码的秒数 60秒，初始为-1
      time: -1,
      // 邀请链接
      invitedUrl: '',
      // 分享二维码图片地址
      shareUrl: '',
      // 表单数据
      formField: {
        code: {
          value: '',
          required: true,
          pattern: 'VERIFY_CODE',
          ref: 'formField.verify_code',
          errMsg: '请填写#验证码#为6位数字'
        }
      }
    }
  },
  methods: {
    // 获取验证码
    getCode() {
      let phone = this.employeeInfo.user_mobile
      this.time = 59
      let interval = setInterval(() => (this.time === -1 ? clearInterval(interval) : this.time--), 1000)
      this.$fetch.sendVerifyCodeSms({ phone }).then(() => console.log('已发送验证码'))
    },
    // 获取代理商信息
    getUserInfo() {
      let verify_code = this.$route.query.verify_code
      this.$fetch.subAccountGetEmployeeInfo({ user_code: verify_code }).then(data => {
        this.employeeInfo = data
        this.invitedUrl = location.origin + '/invitedEntry?invited_code=' + data.user_code
        this.shareUrl = data.agent_host + '/qrcode/generate?content=' + this.invitedUrl
        this.$loading()
      }).catch(err => {
        this.$loading()
        this.$toast(err)
      })
    },
    // 提交验证
    submitVerify() {
      let result = this.$formValidate(this.formField)
      if (!result) return
      result.user_mobile = this.employeeInfo.user_mobile
      this.$loading('提交验证...')
      this.$fetch.subAccountVerify(result).then(data => {
        this.employeeInfo.agent_verified = 1
        this.$loading()
      }).catch(msg => {
        this.$refs[this.formField.code.ref].focus()
        this.$loading()
        this.$toast(msg)
      })
    }
  },
  activated() {
    this.formField.code.value = ''
    this.employeeInfo = {}
    this.$loading('加载数据...')
    this.getUserInfo()
  }
}
</script>
