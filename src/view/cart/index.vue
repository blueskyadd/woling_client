<template>
    <div class="web-assessAll-box">
      <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='false'/>
        <div class="web-assessAll-menu">
          <div class="ShoopingCart">
            <div class="BigBox">
              <ul>
                <li v-for="(item,index) in shoppoingList" :key="item.id" >
                    <label :for=index :class="{ checkBox:true, checkBox_posi: wantCheck }" >
                      <input  type="checkbox"  @click="setCart(item)" :value="item" v-model="checkList">
                    </label>
                  <div class="ShoppImg">
                    <img :src="item.good.front_image" alt="">
                  </div>
                  <div class="ShoppNamme">
                    <p>{{item.good.name}}</p>
                    <p>{{item.good.price}}元</p>
                  </div>
                  <div class="ChangeNum">
                    <group>
                      <x-number title="" :min="1" v-model="item.nums"></x-number>
                    </group>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="PuyShopp">
            <div class="CheckBox">
              <input type="checkbox" v-model="checkAll" value="1">
              <span>全选</span>

              <p @click="deleteCheckList">删除</p>
            </div>
            <div class="PuyBox">
              <p>合计: <span>￥{{TotalPrice}}</span></p>
              <div class="PuyBut" @click="goPuy">支付</div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
    import sideBar from "../../components/sidebar"
    import mianList from '../../components/mainList'
    import headerTitle from "../../components/header";
    // import store from "../../store/index";
    import { XNumber,Group} from 'vux'
    export default {
      name: "cart",
      components: {mianList, sideBar, headerTitle,XNumber,Group},
      data(){
          return{
            wantCheck: false,
            headerTitle:'购物车',
            shoppoingList:[],
            checkList:[],//已选商品
            checkAll: false,//全选
            TotalPrice:0,//总价
          }
      },
      mounted() {
        this.GetShoppCartList()
      },
      methods:{
        /**@name购物车删除 */
        deleteCheckList(){
          if(this.shoppoingList && this.shoppoingList.length>0){
             if(this.checkList.length>0){ 
               var arr = []
               this.checkList.forEach(value =>{ arr.push(value.id.toString())})
               var params = {
                 'choice':arr
               }
               this.$http.delete(this.$conf.env.deleteCartData, params).then( res =>{
                  console.log(res)
               }).catch(err =>{
               this.toast.center('服务器错误')
               })
             }else{
              this.$toast.center('您还未选择商品');
             }
            // this.shoppoingList = [];
            // this.TotalPrice = 0;
            // this.checkAll = false;
            // this.checkList = [];

          }else{
            this.$toast.center('购物车是空的呢');
          }
        },
        /**@name获取购物车列表 */
        GetShoppCartList(){
          this.$http.get(this.$conf.env.ShoppCartList)
            .then(res => {
              console.log(res.data)
              res.data.results.forEach(value =>{
                if(value.choice){
                  this.checkList.push(value)
                }
              })
              this.shoppoingList = res.data.results
            })
            .catch(err => {
              this.$toast.center('网络错误');
            });
        },
        /**@name获取订单编号 */
        goPuy(){
          console.log(this.checkList[0].id)
          let params = {
            pitch: 2
          }
          this.$http.post(this.$conf.env.ShoppPuy, params).then(res =>{
            console.log(res.data.order)
            this.$store.commit('setOrder',{orderID: res.data.order, orderPrice: this.TotalPrice } )
            this.$router.push({'name':'puy'})
              // this.payment()
          }).catch(err =>{
              this.$toast.center('账号或密码错误');
          })
        },
        setCart(item){
          console.log(item, item.choice)
          item.choice = !item.choice
          this.addCart(item)
          
        },
        addCart(item){
          console.log(item.choice ? '添加':'删除')
          var params ={
            'choice': item.choice
          }
          this.$http.put(this.$conf.env.AddShoppCart + item.id + '/', params).then( res =>{
          console.log(res)
          }).catch(err =>{
          this.toast.center('服务器错误')
          })
        },
        
      },
    watch: {
      checkList(val) {
        if(val.length > 0){
          var TotalPrice = 0
          val.forEach(item =>{
            TotalPrice += item.nums*item.good.price
          })
          this.TotalPrice = TotalPrice
        }else{
          this.TotalPrice = 0
        }
        if (val.length === this.shoppoingList.length && val.length !== 0) {
          this.checkAll = true;
        } else {
          this.checkAll = false;
        }

      },
      checkAll(newData, oldData){
        if (newData) {
          let arr = [];
          this.shoppoingList.forEach(item => {
            arr.push(item);
          });
          this.checkList = arr;
        } else {
          if (
            this.checkList.length === this.shoppoingList.length &&
            newData.length !== 0
          ) {
            this.checkList = [];
            this.TotalPrice = 0
          }
        }
      },
      shoppoingList:{
        handler(newName, oldName) {
          var TotalPrice = 0
          newName.forEach((item,index) =>{
            if(item.nums == 0){
              return false
            }
            
            this.checkList.forEach( value =>{
              if(item.id == value.id){
                TotalPrice +=value.nums*value.good.price
              }
            })
          })
          this.TotalPrice = TotalPrice
        },
        deep: true
      }
    },
  }
