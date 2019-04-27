/*
 * @Author: 陈航
 * @Date: 2019-01-14 10:55:35
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-02-18 15:56:25
 * @Desc: 员工绩效
 */
<style lang="less" scoped>
@borderColor:#eee;
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.flexBox{
  .flexUi(space-between);
  padding:1vw 0;
  .label{
    color:@9;
    font-size:@f6;
  }
  .text{
    font-size:@f6;
  }
}
.performance-wrapper{
  margin-bottom:20vw;
  font-size: @f7;
  padding-top:calc(~'44px + 12vw');
  padding-top:-webkit-calc(~'44px + 12vw');
  .vux-search-fixed-wrapper{
    position:fixed;
    top:12vw;
    left:0;
    width:100%;
    height:44px;
    z-index:899;
    background-color: #EFEFF4;
  }
  .employeeList{
    padding:3vw 3vw 0;
    .order_item{
      padding:3vw;
      border-radius:3vw;
      background-color: #fff;
      margin-bottom:3vw;
      .order_info{
        .orderNum{
          .label{
             color:@3;
          }
          .text{
            color:@blue;
            font-size: @f7;
          }
        }
        .money{
          color:#ff8542;
          font-size: @f7;
        }
      }
      .top{
        padding:2vw 0;
        border-top:solid 1px @borderColor;
        border-bottom:solid 1px @borderColor;
        .company{
          .company_name{
            padding-left:10px;
            border-left:solid 4px @blue;
          }
        }
        .domain{
          padding:1vw 0;
          color: @6;
          font-size:@f6;
        }
      }
      .noborder{
        border-bottom:0;
      }
      .content{
        .store_item{
          padding:2vw 0;
          border-bottom:solid 1px @borderColor;
          .store_name{
            color:@blue;
          }
          .product{
            color: @6;
          }
          .benefit{
            color:@6;
            .activity_content {
              color: #ff6c00;
            }
          }
        }
        .noborder{
          border:0;
        }
      }
      .bottom{
        .flexUi(space-between);
        padding-top: 3vw;
        border-top:solid 1px @borderColor;
        .todoList{
          .flexUi(flex-end);
          li{
            margin-left:4vw;
            padding:1vw 2vw;
            color:@6;
            font-size:@f6;
            border:solid 1px #dcdcdc;
            border-radius:0.8vw;
          }
          .goPay{
            color:@blue;
            border:solid 1px @blue;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="performance-wrapper">
    <!-- 头部导航 -->
    <header-basic title="员工绩效"></header-basic>
    <div class="vux-search-fixed-wrapper">
      <search placeholder = "输入员工名称" v-model="full_name" @on-submit="searchEmployee"  @on-blur="searchEmployee" @on-clear="searchEmployee" ref="search"></search>
    </div>
    <ul class="employeeList">
      <li class="order_item" v-for="(i,index) in perfanmanceList" :key="index">
        <div class="order_info">
            <div class="flexBox orderNum">
              <p class="label">员工名称</p>
              <p class="text">{{i.full_name}}</p>
            </div>
            <div class="flexBox">
              <p class="label">员工手机号</p>
              <p class="text">{{i.user_mobile}}</p>
            </div>
            <div class="flexBox">
              <p class="label">客户总数</p>
              <p class="text">{{i.customer_count}}</p>
            </div>
            <div class="flexBox">
              <p class="label">开店总数</p>
              <p class="text">{{i.store_count}}</p>
            </div>
            <div class="flexBox">
              <p class="label">订单总额</p>
              <p class="text">{{$f(i.order_amount)}}</p>
            </div>
            <div class="flexBox">
              <p class="label">佣金总额</p>
              <p class="text">{{$f(i.commission)}}</p>
            </div>
        </div>
      </li>
    </ul>
    <load-more v-show="perfanmanceList.length" :show-loading="loadMoreStatus" :tip="loadMoreMsg" background-color="#fbf9fe"></load-more>
    <no-data v-show="!loadMoreStatus && !perfanmanceList.length" tips="没有员工绩效数据" position="static"></no-data>
  </div>
</template>
<script>
import { LoadMore, Search } from 'vux'
import noData from '@/components/common/noData'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { LoadMore, Search, noData, headerBasic },
  data() {
    return {
      // 页码数据
      pagination: {},
      // 请求次数
      requestNum: 0,
      // 当前页数
      currPage: 1,
      // 每页数据
      currPageSize: 5,
      // 最大数据条数
      currTotalCount: 0,
      // 是否正在加载
      loadMoreStatus: false,
      // 加载更多：正在加载 ；我是有底线的；加载更多
      loadMoreMsg: '加载更多',
      // 保存加载更多函数的指针
      loadMoreFun: null,
      // 绩效列表
      perfanmanceList: [],
      // 员工姓名
      full_name: null
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
      return '￥' + val
    }
  },
  watch: {
    requestNum(val) {
      if (val === 1) this.$loading()
    }
  },
  methods: {
    subAccountGetEmployeePerformance(tips = '加载数据') {
      if (this.requestNum >= 1) {
        this.$loading(tips + '...')
      }
      let field = '&page_size=' + this.pageSize + '&page=' + this.currPage + '&input[full_name]=' + this.full_name
      this.$fetch.subAccountGetEmployeePerformance(field).then(({ list, pagination }) => {
        if (this.currPage === 1) {
          this.perfanmanceList = list
        } else {
          this.perfanmanceList = this.perfanmanceList.concat(list)
        }
        this.pagination = pagination
        // this.currPageSize = pagination.defaultPageSize
        this.currTotalCount = pagination.totalCount
        let maxPage = Math.ceil(this.currTotalCount / this.currPageSize)
        if (maxPage > this.currPage) {
          this.loadMoreMsg = '加载更多'
        } else {
          this.loadMoreMsg = '我是有底线的'
        }
        this.loadMoreStatus = false
        this.requestNum < 1 ? this.requestNum++ : this.$loading()
      })
    },
    searchEmployee() {
      this.currPage = 1
      this.currTotalCount = 0
      this.perfanmanceList = []
      this.subAccountGetEmployeePerformance('搜索员工')
    },
    // 加载更多
    loadMore() {
      let self = this
      if (self.loadMoreStatus) return false
      let isnearBottom = self.$willScrollToBottom(30)
      let maxPage = 0
      if (isnearBottom) {
        maxPage = Math.ceil(self.currTotalCount / self.currPageSize)
        if (self.currPage >= maxPage) return false
        self.currPage++
        self.subAccountGetEmployeePerformance()
      }
    }
  },
  activated() {
    this.$loading('加载员工绩效...')
    this.requestNum = 0
    this.full_name = ''
    this.currPage = 1
    this.subAccountGetEmployeePerformance()
    this.loadMoreFun = () => this.loadMore()
    window.addEventListener('scroll', this.loadMoreFun, false)
  },
  deactivated() {
    this.requestNum = 0
    window.removeEventListener('scroll', this.loadMoreFun)
    this.full_name = ''
  }
}
</script>
