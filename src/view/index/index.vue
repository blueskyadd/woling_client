<template>
  <div class="web-index-bigbox">
    <div class="web-index-topBj">
      <div class="web-index-userInfo">
        <router-link to="/userinfo" tag="div" class="userinfo-head-box">
          <div class="userinfo-bg"></div>
          <div class="userinfo-head">
            <img :src="picture" alt />
          </div>
        </router-link>
        <div class="userinfo-name">{{username}}</div>
      </div>
      <div class="web-index-iphone">
        <div>
          <img src="../../assets/img/email.png" alt />
        </div>
        <div>
          <img src="../../assets/img/wifi.png" alt v-if="ISnetworkStatus" />
          <img v-else src="../../assets/img/4G.png" />
        </div>
        <div style="width:.55rem">
          <span>
            <i :style="{'width': setelectricity, 'background-color': setelectricityColr}"></i>
          </span>
        </div>
      </div>
    </div>
   
    <!--    页面主题--> 
    <div class="web-index-menu">
      <div class="web-index-content content_left">
         <div class="title">
           <div><img src="../../assets/img/statusImg.png" alt=""></div>
           <div>同学榜</div>
         </div>
        <div>
          <ul>
            <li><img src="http://img3.imgtn.bdimg.com/it/u=2017451364,1155593535&fm=15&gp=0.jpg" alt=""><div></div></li>
            <li><img src="http://img3.imgtn.bdimg.com/it/u=2017451364,1155593535&fm=15&gp=0.jpg" alt=""><div></div></li>
            <li><img src="http://img3.imgtn.bdimg.com/it/u=2017451364,1155593535&fm=15&gp=0.jpg" alt=""><div></div></li>
            <li><img src="http://img3.imgtn.bdimg.com/it/u=2017451364,1155593535&fm=15&gp=0.jpg" alt=""><div></div></li>
          </ul>
        </div>
      </div>
      <div class="web-index-content content_right">
        <div class="singIn"  @click="setSingIn"><img src="../../assets/img/singIn.png" alt /></div>
        <div class="web-index-rightList">
          <ul>
            <!-- 试听 -->
            <router-link to="/audition?flag=1" tag="li"><img src="../../assets/img/audition.png" alt=""></router-link>
            <!-- 商城 -->
            <router-link to="/shopping" tag="li"><img src="../../assets/img/store.png" alt=""></router-link>
            <!-- 活动 -->
            <router-link to="/actively" tag="li"><img src="../../assets/img/activelyLogo.png" alt=""></router-link>
            <!-- 课程 -->
            <router-link to="/audition?flag=2" tag="li"><img src="../../assets/img/class.png" alt=""></router-link>
            <!-- 课表 -->
            <router-link to="/course" tag="li"><img src="../../assets/img/course.png" alt=""></router-link>
            <!-- 赛事 -->
            <li><img src="../../assets/img/Competition.png" alt=""></li>
          </ul>
        </div>
      </div>
    </div>
    <!--    底部-->
    <div class="web-index-footerBox">
      <div class="web-index-footer">
        <ul>
          <li>
            <router-link to="/ballPack">
              <div class="web-footer-image"> <img src="../../assets/img/FIELD.png" alt /></div>
              <div class="web-footer-words"><p>球场</p> <span>FIELD</span></div>
            </router-link>
          </li>
          <li>
            <router-link to="/coach">
              <div class="web-footer-image"><img src="../../assets/img/COACH.png" alt /></div>
              <div class="web-footer-words"><p>教练</p><span>COACH</span>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/medal">
              <div class="web-footer-image"><img src="../../assets/img/MEDAL.png" alt /></div>
              <div class="web-footer-words"><p>勋章</p><span>MEDAL</span></div>
            </router-link>
          </li>
          <li>
            <router-link to="/gradeIndex">
              <div class="web-footer-image"><img src="../../assets/img/ACHIEVEMENT.png" alt /></div>
              <div class="web-footer-words"><p>成就</p><span>ACHIEVEMENT</span></div>
            </router-link>
          </li>
          <li>
            <router-link to="/exercise">
              <div class="web-footer-image"><img src="../../assets/img/PRACTICE.png" alt /></div>
              <div class="web-footer-words"><p>练习</p><span>PRACTICE</span></div>
            </router-link>
          </li>
          <li>
            <router-link to="/cart">
              <div class="web-footer-image"><img src="../../assets/img/CART.png" alt /></div>
              <div class="web-footer-words"><p>购物车</p><span>CART</span></div>
            </router-link>
          </li>
          <li>
            <router-link to="/orderForm">
              <div class="web-footer-image"><img src="../../assets/img/ORDER.png" alt /></div>
              <div class="web-footer-words"><p>订单</p><span>ORDER</span></div>
            </router-link>
          </li>
          <li>
            <a @click="getcounselor">
              <div class="web-footer-image footer_actively"><img src="../../assets/img/footerActively.png" alt /></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <popup v-model="isDetail" height="270px" is-transparent >
      <div class="detail_box">
          <img class="indexcounselorImg" src="../../assets/img/indexcounselorImg.png" alt="">
          <img class="indexFooter" src="../../assets/img/indexFooter.png" alt="">
          <img class="indexClose" src="../../assets/img/indexClose.png" alt="" @click="isDetail=false">
          <div class="main_text">
            <div>
              <span>销售顾问:</span>
              <p>李老师</p>
            </div>
            <div>
              <span>联系电话:</span>
              <p>186-4526-5684</p>
            </div>
            <div>
              <span>工作地址:</span>
              <p>黄浦区外马路1353号世博黄浦体育园一号楼三楼</p>
            </div>
          </div>
      </div>
    </popup>
  </div>
