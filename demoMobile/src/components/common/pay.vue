/*
 * @Author: 陈航
 * @Date: 2018-09-05 09:32:54
 * @Last Modified time: 2018-10-12 10:04:37
 * @说明：余额支付、微信支付、支付宝支付--组件
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.borderTopUi(@color:#d9d9d9){
  content:'';
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:0;
  border-top: 1px solid #D9D9D9;
  color: @color;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.wrapper {
  padding: 3vw 0 6vw;
  // background-color: #fff;
  font-size: @f7;
  .user_money {
    margin: 6vw 15px;
    .blue {
      padding: 0 8vw;
    }
    .enough {
      margin-top: 1.5vw;
      font-size: @f6;
    }
  }
  .btnWarp {
    padding-top: 6vw;
    text-align: center;
    .gopay-input-wrapper{
      .flexUi;
      margin-left:20px;
      label{
        font-size:@f7;
        margin-right:0.8em;
        color:@6;
      }
      input{
        display: inline-block;
        padding:0;
        border:0;
        font-size:@f7;
        &:focus{
          border: 0;
          outline: 0;
        }
      }
    }
    .gopay-btn-wrapper{
      margin-top: 6vw;
    }
  }
  .balanceWrap{
    position: relative;
    &:before{
      .borderTopUi;
    }
  }
  .qrcode{
    text-align:center;
    p{
      width: 45vw;
      margin: 0 auto;
      margin-bottom:3vw;
      font-size:@f5;
    }
    img{
      width:40vw;
      height:40vw;
    }
  }
  .borderTop{
    position: relative;
    &:before{
      .borderTopUi;
    }
  }
}
</style>
<template>
  <div class="wrapper" :style="{'background-color':bgColor}">
    <!-- 支付方式 -->
    <checklist class="pay" :title="pay_method_title" :options="payMethod" label-position="right" required :max="1" :min="1" v-model="methoded" @on-change="orderPayMethod"></checklist>
    <!-- 余额支付 -->
    <template v-if="order_sn && pay_request">
      <div class="btnWarp balanceWrap" v-if="methoded[0]==='available'">
        <div class="gopay-input-wrapper">
          <label>支付密码</label>
          <input type="password" ref="payPassword" v-model="pay_password" placeholder="请输入支付密码" required autocomplete="off">
        </div>
        <div class="gopay-btn-wrapper">
          <x-button class="w50" :type="methoded[0]?'primary':'default'" @click.native="goPay">立即支付</x-button>
        </div>
      </div>
      <!-- 微信支付 -->
      <div class="btnWarp borderTop" v-if="methoded[0]==='wechat'">
        <x-button class="w50" type="primary"  @click.native="wxPay">立即支付</x-button>
      </div>
      <!-- 支付宝支付 -->
      <!-- <div class="btnWarp borderTop qrcode" v-if="methoded[0]==='zhifubao'">
        <template v-if="!zfbBrowser">
          <p>长按二维码，识别二维码后进入支付宝完成支付</p>
          <img v-if="pay_url" :src="pay_url"/>
        </template>
        <x-button v-else class="w50" type="primary" @click.native="zfbPay">立即支付</x-button>
      </div> -->
    </template>
    <p style="text-align:center;" v-else>
      <inline-loading></inline-loading>
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;加载中...</span>
    </p>
    <div v-transfer-dom>
      <confirm v-model="showConfirm"
      title="余额支付"
      @on-confirm="onConfirm">
        <p style="text-align:center;">您尚未设置支付密码，请先设置。</p>
      </confirm>
    </div>
  </div>
</template>
<script>
import { Checklist, XButton, XInput, Group, InlineLoading, Confirm, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: { Checklist, XButton, XInput, Group, InlineLoading, Confirm },
  props: ['bgColor', 'order_sn', 'enough', 'wxRouter', 'zfbRouter', 'balanceRouter'],
  data() {
    return {
      // 支付方式标题
      pay_method_title: '选择支付方式',
      // 支持的支付方式
      supportedPayMethod: [
        {
          key: 'wechat',
          name: '微信',
          icon: 'icon-weixin',
          color: '#13bf4c'
        },
        {
          key: 'available',
          name: '余额',
          icon: 'icon-available',
          color: '#e52e2e'
        }
        // ,{
        //   key: 'zhifubao',
        //   name: '支付宝',
        //   icon: 'icon-zhifubao',
        //   color: '#1a97e3'
        // }
      ],
      // 支付方式(传入checklist)
      payMethod: [],
      // 选中的支付方式
      methoded: [''],
      // 支付链接
      pay_url: '',
      // 是否设置过密码
      isExist: sessionStorage.isExist === '1',
      // 支付密码
      pay_password: '',
      // 支付信息
      jsApiParameters: null,
      // 是否是支付宝浏览器
      zfbBrowser: false,
      // 是否完成支付请求，微信、支付宝支付需要请求到链接在显示页面
      pay_request: false,
      // 是否显示余额支付
      showConfirm: false
    }
  },
  watch: {
    order_sn(newVal) {
      this.initPayMethod(this.enough)
    },
    enough(newVal) {
      this.initPayMethod(this.enough)
    }
  },
  methods: {
    // 余额充足的话，那么增加余额支付方式
    initPayMethod(bool) {
      // 是否支持余额支付
      if (bool) {
        if (this.supportedPayMethod.length === 1) {
          this.supportedPayMethod.push({
            key: 'available',
            name: '余额',
            icon: 'icon-available',
            color: '#e52e2e'
          })
        }
      } else {
        if (this.supportedPayMethod.length === 2) {
          this.supportedPayMethod.pop()
        }
      }
      this.$set(this.methoded, 0, this.supportedPayMethod[0].key)
      this.payMethod = this.supportedPayMethod.map(val => {
        return {
          key: val.key,
          value: `<div style="color:${val.color}"><i class="iconfont ${val.icon}"></i> ${val.name}</div>`
        }
      })
    },
    // 支付宝、微信支付、余额支付
    orderPayMethod() {
      this.pay_url = ''
      this.pay_request = false
      // 清除订单购买请求
      this.wxTimerEnd()
      this.zfbTimerEnd()
      if (this.methoded[0] === 'wechat') {
        this.wxpayBefore()
      } else if (this.methoded[0] === 'zhifubao') {
        this.zfbPayBefore()
      } else {
        this.pay_request = true
        this.$nextTick(() => {
          this.goPayBefore()
          this.$refs.payPassword.focus()
        })
      }
    },
    // 获取微信支付链接
    wxpayBefore() {
      if (!this.order_sn) return false
      // 微信浏览器已授权的话获取jsApi支付信息，其他浏览器获取h5支付链接
      if (this.$isWxBrowser()) {
        if (localStorage.wxOpenId) {
          this.$fetch.payWxJsPay({ order_sn: this.order_sn, openId: localStorage.wxOpenId }).then(data => {
            this.pay_request = true
            this.jsApiParameters = data
          }).catch(err => {
            this.$toast(err)
          })
        }
      } else {
        this.$fetch.payWxH5Pay({ order_sn: this.order_sn }).then(({ code_url }) => {
          this.pay_request = true
          this.pay_url = code_url
        }).catch(err => {
          this.$toast(err)
        })
      }
    },
    // 微信浏览器获取jsApi支付
    callWxPay() {
      if (typeof WeixinJSBridge !== 'undefined') {
        if (window.addEventListener) {
          window.addEventListener('WeixinJSBridgeReady', this.jsApiCall(), false)
        } else if (window.attachEvent) {
          window.attachEvent('onWeixinJSBridgeReady', this.jsApiCall())
        } else {
          this.jsApiCall()
        }
      } else {
        this.jsApiCall()
      }
    },
    // 微信浏览器唤起支付操作及回调结果
    jsApiCall() {
      let that = this
      let params = this.jsApiParameters
      if (params.appId && WeixinJSBridge) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            'appId': params.appId,
            'timeStamp': params.timeStamp,
            'nonceStr': params.nonceStr,
            'package': params.package,
            'signType': params.signType,
            'paySign': params.paySign
          },
          function(res) {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              that.$toast('微信支付成功')
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              that.$toast('用户取消支付')
            } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
              that.$toast('网络异常，请重试')
            }
          }
        )
        sessionStorage.wxTimer = true
        that.wxTimerStart()
      } else {
        that.$toast('获取支付数据错误')
      }
    },
    // 微信支付
    wxPay() {
      // 微信浏览器已授权的话进行公众号支付，其他浏览器h5支付
      if (this.$isWxBrowser()) {
        if (localStorage.wxOpenId) {
          this.callWxPay()
        }
      } else {
        location.href = this.pay_url
        sessionStorage.wxTimer = true
        this.wxTimerStart()
      }
    },
    // 开始执行微信定时器
    wxTimerStart() {
      if (sessionStorage.wxTimer) {
        this.$fetch.payOrderPayQuery('&order_sn=' + this.order_sn).then(data => {
          if (data.trade_state === 'NOTPAY') setTimeout(() => this.wxTimerStart(), 3000)
          else {
            sessionStorage.payResultObj = JSON.stringify(data)
            sessionStorage.payType = 'wx'
            let queryString = ''
            if (sessionStorage.order_type) {
              queryString += '?order_type=' + sessionStorage.order_type
              if (sessionStorage.cus_user_id) queryString += '&cus_user_id=' + sessionStorage.cus_user_id
            } else if (sessionStorage.cus_user_id) {
              queryString += '?cus_user_id=' + sessionStorage.cus_user_id
            }
            this.$router.push(this.wxRouter || '/main/store_payResult' + queryString)
          }
        })
      }
    },
    // 关闭微信定时器
    wxTimerEnd() {
      sessionStorage.wxTimer = ''
    },
    // 获取支付宝支付二维码
    zfbPayBefore() {
      if (!this.order_sn) return false
      if (!this.zfbBrowser) {
        this.zfbImg = ''
        this.$fetch.alipay({ order_sn: this.order_sn }).then(({ code_url }) => {
          this.pay_request = true
          let imgEl = new Image()
          imgEl.src = code_url
          imgEl.onload = () => {
            this.pay_url = code_url
            sessionStorage.zfbTimer = true
            this.zfbTimerStart()
          }
        })
      } else {
        if (this.$route.query.buyerId === undefined) {
          this.$fetch.payGetBuyerId('order_sn=' + this.order_sn).then(data => {
            window.location.href = data
          })
        } else {
          this.$fetch.payAlipayJsPay({ order_sn: this.order_sn }).then(data => {
            this.pay_request = true
            this.jsApiParameters = data
          })
        }
      }
    },
    // 支付宝支付
    zfbPay() {
      let params = this.jsApiParameters
      if (params.trade_no) {
        // 使用支付宝统一下单支付接口，则直接使用jsApi唤起支付宝支付
        ap.tradePay({
          tradeNO: params.trade_no
        }, function(res) {
          // ap.alert(res.resultCode)
        })
        sessionStorage.zfbTimer = true
        this.zfbTimerStart()
      } else {
        this.$toast('获取支付数据错误')
      }
    },
    // 开始执行支付宝定时器
    zfbTimerStart() {
      if (sessionStorage.zfbTimer) {
        this.$fetch.payOrderPayQuery('&order_sn=' + this.order_sn).then(data => {
          if (data.trade_state === 'NOTPAY') setTimeout(() => this.zfbTimerStart(), 3000)
          else {
            sessionStorage.payResultObj = JSON.stringify(data)
            sessionStorage.payType = 'zfb'
            let queryString = ''
            if (sessionStorage.order_type) {
              queryString += '?order_type=' + sessionStorage.order_type
              if (sessionStorage.cus_user_id) queryString += '&cus_user_id=' + sessionStorage.cus_user_id
            } else if (sessionStorage.cus_user_id) {
              queryString += '?cus_user_id=' + sessionStorage.cus_user_id
            }
            this.$router.push(this.zfbRouter || '/main/store_payResult' + queryString)
          }
        })
      }
    },
    // 关闭支付宝定时器
    zfbTimerEnd() {
      sessionStorage.zfbTimer = ''
    },
    // 确定设置支付密码
    onConfirm() {
      this.$router.push('safe_payPwd')
    },
    // 余额支付之前校验
    goPayBefore() {
      this.$fetch.getCheckPayPasswordExist().then(({ pay_password }) => {
        if (pay_password) {
          this.showConfirm = false
        } else {
          this.showConfirm = true
        }
      })
    },
    // 去付款事件(余额支付)
    goPay() {
      if (!this.pay_password) {
        this.$toast('请输入支付密码')
        return false
      }
      this.$loading('正在支付，请稍等...')
      this.$fetch.getCheckPayPasswordExist().then(({ pay_password }) => {
        if (pay_password) {
          this.showConfirm = false
          this.$fetch.payWalletPay({ order_sn: this.order_sn, password: this.pay_password }).then(data => {
            sessionStorage.payResultObj = JSON.stringify(data)
            sessionStorage.payType = 'wallet'
            let queryString = ''
            if (sessionStorage.order_type) {
              queryString += '?order_type=' + sessionStorage.order_type
              if (sessionStorage.cus_user_id) queryString += '&cus_user_id=' + sessionStorage.cus_user_id
            } else if (sessionStorage.cus_user_id) {
              queryString += '?cus_user_id=' + sessionStorage.cus_user_id
            }
            this.$router.push(this.balanceRouter || '/main/store_payResult' + queryString)
          }).catch(msg => {
            this.$loading()
            this.$toast(msg)
          })
        } else {
          this.$loading()
          this.showConfirm = true
        }
      }).catch(err => {
        this.$loading()
        console.log('errMsg: getCheckPayPasswordExist => ' + err)
      })
    }
  },
  activated() {
    // 是否是支付宝浏览器
    this.showConfirm = false
    this.pay_password = ''
    let userAgent = window.navigator.userAgent
    if (userAgent.includes('AlipayClient')) {
      this.zfbBrowser = true
    }
  },
  deactivated() {
    // 结束微信和支付宝定时器
    this.wxTimerEnd()
    this.zfbTimerEnd()
  }
}
</script>
