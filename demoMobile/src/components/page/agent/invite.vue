/*
 * @Author: 陈航
 * @Date: 2018-11-05 11:54:17
 * @Last Modified time: 2018-11-05 11:54:17
 * @说明：代理商邀请页面
 */
<style lang="less" scoped>
</style>
<template>
  <my-invite></my-invite>
</template>
<script>
import myInvite from '@/components/common/myInvite'
import assign from '@/mixins/assign.js'
export default {
  components: { myInvite },
  mixins: [assign],
  data() {
    return {}
  }
}
</script>
