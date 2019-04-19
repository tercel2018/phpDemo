/*
 * @Author: 陈航
 * @Date: 2018-11-07 14:40:55
 * @Last Modified by: 陈航
 * @说明：代理商提升等级页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.rank-wrapper{
  padding-bottom: 4vw;
  min-height: calc(~'100vh - 19vw');
  min-height: -webkit-calc(~'100vh - 19vw');
  background-color: #fff;
  width:100%;
  .rank-head{
    width:100%;
    height:30.6vw;
    background-image:url(../../assets/image/rank-head.png);
    background-size:100% auto;
    background-repeat: no-repeat;
    position: relative;
    h3{
      position: relative;
      width:100%;
      height:14vw;
      i{
        margin:0 5.2vw;
        height:14vw;
        width:max-content;
        line-height: 14vw;
        font-size:@f10;
        color:#fff;
      }
      p{
        position: absolute;
        top:0;
        left:50%;
        width:max-content;
        height:14vw;
        line-height: 14vw;
        text-align: center;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        font-size:@f9;
        color:#fff;
        font-weight: 600;
      }
    }
    img{
      display: block;
      position: absolute;
      bottom:0;
      left:50%;
      transform: translate(-50%,50%);
      -webkit-transform: translate(-50%,40%);
      width:20vw;
      height:20vw;
      border:0;
    }
  }
  .rank-info{
    padding-top: 10vw;
    h4{
      padding:3.2vw 0 2.8vw;
      width:100%;
      line-height: 100%;
      text-align: center;
      font-size:@f8;
      color:#333;
      font-weight: 600;
    }
    p{
      width:80%;
      margin-left:10%;
      line-height: 180%;
      text-align: center;
      font-size:@f6;
      color:#333;
      span{
        color:@blue;
        font-size:@f7;
      }
    }
  }
  .rank-list{
    margin:7.5vw auto 0;
    width: 92.5vw;
    li.rank-item{
      margin-bottom: 4vw;
      padding-top:4vw;
      padding-bottom:5vw;
      width:100%;
      .flexUi(flex-start, flex-start);
      background-image:url(../../assets/image/rank-box.png);
      background-size:100% 100%;
      background-repeat: no-repeat;
      img.rank-item-left{
        display: block;
        margin: 2vw 2vw 0 6vw;
        width:15vw;
        height:15vw;
      }
      .rank-item-right{
        padding-left:4vw;
        .rank-item-right-level{
          padding:2vw 0 4vw;
          line-height: 100%;
          font-size:@f8;
          color:#333;
          font-weight: 600;
        }
        .content{
          font-size:@f6;
          line-height:180%;
        }
        .rank-item-right-rise-rank{
          display: block;
          margin:4vw 0 0;
          width:32vw;
          line-height: 9vw;
          height: 9vw;
          text-align: center;
          font-size:@f6;
          color:#fff;
          background-color: @blue;
          border-radius:4.5vw;
        }
        .noUse{
          background-color: #ddd;
          color:#fff;
        }
      }
    }
    li.rank-item:last-child{
      margin-bottom: 0;
    }
  }
}
</style>
<template>
  <div class="rank-wrapper">
    <div class="rank-head">
      <h3><i class="iconfont icon-zuo" @click="$router.go(-1)"></i><p>我的等级</p></h3>
      <img :src="uploadHost+loginInfo.rank_image"/>
    </div>
    <div class="rank-info">
      <h4>{{loginInfo.rank_name}}</h4>
      <p>折扣：所有产品、服务均{{Number(loginInfo.discount)===100?'':'为'}}
        <span>{{!loginInfo.discount || (Number(loginInfo.discount)===100)?'不打':Number(loginInfo.discount)/10}}折</span>
        （活动期的产品、服务除外）
      </p>
    </div>
    <ul class="rank-list">
      <li class="rank-item" v-for="i in rankList" :key="i.rank_id">
        <img class="rank-item-left" :src="uploadHost+i.image"/>
        <div class="rank-item-right">
          <h4 class="rank-item-right-level">{{i.rank_name}}</h4>
          <div class="content" v-html="$options.filters.remarkHtml(i)"></div>
          <template v-if="loginInfo.user_role == 11">
            <p class="rank-item-right-rise-rank noUse" v-if="i.discount >= loginInfo.discount">马上升级</p>
            <p class="rank-item-right-rise-rank" v-else-if="i.deposit_amount==0" @click="$router.push('/auditProcess')">马上升级</p>
            <p class="rank-item-right-rise-rank" v-else @click="riseRank(i)">马上升级</p>
          </template>
        </div>
      </li>
    </ul>
    <div v-transfer-dom>
      <popup v-model="popupVisible" height="425px" is-transparent>
        <div style="width: 95%;background-color:#fff;height:405px;margin:0 auto;border-radius:5px;padding-top:10px;">
         <group class="vux-group-border-bottom">
          <cell title="当前等级" v-if="loginInfo.rank_name" :value="loginInfo.rank_name"></cell>
          <cell title="升级后等级" v-if="currentRank.rank_name" :value="currentRank.rank_name"></cell>
          <cell title="充值金额" v-if="currentRank.deposit_amount" :value="currentRank.deposit_amount"></cell>
         </group>
         <div style="margin:20px 15px 0;padding:10px 15px;color:#e52e2e;background-color:#fff1f1;font-size:0.5rem;border-radius:1vw;">
          <ul>
            <li>1.充值后的金额可用于平台消费，您可在我的钱包中查看余额。<li>
            <li>2. 充值金额不可用于提现。</li>
            <li>3. 如有疑问请联系客服，客服热线：{{loginInfo.customer_phone?loginInfo.custoner_phone:'0755-36564131'}}。</li>
          </ul>
         </div>
         <div style="padding:20px 15px;">
          <x-button class="vux-xbutton-width-100-percent" type="primary" @click.native="rankPay">立即充值</x-button>
          <x-button class="vux-xbutton-width-100-percent" @click.native="popupVisible = false" style="margin-left:0!important;margin-bottom:0!important;">
            取消
          </x-button>
         </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { TransferDom, Popup, Group, Cell, XButton } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Group,
    Cell,
    XButton
  },
  data() {
    return {
      // 图片前缀
      uploadHost: sessionStorage.uploadHost,
      // 用户信息
      loginInfo: {},
      // 用户等级列表
      rankList: [],
      // 当前要升级的等级
      currentRank: {
        rank_name: '',
        deposit_amount: ''
      },
      // 当前弹窗是否显示
      popupVisible: false
    }
  },
  filters: {
    // 过滤HTML模板样式
    remarkHtml(i) {
      let _i = ''
      if (i && i.remark) {
        _i = i.remark.replace(/(font-size|background-color|line-height|padding|margin|width|height|text-align)[\s:]+[^;]*;/gi, '')
      }
      return _i
    }
  },
  methods: {
    // 获取用户信息
    accountGetUserInfo() {
      this.$fetch.accountGetUserInfo().then(data => {
        this.loginInfo = data
        this.accountGetRankList()
      }).catch(() => {
        this.$loading()
      })
    },
    // 获取用户等级列表
    accountGetRankList() {
      this.$fetch.accountGetRankList('&rank_type=' + this.loginInfo.user_role).then(data => {
        this.$loading()
        this.rankList = data
      }).catch(() => {
        this.$loading()
      })
    },
    // 马上升级
    riseRank(i) {
      this.popupVisible = true
      this.currentRank = i
    },
    // 立即充值
    rankPay() {
      this.popupVisible = false
      let amount = this.currentRank.deposit_amount
      this.$loading('立即充值...')
      this.$fetch.pocketDeposit({ amount: amount }).then(data => {
        sessionStorage.order_sn = data
        sessionStorage.deposit = 'deposit'
        this.$router.push('store_orderPay')
      })
    }
  },
  activated() {
    this.$loading('加载我的等级...')
    this.accountGetUserInfo()
  }
}
</script>
