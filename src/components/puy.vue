<template>
  <div class="PuyBox">
    <headerTitle :title="headerTitle" :isUpload = 'false' ></headerTitle>
    <div class="menu">
      <section>
        <div class="conTent">
          <h2>￥{{TotalPrice}}</h2>
          <p>选择支付方式</p>
          <div class="ZWY">
            <ul>
              <li>
                <div>
                  <img src="../assets/img/wx.png" alt="">
                  <span>微信支付</span>
                </div>
                <div class="xuan" @click="isPayment = 0" :class="isPayment === 0 ? 'active':''"></div>
              </li>
              <li>
                <div>
                  <img src="../assets/img/wx.png" alt="">
                  <span>支付宝支付</span>
                </div>
                <div class="xuan" @click="isPayment = 1" :class="isPayment === 1 ? 'active':''"></div>
              </li>
            </ul>
          </div>
          <div class="PuyBut" @click="goPayment">确认支付</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
    import headerTitle from "./header";
    export default {
        name: "puy",
      components: {headerTitle},
      data(){
        return{
          headerTitle: '支付',
          isPayment: -1,    //支付方式选择 /0微信 1支付宝
          TotalPrice: this.$store.state.cart.TotalPrice ? this.$store.state.cart.TotalPrice : 0 ,
          pays:{}
        }
      },
      mounted(){

        console.log(this.$store.state.cart.orderId)
      },
      methods:{
        /**@name 支付(获取支付通道) */
        goPayment(){
          var vm = this
          
          switch(this.isPayment){
            case -1:
            this.$toast.center('请选择支付方式');
            break;
            case 0:
               plus.payment.getChannels(function(channels) {
                vm.pays = channels[0]; 
                vm.WxPayment()
              }, function(e) {
                alert('获取支付通道失败：' + e.message);
                return false;
              });
            break;
            case 1:
            this.Alipay();
            break;
          }
        },
        /**@name 去支付(微信) */
        WxPayment(){
          var params = {order: this.$store.state.cart.orderId}
          this.$http.post(this.$conf.env.WxPayment, params).then(res =>{
            console.log(res.data)
            var vm = this
            plus.payment.request(vm.pays, JSON.stringify(res.data), function(result){
              this.$toast.center('支付成功');
              this.$router.routerBack(-1);
              
            },function(error){
              console.log(JSON.stringify(error))
              this.$toast.center('支付失败');
            })
          }).catch(err =>{
            console.log(err)
            this.$toast.center('支付失败');
          })
        },
        /**@name 支付宝支付 */
        Alipay(){
           plus.payment.getChannels(function(channels) {
                vm.pays = channels[1]; 
                vm.WxPayment()
              }, function(e) {
                alert('获取支付通道失败：' + e.message);
                return false;
              });
          // this.$toast.center('暂不支持此支付方式哦');
        },
    }
}
</script>

<style scoped lang="scss">
  .PuyBox{
    width: 100%;
    height: 100%;
    background: url(../assets/img/bj1.png)  0 0 / 100% 100% ;
    .menu{
      width: 100%;
      height: calc(100% - .64rem);
      padding: .2rem;
      box-sizing: border-box;
      section{
        width: 100%;
        height: 100%;
        background:linear-gradient(0deg,rgba(11,27,51,1) 0%,rgba(30,61,93,1) 100%);
        border-radius:5px;
        opacity: .8;
        padding: .26rem .62rem .29rem .53rem;
        box-sizing: border-box;
        .conTent{
          width: 100%;
          height: 100%;
          position: relative;
          h2{
            font-size:.6rem;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:.93rem;
            border-bottom: 1px solid #254260;
          }
          p{
            font-size:.28rem;
            font-family:Adobe Heiti Std R;
            font-weight:normal;
            color:rgba(255,255,255,1);
            line-height:.45rem;
            margin-top: .21rem;
            text-indent: .12rem;
          }
          .ZWY{
            ul{
              li{
                height: 1.1rem;
                border-bottom: 1px solid #254260;
                display: flex;
                justify-content: space-between;
                padding-left: .19rem;
                box-sizing: border-box;
                align-items: center;
                div{
                  display: flex;
                  align-items: center;
                  height: 100%;
                  img{
                    width: .5rem;
                    height: .5rem;
                    display: block;
                  }
                  span{
                    font-size:.32rem;
                    font-family:Adobe Heiti Std R;
                    font-weight:normal;
                    color:rgba(255,255,255,1);
                    text-indent: .24rem;
                  }
                }
                .xuan{
                  width:.4rem;
                  height:.4rem;
                  border-radius: 50%;
                  margin-right: .54rem;
                  background: url("../assets/img/quan.png") no-repeat;
                  background-size: cover;
                  &.active{
                    background: url("../assets/img/gou.png");
                    background-size: cover;
                  }
                }
              }
            }
          }
          .PuyBut{
            width:3.11rem;
            height:.73rem;
            position: absolute;
            right: 0;
            bottom: 0;
            background: url("../assets/img/ok.png") no-repeat;
            background-size: 100% 100%;
            font-size:.28rem;
            font-family:SimHei;
            font-weight:bold;
            color:rgba(255,255,255,1);
            line-height:.73rem;
            text-align: center;
          }
        }
      }
    }
  }
</style>
