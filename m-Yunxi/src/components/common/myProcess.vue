/*
 * @Author: 陈航
 * @Date: 2018-12-3 15:20:55
 * @Last Modified by: 陈航
 * @说明：进度(多步骤)组件
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.process-wrapper{
  margin:0 auto;
  width: max-content;
  ul.process-list{
    .flexUi;
    li{
      text-align: center;
      width:20vw;
      .circle{
        position: relative;
        width:7vw;
        height:7vw;
        border-radius:50%;
        background-color: #a7d4f3;
        margin:0 auto;
        color:@blue;
        line-height: 7vw;
        font-size:@f7;
        &:after{
          content: '';
          position:absolute;
          top:50%;
          left:6.5vw;
          width:14vw;
          height:4px;
          transform: translateY(-50%);
          background-color: #a7d4f3;
        }
      }
      .text{
        color:#fff;
        line-height:8vw;
        font-size:0.55rem;
      }
    }
    li.active{
      .circle{
        background-color: #fff;
        &:after{
          background-color: #fff;
        }
      }
    }
    li:last-child{
      .circle{
        &:after{
          width:0;
          height:0;
        }
      }
    }
  }
}
</style>
<template>
  <div class="process-wrapper">
    <ul class="process-list">
      <li v-for="(i,index) in steps" :key="index" :class="{active:index<=activeIndex}">
        <p class="circle">{{index + 1}}</p>
        <p class="text">{{i}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    activeIndex: {
      type: Number,
      default: -1
    },
    steps: {
      type: Array,
      default: () => []
    }
  }
}
</script>
