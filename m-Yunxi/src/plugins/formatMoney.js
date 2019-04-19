/*
 * @Author: 黄智强
 * @Date: 2018-04-16 15:11:00
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-05-16 18:24:34
 * @说明：金额格式化工具
 */
const formatMoney = (val, num) => {
  val = Number(val).toFixed(2)
  // val = Number(val).toFixed()
  if (Number(val) > 1) {
    let int = val.split('.')[0]
    let float = val.split('.')[1]
    val = int.replace(/\B(?=(?:\d{3})+$)/g, ',') + '.' + float
    // val = int.replace(/\B(?=(?:\d{3})+$)/g, ',')
  }
  return '¥' + val
}
const install = Vue => {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $f: {
      get() {
        return formatMoney
      }
    }
  })
}
export default { install }
