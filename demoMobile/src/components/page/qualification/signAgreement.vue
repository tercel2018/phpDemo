/*
 * @Author: 陈航
 * @Date: 2018-12-3 15:20:55
 * @Last Modified by: 陈航
 * @说明：审核进度
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.sign-agreement-wrapper{
  padding:12vw 0 13vw;
  font-size:@f6;
  .auth_wrapper{
    margin:0vw 5vw 8vw;
    .flexUi;
    span.protocol{
      font-size:@f6;
      vertical-align: middle;
    }
    .auth_checked{
      .flexUi;
      i{
        margin:0 2vw 0 1vw;
        color:@blue;
        font-size:@f8;
      }
    }
  }
  .audit-submit{
    position:fixed;
    bottom:0;
    left:0;
    width:100vw;
    height:13vw;
    text-align: center;
    line-height: 13vw;
    background-color: @blue;
    color:#fff;
    font-size:@f7;
    letter-spacing: .1*@f7;
  }
}
</style>
<template>
  <div class="sign-agreement-wrapper">
    <header-basic title="签署协议"></header-basic>
    <agreement></agreement>
    <!-- 勾选协议 -->
    <div class="auth_wrapper">
      <check-icon v-if="!has_signed" :value.sync="is_agreed" type="plain">我已阅读、同意并接受《云玺印代理协议》</check-icon>
      <div v-else class="auth_checked">
        <i class="iconfont icon-gouxuan1"></i><span>我已阅读、同意并接受《云玺印代理协议》</span>
      </div>
    </div>
    <div v-if="!has_signed" class="audit-submit" @click="signAgreement">签署</div>
  </div>
</template>
<script>
import { CheckIcon } from 'vux'
import headerBasic from '@/components/common/headerBasic'
import agreement from '@/components/common/agreement'
export default {
  components: { headerBasic, agreement, CheckIcon },
  data() {
    return {
      has_signed: false,
      is_agreed: false
    }
  },
  methods: {
    signAgreement() {
      if (!this.is_agreed) {
        this.$toast('请勾选协议')
        return false
      }
      let user_role = this.$store.state.userRole
      this.$loading('正在签署协议...')
      this.$fetch.agreementSign().then(data => {
        sessionStorage.realyAgent = data.user_role === 11 ? '1' : ''
        sessionStorage.user_role = data.user_role
        this.$store.dispatch('CHANGE_USER_ROLE', data.user_role)
        this.$loading()
        if (user_role === 1) {
          this.$toast('恭喜您申请成为代理商成功！已为您开通所有代理商功能，马上开店即可享受更低折扣，邀请客户还可获得更多佣金喔~')
        }
        this.$router.go(-1)
      })
    }
  },
  activated() {
    if (Number(sessionStorage.auth_step)) {
      this.has_signed = true
      this.is_agreed = true
    } else {
      this.has_signed = false
      this.is_agreed = false
    }
  }
}
</script>
