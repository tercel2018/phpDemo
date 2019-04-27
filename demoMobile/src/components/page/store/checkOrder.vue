/*
 * @Author: 陈航
 * @Date: 2018-05-10 14:59:40
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-20 09:33:11
 * @说明：结算页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.all {
  padding-top:12vw;
  margin-bottom: calc(~'23vw + 69px');
  margin-bottom: -webkit-calc(~'23vw + 69px');
  font-size: @f7;
  // 购物车商品
  .cart {
    margin-bottom: 10px;
    color: @3;
    .wrapper{
      background-color: #fff;
    }
    .cart_title {
      .flexUi(flex-start,center);
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
          .red{
            max-width: 60vw;
          }
        }
      }
    }
  }
  .coupon{
      margin:4vw 0;
      padding:4vw;
      background-color: #fff;
      .flexUi(space-between);
      .right{
        line-height:100%;
        width:max-content;
        .flexUi(space-between);
        .blue{
          padding-right:10px;
          font-size:@f7;
          line-height:27px;
          .choosed{
            color:@9;
          }
          .note{
            font-size:@f6;
          }
        }
        .icon{
          .arrow-right{
            fill:#686868;
          }
        }
      }
    }
  // 结算
  .settlement {
    .flexUi(space-between);
    position: fixed;
    left: 0;
    bottom:15vw;
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
        font-size: @f8
      }
      .red {
        margin-top: 1vw;
        font-size: @f6;
      }
    }
  }
}
</style>
<template>
  <div class="all">
    <!-- 头部导航 -->
    <header-basic title="结算"></header-basic>
    <!-- 优惠券 -->
    <div v-if="canUseYouhuiList.length" class="coupon" @click="toCoupon()">
      <div class="left">
        <span class="title">使用优惠</span>
      </div>
      <div class="right">
        <span class="blue">请选择优惠</span>
        <span class="icon"><x-icon class="arrow-right" type="ios-arrow-right" size="27"></x-icon></span>
      </div>
    </div>
    <!-- 购物车商品 -->
    <div class="cart" v-if="shopcarObj.length" v-for="(i,iIndex) in shopcarObj" :key="iIndex">
      <div class="wrapper">
        <!-- 公司名、域名 -->
        <div class="cart_title">
          <div class="company"> {{i.company}}</div>
          <div class="domain">{{i.domain}}.{{threeDomain}}</div>
        </div>
        <!-- 门店数据：门店名称、版本、时长、价格、优惠信息 -->
        <div class="store" v-if="i.store_list.length" v-for="(j,j_index) in i.store_list" :key="j_index">
          <div class="right">
            <div>
              <span>{{j.store_name}}</span>
              <span class="price">{{$f(j.agent_price)}}</span>
            </div>
            <div class="bottom">
              <span class="c9">{{j.product_name}}{{(j.duration_name && j.duration_name.value)?j.duration_name.value:''}}</span>
              <span class="red">{{j.activity_content}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 提交订单 -->
    <div class="settlement">
      <!-- <div class="kuang" :class="{kuangChoosed:isInvoice}" @click="isInvoice=!isInvoice">
        <i class="iconfont icon-gouxuan" v-show="isInvoice"></i>
      </div>
      <div @click="isInvoice=!isInvoice" class="invoice">需要开发票</div> -->
      <div class="total">
        <span class="totalText">总计:</span>
        <span class="totalPrice">{{$f(totalPrice)}}</span>
        <div class="red" v-if="discountPrice">已优惠{{$f(discountPrice)}}</div>
      </div>
      <x-button type="primary" @click.native="submitOrder">提交订单</x-button>
    </div>
  </div>
</template>
<script>
import { Group, Cell, XButton } from 'vux'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { Group, Cell, XButton, headerBasic },
  data() {
    return {
      // 结算商品数据
      shopcarObj: [],
      // 三级域名
      threeDomain: sessionStorage.threeDomain,
      // 是否选中发票
      isInvoice: false,
      // 总价格
      totalPrice: 0,
      // 优惠价格
      discountPrice: 0,
      // 可用优惠
      canUseYouhuiList: [],
      // （优惠|体验）券信息
      quanInfo: [],
      // 购物车门店信息
      storeStatistics: {},
      // 当前优惠
      currentYouhui: {}
    }
  },
  filters: {
    formatMoney(val) {
      val = Number(val).toFixed()
      if (Number(val) > 1) val = val.split('.')[0].replace(/\B(?=(?:\d{3})+$)/g, ',')
      return '¥' + val
    }
  },
  methods: {
    // 数组合并
    contactArray(...params) {
      return params
    },
    // 判断参数是否为非空数组
    hasItemArray(param) {
      if (Object.prototype.toString.call(param) === '[object Array]' && (param.length > 0)) {
        return true
      }
      return false
    },
    // 是否有可选优惠
    willCheckFun(arr) {
      if (!this.hasItemArray(arr)) {
        return false
      }
      let newArray = []
      arr.map(val => {
        if (this.hasItemArray(val)) {
          val.map(item => {
            if (item.is_enable === 1) {
              newArray.push(item)
            }
          })
        }
      })
      return newArray
    },
    // 优惠券中的统计可用套餐（版本+时长）及数量
    quanStatistics(arr) {
      let _return = {
        coupon: {},
        trial: {}
      }
      if (Object.prototype.toString.call(arr).toLowerCase() === '[object array]' && arr.length) {
        arr.forEach(item => {
          if (arr.activity_type_code === 'coupon') {
            let apply_arr = item.apply_product_id
            let _key = ''
            if (apply_arr && Object.prototype.toString.call(apply_arr).toLowerCase() === '[object array]' && apply_arr.length) {
              _key = apply_arr.join('&')
            } else {
              _key = '*'
            }
            if (_return.coupon[_key]) {
              _return.coupon[_key] = _return.coupon[_key] + 1
            } else {
              _return.coupon[_key] = 1
            }
          } else {
            let product_id = item.package_id
            let duration = item.month
            let _key = product_id + '@' + duration
            if (_return.trial[_key] && _return.trial[_key].number) {
              _return.trial[_key].number = _return.trial[_key].number + 1
            } else {
              _return.trial[_key] = { number: 1, activity_content: item.activity_content }
            }
          }
        })
      }
      return _return
    },
    // 获取结算数据
    getSettlement() {
      let getSettlementField = null
      if (sessionStorage.settlement) {
        // 代理商为客户开店
        let data = JSON.parse(sessionStorage.settlement)
        if (data.cart_info.length) {
          getSettlementField = { cart_info: data.cart_info }
        } else this.$router.push('store_myStore')
      }
      this.$fetch.getSettlement(getSettlementField).then(({ total_price, cart_info, coupon_list, experience_list }) => {
        if (!coupon_list.length && !experience_list.length) {
          // 无可选的（优惠|体验）券
          delete sessionStorage.quanArray
          this.quanInfo = []
        } else {
          // 优惠券和体验券合并
          let youhui = this.willCheckFun(this.contactArray(coupon_list, experience_list))
          // 可用的优惠券
          this.canUseYouhuiList = youhui.filter(youhui_item => Number(youhui_item.is_enable) === 1)
          if (!this.canUseYouhuiList.length) {
            delete sessionStorage.quanArray
            this.quanInfo = []
          } else {
            this.quanInfo.forEach((quan_item, quan_index) => {
              if (quan_item.activity_type_code === 'coupon') {
                // 本地存储的优惠券是否可用，不能用则删除
                let couponCanUse = false
                this.canUseYouhuiList.forEach(youhui_item => {
                  if (youhui_item.activity_type_code === 'coupon' && Number(youhui_item.coupon_id) === Number(quan_item.coupon_id)) {
                    cart_info.forEach(({ store_list }) => {
                      store_list.forEach(store_item => {
                        let apply_product_id = quan_item.apply_product_id
                        if (apply_product_id && apply_product_id.length) {
                          if (apply_product_id.indexOf(store_item.product_id) > -1) {
                            couponCanUse = true
                          }
                        } else {
                          couponCanUse = true
                        }
                      })
                    })
                  }
                })
                if (!couponCanUse) {
                  this.quanInfo.splice(quan_index, 1)
                  sessionStorage.quanArray = this.quanInfo
                }
              } else {
                // 本地存储的体验券是否可用，不能用则删除
                let trialCanUse = false
                this.canUseYouhuiList.forEach(youhui_item => {
                  if (Number(youhui_item.activity_type_code === 'trial' && youhui_item.activity_cdkey_id) === Number(quan_item.activity_cdkey_id)) {
                    cart_info.forEach(({ store_list }) => {
                      store_list.forEach(store_item => {
                        let quanKey = quan_item.package_id + '@' + quan_item.month
                        let storeKey = store_item.product_id + '@' + store_item.duration
                        if (quanKey === storeKey) {
                          trialCanUse = true
                        }
                      })
                    })
                  }
                })
                if (!trialCanUse) {
                  this.quanInfo.splice(quan_index, 1)
                  sessionStorage.quanArray = this.quanInfo
                }
              }
            })
            if (this.quanInfo.length) {
              // 有优惠重新初始化购物车门店
              let trialObj = this.quanStatistics(this.quanInfo).trial
              cart_info.forEach(shop_item => {
                shop_item.store_list.forEach(store_item => {
                  if (this.quanInfo[0].activity_type_code === 'coupon') {
                    // 优惠券（只有一张）
                    let activity_content = this.quanInfo[0].activity_content
                    let apply_product_id = this.quanInfo[0].apply_product_id
                    if (apply_product_id && apply_product_id.length) {
                      if (apply_product_id.indexOf(store_item.product_id) > -1) {
                        store_item.activity_content = activity_content
                      } else {
                        store_item.activity_content = ''
                      }
                    } else {
                      store_item.activity_content = activity_content
                    }
                  } else {
                    // 体验券
                    let storeKey = store_item.product_id + '@' + store_item.duration
                    if (trialObj[storeKey] && Number(trialObj[storeKey].number)) {
                      trialObj[storeKey].number = Number(trialObj[storeKey].number) - 1
                      store_item.activity_content = trialObj[storeKey].activity_content
                    }
                  }
                })
              })
              // 有优惠重新查价传参
              if (this.quanInfo[0].activity_type_code === 'coupon') {
                // 优惠券
                this.currentYouhui = {
                  activity_type: this.quanInfo[0].activity_type_code,
                  activity_id: this.quanInfo[0].activity_id,
                  coupon_id: this.quanInfo[0].coupon_id
                }
              } else {
                // 体验券
                this.currentYouhui = {
                  activity_type: this.quanInfo[0].activity_type_code,
                  card_ids: this.quanInfo.map(quan_item => quan_item.activity_cdkey_id)
                }
              }
              // 代理商为客户开店
              if (sessionStorage.settlement) {
                this.currentYouhui.item = cart_info[0].store_list
              }
              // 有优惠重新查价
              this.$fetch.cartGetSettlementPrice(this.currentYouhui).then(data => {
                this.totalPrice = data.total_price
              })
            } else {
              delete sessionStorage.quanArray
              this.quanInfo = []
            }
          }
        }
        this.shopcarObj = cart_info
        this.totalPrice = total_price
      })
    },
    // 提交订单
    submitOrder() {
      this.$loading('提交订单...')
      if (sessionStorage.settlement) {
        // 代理商为客户开店时的提交订单
        let data = JSON.parse(sessionStorage.settlement)
        let parmas = {
          is_invoice: '0',
          cus_user_id: data.cus_user_id,
          discount: data.discount,
          domain: data.cart_info[0].domain,
          company_name: data.cart_info[0].company,
          short_name: data.cart_info[0].short_name,
          item: this.shopcarObj[0].store_list
        }
        if (this.quanInfo.length) {
          parmas.activity_type = this.currentYouhui.activity_type
          if (this.currentYouhui.activity_type === 'coupon') {
            parmas.coupon_id = this.quanInfo[0].coupon_id
            parmas.activity_id = this.currentYouhui.activity_id
          } else {
            parmas.card_ids = this.currentYouhui.card_ids
          }
        }
        this.$fetch.orderCreateCustomer(parmas).then(({ order_sn, is_pay }) => {
          this.$loading()
          if (sessionStorage.quanArray) {
            delete sessionStorage.quanArray
            this.quanInfo = []
          }
          delete sessionStorage.settlement
          sessionStorage.order_sn = order_sn
          delete sessionStorage.serviceOrder
          if (is_pay) {
            this.$router.push('/main/myBuy_orderDetail')
          } else {
            this.$router.push('store_orderPay?order_type=1')
          }
        }).catch(err => {
          this.$loading()
          this.$toast(err)
        })
      } else {
        // 为自己开店提交门店
        let parmas = { is_invoice: '0' }
        if (this.quanInfo.length) {
          parmas.activity_type = this.currentYouhui.activity_type
          if (this.currentYouhui.activity_type === 'coupon') {
            parmas.coupon_id = this.quanInfo[0].coupon_id
            parmas.activity_id = this.currentYouhui.activity_id
          } else {
            parmas.card_ids = this.currentYouhui.card_ids
          }
        }
        this.$fetch.create(parmas).then(data => {
          this.$loading()
          // 如果有选择优惠则清除
          if (sessionStorage.quanArray) {
            delete sessionStorage.quanArray
            this.quanInfo = []
          }
          sessionStorage.order_sn = data.order_sn
          if (data.is_pay === 1) { // 直接完成订单，跳转到订单详情页面
            this.$router.push('/main/myBuy_orderDetail')
          } else {
            this.$router.push('/main/store_orderPay')
          }
        }).catch(err => {
          this.$loading()
          this.$toast(err)
        })
      }
    },
    // 跳转到优惠券
    toCoupon(i) {
      this.$router.push('/main/store_quan')
    }
  },
  activated() {
    this.$loading()
    this.currentYouhui = {}
    this.canUseYouhuiList = []
    this.shopcarObj = []
    if (sessionStorage.quanArray) { // 从优惠券页面回来
      this.quanInfo = JSON.parse(sessionStorage.quanArray)
    } else {
      this.quanInfo = []
    }
    this.getSettlement()
  }
}
</script>
