/*
 * @Author: 黄智强
 * @Date: 2018-05-05 13:39:19
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-12-07 11:15:33
 * @说明：绑定成功页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.unbind-wrapper{
  position:relative;
  padding-top:6vh;
  height:94vh;
  background-color: #f5f5f5;
  img{
    display:block;
    margin:0 auto 5.5vh;
    width:23vw;
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
  .unbind{
    margin:6vh auto 3vw;
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
  <div class="unbind-wrapper">
    <img src="../../../assets/image/unbind.png"/>
    <h3>+86 {{phone?(String(phone).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')):'***********'}}</h3>
    <!-- <div class="btn input">
      <input class="phone" type="text" placeholder="请输入手机号" autofocus :value="phone" @input="checkLength(1, 11, $event)" :class="{'red':(phone.length!==11 || !(/^1[3,4,5,7,8,9]\d{9}$/.test(phone)))}"/>
    </div> -->
    <div class="btn input">
      <input type="number" placeholder="请输入验证码" autofocus :value="input_code" @input="checkLength(6, $event)" :class="{'red':input_code.length!==6}"/>
      <span v-if="seconds <= 0" class="blue" @click="sendCode">获取验证码</span>
      <span v-else>{{seconds}}秒后获取</span>
    </div>
    <div class="btn unbind" v-if="input_code.length===6" @click="unbindFun">确定</div>
    <div class="btn unbind grey" v-else>确定</div>
    <div class="btn index" @click="$router.push('/main/index')" data-fixed-bottom="component">返回首页</div>
  </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers'
export default {
  data() {
    return {
      phone: '',
      code: '',
      seconds: -1,
      input_code: '',
      timer: null
    }
  },
  methods: {
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
    // 检查验证码输入长度
    checkLength(len, event) {
      let _value = event.target.value
      if (_value && _value.length > len) {
        event.target.value = _value.substring(0, len)
      }
      this.input_code = event.target.value
    },
    // 解除绑定
    unbindFun() {
      if (!this.input_code) {
        this.$toast('请输入验证码')
        return false
      }
      let params = {
        user_mobile: this.phone,
        code: this.input_code
      }
      this.$loading('解除绑定...')
      this.$fetch.accountUnlink(params).then(data => {
        this.$loading()
        this.$toast('已解除绑定')
        localStorage.access_token = ''
        delete localStorage.access_token
        this.$router.push('/login')
      }).catch(err => {
        this.$loading()
        console.log('errMsg => accountUnlink: ' + err)
      })
    },
    // 获取信息
    getUserInfo() {
      this.$fetch.getUserInfo().then(data => {
        if (!sessionStorage.user_mobile) this.phone = data.user_mobile
      })
    }
  },
  activated() {
    document.title = '解除绑定'
    this.seconds = -1
    this.phone = ''
    this.input_code = ''
    if (sessionStorage.user_mobile) this.phone = sessionStorage.user_mobile
    this.getUserInfo()
    // if (!localStorage.auth_id) {
    //   this.$router.go(-1)
    // }
  },
  deactivated() {
    document.title = '云玺印ERP-图文广告行业业绩提升的秘密武器'
    if (this.timer) clearInterval(this.timer)
  }
}
</script>
