/*
 * @Author: 黄智强
 * @Date: 2018-01-26 18:12:09
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-05-16 18:21:00
 * @说明：根据参数，控制loading是否显示
 */
const install = Vue => {
  if (install.installed) return
  install.installed = true
  const toast = text => Vue.$vux.toast.show({ text, type: 'text' })
  const loading = text => {
    if (text === undefined) Vue.nextTick(() => Vue.$vux.loading.hide())
    else Vue.$vux.loading.show({ text })
  }
  Object.defineProperties(Vue.prototype, {
    $toast: {
      get() {
        return toast
      }
    },
    $loading: {
      get() {
        return loading
      }
    }
  })
}
export default { install }
