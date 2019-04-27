/*
 * @Author: 陈航
 * @Date: 2018-11-14 17:23:09
 * @Last Modified time: 2018-11-14 18:06:52
 * @说明：判断是否是微信浏览器
 */
const isWxBrowser = () => {
  let userAgent = window.navigator.userAgent.toLowerCase()
  if (userAgent.indexOf('micromessenger') > 0) {
    return true
  }
  return false
}
// 定义插件
const install = Vue => {
  Object.defineProperties(Vue.prototype, {
    $isWxBrowser: {
      get() {
        return isWxBrowser
      }
    }
  })
}
export default { install }