</script>

<style lang="scss">
  @import "../../assets/style/AllStyle";
  .web-assessAll-box{
    width: 100%;
    height:100%;
      .web-assessAll-menu{
        width: 100%;
        background: url(../../assets/img/bj1.png)  0 0 / 100% 100% ;
        height: calc( 100% - .64rem);
        .ShoopingCart{
          width: 100%;
          height: calc(100% - 1rem);
          padding: .15rem .16rem 0 .2rem;
          box-sizing: border-box;
          .BigBox{
            width: 100%;
            height: 100%;
            background:linear-gradient(0deg,rgba(11,27,51,1) 0%,rgba(30,61,93,1) 100%);
            opacity:0.8;
            border-radius:5px;
            padding: 0 .62rem 0 .57rem;
            box-sizing: border-box;
            overflow: hidden;
            ul{
              height: 100%;
              overflow-y: scroll;
              overflow-x: hidden;
              li{
                height: 2.22rem;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #254260;
                position: relative;

                .attention_all .checkBox {
                  width: .34rem;
                  height: .34rem;
                  border:1px solid rgba(76,197,242,1);
                  background: #ffffff;
                  margin: 0.266667rem 0;
                  position: absolute;
                  left: -1rem;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  align-items: center;
                  /* justify-content: center; */
                  padding-left: 0.46rem;
                }
                .attention_all .checkBox_posi {
                  left: 0;
                }
                .CheckBox{
                  width: .34rem;
                  height: .34rem;

                  border-radius:50%;
                  margin-right: .48rem;

                }
                .ShoppImg{
                  width:1.76rem;
                  height:1.77rem;
                  border-radius:10px;
                  margin-right: .2rem;
                  img{
                    @include ImgStyle
                  }
                }
                .ShoppNamme{
                  height: 100%;
                  padding-top: .1rem;
                  box-sizing: border-box;
                  p{
                    font-size:.3rem;
                    font-family:SimHei;
                    color:rgba(255,255,255,1);
                    line-height:.54rem;
                  }
                }
                .ChangeNum{
                  position: absolute;
                  right: 0;
                  bottom: .34rem;
                  .weui-cells{
                    margin: 0;
                    background: transparent;
                    &:before{
                      border-top: 0;
                    }
                    &:after{
                      border-bottom: 0;
                    }
                  }
                  .weui-cell{
                    padding: 0;
                    a{
                      width:.6rem;
                      height:.5rem;
                      background:rgba(74,106,146,1);
                      border: 0;
                      padding: 0;
                      position: relative;
                      svg{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-left: -9px;
                        margin-top: -9px;
                        fill:#FFFFFF;
                      }
                    }
                    input{
                      width:.8rem;
                      height:.5rem;
                      background:rgba(74,106,146,1);
                      text-align: center;
                      font-size: .22rem;
                      color: #fff;
                      margin:0 .02rem;
                      border: 0;
                    }
                  }

                }
              }
            }
          }
        }
        .PuyShopp{
          width: 100%;
          height:1rem;
          background:linear-gradient(0deg,rgba(45,73,121,1) 0%,rgba(35,51,84,1) 100%);
          box-shadow:0px -2px 4px 0px rgba(0, 0, 0, 0.24);
          display: flex;
          justify-content: space-between;
          padding-left: .74rem;
          box-sizing: border-box;
          align-content: center;
          .CheckBox{
            display: flex;
            align-items: center;
            .CheckAll{
              width: .34rem;
              height: .34rem;
              border:1px solid rgba(76,197,242,1);
              border-radius:50%;
              margin-right: .13rem;
            }
            span{
              font-size:.3rem;
              font-family:SimHei;
              color:rgba(255,255,255,1);
            }
            p{
              color: red;
              margin-left: 2rem;
              font-size:.3rem;
            }
          }
          .PuyBox{
            display: flex;
            align-items: center;
            p{
              font-size:.27rem;
              font-family:SimHei;
              margin-right: .47rem;
              color:rgba(255,255,255,1);
              span{
                color: #00FFFC;
              }
            }
            .PuyBut{
              width:2rem;
              height:100%;
              background:rgba(16,193,200,1);
              font-size:.31rem;
              font-family:MicrosoftYaHei;
              color:rgba(255,255,255,1);
              line-height:.98rem;
              text-align: center;
            }
          }
        }
        //多选框样式
        input[type="checkbox"] {
          -webkit-appearance: none; /*清除复选框默认样式*/
          /* border: 1px solid #cccccc; */
          background: url("../../assets/img/uncheck.png");
          background-size: .32rem .32rem;
          border-radius: 50%;
          width: .34rem;
          height: .34rem;
          margin-right: .48rem;
        }
        input[type="checkbox"]:checked {
          background: url("../../assets/img/check.png");
          background-size: .34rem .34rem;
        }
        .web-assessAll-cont::-webkit-scrollbar {
            display: none;
        }
      }

  }
</style>
