/*
 * @Author: 陈航
 * @Date: 2018-12-3 15:20:55
 * @Last Modified by: 陈航
 * @说明：自定义radio组件(横|竖)
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.my-radio-wrapper{
  .flexUi;
  width:100%;
  font-size:@f6;
  color:#333;
  text-align: left;
  .my-radio-list{
    li{
      line-height:220%;
      min-width:24vw;
      .icon-radio-true{
        color:@blue;
      }
      .icon-radio-false{
        color:#c9c9c9;
      }
      span.tips{
        font-size:@f5;
        color:#666;
      }
    }
  }
  .horizontal{
    .flexUi;
    flex-wrap: nowrap;
  }
}
</style>
<template>
  <div class="my-radio-wrapper">
    <slot name="left">
      <p :style="'width:'+labelWidth+';flex-shrink:0'">{{title}}</p>
    </slot>
    <slot name="right">
      <ul v-if="radioList.length" class="my-radio-list" :class="{horizontal:direction==='horizontal'}">
        <li v-for="(i,index) in radioList" :key="index" @click="switchFun(i, index)">
          <i class="iconfont" :class="{'icon-radio-true':i.checked, 'icon-radio-false':!i.checked}"></i>
          <span class="text">{{i.text}}</span>
          <span v-if="i.tips" class="tips">（{{i.tips}}）</span>
        </li>
      </ul>
    </slot>
  </div>
</template>
<script>
export default {
  props: {
    'label-width': {
      type: String,
      default: '24vw'
    },
    title: {
      type: String,
      default: '默认标签：'
    },
    radioList: {
      type: Array,
      default: () => []
    },
    // 'vertical'：垂直 'horizontal'：水平
    direction: {
      type: String,
      default: 'horizontal'
    }
  },
  methods: {
    switchFun(i, index) {
      if (i.checked) {
        return false
      }
      i.checked = true
      this.radioList.forEach((item, _index) => {
        if (_index !== index) item.checked = false
      })
      this.$emit('change', i)
    }
  }
}
</script>
