/*
 * @Author: 黄智强
 * @Date: 2018-01-31 13:49:24
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-10-16 14:05:13
 * @说明：订单支付页面所需接口地址
 */
// 订单支付页面获取订单支付信息及微信二维码url
export const payIndex = '/pay/index'
// 支付宝支付 获取支付宝支付链接
export const alipay = '/pay/alipay'
// 微信扫码支付接口  生成微信支付二维码url
export const wxpay = '/pay/wxpay'
// 微信扫码h5支付接口
export const payWxH5Pay = '/pay/wx-h5-pay'
// 微信js支付
export const payWxJsPay = '/pay/wx-js-pay'
// 支付回调
export const getLog = '/pay-return/get-log'
// 微信订单查询接口
export const wxQuery = '/pay/wx-query'
// 获取支付方式列表
export const getPaymentList = '/pay/get-payment-list'
// 检查用户是否设置支付密码
export const getCheckPayPasswordExist = '/pay/check-pay-password-exist'
// 余额支付
export const payWalletPay = '/pay/wallet-pay'
// 订单支付状态查询接口
export const payOrderPayQuery = '/pay/order-pay-query'
// 支付宝签约订单查询接口
export const alipayQuery = '/pay/alipay-query'
// 微信授权
export const payGetOpenId = '/pay/get-open-id'
// 支付宝授权
export const payGetBuyerId = '/pay/get-buyer-id'
// 支付宝支付
export const payAlipayJsPay = '/pay/alipay-js-pay'
