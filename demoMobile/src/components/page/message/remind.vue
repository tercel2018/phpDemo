/*
 * @Author: 陈航
 * @Date: 2018-10-11 16:40:55
 * @Last Modified by: 陈航
 * @说明：消息提醒页面
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.wrapper{
  font-size:@f6;
  color:@6;
  text-align: center;
  img{
    display: block;
    margin: 10vh auto;
    width:60%;
  }
}
</style>
<template>
  <div class="wrapper">
    <img src="../../../assets/image/noOrder.png"/>
    {{msg}}--功能正在开发中...
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: '消息提醒',
      notificationList: []
    }
  },
  methods: {
    // 获取消息列表
    getNotificationList(parmas) {
      let flag = parmas
      // parmas = '&is_read=' + this.is_read + '&page_size=5'
      this.notificationList = flag ? '' : []
      this.$fetch.notificationList(parmas).then(data => {
        if (flag) {
          //
        } else {
          if (data.list.length === 0) data.list = ''
          this.notificationList = data.list
        }
      })
    },
    // 单个标记已读消息通知
    notificationSetReadNotice(i) {
      this.$fetch.notificationSetReadNotice({ notification_id: 0 }).then(() => {
        this.getNotificationList(0)
      })
    },
    // 批量标记为已读消息通知
    notificationBatchSetReadNotice() {
      this.$fetch.notificationBatchSetReadNotice({ notification_id_list: [] }).then(() => {
        console.log('data')
      })
    }
  },
  activated() {
    // this.getNotificationList()
    // this.notificationBatchSetReadNotice()
    // this.notificationSetReadNotice()
  }
}
</script>
