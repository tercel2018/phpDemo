/*
 * @Author: 黄智强
 * @Date: 2018-05-03 10:19:09
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-11-19 11:23:29
 * @说明：绑定接口函数，通过【this.$fetch.函数名()】调用
 * 接口情况总结（6种情况）
 * 1、get，无任何地址参数 ==> 参数('')
 * 2、get，仅有token ==> 参数()
 * 3、get，有token+其他地址参数 ==> 参数('&page=122&...')
 * 4、get，无token+有其他地址参数 ==> 参数('page=123&...')
 * 5、post，无token+表单参数 ==> 参数({...},null)
 * 6、post，有token+表单参数 ==> 参数({...}) （该情况最多）
 */
import fetch from './fetch/index'
import posturl from './url/index'
let bind = {}
for (let i in posturl) {
  for (let j in posturl[i]) {
    bind[j] = (data, flag) => {
      let _url = '/api' + posturl[i][j]
      let _token = localStorage.access_token ? '?access-token=' + localStorage.access_token : ''
      let url = _url + _token
      let methods = 'post'
      if (typeof data !== 'object') {
        methods = 'get'
        if (data) {
          if (data[0] === '&') url += data
          else url = _url + '?' + data
        } else if (data === '') url = _url
        data = ''
      } else if (flag === null) url = _url
      return fetch({ url, methods, data })
    }
  }
}
export default bind
