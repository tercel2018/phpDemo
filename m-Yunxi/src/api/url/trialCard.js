/*
 * @Author: 黄智强
 * @Date: 2018-04-12 16:37:09
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-04-13 10:59:39
 * @说明：试用卡(trial-card)相关的所有接口地址定义
 */

// 获取活动试用卡信息： 获取当前兑换成功试用卡的活动信息
export const trialCardGetInfo = '/activity/trial-card/get-activity-info'
// 验证是否符合使用限制： 验证该手机号是否符合使用限制
export const trialCardPhoneRequire = '/activity/trial-card/phone-require'
// 试用卡绑定手机号：给获取的试用卡绑定手机号
export const trialCardBindPhone = '/activity/trial-card/bind-phone'
// 活动用户卡包列表：获取活动用户绑定的试用卡
export const trialCardCardPackList = '/activity/trial-card/card-pack-list'
// 验证公司名称是否重复
export const trialCardCardCheckCompany = '/activity/trial-card/check-company'
// 通过活动模拟开店
export const trialCardCardOpenStore = '/activity/trial-card/open-store'
// 活动开店的状态
export const trialCardCardOpenStoreStatus = '/activity/trial-card/open-store-status'
