/*
 * @Author: 陈航
 * @Date: 2018-11-12 15:37:09
 * @Last Modified by: 陈航
 * @说明：消息通知(notification)相关的所有接口地址定义
 */

// 通过id获取消息通知
export const notificationGetNotificationInfo = '/notification/get-notification-info'
// 批量标记已读消息通知
export const notificationBatchSetReadNotice = '/notification/batch-set-read-notice'
// 标记已读消息通知
export const notificationSetReadNotice = '/notification/set-read-notice'
// 未读消息计数
export const notificationNoticeCount = '/notification/notice-count'
// 消息列表
export const notificationList = '/notification/list'
