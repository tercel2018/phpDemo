/*
 * @Author: 黄智强
 * @Date: 2018-05-04 16:58:26
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-01-09 16:14:26
 * @说明：会员--登录或注册页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.all {
  .flexUi(space-between);
  flex-direction: column;
  background: url('../../../assets/image/loginBg.jpg') no-repeat center;
  background-size: cover;
  height:100vh;
  header {
    .flexUi(space-between);
    width: 92%;
    padding-top: 8.425926vw;
    color: #fff;
    .logo {
      .flexUi;
      font-weight: bold;
      img {
        width: 18vw;
        margin-right: 2.22vw;
      }
    }
    .help{
      font-size:@f7;
    }
  }
  section {
    width: 85vw;
    margin-top: 10%;
    .backLogin {
      margin-top: 8vw;
      text-align: center;
      font-size: @f7;
    }
    .otherLoginMethod{
      margin-top: 10vh;
      .title{
        text-align: center;
        color:@9;
        font-size:@f6;
        position: relative;
        width:8 * @f6;
        margin:0 auto;
        font-weight:400;
        &:after,&:before{
          content: '';
          position: absolute;
          top:50%;
          transform: translateY(-50%);
          width:calc(~'42.5vw - 2.4rem');
          width:-webkit-calc(~'42.5vw - 2.4rem');
          height:1px;
          background-color: #eee;
        }
        &:before{
          left: calc(~'-42.5vw + 2.4rem');
        }
        &:after{
          left: 4.8rem;
        }
      }
      .loginMethodList{
        margin: 3vh auto 0;
        width: max-content;
        .flexUi;
        li{
          padding:0 10vw;
          i{
            font-size:2.2rem;
          }
        }
        .qq i{
          color:#4dafea;
        }
        .weixin i{
          color:#3eb135;
        }
      }
    }
  }
  footer {
    padding-bottom: 3.703704vw;
    font-size: @f5;
    color: #979899;
    text-align: center;
  }
}
</style>
<template>
  <div class="all" ref="all">
    <header>
      <div class="logo">
        <img src="../../../assets/image/logo_10_11.png" alt="">
      </div>
      <div class="help">帮助支持</div>
    </header>
    <section>
      <keep-alive>
        <login v-if="type==='login'" :type.sync="type"></login>
        <register v-else :type.sync="type"></register>
      </keep-alive>
      <div class="backLogin" v-if="type==='register'" @click="type='login',$router.replace('/login')">
        已有账号
        <span class="red">请登录</span>
      </div>
      <div class="backLogin" v-else @click="type='register',$router.replace('/register')">
        没有账号
        <span class="red">请注册</span>
      </div>
      <!-- 其他登录方式 -->
      <!-- <div class="otherLoginMethod" v-if="isWXBrowser && !auth_id">
        <h3 class="title">其他登录方式</h3>
        <ul class="loginMethodList">
          <li class="qq" @click="bindQQLoginUrl" v-if="false">
            <i class="iconfont icon-qq"></i>
          </li>
          <li class="weixin" @click="bindWeixinLoginUrl">
            <i class="iconfont icon-weixin"></i>
          </li>
        </ul>
      </div> -->
    </section>
    <footer>
      <span>©2018 新云玺科技（深圳）有限公司</span>
      <span>蜀ICP备17002245号</span>
    </footer>
  </div>
</template>
<script>
import login from '@/components/page/bind/login'
import register from '@/components/page/bind/register'
export default {
  components: { login, register },
  data() {
    return {
      // 登录或注册：login || register
      type: 'login',
      // 是否是微信浏览器
      isWXBrowser: false,
      // 授权
      auth_id: ''
    }
  },
  methods: {
    // 获取qq绑定登录地址
    // bindQQLoginUrl() {
    //   this.$toast('目前还不支持qq绑定登录，你可以绑定你的微信账号登录')
    // },
    // 获取微信绑定登录地址
    // bindWeixinLoginUrl() {
    //   this.$loading('绑定微信账号...')
    //   this.$fetch.accountUnionLoginUrl({code: 'index'}).then(data => {
    //     this.$loading()
    //     window.location.href = data.login_url
    //   })
    // }
  },
  activated() {
    // document.title = '云玺印授权'
    // this.$refs.all.style.height = document.documentElement.clientHeight + 'px'
    if (this.$route.path === '/register') {
      this.type = 'register'
    } else {
      this.type = 'login'
    }
    // 微信浏览器
    this.isWxBrowser = this.$isWxBrowser()
    // 获取auth_id
    let local_authId = localStorage.auth_id
    if (local_authId && local_authId !== 'undefined') { // 本地取
      this.auth_id = local_authId
      document.title = '绑定账号'
    } else {
      this.auth_id = ''
      delete localStorage.auth_id
      document.title = '云玺印ERP-图文广告行业业绩提升的秘密武器'
    }
  },
  deactivated() {
    document.title = '云玺印ERP-图文广告行业业绩提升的秘密武器'
  }
}
</script>
