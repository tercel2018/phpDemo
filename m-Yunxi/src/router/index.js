/*
 * @Author: 黄智强
 * @Date: 2018-05-03 10:03:29
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-02-20 17:22:06
 * @说明：路由配置，采用路由懒加载方式，来缓解首屏加载慢，达到按需加载
 * @懒加载：resolve => require(['组件地址'], resolve) 改成：  () => import('组件地址')
 */

import Vue from 'vue'
import Router from 'vue-router'

let routes = []

// 所有路由数据
let url = {
  // 授权页面
  '/': {
    filePath: 'bind/isBind',
    notNeedAuth: true
  },
  // 绑定成功页面
  '/bind': {
    filePath: 'bind/bind'
  },
  // 解除绑定页面
  '/unbind': {
    filePath: 'bind/unbind'
  },
  // 登录入口
  '/login': {
    filePath: 'bind/index',
    notNeedAuth: true
  },
  // 注册入口
  '/register': {
    filePath: 'bind/index',
    notNeedAuth: true
  },
  // 合作协议
  '/protocol': {
    filePath: 'bind/protocol',
    notNeedAuth: true
  },
  // 邀请引导页面
  '/guidePage': {
    filePath: 'invite/guidePage',
    notNeedAuth: true
  },
  // 邀请入口
  '/invitedEntry': {
    filePath: 'invite/invitedEntry',
    notNeedAuth: true
  },
  // 邀请注册
  '/invitedRegister': {
    filePath: 'invite/invitedRegister',
    notNeedAuth: true
  },
  // 邀请登陆
  '/invitedLogin': {
    filePath: 'invite/invitedLogin',
    notNeedAuth: true
  },
  // 邀请开店
  '/openStore': {
    filePath: 'invite/openStore',
    notNeedAuth: true
  },
  // 员工验证
  '/qrcodeVerify': {
    filePath: 'employee/qrcodeVerify',
    notNeedAuth: true
  },
  // 审核进度
  '/auditProcess': {
    filePath: 'qualification/auditProcess'
  },
  // 签署协议
  '/signAgreement': {
    filePath: 'qualification/signAgreement'
  },
  // 提交材料
  '/submitMaterial': {
    filePath: 'qualification/submitMaterial'
  },
  // 提交账户
  '/submitAccount': {
    filePath: 'qualification/submitAccount'
  },
  // 系统统一入口
  '/main': {
    filePath: 'main',
    children: {
      // 系统首页
      index: 'index',
      // 个人中心
      personal: 'personal',
      // 代理商邀请客户
      rankPage: 'rankPage',
      // 代理商添加客户
      agent_addCustomer: 'agent/addCustomer',
      // 代理商客户列表
      agent_customerList: 'agent/customerList',
      // 代理商客户门店
      agent_customerStore: 'agent/customerStore',
      // 代理商邀请客户
      agent_invite: 'agent/invite',
      // 会员邀请好友
      member_invite: 'member/invite',
      // 消息提醒
      message_remind: 'message/remind',
      // 新开门店
      store_openStore: 'store/openStore',
      // 我的门店
      store_myStore: 'store/myStore',
      // 门店升级
      store_upgrade: 'store/upgrade',
      // 门店续费
      store_recharge: 'store/recharge',
      // 购物车
      store_shopCart: 'store/shopCart',
      // 优惠券
      store_quan: 'store/quan',
      // 门店订单核对
      store_checkOrder: 'store/checkOrder',
      // 订单支付
      store_orderPay: 'store/orderPay',
      // 订单支付成功页面
      store_payResult: 'store/payResult',
      // 订单列表
      myBuy_orderList: 'myBuy/orderList',
      // 订单详情
      myBuy_orderDetail: 'myBuy/orderDetail',
      // 我的钱包
      finance_myWallet: 'finance/myWallet',
      // 申请提现
      finance_withdraw: 'finance/withdraw',
      // 提现记录
      finance_withdrawRecord: 'finance/withdrawRecord',
      // 银行卡
      finance_bankCard: 'finance/bankCard',
      // 收支明细
      finance_paymentDetail: 'finance/paymentDetail',
      // 钱包明细
      finance_walletDetail: 'finance/walletDetail',
      // 佣金明细
      finance_commisionDetail: 'finance/commisionDetail',
      // 奖励金明细
      finance_bonusDetail: 'finance/bonusDetail',
      // 我的服务
      service_myService: 'service/myService',
      // 服务购买
      service_serviceBuy: 'service/serviceBuy',
      // 服务订单核对
      service_checkOrder: 'service/checkOrder',
      // 订购记录
      service_buyRecord: 'service/buyRecord',
      // 短信发送记录
      service_smsRecord: 'service/smsRecord',
      // 安全管理中心
      safe_center: 'safeManage/center',
      // 修改登录密码
      safe_loginPwd: 'safeManage/loginPwd',
      // 修改支付密码
      safe_payPwd: 'safeManage/payPwd',
      // 验证手机
      safe_mobile: 'safeManage/mobile',
      // 员工管理
      employee_list: 'employee/list',
      // 新增、编辑员工
      employee_operate: 'employee/operate',
      // 员工验证
      employee_verify: 'employee/verify',
      // 员工绩效
      employee_performance: 'employee/performance',
      // 员工二维码
      employee_qrcode: 'employee/qrcode'
    }
  }
}

for (let path in url) {
  let { filePath, notNeedAuth, wxNeedValidate, children } = url[path]
  let obj = {
    path,
    // component: resolve => require(['@/components/page/' + filePath], resolve)
    component: () => import('@/components/page/' + filePath)
  }
  if (notNeedAuth) obj.meta = { notNeedAuth }
  if (wxNeedValidate) obj.meta = { wxNeedValidate }
  if (children) {
    obj.children = []
    for (let c in children) {
      obj.children.push({
        path: c,
        // component: resolve => require(['@/components/page/' + children[c]], resolve)
        component: () => import('@/components/page/' + children[c])
      })
    }
  }
  routes.push(obj)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes
})
