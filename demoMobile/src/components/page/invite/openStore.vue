/*
* @Author: 陈航
* @Date: 2018-12-14 15:41:47
* @Last Modified by: 陈航
* @说明：这是开店页面
*/
<style scoped lang='less'>
@themeColor: #1a97e3;
@fadeColor: #999;
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
// 加载图标
.mySpinnerLoader(@rgba:rgba(26, 151, 227, 0.8),@size:0.1rem){
  width: @size;
  height: @size;
  -moz-animation: mySpinnerLoader 1500ms infinite linear;
  -webkit-animation: mySpinnerLoader 1500ms infinite linear;
  animation: mySpinnerLoader 1500ms infinite linear;
  -moz-border-radius: 0.5*@size;
  -webkit-border-radius: 0.5*@size;
  border-radius: 0.5*@size;
  -moz-box-shadow: @rgba 1.5*@size 0 0 0, @rgba 1.1*@size 1.1*@size 0 0, @rgba 0 1.5*@size 0 0, @rgba -1.1*@size 1.1*@size 0 0, @rgba -1.5*@size 0 0 0, @rgba -1.1*@size -1.1*@size 0 0, @rgba 0 -1.5*@size 0 0, @rgba 1.1*@size -1.1*@size 0 0;
  -webkit-box-shadow: @rgba 1.5*@size 0 0 0, @rgba 1.1*@size 1.1*@size 0 0, @rgba 0 1.5*@size 0 0, @rgba -1.1*@size 1.1*@size 0 0, @rgba -1.5*@size 0 0 0, @rgba -1.1*@size -1.1*@size 0 0, @rgba 0 -1.5*@size 0 0, @rgba 1.1*@size -1.1*@size 0 0;
  box-shadow: @rgba 1.5*@size 0 0 0, @rgba 1.1*@size 1.1*@size 0 0, @rgba 0 1.5*@size 0 0, @rgba -1.1*@size 1.1*@size 0 0, @rgba -1.5*@size 0 0 0, @rgba -1.1*@size -1.1*@size 0 0, @rgba 0 -1.5*@size 0 0, @rgba 1.1*@size -1.1*@size 0 0;
  display: inline-block;
  font-size: 10px;
  margin: 0;
  overflow: hidden;
  text-indent: 0;
}
@keyframes mySpinnerLoader{
  0% {
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.mainBox {
  min-height: 100vh;
  width:100vw;
  background: url("../../../assets/image/invited_bj.png") no-repeat;
  background-size: 100% 100%;
  .open-store-success-wrapper{
    position:fixed;
    left:0;
    top:50%;
    transform: translateY(-50%);
    width:100vw;
    height:max-content;
    .open-store-success-title{
      margin:0 auto;
      width:max-content;
      p{
        margin:0 auto;
        width:9.4vh;
        height:9.4vh;
        border-radius:50%;
        background-color: #fff;
        i{
          display: block;
          line-height: 10vh;
          text-align: center;
          font-size:1.2rem;
          color:#fd4e4e;
          font-weight:700;
        }
      }
      h4{
        font-size:0.6rem;
        color:#fff;
        line-height: 7.2vh;
        font-weight:700;
      }
    }
    .open-store-success-guide{
      position:relative;
      margin:3vh auto 0;
      width:83.5vw;
      height:110vw;
      background: url("../../../assets/image/invited_ok_box.png") no-repeat;
      background-size: cover;
      background-size: 100% 100%;
      text-align: center;
      // 开店成功
      .guide-store{
        padding-top:4.6vw;
        line-height: 21.7vw;
        font-size:0.7rem;
        color:#458bf5;
        font-weight:700;
      }
      .guide-website{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        margin:0 auto;
        padding:2vw;
        width:70vw;
        line-height: 5vw;
        font-size:0.4rem;
        font-weight:700;
        color:#458bf5;
        border-radius:0.15rem;
        border:solid 1px #458bf5;
        word-wrap:break-word;
      }
      .guide-tips{
        line-height: 10.9vw;
        color:#666;
        font-size:0.4rem;
      }
      .guide-qrcode-wrapper{
        position: absolute;
        left:0;
        width:100%;
        top:66vw;
        img{
          display: block;
          margin:0 auto;
          border:0;
          width:26vw;
          height:26vw;
        }
        .guide-text-main{
          padding-top:3vw;
          line-height: 180%;
          color:#666;
          font-size:0.45rem;
        }
        .guide-text-sub{
          line-height:100%;
          color:#999;
          font-size:0.4rem;
        }
      }
      // 注册成功
      .guide-register-wrapper{
        padding-top:8vw;
        img{
          display: block;
          margin:0 auto;
          border:0;
          width:32vw;
          height:32vw;
        }
        .guide-text-main{
          padding:3.4vw 0 1.6vw;
          line-height: 100%;
          color:#fd4e4e;
          font-size:0.45rem;
          font-weight:700;
        }
        .guide-text-sub{
          line-height:100%;
          color:#d17070;
          font-size:0.4rem;
        }
      }
      .guide-open-store-wrapper{
        margin-top:13.9vw;
        img{
          display: block;
          margin:0 auto;
          border:0;
          width:44.4vw;
          height:30.9vw;
        }
        p{
          padding-top:3vw;
          line-height: 100%;
          font-size:0.4rem;
          color:#666;
        }
      }
    }
  }
  .title {
    width: 90.7vw;
    height: 14vw;
    margin: 0 auto;
    padding: 10vw 0;
    position: relative;
    text-align: center;
    .cover {
      position: absolute;
      top: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0);
    }
    .activity-img {
      width: 50vw;
    }
  }
  .formBox {
    width: 74vw;
    height: auto;
    margin: 0 auto;
    font-size:@f6;
    .layui-form-item {
      // .flexUi;
      margin-bottom: 7vw;
      width: 74vw;
      height:max-content!important;
      .layui-form-label {
        display: block;
        width: 74vw;
        text-align: left;
        padding: 0;
        line-height:100%;
        margin-bottom: 3vw;
        color: #000;
      }
      .layui-input-block {
        margin-left: 0;
        position: relative;
        width: 74vw;
        height:10vw;
        background-color:#FFF;
        border-radius: 1vw;
        overflow: hidden;
        .layui-input {
          background-color:none!important;
          border:0;
          outline:none;
          appearance:none;
          width: 64vw;
          font-size:@f6;
          padding-left:5vw;
          line-height:10vw;
        }
        i.icon-bianji{
          width:8vw;
          line-height:10vw;
          text-align: center;
          color:#FF0E0E;
          font-size:@f8;
          cursor: pointer;
        }
      }
      .layui-input-block.input{
        .flexUi;
      }
    }
    .product-wrapper{
      // .flexUi;
      // align-items: flex-start;
      margin-bottom: 4vw;
      width: 74vw;
      height:max-content!important;
      .layui-form-label {
        margin-bottom: 3vw;
        display: block;
        text-align: left;
        padding: 0;
        line-height:100%;
        color: #000;
      }
      ul {
        .flexUi;
        flex-wrap:wrap;
        height:max-content;
        width:74vw;
        user-select: none;
        li {
          box-sizing:border-box;
          margin-right: 3vw;
          margin-bottom: 3vw;
          .flexUi;
          flex-shrink: 0;
          width: 35.5vw;
          height: 10vw;
          text-align: center;
          border: 2px solid #fff;
          border-radius: 1vw;
          background-color: #fff;
          cursor: pointer;
          p{
            width:100%;
            text-align: center;
          }
          &:hover {
            border-color: #FF0E0E;
          }
          &:last-child {
            margin-right: 0;
          }
          &:nth-child(2n){
             margin-right: 0;
          }
        }
        .liChoosed {
          position: relative;
          border-color: #FF0E0E;
          .gou {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 0;
            height: 0;
            border-bottom: 24px solid #FF0E0E;
            border-left: 24px solid transparent;
            .icon-gouxuan {
              position: absolute;
              top: 9px;
              right: -1px;
              height: 20px;
              line-height: 20px;
              font-size: 16px;
              color: #fff;
            }
          }
        }
      }
    }
    .function-compare{
      width:100%;
      p{
        color: #a41a1a;
        span{
          margin-left:2vw;
          color:#fff;
        }
      }
    }
    .freeget {
      width: 74vw;
      height: 10vw;
      margin: 5vw auto 5vw;
      .button {
        width: 100%;
        height: 10vw;
        text-align: center;
        line-height: 10vw;
        background-color: #fff;
        font-size: @f7;
        border: 0;
        border-radius: 1vw;
        color: #FF0E0E;
      }
      .openstore{
        margin:0 auto;
        width:100%;
        .center{
          .flexUi;
          margin:0 auto;
          width:max-content;
          transform: translateX(-.5rem);
          p{
            width:3*@f8;
            text-align:center;
          }
          .register-loading{
            margin-top:-0.1rem!important;
            .mySpinnerLoader(rgba(255,14,14,0.8), 0.15rem);
          }
        }
      }
    }
    .tips {
      width:74vw;
      font-size: @f5;
      color: #fff;
    }
  }
  /* 进度条 */
  .progress {
    position: relative;
    width: 10rem;
    height: 1.2rem;
    margin: 0 auto;
    background: url('../../../assets/image/progressbg1.png') no-repeat;
    background-size: 100% 100%;
    top: 40%;
    .progressBar {
      position: absolute;
      top: -5px;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 9rem;
      height: 0.34rem;
      background-color: #fff;
      border-radius: 100px;
      .progressbarlen {
        position: absolute;
        top: 0;
        left: 0;
        height: 0.34rem;
        line-height: 0.34rem;
        text-align: right;
        font-size: 0.6em;
        color: #fff;
        background-color: #fc4f4f;
        background-size: cover;
        border-radius: 100px;
        .progressbarlen span {
          margin-right: 5px;
          font-size: 0.6em;
        }
      }
    }
  }
  /* 弹窗 */
  .popupCover {
    justify-content: center;
    -webkit-justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 100;
    .popup {
      position: relative;
      width: 9.4rem;
      height: 6.6rem;
      background: url('../../../assets/image/openFamily1.png');
      background-size: cover;
      border-radius: 5px;
      top: 5.5rem;
      left: 0.7rem;
      .domain {
        position: absolute;
        top: 3.2rem;
        left: 0;
        right: 0;
        width: 60%;
        text-align: center;
        padding: 0.2rem 0;
        margin: auto;
        color: #fc4f4f;
        border: 1px solid #fc4f4f;
        border-radius: 5px;
      }
      .button{
        position: absolute;
        top: 5rem;
        left: 0;
        right: 0;
        width: 40%;
        text-align: center;
        padding: 0.2rem 0;
        margin: auto;
        color: #fff;
        border: none;
        background-color: #fc4f4f;
        background-size: cover;
        border-radius: 5px;
      }
    }
  }
  // 没有体验券提示框
  .exchangeTitle {
    width: 9.8rem;
    height: 3rem;
    margin: 0 auto;
    padding: 40px 0 40px 0;
    position: relative;
    text-align: center;
    .cover {
      position: absolute;
      top: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0);
    }
    .activity-img {
      width: 9rem;
    }
  }
  .exchangeWarp {
    position: relative;
    margin: 0 auto;
    width: 10.6rem;
    height: 10.9rem;
    background: url('../../../assets/image/invited_box.png') no-repeat center;
    background-size: cover;
    .complete {
      position: absolute;
      top: 54%;
      left: 0;
      right: 0;
      margin: auto;
      width: 2.7rem;
      line-height: 2.7rem;
      text-align: center;
      font-size: 1.2em;
      background: url('../../../assets/image/invited_btn.png');
      background-size: contain;
      cursor: pointer;
      color: #fff;
      border: none;
      img {
        width: 40%;
        margin-left: 5px;
      }
    }
    // 没有体验券提示框
    .completeBox {
      width: 9rem;
      margin: 0 auto;
      padding-top: 20px;
      text-align: center;
      .title {
        height: auto;
        font-size: 18px;
        color: #FF0E0E;
        padding: 20px 0 10px 0;
      }
      .subTitle {
        height: auto;
        color: #999;
      }
      .content {
        margin-top: 20px;
        .url{
          color: #FF0E0E;
        }
      }
    }
  }
  .function-compare-content-mask{
    position: fixed;
    top:0;
    left:0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-bottom: 12vw;
    width:100vw;
    height:100vh;
    background-color: #fd4e4e;
    .content{
      margin: 5vw auto 0;
      width:90vw;
      height: -webkit-calc(~'100vh - 33vw');
      height: calc(~'100vh - 33vw');
      background-color: #ffefef;
      border-radius:1.2vw;
      padding-bottom:11vw;
      .swiper-wrapper{
        display:block!important;
        width:100%;
        height:max-content;
      }
      ul{
        .flexUi(space-between);
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width:90vw;
        padding: 1vw 0;
        line-height: 9vw;
        font-size: 0.6rem;
        border-bottom:solid 1px #d8d2d2;
        li{
          .icon-gou{
            color:#0da4ea;
            font-size: 0.7rem;
          }
          .icon-cha1{
            color:#cbc2c2;
            font-size: 0.6rem;
          }
        }
        li:nth-child(3n-2){
          .flexUi;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width:54vw;
          padding-left: 4vw;
          p{
            max-width: 54vw;
            line-height: 150%;
          }
        }
        li:nth-child(3n-1){
          text-align: center;
          width:16vw;
        }
        li:nth-child(3n){
          padding-left: calc(~'12vw - 1.8rem');
          padding-right: 4vw;
          width:1.8rem;
          text-align: center;
        }
        &.head{
          background-color: #efdfdf;
          font-weight:700;
          li.right{
            padding-left: 0;
            padding-right: 4vw;
            width:12vw;
            text-align: right;
          }
        }
        &.sub-menu{
          font-size: 0.55rem;
          li:nth-child(3n-2){
            padding-left: 6vw;
          }
        }
      }
    }
    .back-to-open-store{
      position: fixed;
      bottom:0;
      left:0;
      width:100vw;
      height:12vw;
      line-height: 12vw;
      text-align: center;
      color:#fd4e4e;
      font-size: @f7;
      background-color: #fff;
    }
  }
}
</style>
<template>
  <div class="mainBox" v-if="packages.length">
    <template v-if="isOpenStore && !progressbarStatus">
      <div class="open-store-success-wrapper">
        <div class="open-store-success-title">
          <p><i class="iconfont icon-gouxuan"></i></p>
          <h4>恭喜您！开店成功</h4>
        </div>
        <div class="open-store-success-guide">
          <h4 class="guide-store">门店网址</h4>
          <p v-if="domain" class="guide-website" @click="copyUrl(domain)">{{domain}}</p>
          <p class="guide-tips">请记得收藏地址，到电脑上查看您的门店</p>
          <div class="guide-qrcode-wrapper">
            <img class="guide-qrcode" src="@/assets/image/public_address_qrcode.png"/>
            <template v-if="isWxBrowser">
              <p class="guide-text-main">长按关注公众号</p>
              <p class="guide-text-sub">关注后可获得更多优惠信息</p>
            </template>
            <template v-else>
              <p class="guide-text-main">长按保存二维码</p>
              <p class="guide-text-sub">关注公众号后可获得更多优惠信息</p>
            </template>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="title">
        <img class="activity-img" src="../../../assets/image/openStore1.png" />
        <div class="cover"></div>
      </div>
      <div class="formBox">
        <form class="layui-form">
          <div class="layui-form-item">
            <label class="layui-form-label">公司名称</label>
            <div class="layui-input-block input">
              <input v-model.trim="formField.company.value" type="text" name="company" :ref="formField.company.ref" placeholder="公司名称" autocomplete="off" class="layui-input" @blur="checkCompany">
              <i class="iconfont icon-bianji" @click="$refs['formField.company'].focus()"></i>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">门店名称</label>
            <div class="layui-input-block input">
              <input v-model.trim="formField.store_name.value" type="text" name="store_name" :ref="formField.store_name.ref" placeholder="门店名称" autocomplete="off" class="layui-input">
              <i class="iconfont icon-bianji" @click="$refs['formField.store_name'].focus()"></i>
            </div>
          </div>
          <div class="product-wrapper">
            <label class="layui-form-label">套餐类型</label>
            <div class="layui-input-block">
              <ul>
                  <li v-for="(i,key) in packages" :key="key" :class="{liChoosed:package_index==key}" @click="package_index=key,productId=i.package_id">
                    <p>{{i.package_name}} {{i.duration}}个月</p>
                    <div class="gou" v-show="package_index==key">
                      <i class="iconfont icon-gouxuan"></i>
                    </div>
                  </li>
                </ul>
            </div>
          </div>
          <div class="function-compare">
            <p>{{productContent}}<span @click="showFunctionCompare=true">套餐功能对比？</span></p>
          </div>
          <div class="freeget">
            <button class="button" ref="openStore" v-show="!btnGrey" type="button" @click="openStoreFun">开 店</button>
            <div class="button openstore" v-show="btnGrey">
              <div class="center">
                <p>开 店</p>
                <span class="register-loading"></span>
              </div>
            </div>
          </div>
          <div class="tips">温馨提示：快速开店将自动匹配使用您领取的套餐体验券，无需再支付额外费用。</div>
        </form>
      </div>
      <!-- 开店成功弹窗 -->
      <div class="popupCover flexUi" v-show="isOpenStore && progressbarStatus">
        <div class="progress" :style="{opacity:tips}" v-if="progressbarStatus">
          <div class="progressBar">
            <div ref="progressbarlen" class="progressbarlen" :style="{width:progressbarlen+'%'}">
              <span>{{progressbarlen}}%</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="function-compare-content-mask" v-show="showFunctionCompare">
      <div class="content swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <ul class="head">
              <li>模块功能</li>
              <li v-for="(i,index) in packageData" :key="index+1" :class="{'right': index === packageData.length - 1}">{{i.package_name}}</li>
            </ul>
            <ul v-for="(m,mIndex) in functionCompareList" :key="mIndex" :class="{'sub-menu': ('function_type' in m)}">
              <template v-if="'function_type' in m" >
                <li>
                  <p>{{m.function_name}}</p>
                  <popover placement="right" style="margin:0 2vw;width:10vw;" v-if="m.function_content">
                    <div slot="content" class="popover-demo-content" style="font-size:0.5rem;padding:1vw;">
                     {{m.function_content}}
                    </div>
                    <i class="iconfont icon-wenhao" style="text-align:center;width:10vw;line-height:9vw;"></i>
                  </popover>
                </li>
                <li v-for="(i,index) in packageData" :key="index+1">
                  <i v-if="m[i.package_code]==1" class="iconfont icon-gou"></i>
                  <i v-else class="iconfont icon-cha1"></i>
                </li>
              </template>
              <template v-else>
                <li>
                  <p>{{m.module_name}}</p>
                  <popover placement="right" style="margin:0 2vw;width:10vw;" v-if="m.module_content">
                    <div slot="content" class="popover-demo-content" style="font-size:0.5rem;padding:1vw;">
                     {{m.module_content}}
                    </div>
                    <i class="iconfont icon-wenhao" style="text-align:center;width:10vw;line-height:9vw;"></i>
                  </popover>
                </li>
                <li v-for="(i,index) in packageData" :key="index+1">
                  <i v-if="m[i.package_code]==1" class="iconfont icon-gou"></i>
                  <i v-else class="iconfont icon-cha1"></i>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
      <div class="back-to-open-store" @click="showFunctionCompare=false">
        返回开店
      </div>
    </div>
  </div>
  <div class="mainBox" v-else>
    <div class="open-store-success-wrapper">
      <div class="open-store-success-title">
        <p><i class="iconfont icon-gouxuan"></i></p>
        <h4>恭喜您！注册成功</h4>
      </div>
      <div class="open-store-success-guide">
        <div class="guide-register-wrapper">
          <img class="guide-qrcode" src="@/assets/image/public_address_qrcode.png"/>
          <template v-if="isWxBrowser">
            <p class="guide-text-main">长按关注公众号开店</p>
            <p class="guide-text-sub">关注后可获得更多优惠信息</p>
          </template>
          <template v-else>
            <p class="guide-text-main">长按保存二维码</p>
            <p class="guide-text-sub">关注公众号后可获得更多优惠信息</p>
          </template>
        </div>
        <div class="guide-open-store-wrapper">
          <img src="@/assets/image/public_address_guide.png"/>
          <p>关注公众号点击“会员中心 — 我要开店”</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Popover } from 'vux'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  components: { Popover },
  data() {
    return {
      // 注册按钮是否变灰
      btnGrey: false,
      // 判断客户端类型：true为手机端，false为PC端
      flag: true,
      // 套餐id
      productId: '',
      // 套餐版本
      productList: [],
      // 是否显示功能对比
      showFunctionCompare: false,
      // 功能对比
      functionCompareList: [],
      // 版本
      packageData: [],
      // 套餐列表
      packages: [],
      // 默认套餐
      package_index: 0,
      // 进度条 进度
      progressbarlen: 10,
      // 是否显示开店进度提示
      tips: 0,
      // 是否显示进度条
      progressbarStatus: false,
      // 是否显示正在开店或开店成功
      isOpenStore: false,
      // 开店成功域名
      domain: '',
      // 域名
      website_domain: '',
      // 是否是微信
      isWxBrowser: false,
      // 表单数据
      formField: {
        company: {
          required: true,
          value: '',
          ref: 'formField.company',
          pattern: ['CN_EN_NU'],
          errMsg: ['请填写', '公司名称', '只能由中文、英文或数字组成']
        },
        store_name: {
          required: true,
          value: '总店',
          ref: 'formField.store_name',
          pattern: ['CN_EN_NU'],
          errMsg: ['请填写', '门店名称', '只能由中文、英文或数字组成']
        }
      }
    }
  },
  computed: {
    productContent() {
      let ret = ''
      if (this.productList && this.productList.length) {
        ret = this.productList.filter(item => (Number(item.product_id) === Number(this.productId)))[0].content
      }
      return ret
    }
  },
  methods: {
    // 数据初始化
    initData() {
      this.packages = []
      this.productId = ''
      this.productList = []
      this.functionCompareList = []
      this.packageData = []
      this.showFunctionCompare = false
      this.btnGrey = false
      this.package_index = 0
      this.progressbarlen = 10
      this.tips = 0
      this.progressbarStatus = false
      this.isOpenStore = false
      this.domain = ''
      this.website_domain = ''
      if (sessionStorage.company) this.formField.company.value = sessionStorage.company
      else this.formField.company.value = ''
    },
    // 复制链接
    copyUrl(url) {
      if (document.execCommand('copy')) {
        let input = document.createElement('input')
        input.style.position = 'fixed'
        input.style.opacity = '0'
        document.body.appendChild(input)
        input.setAttribute('value', url)
        input.select()
        document.execCommand('copy')
        this.$toast('复制成功')
      }
    },
    // 验证公司名称是否重复
    checkCompany() {
      if (this.formField.company.value) {
        this.$fetch.couponCheckCompany({ company: this.formField.company.value }).catch(msg => {
          this.$toast('公司名称已存在')
          this.$refs[this.formField.company.ref].focus()
        })
      }
    },
    // 套餐版本
    getProduct() {
      this.$fetch.getProduct().then(data => {
        this.productList = data
      })
    },
    // 功能对比
    productPackageCompareList() {
      this.$fetch.packageCompare().then(data => {
        let { modules, functions } = data
        this.packageData = data.package
        functions.map(_val => {
          modules.map(val => {
            if (_val.product_module_id === val.product_module_id && _val.function_type === 0) {
              this.packageData.map(_vals => (_val[_vals.package_code] = val[_vals.package_code]))
            }
          })
        })
        functions.map(_val => {
          let _index = modules.findIndex(val => {
            return _val.product_module_id === val.product_module_id
          })
          if (_index === -1) modules.push(_val)
          else modules.splice(_index + 1, 0, _val)
        })
        this.functionCompareList = modules
        this.$nextTick(() => {
          // 滑动插件
          let _dom = document.querySelector('.swiper-wrapper')
          if (_dom) {
            let timer = setInterval(() => {
              let _height = _dom.offsetHeight || 0
              if (_height > 0) {
                clearInterval(timer)
                let mySwiper = new Swiper('.swiper-container', {
                  direction: 'vertical',
                  slidesPerView: 'auto',
                  freeMode: true,
                  mousewheel: true
                })
                console.log(mySwiper)
              }
            }, 100)
          }
        })
      })
    },
    // 显示进度条进度
    showProgressBar(tenant_id) {
      this.isOpenStore = true
      this.progressbarStatus = true
      this.$fetch.couponOpenStoreStatus({ tenant_id }).then(data => {
        if (data.status) {
          this.progressbarlen = 100
          this.progressbarStatus = false
          this.domain = data.domain
          this.btnGrey = false
        } else {
          setTimeout(() => {
            if (this.progressbarlen > 90) this.progressbarlen = 99
            else this.progressbarlen += parseInt(Math.random() * 10)
            this.showProgressBar(tenant_id)
          }, 3000)
        }
      })
    },
    // 表单提交事件
    openStoreFun() {
      let result = this.$formValidate(this.formField)
      if (!result) {
        return false
      }
      this.btnGrey = true
      let stores = []
      stores.push(this.packages[this.package_index])
      this.$fetch.couponCheckCompany({ company: result.company }).then(data => {
        this.$fetch.couponOpenStore({ company: result.company, stores: stores }).then(({ tenant_id }) => {
          // 使用过的券删除
          let _packages = this.packages.map(item => item)
          _packages.splice(this.package_index, 1)
          sessionStorage.activityInfo = JSON.stringify(_packages)
          document.body.scrollTop = 0
          this.tips = 1
          this.showProgressBar(tenant_id)
        }).catch(msg => {
          this.$toast(msg)
          this.btnGrey = false
        })
      }).catch(msg => {
        this.$toast('公司名称已存在')
        this.$refs[this.formField.company.ref].focus()
        this.btnGrey = false
      })
    },
    getTenantStore() {
      let activityInfo = JSON.parse(sessionStorage.activityInfo)
      let activity_id = sessionStorage.picked_activity_id || ''
      let packages = []
      if (activityInfo && activityInfo.length) {
        this.productId = activityInfo[0].package_id
        activityInfo.map(val => {
          if (val.activity_type_code === 'trial') {
            if (activity_id && Number(activity_id) === Number(val.activity_id)) {
              this.package_index = packages.length
              this.productId = val.package_id
            }
            let store_name = '总店'
            packages.push({
              store_name,
              duration: val.month,
              product_id: val.package_id,
              package_name: val.package_name,
              activity_id: val.activity_id,
              activity_card_id: val.activity_card_id,
              package_id: val.package_id
            })
          }
        })
      }
      this.packages = packages
    }
  },
  activated() {
    this.initData()
    if (sessionStorage.loginInfo) this.website_domain = JSON.parse(sessionStorage.loginInfo).website_domain
    if (sessionStorage.activityInfo) this.getTenantStore()
    else this.$router.go(-1)
    // true为手机端，false为PC端
    this.flag = window._isMobilePlatform
    if (!this.flag) {
      this.$router.push('/')
    }
    // 是否是微信浏览器
    this.isWxBrowser = window._isWxPlatform
    this.getProduct()
    this.productPackageCompareList()
  }
}
</script>
