/*
 * @Author: 陈航
 * @Date: 2018-10-23 16:39:48
 * @Last Modified by: 陈航
 * @说明：顶部导航 增加导航
 */
 <style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.header-and-nav-wrapper{
  width:100%;
  .side-nav-wrapper{
    position: fixed;
    z-index:-999;
    top:12vw;
    height:calc(~'100vh - 27vw');
    height:-webkit-calc(~'100vh - 27vw');
    width:100vw;
    left:0;
    opacity:0;
    background-color: rgba(33,33,33,.5);
    .side-nav-inner{
      position: absolute;
      right:-40vw;
      top:0;
      width:40vw;
      height:calc(~'100vh - 27vw');
      height:-webkit-calc(~'100vh - 27vw');
      background-color: #fff;
      transition: right 0.5s ease-in-out;
      -webkit-transition: right 0.5s ease-in-out;
    }
    .nav-open-inner{
      right:0;
    }
  }
  .nav-open{
    z-index:999;
    opacity:1;
    transition: opacity 0 0.5s ease-in-out, z-index 0s;
    -webkit-transition: opacity 0 0.5s ease-in-out, z-index 0s;
  }
}
</style>
<template>
  <div class="header-and-nav-wrapper">
    <header-basic :title="title" :more="(more==='' || more===undefined)?true:more" v-model="newValue"></header-basic>
    <div class="side-nav-wrapper" :class="{'nav-open':newValue}" @click="hideNav">
      <div class="side-nav-inner" :class="{'nav-open-inner':newValue}" @click.stop>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { headerBasic },
  props: ['title', 'value', 'more'],
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
    hideNav() {
      this.$emit('input', false)
    }
  }
}
</script>
