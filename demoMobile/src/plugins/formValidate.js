/*
 * @Author: 陈航
 * @Date: 2018-12-12 13:55:32
 * @Last Modified time: 2018-12-12 13:55:32
 * @说明：表单验证问题
 */

// 说明验证数据格式
// 用法

window._verifyCodeError = false
window._mobileHasSign = false
window._mobileNoSign = false
window._passwordError = false

const FORM_VALIDATE_REGEXP = {
  // 非负整数
  NUMBER: /^\d+$/,
  // 手机号码
  MOBILE: /^(\d{3}(-|\s)?)?1[3,4,5,7,8,9]\d{9}$/,
  // 座机号码
  TEL: /^(\d{3,4}-)?\d{7,8}$/,
  // 手机号码+座机号码
  PHONE: /^(((\d{3,4}-)?\d{7,8})|((\d{3}(-|\s)?)?1[3,4,5,7,8,9]\d{9}))$/,
  // 身份证号码
  ID_NO: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 邮箱地址
  EMAIL: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
  // QQ号码
  QQ: /^\d{5,11}$/,
  // 银行账号
  ACCOUNT_NO: /^\d{12}|\d{15,19}$/,
  // 验证码
  VERIFY_CODE: /^\d{6}$/,
  // 图片验证码
  IMG_VERIFY_CODE: /^[A-Za-\d]{4}$/,
  // 密码(6-16位, 不含空格、换行符、制表符的任意字符)
  PASSWORD: /^(.(?!\s+)){6,16}$/,
  // 公司名称（中英文数字）
  CN_EN_NU: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_])+$/,
  // 不能含有关键字admin
  NOT_KEYWORDS: /^((?!([a|A][d|D][m|M][i|I][n|N])).)*$/,
  // 验证码错误
  VERIFY_CODE_ERROR: function () {
    return window._verifyCodeError
  },
  // 手机号码已注册
  MOBILE_HAS_SIGN: function () {
    return !window._mobileHasSign
  },
  MOBILE_NO_SIGN: function() {
    return !window._mobileNoSign
  },
  // 密码错误
  PASSWORD_ERROR: function () {
    return !window._passwordError
  }
}

// 字符串分隔成数组，再按需合并
const stringSplitJoin = function (...params) {
  if (!params || params.length < 2) throw new TypeError('the length of parameters shouldn`t be less than 2')
  let split_arr = params[0].split(params[1])
  if (split_arr && split_arr.length) {
    let start = params[2] || 0
    let end = params[3] || split_arr.length
    return split_arr.reduce(function (join, next, index) {
      if (index < start || index > end - 1) {
        return join
      } else {
        return join + '' + next
      }
    }, '')
  } else {
    return ''
  }
}

