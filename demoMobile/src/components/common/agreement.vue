/*
 * @Author: 陈航
 * @Date: 2018-12-7 10:33:58
 * @Last Modified time: 2018-12-07 10:48:51
 * @说明：协议内容组件
 */
<style lang="less" scoped>
.agreement-wrapper{
  font-size: @f6;
  .agreement{
    padding:8vw 5vw 5vw;
    line-height: 200%;
    text-align: justify;
    h3{
      font-size: @f8;
      text-align: center;
      margin-bottom:5vw;
      font-weight: 700;
      color:#000;
    }
  }
  .yifang{
    margin-bottom:5vw;
    .title{
      font-size:@f6;
      font-weight: 700;
      color:#000;
    }
  }
}
</style>
<template>
  <div class="agreement-wrapper">
    <!-- 协议内容 -->
    <div class="agreement">
      <h3>云玺印代理合作协议</h3>
      <!-- 乙方信息 -->
      <ul class="yifang">
        <li class="title">
          乙方：新云玺科技(深圳)有限公司
        </li>
        <li>公司地址：深圳南山区深南大道10128号南山数字文化产业基地东塔楼2806</li>
        <li>电话：0755-36564131</li>
        <li>电子邮件：877687804@qq.com</li>
      </ul>
      <!-- 协议具体内容 -->
      <div class="agree">
        <div class="statement">
          <p>甲、乙双方在签订本协议时，均出自双方真实意思表示，双方应对自身权利、义务和责任条款的法律含义有准确无误的理解。</p>
          <p>双方申明：签约双方均具有履行本协议项下内容的资质或授权，并在广义的合同履行中持续并稳定拥有。</p>
          <p>根据中华人民共和国现行法律、法规、规章、条例等相关规定，甲乙双方本着诚实信用、互惠互利的原则，在双方友好协商的基础上，达成一致，签订如下协议，兹以共同遵守。</p>
        </div>
        <div>
          <ul>
            <li>一、乙方给予甲方代理商待遇，提供云玺印软件相应版本供乙方旗下所有的生产中心、直营店、加盟店、窗口店及甲方的合作伙伴使用，根据每季度开户数量享受相应代理商折扣。</li>
            <li>二、甲方承诺在市场销售过程中必须按照乙方的标准价格销售，不能扰乱市场价格。</li>
            <li>三、乙方负责为甲方提供管理入口，方便甲方为旗下客户开户及收费管理。乙方对甲方相关人员进行项目培训和指导，协助甲方对合作伙伴的软件培训及提供售后支持。具体维护服务内容包含：软件程序维护以及数据库的维护；系统模块内的新功能升级；系统运行当中Bug问题的修改；提供电话咨询服务及远程指导。</li>
            <li>四、在本代理合作协议下，乙方把客户运营系统的权限开放给甲方，甲方可以通过该系统为旗下所有合作伙伴开通使用云玺印软件的账户，软件账户开通后，根据双方协议设定好的优惠代理合作价格，甲方对乙方提供的软件服务支付相应费用。</li>
            <li>五、甲方在乙方的网上支付系统中付款或通过线下汇款转账。乙方收款到账后，在七个工作日内应向支付方提供相应金额发票。</li>
            <li>六、在合作过程中产生的各项专利、技术及软件著作权归乙方所有。甲方享有软件的使用权。甲乙双方一旦达成合作协议，在协议有效期内乙方不得就本协议规定的内容与第三方进行合作。 </li>
            <li>七、甲乙双方应对本协议内容以及签署及履行本协议过程中知悉的对方尚未公开的信息承担保密义务。未得到另一方事先书面同意，任何一方不得泄露协议内容及信息，或将本协议内容及信息用于其他目的。</li>
            <li>八、因执行本协议所发生的或与本协议有关的一切争议，双方应通过友好协商解决，如双方通过协商不能达成协议时，应向乙方所在地管辖权的人民法院通过诉讼解决。</li>
            <li>九、本协议期满后在双方同意下，可作修订或续期。如任何一方拟终止本协议，也可提前3个月以书面形式通知对方。在本协议终止前开展的计划不受终止的影响。本协议终止后，甲方将不再享受在此之前已发展的代理客户向乙方购买产品或服务的返佣。</li>
            <li>十、本协议未涉及的项目及未尽操作性的事宜，可根据具体项目另行协商解决。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
