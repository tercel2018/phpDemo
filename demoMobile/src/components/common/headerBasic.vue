/*
 * @Author: 陈航
 * @Date: 2018-10-23 16:39:48
 * @Last Modified by: 陈航
 * @说明：顶部导航 基础组件
 */
 <style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.header-nav-wrapper{
  position: fixed;
  z-index:499;
  top:0;
  left:0;
  width:100vw;
  height:12vw;
  background-color: #333;
  p{
    display: block;
    font-size:@f7;
    color:#fff;
    font-size:400;
  }
  .back{
    position:absolute;
    left:4vw;
    top:50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    .flexUi;
  }
  .title{
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
  .sidenav{
    position:absolute;
    right:4vw;
    top:50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
  }
  i{
    display: block;
    font-size:@f9;
  }
  span{
    display: block;
    font-size:@f6;
  }
}
</style>
<template>
  <div class="header-nav-wrapper">
    <slot name="left">
      <p class="back" @click="$router.go(-1)"><i class="iconfont icon-zuo"></i><span>返回</span></p>
    </slot>
    <slot name="title">
      <p class="title">{{title}}</p>
    </slot>
    <template v-if="moreNav">
      <slot name="right">
        <p class="sidenav" @click="switchSideNav"><i class="iconfont icon-daohang"></i></p>
      </slot>
    </template>
    <template v-else>
      <slot name="right"></slot>
    </template>
  </div>
</template>
<script>
export default {
  props: ['title', 'more', 'value'],
  data() {
    return {
      moreNav: false
    }
  },
  computed: {
    newValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    switchSideNav() {
      this.$emit('input', !this.newValue)
    }
  },
  watch: {
    more(newVal) {
      this.moreNav = newVal
    }
  },
  activated() {
    this.moreNav = this.more
  }
}
</script>
