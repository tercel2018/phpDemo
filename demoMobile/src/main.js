/*
 * @Author: 黄智强
 * @Date: 2018-05-03 10:01:00
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-20 13:47:35
 * @说明：主程序
 */

import Vue from 'vue'
// import FastClick from 'fastclick'
import api from './api/index'
import App from './App'
import router from './router'
import store from './store'
import formatMoney from './plugins/formatMoney'
import formValidate from './plugins/formValidate'
import WebUploader from './plugins/initWebUploader'
import showToast from './plugins/showToast'
import scrollPlugin from './plugins/willScrollToBottom'
import isWxBrowser from './plugins/isWxBrowser'

// vux插件
import { LoadingPlugin, ToastPlugin } from 'vux'
// 解决软键盘弹出收起时页面被挤压的问题
import './plugins/input.js'

Vue.use(ToastPlugin, { time: 1000, width: 'auto' })
Vue.use(LoadingPlugin)

// 数据请求插件
Vue.use(api)

// 金额格式化插件:2000=>￥2,000.00
Vue.use(formatMoney)

// 表单验证插件
Vue.use(formValidate)

// 上传图片或文件
Vue.use(WebUploader)

// 显示弹窗插件
Vue.use(showToast)

// 判断滚动到页面底部的插件
Vue.use(scrollPlugin)

// 判断是否是微信浏览器

Vue.use(isWxBrowser)

// fastclick 模块
// FastClick.attach(document.body)

Vue.$vux.loading.hide()

// 全局前置守卫
// 页面底部导航(导航下标对应文件夹名)
const routerFiles = [{'1': 'store'}, {'3': 'myBuy'}, {'4': 'service'}]
router.beforeEach((to, from, next) => {
  // 路由上有token
  if (to.query.access_token && to.query.access_token !== 'undefined') localStorage.access_token = to.query.access_token
  // 路由上有auth_id
  if (to.query.auth_id && to.query.auth_id !== 'undefined') localStorage.auth_id = to.query.auth_id
  // token验证
  let token = localStorage.access_token
  let notNeedAuth = to.meta && to.meta.notNeedAuth
  if (!notNeedAuth && !token) {
    next('/')
    return false
  }
  // 页面底部导航高亮位置等于匹配到的导航的前缀的文件夹名对应的键名数值，默认为零
  let navTabIndex = 0
  routerFiles.map((item, index) => {
    for (let _key in item) {
      let routerPrefix = item[_key] + '_'
      if (to.path.includes(routerPrefix)) navTabIndex = Number(_key)
    }
  })
  if (to.path.toLowerCase().includes('store_shopcart')) {
    store.dispatch('CHANGE_NAV_INDEX', 2)
  } else {
    store.dispatch('CHANGE_NAV_INDEX', navTabIndex)
  }
  next()
})

window._isPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/ // 正则：是否为手机号

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
