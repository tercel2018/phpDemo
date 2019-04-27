// ios 网页分享签名报错问题

// ios微信浏览器
const userAgent = window.navigator.userAgent
const isIOSWeChat = /iPhone|iPad|iPod/i.test(userAgent) && /MicroMessenger/i.test(userAgent)

// url
const location = window.location

export default {
  beforeRouteEnter(to, from, next) {
    // 修复iOS版微信HTML5 History兼容性问题
    if (isIOSWeChat && to.path !== location.pathname) {
      // 此处不可使用location.replace
      location.assign(to.fullPath)
    } else {
      next()
    }
  }
}
