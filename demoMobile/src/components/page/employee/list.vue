/*
 * @Author: 陈航
 * @Date: 2019-01-14 10:55:22
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-02-21 10:08:25
 * @Desc: 所有员工
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
.employee_wrapper{
  margin-bottom:20vw;
  font-size: @f7;
  padding-top:calc(~'88px + 12vw');
  padding-top:-webkit-calc(~'88px + 12vw');
  .tab-wrapper{
    position:fixed;
    top:12vw;
    left:0;
    z-index:99;
    width:100%;
  }
  .vux-search-fixed-wrapper{
    position:fixed;
    top:calc(~'44px + 12vw');
    top:-webkit-calc(~'44px + 12vw');
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
  <div class="employee_wrapper">
    <!-- 头部导航 -->
    <header-and-nav title="员工列表" v-model="navOpen">
      <side-nav-cell icon="icon-addkehu" title="添加员工" @on-click="addEmployee"></side-nav-cell>
      <side-nav-cell icon="icon-gerenjixiao" title="员工绩效" @on-click="employeePerformance"></side-nav-cell>
    </header-and-nav>
    <!-- 导航 -->
    <div class="tab-wrapper">
      <tab bar-active-color="#1699e7" active-color="#1997e3" :scroll-threshold="5">
        <tab-item :selected="currLi===''?true:false" @on-item-click="filterFun('')">全部</tab-item>
        <tab-item v-for="i in userRoleList" :selected="currLi===i.role_id?true:false" :key="i.role_id" @on-item-click="filterFun(i.role_id)" badge-background="#ff8542" badge-color="#fff">{{i.role_name}}</tab-item>
      </tab>
    </div>
    <div class="vux-search-fixed-wrapper">
      <search placeholder = "输入员工名称" v-model="fullName" @on-submit="searchEmployee"  @on-blur="searchEmployee" @on-clear="searchEmployee" ref="search"></search>
    </div>
    <ul class="employeeList">
      <li class="order_item" v-for="(i,index) in employeeList" :key="index">
        <div class="order_info">
            <!-- <x-switch title="是否锁定"></x-switch> -->
            <div class="flexBox orderNum">
              <p class="label">员工名称</p>
              <p class="text">{{i.full_name}}</p>
            </div>
            <div class="flexBox">
              <p class="label">员工手机号</p>
              <p class="text">{{i.user_mobile}}</p>
            </div>
            <div class="flexBox">
              <p class="label">角色</p>
              <p class="text money">{{i.role_name}}</p>
            </div>
            <div class="flexBox">
              <p class="label">是否验证</p>
              <p class="text">{{i.agent_verified===1?'是':'否'}}</p>
            </div>
            <div class="flexBox">
              <p class="label">添加时间</p>
              <p class="text">{{i.reg_time}}</p>
            </div>
        </div>
        <div class="bottom">
          <elegant-switch v-model="i.agent_locked" :params="i.user_id" :id="i.user_id" on="锁定" off="解锁" @switch-event="switchEvent(i.user_id)"></elegant-switch>
          <ul class="todoList">
            <li @click.stop="editEmployee(i)">编辑</li>
            <li @click.stop="removeEmployee([i.user_id])">删除</li>
            <li class="goPay" v-if="i.agent_verified!==1" @click.stop="verifyEmployee(i)">验证</li>
            <li class="goPay" v-else @click.stop="viewEmployeeQrcode(i)">二维码</li>
          </ul>
        </div>
      </li>
    </ul>
    <load-more v-show="employeeList.length" :show-loading="loadMoreStatus" :tip="loadMoreMsg" background-color="#fbf9fe"></load-more>
    <no-data v-show="!loadMoreStatus && !employeeList.length" :tips="tips" position="static"></no-data>
  </div>
</template>
<script>
import Vue from 'vue'
import { Tab, TabItem, ConfirmPlugin, LoadMore, Search, XSwitch } from 'vux'
import noData from '@/components/common/noData'
import headerAndNav from '@/components/common/headerAndNav'
import sideNavCell from '@/components/common/sideNavCell'
import elegantSwitch from '@/components/common/elegantSwitch'
Vue.use(ConfirmPlugin)
export default {
  components: { Tab, TabItem, LoadMore, noData, Search, headerAndNav, sideNavCell, XSwitch, elegantSwitch },
  data() {
    return {
      // 侧边导航隐藏
      navOpen: false,
      // 第一行，左侧订单状态数据
      userRoleList: {},
      // 第一行，当前选中的下标
      currLi: '',
      // 员工列表数据
      employeeList: [],
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
      // 没有数据的提示
      tips: '',
      // 检索条件: 员工名称
      fullName: ''
    }
  },
  watch: {
    requestNum(val) {
      if (val === 2) this.$loading()
    }
  },
  computed: {
    // 没有数据时的类型：1:没有订单；2:没有找到订单
    noDataType() {
      if (this.employeeList.length) return ''
      else if (this.searchValue) return 2
      else return 1
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
  methods: {
    // 开关事件
    switchEvent(user_id) {
      // 锁定员工
      this.$fetch.subAccountLock({ user_id })
    },
    // 新增员工
    addEmployee() {
      this.navOpen = false
      delete sessionStorage.editEmployee
      this.$router.push('employee_operate')
    },
    // 员工绩效
    employeePerformance() {
      this.navOpen = false
      this.$router.push('employee_performance')
    },
    // 第一行，点击筛选事件
    filterFun(key) {
      let role_id = ''
      if (key !== '' && key !== undefined && key !== null) {
        if (this.currLi === key) return false
        this.currLi = role_id = key
      } else {
        if (this.currLi === '') return false
        this.currLi = ''
      }
      this.currPage = 1
      this.currTotalCount = 0
      this.employeeList = []
      this.getEmployeeList(role_id, this.fullName)
    },
    // 获取员工角色
    getUserRoleList() {
      this.$fetch.userRoleGetRoleList().then(data => {
        this.userRoleList = data
        this.requestNum++
      })
    },
    // 获取订单列表数据
    getEmployeeList(role_id = '', full_name = '', type = 0) {
      this.loadMoreStatus = true
      this.loadMoreMsg = '正在加载'
      if (type === 1) {
        this.$loading('搜索员工...')
        this.tips = `此员工`
      } else {
        this.tips = `员工`
      }
      let field = '&page_size=' + this.currPageSize + '&page=' + this.currPage + '&role_id=' + role_id + '&num[full_name]=' + full_name
      this.$fetch.subAccountEmployeeList(field).then(({ list, pagination }) => {
        if (this.currPage === 1) {
          this.employeeList = list
        } else {
          this.employeeList = this.employeeList.concat(list)
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
        if (this.requestNum < 2) this.requestNum++
        else this.$loading()
      })
    },
    // 检索员工
    searchEmployee() {
      this.$nextTick(() => {
        this.currPage = 1
        this.currTotalCount = 0
        this.employeeList = []
        this.getEmployeeList(this.currLi, this.fullName, 1)
      })
    },
    // 编辑员工
    editEmployee(i) {
      console.log('编辑员工')
      sessionStorage.editEmployee = JSON.stringify(i)
      this.$router.push('employee_operate?type=1')
    },
    // 删除员工
    removeEmployee(id_list) {
      this.$loading('删除员工')
      this.$fetch.subAccountBatchDelete({ id_list }).then(() => {
        this.$toast('删除成功')
        this.$loading()
        this.getEmployeeList(this.currLi, this.fullName)
      })
    },
    // 员工验证
    verifyEmployee(i) {
      sessionStorage.employeeInfo = JSON.stringify(i || {})
      this.$router.push('employee_verify?user_code=' + i.user_code)
    },
    // 员工二维码
    viewEmployeeQrcode(i) {
      // sessionStorage.employeeQrcodeInfo = JSON.stringify(i || {})
      this.$router.push('employee_qrcode?user_code=' + i.user_code)
    },
    // 加载更多
    loadMore() {
      let self = this
      if (self.loadMoreStatus) return false
      let isnearBottom = self.$willScrollToBottom(30)
      let maxPage = 0
      let status = self.currLi
      if (isnearBottom) {
        maxPage = Math.ceil(self.currTotalCount / self.currPageSize)
        if (self.currPage >= maxPage) return false
        self.currPage++
        if (self.currLi === '') status = ''
        self.getEmployeeList(status, self.fullName)
      }
    }
  },
  activated() {
    this.currLi = ''
    this.$loading('加载员工列表...')
    this.fullName = ''
    this.currPage = 1
    this.getUserRoleList()
    this.getEmployeeList()
    this.loadMoreFun = () => this.loadMore()
    window.addEventListener('scroll', this.loadMoreFun, false)
  },
  deactivated() {
    this.requestNum = 0
    window.removeEventListener('scroll', this.loadMoreFun)
    this.fullName = ''
  }
}
</script>
