/*
 * @Author: 陈航
 * @Date: 2018-09-17 14:35:55
 * @Last Modified by: 陈航
 * @说明：我的服务
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.service {
  padding-top:12vw;
  padding-bottom:20vw;
  .vux-search-fixed-wrapper{
    position:fixed;
    top:calc(~'24px + 12vw');
    top:-webkit-calc(~'0px + 12vw');
    left:0;
    width:100%;
    height:44px;
    z-index:899;
    background-color: #EFEFF4;
    font-size: @f7;
    line-height: 28px;
  }
  .serviceList {
    font-size: @f7;
    padding-top:calc(~'24px + 12vw');
    padding-top:-webkit-calc(~'0px + 12vw');
    li{
      background-color: #fff;
      margin-bottom: 4vw;
      padding:2vw 4vw;
      .top{
        .flexUi(space-between);
        padding:1vw 0;
        .left{
          .sub{
            font-size:@f6;
          }
        }
      }
      .middle{
        .flexUi(space-between);
        padding:1vw 0;
        font-size:@f5;
        color:@6;
      }
      .bottom {
        padding-top:2vw;
        font-size:@f6;
        line-height: 150%;
        text-align: justify;
        span {
          margin-right:3vw;
        }
      }
    }
  }
}
</style>
<template>
  <!-- 我的服务 -->
  <div class="service">
    <!-- 头部导航 -->
    <header-basic title="我的服务"></header-basic>
    <!-- 搜索框 -->
    <div class="vux-search-fixed-wrapper" v-if="myService.count">
      <search v-model="tenant_name" @on-submit="searchService"  @on-blur="searchService" @on-clear="searchService" ref="search" placeholder = "输入公司名称"></search>
    </div>
    <template>
      <ul class="serviceList" v-if="myService.count">
        <li v-for="(i,j) in myService.user_service" :key="j">
          <div class="top">
              <p class="left">{{i.service_name}}</p>
              <p class="right">{{i.status}}</p>
            </div>
            <div class="middle">
              <p class="left">公司名称：{{i.tenant_name}}</p>
              <p class="right">余量：{{i.num + i.unit_name}}</p>
            </div>
            <div class="bottom">
              <span class="blue" @click="toOneBuyRecord(i)">订购记录</span>
              <span class="green" @click="toServiceBuyAgain(i)">再次购买</span>
              <span class="orange" v-if="i.service_code ==='service_sms'" @click="toSmsRecord(i)">发送记录</span>
            </div>
        </li>
      </ul>
      <no-data v-else :tips="tips" position="static"></no-data>
      <!-- 加载更多 -->
      <load-more v-show="myService.user_service && myService.user_service.length" :show-loading="loadMoreStatus" :tip="loadMoreMsg" background-color="#fbf9fe"></load-more>
    </template>
  </div>
</template>
<script>
import { Cell, Group, Search, LoadMore } from 'vux'
import headerBasic from '@/components/common/headerBasic'
import noData from '@/components/common/noData'
export default {
  components: { noData, Cell, Group, headerBasic, Search, LoadMore },
  data() {
    return {
      // 服务列表
      myService: { user_service: [], count: 0 },
      // 公司名称
      tenant_name: '',
      // 图片域名
      uploadHost: sessionStorage.uploadHost,
      // 没有数据
      tips: '我的服务',
      // 每页数据条数
      pageSize: 6,
      // 当前导航条数
      currTotalCount: 0,
      // 当前页数
      currPage: 1,
      // 保存函数LoadMore的指针
      loadMoreFun: null,
      // 是否正在加载
      loadMoreStatus: false,
      // 加载更多：正在加载 ；我是有底线的；加载更多
      loadMoreMsg: '加载更多'
    }
  },
  methods: {
    // 检索我的服务
    searchService() {
      this.$nextTick(() => {
        this.currPage = 1
        this.currTotalCount = 0
        this.myService = { user_service: [], count: 0 }
        this.getService()
      })
    },
    // 跳转到服务购买
    toServiceBuy () {
      this.$router.push('/main/service_serviceBuy')
    },
    // 跳转到订单记录
    toBuyRecord () {
      delete sessionStorage.buyRecordObj
      this.$router.push('/main/service_buyRecord')
    },
    // 跳转到发送记录
    toSmsRecord (i) {
      sessionStorage.smsRecordObj = JSON.stringify(i)
      this.$router.push('service_smsRecord')
    },
    // 跳转到订购记录页面
    toOneBuyRecord (i) {
      sessionStorage.buyRecordObj = JSON.stringify(i)
      this.$router.push('service_buyRecord')
    },
    // 跳转到服务购买页面
    toServiceBuyAgain (i) {
      sessionStorage.serviceObj = JSON.stringify(i)
      this.$router.push('service_serviceBuy')
      // 传递参数 到服务购买页面
      sessionStorage.tenant_id = i.tenant_id
      sessionStorage.myservice = true
    },
    // 获取服务
    getService(field = '') {
      let msg = '我的服务'
      this.loadMoreStatus = true
      this.loadMoreMsg = '正在加载'
      if (this.currPage <= 1) {
        this.$loading(`加载${msg}数据...`)
      }
      field += '&user_service=1&tenant_name=' + this.tenant_name + '&page_size=' + this.pageSize + '&page=' + this.currPage
      this.$fetch.serviceUserServiceList(field).then(data => {
        if (this.currPage === 1) {
          this.myService = data
        } else {
          this.myService.user_service = this.myService.user_service.concat(data.user_service)
        }
        this.currTotalCount = data.pagination.totalCount
        let maxPage = Math.ceil(this.currTotalCount / this.pageSize)
        if (maxPage > this.currPage) {
          this.loadMoreMsg = '加载更多'
        } else {
          this.loadMoreMsg = '我是有底线的'
        }
        this.loadMoreStatus = false
        this.$loading()
      })
    },
    loadMore() {
      if (this.loadMoreStatus) return false
      let isnearBottom = this.$willScrollToBottom(30)
      let maxPage = 0
      if (isnearBottom) {
        maxPage = Math.ceil(this.currTotalCount / this.pageSize)
        if (this.currPage >= maxPage) return false
        this.currPage++
        this.getService()
      }
    }
  },
  activated() {
    this.tenant_name = ''
    this.getService()
    this.loadMoreFun = () => this.loadMore()
    window.addEventListener('scroll', this.loadMoreFun, false)
  },
  deactivated() {
    this.tenant_name = ''
    this.service = { user_service: [], count: 0 }
    window.removeEventListener('scroll', this.loadMoreFun)
  }
}
</script>
