/*
 * @Author: 陈航
 * @Date: 2018-12-21 15:45:40
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-01-21 17:28:27
 * @Desc: 解决软键盘弹出收起时页面被挤压的问题
 */

// 是否微信浏览器
window._isWxPlatform = (function () {
  let ua = window.navigator.userAgent.toLowerCase()
  return !!ua.match(/micromessenger/)
})()

// 是否手机端

window._isMobilePlatform = (function () {
  let ua = window.navigator.userAgent.toLowerCase()
  return !!ua.match(/(android|iphone|symbianos|windows\sphone|ipad|ipod)/)
})()

// 是否苹果手机

window._isIOSPlatform = (function () {
  let ua = window.navigator.userAgent.toLowerCase()
  return !!ua.match(/['iphone', 'ipad', 'ipod']/)
})()

// 是否安卓手机

window._isAndroidPlatform = (function () {
  let ua = window.navigator.userAgent.toLowerCase()
  return !!ua.match(/android/)
})()

window._originHeight = document.documentElement.clientHeight

window.onload = function () {
  window.onresize = function() {
    if (!_isMobilePlatform) {
      return false
    }
    if (_isAndroidPlatform) {
      let currentHeight = document.documentElement.clientHeight
      let fixedRoot = document.querySelector('[data-fixed-bottom=root]')
      let fixedComponents = document.querySelectorAll('[data-fixed-bottom=component]')
      let root = document.querySelector('[root-fixed-offset]')
      let component = document.querySelector('[component-fixed-offset]')
      if (currentHeight >= _originHeight) {
        // 软键盘收起
        for (let ele of fixedComponents) {
          ele.style.position = 'fixed'
        }
        if (fixedRoot) {
          fixedRoot.style.position = 'fixed'
        }
        if (root) {
          root.style.paddingBottom = fixedRoot.offsetHeight + 'px'
        }
        if (component) {
          let total = 0
          for (let ele of fixedComponents) {
            total += ele.offsetHeight
          }
          component.style.paddingBottom = total + 'px'
        }
      } else {
        // 软键盘弹出
        for (let ele of fixedComponents) {
          ele.style.position = 'static'
        }
        if (fixedRoot) {
          fixedRoot.style.position = 'static'
        }
        if (root) {
          root.style.paddingBottom = 0
        }
        if (component) {
          component.style.paddingBottom = 0
        }
      }
    }
  }
  // 解决IOS微信中输入框失去焦点页面不自动滑下来，导致页面底部出现空白
  if (_isIOSPlatform) {
    window.addEventListener('focusout', function () {
      window.scrollTo(0, 0)
    }, false)
  }
}
