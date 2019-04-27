/*
 * @Author: 陈航
 * @Date: 2018-12-21 16:13:02
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-21 17:28:07
 * @Desc: 占行组件
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.stupid-cell-wrapper{
  margin-left:15px;
  padding:15px 15px 15px 0;
  width: calc(~'100vw - 30px');
  width: -webkit-calc(~'100vw - 30px');
  .flexUi(space-between);
  line-height: 100%;
  font-size:@f7;
  .left{
    .flexUi;
    i{
      margin-right:2vw;
      font-size:@f8;
    }
  }
  .right{
    i{
      color:#666;
      font-size:@f8;
    }
  }
}
.has-border-bottom{
  position: relative;
  &:after{
    content:'';
    position: absolute;
    bottom:0;
    left:0;
    height:1px;
    width:calc(~'100vw - 15px');
    width: -webkit-calc(~'100vw - 15px');
    background-color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
</style>
<template>
  <div class="stupid-cell-wrapper" @click="cellClick" :class="{'has-border-bottom': borderBottom}">
    <p class="left"><i v-if="icon" class="iconfont" :class="icon" :style="'color:'+iconColor+';'"></i><span :style="'color:'+titleColor+';'">{{title}}</span></p>
    <p class="right"><i class="iconfont icon-you"></i></p>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '默认标题'
    },
    'border-bottom': {
      type: Boolean,
      default: true
    },
    'on-click': {
      type: Function,
      default: () => function() {}
    },
    params: {
      type: [ String, Number, Boolean, Object, Array ],
      default: null
    },
    'icon-color': {
      type: String,
      default: '#1a97e3'
    },
    'title-color': {
      type: String,
      default: '#666'
    }
  },
  methods: {
    cellClick() {
      this.$emit('on-click', this.params)
    }
  }
}
</script>
