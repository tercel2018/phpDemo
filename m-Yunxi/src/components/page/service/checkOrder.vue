/*
 * @Author: 陈航
 * @Date: 2018-09-19 13:40:55
 * @Last Modified by: 陈航
 * @说明：服务订单核对页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.all {
  padding-top: calc(~"12vw - 1px");
  padding-top: -webkit-calc(~"12vw - 1px");
  margin-bottom: calc(~"8vw + 69px + 15vw");
  margin-bottom: -webkit-calc(~"8vw + 69px + 15vw");
  font-size: @f7;
  // 购物车商品
  .cart {
    margin-bottom: 10px;
    color: @3;
    .wrapper {
      background-color: #fff;
    }
    .cart_title {
      .flexUi(flex-start, center);
      position: relative;
      padding: 3vw 0;
      margin: 0 4vw;
      .company {
        font-size: @f7;
      }
      .domain {
        margin-left: 3vw;
        color: @6;
        font-size: @f6;
      }
    }
    .store {
      padding: 3vw 0;
      margin: 0 4vw;
      border-top: 1px solid #ccc;
      .right {
        & > div {
          .flexUi(space-between);
        }
        .price {
          font-size: @f7;
        }
        .bottom {
          margin-top: 2vw;
          font-size: @f6;
        }
      }
    }
  }
  // 结算
  .settlement {
    .flexUi(space-between);
    position: fixed;
    left: 0;
    bottom: 15vw;
    width: 100%;
    // padding: 4vw 4vw 4vw 12vw;
    padding: 3vw;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 5px #888888;
    .kuang {
      .flexUi(center);
      position: absolute;
      left: 4vw;
      width: 6vw;
      height: 6vw;
      border: 1px solid #ccc;
      border-radius: 2px;
      .iconfont {
        font-size: @f9;
        color: #fff;
      }
    }
    .kuangChoosed {
      border-color: #5fb878;
      background-color: #5fb878;
    }
    .invoice {
      font-size: @f7;
    }
    .total {
      text-align: right;
      .totalText {
        color: @6;
        // font-size: @f8;
      }
      .totalPrice {
        color: @red;
        font-size: @f8;
      }
      .red {
        margin-top: 1vw;
        font-size: @f6;
        text-align: left;
      }
    }
  }
}
</style>
<template>
  <div class="all">
    <!-- 头部导航 -->
    <!-- <x-header class="xHeaderFixed">订单核对</x-header> -->
    <header-basic title="订单核对"></header-basic>
    <!-- 购物车商品 -->
    <div class="cart">
      <div class="wrapper">
        <!-- 门店数据：门店名称、版本、时长、价格、优惠信息 -->
        <div class="store">
          <div class="right">
            <div>
              <span>{{orderInfo.service_name}}</span>
              <span class="price">{{$f(orderInfo.price_info.shop_price)}}</span>
            </div>
            <div class="bottom">
              <span class="c9">购买{{number}}</span>
              <span class="red">{{orderInfo.price_info.activity_content || '无'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 提交订单 -->
    <div class="settlement">
      <div class="total">
        <span class="totalText">总计:</span>
        <span class="totalPrice">{{$f(orderInfo.price_info.shop_price)}}</span>
        <div class="red"
             v-if="discountPrice">已优惠{{$f(discountPrice)}}</div>
      </div>
      <x-button type="primary"
                @click.native="submitOrder">提交订单</x-button>
    </div>
  </div>
</template>
<script>
import { Group, Cell, XButton } from 'vux'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { Group, Cell, XButton, headerBasic },
  data () {
    return {
      // 订单信息
      orderInfo: {
        'service_name': '',
        'price_info': {
          'shop_price': 0,
          'activity_content': ''
        }
      },
      tenantID: sessionStorage.tenant_id
    }
  },
  filters: {
    formatMoney (val) {
      val = Number(val).toFixed()
      if (Number(val) > 1) val = val.split('.')[0].replace(/\B(?=(?:\d{3})+$)/g, ',')
      return '¥' + val
    }
  },
  computed: {
    number () {
      if (this.orderInfo.price_mode) {
        return (
          this.orderInfo.price_mode.find(({ service_price_id }) => {
            return service_price_id === this.orderInfo.priceChoosed
          }).count + this.orderInfo.unit_name
        )
      }
    },
    discountPrice () {
      let price = this.orderInfo.price_info
      if (price && price.market_price && price.shop_price) {
        return price.market_price - price.shop_price
      }
    }
  },
  methods: {
    // 提交订单
    submitOrder () {
      this.$loading('提交订单...')
      let products = []
      products.push({ service_id: this.orderInfo.service_id, service_price_id: this.orderInfo.priceChoosed })
      this.$fetch
        .serviceCreate({
          is_invoice: '0',
          products: products,
          tenant_id: this.tenantID
        })
        .then(({ order_sn, is_pay }) => {
          this.$loading()
          sessionStorage.order_sn = order_sn
          if (is_pay) this.$router.push('myBuy_orderDetails')
          else this.$router.push('store_orderPay')
        }).catch(err => {
          this.$loading()
          console.log('serviceCreate => errMsg: ' + err)
        })
    }
  },
  activated () {
    this.orderInfo = JSON.parse(sessionStorage.serviceOrder)
    this.$loading()
  }
}
</script>
