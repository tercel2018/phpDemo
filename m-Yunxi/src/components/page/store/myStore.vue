/*
 * @Author: 陈航
 * @Date: 2018-09-05 09:32:54
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-04-11 09:36:20
 * @说明：我的门店
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.all {
  padding-top: calc(~"12vw + 44px");
  padding-top: -webkit-calc(~"12vw + 44px");
  margin-bottom: calc(~"53px + 20px");
  margin-bottom: -webkit-calc(~"53px + 20px");
  font-size: @f7;
  .vux-search-fixed-wrapper {
    position: fixed;
    top: 12vw;
    left: 0;
    width: 100%;
    height: 44px;
    z-index: 899;
    background-color: #efeff4;
  }
  // 门店统计
  .storeStatistical {
    margin: 4vw 0;
    background-color: #fff;
    font-size: @f8;
    .num {
      margin-left: 3vw;
      padding-bottom: 3vw;
      .word {
        font-size: @f5;
        margin-left: 3vw;
        span {
          color: @blue;
          font-size: @f6;
          padding: 0 2px;
        }
      }
    }
  }
  .myStore_title {
    position: relative;
    padding: 3vw 4vw 0 0;
    margin-left: 6vw;
    .flexUi(space-between);
    .company {
      border-left: solid 4px @blue;
      padding-left: 2vw;
      max-width: 60vw;
    }
    .openStore {
      color: @blue;
      font-size: @f7;
      .icon {
        display: inline-block;
        vertical-align: middle;
        .add {
          fill: @blue;
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
    .myStore_statis {
      margin-left: 6vw;
      padding-bottom: 2vw;
      .domain {
        color: @6;
        font-size: @f6;
      }
      .statis {
        padding-top: 2vw;
        color: @3;
        font-size: @f5;
        span {
          color: @blue;
          font-size: @f6;
          padding: 0 2px;
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
          font-size: @f5;
          .btn {
            padding: 2vw 4vw;
            color: #fff;
            margin-left: 2vw;
            border-radius: 3px;
            line-height: 100%;
          }
          .blue {
            background-color: @blue;
          }
          .orange {
            background-color: @orange;
          }
          .grey {
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
  <div class="all">
    <!-- 头部导航 -->
    <header-basic title="我的门店"></header-basic>
    <!-- 搜索门店 -->
    <div class="vux-search-fixed-wrapper">
      <search placeholder="输入门店名称"
              v-model="store_name"
              @on-submit="searchStore"
              @on-blur="searchStore"
              @on-clear="searchStore"
              ref="search"></search>
    </div>
    <template v-if="storeList && storeList.length">
      <!-- 我的门店 -->
      <div class="storeStatistical">
        <div class="myStore_title">
          <p class="company">我的门店</p>
          <p class="openStore"
             @click="newStore"><span class="icon">
              <x-icon type="ios-plus-empty"
                      class="add"
                      size="27"></x-icon>
            </span>新开门店</p>
        </div>
        <p class="num"><span class="word">共计<span>{{storeStatistical.storeCount}}</span>家门店，即将到期<span>{{storeStatistical.nearExpireCount}}</span>家，已到期<span>{{storeStatistical.expireCount}}</span>家</span></p>
      </div>
      <div class="myStore"
           v-for="(i,iIndex) in storeList"
           :key="iIndex">
        <!-- 公司名、域名 -->
        <div class="myStore_title">
          <p class="company">{{i.company_name}}</p>
          <p class="openStore"
             @click="addStore(i)"><span class="icon">
              <x-icon type="ios-plus-empty"
                      class="add"
                      size="27"></x-icon>
            </span>添加门店</p>
        </div>
        <div class="myStore_statis">
          <p class="domain">{{i.domain}}.{{threeDomain}}</p>
          <p class="statis">共计<span>{{i.store_count}}</span>家门店，即将到期<span>{{i.near_expire_count}}</span>家，已到期<span>{{i.expire_count}}</span>家</p>
        </div>
        <!-- 门店数据：门店名称、版本、时长、价格、优惠信息 -->
        <div class="store"
             v-for="j in i.store_list"
             :key="j.cart_id">
          <div class="right">
            <div>
              <span class="store_name">{{j.store_name}}<span class="blue"
                      style="font-size:0.5rem"
                      v-if="Number(j.status)===0">({{j.status_text}})</span></span>
              <p class="status"
                 v-if="Number(j.status) !== 0">
                <span :ref="i.company_id+j.store_id+'R'"
                      class="blue btn"
                      @click="storeFun(j,'recharge')">续费</span>
                <span v-if="j.is_expire"
                      class="grey btn"
                      @click="toastMsg('请先续费')">升级</span>
                <span v-else-if="j.is_top_package===1"
                      class="grey btn"
                      @click="toastMsg('您已是最高级别了')">不可升级</span>
                <span :ref="i.company_id+j.store_id+'U'"
                      class="orange btn"
                      v-else
                      @click="storeFun(j,'upgrade')">升级</span>
              </p>
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
    <no-data v-else
             :moreTips="moreTips"
             iconType="noStore"
             position="static">
      <span class="blue"
            style="font-size:0.8rem;"
            @click="$router.push('store_openStore')">添加门店</span>
    </no-data>
  </div>
</template>
<script>
import { Cell, Search } from 'vux'
import noData from '@/components/common/noData'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { Cell, Search, noData, headerBasic },
  data () {
    return {
      // 版本<option>循环数据
      productOP: [],
      // 门店数据列表
      storeList: [],
      // 三级域名
      threeDomain: sessionStorage.threeDomain,
      // 门店详情
      storeInfo: null,
      // 当前门店公司信息
      companyInfo: null,
      // 门店名称
      store_name: '',
      // 门店统计
      storeStatistical: {},
      // 没有
      moreTips: '您没有门店哦'
    }
  },
  methods: {
    // 获取门店信息
    getStore (type, params) {
      if (type === 2) {
        this.$loading('搜索门店...')
        this.moreTips = '没有找到符合条件的门店！'
      } else {
        this.moreTips = '您没有门店哦'
      }
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
    getStoreStatistical (storeCount, nearExpireCount, expireCount) {
      this.storeStatistical = { storeCount, nearExpireCount, expireCount }
    },
    // 获取版本信息
    getProduct () {
      this.$fetch.getProduct().then(data => {
        this.productOP = data
      })
    },
    // 搜索
    searchStore () {
      this.$nextTick(() => {
        let params = this.store_name === '' ? null : ('&store_name=' + this.store_name)
        this.getStore(2, params)
      })
    },
    // 新开门店
    newStore () {
      delete sessionStorage.editStore
      this.$router.push('store_openStore')
    },
    // 添加门店
    addStore (params) {
      let editStore = {
        domain: params.domain,
        company: params.company_name,
        short_name: params.short_name,
        store_list: [],
        source: 'myStore'
      }
      if (sessionStorage.editStore) delete sessionStorage.editStore
      sessionStorage.editStore = JSON.stringify(editStore)
      this.$router.push('store_openStore')
    },
    // 续费升级
    storeFun (opt, flag) {
      if (opt.is_on_sale) {
        sessionStorage.storeInfo = JSON.stringify(opt)
        if (flag === 'upgrade') this.$router.push('store_upgrade')
        else this.$router.push('store_recharge')
      } else this.$toast('抱歉，您当前的套餐已不可购买，无法升级或续费')
    },
    // 续费升级提示
    toastMsg (msg) {
      this.$toast(msg)
    },
    // 获取用户信息
    getUserInfo () {
      this.$fetch.getUserInfo().then(data => {
        // 更新用户角色
        this.$store.dispatch('CHANGE_USER_ROLE', data.user_role)
        // 用户折扣
        sessionStorage.discount = data.discount
        // 图片域名
        sessionStorage.uploadHost = data.host
        // 前台域名
        sessionStorage.agentHost = data.agent_host
        // 三级域名
        sessionStorage.threeDomain = data.member_domain
        // 是否设置了支付密码
        sessionStorage.isExist = data.pay_password
        // 是否认证成功
        sessionStorage.is_auth = data.is_auth
        // 用户登录手机号码
        sessionStorage.user_mobile = data.user_mobile
        // 会员剩余金额 user_money
        sessionStorage.user_money = data.user_money
        // 会员等级名称  rank_name
        sessionStorage.rank_name = data.rank_name
        // 会员等级头像 rank_image
        sessionStorage.rank_image = data.rank_image
        // 会员等级 user_rank
        sessionStorage.user_rank = data.user_rank
        // user_role
        sessionStorage.user_role = data.user_role
        // user_type
        sessionStorage.user_type = data.user_type
        // 是否为已认证的代理商
        sessionStorage.realyAgent = data.is_auth === 1 && data.user_role === 11 ? '1' : ''
        // 是否显示设置密码引导
        sessionStorage.alert_set_password = data.alert_set_password
        // 是否设置支付密码
        sessionStorage.set_pay_password = data.pay_password === 0 ? '' : '1'
        // 前台域名
        sessionStorage.website_domain = data.website_domain
      }).catch(err => console.log('getUserInfo => errMsg:', err))
    }
  },
  created () {
    this.getUserInfo()
  },
  activated () {
    this.$loading('加载我的门店...')
    this.getStore(1)
  }
}
</script>
