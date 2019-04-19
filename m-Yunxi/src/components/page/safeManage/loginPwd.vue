/*
 * @Author: 陈航
 * @Date: 2018-12-21 15:40:41
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-22 13:54:33
 * @Desc: 修改登录密码
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.loginPwd-wrapper{
  position:relative;
  padding-top:15vw;
  background-color: #f5f5f5;
  .btn{
    margin:3vw auto;
    width:90vw;
    height:10.8vw;
    line-height: 10.8vw;
    border-radius:1.1vw;
    background-color: #eeeded;
    color:#9c9b9b;
    text-align: center;
    font-size:@f7;
  }
  .input{
    margin:3vw auto;
    background-color: #fff;
    height:12.5vw;
    line-height: 12.5vw;
    border-radius:1.6vw;
    .flexUi(space-between);
    font-size: @f7;
    input{
      border:0;
      background: none;
      outline: none;
      display: inline-block;
      line-height: 12.5vw;
      padding-left:4vw;
      width:82vw;
      font-size: 0.75rem;
      color:@3;
    }
    .phone{
      width:70vw;
    }
    .red{
      color:@red;
    }
    span{
      padding-right:4vw;
    }
  }
  .showPwd{
    .flexUi(flex-end);
    padding-right:5vw;
    font-size:@f6;
    .circle{
      width:@f6;
      height:@f6;
      border-radius:50%;
      background-color:@grey;
      margin-right:1vw;
    }
    .blue{
      background-color:@blue;
      .flexUi(center);
      i{
        font-size:0.4rem;
        color:#fff;
      }
    }
  }
  .change{
    margin:6vh auto;
    background-color: @blue;
    color:#fff;
  }
  .grey{
    background-color: #ccc;
  }
  .index{
    position:fixed;
    background:none;
    margin-left:5vw;
    left:0;
    bottom:1vh;
  }
}
</style>
<template>
  <div class="loginPwd-wrapper">
    <header-basic title="修改登录密码"></header-basic>
    <div class="btn input">
      <input :type="showPwd?'text':'password'" placeholder="请输入旧密码" v-model.trim="formField.org_password.value" :ref="formField.org_password.ref" autofocus/>
    </div>
    <div class="btn input">
      <input :type="showPwd?'text':'password'" placeholder="请输入6-16位新密码" v-model.trim="formField.new_password.value" :ref="formField.new_password.ref" autofocus/>
    </div>
    <div class="btn input">
      <input :type="showPwd?'text':'password'" placeholder="请再次输入新密码" v-model.trim="formField.re_password.value" :ref="formField.re_password.ref" autofocus/>
    </div>
    <div class="showPwd" @click="showPwd=!showPwd">
      <span class="circle" :class="{blue:showPwd}"><i v-if="showPwd" class="iconfont icon-gouxuan"></i></span><span>显示密码</span>
    </div>
    <div class="btn change" @click="changePwd">确定修改</div>
  </div>
</template>
<script>
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { headerBasic },
  data() {
    return {
      // 是否显示密码
      showPwd: false,
      // 表单数据
      formField: {
        org_password: {
          value: '',
          required: true,
          pattern: 'PASSWORD',
          ref: 'formField.org_password',
          errMsg: '请填写#旧密码#为6-16位不含空格的任意字符'
        },
        new_password: {
          value: '',
          required: true,
          pattern: 'PASSWORD',
          ref: 'formField.new_password',
          errMsg: '请填写#新密码#为6-16位不含空格的任意字符'
        },
        re_password: {
          value: '',
          required: true,
          pattern: 'PASSWORD',
          ref: 'formField.re_password',
          errMsg: '请再次输入#新密码#为6-16位不含空格的任意字符'
        }
      }
    }
  },
  methods: {
    // 修改登录密码
    changePwd() {
      let result = this.$formValidate(this.formField)
      if (!result) {
        return false
      } else if (this.formField.new_password.value !== this.formField.re_password.value) {
        this.$toast('新密码两次输入不一致')
        return false
      }
      this.$loading('修改密码...')
      this.$fetch.modifyPassword(result).then(() => {
        this.$loading()
        this.$fetch.logout()
        // 微信授权
        for (let key in sessionStorage) delete sessionStorage[key]
        localStorage.access_token = ''
        localStorage.auth_id = ''
        delete localStorage.access_token
        delete localStorage.auth_id
        // 更新用户角色
        this.$store.dispatch('CHANGE_USER_ROLE', 1)
        this.$router.push('/login')
      }).catch(msg => {
        this.$loading()
        this.$refs[this.formField.org_password.ref].focus()
        this.$toast(msg)
      })
    }
  },
  activated() {
    this.showPwd = false
    for (let val of Object.values(this.formField)) {
      val.value = null
    }
  }
}
</script>
