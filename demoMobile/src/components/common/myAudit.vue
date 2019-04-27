/*
 * @Author: 陈航
 * @Date: 2018-12-3 15:20:55
 * @Last Modified by: 陈航
 * @说明：审核进度组件
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.audit-wrapper{
  padding:12vw 0 13vw;
  height: calc(~'100vh - 25vw');
  height: -webkit-calc(~'100vh - 25vw');
  background-image:url('../../assets/image/audit_bg.png');
  background-size:100% auto;
  background-position: center 12vw;
  background-repeat: no-repeat;
  background-color: #fff;
  .audit-info{
    height:36.7vw;
    .my-process-container{
      padding-top:12.4vw;
    }
    .my-audit-result{
      padding-top:4.8vw;
      img{
        display: block;
        margin:0 auto;
        width:17vw;
        height:auto;
      }
      p{
        text-align: center;
        color:#fff;
        font-size:@f7;
        line-height: 10vw;
      }
    }
  }
  .audit-steps-list{
    margin: 0 auto;
    width:78.6vw;
    .steps-item{
      margin-bottom:4vw;
      padding:0 3vw 0 4vw;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      .flexUi(space-between);
      width:78.6vw;
      height:22.7vw;
      background-color: #fff;
      box-shadow: 0 0 2.7vw rgba(0, 63, 211, 0.1);
      border-radius: 0.6vw;
      h4{
        padding-top:2vw;
        line-height: 9.4vw;
        font-size:@f7;
        font-weight:400;
      }
      p{
        font-size:@f5;
        padding-bottom:6vw;
        line-height: 5.3vw;
        color:#656565;
      }
      .right{
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        width:20vw;
        height: 6vw;
        line-height: 6vw;
        text-align: center;
        background-color: @blue;
        color:#fff;
        font-size:@f5;
      }
      .right.done{
        background-color: #b3b3b3;
      }
    }
    .steps-item.fail{
      border: #ffdbdb solid 1px;
      background-color: #fffbfb;
      .right.fail{
        background-color: #fff;
        border:#fb9795 solid 1px;
        color:#f10606;
      }
    }
  }
  .audit-tips{
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin: 0 auto;
    padding-left:2.2vw;
    width:78.6vw;
    height:7vw;
    line-height: 7vw;
    font-size:@f5;
    color: #fb5c52;
    background-color: #fff3f3;
    border-radius: 0.6vw;
    i,span{
      display: inline-block;
      line-height: 7vw;
      vertical-align: middle;
    }
    i{
      margin-right:1vw;
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
  .audit-submit.prevent-submit{
    background-color: #b3b3b3;
  }
}
</style>
<template>
  <div class="audit-wrapper">
    <header-basic title="认证进度"></header-basic>
    <div class="audit-info">
      <template v-if="!resultMsg">
        <div class="my-process-container">
          <my-process :activeIndex="step - 1" :steps="steps"></my-process>
        </div>
      </template>
      <template v-else>
        <div class="my-audit-result">
          <img v-if="resultType==='ok'" src="@/assets/image/audit_ok.png"/>
          <img v-else-if="resultType==='fail'" src="@/assets/image/audit_fail.png"/>
          <img v-else src="@/assets/image/audit_going.png"/>
          <p>{{resultMsg}}</p>
        </div>
      </template>
    </div>
    <ul class="audit-steps-list" v-if="process.length">
      <li class="steps-item" v-for="(i,index) in process" :class="{fail:i.error===1}" :key="index">
        <div class="left">
          <h4>{{i.title}}</h4>
          <p>{{i.desc}}</p>
        </div>
        <div v-if="i.error===1" class="right fail" @click="$router.push(i.router)">重新{{i.btn}}</div>
        <div v-else-if="step<=index && !resultMsg" class="right"  @click="if (step===index) {$router.push(i.router)}">{{i.btn}}</div>
        <div v-else class="right done">已{{i.btn}}</div>
      </li>
    </ul>
    <div class="audit-tips" v-if="errorMsg"><i class="iconfont icon-test"></i><span>{{errorMsg}}</span></div>
    <div v-if="step < 3" class="audit-submit prevent-submit">提交</div>
    <div v-else-if="step==3 || (step>=4 && resultType==='fail')" class="audit-submit" @click="submitApply">提交</div>
  </div>
</template>
<script>
import headerBasic from './headerBasic'
import myProcess from './myProcess'
export default {
  props: [ 'step', 'process', 'error-msg', 'result-msg', 'result-type' ],
  components: { headerBasic, myProcess },
  data() {
    return {}
  },
  computed: {
    steps() {
      return this.process.reduce((ret, curr) => {
        ret.push(curr.title)
        return ret
      }, [])
    }
  },
  methods: {
    // 提交申请
    submitApply() {
      this.$loading('提交申请')
      this.$fetch.submitApplication().then(() => {
        this.$loading()
        this.$emit('uploadAuditStatus')
      }).catch(err => {
        this.$loading()
        console.log('submitApplication => ' + err)
      })
    }
  }
}
</script>
