/*
 * @Author: 陈航
 * @Date: 2019-02-19 17:53:34
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-02-20 17:17:50
 * @Desc: 员工专属二维码
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.qrcode-wrapper{
  margin-bottom:20vw;
  font-size: @f7;
  padding-top:12vw;
  text-align: center;
  p{
    font-size: @f5;
  }
  img{
    display: block;
    margin: 10vw auto 5vw;
    width:50vw;
  }
}
</style>
<template>
  <div class="qrcode-wrapper">
    <header-basic title="分享二维码"></header-basic>
    <img :src="shareUrl"/>
    <p>邀请链接：<span>{{invitedUrl}}</span></p>
  </div>
</template>
<script>
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { headerBasic },
  data() {
    return {
      // 邀请链接
      invitedUrl: '',
      // 分享链接
      shareUrl: ''
    }
  },
  activated() {
    let user_code = ''
    if (this.$route.query.user_code) user_code = this.$route.query.user_code
    this.invitedUrl = location.origin + '/invitedEntry?invited_code=' + user_code
    this.shareUrl = sessionStorage.agentHost + '/qrcode/generate?content=' + this.invitedUrl
  }
}
</script>