</template>

<script>
import { Popup } from 'vux';
export default {
  name: "index",
  components: { Popup },
  data() {
    return {
      isSign: false,
      username: "",
      picture: "",
      getelectricity: 100, //电量
      isElectricity: false, //充电状态
      networkStatus: "", //网络状态
      ISnetworkStatus: false,
      isDetail: false
    };
  },
  computed: {
    //电量--andriod
    setelectricity() {
      if (this.getelectricity > 70) {
        return `calc( ${this.getelectricity}% - 0.08rem)`;
      } else if (this.getelectricity > 50) {
        return `calc( ${this.getelectricity}% - 0.03rem)`;
      } else if (this.getelectricity > 10) {
        return `calc( ${this.getelectricity}% + 0.02rem`;
      } else {
        return `calc( ${this.getelectricity}%)`;
      }
    },
    //电池状态颜色--andriod--ios
    setelectricityColr() {
      if (this.isElectricity) {
        return "yellowgreen";
      } else {
        if (this.getelectricity < 40) {
          return "red";
        } else if (this.getelectricity > 80) {
          return "#fff";
        }
      }
    },
    //获取网络状态--andriod
    getNetworkStatus() {
      switch (this.networkStatus) {
        case "CONNECTION_UNKNOW":
          this.ISnetworkStatus = true;
          // '网络连接状态未知'
          break;
        case "CONNECTION_NONE":
          this.ISnetworkStatus = true;
          // '未连接网络'
          break;
        case "CONNECTION_WIFI":
          this.ISnetworkStatus = true;
          // '无线WIFI网络'
          break;
        case "CONNECTION_CELL2G":
          this.ISnetworkStatus = false;
          // '蜂窝移动2G网络'
          break;
        case "CONNECTION_CELL3G":
          this.ISnetworkStatus = false;
          // '蜂窝移动3G网络'
          break;
        case "CONNECTION_CELL4G":
          this.ISnetworkStatus = false;
          // '蜂窝移动4G网络'
          break;
      }
    }
  },
  methods: {
    //判断是否可以签到
    getsingIn() {
      this.$http
        .get(this.$conf.env.isSingIn)
        .then(res => {
          this.isSign = res.data.sign;
          console.log(res);
        })
        .catch(err => {});
    },
    //签到
    setSingIn() {
      this.$loading("");
      this.$http
        .post(this.$conf.env.singIn)
        .then(res => {
          this.$loading.close();
          if (res.status == "201") {
            this.$toast.center("签到成功");
            this.isSign = false;
          }
        })
        .catch(err => {
          this.$loading.close();
          if (err.response.status == "400") {
            this.$toast.center("您已经签到了");
          } else {
            this.$toast.center("网络错误，稍后再试");
          }
        });
    },
    getUserInfo() {
      this.$http
        .get(this.$conf.env.getUserInfo)
        .then(res => {
          console.log(res);
          this.username = res.data.name;
          this.picture = res.data.picture;
          this.$loading.close();
        })
        .catch(err => {
          this.$loading.close();
          this.$toast.center("服务器错误");
        });
    },
    getcounselor() {
      this.isDetail = !this.isDetail
    },
  },
  mounted() {
    // this.$loading('');
    // this.getsingIn()
    // this.getUserInfo()
    // var vm = this
    // setTimeout(() => {
    //   console.log("网络状态：" + window.navigator.onLine);
    //   window.addEventListener("offline", function(e) {
    //     console.log("offline");
    //   });

    //   window.addEventListener("online", function(e) {
    //     console.log("online");
    //   });
    //   var u = navigator.userAgent,
    //     app = navigator.appVersion;
    //   var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
    //   var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //   if (isAndroid) {
    //     //判断电量  充电状态   IOS不支持
    //     navigator.getBattery().then(function(battery) {
    //       vm.getelectricity = battery.level * 100 - 1; //电量 --首次赋值
    //       vm.isElectricity = battery.charging; // 是否正在充电/true-充电 --首次赋值
    //       //充电状态发生变化时触发
    //       battery.addEventListener("chargingchange", function() {
    //         vm.isElectricity = battery.charging;
    //       });
    //       //电池电量发生变化时触发
    //       battery.addEventListener("levelchange", function() {
    //         vm.getelectricity = battery.level * 100 - 1;
    //       });
    //     });
    //   }
    //   if (isIOS) {
    //     var UIDevice = plus.ios.import("UIDevice"); //ios设备电量信息
    //     var dev = UIDevice.currentDevice();
    //     if (!dev.isBatteryMonitoringEnabled()) {
    //       dev.setBatteryMonitoringEnabled(true);
    //     }
    //     dev.batteryMonitoringEnabled = true;
    //     console.log("dev:", dev);
    //     console.log("dev.batteryState:", dev.batteryState());
    //     vm.isElectricity = dev.batteryState() == "2" ? true : false;
    //     var level = dev.batteryLevel();
    //     vm.getelectricity = level * 100; //电量 --首次赋值
    //     console.log("level", level);
    //     dev.addEventListener(
    //       "UIDeviceBatteryLevelDidChangeNotification",
    //       () => {
    //         vm.getelectricity = dev.batteryLevel() * 100;
    //         console.log("-----监听");
    //       }
    //     );
    //     dev.addObserver("batteryStateChanged", () => {
    //       console.log("电池状态发生变化-----监听");
    //     });
    //   }

    //   var types = {};
    //   types[plus.networkinfo.CONNECTION_UNKNOW] = "CONNECTION_UNKNOW";
    //   types[plus.networkinfo.CONNECTION_NONE] = "CONNECTION_NONE";
    //   types[plus.networkinfo.CONNECTION_ETHERNET] = "CONNECTION_ETHERNET";
    //   types[plus.networkinfo.CONNECTION_WIFI] = "CONNECTION_WIFI";
    //   types[plus.networkinfo.CONNECTION_CELL2G] = "CONNECTION_CELL2G";
    //   types[plus.networkinfo.CONNECTION_CELL3G] = "CONNECTION_CELL3G";
    //   types[plus.networkinfo.CONNECTION_CELL4G] = "CONNECTION_CELL4G";
    //   vm.networkStatus = types[plus.networkinfo.getCurrentType()];
    //   switch (this.networkStatus) {
    //     case "CONNECTION_UNKNOW":
    //       this.ISnetworkStatus = true;
    //       // '网络连接状态未知'
    //       break;
    //     case "CONNECTION_NONE":
    //       this.ISnetworkStatus = true;
    //       // '未连接网络'
    //       break;
    //     case "CONNECTION_WIFI":
    //       this.ISnetworkStatus = true;
    //       // '无线WIFI网络'
    //       break;
    //     case "CONNECTION_CELL2G":
    //       this.ISnetworkStatus = false;
    //       // '蜂窝移动2G网络'
    //       break;
    //     case "CONNECTION_CELL3G":
    //       this.ISnetworkStatus = false;
    //       // '蜂窝移动3G网络'
    //       break;
    //     case "CONNECTION_CELL4G":
    //       this.ISnetworkStatus = false;
    //       // '蜂窝移动4G网络'
    //       break;
    //   }
    // }, 100);
  }
};
</script>

