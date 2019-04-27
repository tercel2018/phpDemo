/*
 * @Author: 黄智强
 * @Date: 2018-05-17 14:52:07
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-11-26 11:45:34
 * @说明：空白加载页面，目的：在本页面判断是否已绑定过而已
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.wrapper{
  font-size:@f7;
  .auth-tips{
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    padding-top:4.6vw;
    height:54vw;
    width:100%;
    background-color: #4db132;
    color:#fff;
    text-align: center;
    img {
      display: block;
      margin:0 auto 4.6vw;
      width:23vw;
      height:auto;
    }
    p{
      margin:0 auto;
      width:80%;
      line-height:150%;
    }
  }
  .public-info{
    margin:6vw 0 10vw 5vw;
    p{
      .flexUi;
      span{
        display:block;
        height:@f7;
        line-height: @f7;
        font-size:@f6;
        color:#b5b5b8;
        font-weight:600;
        i{
          display:inline-block;
          color:#b5b5b8;
          font-weight:600;
          line-height: @f7;
          text-align: center;
          font-size:@f8;
        }
      }
      span.icon{
        width:@f7;
        border:solid 1px #d3d5d9;
        vertical-align: middle;
        margin-right:1.5vw;
        border-radius:2px;
      }
    }
  }
  .certain-login{
    margin:0 auto;
    width:90vw;
    height:12vw;
    line-height:12vw;
    text-align: center;
    color:#fff;
    font-size:@f8;
    border-radius:0.2rem;
    background-color: #04be02;
  }
}
</style>
<template>
  <div class="wrapper" v-if="false">
    <div class="auth-tips">
      <img src="../../../assets/image/wx-auth.png"/>
      <p>该网页由云玺印开发，向其提供以下权限即可继续操作</p>
    </div>
    <div class="public-info">
      <p><span class="icon"><i class="iconfont icon-gouxuan"></i></span><span>获取你的公开信息(昵称、头像等)</span></p>
    </div>
    <div class="certain-login" @click="wxAuth">确认登录</div>
  </div>
</template>
<script>
export default {
  methods: {
    // 获取auth_id
    wxAuth(router) {
      this.$fetch.accountUnionLoginUrl({router: router}).then(data => {
        window.location.href = data.login_url
      })
    }
  },
  activated() {
    // document.title = '云玺印授权'
    // 非微信浏览器不必授权，微信浏览器授权过的不必再次授权
    if (!this.$isWxBrowser()) {
      delete localStorage.auth_id
      this.$router.push('login')
    } else {
      // 授权后跳转地址
      let router = this.$route.query.router
      let toRouter = ''
      if (!router || router === 'undefined' || router === 'bind') {
        router = 'bind'
        toRouter = '/bind'
      } else if (router === 'unbind') {
        toRouter = '/unbind'
      } else {
        toRouter = '/main/' + router
      }
      // 是否有auth_id和access_token
      let auth_id = localStorage.auth_id
      let access_token = localStorage.access_token
      if (auth_id && access_token && auth_id !== 'undefined' && access_token !== 'undefined') {
        this.$router.push(toRouter)
      } else {
        this.wxAuth(router)
      }
    }
  }
}
</script>
