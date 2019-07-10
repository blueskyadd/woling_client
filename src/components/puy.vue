<template>
  <div class="PuyBox">
    <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='true'></headerTitle>
    <div class="menu">
      <section>
        <div class="conTent">
          <h2>￥800.00</h2>
          <p>选择支付方式</p>
          <div class="ZWY">
            <ul>
              <li>
                <div>
                  <img src="../assets/img/wx.png" alt="">
                  <span>微信支付</span>
                </div>
                <div class="xuan" :class="puyF === 0 ? 'active':''"></div>
              </li>
            </ul>
          </div>
          <div class="PuyBut">确认支付</div>
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
          puyF:0,    //0微信
        }
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