<style scoped lang="scss">
/*横屏*/
.web-index-bigbox {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/bj@2x.png") no-repeat;
  background-size: cover;
  .web-index-topBj {
    width: 100%;
    height: 0.88rem;
    background: url("../../assets/img/topbg.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .web-index-userInfo {
      height: 100%;
      display: flex;
      // align-items: center;
      .userinfo-head-box {
        width: 0.83rem;
        height: 0.83rem;
        position: relative;
        margin: 0.07rem 0.07rem 0 0.1rem;
        .userinfo-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 999;
          background: url("../../assets/img/headk.png") no-repeat;
          background-size: cover;
        }
        .userinfo-head {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 666;
          img {
            display: block;
            width: 78%;
            height: 78%;
            margin: auto;
          }
        }
      }
      .userinfo-name {
        font-family: SimHei;
        font-size: 0.2rem;
        padding-top: 0.15rem;
        color: rgba(255, 255, 255, 1);
      }
    }
    .web-index-iphone {
      width: 1.65rem;
      display: flex;
      height: 75%;
      align-items: center;
      margin-right: 0.14rem;
      justify-content: space-between;
      div {
        height: 0.26rem;
        span {
          padding: 0.05rem 0 0 0.04rem;
          height: 100%;
          width: 90%;
          margin: 0 auto;
          display: block;
          background: url(../../assets/img/electricity.png) 0 0 / 100% 100%;
          i {
            display: block;
            border-radius: 0.03rem;
            height: 72%;
            background: #fff;
          }
        }
        img {
          height: 100%;
        }
      }
    }
  }
  /*页面主体*/
  .web-index-menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: calc(100% - 2.1rem);
    .web-index-content {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: flex-end;
      .singIn {
        width: 1rem;
        height: 1rem;
        margin-right: 0.18rem;
        height: 1rem;
        margin-top: .15rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .web-index-rightList{
        display: flex;
        justify-content: flex-end;
        height: 100%;
        ul{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          li{
            height: .7rem;
            width: .62rem;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .web-index-ListBox {
        width: 0.31rem;
        height: 1.38rem;
        position: absolute;
        left: 0;
        top: 0.05rem;
        background: #091a39;
        overflow: hidden;
        .web-index-listTop {
          width: 100%;
          height: 0.12rem;
          background: #183162;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 0.06rem;
            height: 0.06rem;
            display: block;
          }
        }
        .web-index-listWord {
          width: 100%;
          height: 0.1rem;
          background: #040e23;
          span {
            font-size: 0.05rem;
            color: rgba(130, 160, 204, 1);
            line-height: 0.1rem;
            display: block;
            text-align: center;
          }
        }
        .web-index-ListBoxs {
          width: 100%;
          height: 1.23rem;
          box-sizing: border-box;
          padding: 4px 8px;
          .web-index-list {
            width: 100%;
            height: 100%;
            overflow: hidden;
            .football-pro-list {
              width: 100%;
              height: auto;
              ul {
                li {
                  width: 0.22rem;
                  height: 0.21rem;
                  position: relative;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-bottom: 0.05rem;
                  .web-index-headerbg {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 999;
                    background: url("../../assets/img/headk.png") no-repeat;
                    background-size: cover;
                  }
                  .web-index-head {
                    width: 0.18rem;
                    height: 0.19rem;
                    position: absolute;
                    left: 3.4px;
                    top: 1.5px;
                    z-index: 666;
                    img {
                      width: 100%;
                      height: 100%;
                      display: block;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .web-index-Assessment {
        width: 0.72rem;
        height: 0.8rem;
        position: absolute;
        right: 0.1rem;
        bottom: 0.05rem;
        .web-index-AsseImage {
          width: 0.72rem;
          height: 0.72rem;
          position: absolute;
          z-index: 10;
          left: 0;
          top: 0;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .web-index-words {
          width: 100%;
          height: 0.04rem;
          font-size: 0.2rem;
          font-family: SimHei;
          color: rgba(201, 235, 247, 1);
          line-height: 0.04rem;
          text-stroke: 1px undefined;
          text-align: center;
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 30;
        }
      }
    }
    .content_right{
      padding-right: .12rem;
    }
    .content_left{
      width: 1.25rem;
      flex-direction: column;
      height: calc(100% - .585rem);
      border-radius: .11rem;
      overflow: hidden;
      margin-top: .1rem;
      .title{
        width: 100%;
        height: .73rem;
        div{
          display: flex;
          justify-content: center;
          align-items: center;
        }
        div:first-child{
          background: rgba(24,49,98,.6);
          height: .4rem;
          img{
            width: .18rem;
            height: .18rem;
          }
        }
        div:last-child{
          height: .33rem;
          background: #040E23;
          font-size:.18rem;
          font-family:SimHei;
          color:rgba(130,160,204,1);
          text-align: center;
        }
      }
      div{
        width: 100%;
        height: calc(100% - .73rem);
        background: rgba(9,26,57,.9);
        ul{
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-around;
          width: 100%;
          align-items: center;
          li{
            width: .87rem;
            height: .84rem;
            position: relative;
            div{
              width: 100%;
              height: 100%;
              position: absolute;
              top:0;
              left: 0;
              background: url(../../assets/img/headk.png) 0 0 / 100% 100%;
            }
            img{
                width: 88%;
                height: 88%;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
            }
          }
        }
      }
    }
  }
  .web-index-footerBox {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.84rem;
    padding: 0 0.4rem;
    box-sizing: border-box;
    background: linear-gradient(
      0deg,
      rgba(5, 20, 40, 1) 0%,
      rgba(46, 79, 131, 1) 100%
    );
    box-shadow: 0px -3px 11px 1px rgba(0, 0, 0, 0.46);
    opacity: 0.95;
    .web-index-footer {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        li {
          height: 100%;
          a {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: left;
            .web-footer-image {
              width: 0.4rem;
              height: 0.4rem;
              margin-right: 0.1rem;
              img {
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            .web-footer-words {
              display: flex;
              margin-top: 0.15rem;
              flex-direction: column;
              p {
                font-size: 0.2rem;
                color: rgba(179, 204, 231, 1);
                line-height: 0.1rem;
              }
              span {
                font-size: 0.1rem;
                color: rgba(51, 85, 138, 1);
                font-family: SimHei;
              }
            }
          }
        }
       .footer_actively{
        width: 1.3rem!important;
        height: 1.4rem!important;
        margin-right: -.8rem!important;
        margin-bottom: -.1rem;
        margin-left: .2rem;
      }
      }
    }

  }
  .vux-popup-dialog{
      border-radius: .1rem;
      width: 50%;
      background: #101F32!important;
      left: 0;
      right: 0;
      margin: auto;
      bottom: 2.04rem;
      height: 3.79rem!important;
      overflow-y: inherit;
      .detail_box{
        position: relative;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .main_text{
          width: 4.4rem;
          height: 2.33rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          font-family:SimHei;
          font-weight:400;
          color:rgba(233,252,253,1);
          font-size: .26rem;
          div{
            display: flex;
            span{
              margin-right: .18rem;
              // width: 1.2rem;
            }
          }
        }
        .main_text>div:last-child{
            display: block;
            span{
              float: left;
              height: .45rem;
            }
            p{
              line-height: .44rem;
            }
        }
        img{
          position: absolute;
        }
      }
      .detail_box>.indexcounselorImg{
        width: 2.74rem;
        height: 4.32rem;
        top: -.53rem;
        left: -1.44rem;
      }
      .detail_box>.indexFooter{
        width: 1.43rem;
        height: 1.67rem;
        right: -.32rem;
        bottom: -.3rem;
      }
      .detail_box>.indexClose{
        width:.42rem;
        height: .42rem;
        top: .15rem;
        right: .19rem;
      }
    }

}
</style>
