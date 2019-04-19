/*
 * @Author: 陈航
 * @Date: 2019-01-15 15:03:43
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-02-18 13:38:05
 * @Desc: 开关组件
 */
<style lang="less" scoped>
.elegant-switch-wrapper {
  position: relative;
  float: left;
  margin: 0;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select: none;
  .elegant-switch-checkbox {
    display: none;
    &:checked + .elegant-switch-label .elegant-switch-inner {
      margin-left: 0;
    }
    &:checked + .elegant-switch-label .elegant-switch-switch {
      right: 0!important;
      box-shadow:none;
    }
  }
  .elegant-switch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border-radius: 4vw;
    .elegant-switch-inner {
      display: block;
      width: 200%;
      margin-left: -100%;
      transition: margin 0.3s ease-in 0s;
      &::before, &::after{
        display: block;
        float: right;
        width: 50%;
        height: 8vw;
        padding: 0;
        line-height: 8vw;
        font-size: @f6;
        color: #fff;
        box-sizing: border-box;
        border-radius: 4vw;
      }
      &::after {
        content: attr(data-on);
        padding-left: 2vw;
        background-color: @blue;
        color: #fff;
        border:solid 1px @blue;
      }
      &::before {
        content: attr(data-off);
        padding-right: 2vw;
        background-color: #efefef;
        color: #999;
        text-align: right;
        border:solid 1px #ddd;
      }
    }
    .elegant-switch-switch{
      position: absolute;
      display: block;
      width: calc(~'8vw - 2px');
      width: -webkit-calc(~'8vw - 2px');
      height: calc(~'8vw - 2px');
      height: -webkit-calc(~'8vw - 2px');
      margin: 1px;
      background: #fff;
      top: 0;
      bottom: 0;
      border-radius: calc(~'4vw - 1px');
      border-radius: -webkit-calc(~'4vw - 1px');
      box-shadow: 0 0 1px #999;
      transition: all 0.3s ease-in 0s;
    }
  }
}
</style>
<template>
  <div class="elegant-switch-wrapper" :style="'width:'+width">
    <input class="elegant-switch-checkbox" :id="'elegant-switch-' + id" type="checkbox" v-model="newValue">
    <label class="elegant-switch-label" :for="'elegant-switch-' + id">
      <span class="elegant-switch-inner" :data-on="on" :data-off="off"></span>
      <span class="elegant-switch-switch" :style="'right:calc('+(width)+' - 8vw)'"></span>
    </label>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: [ String, Number ],
      required: true
    },
    width: {
      type: String,
      default: '20vw'
    },
    on: {
      type: String,
      default: 'ON'
    },
    off: {
      type: String,
      default: 'OFF'
    },
    value: {
      type: [ Number, Boolean ],
      required: true
    },
    params: {
      type: [ String, Number, Boolean, Object, Array ],
      required: true
    }
  },
  computed: {
    newValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        this.$emit('switch-event', this.params, value)
      }
    }
  }
}
</script>
