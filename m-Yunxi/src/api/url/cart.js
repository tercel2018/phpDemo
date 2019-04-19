/*
 * @Author: 黄智强
 * @Date: 2018-01-12 16:37:09
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-10-27 11:57:05
 * @说明：购物车(cart)相关的所有接口地址定义
 */
// 获取商品数据
export const getCartInfo = '/cart/get-cart-info'
// 随机生成域名
export const cartCreateDomain = '/cart/create-domain'
// 检查域名是否存在
export const checkDomain = '/cart/check-domain'
// 获取会员过滤域名
export const getFilterDomain = '/cart/get-filter-domain'
// 添加到购物车
export const addCart = '/cart/add'
// 结算
export const settlement = '/cart/settlement'
// 获取结算信息
export const getSettlement = '/cart/get-settlement'
// 删除购物车中的产品
export const cartRemove = '/cart/remove'
// 修改购物车产品
export const cartEdit = '/cart/edit'
// 批量删除购物车内产品
export const batchRemove = '/cart/batch-remove'
// 获取用户租户(公司)列表
export const cartGetUserTenantList = '/cart/get-user-tenant-list'
// 选择券时，获取新的结算价格
export const cartGetSettlementPrice = '/cart/get-settlement-price'
