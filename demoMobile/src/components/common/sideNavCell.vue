/*
 * @Author: 陈航
 * @Date: 2018-10-24 10:39:48
 * @Last Modified by: 陈航
 * @说明：侧边导航元素
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.side-nav-cell-wrapper{
  width: calc(~'100% - 8vw');
  padding: 0 4vw;
  height:6vh;
  border-bottom:solid 1px #dcdcdc;
  .flexUi(flex-start,center);
  i{
    margin-right:2vw;
    font-size:@f7;
  }
  span{
    font-size:@f6;
  }
}
</style>
<template>
  <div class="side-nav-cell-wrapper" @click.stop="navEvent">
    <i v-if="icon" class="iconfont" :class="icon" :style="{'color':color}"></i>
    <span :style="{'color':color}">{{title}}</span>
  </div>
</template>
<script>
export default {
  props: ['icon', 'title', 'params', 'color'],
  methods: {
    navEvent() {
      this.$emit('on-click', this.params)
    }
  }
}
</script>
