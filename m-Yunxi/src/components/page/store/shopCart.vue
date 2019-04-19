/*
 * @Author: 黄智强
 * @Date: 2018-05-08 09:32:54
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-12-12 16:01:28
 * @说明：购物车页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.all {
  margin-bottom: calc(~"6vw + 45px + 20px");
  margin-bottom: -webkit-calc(~"6vw + 45px + 20px");
  font-size: @f7;
  .kuang {
    .flexUi(center);
    position: absolute;
    left: 6vw;
    width: 5vw;
    height: 5vw;
    border: 1px solid #ccc;
    border-radius: 2px;
    .iconfont {
      font-size: @f6;
      color: #fff;
    }
    .half {
      width: 70%;
      height: 0.8vw;
      border-radius: 2px;
      background-color: #fff;
    }
  }
  .kuangChoosed {
    border-color: #5fb878;
    background-color: #5fb878;
  }
  // 购物车商品
  .cart {
    margin-bottom: 10px;
    color: @3;
    border-top: 1px solid #ccc;
    background-color: #fff;
    .cart_title {
      .flexUi(space-between,center);
      padding: 3vw 4vw 3vw 15vw;
      position: relative;
      .cart_content{
        .flexUi(flex-start,center);
        .company {
          .fullname{
            max-width:55vw;
          }
          font-size: @f7;
          .host{
            font-size: @f6;
            color: @6;
            line-height: 180%;
          }
        }
      }
      .addStore{
        // align-self: flex-end;
        .flexUi(flex-end,center);
        color: #1a97e3;
        font-size: 0.7rem;
        line-height: 100%;
        .icon .add{
          fill:#1a97e3;
        }
      }
      .edit {
        position: absolute;
        right: 4vw;
        font-size: @f6;
      }
    }
    .store {
      .flexUi;
      position: relative;
      padding: 3vw 4vw 3vw 10vw;
      margin-left: 6vw;
      border-top: 1px solid #ccc;
      .kuang {
        left: 0;
      }
      .right {
        flex: 1;
        & > div {
          .flexUi(space-between);
        }
        .price {
          color: @3;
          font-size:@f7;
        }
        .bottom {
          margin-top: 2vw;
          font-size: @f6;
          .red{
            max-width:50vw;
          }
        }
      }
    }
  }
  // 结算
  .checkOrder{
    .flexUi(space-between);
    position: fixed;
    left: 0;
    bottom:15vw;
    width: 100%;
    padding: 2vw 4vw 2vw 14vw;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 5px #888888;
    .deleteStore{
      .flexUi;
      color:#e52e2e;
      i{
        font-size:@f9;
        margin-right:0.4vw;
      }
    }
    .total {
      text-align: right;
      .totalText {
        color: @6;
        font-size: @f6;
      }
      .totalPrice {
        color: @red;
        font-size: @f8;
      }
      .blue {
        margin-top: 1vw;
      }
    }
  }
}
</style>
<template>
  <div class="all">
    <!-- 购物车商品 -->
    <template v-if="shopcarObj && shopcarObj.length">
      <div class="cart" v-for="(i,iIndex) in shopcarObj" :key="iIndex">
        <!-- 公司名、域名 -->
        <div class="cart_title">
          <div class="cart_content">
            <div class="kuang" :class="{kuangChoosed:i.choosed||i.halfChoosed}" @click="companyChooseFun(i)">
              <i class="iconfont icon-gouxuan" v-show="i.choosed"></i>
              <span class="half" v-show="i.halfChoosed"></span>
            </div>
            <div class="company">
              <p class="fullname">{{i.company}}</p>
              <p class="host">{{i.domain}}.{{threeDomain}}</p>
            </div>
          </div>
          <div class="addStore" @click="addStore(i)">
            <span class="icon"><x-icon type="ios-plus-empty" class="add" size="27"></x-icon></span>添加门店
          </div>
        </div>
        <!-- 门店数据：门店名称、版本、时长、价格、优惠信息 -->
        <div class="store" v-for="j in i.store_list" :key="j.cart_id">
          <div class="kuang" :class="{kuangChoosed:j.is_check}" @click="oneChooseFun(i,j)">
            <i class="iconfont icon-gouxuan" v-show="j.is_check"></i>
          </div>
          <div class="right" @click="editStoreFun(i,j)">
            <div>
              <span>{{j.store_name}}</span>
              <span class="price">{{$f(j.agent_price)}}</span>
            </div>
            <div class="bottom">
              <span class="c9">{{j.product_name}}{{j.duration_name}}</span>
              <span class="red">{{j.activity_content}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 结算 -->
      <div class="checkOrder">
        <div class="kuang" :class="{kuangChoosed:allChoosed||allHalfChoosed}" @click="allChooseFun">
          <i class="iconfont icon-gouxuan" v-show="allChoosed"></i>
          <span class="half" v-show="allHalfChoosed"></span>
        </div>
        <div @click="allChooseFun">全选</div>
        <div @click="batchRemove" v-if="allChoosed || allHalfChoosed" class="deleteStore">
          <i class="iconfont icon-shanchu"></i>
          删除
        </div>
        <div class="total">
          <span class="totalText">总计:</span>
          <span class="totalPrice">{{$f(totalPrice)}}</span>
        </div>
        <x-button v-if="allHalfChoosed || allChoosed" type="primary" @click.native="checkOrder">结算</x-button>
        <x-button v-else plain>结算</x-button>
      </div>
    </template>
    <!-- 没有数据 -->
    <no-data v-else tips="门店" iconType="noStore">
      <span class="blue" style="font-size:0.8rem;" @click="$router.push('store_openStore')">添加门店</span>
    </no-data>
  </div>
</template>
<script>
import { Group, Cell, XButton } from 'vux'
import noData from '@/components/common/noData'
export default {
  components: { Group, Cell, XButton, noData },
  data() {
    return {
      // 请求次数
      requestNum: 0,
      // 购物车商品数据
      shopcarObj: [],
      // 三级域名
      threeDomain: sessionStorage.threeDomain,
      // 是否全选
      allChoosed: false,
      // 是否半选
      allHalfChoosed: false
    }
  },
  computed: {
    // 购物车总价数据
    totalPrice() {
      let sum = 0
      this.shopcarObj.map(({ store_list }) => {
        store_list.map(val => {
          if (val.is_check) sum += parseInt(val.agent_price)
        })
      })
      return sum
    }
  },
  filters: {
    formatMoney(val) {
      val = Number(val).toFixed()
      if (Number(val) > 1) val = val.split('.')[0].replace(/\B(?=(?:\d{3})+$)/g, ',')
      return '¥' + val
    }
  },
  watch: {
    requestNum(val) {
      if (val === 1) this.$loading()
    }
  },
  methods: {
    // 获取购物车数据
    getCartInfo() {
      this.$fetch.getCartInfo().then(({ cart_info }) => {
        cart_info.map(val => {
          val.choosed = val.halfChoosed = false
        })
        this.shopcarObj = cart_info
        this.allChooseFun(true)
        this.requestNum++
      })
    },
    // 全选事件
    allChooseFun(flag) {
      let checked = typeof flag === 'boolean' ? flag : !this.allChoosed
      this.allChoosed = checked
      this.allHalfChoosed = false
      this.shopcarObj.map(val => {
        val.choosed = checked
        val.halfChoosed = false
        val.store_list.map(val2 => (val2.is_check = checked))
      })
    },
    // 一个公司下面的全选事件
    companyChooseFun(i) {
      let checked = !i.choosed
      i.choosed = checked
      i.halfChoosed = false
      i.store_list.map(val => (val.is_check = checked))
      // 联动全选按钮
      this.allChoosed = !this.shopcarObj.find(val => {
        return val.choosed === false
      })
      if (checked) this.allHalfChoosed = !this.allChoosed
      else {
        this.allHalfChoosed = this.shopcarObj.find(val => {
          return val.choosed === true
        })
      }
    },
    // 最里面的一个单选
    oneChooseFun(i, j) {
      let checked = !j.is_check
      j.is_check = checked
      // 联动当前公司全选按钮
      i.choosed = !i.store_list.find(val => {
        return val.is_check === 0 || val.is_check === false
      })
      if (checked) i.halfChoosed = !i.choosed
      else {
        i.halfChoosed = i.store_list.find(val => {
          return val.is_check === true
        })
      }
      // 联动全选按钮
      this.allChoosed = !this.shopcarObj.find(val => {
        return val.choosed === false
      })
      if (checked) this.allHalfChoosed = !this.allChoosed
      else {
        this.allHalfChoosed = this.shopcarObj.find(val => {
          return val.choosed === true || val.halfChoosed
        })
      }
    },
    // 获取所有选中的cart_id
    getCartId() {
      let cart_id = []
      this.shopcarObj.map(({ store_list }) => {
        store_list.map(j => {
          if (j.is_check) cart_id.push(j.cart_id)
        })
      })
      return cart_id
    },
    // 添加门店
    addStore(params) {
      let editStore = {
        domain: params.domain,
        company: params.company,
        short_name: params.short_name,
        store_list: [],
        source: ''
      }
      if (sessionStorage.editStore) delete sessionStorage.editStore
      sessionStorage.editStore = JSON.stringify(editStore)
      this.$router.push('store_openStore')
    },
    // 编辑一个门店
    editStoreFun({ domain, company, company_id, short_name }, j) {
      let editStore = { domain, company, company_id, short_name, store_list: [j], source: 'shopCart' }
      sessionStorage.editStore = JSON.stringify(editStore)
      this.$router.push('store_openStore')
    },
    // 执行批量删除事件
    batchRemove() {
      let cart_id = this.getCartId()
      if (!cart_id.length) {
        this.$toast('请先勾选要删除的门店！')
        return false
      }
      this.$loading('正在删除...')
      this.$fetch.batchRemove({ cart_id }).then(() => {
        this.$loading()
        this.getCartInfo()
      })
    },
    // 结算
    checkOrder() {
      this.$loading('正在结算...')
      let cart_id = this.getCartId()
      this.$fetch.settlement({ cart_id }).then(() => {
        this.$loading()
        this.$router.push('store_checkOrder')
      })
    }
  },
  activated() {
    this.$loading('加载购物车...')
    this.getCartInfo()
  },
  deactivated() {
    this.requestNum = 0
  }
}
</script>
