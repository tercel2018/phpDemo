/*
 * @Author: 陈航
 * @Date: 2018-12-3 15:20:55
 * @Last Modified by: 陈航
 * @说明：提交银行账户
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
.material-wrapper{
  padding-top:12vw;
  padding-bottom:13vw;
  font-size:@f6;
  color:@6;
  .material-content-up{
    margin:3vw 0;
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
  .material-content-down{
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
    .credentials{
      .flexUi(flex-start,flex-start);
      position: relative;
      margin-left:15px;
      padding:2.5vw 0;
      width:calc(~'100vw - 15px');
      width:-webkit-calc(~'100vw - 15px');
      line-height: 7vw;
      color:#333;
      &:after{
        position:absolute;
        content: '';
        left:0;
        top:0;
        width:calc(~'100vw - 15px');
        width:-webkit-calc(~'100vw - 15px');
        height:1px;
        transform: scaleY(0.5);
        background-color: #D9D9D9;
      }
      p{
        position:relative;
        box-sizing:border-box;
        -webkit-box-sizing:border-box;
        padding-left:10px!important;
        width:28vw;
        flex-shrink: 0;
        &:after{
          content: '';
          position:absolute;
          left: 0px;
          top:50%;
          transform:translateY(-50%);
          -webkit-transform:translateY(-50%);
          width:5px;
          height:5px;
          border-radius:50%;
          -webkit-border-radius:50%;
          background-color:#FF5722;
        }
      }
      span{
        padding-right:15px;
        font-size:@f5;
        color:@6;
      }
    }
    .upload-image{
      margin:0 15px;
      padding-bottom:5vw;
      .flexUi(space-between,flex-start);
      li{
        width:41.6vw;
        text-align: center;
        .up{
          position:relative;
          width:41.6vw;
          height:26.7vw;
          border-radius:1vw;
          overflow: hidden;
          img{
            display:block;
            border:0;
            width:41.6vw;
            height:26.7vw;
          }
          .upload-pos{
            position:absolute;
            top:0;
            left:0;
          }
          .upload-transparent{
            opacity: 0;
          }
        }
        p.title{
          line-height:200%;
        }
        p.tips{
          color:@red;
          font-size:@f5;
          line-height:200%;
        }
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
  <div class="material-wrapper" component-fixed-offset="13vw">
    <header-basic title="提交资质"></header-basic>
    <div class="material-content-up">
      <div class="my-radio-container">
        <my-radio title="资质类别：" class="my-radio" :radioList="radioList" @change="getCurrentRadio" label-width="28vw"></my-radio>
      </div>
      <template v-if="currentAccoutType===0">
        <group class="no-border-top-group">
          <x-input title="姓名：" class="element-value-required" v-model.trim="personalField.person_real_name.value" :ref="personalField.person_real_name.ref" type="text" label-width="28vw" placeholder="请填写姓名" required></x-input>
          <x-input title="身份证号：" class="element-value-required" v-model.trim="personalField.person_idcard_num.value" :ref="personalField.person_idcard_num.ref" type="text" label-width="28vw" placeholder="请填写身份证号" required></x-input>
          <x-input title="手机号码：" class="element-value-required" v-model.trim="personalField.linkman_mobile.value" :ref="personalField.linkman_mobile.ref" type="number" label-width="28vw" placeholder="请填写手机号码" required></x-input>
          <x-input title="QQ：" v-model.trim="personalField.linkman_qq.value" :ref="personalField.linkman_qq.ref" type="number" label-width="28vw"></x-input>
          <x-input title="Email：" v-model.trim="personalField.linkman_email.value" :ref="personalField.linkman_email.ref" type="email" label-width="28vw"></x-input>
        </group>
      </template>
      <template v-else>
        <group class="no-border-top-group">
          <x-input title="企业名称：" class="element-value-required" v-model.trim="companyField.company_name.value" :ref="companyField.company_name.ref" type="text" label-width="28vw" placeholder="请填写企业名称" required></x-input>
          <x-input title="企业法人：" class="element-value-required" v-model.trim="companyField.company_legal.value" :ref="companyField.company_legal.ref" type="text" label-width="28vw" placeholder="请填写企业法人" required></x-input>
          <x-input title="联系人：" class="element-value-required" v-model.trim="companyField.linkman_name.value" :ref="companyField.linkman_name.ref" type="text" label-width="28vw" placeholder="请填写联系人" required></x-input>
          <x-input title="联系电话：" class="element-value-required" v-model.trim="companyField.linkman_mobile.value" :ref="companyField.linkman_mobile.ref" type="number" label-width="28vw" placeholder="请填写联系电话" required></x-input>
          <x-input title="Email：" v-model.trim="companyField.linkman_email.value" :ref="companyField.linkman_email.ref" type="email" label-width="28vw"></x-input>
        </group>
      </template>
    </div>
    <div class="material-content-down">
      <x-address title="地址：" class="x-address-has-border-bottom element-value-required"  v-model="addressValue"  :list="addressData" value-text-align="left" placeholder="请选择地址" label-align="justify" label-width="28vw" raw-value></x-address>
      <group class="no-border-top-group" v-if="currentAccoutType===0">
        <x-input class="element-value-required" title="详细地址：" v-model.trim="personalField.linkman_address.value" :ref="personalField.linkman_address.ref" type="text" label-width="28vw" placeholder="请填写详细地址" required></x-input>
      </group>
      <group class="no-border-top-group" v-else>
        <x-input class="element-value-required" title="详细地址：" v-model.trim="companyField.company_address.value" :ref="companyField.company_address.ref" type="text" label-width="28vw" placeholder="请填写详细地址" required></x-input>
      </group>
      <div v-show="currentAccoutType===0">
        <div class="credentials">
          <p>身份证照片：</p>
          <span>（5M以下jpg、png、bmp）</span>
        </div>
        <ul class="upload-image">
          <li>
            <div class="up">
              <img v-if="personalField.person_idcard_front.value" :src="uploadHost + personalField.person_idcard_front.value" class="idcard"/>
              <img v-else class="idcard" src="@/assets/image/id_front.png"/>
              <uploader id="_uploader1" class="upload-pos" :class="{'upload-transparent':personalField.person_idcard_front.value}"   :filePath.sync="personalField.person_idcard_front.value"></uploader>
            </div>
            <p class="title">请上传身份证正面</p>
            <!-- <p class="tips"></p> -->
          </li>
          <li>
            <div class="up">
              <img v-if="personalField.person_idcard_back.value" :src="uploadHost + personalField.person_idcard_back.value" class="idcard"/>
              <img v-else class="idcard" src="@/assets/image/id_back.png"/>
              <uploader id="_uploader2" class="upload-pos" :class="{'upload-transparent':personalField.person_idcard_back.value}" :filePath.sync="personalField.person_idcard_back.value"></uploader>
            </div>
            <p class="title">请上传身份证背面</p>
            <!-- <p class="tips"></p> -->
          </li>
        </ul>
      </div>
      <div v-show="currentAccoutType!=0">
        <div class="credentials">
          <p>营业执照：</p>
          <span>（如果三证合一只用上传营业执照）</span>
        </div>
        <ul class="upload-image">
          <li>
            <div class="up">
              <img v-if="companyField.company_license_file.value" :src="uploadHost + companyField.company_license_file.value" class="idcard"/>
              <img v-else class="idcard" src="@/assets/image/yyzz.png"/>
              <uploader id="_uploader3" class="upload-pos" :class="{'upload-transparent':companyField.company_license_file.value}" :filePath.sync="companyField.company_license_file.value"></uploader>
            </div>
            <p class="title">请上传营业执照原件照片</p>
            <!-- <p class="tips"></p> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="audit-submit" @click="submitMaterial" data-fixed-bottom="component">提交</div>
  </div>
</template>
<script>
import { Group, XInput, XAddress } from 'vux'
import headerBasic from '@/components/common/headerBasic'
import myRadio from '@/components/common/myRadio'
import uploader from '@/components/common/uploader'
export default {
  components: { headerBasic, Group, XInput, myRadio, uploader, XAddress },
  data() {
    return {
      // 图片域名
      uploadHost: sessionStorage.uploadHost,
      // 全国省市区数据
      addressData: [],
      // 当前省市区
      addressValue: [],
      // 资质类型
      radioList: [
        {
          value: 0,
          text: '个人',
          checked: true
        },
        {
          value: 1,
          text: '企业',
          checked: false
        }
      ],
      // 个人
      personalField: {
        person_real_name: {
          value: '',
          required: true,
          ref: 'personalField.person_real_name',
          errMsg: '请填写#姓名'
        },
        person_idcard_num: {
          value: '',
          required: true,
          pattern: 'ID_NO',
          ref: 'personalField.person_idcard_num',
          errMsg: '请填写#身份证号码#格式有误'
        },
        linkman_mobile: {
          value: '',
          required: true,
          pattern: 'MOBILE',
          ref: 'personalField.linkman_mobile',
          errMsg: '请填写#手机号码#格式有误'
        },
        linkman_qq: {
          value: '',
          pattern: 'QQ',
          ref: 'personalField.linkman_qq',
          errMsg: '请填写#QQ号码#格式有误'
        },
        linkman_email: {
          value: '',
          pattern: 'EMAIL',
          ref: 'personalField.linkman_email',
          errMsg: '请填写#邮箱#格式有误'
        },
        linkman_address: {
          value: '',
          required: true,
          ref: 'personalField.linkman_address',
          errMsg: '请填写#详细地址'
        },
        // 身份证正面图片路径
        person_idcard_front: {
          value: '',
          required: true,
          errMsg: '请上传#身份证正面照片'
        },
        // 身份证背面图片路径
        person_idcard_back: {
          value: '',
          required: true,
          errMsg: '请上传#身份证背面照片'
        }
      },
      // 企业
      companyField: {
        company_name: {
          value: '',
          required: true,
          ref: 'companyField.company_name',
          errMsg: '请填写#企业名称'
        },
        company_legal: {
          value: '',
          required: true,
          ref: 'companyField.company_legal',
          errMsg: '请填写#企业法人'
        },
        linkman_name: {
          value: '',
          required: true,
          ref: 'companyField.linkman_name',
          errMsg: '请填写#联系人'
        },
        linkman_mobile: {
          value: '',
          required: true,
          pattern: 'PHONE',
          ref: 'companyField.linkman_mobile',
          errMsg: '请填写#联系电话#格式有误'
        },
        linkman_email: {
          value: '',
          pattern: 'EMAIL',
          ref: 'companyField.linkman_email',
          errMsg: '请填写#邮箱#格式有误'
        },
        company_address: {
          value: '',
          required: true,
          ref: 'companyField.company_address',
          errMsg: '请填写#详细地址'
        },
        // 三证合一图片路径
        company_license_file: {
          value: '',
          required: true,
          errMsg: '请上传#营业执照'
        }
      }
    }
  },
  computed: {
    currentAccoutType() {
      return this.radioList.filter(item => item.checked)[0].value
    }
  },
  methods: {
    // 已提交过初始化数据
    initData() {
      let { auth_type, auth_step } = sessionStorage
      if (auth_step >= 10) {
        this.$fetch.getStepInfo({ step: '20' }).then(data => {
          if (auth_type === '1') {
            this.radioList[0].checked = false
            this.radioList[1].checked = true
            for (let [key, value] of Object.entries(data)) {
              if (this.companyField[key]) this.companyField[key].value = value
            }
          } else {
            for (let [key, value] of Object.entries(data)) {
              if (this.personalField[key]) this.personalField[key].value = value
            }
          }
          this.getRegionList(data)
        })
      } else {
        this.getRegionList()
      }
    },
    // 获取当前的资质类型
    getCurrentRadio(i) {
      console.log('当前资质类别 => ' + JSON.stringify(i, null, 2))
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
        this.addressData = provinceList.concat(cityList, areaList)
        if (_data.province) this.addressValue = [String(_data.province), String(_data.city), String(_data.area)]
      })
    },
    // 提交资质材料
    submitMaterial() {
      let currentFiled = {}
      let type = ''
      if (this.currentAccoutType === 0) {
        type = 'person'
        currentFiled = this.personalField
      } else {
        type = 'company'
        currentFiled = this.companyField
      }
      let result = null
      this.$formValidate(currentFiled, ret => {
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
      this.$loading('正在提交资质...')
      this.$fetch[type + 'Qualification'](result).then(() => {
        this.$loading()
        this.$router.go(-1)
      }).catch(err => {
        this.$loading()
        console.log('Qualification => ' + err)
      })
    }
  },
  activated() {
    this.initData()
  }
}
</script>
