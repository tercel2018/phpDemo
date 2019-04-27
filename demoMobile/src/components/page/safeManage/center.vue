/*
 * @Author: 陈航
 * @Date: 2018-12-21 15:40:41
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-21 17:52:19
 * @Desc: 安全管理页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.safe-center-wrapper{
  font-size:@f7;
  padding-top:12vw;
  .header-decorator{
    width:100vw;
    padding-top:5vw;
    height:28.3vw;
    background-size: 100%;
    background-position: center;
    background-image: url('./../../../assets/image/safe-manage.png');
    img{
      display: block;
      margin: 0 auto;
      width:15.3vw;
      height:0 auto;
    }
    p{
      margin-top:2.4vw;
      line-height: 100%;
      color:#fff;
      font-size: @f6;
      text-align: center;
    }
  }
  .header-operation{
    width:100vw;
    padding:0;
    background-color: #fff;
  }
}
</style>
<template>
  <div class="safe-center-wrapper">
    <header-basic title="安全管理"></header-basic>
    <div class="header-decorator">
      <img src="@/assets/image/safe-manage-icon.png"/>
      <p>安全管理中心</p>
    </div>
    <div class="header-operation">
      <stupid-cell title="登录密码" icon="icon-xiugaimima" @on-click="$router.push('safe_loginPwd')"></stupid-cell>
      <stupid-cell title="支付密码" icon="icon-payPwd" @on-click="$router.push('safe_payPwd')"></stupid-cell>
      <stupid-cell title="验证手机" icon="icon-shouji" :border-bottom="false" @on-click="$router.push('safe_mobile')"></stupid-cell>
    </div>
  </div>
</template>
<script>
import headerBasic from '@/components/common/headerBasic'
import stupidCell from '@/components/common/stupidCell'
export default {
  components: { headerBasic, stupidCell }
}
</script>
