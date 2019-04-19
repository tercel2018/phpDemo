/*
 * @Author: 陈航
 * @Date: 2018-09-17 14:35:55
 * @Last Modified by: 陈航
 * @说明：代理商协议
 */
<style lang="less" scoped>
.protocol-wrapper{
  padding-top:12vw;
}
</style>
<template>
  <div class="protocol-wrapper">
    <!-- 头部导航 -->
    <header-basic title="合作协议"></header-basic>
    <!-- 协议内容 -->
    <agreement></agreement>
  </div>
</template>
<script>
import headerBasic from '@/components/common/headerBasic'
import agreement from '@/components/common/agreement'
export default {
  components: { headerBasic, agreement },
  activated() {
    // 不是从注册过来，路由重定向
    // if (sessionStorage.routerFrom !== 'register') {
    //   this.$router.push('/')
    // }
  },
  deactivated() {
    delete sessionStorage.routerFrom
  }
}
</script>
