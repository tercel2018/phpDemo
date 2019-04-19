/*
 * @Author: 黄智强
 * @Date: 2018-01-12 16:37:09
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-04-11 15:14:36
 * @说明：用户(account)相关的所有接口地址定义
 */

// 忘记密码第一步：验证图片验证码
export const passwordReset = '/account/password-reset'
// 忘记密码第二步：发送短信验证码
export const sendVerifyCodeSms = '/account/send-verify-code-sms'
// 忘记密码第二步：验证短信验证码
export const passwordResetStep2 = '/account/password-reset-step2'
// 忘记密码第三步：设置新密码
export const passwordResetStep3 = '/account/password-reset-step3'
// 会员登录
export const accountLogin = '/account/login'
// 会员退出登录
export const logout = '/account/logout'
// 会员注册
export const register = '/account/register'
// 动态登录
export const dynamicLogin = '/account/dynamic-login'
// 检查手机号是否存在
export const checkUserMobile = '/account/check-user-mobile'
// 校验短信验证码
export const checkSmsVerifyCode = '/account/check-verify-code'
// 获取用户信息（新开门店页面使用）
export const getUserInfo = '/account/get-user-info'
// 【安全管理】页面 start
// 修改密码
export const modifyPassword = '/account/modify-password'
// 设置支付密码
export const accountSetPayPassword = '/account/set-pay-password'
// 修改绑定手机号码第一步
export const modifyPhoneStep1 = '/account/modify-phone-step1'
// 修改绑定手机号码
export const modifyPhone = '/account/modify-phone'
// 【安全管理】页面 end

// 【修改信息】页面 start
// 获取公司规模列表
export const getCompanySize = '/account/get-company-size'
// 获取用户类型
export const getUserType = '/account/get-user-type'
// 获取会员详细信息
export const getDetailInfo = '/account/get-detail-info'
// 获取用户等级列表
export const getRankList = '/account/get-rank-list'
// 修改用户个人信息
export const modifyUserInfo = '/account/modify-user-info'
// 【修改信息】页面 end

// 获取会员三级域名
export const getThreeLevelDomain = '/account/get-three-level-domain'
// 获取Host地址
export const accountGetHost = '/account/get-host'
// 获取用户信息
export const accountGetUserInfo = '/account/get-user-info'
// 获取微信第三方登录url
export const accountUnionLoginUrl = '/account/union-login-url'
// 第三方绑定登录
export const accountBindLogin = '/account/bind-login'
// 解除第三方绑定
export const accountUnlink = '/account/unlink'
// 获取用户等级列表
export const accountGetRankList = '/account/get-rank-list'
// 获取奖励金
export const accountGetCommission = '/account/get-commission'
// 获取前台域名
export const actionGetDomain = '/account/get-domain'
// 获取租户列表
