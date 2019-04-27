/*
 * @Author: 陈航
 * @Date: 2018-09-17 14:35:55
 * @Last Modified by: 陈航
 * @说明：门店升级
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
  flex-wrap: wrap;
}
.all {
  padding:12vw 4vw 15vw;
  font-size:@f6;
  // 升级
  .upgradeBox {
    // 弹窗续费详细信息部分
    padding-top:4vw;
    .contentInfo {
      & > div {
        .flexUi;
        margin-bottom: 4vw;
        &:last-child {
          margin-bottom: 0;
        }
        .left {
          text-align: right;
        }
        .label{
          width:3.5rem;
        }
        .price {
          color: #ff6c00;
        }
        // 优惠内容
        .activity_content {
          color: #ff6c00;
          border: 1px solid currentColor;
          border-radius: 4px;
        }
      }
      .duration {
        & > div {
          width:calc(~'100% - 3.5rem');
          width:-webkit-calc(~'100% - 3.5rem');
         .flexUi(flex-start);
          user-select: none;
        }
        .durationSpan {
          .flexUi(center);
          min-width: 8rem;
          line-height:1.4rem;
          box-sizing: border-box;
          border-radius: 1vw;
          border: 1px solid #d2d2d2;
          cursor: pointer;
          user-select: none;
          .line {
            width: 1px;
            height: 16px;
            margin: 0 7px;
            background-color: #d2d2d2;
          }
        }
        .shortBtn{
          width:max-content;
          padding-left:6vw;
          padding-right:6vw;
          margin:1.5vw 3vw 1.5vw 0;
        }
        .choosedSpan {
          position: relative;
          border-color: #ffba00;
          .gou {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 0;
            height: 0;
            border-bottom: 1rem solid #ffba00;
            border-left: 1rem solid transparent;
            .icon-gouxuan {
              position: absolute;
              top: 0.4rem;
              right: -1px;
              height: 0.6rem;
              line-height: 0.6rem;
              font-size: @f7;
              color: #fff;
            }
          }
        }
        .productClass {
          .flexUi();
          .durationSpan {
            margin-right: 0.8rem;
          }
          .shortBtn{
            width:max-content;
            padding-left:6vw;
            padding-right:6vw;
          }
        }
      }
    }
    .tips-content {
      font-size: @f5;
      color: #888;
    }
    .ml-label{
      margin-left: 3.5rem;
      font-size: @f5;
      text-align: justify;
    }
    .link {
      color: #ff6c00;
      cursor: pointer;
    }
    .willPay{
      margin-top:5vw;
      margin-left:3.5rem;
      width:max-content;
      background-color: @blue;
      color:#fff;
      line-height: 100%;
      padding:3vw 8vw;
      border-radius:1vw;
    }
  }
}
</style>
 <template>
  <div class="all">
    <!-- 头部导航 -->
    <header-basic title="套餐升级"></header-basic>
    <div class="upgradeBox">
      <!-- 升级购买 -->
      <div class="contentInfo" v-if="currStore.is_free">
        <div>
          <span class="left label">门店名称：</span>
          <span>{{currStore.store_name}}（{{currStore.product_name}}）</span>
        </div>
        <div class="duration" style="margin-bottom: 1vw;">
          <span class="left label">升级套餐：</span>
          <div v-if="Products" class="productClass">
            <span class="durationSpan shortBtn" :class="{choosedSpan:i.product_id===product_id}" v-for="i in Products" :key="i.product_id" @click="product_id=i.product_id,product_name=i.product_name,getPrice()">
              <span>{{i.product_name}}</span>
              <div class="gou" v-if="i.product_id===product_id">
                <i class="iconfont icon-gouxuan"></i>
              </div>
            </span>
          </div>
          <div v-else><inline-loading class="loading"></inline-loading></div>
        </div>
        <div class="duration" style="margin-bottom: 2.5vw;">
          <span class="left label">升级时长：</span>
          <div v-if="durations">
            <span class="durationSpan shortBtn" :class="{choosedSpan:key===duration}" v-for="(i,key) in durations" :key="key" @click="duration=key,getPrice()">
              <span>{{i}}</span>
              <div class="gou" v-if="key===duration">
                <i class="iconfont icon-gouxuan"></i>
              </div>
            </span>
          </div>
          <div v-else><inline-loading class="loading"></inline-loading></div>
        </div>
        <div>
          <span class="left label">升级结果：</span>
          <span>{{product_name}}</span>
        </div>
        <div class="ml-label red">有效期至{{new_expire_time}}，与当前套餐有效期一致</div>
        <div>
          <span class="left label">应付金额：</span>
          <span v-if="payMoney!==null" class="price" style="font-size:0.7rem;font-weight:bold">
            {{$f(payMoney)}}
            <span style="font-size:12px;font-weight:normal;color:#888;text-decoration:line-through;">{{$f(product_price)}}</span>
          </span>
        </div>
        <div class="ml-label">
          <!-- 引导提升等级 -->
          <span class="link" v-if="loginInfo.user_role === 11 && loginInfo.discount>loginInfo.show_top_discount && loginInfo.discount>loginInfo.all_top_discount">
            <i class="iconfont icon-huodong" style="font-size:14px"></i>
            您当前等级为{{loginInfo.rank_name}}{{loginInfo.discount==100?'不享受':('享' + (loginInfo.discount/10) + '折')}}优惠，点我<u @click="$router.push('rankPage')">提升等级</u>可获得更低折扣！
          </span>
          <!-- 引导提升最高等级 -->
          <span class="link" style="cursor:default;" v-if="loginInfo.user_role === 11 && loginInfo.discount==loginInfo.show_top_discount &&loginInfo.discount>loginInfo.all_top_discount">
            <i class="iconfont icon-huodong-copy" style="font-size:14px"></i>
            联系客服洽谈可获取更低折扣！
          </span>
          <!-- 已经是最高等级 -->
          <span class="link" style="cursor:default;" v-if="loginInfo.user_role === 11 && loginInfo.discount==loginInfo.all_top_discount">
            <i class="iconfont icon-huodong-copy" style="font-size:14px"></i>
            您当前等级为{{loginInfo.rank_name}}享{{loginInfo.discount/10}}折优惠。
          </span>
          <!-- 引导注册代理商 -->
          <a v-if="loginInfo.user_role === 1" class="link" href="http://www.yunxiyin.com/agent/index" target="_blank">
            <i class="iconfont icon-huodong" style="font-size:14px"></i>
            升级成为代理商享受更多折扣优惠
          </a>
        </div>
      </div>
      <!-- 升级 -->
      <div class="contentInfo" v-else>
        <div>
          <span class="left label">门店名称：</span>
          <span>{{currStore.store_name}}（{{currStore.product_name}}）</span>
        </div>
        <div class="duration">
          <span class="left label">升级套餐：</span>
          <div v-if="Products" class="productClass">
            <span class="durationSpan" :class="{choosedSpan:key===product_id}" v-for="(i,key) in Products" :key="key" @click="product_id=key,payMoney=i.agent_price,decreaseAmount=i.decrease_amount,product_name=i.product_name,tipsConent=i.content">
              <span class="price">{{$f(i.product_price)}}</span>
              <span class="line"></span>
              <span>{{i.product_name}}</span>
              <div class="gou" v-if="key===product_id">
                <i class="iconfont icon-gouxuan"></i>
              </div>
            </span>
          </div>
          <div v-else><inline-loading class="loading"></inline-loading></div>
        </div>
        <div class="tips-content ml-label" v-show="tipsConent!=''">{{tipsConent}}</div>
        <div>
          <span class="left label">升级结果：</span>
          <span>{{product_name}}</span>
        </div>
        <div class="red ml-label">有效期至{{currStore.expire_time}}，与当前套餐有效期一致</div>
        <div>
          <span class="left label">应付金额：</span>
          <span v-if="payMoney!==null" class="price" style="font-size:16px;font-weight:bold">{{$f(payMoney)}}</span>
          <inline-loading v-else class="loading"></inline-loading>
          <!-- 节省金额 -->
          <span v-if="decreaseAmount!==null" style="font-size:12px;margin-left:10px;color:#888;">省{{$f(decreaseAmount)}}</span>
          <inline-loading v-else class="loading"></inline-loading>
        </div>
        <div class="ml-label">
          <!-- 引导提升等级 -->
          <span class="link" v-if="loginInfo.user_role === 11 && loginInfo.discount>loginInfo.show_top_discount && loginInfo.discount>loginInfo.all_top_discount">
            <i class="iconfont icon-huodong" style="font-size:14px"></i>
            您当前等级为{{loginInfo.rank_name}}{{loginInfo.discount==100?'不享受':('享' + (loginInfo.discount/10) + '折')}}优惠，点我<u @click="$router.push('rankPage')">提升等级</u>可获得更低折扣！
          </span>
          <!-- 引导提升最高等级 -->
          <span class="link" style="cursor:default;" v-if="loginInfo.user_role === 11 && loginInfo.discount==loginInfo.show_top_discount &&loginInfo.discount>loginInfo.all_top_discount">
            <i class="iconfont icon-huodong-copy" style="font-size:14px"></i>
            联系客服洽谈可获取更低折扣！
          </span>
          <!-- 已经是最高等级 -->
          <span class="link" style="cursor:default;" v-if="loginInfo.user_role === 11 && loginInfo.discount==loginInfo.all_top_discount">
            <i class="iconfont icon-huodong-copy" style="font-size:14px"></i>
            您当前等级为{{loginInfo.rank_name}}享{{loginInfo.discount/10}}折优惠。
          </span>
          <!-- 引导注册代理商 -->
          <a v-if="loginInfo.user_role === 1" class="link" href="http://www.yunxiyin.com/agent/index" target="_blank">
            <i class="iconfont icon-huodong" style="font-size:14px"></i>
            升级成为代理商享受更多折扣优惠
          </a>
        </div>
      </div>
      <div class="willPay" @click="getPayUrl()">确认支付</div>
    </div>
  </div>
</template>
<script>
import { InlineLoading } from 'vux'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { InlineLoading, headerBasic },
  data() {
    return {
      loginInfo: { user_role: '' },
      // 请求数量
      requestNum: 0,
      // 当前升级的门店信息
      currStore: {},
      // 当前续费选择的赠送时长
      present_time: 0,
      // 版本可选数据
      Products: null,
      // 当前升级选择的版本id
      product_id: 1,
      // 当前升级选择的版本对应name
      product_name: null,
      // 应付金额
      payMoney: null,
      // 节省金额
      decreaseAmount: null,
      // 活动内容
      activity_content: '',
      // 提示内容
      tipsConent: '',
      // 获取开通时长
      durations: {},
      // 当前升级选择的时长id
      duration: null,
      // 产品价格
      product_price: 0,
      detail: {}
    }
  },
  computed: {
    new_expire_time() {
      let expire_time = this.getNewExpireTime(this.currStore.expire_time, this.duration, 0)
      return expire_time
    }
  },
  watch: {
    requestNum(val) {
      if (val === 1) {
        this.$loading()
      }
      if (val === 3) {
        this.getPrice()
      }
    }
  },
  filters: {
    formatMoney(val) {
      val = Number(val).toFixed(2)
      if (Number(val) > 1) {
        let int = val.split('.')[0]
        let float = val.split('.')[1]
        val = int.replace(/\B(?=(?:\d{3})+$)/g, ',') + '.' + float
      }
      return '¥' + val
    }
  },
  methods: {
    // 获取微信二维码、支付宝链接、订单sn
    getPayUrl() {
      let type = 2
      let params = {
        type,
        store_id: this.currStore.store_id,
        duration: this.duration,
        product_id: this.product_id
      }
      this.detail = params
      this.$fetch.rechargeUpgrade(params).then(data => {
        if (data.user_money - data.frozen_money >= this.payMoney) data.isEnough = true
        else data.isEnough = false
        data.payMoney = this.payMoney
        sessionStorage.order_sn = data.order_sn
        sessionStorage.storeRechargeOrUpgradeObj = JSON.stringify(data)
        this.$router.push('store_orderPay')
      })
    },
    // 升级购买算价
    getPrice() {
      let params = { duration_id: this.duration, product_id: this.product_id }
      this.$fetch.getPrice(params)
        .then(({ agent_price, product_price, decrease_amount, activity_content }) => {
          this.payMoney = agent_price
          this.product_price = product_price
          this.activity_content = activity_content
        })
    },
    // 获取开通时长
    getDuration() {
      this.$fetch.getDuration().then(data => {
        this.durations = data
        this.duration = Object.keys(data)[0]
        this.requestNum++
      })
    },
    // 获取开通时长
    getProduct(store_info) {
      let params = '&product_id=' + store_info.product_id
      this.$fetch.getProduct(params).then(data => {
        this.Products = data
        if (data === '') return false
        this.product_id = Object.values(data)[0]['product_id']
        this.product_name = Object.values(data)[0]['product_name']
        this.requestNum++
      })
    },
    // 显示升级
    showUpgrade() {
      let store_info = this.currStore
      if (store_info.is_free) {
        this.getDuration()
        this.getProduct(store_info)
      } else {
        let params = '&product_id=' + store_info.product_id + '&expire_time=' + store_info.expire_time + '&store_id=' + this.currStore.store_id
        this.$fetch.getProductsWithPrice(params).then(data => {
          this.Products = data
          if (data === '') return false
          this.duration = store_info.duration
          this.product_id = Object.keys(data)[0]
          this.payMoney = data[this.product_id].agent_price
          this.decreaseAmount = data[this.product_id].decrease_amount
          this.tipsConent = data[this.product_id].content
          this.product_name = data[this.product_id].product_name
        })
      }
      this.requestNum++
    },
    // 计算到期时间
    getNewExpireTime(expire_time, duration, present_time) {
      if (!expire_time) return
      function getNowFormatDate() {
        var date = new Date()
        var seperator1 = '-'
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ''
        return currentdate
      }
      var currentdate = expire_time
      if (getNowFormatDate() > expire_time) {
        currentdate = getNowFormatDate()
      }
      let _time = currentdate.split('-')
      let d = parseInt(duration) + parseInt(present_time)
      let n = parseInt(d / 12)
      if (n) {
        _time[0] = parseInt(_time[0]) + n
        d -= 12 * n
      }
      if (d) {
        _time[1] = parseInt(_time[1]) + d
        if (_time[1] > 12) {
          _time[0]++
          _time[1] -= 12
        }
        if (_time[1] < 10) _time[1] = '0' + _time[1]
      }
      return _time.join('-').split(' ')[0]
    },
    // 获取用户信息
    accountGetUserInfo() {
      this.$fetch.accountGetUserInfo().then(data => {
        this.loginInfo = data
      })
    }
  },
  activated() {
    this.$loading('套餐升级...')
    if (sessionStorage.storeInfo) this.currStore = JSON.parse(sessionStorage.storeInfo)
    this.accountGetUserInfo()
    sessionStorage.wxTimer = ''
    sessionStorage.zfbTimer = ''
    this.showUpgrade()
  },
  deactivated() {
    this.requestNum = 0
  }
}
</script>
