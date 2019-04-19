/*
 * @Author: 黄智强
 * @Date: 2018-01-27 09:57:46
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-11-02 10:44:30
 * @说明：订单(order)接口地址
 */
// 提交订单
export const create = '/order/create'
// 代理商提交代客户下单订单
export const orderCreateCustomer = '/order/create-customer'
// 服务提交订单
export const serviceCreate = '/order/service-create'
// 订单详情 根据订单编号获取订单详情
export const view = '/order/view'
// 获取订单列表
export const list = '/order/list'
// 获取订单状态参数列表
export const statusList = '/order/status-list'
// 模拟开店
export const openStore = '/order/open-store'
// 取消订单
export const orderCancel = '/order/cancel'
