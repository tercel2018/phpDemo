/*
 * @Author: 黄智强
 * @Date: 2018-01-27 09:58:58
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-04-11 15:21:19
 * @说明：门店(store)所有接口地址
 */

// 获取门店列表
export const getStore = '/store/get-store'
// 获取到期门店数量
export const storeGetExpireStore = '/store/get-expire-store'
// 门店续费或升级
export const rechargeUpgrade = '/store/recharge-upgrade'
// 获取门店已购功能模块
export const storePurchasedInfo = '/store/get-purchased-info'
// 单独购买获取门店功能模块
export const storesPurchasedFunction = '/store/get-stores-purchased-function'
// 修改租户信息
export const storeEditTenant = '/store/edit-tenant'
// 获取租户列表
export const getTenantList = '/store/get-tenant-list'
