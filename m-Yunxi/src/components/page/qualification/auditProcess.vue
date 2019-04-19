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
.wrapper{
  font-size:@f6;
  color:@6;
  text-align: center;
}
</style>
<template>
    <my-audit :step="currentStep" :process="process" :error-msg="errorMsg" :result-msg="resultMsg" :result-type="resultType" @uploadAuditStatus="uploadAuditStatusFun"></my-audit>
</template>
<script>
import myAudit from '@/components/common/myAudit'
export default {
  components: { myAudit },
  data() {
    return {
      // 当前步骤
      currentStep: 0,
      // 错误信息
      errorMsg: '',
      // 认证步骤
      process: [],
      // 审核结果
      resultMsg: '',
      // 审核结果类型
      resultType: ''
    }
  },
  methods: {
    // 更新审核状态
    uploadAuditStatusFun() {
      this.currentStep = 0
      this.errorMsg = ''
      this.resultMsg = ''
      this.resultType = ''
      this.process = [
        {
          title: '签署协议',
          desc: '在线签署云玺印产品代理协议',
          btn: '签署',
          router: '/signAgreement',
          error: 0
        },
        {
          title: '提交资质',
          desc: '提交资料和资质信息',
          btn: '填写',
          router: '/submitMaterial',
          error: 0
        },
        {
          title: '收款账户',
          desc: '填写收款银行账户信息',
          btn: '填写',
          router: '/submitAccount',
          error: 0
        }
      ]
      this.getAuthInfo()
    },
    // 获取审核信息
    getAuthInfo() {
      this.$fetch.getAuthInfo().then(({ info, step }) => {
        Object.keys(step).forEach((val, index) => {
          if (index <= this.process.length - 1) {
            this.process[index].title = step[val].text
          }
        })
        if (info) {
          let { auth_step, auth_type, audit_step, error_step, message } = info
          this.currentStep = auth_step / 10
          sessionStorage.auth_step = auth_step
          sessionStorage.auth_type = auth_type
          if (auth_step === 40) {
            this.resultType = 'going'
            this.resultMsg = '审核中'
          }
          if (auth_step === 50) {
            this.resultType = 'ok'
            this.resultMsg = '已审核'
          }
          if (audit_step === -1) {
            error_step.forEach(val => {
              let _index = Number(val) / 10 - 1
              if (_index <= this.process.length - 1) {
                this.process[_index].error = 1
              }
            })
            this.resultType = 'fail'
            this.resultMsg = '审核失败'
            this.errorMsg = message
          } else if (audit_step === 1) {
            this.resultType = 'ok'
            this.resultMsg = '审核成功'
          }
        } else {
          sessionStorage.auth_step = 10
          sessionStorage.auth_type = 0
        }
      })
    }
  },
  activated() {
    this.uploadAuditStatusFun()
  }
}
</script>
