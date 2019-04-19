/*
 * @Author: 陈航
 * @Date: 2018-12-19 10:18:40
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-28 11:20:54
 * @Desc: 客户列表页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  justify-content: @justify;
  align-items: @align;
}
.customer-list-wrapper{
  font-size: @f7;
  padding-top:calc(~'44px + 12vw');
  padding-top:-webkit-calc(~'44px + 12vw');
  .addCustomer{
    position: absolute;
    right: 4vw;
    top:50%;
    transform: translateY(-50%);
    .flexUi;
    font-size: @f6;
    border:solid 1px #fff;
    padding:0.5vw 1.5vw;
    border-radius:0.8vw;
    i{
      font-size: @f6;
      margin-right:1vw;
    }
  }
  .vux-search-fixed-wrapper{
    position:fixed;
    top:12vw;
    left:0;
    width:100%;
    height:44px;
    z-index:899;
    background-color: #EFEFF4;
  }
  ul.customerList{
    margin-top:4vw;
    li.customerList-item{
      background-color: #fff;
      margin-bottom: 4vw;
      padding:2vw 4vw;
      .top{
        .flexUi;
        padding:1vw 0;
        .checkbox{
          display: block;
          width: 5vw;
          height: 5vw;
          border: 1px solid #ccc;
          border-radius: 2px;
          margin-right:3vw;
          i{
            display: none;
          }
        }
      }
      .middle{
        padding:0.5vw 0;
        font-size:@f5;
        color:@6;
      }
    }
    li.checked .top .checkbox{
      border: 1px solid #5fb878;
      background-color: #5fb878;
      .flexUi(center);
      i{
        display: block;
        text-align: center;
        color:#fff;
        font-size: @f6;
      }
    }
  }
  .operation-wrapper{
    box-sizing: border-box;
    position: fixed;
    bottom: 25vw;
    left: 3vw;
    width:94vw;
    border-radius:2vw;
    overflow: hidden;
    .operation-header{
      padding: 1.5vw 0;
      width:94vw;
      background-color: #ededed;
      .flexUi;
      font-size:@f5;
      span{
        display: block;
        margin:0;
      }
      .icon{
        width:5vw;
        height:5vw;
        background-color: #50b4ff;
        border-radius:0.5vw;
        margin: 0 3vw;
        .flexUi(center);
        i{
          display: block;
          margin:0;
          line-height: 5vw;
          text-align: center;
          color:#fff;
        }
      }
      .text{
        color:@6;
      }
    }
    .operation-panel{
      width:94vw;
      background-color: rgba(237,237,237,0.7);
      ul.operation-list{
        width:94vw;
        .flexUi(space-between);
        font-size:@f5;
        li{
          flex-shrink: 0;
          padding: 2vw 0;
          text-align: center;
          width:25%;
          .icon{
            margin:0 auto;
            width:8vw;
            height:8vw;
            border-radius:0.8vw;
            .flexUi(center);
            i{
              display: block;
              margin:0;
              line-height: 8vw;
              text-align: center;
              color:#fff;
              font-size:0.7rem;
            }
          }
          .icon.blue{
            background-color: @blue;
          }
          .icon.green{
            background-color: @green;
          }
          .icon.black{
            background-color: @6;
          }
          .icon.orange{
            background-color: @orange;
          }
          .text{
            padding-top:2vw;
            color:@3;
            line-height: 100%;
          }
        }
      }
      ul.operation-list.item5 li{
        width:20%;
      }
    }
  }
}
</style>
<template>
    <div class="customer-list-wrapper">
    <!-- 头部 -->
    <header-basic title="客户列表">
      <p slot="right" class="addCustomer" @click="$router.push('agent_addCustomer')"><i class="iconfont icon-addkehu"></i>新增</p>
    </header-basic>
    <div class="vux-search-fixed-wrapper">
      <search placeholder = "输入客户手机号" v-model="cus_mobile" @on-focus="searchFocus" @on-submit="searchCustomer"  @on-clear="searchCustomer" @on-blur="searchCustomer" ref="search"></search>
    </div>
    <div>
      <ul class="customerList" v-if="customerList && customerList.length">
        <li v-for="(i,j) in customerList" class="customerList-item" :key="j" :class="{checked:i.checked}" @click="chooseCustomer(i)">
          <div class="top">
            <span class="checkbox"><i class="iconfont icon-gouxuan"></i></span>客户名称：<span class="blue">{{i.cus_name}}</span>
          </div>
          <div class="middle" v-if="isSetUserRank=='1' && i.user_rank">
            <p class="left">客户等级：{{i.user_rank}}</p>
          </div>
          <div class="middle" v-if="isSetUserRank=='2'">
            <p class="left">客户折扣：{{(i.discount==100 || i.discount=='')?'不打折':(Number(i.discount)/10 + '折')}}</p>
          </div>
          <div class="middle">
            <p class="left">客户手机号：{{i.cus_mobile}}</p>
          </div>
          <div class="middle" v-if="i.add_user">
            <p class="left">客户经理：{{i.add_user}}</p>
          </div>
          <div class="middle">
            <p class="left">添加时间：{{i.add_time}}</p>
          </div>
        </li>
      </ul>
      <div class="operation-wrapper" v-if="showCustomerOper">
        <div class="operation-header">
          <span class="icon"><i class="iconfont icon-gongneng"></i></span>
          <span class="text">客户管理</span>
        </div>
        <div class="operation-panel">
          <ul class="operation-list" :class="{item5:(isSetUserRank=='1')}">
            <li @click="editCustomer">
              <p class="icon green"><i class="iconfont icon-bianji1"></i></p>
              <p class="text">编辑</p>
            </li>
            <li @click="viewCustomerDetail">
              <p class="icon blue"><i class="iconfont icon-xiangqing"></i></p>
              <p class="text">详情</p>
            </li>
            <li @click="openStore">
              <p class="icon black"><i class="iconfont icon-kuaisukaidian"></i></p>
              <p class="text">开店</p>
            </li>
            <li @click="viewCustomerStore">
              <p class="icon black"><i class="iconfont icon-mendian"></i></p>
              <p class="text">门店</p>
            </li>
            <li v-if="isSetUserRank=='1'" @click="showCustomerRank">
              <p class="icon orange"><i class="iconfont icon-dengji1"></i></p>
              <p class="text">设置等级</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 设置等级 -->
      <group v-if="isSetUserRank=='1' && customerRankList.length">
        <popup-picker :show.sync="showUserRankPicker" :show-cell="false" :data="customerRankList" :columns="1" v-model="userRankValue" @on-change="setCustomerRank" @on-hide="hideCustomerRank"></popup-picker>
      </group>
      <!-- 没有客户列表 -->
      <no-data v-if="!loadMoreStatus && !customerList.length" :tips="tips" position="static"></no-data>
      <!-- 加载更多 -->
      <load-more v-show="customerList && customerList.length" :show-loading="loadMoreStatus" :tip="loadMoreMsg" background-color="#fbf9fe"></load-more>
    </div>
  </div>
</template>
<script>
import { LoadMore, Group, XButton, Search, PopupPicker } from 'vux'
import noData from '@/components/common/noData'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { LoadMore, noData, headerBasic, Group, XButton, Search, PopupPicker },
  data() {
    return {
      // 客户列表
      customerList: [],
      // 代理商是否设置会员等级
      isSetUserRank: '0',
      // 等级重值时间
      restTime: '',
      // 请求次数
      requestNum: 0,
      // 每页数据条数
      pageSize: 20,
      // 当前页数
      currPage: 1,
      // 总条数
      currTotalCount: 0,
      // 输入框电话号码
      cus_mobile: '',
      // 当前选择的客户id
      cus_obj: {},
      // 是否显示客户管理
      showCustomerOper: false,
      // 显示设置等级
      showUserRankPicker: false,
      // 所有客户等级
      customerRankList: [],
      // 选择等级
      userRankValue: [],
      // 是否正在加载
      loadMoreStatus: false,
      // 加载更多：正在加载 ；我是有底线的；加载更多
      loadMoreMsg: '加载更多',
      // 保存函数LoadMore的指针
      loadMoreFun: null,
      // 没有数据提示
      tips: '客户列表记录'
    }
  },
  watch: {
    requestNum(val) {
      if (val === 2) {
        this.$nextTick(() => {
          this.$loading()
        })
      }
    }
  },
  methods: {
    // 获取客户列表
    getCustomerList(field = '', type = 1) {
      this.loadMoreStatus = true
      this.loadMoreMsg = '正在加载'
      field += '&page_size=' + this.pageSize + '&page=' + this.currPage
      if (type === 2) {
        this.$loading('搜索客户...')
      }
      this.$fetch.customerList(field).then(({ customer_list, pagination, agent_set_user_rank }) => {
        customer_list.forEach(item => {
          item.checked = false
        })
        this.isSetUserRank = '1'
        if (this.isSetUserRank !== agent_set_user_rank) this.isSetUserRank = agent_set_user_rank
        if (this.currPage === 1) {
          this.customerList = customer_list
        } else {
          this.customerList = this.customerList.concat(customer_list)
        }
        this.currTotalCount = pagination.totalCount
        let maxPage = Math.ceil(this.currTotalCount / this.pageSize)
        if (maxPage > this.currPage) {
          this.loadMoreMsg = '加载更多'
        } else {
          this.loadMoreMsg = '我是有底线的'
        }
        this.loadMoreStatus = false
        if (this.requestNum < 2) this.requestNum++
        else this.$loading()
      }).catch(err => {
        this.$loading()
        console.log(err)
      })
    },
    // 获取重置会员等级配置时间
    getCustomerCustomerConfig() {
      this.$fetch.customerCustomerConfig().then(data => {
        this.restTime = data.set_customer_rank_time
        this.isSetUserRank = data.agent_set_user_rank
      })
    },
    // 获取代理商可设置等级
    customerCustomerRankList() {
      this.$fetch.customerCustomerRankList().then(data => {
        let _keys = Object.keys(data)
        if (_keys.length) {
          this.customerRankList = _keys.map(key => {
            return { value: key, name: data[key]['rank_name'] }
          })
        } else {
          this.customerRankList = []
        }
        this.requestNum++
      })
    },
    // 初始化客户操作
    initOper() {
      this.showCustomerOper = false
      if (this.customerList.length) {
        this.customerList.forEach(item => {
          item.checked = false
        })
      }
      this.cus_obj = {}
    },
    // 选择客户
    chooseCustomer(i) {
      if (this.customerList.length) {
        i.checked = !i.checked
        this.showCustomerOper = i.checked
        this.cus_obj = i.checked ? i : {}
        this.customerList.forEach(item => {
          if (item.cus_id !== i.cus_id) item.checked = false
        })
      } else {
        this.showCustomerOper = false
      }
    },
    // 编辑
    editCustomer() {
      this.showCustomerOper = false
      this.$router.push('agent_addCustomer?type=1&cus_id=' + this.cus_obj.cus_id)
    },
    // 详情
    viewCustomerDetail() {
      this.showCustomerOper = false
      this.$router.push('agent_addCustomer?type=2&cus_id=' + this.cus_obj.cus_id)
    },
    // 开店
    openStore() {
      this.showCustomerOper = false
      let obj = {
        customer: this.cus_obj,
        isChange: 1,
        openType: '1',
        company: this.cus_obj.cus_name,
        discount: this.cus_obj.discount,
        isAdd: 1,
        buyNow: 1,
        addCart: 1
      }
      sessionStorage.editStore = JSON.stringify(obj)
      this.$router.push('store_openStore')
    },
    // 门店
    viewCustomerStore() {
      this.showCustomerOper = false
      sessionStorage.cus_name = this.cus_obj.cus_name
      this.$router.push('agent_customerStore?user_id=' + this.cus_obj.user_id + '&agent_user_id=' + this.cus_obj.agent_user_id)
    },
    // 设置等级
    showCustomerRank() {
      let cus_id = this.cus_obj.cus_id
      this.$fetch.customerCheckCustomerRank({ cus_id }).then(() => {
        this.showCustomerOper = false
        this.showUserRankPicker = true
      }).catch(err => {
        this.$toast(err)
      })
    },
    setCustomerRank() {
      this.$nextTick(() => {
        let field = {
          cus_id: this.cus_obj.cus_id,
          rank_id: this.userRankValue[0]
        }
        this.$loading('设置客户等级...')
        this.$fetch.customerSetCustomerRank(field).then(() => {
          this.$loading()
          this.$toast(this.restTime + '个月内不可修改会员等级')
        }).catch(err => {
          this.$loading()
          console.log(err)
        })
      })
    },
    // 隐藏等级
    hideCustomerRank() {
      this.showCustomerOper = false
      this.customerList.forEach(item => {
        item.checked = false
      })
    },
    // 搜索框有焦点
    searchFocus() {
      this.initOper()
    },
    // 搜索客户
    searchCustomer() {
      this.customerList = 1
      this.$nextTick(() => {
        this.getCustomerList('&input[cus_mobile]=' + this.cus_mobile, 2)
      })
    },
    loadMore() {
      this.initOper()
      if (this.loadMoreStatus) return false
      let isnearBottom = this.$willScrollToBottom(30)
      let maxPage = 0
      if (isnearBottom) {
        maxPage = Math.ceil(this.currTotalCount / this.pageSize)
        if (this.currPage >= maxPage) return false
        this.currPage++
        this.getCustomerList()
      }
    }
  },
  activated() {
    this.$loading('加载客户列表...')
    this.requestNum = 0
    this.cus_obj = {}
    this.customerList = []
    this.currPage = 1
    this.showCustomerOper = false
    this.getCustomerList()
    this.getCustomerCustomerConfig()
    this.customerCustomerRankList()
    this.loadMoreFun = () => this.loadMore()
    window.addEventListener('scroll', this.loadMoreFun, false)
  },
  deactivated() {
    window.removeEventListener('scroll', this.loadMoreFun)
  }
}
</script>
