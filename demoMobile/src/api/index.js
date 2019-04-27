/*
 * @Author: 黄智强
 * @Date: 2018-05-03 10:05:30
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-05-03 10:21:13
 * @说明：声明数据请求插件$fetch
 */
import bind from './bind'
const install = Vue => {
  if (install.installed) return
  install.installed = true
  Object.defineProperty(Vue.prototype, '$fetch', {
    get() {
      return bind
    }
  })
}
export default install
