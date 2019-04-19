/*
 * @Author: 陈航
 * @Date: 2018-09-17 14:35:55
 * @Last Modified by: 陈航
 * @说明：选择优惠
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.quan{
  padding-top:calc(~'16vw + 44px');
  padding-top:-webkit-calc(~'16vw + 44px');
  padding-bottom: 15vw;
  .tab-wrapper{
    position:fixed;
    top:12vw;
    left:0;
    width:100%;
  }
  .tabBarColor{
    color:#1699e7;
  }
  .quanListWrapper{
    background-color: #fff;
    p.info{
      font-size: @f5;
      padding:2vw 5vw;
      line-height: 180%;
      text-align: justify;
    }
    .quanList{
      padding-bottom:0.01vw;
      width:100%;
      background-color: #fff;
      .quanItem{
        .flexUi(space-between);
        width:90vw;
        margin:0 auto 5vw;
        height:39vw;
        background-image:url(../../../assets/image/coupon.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
        .left{
          margin-left:7.4vw;
          h3{
            font-size:@f7;
            line-height:150%;
            padding-bottom:1.5vw;
            color:@3;
            font-weight:550;
          }
          .version{
            overflow: hidden;
            p{
              float:left;
              font-size:@f6;
              margin-right:2vw;
              padding:1vw 2vw;
              border:solid 1px #cdcdcd;
              border-radius:3px;
              color:#5f5f5f;
            }
          }
          .intro{
            padding-top:3vw;
            p{
              font-size:@f5;
              color:#9c9c9c;
            }
          }
        }
        .iconDefault{
          margin-right:7.4vw;
          color:#ccc;
          font-size:1.5rem;
        }
        .iconChecked{
          color:#1997e3;
        }
        .is_disabled{
          margin-right:7.4vw;
          color:#999;
          font-size:@f6;
        }
      }
      .disabled{
          background-image:url(../../../assets/image/coupon-disabled.png);
      }
    }
  }
}
</style>
<template>
  <div class="quan">
    <!-- 头部导航 -->
    <header-basic title="选择优惠"></header-basic>
    <div class="tab-wrapper" v-if="tab_list.length">
      <tab bar-active-color="#1699e7" active-color="#1997e3">
        <tab-item v-for="(i, index) in tab_list" @on-item-click="onItemClick(i.code)" :selected="current_tab_item===i.code" :key="index">{{i.name}}</tab-item>
      </tab>
    </div>
    <div class="quanListWrapper" v-if="current_list.length">
      <p class="red info">温馨提示：{{current_tab_item==='trial'?'您可以选择多张符合使用条件的体验券':'优惠券活动不可与其他优惠活动同时参与，且每次只可使用一张优惠券'}}</p>
      <ul class="quanList">
        <li class="quanItem"  v-for="(i,index) in current_list" @click="toggleCheck(i,index)" :key="index" :class="{'disabled':i.is_enable!==1}">
          <div class="left">
            <h3>{{i.activity_type}}</h3>
            <div class="version">
              <p v-if="current_tab_item ==='trial'">{{i.package_name}}</p>
              <p v-else-if="i.activity_package_name">{{i.activity_package_name}}</p>
              <p v-if="current_tab_item ==='trial'">{{i.month}}个月</p>
            </div>
            <div class="intro">
              <p v-if="current_tab_item ==='trial'">最多可开{{i.max_store_count}}家店</p>
              <p v-else>{{i.apply_product}}</p>
              <p>活动时间：{{i.start_time.split(' ')[0]}} 到 {{i.end_time.split(' ')[0]}}</p>
            </div>
          </div>
          <icon v-if="i.is_enable === 1" type="success" is-msg class="iconDefault" :class="{'iconChecked':i.isChoosed===true}"></icon>
          <p class="is_disabled" v-else>不可使用</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem, Icon } from 'vux'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: {
    Tab,
    TabItem,
    Icon,
    headerBasic
  },
  data() {
    return {
      // 购物车门店信息
      storeStatistics: {},
      // 购物车信息
      cart_info: [],
      // 优惠券列表
      coupon_list: [],
      // 体验券列表
      experience_list: [],
      // 券种类
      tab_list: [],
      // 当前券
      current_tab_item: '',
      // 已经选择的券
      initQuanArray: [],
      // 当前券列表
      current_list: []
    }
  },
  methods: {
    // 判断某个元素是否在数组中
    isInArray: function(arr, value) {
      if (!arr.length) return false
      for (let i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return true
        }
      }
      return false
    },
    // tab切换
    onItemClick(item) {
      // 点击当前item无效
      if (this.current_tab_item === item) {
        return false
      }
      this.current_tab_item = item
      if (item === 'trial') this.current_list = this.experience_list
      else this.current_list = this.coupon_list
    },
    // 是否选择券
    toggleCheck(i, j) {
      // is_enable为1可选择
      if (i.is_enable !== 1) {
        return false
      }
      let quanArr = []
      // 选择优惠券
      if (i.activity_type_code === 'coupon') {
        i.isChoosed = !i.isChoosed
        this.current_list.forEach((item, idx) => {
          if (idx !== j) {
            item.isChoosed = false
            this.$set(this.current_list, idx, item)
          }
        })
        // 体验券全部取消选择
        this.experience_list.forEach(item => {
          item.isChoosed = false
        })
        // 选择优惠
        if (!i.isChoosed) {
          quanArr = []
        } else {
          quanArr = [i]
        }
        // 路由跳转
        // if (i.isChoosed) this.$router.push('/main/store_checkOrder')
      } else {
        // 选择体验券
        if (sessionStorage.quanArray) {
          quanArr = JSON.parse(sessionStorage.quanArray)
        }
        // 已选择优惠统计
        let statistics = this.quanStatistics(quanArr)
        // 是否已选择优惠券
        let couponKeys = Object.keys(statistics.coupon)
        // 如果选了优惠券，则删除优惠券
        if (couponKeys && couponKeys.length) {
          quanArr = []
        }
        // 是否已选择体验券，如果当前操作是去选中体验券，并且已选择的对应的（版本加时长）体验券的数量不小于对应的（版本加时长）购物车门店数量,
        // 则阻止此操作
        let trialObj = statistics.trial
        let currentKey = i.package_id + '@' + i.month
        if (trialObj[currentKey] && this.storeStatistics[currentKey] && (Number(trialObj[currentKey]) >= Number(this.storeStatistics[currentKey]))) {
          if (!i.isChoosed) return false
        }
        i.isChoosed = !i.isChoosed
        this.$set(this.current_list, j, i)
        // 优惠券全部取消选择
        this.coupon_list.forEach(item => {
          item.isChoosed = false
        })
        if (quanArr.length) {
          // 是否删除已选体验券
          let willDelete = false
          quanArr.forEach((item, index) => {
            let comBoo = item.activity_type_code === i.activity_type_code
            let trialBoo = i.activity_type_code === 'trial' && i.activity_cdkey_id === item.activity_cdkey_id
            // 删除体验券
            if (comBoo && trialBoo) {
              willDelete = true
              if (!i.isChoosed) quanArr.splice(index, 1)
            }
          })
          // 新增体验券
          if (!willDelete) {
            quanArr.push(i)
          }
        } else {
          // 新增体验券
          if (i.isChoosed) quanArr.push(i)
        }
      }
      // 更新sessionStorage
      sessionStorage.quanArray = JSON.stringify(quanArr)
    },
    // 优惠券中的统计可用套餐（版本+时长）及数量
    quanStatistics(arr) {
      let _return = {
        coupon: {},
        trial: {}
      }
      if (Object.prototype.toString.call(arr).toLowerCase() === '[object array]' && arr.length) {
        arr.forEach(item => {
          if (item.activity_type_code === 'coupon') {
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
            if (_return.trial[_key]) {
              _return.trial[_key] = _return.trial[_key] + 1
            } else {
              _return.trial[_key] = 1
            }
          }
        })
      }
      return _return
    },
    // 从购物车信息统计套餐类别（版本+时长）及数量
    cartInfoStatistics(arr) {
      let _return = {}
      if (Object.prototype.toString.call(arr).toLowerCase() === '[object array]' && arr.length) {
        arr.forEach(item => {
          if (item.store_list && item.store_list.length) {
            item.store_list.forEach(i => {
              let product_id = i.product_id
              let duration = i.duration
              let _key = product_id + '@' + duration
              if (_return[_key]) {
                _return[_key] = _return[_key] + 1
              } else {
                _return[_key] = 1
              }
            })
          }
        })
      }
      return _return
    },
    // 获取优惠券
    getCoupon() {
      let getSettlementField = null
      if (sessionStorage.settlement) {
        // 代理商为客户开店
        let data = JSON.parse(sessionStorage.settlement)
        if (data.cart_info.length) {
          getSettlementField = { cart_info: data.cart_info }
        } else this.$router.push('store_myStore')
      }
      this.$fetch.getSettlement(getSettlementField).then(data => {
        if (data.cart_info.length) {
          this.cart_info = data.cart_info
          this.storeStatistics = this.cartInfoStatistics(this.cart_info)
          this.coupon_list = data.coupon_list
          this.experience_list = data.experience_list
          // 初始化体验券
          this.experience_list.map((val, idx) => {
            if (idx === 0 && val.activity_type_code && !this.isInArray(this.tab_list, val.activity_type_code)) {
              this.tab_list.push({code: val.activity_type_code, name: val.activity_type})
            }
            if (this.initQuanArray.length) {
              let isChoosed = false
              this.initQuanArray.forEach(item => {
                if (item.activity_type_code === 'trial' && item.activity_cdkey_id === val.activity_cdkey_id) {
                  isChoosed = true
                  val.isChoosed = true
                }
              })
              if (!isChoosed) {
                val.isChoosed = false
              }
            } else val.isChoosed = false
          })
          // 初始化优惠券
          this.coupon_list.map((val, idx) => {
            if (idx === 0 && val.activity_type_code && !this.isInArray(this.tab_list, val.activity_type_code)) {
              this.tab_list.push({code: val.activity_type_code, name: val.activity_type})
            }
            if (this.initQuanArray.length) {
              let isChoosed = false
              this.initQuanArray.forEach(item => {
                if (item.activity_type_code === 'coupon' && item.coupon_id === val.coupon_id) {
                  isChoosed = true
                  val.isChoosed = true
                }
              })
              if (!isChoosed) {
                val.isChoosed = false
              }
            } else val.isChoosed = false
          })
          // 券的种类
          if (this.tab_list.length) {
            this.current_tab_item = this.tab_list[0].code
            if (this.current_tab_item === 'trial') this.current_list = this.experience_list
            else this.current_list = this.coupon_list
          } else {
            this.$vux.toast.text('您目前没有可选的优惠券和体验券')
            this.$router.push('/main/store_checkOrder')
          }
        }
        this.$loading()
      }).catch(err => {
        this.$loading()
        console.log('getCoupon => errMsg:' + err)
      })
    }
  },
  activated() {
    this.$loading('选择优惠...')
    this.initQuanArray = []
    this.storeStatistics = {}
    this.current_tab_item = ''
    this.tab_list = []
    if (sessionStorage.quanArray) {
      this.initQuanArray = JSON.parse(sessionStorage.quanArray)
    }
    this.getCoupon()
  }
}
</script>
