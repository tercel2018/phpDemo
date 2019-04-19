/*
 * @Author: 黄智强
 * @Date: 2018-05-05 13:39:48
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-04-12 10:16:01
 * @说明：新开门店页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.all {
  // 公司、域名填写
  padding-top: 12vw;
  padding-bottom: calc(~"8vw + 59px");
  padding-bottom: -webkit-calc(~"8vw + 59px");
  .rankActivity {
    background-color: #fff;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    color: #ff6c00;
    font-size: @f6;
    padding: 2vw 15px;
    width: 100%;
  }
  .packageActivity {
    background-color: #fff;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    color: #ff6c00;
    font-size: @f6;
    padding: 0 15px 2vw;
    width: 100%;
  }
  .open-type {
    margin: 10px 0;
    background-color: #fff;
  }
  .head {
    // padding: 5.555556vw 0;
    background-color: #fff;
  }
  .flexList {
    .flexUi;
    flex-wrap: wrap;
    color: @3;
    // 套餐、时长未选中公用样式
    .flexItem {
      .flexUi(center);
      margin-bottom: 5%;
      padding: 2vw 0;
      font-size: @f6;
      box-sizing: border-box;
      border: 1px solid #d2d2d2;
      border-radius: 3px;
    }
    // 套餐、时长选中公用样式
    .choosedItem {
      position: relative;
      border-color: @blue;
      .gou {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-bottom: 6vw solid #1a97e3;
        border-left: 6vw solid transparent;
        .iconfont {
          position: absolute;
          top: 1vw;
          left: -4vw;
          font-size: @f7;
          color: #fff;
        }
      }
    }
    // 开店类型
    .open_item {
      width: 47.5%;
      margin-bottom: 0;
      &:nth-child(2n + 1) {
        margin-right: 5%;
      }
    }
    // 套餐块样式
    .product_item {
      width: 47.5%;
      &:nth-child(2n + 1) {
        margin-right: 5%;
      }
      img {
        width: 6.296296vw;
        margin-right: 2vw;
      }
    }
    // 时长块样式
    .duration_item {
      width: 30%;
      margin-right: 5%;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
    // 没有margin-bottom
    .item_noMb {
      margin-bottom: 0;
    }
  }
  // 门店
  .storeUl {
    li {
      margin-top: 10px;
      padding-bottom: 4vw;
      background-color: #fff;
      &:last-child {
        margin-bottom: 10px;
      }
      // 套餐文字描述
      .proInfo {
        font-size: @f5;
        text-align: left;
      }
      // 市场价格、优惠价格
      .price {
        padding: 10px 0 10px 15px;
        font-size: @f5;
        color: @9;
        .mr {
          margin-right: 2vw;
        }
        .com {
          position: relative;
          font-size: @f6;
          color: @red;
        }
        .loading {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
      // 添加门店、删除
      .btnGroup {
        .flexUi;
        padding-left: 15px;
      }
    }
  }
  // 立即购买、加入购物车
  .buy {
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    left: 0;
    bottom: 15vw;
    .flexUi(space-between);
    padding: 3vw 15px;
    background-color: #fff;
    border-top: solid 1px #d2d2d2;
    .left {
      font-size: @f5;
      color: @6;
      .com {
        position: relative;
        font-size: @f7;
        color: @red;
      }
      .loading {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
    .right {
      .flexUi;
    }
  }
  .prompt-popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -999;
    width: 100%;
    height: 100%;
    background-color: rgba(33, 33, 33, 0.5);
    transition: opacity 0 0.5s, z-index 0s;
    -webkit-transition: opacity 0 0.5s, z-index 0s;
  }
  .prompt-popup-mask.show {
    opacity: 1;
    z-index: 899;
  }
  .prompt-popup {
    position: fixed;
    bottom: -60vh;
    left: 0;
    width: 100%;
    z-index: 900;
    background-color: #f3f3f3;
    transition: bottom 0.5s;
    -webkit-transition: bottom 0.5s;
    h4 {
      line-height: 1.8rem;
      font-weight: 400;
      text-align: center;
      font-size: 0.7rem;
    }
    .prompt-popup-section {
      background-color: #fff;
      width: 92vw;
      padding: 3vh 4vw;
      .prompt-popup-content {
        width: 100%;
        font-size: 0.7rem;
        padding-bottom: 3vh;
      }
    }
    .closeBut {
      width: 100%;
      line-height: 1.6rem;
      background-color: @blue;
      color: #fff;
      border-radius: 0.15rem;
      text-align: center;
      font-size: 0.7rem;
    }
  }
  .prompt-popup.show {
    bottom: 4vh;
  }
}
</style>
<template>
  <div class="all"
       component-fixed-offset="8vw + 59px">
    <!-- 头部导航 -->
    <header-and-nav title="新开门店"
                    v-model="navOpen">
      <side-nav-cell icon="icon-mendian"
                     title="我的门店"
                     @on-click="toMyStore"></side-nav-cell>
      <side-nav-cell icon="icon-gouwuche"
                     title="我的购物车"
                     @on-click="toShopCart"></side-nav-cell>
    </header-and-nav>
    <div class="rankActivity"
         v-if="userInfo.user_role === 11 && userInfo.discount>userInfo.show_top_discount && userInfo.discount>userInfo.all_top_discount">
      <span class="link">
        <i class="iconfont icon-huodong"
           style="font-size:0.6rem"></i>
        您当前等级为{{userInfo.rank_name}}{{userInfo.discount==100?'不享受':('享' + (userInfo.discount/10) + '折')}}优惠，点我<u @click="$router.push('rankPage')">提升等级</u>获得更低折扣！
      </span>
      <div class="packageActivity"
           v-if="packageActivity"
           style="padding:2vw 0 0">【多买多优惠】{{packageActivity}}</div>
    </div>
    <div class="packageActivity"
         v-else-if="packageActivity"
         style="padding-top:2vw">【多买多优惠】{{packageActivity}}</div>
    <!-- 开店类型 -->
    <group class="open-type group-label-font"
           label-width="23vw"
           gutter="0"
           v-if="isShowOpenType=='1'">
      <cell title="开店类型"
            align-items="default"
            primary="content">
        <checker class="flexList"
                 v-model="openType"
                 default-item-class="flexItem open_item"
                 selected-item-class="choosedItem"
                 radio-required
                 @on-change="changeOpenType">
          <checker-item v-for="(o,index) in openTypes"
                        :key="index"
                        :value="o.key">
            <span>{{o.value}}</span>
            <div class="gou"
                 v-show="openType==o.key">
              <i class="iconfont icon-gouxuan"></i>
            </div>
          </checker-item>
        </checker>
      </cell>
    </group>
    <!-- 代客户开店 -->
    <template v-if="isShowOpenType=='1' && openType ==='1'">
      <!-- 选择客户 -->
      <group class="head"
             label-width="23vw"
             gutter="0"
             v-if="userCustomerList.length">
        <popup-radio title="选择客户"
                     :options="userCustomerList"
                     v-model="currentCustomer"
                     @on-change="changeCustomer"
                     placeholder="请选择客户"></popup-radio>
      </group>
      <!-- 客户折扣 -->
      <group class="head"
             label-width="23vw"
             gutter="0"
             v-if="userCustomerDiscountList.length && isSetUserRank == '2'">
        <popup-radio title="客户折扣"
                     :options="userCustomerDiscountList"
                     v-model="currentCustomerDiscount"
                     @on-change="changeCustomerDiscount"
                     placeholder="请选择"></popup-radio>
      </group>
    </template>
    <!-- 更换公司 -->
    <group class="head"
           label-width="23vw"
           gutter="0"
           v-if="userTenantList.length && willChoosedTenant">
      <popup-radio title="已有公司"
                   :options="userTenantList"
                   v-model="currentTenant"
                   @on-change="changeTenant"
                   placeholder="请选择"></popup-radio>
    </group>
    <!-- 公司、域名填写 -->
    <group class="head"
           label-width="23vw"
           gutter="0">
      <x-input v-model="company_name"
               title="公司名称"
               required
               placeholder="请输入公司名称"
               :disabled="onlyWatch"></x-input>
      <x-input v-model="short_name"
               title="公司简称"
               required
               placeholder="请输入公司简称"
               @change.native="getDomainFun"
               :disabled="onlyWatch"></x-input>
      <x-input v-if="!editDomain"
               v-model="domain"
               :debounce="100"
               title="公司域名"
               placeholder="该域名将会自动填充"
               required
               disabled>
        <span slot="right"
              class="blue">.{{threeDomain}}</span>
      </x-input>
      <x-input v-else
               v-model="domain"
               :debounce="100"
               title="公司域名"
               placeholder="请输入域名"
               required>
        <span slot="right"
              class="blue">.{{threeDomain}}</span>
      </x-input>
    </group>
    <!-- 门店 -->
    <ul class="storeUl">
      <li v-for="(i,iIndex) in stores"
          :key="iIndex">
        <group label-width="23vw"
               gutter="0"
               class="group-label-font">
          <x-input :ref="'name'+iIndex"
                   v-model="i.store_name"
                   title="门店名称"
                   required
                   placeholder="请输入门店名称"
                   @on-enter="addShopCart(0)"></x-input>
          <cell title="套餐版本"
                align-items="default"
                primary="content">
            <div class="flexList">
              <div class="flexItem product_item"
                   v-for="p in productList"
                   :key="p.product_id"
                   :class="{choosedItem:i.product_id===p.product_id}"
                   @click="itemChoosed(i,'product_id',p.product_id, p)">
                <img :src="uploadHost+p.image">
                <span>{{p.product_name}}</span>
                <div class="gou"
                     v-show="i.product_id===p.product_id">
                  <i class="iconfont icon-gouxuan"></i>
                </div>
              </div>
            </div>
            <p class="proInfo">{{productContent(i.product_id)}}</p>
          </cell>
          <cell title="开通时长"
                align-items="default"
                primary="content">
            <checker class="flexList"
                     v-model="i.duration"
                     default-item-class="flexItem duration_item"
                     selected-item-class="choosedItem"
                     radio-required>
              <checker-item v-for="(d,index) in durationList"
                            :key="d.key"
                            :value="d.key"
                            :class="{item_noMb:index>=3}"
                            @on-item-click="itemChoosed(i,'duration',d.key)">
                <span>{{d.value}}</span>
                <div class="gou"
                     v-show="i.duration===d.key">
                  <i class="iconfont icon-gouxuan"></i>
                </div>
              </checker-item>
            </checker>
          </cell>
        </group>
        <!-- 市场价格、优惠价格 -->
        <div class="price">
          <span>销售价：</span>
          <span class="com mr">
            <inline-loading v-show="i.priceLoading===0"
                            class="loading"></inline-loading>
            <span :style="{opacity:i.priceLoading}"
                  style="color:#666;"><s>{{$f(i.product_price)}}</s></span>
          </span>
          <span>优惠价：</span>
          <span class="com mr">
            <inline-loading v-show="i.priceLoading===0"
                            class="loading"></inline-loading>
            <span :style="{opacity:i.priceLoading}">{{$f(i.agent_price)}}</span>
          </span>
          <template v-if="openType === '0'">
            <span>省</span>
            <span class="com">
              <inline-loading v-show="i.priceLoading===0"
                              class="loading"></inline-loading>
              <span :style="{opacity:i.priceLoading}">{{$f(i.decrease_amount)}}</span>
            </span>
          </template>
          <template v-else>
            <span>佣金收益：</span>
            <span class="com">
              <inline-loading v-show="i.priceLoading===0"
                              class="loading"></inline-loading>
              <span :style="{opacity:i.priceLoading}">{{$f(i.agent_profit)}}</span>
            </span>
          </template>
        </div>
        <!-- 添加门店、删除 -->
        <div class="btnGroup">
          <x-button type="primary"
                    @click.native="addStore(i)"
                    v-if="editStore.source !== 'shopCart'">添加门店</x-button>
          <x-button v-if="iIndex"
                    @click.native="stores.splice(iIndex, 1)">删除</x-button>
        </div>
      </li>
    </ul>
    <!-- 立即购买、加入购物车 -->
    <div class="buy"
         data-fixed-bottom="component">
      <div class="left">
        <div>
          <span>销售价：</span>
          <span class="com">
            <inline-loading v-show="priceLoading===0"
                            class="loading"></inline-loading>
            <span :style="{opacity:priceLoading}"
                  style="color:#666"><s>{{$f(total_product_price)}}</s></span>
          </span>
        </div>
        <div>
          <span>优惠价：</span>
          <span class="com">
            <inline-loading v-show="priceLoading===0"
                            class="loading"></inline-loading>
            <span :style="{opacity:priceLoading}">{{$f(total_agent_price)}}</span>
          </span>
        </div>
        <div>
          <template v-if="openType === '0'">
            <span>省</span>
            <span class="com">
              <inline-loading v-show="priceLoading===0"
                              class="loading"></inline-loading>
              <span :style="{opacity:priceLoading}">{{$f(total_decrease_amount)}}</span>
            </span>
          </template>
          <template v-else>
            <span>佣金收益：</span>
            <span class="com">
              <inline-loading v-show="priceLoading===0"
                              class="loading"></inline-loading>
              <span :style="{opacity:priceLoading}">{{$f(total_agent_profit)}}</span>
            </span>
          </template>
        </div>
      </div>
      <div class="right">
        <template v-if="editStore.source === 'shopCart'">
          <x-button link="BACK"
                    plain>返回</x-button>
          <x-button type="primary"
                    @click.native="saveToCar">保存修改</x-button>
        </template>
        <template v-else>
          <x-button type="primary"
                    @click.native="addShopCart(1)"
                    plain>立即购买</x-button>
          <x-button v-if="openType==='0'"
                    type="primary"
                    @click.native="addShopCart(0)">加入购物车</x-button>
        </template>
      </div>
    </div>
    <!-- 集团版购买提示弹窗 -->
    <div class="prompt-popup-mask"
         :class="{show:popupShow}"
         @click="popupShow = false"></div>
    <div class="prompt-popup"
         :class="{show:popupShow}">
      <h4>温馨提示</h4>
      <div class="prompt-popup-section">
        <div class="prompt-popup-content">{{popupContent}}</div>
        <p class="closeBut"
           @click="popupShow=false">关闭</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, XInput, Cell, InlineLoading, XButton, Checker, CheckerItem, Checklist, PopupPicker, PopupRadio } from 'vux'
import headerAndNav from '@/components/common/headerAndNav'
import sideNavCell from '@/components/common/sideNavCell'
import { setTimeout } from 'timers'
export default {
  components: { Group, XInput, Cell, InlineLoading, XButton, Checker, CheckerItem, headerAndNav, sideNavCell, Checklist, PopupPicker, PopupRadio },
  data () {
    return {
      // 请求次数
      requestNum: 0,
      // 侧边导航隐藏
      navOpen: false,
      // 代理商是否设置会员等级
      isSetUserRank: '0',
      // 是否显示开店类型
      isShowOpenType: '',
      // 开店类型 '0'为自己开店 '1'为客户开店
      openType: '0',
      // 开店类型模型
      openTypesModel: [
        {
          key: '0',
          value: '为自己开店'
        },
        {
          key: '1',
          value: '为客户开店'
        }
      ],
      // 开店类型
      openTypes: [],
      // 用户信息
      userInfo: { user_role: '' },
      // 代理商客户列表
      userCustomerList: [],
      // 当前客户
      currentCustomer: '',
      // 当前客户信息
      currentCustomerInfo: {
        cus_name: '',
        user_id: ''
      },
      // 代理商可设置折扣列表
      userCustomerDiscountList: [],
      // 当前客户折扣
      currentCustomerDiscount: '',
      // 用户租户(公司)列表
      userTenantInfoList: [],
      userTenantList: [],
      // 当前租户
      currentTenant: '',
      // 是否可选租户
      willChoosedTenant: true,
      // 默认租户
      defaultTenant: '选择输入',
      // 公司名称和简写不能输入
      onlyWatch: false,
      // 公司名称
      company_name: '',
      // 公司简称
      short_name: '',
      // 域名
      domain: '',
      // 编辑域名
      editDomain: true,
      // 需要过滤的域名
      filterDomain: [],
      // 图片域名
      uploadHost: sessionStorage.uploadHost,
      // 三级域名
      threeDomain: sessionStorage.threeDomain,
      // 所有套餐版本数据
      productList: [],
      // 所有开通时长数据
      durationList: [],
      // 用户门店数据模型
      storeModel: [
        {
          store_name: '',
          product_id: '',
          content: '',
          duration: '',
          agent_price: 0,
          market_price: 0,
          product_price: 0,
          decrease_amount: 0,
          agent_profit: 0,
          activity_content: '',
          purchase_function: {},
          priceLoading: 1
        }
      ],
      // 用户门店数据
      stores: [],
      // 底部 优惠价格、市场价格加载效果
      priceLoading: 1,
      // 要编辑的门店数据
      editStore: { source: '' },
      // 满减送活动
      packageActivity: null,
      // 是否显示弹窗
      popupShow: false,
      // 显示弹窗内容
      popupContent: ''
    }
  },
  computed: {
    // 总优惠价格计算
    total_agent_price () {
      return this.stores.reduce((sum, i) => {
        return sum + Number(i.agent_price)
      }, 0)
    },
    // 总销售价格
    total_product_price () {
      return this.stores.reduce((sum, i) => {
        return sum + Number(i.product_price)
      }, 0)
    },
    // 一共省的价格
    total_decrease_amount () {
      return this.stores.reduce((sum, i) => {
        return sum + Number(i.decrease_amount)
      }, 0)
    },
    // 总的佣金收益
    total_agent_profit () {
      return this.stores.reduce((sum, i) => {
        return sum + Number(i.agent_profit)
      }, 0)
    },
    // 总市场价格计算
    total_market_price () {
      return this.stores.reduce((sum, i) => {
        return sum + Number(i.market_price)
      }, 0)
    },
    // 判断用户信息是否全部输入
    isBuy () {
      return this.stores.findIndex(val => {
        return val.store_name === ''
      })
    },
    // 套餐内容
    productContent (id) {
      return function (id) {
        let arr = this.productList.filter(item => {
          return (Number(item.product_id) === Number(id))
        })
        if (arr.length && arr[0].content) return arr[0].content
        else return ''
      }
    }
  },
  filters: {
    formatMoney (val) {
      val = Number(val).toFixed()
      if (Number(val) > 1) val = val.split('.')[0].replace(/\B(?=(?:\d{3})+$)/g, ',')
      return '¥' + val
    }
  },
  watch: {
    requestNum (val) {
      if (val > 7) this.$loading()
    }
  },
  methods: {
    // 跳转到购物车
    toShopCart () {
      this.navOpen = false
      this.$router.push('/main/store_shopcart')
    },
    // 跳转到我的门店
    toMyStore () {
      this.navOpen = false
      this.$router.push('/main/store_myStore')
    },
    // 初始化接口
    initApi () {
      this.getProduct()
      this.getFilterDomain()
      this.customerList()
      this.customerCustomerDiscountList()
      this.getPackageActivity()
      this.cartGetUserTenantList()
      this.getCustomerCustomerConfig()
    },
    // 改变开店类型
    changeOpenType () {
      this.$nextTick(() => {
        // 为自己开店: '0', 为客户开店: '1'
        if (this.openType === '0') {
          this.currentCustomerInfo.user_id = ''
          this.currentCustomerInfo.cus_name = ''
          this.currentCustomer = ''
        } else {
          // 没有客户跳转
          if (!this.userCustomerList.length) {
            this.$toast('您还没有客户，请先添加客户！')
            setTimeout(() => {
              this.$router.push('agent_addCustomer')
            }, 1000)
            return false
          }
          // 定位当前用户
          let user_id = this.currentCustomer || this.userCustomerList[0].key
          this.currentCustomerInfo.user_id = this.currentCustomer = user_id
          this.userCustomerList.some(item => {
            if (user_id === item.key) {
              this.currentCustomerInfo.cus_name = item.value
              return true
            }
            return false
          })
        }
        this.onlyWatch = false
        this.editDomain = true
        this.company_name = ''
        this.short_name = ''
        this.domain = ''
        // 获取租户列表
        this.cartGetUserTenantList()
        // 价格查询
        for (let i = 0; i < this.stores.length; i++) {
          let _current = this.stores[i]
          if (_current.product_id && _current.duration) {
            this.getPrice(_current)
          }
        }
      })
    },
    // 选择客户
    changeCustomer () {
      this.$nextTick(() => {
        let _val = this.currentCustomer
        this.currentCustomerInfo.user_id = _val
        this.currentTenant = ''
        this.userCustomerList.some(item => {
          if (_val === item.key) {
            this.currentCustomerInfo.cus_name = item.value
            return true
          }
          return false
        })
        this.cartGetUserTenantList()
        // 价格查询
        for (let i = 0; i < this.stores.length; i++) {
          let _current = this.stores[i]
          if (_current.product_id && _current.duration) {
            this.getPrice(_current)
          }
        }
      })
    },
    // 设置折扣等级
    changeCustomerDiscount () {
      for (let i = 0; i < this.stores.length; i++) {
        this.getPrice(this.stores[i])
      }
    },
    // 选择租户
    changeTenant () {
      this.$nextTick(() => {
        let val = this.currentTenant
        this.onlyWatch = !!val
        this.editDomain = !val
        if (val === '') {
          this.company_name = ''
          this.short_name = ''
          this.domain = ''
        } else {
          this.userTenantInfoList.some(item => {
            if (item.fullname === val) {
              this.company_name = item.fullname
              this.short_name = item.shortname
              this.domain = item.domain.replace('.' + this.threeDomain, '')
              return true
            } else {
              return false
            }
          })
        }
      })
    },
    // 获取用户信息
    accountGetUserInfo () {
      this.$fetch.accountGetUserInfo().then(data => {
        this.userInfo = data
        this.uploadHost = data.host
        // 更新用户角色
        this.$store.dispatch('CHANGE_USER_ROLE', data.user_role)
        this.threeDomain = data.member_domain
        let [x, y] = this.openTypesModel
        if (data.user_role === 11 || data.user_role === '11') {
          this.isShowOpenType = '1'
          if (sessionStorage.editStore && this.openType === '0') this.openTypes = [x]
          else this.openTypes = [x, y]
        } else {
          this.isShowOpenType = '0'
          this.openTypes = [x]
        }
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
        // 初始化接口
        this.initApi()
        this.requestNum++
      }).catch(err => {
        this.$loading()
        if (sessionStorage.user_role === '11') this.isShowOpenType = '1'
        else this.isShowOpenType = '0'
        console.log('accountGetUserInfo => errMsg: ' + err)
      })
    },
    // 获取重置会员等级配置时间
    getCustomerCustomerConfig () {
      this.$fetch.customerCustomerConfig().then(data => {
        this.isSetUserRank = data.agent_set_user_rank
      })
    },
    // 套餐优惠
    getPackageActivity () {
      this.$fetch.getPackageActivity().then(data => {
        this.packageActivity = data
        this.requestNum++
      }).catch(err => {
        this.$loading()
        console.log('getPackageActivity => errMsg: ' + err)
      })
    },
    // 获取用户租户(公司)列表
    cartGetUserTenantList () {
      let field = {}
      if (this.currentCustomerInfo.user_id) field.user_id = this.currentCustomerInfo.user_id
      this.$fetch.cartGetUserTenantList(field).then(data => {
        this.userTenantInfoList = data
        if (data.length) {
          this.userTenantList = [{ key: '', value: '请输入公司名称' }].concat(data.map(item => {
            let value = item.fullname
            return { key: value, value }
          }))
          this.willChoosedTenant = true
        } else {
          this.willChoosedTenant = false
          this.userTenantInfoList = []
          this.userTenantList = []
        }
        // 为客户开店
        if (this.openType === '1') {
          this.company_name = ''
          this.short_name = ''
          this.domain = ''
          if (!data.length) {
            this.company_name = this.currentCustomerInfo.cus_name
            this.onlyWatch = false
            this.editDomain = true
          }
        }
        this.requestNum++
      }).catch(err => {
        this.$loading()
        console.log('cartGetUserTenantList => errMsg: ' + err)
      })
    },
    // 代理商角色时，需要的部分 start========================
    // 代理商客户列表
    customerList () {
      this.$fetch.customerList().then(({ customer_list }) => {
        if (customer_list.length) {
          this.userCustomerList = customer_list.map(item => ({ key: item.user_id, value: item.cus_name }))
        } else {
          this.userCustomerList = []
        }
        this.requestNum++
      }).catch(err => {
        this.$loading()
        console.log('customerList => errMsg: ' + err)
      })
    },
    // 获取代理商可设置折扣
    customerCustomerDiscountList () {
      this.$fetch.customerCustomerDiscountList().then(data => {
        if (data.length) {
          this.userCustomerDiscountList = data.map(item => {
            let value = ''
            if (typeof item === 'string' && item.indexOf('折') > -1) {
              value = item
            } else {
              if (Number(item) / 10 === 10) {
                value = '不打折'
              } else {
                value = (Number(item) / 10) + '折'
              }
            }
            return { key: item, value }
          })
        } else {
          this.userCustomerDiscountList = []
        }
        this.requestNum++
      }).catch(err => {
        this.$loading()
        console.log('customerCustomerDiscountList => errMsg: ' + err)
      })
    },
    // 代理商角色时，需要的部分 end========================
    // 获取所有套餐版本
    getProduct () {
      this.$fetch.getProduct().then(data => {
        // 新开门店
        if (!sessionStorage.editStore) {
          this.stores[0].product_id = parseInt(data[0].product_id)
        }
        // 从服务购买页面过来
        if (sessionStorage.product_id) {
          this.stores[0].product_id = parseInt(sessionStorage.product_id)
          this.stores[0].content = data.find(val => {
            return parseInt(sessionStorage.product_id) === val.product_id
          }).content
        }
        // 如果以上未给第一个门店套餐或者携带的product_id不正确，那么默认第一个套餐（为客户开店的情况）
        if (Object.keys(this.stores[0]).indexOf('product_id') < 0 || this.stores[0]['product_id'] === '') {
          this.stores[0]['product_id'] = parseInt(data[0]['product_id'])
        } else {
          // 携带的product_id不在data版本中
          let products = data.map(item => item.product_id)
          if (products.indexOf(this.stores[0]['product_id']) < 0) {
            this.stores[0]['product_id'] = parseInt(products[0])
          }
        }
        this.productList = data
        this.requestNum++
        this.getDuration()
      }).catch(err => {
        this.$loading()
        console.log('getProduct => errMsg: ' + err)
      })
    },
    // 获取所有开通时长
    getDuration () {
      this.$fetch.getDuration().then(data => {
        this.durationList = []
        for (let k in data) this.durationList.push({ key: parseInt(k), value: data[k] })
        if (!this.stores[0].duration) this.stores[0].duration = this.durationList[0].key
        this.requestNum++
        this.getPrice(this.stores[0])
      }).catch(err => {
        this.$loading()
        console.log('getDuration => errMsg: ' + err)
      })
    },
    // 时长、套餐点击选中事件
    itemChoosed (i, key, j, product = {}) {
      if (String(key) === 'product_id' && product.product_code === 'group') {
        let customer_phone = this.userInfo.customer_phone ? this.userInfo.customer_phone : '0755-36564131'
        let content = '如需购买集团版套餐，请联系您的专属服务人员，专属热线：' + customer_phone
        this.popupContent = content
        this.popupShow = true
      } else {
        if (i[key] !== j) {
          i[key] = j
          this.getPrice(i)
        }
      }
    },
    // 新增一个门店
    addStore (i) {
      let j = JSON.parse(JSON.stringify(i))
      j.store_name = ''
      this.stores.push(j)
    },
    // 获取一个门店的市场价格和优惠价格
    getPrice (i) {
      if (!i.product_id || !i.duration) return false
      let user_id = this.currentCustomerInfo.user_id
      this.priceLoading = i.priceLoading = 0
      let params = {
        open_type: this.openType,
        user_id: user_id,
        duration_id: i.duration + '',
        product_id: i.product_id,
        purchase_function: {}
      }
      if (this.openType === '1') {
        let _discount = this.currentCustomerDiscount === '' ? '100' : this.currentCustomerDiscount
        params.discount = _discount + ''
        // params.purchase_function = {}
      }
      this.$fetch.getPrice(params).then(data => {
        i.market_price = data.market_price
        i.agent_price = data.agent_price
        i.product_price = data.product_price
        i.decrease_amount = data.decrease_amount
        i.agent_profit = data.agent_profit
        i.activity_content = data.activity_content
        this.priceLoading = i.priceLoading = 1
      }).catch(err => {
        this.$toast(err)
        this.$loading()
        console.log('getPrice => errMsg : ' + err)
      })
    },
    // 获取会员过滤域名
    getFilterDomain () {
      this.$fetch.getFilterDomain().then(data => {
        this.filterDomain = data
        this.requestNum++
      }).catch(err => {
        this.$loading()
        console.log('getFilterDomain => errMsg: ' + err)
      })
    },
    // 根据公司简称获取域名
    getDomainFun () {
      let company_name = this.short_name.trim()
      if (company_name) {
        this.$fetch.cartCreateDomain({ company_name }).then(data => {
          this.filterDomainFun(data.domain)
        })
      }
    },
    // 域名输入时，过滤掉www、com等其他字符
    filterDomainFun (value) {
      let pattern = new RegExp("[`.~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_-]")
      let specialStr = ''
      if (value && value.length) {
        for (let i = 0; i < value.length; i++) specialStr += value.substr(i, 1).replace(pattern, '')
        let str = ['www', 'com', 'http', 'console', 'admin', 'agent']
        for (let i of str) specialStr = specialStr.replace(i, '')
      }
      this.domain = specialStr
      this.isFilterDomain(specialStr)
    },
    // 域名输入框，失去焦点，判断域名是否为过滤域名
    isFilterDomain (value) {
      let flag = this.filterDomain.find(val => {
        return val === value
      })
      if (flag) {
        return this.$toast('该域名已被使用')
      }
    },
    // 加入购物车或立即购买接口，根据is_buyNow来判断，1:立即购买;0:加入购物车
    addShopCart (is_buyNow) {
      // isBuy判断用户信息是否全部输入，-1：全部输入了
      if (!this.company_name) {
        this.$toast('请填写公司名称')
        return
      }
      if (!this.short_name) {
        this.$toast('请填写公司简称')
        return
      }
      this.domain = this.domain.replace('.' + this.threeDomain, '')
      // 域名校验
      if (!this.domain) {
        this.$toast('请输入域名')
        return
      } else if (!(/^[0-9a-z]{5,}$/.test(this.domain))) {
        this.$toast('域名至少有5个字符，可以是全小写字母和数字，或者是小写字母和数字的组合')
        return
      }
      let usedDomain = this.filterDomain.find(val => {
        return val === this.domain
      })
      if (usedDomain) {
        return this.$toast('该域名已被使用，请换一个试试')
      }
      if (this.isBuy === -1) {
        // 为自己开店
        if (Number(this.openType) === 0) {
          this.$loading(is_buyNow ? '立即购买...' : '加入购物车...')
          let param = {
            is_buyNow,
            company_name: this.company_name,
            short_name: this.short_name,
            domain: this.domain,
            item: this.stores
          }
          // 先判断域名是否存在
          this.$fetch
            .checkDomain('&domain=' + param.domain + '&company_name=' + param.company_name)
            .then(({ domain_exist }) => {
              if (domain_exist) {
                this.$loading()
                this.$toast('该域名已被使用，请换一个试试')
              } else {
                // 加入到购物车接口
                this.$fetch.addCart(param).then(() => this.$router.push(is_buyNow ? 'store_checkOrder' : 'store_shopCart'))
              }
            }).catch(err => console.log('checkDomain => errMsg: ', err))
        } else if (Number(this.openType) === 1) { // 为客户开店
          this.$loading('立即购买...')
          this.$fetch
            .checkDomain(
              '&domain=' + this.domain + '&company_name=' + this.company_name + '&user_id=' + this.currentCustomerInfo.user_id
            )
            .then(({ domain_exist }) => {
              if (domain_exist) {
                this.$loading()
                this.$toast('该域名已被使用，请换一个试试')
              } else {
                let _stores = this.stores
                _stores.map(val => {
                  val.duration_name = this.durationList.find(v => v.key === val.duration)
                  val.product_name = this.productList.find(v => {
                    return v.product_id === val.product_id
                  }).product_name
                })
                // 直接跳转到结算页面，通过sessionStorage传值
                let _discount = this.currentCustomerDiscount === '' ? '100' : this.currentCustomerDiscount
                let settlement = {
                  total_price: this.total_agent_price,
                  cus_user_id: this.currentCustomerInfo.user_id,
                  discount: _discount + '',
                  cart_info: [
                    {
                      company: this.company_name,
                      domain: this.domain,
                      short_name: this.short_name,
                      store_list: _stores
                    }
                  ]
                }
                sessionStorage.settlement = JSON.stringify(settlement)
                this.$router.push('store_checkOrder')
              }
            })
        }
      } else {
        this.$refs['name' + this.isBuy][0].focus()
        this.$refs['name' + this.isBuy][0].blur()
        this.$refs['name' + this.isBuy][0].focus()
      }
    },
    // 保存修改按钮，将数据保存到购物车
    saveToCar () {
      if (!this.company_name) {
        this.$toast('请填写公司名称')
        return
      }
      if (!this.short_name) {
        this.$toast('请填写公司简称')
        return
      }
      this.$loading('保存到购物车...')
      this.domain = this.domain.replace('.' + this.threeDomain, '')
      this.editStore.company_name = this.company_name
      this.editStore.short_name = this.short_name
      this.editStore.domain = this.domain
      let parmasObj = { ...this.stores[0], ...this.editStore }
      this.$fetch
        .checkDomain('&domain=' + parmasObj.domain + '&company_name=' + parmasObj.company_name + '&scenario=edit')
        .then(({ domain_exist }) => {
          if (domain_exist) {
            this.$loading()
            this.$toast('该域名已被使用')
          } else this.$fetch.cartEdit(parmasObj).then(() => this.$router.go(-1))
        }).catch(err => console.log('checkDomain => errMsg:', err))
    }
  },
  activated () {
    this.$loading('加载新开门店...')
    this.navOpen = false
    // isSetUserRank=='2'设置折扣
    this.isSetUserRank = '0'
    // 当前客户和折扣
    this.currentCustomer = ''
    this.currentCustomerDiscount = ''
    // 初始化租户
    this.company_name = ''
    this.short_name = ''
    this.domain = ''
    // 当前租户
    this.currentTenant = ''
    // 默认租户可输入，可选择
    this.onlyWatch = false
    this.editDomain = true
    this.willChoosedTenant = true
    // 开店类型默认为自己开店
    this.openType = '0'
    // 初始化门店数据
    let [store] = this.storeModel
    for (let [key, val] of Object.entries(store)) {
      if (typeof val === 'object') {
        if (Array.isArray(val)) store[key] = []
        else store[key] = {}
      } else if (typeof val === 'number') {
        store[key] = 0
      } else {
        store[key] = ''
      }
    }
    this.stores = [store]
    // 初始化编辑来源
    this.editStore.source = ''
    // 三级域名
    this.threeDomain = sessionStorage.threeDomain || ''
    if (sessionStorage.editStore) { // 从购物车过来 或者 我的门店过来
      this.editStore = JSON.parse(sessionStorage.editStore)
      // 从购物车或者我的门店过来的
      // 携带门店信息
      this.stores = this.editStore.store_list || []
      if (!this.stores.length) {
        this.stores = [store]
      }
      // 携带租户信息
      this.company_name = this.editStore.company || ''
      this.short_name = this.editStore.short_name || ''
      if (this.editStore.domain) {
        this.domain = this.editStore.domain.replace('.' + this.threeDomain, '')
        this.editDomain = false
        this.onlyWatch = true
      } else {
        this.editStore.domain = ''
        this.editDomain = true
        this.onlyWatch = false
      }
      // 从客户列表(开店)过来
      // 携带客户信息
      this.openType = this.editStore.openType || '0'
      let [x, y] = this.openTypesModel
      if (Number(this.openType) === 1) {
        this.openTypes = [x, y]
        let cus_name = this.editStore.customer.cus_name
        let user_id = this.editStore.customer.user_id
        this.currentCustomerInfo = { cus_name, user_id }
        this.currentCustomer = user_id
      } else {
        this.openTypes = [x]
        this.currentCustomerInfo = { cus_name: '', user_id: '' }
        this.currentCustomer = ''
        this.currentTenant = this.company_name
        // 不可选租户
        this.willChoosedTenant = false
      }
    }
    // 获取用户信息
    this.accountGetUserInfo()
  },
  deactivated () {
    this.requestNum = 0
    this.openType = '0'
    delete sessionStorage.editStore
    delete sessionStorage.product_id
  }
}
</script>
