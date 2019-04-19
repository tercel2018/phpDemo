/*
 * @Author: 陈航
 * @Date: 2018-12-18 10:40:55
 * @Last Modified by: 陈航
 * @说明：添加客户
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.add-customer-wrapper{
  padding-top:12vw;
  padding-bottom:13vw;
  font-size:@f6;
  color:@6;
  .add-customer-content-up{
    margin:3vw 0;
    width:100vw;
    .no-border-top-group{
      color:@3;
    }
    .customer-manager{
      margin-left:15px;
      padding:10px 0;
      width: calc(~'100vw - 15px');
      font-size: @f6;
      position: relative;
      .flexUi;
      &:after{
        content:'';
        position: absolute;
        top:0;
        left:0;
        height:1px;
        width:calc(~'100vw - 15px');
        width: -webkit-calc(~'100vw - 15px');
        background-color: #D9D9D9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      label{
        display:inline-block;
        width:30vw;
      }
      input{
        outline: none;
        border:0;
        appearance: none;
        background: none;
        font-size: @f6;
        width:calc(~'100vw - 30px - 30vw');
        width: -webkit-calc(~'100vw - 30px - 30vw');
      }
      input:disabled{
        outline: none;
        border:0;
        appearance: none;
        background: none;
      }
      datalist{
        font-size: @f6;
      }
    }
  }
  .add-customer-content-down{
    width:100vw;
    background-color: #fff;
    color:#333;
    .address{
      .flexUi;
      position: relative;
      margin-left:15px;
      width:calc(~'100vw - 15px');
      width:-webkit-calc(~'100vw - 15px');
      height:12vw;
      line-height: 12vw;
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
      p{
        width:24vw;
      }
      ul{
        .flexUi;
        li{
          .flexUi;
          margin-right:.2vw;
          width:24vw;
          font-size:@f6;
          height:12vw;
          span{
            display: inline-block;
            margin-right:.1vw;
            height:12vw;
            max-width: 4.5*@f6;
            word-wrap: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          i{
            display: inline-block;
            color:@9;
          }
        }
      }
    }
  }
  .add-submit{
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
  <div class="add-customer-wrapper" component-fixed-offset="13vw">
    <header-basic :title="loadMsg"></header-basic>
    <div class="add-customer-content-up">
      <group class="no-border-top-group">
        <x-input title="客户名称：" class="element-value-required" v-model.trim="formField.cus_name.value" :ref="formField.cus_name.ref" type="text" label-width="30vw" placeholder="请填写客户名称" :required="type!=2" :disabled="type==2"></x-input>
        <!-- <div class="customer-manager">
          <label>客户经理：</label>
          <input type="text" v-model.trim="formField.add_user_id.value" list="browsers" placeholder="请搜索并选择客户经理" :disabled="type==2"/>
          <datalist id="browsers">
            <option value="" key="0">请选择客户经理</option>
            <option v-for="(i,key) in staffList" :key="key+1" :value="i.full_name" >{{i.full_name}}({{i.user_mobile}})</option>
          </datalist>
        </div> -->
        <popup-radio title="客户经理：" v-model.trim="formField.add_user_id.value" :options="staffList" value-text-align="left" placeholder="请选择客户经理" label-align="justify" label-width="30vw" raw-value :readonly="type==2"></popup-radio>
        <x-input class="element-value-required" title="客户手机号：" v-model.trim="formField.cus_mobile.value" :ref="formField.cus_mobile.ref" type="text" label-width="30vw" placeholder="请填写客户手机号" :required="type!=2" :disabled="type!=0"></x-input>
        <x-input v-if="type==0" class="element-value-required" title="验证码：" v-model.trim="formField.code.value" :ref="formField.code.ref" type="number" label-width="30vw" placeholder="请填写验证码" :required="type!=2" :disabled="type==2">
          <span slot="right" v-if="seconds<=0" class="red" @click="sendCode">获取验证码</span>
          <span slot="right" v-else class="red">{{seconds}}秒后获取</span>
        </x-input>
        <popup-radio v-if="isSetUserRank=='1'" title="客户等级："  v-model.trim="formField.user_rank.value" :options="customerRankList" value-text-align="left" :placeholder="'设置后' + restTime + '个月内不可更改'" label-align="justify" label-width="30vw" raw-value :readonly="type==2 || (type==1 && isSetUserRank == '1')"></popup-radio>
        <popup-radio v-if="isSetUserRank=='2'" title="客户折扣："  v-model.trim="formField.discount.value" :options="customerDiscountList" value-text-align="left" placeholder="选择客户折扣" label-align="justify" label-width="30vw" raw-value :readonly="type==2"></popup-radio>
        <x-address class="element-value-required" title="选择地址：" v-model.trim="addressValue"  :list="addressData" value-text-align="left" placeholder="请选择地址" label-align="justify" label-width="30vw" raw-value :disabled="type==2"></x-address>
        <x-input title="详细地址：" v-model.trim="formField.address.value" :ref="formField.address.ref" type="text" label-width="30vw" placeholder="请填写详细地址" :disabled="type==2"></x-input>
      </group>
    </div>
    <div class="add-customer-content-down">
      <group class="no-border-top-group">
        <x-input title="联系人" v-model.trim="formField.linkman_name.value" :ref="formField.linkman_name.ref" type="text" label-width="30vw" :disabled="type==2"></x-input>
        <x-input title="联系电话：" v-model.trim="formField.linkman_mobile.value" :ref="formField.linkman_mobile.ref" type="number" label-width="30vw" :disabled="type==2"></x-input>
        <x-input title="QQ：" v-model.trim="formField.linkman_qq.value" :ref="formField.linkman_qq.ref" type="number" label-width="30vw" :disabled="type==2"></x-input>
        <x-input title="Email：" v-model.trim="formField.linkman_email.value" :ref="formField.linkman_email.ref" type="email" label-width="30vw" :disabled="type==2"></x-input>
      </group>
    </div>
    <div class="add-submit" v-if="type!=2" @click="addOrEditMemberFun" data-fixed-bottom="component">{{type==0?'新增':'保存'}}</div>
  </div>
</template>
<script>
import { Group, XInput, XAddress, PopupRadio } from 'vux'
import headerBasic from '@/components/common/headerBasic'
export default {
  components: { headerBasic, Group, XInput, XAddress, PopupRadio },
  data() {
    return {
      // 验证码倒计时
      seconds: 0,
      // 请求次数
      requestNum: 0,
      // 全国省市区数据
      addressData: [],
      // 当前省市区
      addressValue: [],
      // 客户id
      cus_id: '',
      // 代理商是否设置会员等级
      isSetUserRank: '0',
      // 代理商设置会员等级间隔时间
      restTime: 0,
      // 代理商可设置等级
      customerRankList: [],
      // 代理商可设置折扣列表
      customerDiscountList: [],
      // 员工列表
      staffList: [],
      // 加载框文字
      loadMsg: '',
      // 当前是新增、编辑还是查看详情
      type: 0,
      // 表单数据
      formField: {
        cus_name: {
          value: '',
          required: true,
          ref: 'formField.cus_name',
          errMsg: '请填写#客户名称'
        },
        add_user_id: {
          value: '',
          // required: true,
          // ref: 'formField.add_user_id',
          errMsg: '请选择#客户经理'
        },
        cus_mobile: {
          value: '',
          required: true,
          ref: 'formField.cus_mobile',
          errMsg: '请填写#客户手机号'
        },
        code: {
          value: '',
          required: true,
          pattern: 'VERIFY_CODE',
          ref: 'formField.code',
          errMsg: '请填写#验证码#为6位数字'
        },
        user_rank: {
          value: '',
          ref: 'formField.user_rank',
          errMsg: '请选择#客户等级'
        },
        discount: {
          value: '',
          ref: 'formField.discount',
          errMsg: '请选择#客户折扣'
        },
        address: {
          value: '',
          ref: 'formField.address',
          errMsg: '请填写#详细地址'
        },
        linkman_name: {
          value: '',
          ref: 'formField.linkman_name',
          errMsg: '请填写#联系人'
        },
        linkman_mobile: {
          value: '',
          pattern: 'PHONE',
          ref: 'formField.linkman_mobile',
          errMsg: '请填写#联系电话#格式有误'
        },
        linkman_qq: {
          value: '',
          pattern: 'QQ',
          ref: 'formField.linkman_qq',
          errMsg: '请填写#QQ号码#格式有误'
        },
        linkman_email: {
          value: '',
          pattern: 'EMAIL',
          ref: 'formField.linkman_email',
          errMsg: '请填写#邮箱#格式有误'
        }
      }
    }
  },
  watch: {
    requestNum (newVal) {
      if (newVal === 5) this.$loading()
    }
  },
  methods: {
    // 初始化数据
    initData() {
      this.cus_id = ''
      this.requestNum = 0
      if (this.$route.query.cus_id) this.cus_id = this.$route.query.cus_id
      document.querySelector('#footerBar').style.display = 'none'
      if (sessionStorage.user_role === 1 || sessionStorage.user_role === '1') {
        this.$router.go(-1)
      } else {
        this.type = Number(this.$route.query.type) || 0
        this.loadMsg = '新增客户'
        if (!this.formField.code) {
          this.formField.code = {
            value: '',
            required: true,
            pattern: 'VERIFY_CODE',
            ref: 'formField.code',
            errMsg: '请填写#验证码#为6位数字'
          }
        }
        for (let val of Object.values(this.formField)) {
          val.value = ''
        }
        if (this.type === 1) {
          this.loadMsg = '编辑客户'
          delete this.formField.code
        } else if (this.type === 2) {
          this.loadMsg = '客户详情'
        }
        this.$loading(this.loadMsg + '...')
        if (this.cus_id) this.customerGetCustomerInfo()
        else this.getRegionList()
        this.customerCustomerRankList()
        this.customerCustomerDiscountList()
        this.getAgentStaffList()
        this.getCustomerCustomerConfig()
      }
    },
    // 获取会员信息
    customerGetCustomerInfo() {
      this.$fetch.customerGetCustomerInfo('&cus_id=' + this.cus_id).then(data => {
        for (let [key, value] of Object.entries(data)) {
          if (this.formField[key]) this.formField[key].value = value
        }
        this.getRegionList(data)
      })
    },
    // 获取重置会员等级配置时间
    getCustomerCustomerConfig() {
      this.$fetch.customerCustomerConfig().then(data => {
        this.restTime = data.set_customer_rank_time
        this.isSetUserRank = data.agent_set_user_rank
        this.requestNum++
      }).catch(err => {
        console.log(err)
        this.$loading()
      })
    },
    // 获取代理商可设置等级
    customerCustomerRankList() {
      this.$fetch.customerCustomerRankList().then(data => {
        let _arr = []
        for (let [key, value] of Object.entries(data)) {
          _arr.push({ key, value: value.rank_name })
        }
        this.customerRankList = _arr
        this.requestNum++
      }).catch(err => {
        console.log(err)
        this.$loading()
      })
    },
    // 获取代理商可设置折扣
    customerCustomerDiscountList() {
      this.$fetch.customerCustomerDiscountList().then(data => {
        let _arr = []
        for (let value of Object.values(data)) {
          let _value = ''
          if (typeof value === 'string' && value.indexOf('折') > -1) {
            _value = value
          } else {
            if (Number(value) / 10 === 10) {
              _value = '不打折'
            } else {
              _value = (Number(value) / 10) + '折'
            }
          }
          _arr.push({ key: value, value: _value })
        }
        this.customerDiscountList = _arr
        this.requestNum++
      }).catch(err => {
        console.log(err)
        this.$loading()
      })
    },
    // 获取代理商员工列表
    getAgentStaffList() {
      this.$fetch.subAccountGetAllEmployee().then(data => {
        this.staffList = [{key: '', value: '暂时不选客户经理'}].concat(data.map(item => {
          return {
            key: item.user_id,
            value: item.full_name + '(' + item.user_mobile + ')'
          }
        }))
        this.requestNum++
      }).catch(err => {
        console.log(err)
        this.$loading()
      })
    },
    // 发送验证码
    sendCode() {
      let phone = /^1\d{10}$/
      let cus_mobile = this.formField.cus_mobile.value
      if (phone.test(cus_mobile)) {
        this.seconds = 60
        let interval = setInterval(() => (this.seconds <= 0 ? clearInterval(interval) : this.seconds--), 1000)
        this.$fetch.customerCheckCustomerMobile({ cus_mobile }).then(({ phone_exist }) => {
          if (phone_exist) {
            this.seconds = 0
            this.$refs[this.formField.cus_mobile.ref].focus()
            if (phone_exist === 1) {
              this.$toast('该手机号码已绑定代理商')
            } else {
              this.$toast('该手机号码已存在')
            }
          } else this.$fetch.sendVerifyCodeSms({ phone: cus_mobile })
        })
      } else {
        this.$toast('手机号码格式有误')
        this.$refs[this.formField.cus_mobile.ref].focus()
      }
    },
    // 获取全国省市区
    getRegionList(_data = {}) {
      this.$fetch.getRegionList('').then(data => {
        let provinceList = []
        let cityList = []
        let areaList = []
        if (data.length) {
          data.forEach((g, g_index) => {
            if (g.children && g.children.length) {
              g.children.forEach((p, p_index) => {
                provinceList.push({ value: String(p.region_id), name: p.region_name })
                if (p.children && p.children.length) {
                  p.children.forEach((c, c_index) => {
                    cityList.push({ value: String(c.region_id), name: c.region_name, parent: String(c.parent_id) })
                    if (c.children && c.children.length) {
                      c.children.forEach((a, a_index) => {
                        areaList.push({ value: String(a.region_id), name: a.region_name, parent: String(a.parent_id) })
                      })
                    }
                  })
                }
              })
            }
          })
        }
        if (_data.province !== 'undefined' || _data.province !== undefined) this.addressValue = [String(_data.province), String(_data.city), String(_data.area)]
        this.addressData = provinceList.concat(cityList, areaList)
        this.requestNum++
      }).catch(err => {
        console.log(err)
        this.$loading()
      })
    },
    // 新增客户
    addOrEditMemberFun() {
      let result = null
      this.$formValidate(this.formField, ret => {
        result = ret
        if (!result) return false
        let address = this.addressValue
        if (Object.prototype.toString.call(address).toLowerCase() === '[object array]' && address.length) {
          // 省市必须有
          if (!address[0] || !address[1]) {
            this.$toast('请选择地址')
            result = null
          } else {
            result['province'] = address[0]
            result['city'] = address[1]
            result['area'] = address[2]
          }
        } else {
          this.$toast('请选择地址')
          result = null
        }
      })
      if (!result) {
        return false
      }
      if (result.user_rank === '$$') result.user_rank = ''
      if (result.discount === '$$' || result.discount === '') result.discount = '100'
      let Api = 'Add'
      if (this.type === 1) {
        Api = 'Edit'
        result.cus_id = this.cus_id
      }
      this.$loading(this.loadMsg + '...')
      this.$fetch['customer' + Api](result).then(() => {
        this.$loading()
        this.$router.push('agent_customerList')
      }).catch(msg => {
        this.$loading()
        this.$toast(msg)
        this.$refs[this.formField.code.ref].focus()
      })
    }
  },
  activated() {
    this.initData()
  },
  deactivated() {
    document.querySelector('#footerBar').style.display = 'block'
  }
}
</script>
