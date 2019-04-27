/*
 * @Author: 黄智强
 * @Date: 2018-01-27 09:56:30
 * @Last Modified by: 黄智强
 * @说明：代理商客户管理相关接口地址
 */

// 代理商客户列表
export const customerList = '/customer/list'
// 添加客户
export const customerAdd = '/customer/add'
// 修改客户
export const customerEdit = '/customer/edit'
// 获取客户详情
export const customerGetCustomerInfo = '/customer/get-customer-info'
// 删除客户
export const customerDel = '/customer/del'
// 获取代理商可设置等级
export const customerCustomerRankList = '/customer/customer-rank-list'
// 获取代理商可设置折扣
export const customerCustomerDiscountList = '/customer/customer-discount-list'
// 设置客户会员等级
export const customerSetCustomerRank = '/customer/set-customer-rank'
// 检测是否设置客户会员等级
export const customerCheckCustomerRank = '/customer/check-customer-rank'
// 检查客户手机号是否存在
export const customerCheckCustomerMobile = '/customer/check-customer-mobile'
// 获取代理商设置参数配置
export const customerCustomerConfig = '/customer/get-customer-config'