// 表单验证
const formValidate = function (...params) {
  if (!params || params.length < 1) throw new TypeError('the length of parameters shouldn`t be less than 1')
  let field = params[0]
  let callback = null
  let concatObj = {}
  if (params.length >= 2 && typeof params[1] === 'function') {
    callback = params[1]
  }
  for (let [key, val] of Object.entries(field)) {
    let _val = val.value
    concatObj[key] = _val
    if (val.required) {
      if (!_val) {
        if (Object.prototype.toString.call(val.errMsg).toLowerCase() === '[object array]' && val.errMsg.length) {
          this.$toast(val.errMsg[0] + '' + val.errMsg[1])
        } else {
          this.$toast(stringSplitJoin(val.errMsg, '#', 0, 2))
        }
        if (val.ref) {
          this.$refs[val.ref].focus()
          this.$refs[val.ref].blur()
          this.$refs[val.ref].focus()
        }
        if (callback) return callback(null)
        return null
      } else {
        if (val.pattern && typeof val.pattern === 'string') {
          let noError = true
          let test = FORM_VALIDATE_REGEXP[val.pattern]
          if (typeof test === 'function') {
            noError = test()
          } else {
            noError = test.test(_val)
          }
          if (!noError) {
            this.$toast(stringSplitJoin(val.errMsg, '#', 1))
            if (val.ref) {
              this.$refs[val.ref].focus()
              this.$refs[val.ref].blur()
              this.$refs[val.ref].focus()
            }
            if (callback) return callback(null)
            return null
          }
        } else if (Object.prototype.toString.call(val.pattern).toLowerCase() === '[object array]' && val.pattern.length) {
          for (let i = 0; i < val.pattern.length; i++) {
            let noError = true
            let test = FORM_VALIDATE_REGEXP[val.pattern[i]]
            if (typeof test === 'function') {
              noError = test()
            } else {
              noError = test.test(_val)
            }
            if (!noError) {
              this.$toast(val.errMsg[1] + '' + val.errMsg[(i + 2)])
              if (val.ref) {
                this.$refs[val.ref].focus()
                this.$refs[val.ref].blur()
                this.$refs[val.ref].focus()
              }
              if (callback) return callback(null)
              return null
            }
          }
        }
      }
    } else if (_val) {
      if (val.pattern && typeof val.pattern === 'string' && !FORM_VALIDATE_REGEXP[val.pattern].test(_val)) {
        this.$toast(stringSplitJoin(val.errMsg, '#', 1))
        if (val.ref) {
          this.$refs[val.ref].focus()
          this.$refs[val.ref].blur()
          this.$refs[val.ref].focus()
        }
        if (callback) return callback(null)
        return null
      } else if (Object.prototype.toString.call(val.pattern).toLowerCase() === '[object array]' && val.pattern.length) {
        for (let i = 0; i < val.pattern.length; i++) {
          let noError = true
          let test = FORM_VALIDATE_REGEXP[val.pattern[i]]
          if (typeof test === 'function') {
            noError = test()
          } else {
            noError = test.test(_val)
          }
          if (!noError) {
            this.$toast(val.errMsg[1] + '' + val.errMsg[(i + 2)])
            if (val.ref) {
              this.$refs[val.ref].focus()
              this.$refs[val.ref].blur()
              this.$refs[val.ref].focus()
            }
            if (callback) return callback(null)
            return null
          }
        }
      }
    }
  }
  if (callback) return callback(concatObj)
  return concatObj
}

// 定义插件
const install = Vue => {
  Object.defineProperties(Vue.prototype, {
    $formValidate: {
      get() {
        return formValidate.bind(this)
      }
    }
  })
}
export default { install }

// 用法介绍
// 表单数据结构, 放在data的return对象中
// let formObj = {
//   user: {
//     required: true, // 必选字段
//     value: null, // 表单值
//     ref: 'formObj.user', // 表单元素绑定的目标,
//     errMsg: ['请填写', '用户名']
//   },
//   password: {
//     required: true, // 必选字段
//     value: null, // 表单值
//     pattern: 'PASSWORD', // 匹配模式
//     ref: 'formObj.password', // 表单元素绑定的目标,
//     errMsg: '请填写#密码#是除空格符, 换行符和制表符以外的6-18位的任意字符'
//   },
//   company_name: {
//     required: true, // 必选字段
//     value: null, // 表单值
//     pattern: ['CN_EN_NU', 'NOT_KEYWORDS'], // 匹配模式
//     ref: 'formObj.company_name', // 表单元素绑定的目标,
//     errMsg: ['请填写', '公司名称', '只能由中文、英文和数字组成', '不能出现关键字admin等']
//   }
// }
// 注意点:
// 1.表单值用v-model绑定去除空格时，请用修饰符v-model.trim = "formObj.user"
// 2.验证顺序与formObj的key添加顺序一致，先验证user验证password最后验证company_name
// 3.errMsg可以是String类型或Array类型，但是pattern为String类型时，errMsg也应该为String类型， pattern为Array类型时，errMsg也应该为Array
// 4.注意pattern和errMsg的格式对应关系
