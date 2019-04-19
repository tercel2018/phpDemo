/*
 * @Author: 黄智强
 * @Date: 2018-05-05 11:29:07
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-12-04 18:08:38
 * @说明：登录成功后，进入系统的统一入口
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.main{
  min-height:calc(~'100vh - 15vw');
  padding-bottom:15vw;
  -webkit-overflow-scrolling: touch;
  overflow:auto;
  &:after{
    content:'';
    position:fixed;
    top:100vh;
    left:0;
    width:100%;
    height:100vh;
    background-color: #fff;
  }
  #footerBar{
    position: fixed;
    bottom:0;
    left:0;
    z-index:9;
    box-sizing:border-box;
    box-sizing:-webkit-border-box;
    box-sizing:-moz-border-box;
    height:15vw;
    width:100%;
    border-top:solid 1px #dcdcdc;
    background-color: #fff;
    .footer-bar-list{
      .flexUi(center,space-between);
      li{
        color:@6;
        font-size:@f5;
        width:20%;
        height:100%;
        text-align:center;
        .icon{
          padding-top:1.5vw;
          line-height:6vw;
          i{
            font-size:@f8;
          }
        }
        .name{
          line-height:5vw;
        }
      }
      li.active{
        color:@blue;
      }
    }
  }
}
</style>
<template>
  <div class="main" root-fixed-offset="15vw">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <div id="footerBar" data-fixed-bottom="root">
      <ul class="footer-bar-list">
        <router-link class="footer-bar-item" tag="li" v-for="(i,index) in nav" :key="index" :to="i.link" :class="{'active':$store.state.navIndex===index}">
          <p class="icon"><i :class="'iconfont ' + i.icon"></i></p>
          <p class="name">{{i.name}}</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  components: { Tabbar, TabbarItem },
  data() {
    return {
      nav: [
        {
          name: '首页',
          link: 'index',
          icon: 'icon-shouye'
        },
        {
          name: '我的门店',
          link: 'store_myStore',
          icon: 'icon-mendian'
        },
        {
          name: '购物车',
          link: 'store_shopCart',
          icon: 'icon-gouwuche'
        },
        {
          name: '订单中心',
          link: 'myBuy_orderList',
          icon: 'icon-dingdan'
        },
        // {
        //   name: '我的钱包',
        //   link: 'finance_paymentDetail',
        //   icon: 'icon-qianbao'
        // },
        {
          name: '我的服务',
          link: 'service_myService',
          icon: 'icon-fuwu1'
        }
      ]
    }
  },
  mounted() {
    // document.title = '云玺印用户管理系统'
  }
}
</script>
