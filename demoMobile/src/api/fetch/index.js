/*
 * @Author: 黄智强
 * @Date: 2018-05-03 10:15:41
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-12-14 10:17:09
 * @说明：真正执行请求数据代码
 */
import Vue from 'vue'
import router from '../../router'
import axios from 'axios'
import vueAxios from 'vue-axios'
Vue.use(vueAxios, axios)
const fetch = ({ methods, url, data }) => {
  return new Promise((resolve, reject) => {
    Vue.axios[methods](url, data)
      .then(({ data: { code, message, data } }) => {
        // code为200时
        if (code === 200) {
          resolve(data)
        } else {
          Vue.$vux.loading.hide()
          if (code === 403 || code === 400) {
            // code为400、403时，将message通过toast直接抛出给用户看
            Vue.$vux.toast.show({ text: message, type: 'text' })
          } else if (message.search('Your request was made with invalid credentials') !== -1) {
            // 请求非法时，跳转到登录去
            // router.push('/bind')
            localStorage.access_token = ''
            delete localStorage.access_token
            router.push('/')
          } else {
            // code为其他时：0、8、401、500、501等等，统一抛出【系统错误，请重试！】
            Vue.$vux.toast.text('系统错误，请重试')
          }
          reject(message)
        }
      }).catch(() => {
        // 当连接服务器失败时才执行这部分
        Vue.$vux.loading.hide()
        Vue.$vux.toast.text('网络错误，请刷新')
      })
  })
}
export default fetch
