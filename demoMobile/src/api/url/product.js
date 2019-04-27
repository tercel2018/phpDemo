/*
 * @Author: 黄智强
 * @Date: 2018-01-12 16:37:09
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-10-25 10:21:35
 * @说明：产品(product)相关的所有接口地址定义
 */
// 获取开通时长
export const getDuration = '/product/get-duration'
// 获取版本信息
export const getProduct = '/product/get-product'
// 获取当前配置商品的价格
export const getPrice = '/product/get-price'
// 获取续费时长列表 获取续费时长附带价格列表,get方式请求
export const getDurationsWithPrice = '/product/get-durations-with-price'
// 获取升级套餐列表  获取升级套餐列表，返回更高级的套餐列表附带价格，get方式请求
export const getProductsWithPrice = '/product/get-products-with-price'
// 套餐功能对比
export const packageCompare = '/product/package-compare'
// 获取当前正在进行中的活动
export const packagegetCurrentActivity = '/product/get-current-activity'
// 获取当前的满减送活动信息
export const getPackageActivity = '/product/get-package-activity'
