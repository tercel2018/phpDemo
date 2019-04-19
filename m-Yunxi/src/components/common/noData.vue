
/*
 * @Author: 陈航
 * @Date: 2018-09-05 09:32:54
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-20 17:46:51
 * @说明：没有数据
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center,@flexwrap:wrap) {
  display: flex;
  display: -webkit-flex;
  -webkit-align-items: @align;
  align-items: @align;
  -webkit-justify-content: @justify;
  justify-content: @justify;
  flex-wrap:@flexwrap;
}
.wrapper{
  .flexUi(center);
  position: fixed;
  top: 20%;
  left: 25%;
  z-index: 1;
  width: 50%;
  height: 50%;
  .icon{
    width:100%;
    margin:0 auto;
    img{
      display: block;
      margin:0 auto;
      width:80%;
      height:auto;
    }
  }
  .tips{
    padding:3vw 0;
    width:100%;
    text-align: center;
    color:@6;
    font-size:@f6;
  }
  .btns{
    color:@blue;
    .mr_2{
      margin-right:4vw;
    }
  }
}
.static{
  position: static;
  margin-top: 5vh;
  margin-left: 25vw;
}
</style>
<template>
  <div class="wrapper" style="padding:0;" :class="{'static':position=='static'}">
    <div class="icon">
      <img v-if="iconType==='noStore'" src="../../assets/image/noStore.png"/>
      <img v-else src="../../assets/image/noOrder.png"/>
    </div>
    <div class="tips" v-if="moreTips" >{{moreTips}}</div>
    <div class="tips" v-else>您没有{{tips || '订单'}}哦</div>
    <!-- 注入路由或其他 -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['iconType', 'tips', 'moreTips', 'position']
}
</script>
