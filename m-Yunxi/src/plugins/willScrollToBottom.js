/*
 * @Author: 陈航
 * @Date: 2018-09-20 11:23:09
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-21 15:46:35
 * @说明：判断页面是否滚动到底部
 */
// 是否滚动到底部
const willScrollToBottom = (offsetBottom) => {
  let doc = document.documentElement || document.body
  let _scrollHeight = doc.scrollHeight
  let _pageHeight = window.innerHeight
  let _scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
  if (_scrollTop + _pageHeight + offsetBottom >= _scrollHeight) {
    return true
  }
  return false
}
// 定义插件
const install = Vue => {
  Object.defineProperties(Vue.prototype, {
    $willScrollToBottom: {
      get() {
        return willScrollToBottom
      }
    }
  })
}
export default { install }
