/*
 * @Author: 陈航
 * @Date: 2019-01-14 10:55:29
 * @Last Modified by: 陈航
 * @Last Modified time: 2019-01-15 15:14:54
 * @Desc: 新增、编辑员工
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.employee-operate-wrapper{
  padding-top:12vw;
  padding-bottom:13vw;
  font-size:@f6;
  color:@6;
  .employee-content{
    margin:3vw 0 0;
    width:100vw;
    .my-radio-container{
      padding-left:15px;
      background-color: #fff;
      .my-radio{
        position:relative;
        padding:3vw 0;
        width:calc(~'100vw - 15px');
        width:-webkit-calc(~'100vw - 15px');
        &:after{
          position:absolute;
          content: '';
          left:0;
          bottom:0;
          width:calc(~'100vw - 15px');
          width:-webkit-calc(~'100vw - 15px');
          height:1px;
          transform: scaleY(0.5);
          background-color: #D9D9D9;
        }
      }
    }
    .no-border-top-group{
      color:@3;
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
  <div class="employee-operate-wrapper" component-fixed-offset="13vw" v-show="requestNum>=1">
    <header-basic :title="pageTitle"></header-basic>
    <div class="employee-content" id="employee-content">
      <div class="my-radio-container">
        <my-radio title="选择角色：" class="my-radio" :radioList="radioList" @change="getCurrentRadio"></my-radio>
      </div>
      <group class="no-border-top-group">
        <x-input  class="element-value-required" title="员工名称：" v-model.trim="formField.full_name.value" :ref="formField.full_name.ref" type="text" label-width="24vw" placeholder="请填写员工名称" required></x-input>
        <x-input v-if="userMobileCanEdit" class="element-value-required" title="手机号码：" v-model.trim="formField.user_mobile.value" :ref="formField.user_mobile.ref" type="number" label-width="24vw" placeholder="请填写员工的手机号码" required></x-input>
        <x-input v-else class="element-value-required" title="手机号码：" v-model.trim="formField.user_mobile.value" :ref="formField.user_mobile.ref" type="number" label-width="24vw" disabled></x-input>
      </group>
    </div>
    <div class="audit-submit" @click="submitEmployeeOperate" data-fixed-bottom="component">{{submitBtn}}</div>
  </div>
</template>
<script>
import { Group, XInput, PopupRadio } from 'vux'
import headerBasic from '@/components/common/headerBasic'
import myRadio from '@/components/common/myRadio'
export default {
  components: { headerBasic, Group, XInput, myRadio, PopupRadio },
  data() {
    return {
      // 请求次数
      requestNum: 0,
      // 页面标题
      pageTitle: '添加员工',
      // 提交按钮
      submitBtn: '提交',
      // 角色类别
      radioList: [],
      // 表单数据
      formField: {
        full_name: {
          value: '',
          required: true,
          ref: 'formField.full_name',
          errMsg: '请填写#员工名称'
        },
        user_mobile: {
          value: '',
          required: true,
          pattern: 'MOBILE',
          ref: 'formField.user_mobile',
          errMsg: '请填写#手机号码#格式有误'
        }
      },
      // 员工电话号码是否可以编辑
      userMobileCanEdit: true
    }
  },
  computed: {
    currentUserRoleType() {
      return this.radioList.filter(item => item.checked)[0].value
    }
  },
  watch: {
    requestNum(newVal) {
      if (newVal === 1) {
        this.$nextTick(function() {
          let refer = document.querySelector('#employee-content')
          let clientHeight = document.documentElement.clientHeight
          let offTop = refer && refer.offsetTop
          let offsetHeight = refer && refer.offsetHeight
          refer && (refer.style.marginBottom = (clientHeight - offsetHeight - offTop * (50 / 15)) + 'px')
        })
      }
    }
  },
  methods: {
    // 获取角色列表
    getUserRoleList() {
      this.radioList = []
      this.$fetch.userRoleGetRoleList().then(data => {
        this.radioList = data.map(item => ({
          value: item.role_id,
          text: item.role_name,
          checked: false
        }))
        // this.radioList[0].checked = true
        this.$loading()
        this.getEmployeeInfo()
        this.requestNum++
      }).catch(err => {
        console.log('userRoleGetRoleList => errMsg: ' + err)
      })
    },
    // 获取员工信息
    getEmployeeInfo() {
      if (sessionStorage.editEmployee) {
        let employee = JSON.parse(sessionStorage.editEmployee)
        this.radioList.forEach(item => {
          if (Number(item.value) === Number(employee.role_id)) {
            item.checked = true
          } else {
            item.checked = false
          }
        })
        this.formField.full_name.value = employee.full_name
        this.formField.user_mobile.value = employee.user_mobile
        if (Number(employee.agent_verified) === 1) {
          this.userMobileCanEdit = false
        }
      } else {
        this.radioList.forEach((item, index) => {
          if (index === 0) {
            item.checked = true
          } else {
            item.checked = false
          }
        })
        this.formField.full_name.value = ''
        this.formField.user_mobile.value = ''
      }
    },
    // 开户类型改变通知订阅者
    getCurrentRadio(i) {
      console.log(JSON.stringify(i, null, 2))
    },
    // 提交账户
    submitEmployeeOperate() {
      let result = this.$formValidate(this.formField)
      if (!result) {
        return false
      }
      result['role_ids'] = [this.currentUserRoleType]
      let params = { ...result }
      let action = 'Create'
      if (sessionStorage.editEmployee) {
        let { user_id } = JSON.parse(sessionStorage.editEmployee)
        action = 'Edit'
        params.user_id = user_id
      }
      this.$loading(`正在${this.pageTitle}...`)
      this.$fetch['subAccount' + action](params).then(() => {
        this.$loading()
        this.$router.go(-1)
      }).catch(err => {
        this.$loading()
        console.log('receiveAaccount => ' + err)
      })
    }
  },
  activated() {
    this.pageTitle = '添加员工'
    this.submitBtn = '提交'
    this.requestNum = 0
    this.radioList = []
    this.userMobileCanEdit = true
    if (this.$route.query.type && Number(this.$route.query.type) === 1) {
      this.pageTitle = '编辑员工'
      this.submitBtn = '保存'
    }
    this.$loading(`${this.pageTitle}...`)
    this.getUserRoleList()
    document.querySelector('#footerBar').style.display = 'none'
  },
  deactivated() {
    document.querySelector('#footerBar').style.display = 'block'
  }
}
</script>
