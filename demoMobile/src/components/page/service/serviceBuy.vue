/*
 * @Author: 陈航
 * @Date: 2018-09-17 14:35:55
 * @Last Modified by: 陈航
 * @Last Modified by: 闫龙飞
 * @说明：服务购买
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  justify-content: @justify;
  align-items: @align;
}
.all {
  font-size: @f7;
  margin-bottom: 20vw;
  .red {
    color: #e52e2e;
  }
  .c3 {
    color: #333;
  }
  .c6 {
    color: #666;
  }
  .c9 {
    color: #999;
  }
  h3 {
    font-size: @f8;
    font-weight: 400;
    margin: 4vw;
    padding-left: 2vw;
    border-left: solid 4px @blue;
  }
  .packageUl {
    .flexUi;
    flex-wrap: wrap;
    li {
      .flexUi;
      width: 100%;
      height: max-content;
      padding: 4vw;
      background-color: #fafafa;
      box-sizing: border-box;
      margin-bottom: 1rem;
      .left {
        margin-right: 4vw;
        min-width: max-content;
        text-align: center;
        img {
          width: 15vw;
          height: auto;
        }
        p {
          margin-top: 3vw;
          font-size: @f7;
          color: #333;
        }
      }
      .right {
        color: #666;
        p {
          .flexUi(first-start, baseline);
          span {
            line-height: 0.8rem;
          }
        }
      }
    }
    li:last-child {
      margin-bottom: 0;
    }
  }
  .serviceUl {
    .flexUi;
    flex-wrap: wrap;
    li {
      width: 100%;
      height: max-content;
      margin-bottom: 1rem;
      background-color: #fff;
      .top {
        .flexUi;
        height: max-content;
        padding: 4vw;
        background-color: #fafafa;
        .left {
          min-width: max-content;
          margin-right: 4vw;
          img {
            width: 15vw;
            height: auto;
          }
        }
        .right {
          .text {
            .name {
              margin-right: 2vw;
            }
            .count {
              font-size: @f6;
              color: #666;
              .red {
                font-size: @f7;
              }
            }
          }
          .desc {
            font-size: @f5;
            padding-top: 2vw;
            line-height: 180%;
            text-align: justify;
          }
        }
      }
      .bottom {
        padding-left: 4vw;
        margin: 4vw 0;
        .title {
          width: 15vw;
          flex: 1;
          margin-right: 3vw;
          font-size: @f6;
        }
        .line1 {
          .flexUi;
          .content {
            flex: 4;
            .flexUi;
            & > div {
              .flexUi;
              position: relative;
              margin-right: 3vw;
              .marketPrice {
                margin-right: 3vw;
                font-size: @f5;
                color: #999;
                opacity: 0;
                text-decoration: line-through;
              }
              .price {
                font-size: @f7;
                opacity: 0;
              }
              .op1 {
                opacity: 1;
              }
              .loading {
                position: absolute;
                left: 35px;
                font-size: @f12;
              }
            }
            .c9 {
              font-size: @f5;
              white-space: nowrap;
            }
            .coupon {
              display: block;
              .red {
                font-size: @f5;
              }
            }
            .song {
              margin-left: 3vw;
              padding: 1vw 2vw;
              font-size: @f5;
            }
          }
        }
        .line2 {
          .flexUi(flex-start, baseline);
          height: max-content;
          margin: 3vw 0;
          .content {
            flex: 4;
            .flexUi;
            flex-wrap: wrap;
            .btn {
              font-size: @f6;
              width: 3.6rem;
              height: 1.2rem;
              margin: 1vw 2vw 1vw 0;
              line-height: 1.2rem;
              box-sizing: border-box;
              border: 1px solid #c9c9c9;
              border-radius: 0.8vw;
              text-align: center;
              cursor: pointer;
            }
            .choosed {
              color: #1a97e3;
              border-color: currentColor;
            }
          }
        }
        .orderNow {
          background-color: #1a97e3;
          font-size: @f6;
          width: 3.6rem;
          height: 1.2rem;
          line-height: 1.2rem;
          text-align: center;
          color: #fff;
          border-radius: 0.8vw;
          margin-left: calc(~"22vw - 1px");
          margin-left: -webkit-calc(~"22vw - 1px");
        }
      }
    }
  }
}
</style>
<template>
  <div class="all">
    <!-- <template v-if="serviceFromSession===false">
      <h3>套餐列表</h3>
      <ul class="packageUl">
        <li v-for="i in product" :key="i.product_id" @click="packageBuy(i)">
          <div class="left">
            <img class="computerImg" :src="uploadHost+i.image">
            <p>{{i.product_name}}</p>
          </div>
          <div class="right" v-html="i.desc"></div>
        </li>
      </ul>
    </template> -->
    <h3>服务购买</h3>
    <header-basic title="服务购买"></header-basic>
    <Group>
      <!--  :defaultData='companyList' -->
      <!-- <div v-if="shouPicker"> -->
      <PopupPicker v-model="selectNeme"
                   title="选择公司"
                   :show.sync="shouPicker"
                   :data='companyList'
                   :show-name='true'
                   @on-change="selectCurrentName"
                   :placeholder="dataPlaceholder">
      </PopupPicker>
      <!-- </div> -->
    </Group>
    <ul class="serviceUl">
      <li v-for="(i,index) in service"
          :key="index"
          class="c3">
        <div class="top">
          <div class="left">
            <img v-if="i.image_url"
                 :src="uploadHost+i.image_url">
            <img v-else
                 src="../../../assets/image/serviceIcon.png"
                 alt="">
          </div>
          <div class="right">
            <div class="text">
              <span class="name">{{i.service_name}}</span>
              <span class="count">{{i.service_name | formartName}}剩余
                <span class="red">{{i.num}}</span> 条
              </span>
            </div>
            <p class="desc"
               v-html="i.content"></p>
          </div>
        </div>
        <div class="bottom">
          <div class="line1">
            <span class="title">服务价格</span>
            <div class="content">
              <div>
                <span class="marketPrice"
                      :class="{op1:i.price_info.shop_price}">{{$f(i.price_info.market_price)}}</span>
                <span class="red price"
                      :class="{op1:i.price_info.shop_price}">{{$f(i.price_info.shop_price)}}</span>
                <inline-loading v-show="!i.price_info.shop_price"
                                class="loading"></inline-loading>
              </div>
              <div class="coupon">
                <span class="c9">({{$f(i.price_info.unit_price)}}/{{i.unit_name}})</span>
              </div>
            </div>
          </div>
          <div class="line1"
               v-if="i.price_info.activity_content"
               style="margin-top:1vw;">
            <span class="red"
                  style="margin-left:21vw;font-size:0.5rem;">{{i.price_info.activity_content}}</span>
          </div>
          <div class="line2">
            <span class="title">订购条数</span>
            <div class="content">
              <div class="btn"
                   :class="{choosed:i.priceChoosed===j.service_price_id}"
                   v-for="(j,_i) in i.price_mode"
                   :key="_i"
                   @click="serviceServicePrice(i,j)">{{j.count}}{{i.unit_name}}</div>
            </div>
          </div>
          <div class="orderNow"
               @click="nowBuy(i)">立即订购</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { InlineLoading, PopupPicker, Group, Actionsheet } from 'vux'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { InlineLoading, PopupPicker, Group, headerBasic, Actionsheet },
  data () {
    return {
      // 数据是否来自sessionStorage.serviceObj
      serviceFromSession: false,
      // 图片前缀
      uploadHost: '',
      // 套餐数据
      product: null,
      // 服务数据
      service: [],
      // 会员服务数量
      serviceCount: null,
      // 服务价格
      price: [],
      // 请求数量
      requestNum: 0,
      // 选择的公司名称
      selectNeme: [],
      // 选择公司的列表
      companyList: [[]],
      defaultName: [[{
        name: '默认数据',
        value: ''
      }]],
      dataPlaceholder: '请输入公司名称',
      shouPicker: false
    }
  },
  watch: {
    requestNum (val) {
      if (val === 4) this.$loading()
    }
  },
  filters: {
    formartName (val) {
      return val.split('服')[0]
    }
  },
  // mounted () {
  //   // 获取公司列表
  //   this.getCurrentList()
  // },
  // updated () {
  //   // this.shouPicker = true
  // },
  methods: {
    // 获取公司列表
    getCurrentList () {
      this.selectNeme = []
      this.companyList = []
      this.$fetch.getTenantList().then(data => {
        // 数据格式转换
        let companyList = data.list.map(item => {
          return { name: item.fullname, value: item.tenant_id }
        })
        this.requestNum++
        this.companyList = [companyList]
        // this.selectNeme = [this.companyList[0][0].name]
        // console.log(this.companyList[0][0].name, this.selectNeme)
        if (sessionStorage.serviceObj) {
          this.myservice()
          this.shouPicker = false
        } else {
          this.shouPicker = true
          this.dataPlaceholder = '请输入公司名称'
        }
      }).catch(err => {
        this.$loading()
        console.log('getPackageActivity => errMsg: ' + err)
      })
    },
    // 公司选择
    selectCurrentName () {
      sessionStorage.tenant_id = this.selectNeme
    },
    // 我的服务页面公司id
    myservice () {
      let companyList = this.companyList[0]
      let serverObj = JSON.parse(sessionStorage.serviceObj)
      let tenantID = serverObj.tenant_id
      let tenantItem = companyList.filter(item => Number(item.value) === Number(tenantID))
      // sessionStorage.tenant_id = serverObj.tenant_id
      this.dataPlaceholder = tenantItem[0].name
    },
    // 获取套餐
    getProduct () {
      this.$fetch.getProduct().then(data => {
        this.product = data
        this.requestNum++
      })
    },
    // 获取服务列表
    serviceServiceList () {
      this.$fetch.serviceServiceList().then(data => {
        data.map(val => (val.priceChoosed = val.price_mode[0].service_price_id))
        // 数据来自sessionStorage.serviceObj，获取当前购买的服务
        if (sessionStorage.serviceObj) {
          let serverObj = JSON.parse(sessionStorage.serviceObj)
          data.map(item => {
            if (item.service_id === serverObj.service_id) {
              this.service.push(item)
            }
          })
        } else {
          this.service = data
        }
        this.requestNum++
      })
    },
    // 获取会员服务数量
    serviceUserServiceCount () {
      this.$fetch.serviceUserServiceCount().then(data => {
        this.serviceCount = data
        this.requestNum++
      })
    },
    // 获取服务价格
    serviceServicePrice (i, j) {
      i.priceChoosed = j.service_price_id
      i.price_info.shop_price = ''
      this.$fetch
        .serviceServicePrice({ service_id: i.service_id, service_price_id: j.service_price_id })
        .then(data => (i.price_info = data))
    },
    // 获取用户信息
    getUserInfo () {
      this.$fetch.getUserInfo().then(data => {
        // 更新用户角色
        this.$store.dispatch('CHANGE_USER_ROLE', data.user_role)
        // 图片地址
        this.uploadHost = data.host
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
        this.requestNum++
      }).catch(err => {
        this.requestNum++
        console.log('getUserInfo => errMsg:', err)
      })
    },
    // 服务 立即订购
    nowBuy (i) {
      sessionStorage.serviceOrder = JSON.stringify(i)
      this.$loading('服务订单核对...')
      this.$router.push('service_checkOrder')
    },
    // 套餐购买
    packageBuy (i) {
      sessionStorage.product_id = i.product_id
      this.$router.push('store_openStore')
    }
  },
  activated () {
    this.$loading('服务购买...')
    // 数据是否来自sessionStorage.serviceObj， 从我的服务页面或短信记录页面过来，隐藏套餐版本和服务数量以及是否已到期
    if (sessionStorage.serviceObj) {
      this.serviceFromSession = true
    } else {
      this.serviceFromSession = false
    }
    this.uploadHost = ''
    if (sessionStorage.uploadHost) {
      this.uploadHost = sessionStorage.uploadHost
    }
    this.getUserInfo()
    this.getProduct()
    this.serviceServiceList()
    this.serviceUserServiceCount()
    this.getCurrentList()
  },
  deactivated () {
    this.requestNum = 0
    this.service = []
    if (sessionStorage.serviceObj) {
      delete sessionStorage.serviceObj
    }
  }
}
</script>
