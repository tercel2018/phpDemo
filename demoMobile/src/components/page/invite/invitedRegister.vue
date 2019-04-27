/*
* @Author: 陈航
* @Date: 2018-12-14 15:41:47
* @Last Modified by: 陈航
* @说明：这是 邀请注册 页面
*/
<style scoped lang='less'>
@themeColor: #1a97e3;
@fadeColor: #999;
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
// 加载图标
.mySpinnerLoader(@rgba:rgba(26, 151, 227, 0.8),@size:0.1rem){
  width: @size;
  height: @size;
  -moz-animation: mySpinnerLoader 1500ms infinite linear;
  -webkit-animation: mySpinnerLoader 1500ms infinite linear;
  animation: mySpinnerLoader 1500ms infinite linear;
  -moz-border-radius: 0.5*@size;
  -webkit-border-radius: 0.5*@size;
  border-radius: 0.5*@size;
  -moz-box-shadow: @rgba 1.5*@size 0 0 0, @rgba 1.1*@size 1.1*@size 0 0, @rgba 0 1.5*@size 0 0, @rgba -1.1*@size 1.1*@size 0 0, @rgba -1.5*@size 0 0 0, @rgba -1.1*@size -1.1*@size 0 0, @rgba 0 -1.5*@size 0 0, @rgba 1.1*@size -1.1*@size 0 0;
  -webkit-box-shadow: @rgba 1.5*@size 0 0 0, @rgba 1.1*@size 1.1*@size 0 0, @rgba 0 1.5*@size 0 0, @rgba -1.1*@size 1.1*@size 0 0, @rgba -1.5*@size 0 0 0, @rgba -1.1*@size -1.1*@size 0 0, @rgba 0 -1.5*@size 0 0, @rgba 1.1*@size -1.1*@size 0 0;
  box-shadow: @rgba 1.5*@size 0 0 0, @rgba 1.1*@size 1.1*@size 0 0, @rgba 0 1.5*@size 0 0, @rgba -1.1*@size 1.1*@size 0 0, @rgba -1.5*@size 0 0 0, @rgba -1.1*@size -1.1*@size 0 0, @rgba 0 -1.5*@size 0 0, @rgba 1.1*@size -1.1*@size 0 0;
  display: inline-block;
  font-size: 10px;
  margin: 0;
  overflow: hidden;
  text-indent: 0;
}
@keyframes mySpinnerLoader{
  0% {
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.registerBox {
  width:100vw;
  min-height: 100vh;
  background: url('../../../assets/image/invited_bj.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
  font-size:@f5;
  .registerBoxContent{
    padding-top:5vh;
    .title {
      width: 88.9vw;
      margin: 0 auto;
      position: relative;
      padding: 8vw 0;
      height:8vw;
      h1{
        line-height: 8vw;
        color:#fff;
        text-align: center;
        font-size: @f9;
      }
    }
    .exchangeWarp {
      position: relative;
      margin:0 auto;
      width: 98vw;
      height: 101vw;
      background: url('../../../assets/image/invited_box.png') no-repeat center;
      background-size: cover;
      .freeget{
        position: absolute;
        top: 54%;
        left: 0;
        right: 0;
        margin:0 auto;
        width: 25vw;
        line-height: 25vw;
        text-align: center;
        font-size: @f7;
        background: url('../../../assets/image/invited_btn.png');
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
        color: #fff;
        border: none;
        z-index: 100;
        .register{
          margin:0 auto;
          width:max-content;
          .flexUi;
          p{
            padding-right:3vw;
            width:2*@f8;
            text-align:center;
          }
          .register-loading{
            margin-top:-0.1rem!important;
            .mySpinnerLoader(rgba(255,255,255,1), 0.15rem);
          }
        }
      }
      .complete {
        position: absolute;
        top: 54%;
        left: 0;
        right: 0;
        margin: auto;
        width: 25vw;
        line-height: 25vw;
        text-align: center;
        font-size: @f8;
        background: url('../../../assets/image/invited_btn.png');
        background-size: contain;
        cursor: pointer;
        color: #fff;
        border: none;
        img {
          width: 40%;
          margin-left: 5px;
        }
      }
      .invited {
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
        bottom: 6%;
        margin: auto;
        font-size: @f5;
        color: #fefefe;
      }
      // 注册框
      .rigisterFrom {
        width: 74vw;
        margin: 0 auto;
        padding-top: 6vw;
        form {
          .layui-form-item{
            .flexUi;
            width: 74vw;
            overflow: hidden;
            border-bottom: 1px solid #d7d7d7;
            margin-bottom: 1vw;
            .headline {
              width: 20vw;
              text-align: left;
              border: none;
              padding:3vw 0;
            }
            .layui-input-block{
              position: relative;
              margin-left: 4vw;
              width:50vw;
              input {
                background-color: none;
                border: none;
                outline: none;
                appearance: none;
              }
              .get-code {
                position: absolute;
                right: 0;
                top: 0;
                color: #FF0E0E;
                &:hover {
                  color: @themeColor;
                  cursor: pointer;
                }
              }
            }
            .set-pwd {
              position: relative;
              .show-pwd,
              .hide-pwd {
                position: absolute;
                right: 2vw;
                top: 0;
                cursor: pointer;
              }
            }
          }
        }
      }
      // 注册成功框
      .completeBox {
        width: 74vw;
        margin: 0 auto;
        padding-top: 5vw;
        text-align: center;
        .title {
          width: 74vw;
          height: auto;
          font-size: @f6;
          color: #FF0E0E;
          padding: 5vw 0 3vw 0;
        }
        .subTitle {
          width: 74vw;
          height: auto;
          color: #999;
        }
        .content {
          margin-top: 5vw;
          .url{
            color: #FF0E0E;
          }
        }
      }
      // 活动框
      .activityBox {
        width: 83.3vw;
        margin: 0 auto;
        padding-top: 4vw;
        text-align: center;
        color: #fff;
        .productBox {
          position: relative;
          z-index: 100;
          width: 100%;
          height: 45vw;
          margin: 0 auto;
          overflow-y: auto;
          .product {
            width: 70%;
            height: 55px;
            padding: 10px 22px;
            border-radius: 5px;
            background: url('../../../assets/image/invited_quan.png') no-repeat;
            background-size: 100% 100%;
            margin: 10px auto 0 auto;
            &:last-child {
              margin-bottom: 10px;
            }
            .trialBox {
              height: 55px;
              line-height: 26px;
              text-align: left;
              .title {
                font-size: 20px;
              }
            }
            .otherBox {
              height: 55px;
              text-align: left;
              line-height: 26px;
              .title {
                font-size: 20px;
              }
            }
          }
        }
        .productBox::-webkit-scrollbar {/*滚动条整体样式*/
          width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 5px;
        }
        .productBox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 2.5px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background: rgba(0,0,0,0.3);
        }
        .productBox::-webkit-scrollbar-track {/*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);
          border-radius: 2.5px;
          background: rgba(0,0,0,0);
        }
      }
    }
    .open-store-success-title{
      margin:0 auto;
      width:max-content;
      p{
        margin:0 auto;
        width:9.4vh;
        height:9.4vh;
        border-radius:50%;
        background-color: #fff;
        i{
          display: block;
          line-height: 10vh;
          text-align: center;
          font-size:1.2rem;
          color:#fd4e4e;
          font-weight:700;
        }
      }
      h4{
        font-size:0.6rem;
        color:#fff;
        line-height: 7.2vh;
        font-weight:700;
      }
    }
    .open-store-success-guide{
      position:relative;
      margin:3vh auto 0;
      width:83.5vw;
      height:110vw;
      background: url("../../../assets/image/invited_ok_box.png") no-repeat;
      background-size: cover;
      background-size: 100% 100%;
      text-align: center;
      // 开店成功
      .guide-store{
        padding-top:4.6vw;
        line-height: 21.7vw;
        font-size:0.6rem;
        color:#458bf5;
        font-weight:700;
      }
      .guide-website{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        margin:0 auto;
        padding:2vw;
        width:70vw;
        line-height: 5vw;
        font-size:0.4rem;
        font-weight:700;
        color:#458bf5;
        border-radius:0.15rem;
        border:solid 1px #458bf5;
        word-wrap:break-word;
      }
      .guide-tips{
        line-height: 10.9vw;
        color:#666;
        font-size:0.4rem;
      }
      .guide-qrcode-wrapper{
        position: absolute;
        left:0;
        width:100%;
        top:66vw;
        img{
          display: block;
          margin:0 auto;
          border:0;
          width:26vw;
          height:26vw;
        }
        .guide-text-main{
          padding-top:3vw;
          line-height: 180%;
          color:#666;
          font-size:0.45rem;
        }
        .guide-text-sub{
          line-height:100%;
          color:#999;
          font-size:0.4rem;
        }
      }
      // 注册成功
      .guide-register-wrapper{
        padding-top:8vw;
        img{
          display: block;
          margin:0 auto;
          border:0;
          width:32vw;
          height:32vw;
        }
        .guide-text-main{
          padding:3.4vw 0 1.6vw;
          line-height: 100%;
          color:#fd4e4e;
          font-size:0.45rem;
          font-weight:700;
        }
        .guide-text-sub{
          line-height:100%;
          color:#d17070;
          font-size:0.4rem;
        }
      }
      .guide-open-store-wrapper{
        margin-top:13.9vw;
        img{
          display: block;
          margin:0 auto;
          border:0;
          width:44.4vw;
          height:30.9vw;
        }
        p{
          padding-top:3vw;
          line-height: 100%;
          font-size:0.4rem;
          color:#666;
        }
      }
    }
    .copyright {
      width: 95vw;
      margin: 0 auto;
      text-align: center;
      color: #fff;
      padding: 5vw 0;
      font-size:@f5;
    }
  }
}
</style>
<template>
  <div class="registerBox">
    <div class="registerBoxContent">
      <template v-if="registerStatus || activity">
        <div class="title">
          <h1 v-if="registerStatus">请完善您的信息</h1>
          <h1 v-else>恭喜您！获得体验券</h1>
          <!-- <div class="cover"></div> -->
        </div>
      </template>
      <template v-else>
        <div class="open-store-success-title">
          <p><i class="iconfont icon-gouxuan"></i></p>
          <h4>恭喜您！注册成功</h4>
        </div>
      </template>
      <!-- 兑换框 -->
      <div class="exchangeWarp" v-if="registerStatus">
        <div class="rigisterFrom">
          <form class="layui-form">
            <div class="layui-form-item">
              <label class="layui-form-label headline">用户名称</label>
              <div class="layui-input-block">
                <input v-model.trim="formField.full_name.value" :ref="formField.full_name.ref" type="text" name="full_name" placeholder="公司名称" autocomplete="off" class="layui-input">
              </div>
            </div>
            <div class="layui-form-item">
              <label class="layui-form-label headline">手机号码</label>
              <div class="layui-input-block">
                <input v-model.trim="formField.user_mobile.value" :ref="formField.user_mobile.ref" type="number" name="user_mobile" placeholder="手机号" autocomplete="off" class="layui-input">
              </div>
            </div>
            <div class="layui-form-item">
              <label class="layui-form-label headline">验证码</label>
              <div class="layui-input-block">
                <input type="number" v-model.trim="formField.code.value" :ref="formField.code.ref" name="code" lay-verType="tips" placeholder="短信验证码" autocomplete="off" class="layui-input">
                <span v-if="time===-1" class='get-code' @click.stop="getCode">获取验证码</span>
                <span v-else class='get-code'>
                  <span style="color:#ea3f3f">{{time}}</span>秒后获取
                </span>
              </div>
            </div>
            <!-- <div class="layui-form-item">
              <label class="layui-form-label headline">设置密码</label>
              <div class="layui-input-block set-pwd">
                <input :type="pwd_type" v-model.trim="formField.login_password.value" :ref="formField.login_password.ref" name="login_password" placeholder="6-16位字符" autocomplete="off" class="layui-input" maxlength="16">
                <div v-if="pwd_type==='password'" class='show-pwd' @click="pwd_type='text'">
                  <img src='@/assets/image/password.png' alt=''>
                </div>
                <div v-else class='hide-pwd' @click="pwd_type='password'">
                  <img src='@/assets/image/text.png' alt=''>
                </div>
              </div>
            </div> -->
            <p style="text-align:right;"><router-link style="font-size:12px;color: #FF0E0E;" :to="'/invitedLogin' + (invited_code ? ('?invited_code=' + invited_code) : '')">已有账户，领券开店</router-link></p>
            <div v-if="btnGrey" class="freeget">
              <div class="register">
                <p>注 册</p>
                <span class="register-loading"></span>
              </div>
            </div>
            <button ref="formRegister" type="button" v-show="!btnGrey" class="freeget" @click="registerFun">注 册</button>
          </form>
        </div>
        <div class="invited" v-if="agentPhone">
          <p>{{agentPhone}}<span v-if="sub_account_name">（客户经理：{{sub_account_name}}）</span></p>
          <p>邀请您入驻云玺印会员，享受更多权益！</p>
        </div>
        <div class="invited" v-else>
          <p>欢迎您入驻云玺印会员，享受更多权益！</p>
        </div>
      </div>
      <div class="exchangeWarp" v-else-if="activity">
        <div class="activityBox">
          <div class="productBox">
            <div class="product" v-for="i in activity" :key="i.activity_id">
              <div class="trialBox" v-if="i.activity_type_code=='trial'" @click="pickOneActivity(i.activity_id)">
                <span class="title">{{i.package_name}}</span>
                <span style="float:right;margin-top:16px;"><img src='@/assets/image/icon.png' alt=''></span>
                <p style="font-size:14px;margin-left:0px;">{{i.month}}个月{{i.activity_type}}</p>
              </div>
              <!-- <div class="otherBox" v-else @click="pickOneActivity(i.activity_id)">
                <span class="title">{{i.activity_package_name}}</span>
                <span style="float:right;margin-top:16px;">{{i.activity_type}}</span>
                <p style="font-size:8px;">{{i.apply_product}}</p>
              </div> -->
            </div>
          </div>
        </div>
        <button class="freeget" @click="openStore()" style="top:52%;">马上开店</button>
        <div class="invited" style="text-align: left;max-width:83.3vw;width:max-content;bottom:4%;font-size:12px;">
          <p>1、您的体验券已放入【我的钱包】中。</p>
          <p>2、点击“马上开店”使用您的体验券免费开店。</p>
          <p>3、您也可在PC端登录{{website_domain}}使用。</p>
        </div>
      </div>
      <div class="open-store-success-guide" v-else>
        <div class="guide-register-wrapper">
          <img class="guide-qrcode" src="@/assets/image/public_address_qrcode.png"/>
          <template v-if="isWxBrowser">
            <p class="guide-text-main">长按关注公众号开店</p>
            <p class="guide-text-sub">关注后可获得更多优惠信息</p>
          </template>
          <template v-else>
            <p class="guide-text-main">长按保存二维码</p>
            <p class="guide-text-sub">关注公众号后可获得更多优惠信息</p>
          </template>
        </div>
        <div class="guide-open-store-wrapper">
          <img src="@/assets/image/public_address_guide.png"/>
          <p>关注公众号点击“会员中心 — 我要开店”</p>
        </div>
      </div>
      <div class="copyright" v-if="registerStatus">
        &copy;2018 &nbsp;新云玺科技（深圳）有限公司 &nbsp;&nbsp;&nbsp;&nbsp;蜀ICP备17002245
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 短信验证码的秒数 60秒，初始为-1
      time: -1,
      // 输入框类型：password|text
      pwd_type: 'password',
      // 注册按钮是否变灰
      btnGrey: false,
      // 是否已经注册了
      phone_exist: false,
      // 是否发送过短信验证码
      code_exist: false,
      // 判断客户端类型：true为手机端，false为PC端
      flag: true,
      // 代理商用户信息
      agentPhone: '',
      // 员工名称
      sub_account_name: '',
      // 邀请码
      invited_code: '',
      // 注册成功
      registerStatus: true,
      // 域名
      website_domain: '',
      // 活动信息
      activity: false,
      // 是否是微信
      isWxBrowser: false,
      // 表单提交
      formField: {
        full_name: {
          required: true,
          value: null,
          pattern: ['CN_EN_NU', 'NOT_KEYWORDS'],
          ref: 'formField.full_name',
          errMsg: ['请填写', '用户名称', '由中文、英文和数字组成', '不能含有关键字admin']
        },
        user_mobile: {
          required: true,
          value: null,
          pattern: ['MOBILE'],
          ref: 'formField.user_mobile',
          errMsg: ['请填写', '手机号码', '格式有误']
        },
        code: {
          required: true,
          value: null,
          pattern: ['VERIFY_CODE'],
          ref: 'formField.code',
          errMsg: ['请填写', '验证码', '只能为6位数字']
        }
        // ,
        // login_password: {
        //   required: true,
        //   value: null,
        //   pattern: ['PASSWORD'],
        //   ref: 'formField.login_password',
        //   errMsg: ['请填写', '密码', '6~16位，可输入除空格和换行符的任意字符']
        // }
      }
    }
  },
  methods: {
    // 数据初始化
    initData() {
      this.time = -1
      this.pwd_type = 'password'
      this.btnGrey = false
      this.phone_exist = false
      this.code_exist = false
      this.registerStatus = true
      this.activity = false
      this.website_domain = ''
      this.agentPhone = ''
      this.sub_account_name = ''
      this.invited_code = ''
      let invited_code = this.$route.query.invited_code
      if (invited_code && invited_code !== 'undefined') {
        this.invited_code = invited_code
      }
    },
    // 获取验证码
    getCode() {
      let _phone = /^1\d{10}$/
      let phone = this.formField.user_mobile.value
      if (_phone.test(phone)) {
        this.time = 60
        let interval = setInterval(() => (this.time === -1 ? clearInterval(interval) : this.time--), 1000)
        this.$fetch.checkUserMobile({ user_mobile: phone }).then(({ phone_exist, user_role }) => {
          this.phone_exist = phone_exist
          if (phone_exist) {
            this.time = -1
            this.$refs[this.formField.user_mobile.ref].focus()
            this.$toast('该手机号码已注册')
          } else {
            this.$fetch.sendVerifyCodeSms({ phone }).then(() => {
              this.code_exist = true
            }).catch(err => {
              this.$refs[this.formField.user_mobile.ref].focus()
              this.$toast(err)
            })
          }
        })
      } else {
        this.$refs[this.formField.user_mobile.ref].focus()
        this.$toast('请填写11位手机号码')
      }
    },
    // 提交注册
    registerFun() {
      let result = this.$formValidate(this.formField)
      if (!result) {
        return false
      }
      if (this.phone_exist) {
        this.$refs[this.formField.user_mobile.ref].focus()
        this.$toast('该手机号码已注册')
        return false
      }
      if (!this.code_exist) {
        this.$refs[this.formField.code.ref].focus()
        this.$toast('验证码错误')
        return false
      }
      this.btnGrey = true
      if (this.invited_code) result.invited_code = this.invited_code
      result.user_role = this.$route.params.type === 'agent' ? 11 : 1
      result.source_device = 'weixin'
      // 注册：将发送数据到后端
      this.$loading('正在注册...')
      this.$fetch.invitedRegister(result).then(data => {
        this.$loading()
        this.btnGrey = false
        this.website_domain = data.website_domain
        localStorage.access_token = data.access_token
        sessionStorage.uploadHost = data.host
        sessionStorage.agentHost = data.agent_host
        sessionStorage.threeDomain = data.member_domain
        sessionStorage.isExist = data.pay_password
        sessionStorage.is_auth = data.is_auth
        sessionStorage.user_mobile = result.user_mobile
        sessionStorage.realyAgent = data.user_role === 11 ? '1' : ''
        sessionStorage.alert_set_password = data.alert_set_password
        // 是否设置支付密码
        sessionStorage.set_pay_password = data.pay_password === 0 ? '' : '1'
        sessionStorage.loginInfo = JSON.stringify(data)
        this.getActivityInfo()
      }).catch(err => {
        this.$loading()
        this.btnGrey = false
        this.$toast(err)
      })
    },
    // 获取代理商信息
    getAgentInfo() {
      sessionStorage.invited_code = this.invited_code
      this.$fetch.inviterInfo({invited_code: sessionStorage.invited_code}).then(({ user_mobile, full_name, sub_account_name }) => {
        // if (full_name === '') this.agentPhone = user_mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
        this.sub_account_name = sub_account_name
        if (full_name === '') this.agentPhone = user_mobile
        else this.agentPhone = full_name
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取活动信息
    getActivityInfo() {
      this.$fetch.activityCouponCheckActivity().then(data => {
        this.registerStatus = false
        let trialList = []
        if (data.length) {
          trialList = data.filter(item => item.activity_type_code === 'trial')
        }
        if (!trialList.length) {
          this.activity = false
        } else {
          this.activity = trialList
        }
      }).catch(msg => {
        this.registerStatus = false
        this.activity = false
      })
    },
    // 选择一张试用卡或优惠券开店
    pickOneActivity(activity_id) {
      sessionStorage.activityInfo = JSON.stringify(this.activity)
      sessionStorage.company = this.formField.full_name.value
      sessionStorage.picked_activity_id = activity_id
      this.$router.push('/openStore')
    },
    // 立即使用免费券开店
    openStore() {
      sessionStorage.activityInfo = JSON.stringify(this.activity)
      sessionStorage.company = this.formField.full_name.value
      this.$router.push('/openStore')
    }
  },
  activated() {
    this.initData()
    this.$route.params.type = 'member'
    delete localStorage.access_token
    for (let key in sessionStorage) delete sessionStorage[key]
    // true为手机端，false为PC端
    this.flag = window._isMobilePlatform
    if (!this.flag) {
      this.$router.push('/')
    }
    // 是否是微信浏览器
    this.isWxBrowser = window._isWxPlatform
    if (this.invited_code) this.getAgentInfo()
  }
}
</script>
