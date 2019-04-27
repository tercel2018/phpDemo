/*
 * @Author: 陈航
 * @Date: 2018-12-20 09:34:24
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-20 10:17:04
 * @Desc: 客户门店页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.customer-store-wrapper{
  padding-top:12vw;
  font-size: @f7;
  // 门店统计
  .storeStatistical{
    margin: 4vw 0;
    background-color: #fff;
    font-size:@f8;
    .num{
      margin-left: 3vw;
      padding-bottom:3vw;
      .word{
        font-size:@f5;
        margin-left:3vw;
        span{
          color:@blue;
          font-size: @f6;
          padding:0 2px;
        }
      }
    }
  }
  .myStore_title {
    position: relative;
    padding: 3vw 4vw 0 0;
    margin-left:6vw;
    .flexUi(space-between);
    .company{
      border-left:solid 4px @blue;
      padding-left:2vw;
      max-width:60vw;
    }
    .openStore{
      color:@blue;
      font-size:@f7;
      .icon{
        display:inline-block;
        vertical-align: middle;
        .add{
            fill:@blue;
        }
      }
    }
  }
  // 购物车商品
  .myStore {
    margin-bottom: 4vw;
    color: @3;
    border-top: 1px solid #ccc;
    background-color: #fff;
    .myStore_statis{
      margin-left:6vw;
      padding-bottom: 2vw;
      .domain{
        color: @6;
        font-size: @f6;
      }
      .statis{
        padding-top:2vw;
        color: @3;
        font-size: @f5;
        span{
          color:@blue;
          font-size: @f6;
          padding:0 2px;
        }
      }
    }
    .store {
      .flexUi;
      position: relative;
      padding: 3vw 4vw 3vw 0;
      margin-left: 6vw;
      border-top: 1px solid #ccc;
      .right {
        flex: 1;
        & > div {
          .flexUi(space-between);
        }
        .status {
          color: @3;
          font-size:@f5;
          .btn{
            padding:2vw 4vw;
            color:#fff;
            margin-left:2vw;
            border-radius:3px;
            line-height: 100%;
          }
          .blue{
            background-color: @blue;
          }
          .orange{
            background-color: @orange;
          }
          .grey{
            background-color: @grey;
          }
        }
        .bottom {
          margin-top: 2vw;
          font-size: @f6;
        }
      }
    }
  }
}
</style>
<template>
  <div class="customer-store-wrapper">
    <!-- 头部导航 -->
    <header-basic title="客户门店"></header-basic>
    <!-- 搜索门店 -->
    <template v-if="storeList && storeList.length">
      <!-- 我的门店 -->
      <div class="storeStatistical">
          <div class="myStore_title">
            <p class="company">{{customerName}}</p>
          </div>
          <p class="num"><span class="word">共计<span>{{storeStatistical.storeCount}}</span>家门店，即将到期<span>{{storeStatistical.nearExpireCount}}</span>家，已到期<span>{{storeStatistical.expireCount}}</span>家</span></p>
      </div>
      <div class="myStore" v-for="(i,iIndex) in storeList" :key="iIndex">
        <!-- 公司名、域名 -->
        <div class="myStore_title">
          <p class="company">{{i.company_name}}</p>
        </div>
        <div class="myStore_statis">
          <p class="domain">{{i.domain}}.{{threeDomain}}</p>
          <p class="statis">共计<span>{{i.store_count}}</span>家门店，即将到期<span>{{i.near_expire_count}}</span>家，已到期<span>{{i.expire_count}}</span>家</p>
        </div>
        <!-- 门店数据：门店名称、版本、时长、价格、优惠信息 -->
        <div class="store" v-for="j in i.store_list" :key="j.cart_id">
          <div class="right">
            <div>
              <span class="store_name">{{j.store_name}}</span>
            </div>
            <div class="bottom">
              <span class="c9">{{j.product_name}}{{j.duration_name}}</span>
              <span class="c9">到期时间：{{j.expire_time_format}}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- 没有数据 -->
    <no-data v-else :moreTips="moreTips" iconType="noStore" position="static"></no-data>
  </div>
</template>
<script>
import { Cell } from 'vux'
import noData from '@/components/common/noData'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { Cell, noData, headerBasic },
  data() {
    return {
      // 当前客户
      customerName: '',
      // 门店数据列表
      storeList: [],
      // 三级域名
      threeDomain: sessionStorage.threeDomain,
      // 门店统计
      storeStatistical: {},
      // 没有
      moreTips: '客户没有门店哦'
    }
  },
  methods: {
    // 获取门店信息
    getStore(params) {
      this.$fetch.getStore(params).then(data => {
        let storeCount = 0
        let nearExpireCount = 0
        let expireCount = 0
        // 改造data数据
        data.forEach(item => {
          storeCount = storeCount + item.store_count
          nearExpireCount = nearExpireCount + item.near_expire_count
          expireCount = expireCount + item.expire_count
        })
        this.storeList = data
        this.getStoreStatistical(storeCount, nearExpireCount, expireCount)
        this.$loading()
      }).catch(err => {
        this.$loading()
        console.log('errMsg => ' + err)
      })
    },
    // 门店统计
    getStoreStatistical(storeCount, nearExpireCount, expireCount) {
      this.storeStatistical = { storeCount, nearExpireCount, expireCount }
    }
  },
  activated() {
    this.$loading('加载客户门店...')
    let params = ''
    this.customerName = '客户门店'
    if (sessionStorage.cus_name) {
      this.customerName = sessionStorage.cus_name
    }
    if (this.$route.query.user_id) params += '&user_id=' + this.$route.query.user_id
    if (this.$route.query.agent_user_id) params += '&agent_user_id=' + this.$route.query.agent_user_id
    if (params !== '') this.getStore(params)
    else this.getStore()
  }
}
</script>
