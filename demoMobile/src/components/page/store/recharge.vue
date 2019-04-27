/*
 * @Author: 陈航
 * @Date: 2018-09-17 14:35:55
 * @Last Modified by: 陈航
 * @说明：门店续费
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
  flex-wrap:wrap;
}
.all {
  padding:12vw 4vw 15vw;
  font-size:@f6;
  // 续费
  .RechargeBox {
    padding-top:4vw;
    // 弹窗续费详细信息部分
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
        }
      }
      .duration {
        & > div {
          width:calc(~'100% - 3.5rem');
          width:-webkit-calc(~'100% - 3.5rem');
          .flexUi;
          user-select: none;
        }
        .durationSpan {
          .flexUi(center);
          position:relative;
          min-width: 5.1rem;
          line-height:1.4rem;
          box-sizing: border-box;
          border-radius: 1vw;
          border: 1px solid #d2d2d2;
          cursor: pointer;
          user-select: none;
          margin: 1.5vw 3vw 1.5vw 0;
          .line {
            width: 1px;
            height: 16px;
            margin: 0 7px;
            background-color: #d2d2d2;
          }
          .discount{
            position:absolute;
            top:-0.4rem;
            right:-1px;
            line-height: 0.8rem;
            padding-left:0.5em;
            padding-right:0.5em;
            text-align: center;
            background-color: #ffbb00;
            color:#fff;
            font-size:@f5;
          }
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
            border-bottom: 0.8rem solid #ffba00;
            border-left: 0.8rem solid transparent;
            .icon-gouxuan {
              position: absolute;
              top: 0.3rem;
              right: -1px;
              height: 0.6rem;
              line-height: 0.6rem;
              font-size: @f6;
              color: #fff;
            }
          }
        }
        .productClass {
          .flexUi;
          .durationSpan {
            margin-right: 20px;
          }
        }
      }
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
    <header-basic title="套餐续费"></header-basic>
    <div class="RechargeBox">
      <!-- 续费 -->
      <div class="contentInfo">
        <div style="margin-bottom:2vw;">
          <span class="left label">门店名称：</span>
          <span>{{currStore.store_name}}（{{currStore.product_name}}）</span>
        </div>
        <div class="duration" style="margin-bottom:2vw;">
          <span class="left label">续费时长：</span>
          <div v-if="Durations">
            <span class="durationSpan" :class="{choosedSpan:key===duration}" v-for="(i,key) in Durations" :key="key" @click="initialize(key,i)">
              <span class="price">{{$f(i.product_price)}}</span>
              <span class="line"></span>
              <span>{{i.duration_name}}</span>
              <span v-if="i.mode_content" class="discount">{{i.mode_content}}</span>
              <div class="gou" v-if="key===duration">
                <i class="iconfont icon-gouxuan"></i>
              </div>
            </span>
          </div>
          <div v-else class="red">当前套餐无可续费时长</div>
        </div>
        <template v-if="Durations!==''">
          <div>
            <span class="left label">套餐内容：</span>
            <div>
              <span>{{currStore.product_name}}</span>
              <span style="font-size:0.5rem;margin-left:1vw;">有效期{{duration_name}}</span>
              <span class="red" style="font-size:0.5rem">（ 有效期至{{new_expire_time}}）</span>
            </div>
          </div>
          <div>
            <span class="left label">应付金额：</span>
            <span v-if="payMoney!==null" class="price" style="font-size:16px;font-weight:bold">{{$f(payMoney)}}</span>
            <!-- 节省金额 -->
            <span v-if="decreaseAmount!==null" style="font-size:12px;margin-left:10px;color:#888;">省{{$f(decreaseAmount)}}</span>
          </div>
          <div class="ml-label">
            <!-- 引导提升等级 -->
            <span class="link" v-if="userInfo.user_role === 11 && userInfo.discount>userInfo.show_top_discount && userInfo.discount>userInfo.all_top_discount">
              <i class="iconfont icon-huodong" style="font-size:14px"></i>
              您当前等级为{{userInfo.rank_name}}{{userInfo.discount==100?'不享受':('享' + (userInfo.discount/10) + '折')}}优惠，点我<u @click="$router.push('rankPage')">提升等级</u>获得更低折扣！
            </span>
            <!-- 引导提升最高等级 -->
            <span class="link" style="cursor:default;" v-if="userInfo.user_role === 11 && userInfo.discount==userInfo.show_top_discount &&userInfo.discount>userInfo.all_top_discount">
              <i class="iconfont icon-huodong" style="font-size:14px"></i>
              联系客服洽谈可获取更低折扣！
            </span>
            <!-- 已经是最高等级 -->
            <span class="link" style="cursor:default;" v-if="userInfo.user_role === 11 && userInfo.discount==userInfo.all_top_discount">
              <i class="iconfont icon-huodong-copy" style="font-size:14px"></i>
              您当前等级为{{userInfo.rank_name}}享{{userInfo.discount/10}}折优惠。
            </span>
            <!-- 引导注册代理商 -->
            <a v-if="userInfo.user_role === 1" class="link" href="http://www.yunxiyin.com/agent/index" target="_blank">
              <i class="iconfont icon-huodong" style="font-size:14px"></i>
              点我升级成为代理商享受更多折扣优惠！
            </a>
            <!-- 活动信息 -->
            <span class="activity_content" v-if="activity_content!==''">{{activity_content}}</span>
          </div>
        </template>
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
      userInfo: { user_role: 1 },
      // 请求数量
      requestNum: 0,
      // 当前续费的门店信息
      currStore: {},
      // 续费时长可选数据 4个
      Durations: null,
      // 续费时长可选数据 4个(备份数据)
      rawDurations: null,
      // 当前续费选择的时长id
      duration: null,
      // 当前续费选择的时长对应name
      duration_name: null,
      // 当前续费选择的赠送时长
      present_time: 0,
      // 应付金额
      payMoney: null,
      // 节省金额
      decreaseAmount: null,
      // 活动内容
      activity_content: '',
      // 门店购买功能
      purchaseFunciton: [],
      // 门店购买功能(备份数据)
      rawPurchaseFunciton: null,
      detail: {}
    }
  },
  computed: {
    new_expire_time() {
      let expire_time = this.getNewExpireTime(this.currStore.expire_time, this.duration, this.present_time)
      return expire_time
    }
  },
  watch: {
    requestNum(val) {
      if (val === 1) {
        this.$loading()
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
      let type = 1
      let purchased_function = []
      if (this.purchaseFunciton.length !== 0) {
        let buyModule = []
        for (let val of Object.values(this.purchaseFunciton)) {
          let buyFunction = []
          for (let _val of Object.values(val.function)) {
            if (_val.checked === 1) {
              buyFunction.push({ function_id: _val.function_id, function_type: _val.function_type })
            }
          }
          if (buyFunction.length > 0) {
            buyModule.push({ module_id: val.module_id, module_type: val.module_type, function: buyFunction })
          }
        }
        purchased_function = buyModule
      }
      let params = {
        type,
        store_id: this.currStore.store_id,
        duration: this.duration,
        product_id: this.currStore.product_id,
        purchased_function: purchased_function
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
    // 显示续费
    showRecharge() {
      this.$fetch.storePurchasedInfo({ store_id: this.currStore.store_id, with_price: 1 }).then(data => {
        this.rawPurchaseFunciton = JSON.parse(JSON.stringify(data))
        this.purchaseFunciton = data
        this.$fetch.getDurationsWithPrice({ product_id: this.currStore.product_id }).then(data => {
          if (data === '') return false
          this.rawDurations = JSON.parse(JSON.stringify(data))
          this.Durations = data
          this.getFuncitonPrice()
          this.initialize(Object.keys(data)[0], Object.values(data)[0])
        })
      })
      this.requestNum++
    },
    // 选择时长
    initialize(duration, i) {
      this.duration = duration
      this.payMoney = i.agent_price
      this.decreaseAmount = i.decrease_amount
      this.duration_name = i.duration_name
      this.activity_content = i.activity_content
      this.present_time = i.present_time
      this.getFunctionExpireTime(this.purchaseFunciton)
    },
    // 选择功能算价
    getFuncitonPrice() {
      let opfParams = this.purchaseFunciton
      let discount = Number(sessionStorage.discount) / 100
      for (let _val of Object.keys(this.Durations)) {
        let duration = _val
        let total_price = 0
        for (let _vals of Object.values(opfParams)) {
          if (_vals && _vals.function) {
            for (let val of Object.values(_vals.function)) {
              if (val.checked === 1) {
                if (val['price_list'][duration] !== undefined) total_price += Number(val['price_list'][duration])
              }
            }
          }
        }
        let agent_price = Number(this.rawDurations[duration]['agent_price']) + total_price * discount
        let product_price = Number(this.rawDurations[duration]['product_price']) + total_price
        let decrease_amount = Number(this.rawDurations[duration]['decrease_amount']) + total_price - (total_price * discount)
        this.Durations[duration]['agent_price'] = agent_price
        this.Durations[duration]['product_price'] = product_price
        this.Durations[duration]['decrease_amount'] = decrease_amount
        if (this.duration === duration) {
          this.payMoney = agent_price
          this.decreaseAmount = decrease_amount
        }
      }
      this.getFunctionExpireTime(opfParams)
    },
    // 选择功能到期时长
    getFunctionExpireTime(opfParams) {
      for (let _vals of Object.values(opfParams)) {
        let module_id = _vals.module_id
        if (_vals && _vals.function) {
          for (let val of Object.values(_vals.function)) {
            let _index = _vals.function.findIndex(_val => {
              return val.function_id === _val.function_id
            })
            if (val.expire_time !== undefined) {
              let duration = 0
              let expire_time = this.rawPurchaseFunciton[module_id]['function'][_index]['expire_time']
              if (val.checked === 1) duration = this.duration
              val.expire_time = this.getNewExpireTime(expire_time, duration, 0)
            }
          }
        }
      }
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
        this.userInfo = data
      })
    }
  },
  activated() {
    this.$loading('套餐续费...')
    if (sessionStorage.storeInfo) this.currStore = JSON.parse(sessionStorage.storeInfo)
    sessionStorage.wxTimer = ''
    sessionStorage.zfbTimer = ''
    this.showRecharge()
    this.accountGetUserInfo()
  },
  deactivated() {
    this.requestNum = 0
  }
}
</script>
