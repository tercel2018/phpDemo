/*
 * @Author: 陈航
 * @Date: 2018-10-29 09:56:30
 * @说明：activity相关接口地址
 */
// 领券中心-卡券列表
export const getActivityList = '/activity/index/get-activity-list'
// 领券中心-立即领取
export const receiveTicket = '/activity/index/receive-ticket'
// 获取卡包列表
export const activityGetCardList = '/activity/coupon/get-card-list'
// 是否可以参加活动,返回200，表示可以参加该活动
export const activityCouponCheckActivity = '/activity/coupon/check-activity'
// 免费券活动开店
export const couponOpenStore = '/activity/coupon/open-store'
// 验证公司名称是否重复
export const couponCheckCompany = '/activity/coupon/check-company'
// 活动开店的状态
export const couponOpenStoreStatus = '/activity/coupon/open-store-status'
