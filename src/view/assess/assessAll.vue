<template>
    <div class="web-assessAll-box">
      <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='false'/>
        <div class="web-assessAll-menu">
          <div class="ShoopingCart">
            <div class="BigBox">
              <ul>
                <li>
                  <div class="CheckBox"></div>
                  <div class="ShoppImg">
                    <img src="../../assets/img/sg.jpg" alt="">
                  </div>
                  <div class="ShoppNamme">
                    <p>水果拼盘</p>
                    <p>20元</p>
                  </div>
                  <div class="ChangeNum">
                    <group>
                      <x-number title="" v-model="valNum"></x-number>
                    </group>
                  </div>
                </li>
                <li>
                  <div class="CheckBox"></div>
                  <div class="ShoppImg">
                    <img src="../../assets/img/sg.jpg" alt="">
                  </div>
                  <div class="ShoppNamme">
                    <p>水果拼盘</p>
                    <p>20元</p>
                  </div>
                  <div class="ChangeNum">
                    <group>
                      <x-number title="" v-model="valNum"></x-number>
                    </group>
                  </div>
                </li>
                <li>
                  <div class="CheckBox"></div>
                  <div class="ShoppImg">
                    <img src="../../assets/img/sg.jpg" alt="">
                  </div>
                  <div class="ShoppNamme">
                    <p>水果拼盘</p>
                    <p>20元</p>
                  </div>
                  <div class="ChangeNum">
                    <group>
                      <x-number title="" v-model="valNum"></x-number>
                    </group>
                  </div>
                </li>
                <li>
                  <div class="CheckBox"></div>
                  <div class="ShoppImg">
                    <img src="../../assets/img/sg.jpg" alt="">
                  </div>
                  <div class="ShoppNamme">
                    <p>水果拼盘</p>
                    <p>20元</p>
                  </div>
                  <div class="ChangeNum">
                    <group>
                      <x-number title="" v-model="valNum"></x-number>
                    </group>
                  </div>
                </li>
                <li>
                  <div class="CheckBox"></div>
                  <div class="ShoppImg">
                    <img src="../../assets/img/sg.jpg" alt="">
                  </div>
                  <div class="ShoppNamme">
                    <p>水果拼盘</p>
                    <p>20元</p>
                  </div>
                  <div class="ChangeNum">
                    <group>
                      <x-number title="" v-model="valNum"></x-number>
                    </group>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="PuyShopp">
            <div class="CheckBox">
              <div class="CheckAll"></div>
              <span>全选</span>

              <p>删除</p>
            </div>
            <div class="PuyBox">
              <p>合计: <span>￥0.00</span></p>
              <div class="PuyBut">支付</div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
    import sideBar from "../../components/sidebar"
    import mianList from '../../components/mainList'
    import headerTitle from "../../components/header";
    import { XNumber,Group} from 'vux'
    export default {
        name: "assessAll",
      components: {mianList, sideBar, headerTitle,XNumber,Group},
      data(){
          return{
            classList:{},
            headerTitle:'购物车',
            valNum:0
          }
      },
      methods:{
        qwer(){
          console.log(this.inlineDescListValue)
        }
      },
      mounted() {
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
                .CheckBox{
                  width: .34rem;
                  height: .34rem;
                  border:1px solid rgba(76,197,242,1);
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

        .web-assessAll-cont::-webkit-scrollbar {
            display: none;
        }
      }

  }
</style>
