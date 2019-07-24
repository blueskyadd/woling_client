
<template>
  <div class="student_Detail">
    <headerTitle :title="headerTitle" :isUpload="false" @changeCity='changeCity' :isLocation="true" />
    <div class="main">
      <sideBar :leftList="leftList" @change="getStudentList" :setIndex="setIndex" />
      <div class="selete_main">
        <div class="ChangJie">
          <div class="ImageBox">
            <img :src="picth.front_image" alt />
          </div>
          <div class="ContentMenu">
            
            <h2>
              {{picth.name}}
              <span>{{picth.all_price}}元 / 小时 / 位</span>
            </h2>
            <span>经营时间：8:30 - 17:30</span>
            <p style="padding-top: .09rem;padding-bottom: .1rem">场地介绍：{{picth.desc}}</p>
            <p>地址：{{picth.city}}{{picth.area}}{{picth.address}}</p>
            <span class="student_map" @click="getMap">查看路线</span>
          </div>
        </div>
        <div class="YD">
          <ul>
            <li>
              <h2>
                在线预定
                <span>提前3天可退款</span>
              </h2>
            </li>
            <li>
              <p @click="isTimeList = true">
                选择日期
                <span>
                  <img style="margin-top: .1rem;margin-left: .04rem;" :src="day_weather_pic" alt="">
                </span>
                <span>{{timeData}}</span>
                
              </p>
            </li>
            <li style="display: flex;align-items: center;justify-content: space-between">
              <p>是否包场</p>
              <group>
                <x-switch title v-model="userInfo.all"></x-switch>
              </group>
            </li>
          </ul>
        </div>
        <div class="RC">
          <ul>
            <li>
              <p>入场时间：</p>
            </li>
            <li >
              <div :style="{'width':approachTime.length * (1.76+0.2) +'rem' }">
                 <x-button  v-for="(item, index) in approachTime" v-show="userInfo.all == true && item.sell_num != item.num ? false : true" :class="item.flag ? 'checkedBut' : item.sell_num == 0 ? 'NoChecked':''" @click.native="setApproachTime(item, index)"  :disabled="item.sell_num == 0" :key="item.id">{{item.start_time}}-{{item.end_time}}</x-button>
               </div>
            </li>
          </ul>
        </div>
        <div class="PerNum" v-if="this.approachTime.filter(function(item){ return item.flag == true }).length > 0">
          <div>
            <p>使用人数（剩余{{Approach.sell_num}}人）</p>
            <p>该球场最多预订{{Approach.num}}人</p>
          </div>
          <group>
            <x-number :max='Approach.sell_num' :min='0' title v-model="userInfo.num" @on-change="mod_num"></x-number>
          </group>
        </div>
        <div class="UserInfo">
          <ul>
            <li>
              <group>
                <x-input title="姓名" placeholder="姓名" v-model="userInfo.name" :show-clear='false'></x-input>
              </group>
            </li>
            <li>
              <group>
                <x-input title="联系方式" placeholder="联系方式"  type="number" v-model="userInfo.mobile" :show-clear='false'></x-input>
              </group>
            </li>
            <li>
              <group>
                <x-input title="用途" placeholder="包场时一定要填写包场用途" v-model="userInfo.info" :show-clear='false'></x-input>
              </group>
            </li>
          </ul>
        </div>
        <div class="Puy">
          <div class="Money">
            金额:
            <span>￥{{totalPrice}}</span>
          </div>
          <div class="But" @click="getOrderDetail">预定</div>
        </div>
      </div>
      <popup-list ref="popUpDetail" class="orderDetail" :detailData="detailDataObj">
        <template slot="second">
          <ul>
            <li>
              <span>预定时间:</span>
              <p>{{timeData}}</p>
            </li>
            <li>
              <span>姓名:</span>
              <p>{{userInfo.name}}</p>
            </li>
            <li>
              <span>联系方式:</span>
              <p>{{userInfo.mobile}}</p>
            </li>
            <li>
              <span>预订人数:</span>
              <p>{{userInfo.num}}</p>
            </li>
            <li>
              <span>包场用途:</span>
              <p>{{userInfo.info}}</p>
            </li>
          </ul>
          <span class="submitButton"  @click="setOrderBallPack">{{detailDataObj.buttonText}}</span>
        </template>
      </popup-list>
    </div>

    <popup v-model="isTimeList" position="bottom" max-height="50%">
      <div class="timeList">
        <ul>
          <li v-for="(item, index) in TimeList" :key="item.id" :class="index == setTimeIndex ? 'actively' : ''" @click="steTimeID(item, index)">
            <div>{{item.day}}</div>
            <div>{{item.weather.day_weather}}</div>
          </li>
        </ul>
      </div>
    </popup>
  </div>
</template>
<script>
import headerTitle from "../../components/header";
import sideBar from "../../components/sidebar";
import mianList from "../../components/mainList";
import popupList from "../../components/popUp";
import { XSwitch, Group, XButton, XNumber, XInput, Popup } from "vux";
import { setTimeout } from 'timers';
export default {
  name: "ballPack",
  components: {headerTitle, sideBar, mianList,  XSwitch, Group, XButton, XNumber, XInput, popupList, Popup},
  data() {
    return {
      headerTitle: "球场",
      leftList: [],
      loading: false, //全屏Loading
      setIndex: 0,
      detailDataObj: {
        title: "订单详情",
        buttonText: "去支付"
      },
      area: "",
      picth: {},
      isTimeList: false,
      TimeList: [],
      timeData:'',//时间
      day_weather_pic:'',//天气
      timeID:'',
      Approach:{},//入场时间详情
      approachTime: [],//入场时间
      userInfo:{
        all: false, //包场 true 非包场 false 
        num: 0 , //预定人数 非包场 必填 
        name: '', //姓名 
        mobile: '' ,// 手机号 
        pitch: 2, //球场id 
        info: '', //说明 包场必填 
        time_list: [] //时间id 列表
      },
      setTimeIndex: 0,
      totalPrice: 0,//总价格
      setPriceNum: 0,//当前选中的入场时间
    };
  },
  methods: {
    /**@name获取班级名称列表 */
    getStudentList(data) {
      this.setIndex = data.index;
      this.getPitchListDetail(data.item.id);
      this.getTimeList(data.item.id);
    },
    /**@name 获取球场列表 */
    getPitchListData() {
      console.log("kkk")
      this.$http.get(this.$conf.env.getPitchListData + this.area).then(res => {
         this.$loading.close()
          if (!res.data || res.data.length == 0) {
            this.$toast.center("暂无数据");
            this.leftList = [];
            this.picth = {}
          } else {
            this.leftList = res.data;
            this.getPitchListDetail(res.data[0].id);
            this.getTimeList(res.data[0].id);
          }
        })
        .catch(err => {
           this.$loading.close()
           console.log(err)
          this.$toast.center("服务器错误");
        });
    },
    /**@name 地图导航 */
    getMap(){
      // this.picth.address
      console.log(this.picth.address, this.picth.address.city)
      this.$router.push({name:'map', params:{path:'外滩',city:'上海',address:'上海市外滩',title: this.picth.name}})
    },

    /**@name 获取球场详情 */
    getPitchListDetail(ID) {
      this.$http
        .get(this.$conf.env.getPitchListDetail + ID + "/")
        .then(res => {
          console.log(res);
          this.picth = res.data;
        })
        .catch(err => {
          this.$toast.center("服务器错误");
        });
    },

    /**@name更换城市地区 */
    changeCity(data) {
      console.log(data);
      this.area = data[2];
      this.getPitchListData();
    },

    /**@name 选择日期 */
    getTimeList(ID) {
      this.$http
        .get(this.$conf.env.getPicthTimeList + ID)
        .then(res => {
          console.log(res);
          this.TimeList = res.data;
          this.steTimeID(res.data[0], 0)
          this.getday_timeList(res.data[0].id)
        })
        .catch(err => {
          this.$toast.center("服务器错误");
        });
    },
    steTimeID(item, index){
      this.setTimeIndex = index;
      this.timeData = item.day.split('-')[0] + '年' + item.day.split('-')[1] + '月' + item.day.split('-')[2] +'号';//时间
      this.day_weather_pic = item.weather.day_weather_pic
      this.timeID = item.id;
      this.getday_timeList(item.id);
      this.isTimeList = false;
    },

    /**@name入场时间 */
    getday_timeList(ID){
      this.$http.get(this.$conf.env.getday_timeList + ID).then( res =>{
        res.data.forEach( value =>{
          value.flag = false;
          value.properNum = 0
        })
        this.approachTime = res.data;
      }).catch(err =>{
        this.$toast.center('服务器错误');
      })
    },
    setApproachTime(item, index){
      this.setPriceNum = index
      item.flag = !item.flag;
      if(!item.flag){
        this.totalPrice -=  this.picth.all_price *2 * item.properNum
         item.properNum = 0 
      }
      if(this.userInfo.all){
        this.userInfo.num = item.num;
        this.Approach.sell_num = 0;
      }else{
        this.Approach.sell_num = item.sell_num;
        this.userInfo.num = this.approachTime[this.setPriceNum].properNum
      }
      this.Approach.num = item.num;
    },
    /**@name人数修改 */
    mod_num(flag){
      var totalNum = 0
      this.approachTime.forEach(value =>{
        totalNum += value.properNum
      })
      this.totalPrice = this.picth.all_price *2 * totalNum
    },
    /**@name 球场订单创建 */
    setOrderBallPack(){
     this.$router.push({'name':'puy'})
    },
    getOrderDetail(){
       if(!this.VerificationData()) return 
       this.$loading('');
      var params = this.userInfo
      var arr = this.approachTime.filter(function(item){ return item.flag == true })
      arr.forEach(value =>{
        params.time_list.push(value.id)
      } )
      this.$http.post(this.$conf.env.setOrderBallPack, params).then( res =>{
        console.log(res)
         this.$loading.close()
         this.$store.commit('setOrder',{orderID: res.data.order, orderPrice: this.totalPrice} )
        this.$toast.center('预定成功')
        var vm = this
        setTimeout(()=>{
          vm.$refs.popUpDetail.isDetail = true
        },1000)
      }).catch(err =>{
        this.$loading.close()
        this.$toast.center('服务器错误')
      })
    },
    //数据检验
    VerificationData(){
        if(!this.userInfo.name || !this.userInfo.mobile){
          this.$toast.center('请完善您的信息');
          return false
       }else{
         var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
          if (this.userInfo.mobile && !myreg.test(this.userInfo.mobile.replace(/(^\s*)|(\s*$)/g, ""))) {
            this.$toast.center('请填写正确的手机号');
            return false
          }else{
            if(this.approachTime.filter(function(item){ return item.flag == true }).length == 0){
              this.$toast.center('请选择具体入场时间');
              return false
            }else{
              if(!this.userInfo.num){
                this.$toast.center('请填写入场人数');
                return false
              }else{
                if(this.userInfo.all && !this.userInfo.info){
                  this.$toast.center('包场时一定要填写包场用途哦');
                  return false
                }else{
                  return true
                }
              }
            }
          }
        }
       }
      
  },
  watch:{
    'userInfo.num'(newData, oldData){
      this.approachTime[this.setPriceNum].properNum = newData
    }
  },
  mounted() {
      this.$loading('');
    this.getPitchListData();//列表
  }
};
</script>
<style lang="scss" >
@import "../../assets/style/AllStyle";

.student_Detail {
  background: url(../../assets/img/bj1.png) 0 0 / 100% 100%;
  width: 100%;
  height: 100%;
  
  .main {
    
    width: 100%;
    height: calc(100% - 0.64rem);
    overflow: hidden;
    .vux-popup-dialog {
          top: 1.01rem !important;
        }
    .selete_main {
      
      padding: 0.2rem 0.17rem 0 0.18rem;
      width: calc(100% - 1.4rem);
      float: left;
      height: 100%;
      overflow-y: scroll;
      .ChangJie {
        width: 100%;
        height: 2.1rem;
        background: linear-gradient(
          0deg,
          rgba(11, 27, 51, 1) 0%,
          rgba(30, 61, 93, 1) 100%
        );
        border-radius: 5px;
        padding: 0.15rem 0.43rem 0.18rem 0.39rem;
        box-sizing: border-box;
        display: flex;
        margin-bottom: 0.1rem;
        overflow: hidden;
        .ImageBox {
          width: 2.93rem;
          height: 1.77rem;
          background: rgba(2, 8, 25, 1);
          border-radius: 5px;
          img {
            @include ImgStyle;
          }
        }
        .ContentMenu {
          padding-left: 0.27rem;
          box-sizing: border-box;
          flex: 1;
          overflow-y: scroll;
          h2 {
            font-size: 0.3rem;
            color: #bcdbe6;
            span {
              float: right;
              color: #f50962;
            }
          }
          p,span {
            font-size: $MiddleSize;
            @include FontSize;
            font-family: SimHei;
          }
          .student_map{
            float: right;
            color: #5BE5E0;
            text-decoration: underline;
          }
        }
        .ContentMenu::-webkit-scrollbar{
          display: none;
        }
      }
      .YD {
        width: 100%;
        height: 1.61rem;
        background: linear-gradient(
          0deg,
          rgba(11, 27, 51, 1) 0%,
          rgba(30, 61, 93, 1) 100%
        );
        border-radius: 5px;
        padding: 0.03rem 0.38rem 0 0.18rem;
        box-sizing: border-box;
        margin-bottom: 0.08rem;
        ul {
          width: 100%;
          height: 100%;
          li {
            width: 100%;
            height: 0.53rem;
            border-bottom: 1px solid #406089;
            &:last-child {
              border: 0;
            }
            span {
              font-size: 0.16rem;
              font-family: SimHei;
              color: rgba(9, 245, 226, 1);
              float: right;
              line-height: 0.53rem;
              img{
                width: .32rem;
                height: .24rem;
              }
            }
            h2 {
              font-size: 0.3rem;
              color: #bcdbe6;
              line-height: 0.53rem;
            }
            p {
              @include FontSize;
              font-family: SimHei;
              line-height: 0.53rem;
            }
            .weui-cells {
              background: transparent;
              font-size: 0.2rem;
              &:before,
              &:after {
                border-top: 0;
                border-bottom: 0;
              }
            }
            .vux-no-group-title {
              margin: 0;
              .weui-cell {
                padding: 0;
                .weui-switch {
                  height: 0.45rem;
                  width: 0.75rem;
                  &:after {
                    height: 0.4rem;
                    width: 0.4rem;
                  }
                  &:before {
                    height: 0.43rem;
                    width: 0.73rem;
                  }
                }
              }
            }
            .weui-switch:checked,
            .weui-switch-cp__input:checked ~ .weui-switch-cp__box {
              border-color: #04be02;
              background-color: #04be02;
            }
            .weui-switch:checked:after,
            .weui-switch-cp__input:checked ~ .weui-switch-cp__box:after {
              -webkit-transform: translateX(0.32rem);
              transform: translateX(0.32rem);
            }
          }
        }
      }
      .RC {
        width: 100%;
        height: 1.1rem;
        overflow: hidden;
        background: linear-gradient(
          0deg,
          rgba(11, 27, 51, 1) 0%,
          rgba(30, 61, 93, 1) 100%
        );
        border-radius: 5px;
        margin-bottom: 0.09rem;
        padding: 0.03rem 0.22rem 0.06rem 0.18rem;
        ul {
          width: 100%;
          height: 100%;
          li {
            height: 0.47rem;
            border-bottom: 1px solid #406089;
            &:last-child {
              border: 0;
            }
            p {
              @include FontSize;
              line-height: 0.47rem;
            }
            button.weui-btn,
            input.weui-btn {
              width: 1.76rem;
              height: 0.48rem;
              background: #5680b3;
              border-radius: 5px;
              padding: 0;
              margin: 0;
              font-size: 0.29rem;
              font-family: SimHei;
              color: rgba(255, 255, 255, 1);
              line-height: 0.48rem;
            }
            .checkedBut {
              background: rgba(255, 28, 130, 1) !important;
            }
            .NoChecked {
              background: rgba(54, 76, 107, 1) !important;
              color: #5680b3 !important;
            }
          }
          li:nth-child(2){
            overflow-x: scroll;
            height: auto;
            div{
              
              display: flex;
              align-items: center;
              height: .6rem;
              justify-content: flex-start;
            }
            
            button{
              margin-right: .2rem;
            }
          }
          li:nth-child(2)::-webkit-scrollbar{
            display: none;
          }
          
        }
      }
      .PerNum {
        padding: 0.09rem 0.11rem 0.07rem 0.18rem;
        box-sizing: border-box;
        background: linear-gradient(
          0deg,
          rgba(11, 27, 51, 1) 0%,
          rgba(30, 61, 93, 1) 100%
        );
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.11rem;
        
        p {
          @include FontSize;
          line-height: 0.33rem;
          font-size: $MiddleSize;
          font-family: SimHei;
          &:first-child {
            font-size: 0.24rem;
          }
        }
        .weui-cells {
          margin: 0;
          background: transparent;
          &:before {
            border-top: 0;
          }
          &:after {
            border-bottom: 0;
          }
        }
        .weui-cell {
          padding: 0;
          a {
            width: 0.6rem;
            height: 0.5rem;
            background: rgba(74, 106, 146, 1);
            border: 0;
            padding: 0;
            position: relative;
            svg {
              position: absolute;
              left: 50%;
              top: 50%;
              margin-left: -9px;
              margin-top: -9px;
              fill: #ffffff;
            }
          }
          .vux-number-disabled{
              background: #364C6B;
              color: #5680B3;
          }
          input {
            width: 0.8rem;
            height: 0.5rem;
            background: rgba(74, 106, 146, 1);
            text-align: center;
            font-size: 0.22rem;
            color: #fff;
            margin: 0 0.02rem;
            border: 0;
          }
        }
      }
      .UserInfo {
        width: 100%;
        height: 1.51rem;
        background: linear-gradient(
          0deg,
          rgba(11, 27, 51, 1) 0%,
          rgba(30, 61, 93, 1) 100%
        );
        border-radius: 5px;
        padding-left: 0.18rem;
        padding-right: 0.4rem;
        box-sizing: border-box;
        margin-bottom: 0.08rem;
        ul {
          width: 100%;
          li {
            height: 0.5rem;
            width: 100%;
            border-bottom: 1px solid #406089;
            &:last-child {
              border: 0;
            }
            .weui-cells {
              margin: 0;
              background: transparent;
              &:before {
                border-top: 0;
              }
              &:after {
                border-bottom: 0;
              }
            }
            .weui-cell {
              padding: 0;
              .weui-label {
                width: 1.27rem !important;
                color: #bcdbe6;
                font-size: 0.2rem;
                font-family: SimHei;
                font-weight: 400;
                color: rgba(188, 219, 230, 1);
              }
              input {
                font-size: 0.2rem;
                font-family: SimHei;
                font-weight: 400;
                color: rgba(188, 219, 230, 1);
              }
            }
          }
        }
      }
      .Puy {
        width: 100%;
        height: 1rem;
        background: linear-gradient(
          0deg,
          rgba(45, 73, 121, 1) 0%,
          rgba(35, 51, 84, 1) 100%
        );
        box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.24);
        display: flex;
        justify-content: flex-end;
        .But {
          width: 2rem;
          height: 1rem;
          background: rgba(16, 193, 200, 1);
          line-height: 1rem;
          color: #fff;
          font-size: 0.31rem;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          margin-left: 0.62rem;
        }
        .Money {
          font-size: 0.27rem;
          font-family: SimHei;
          color: rgba(255, 255, 255, 1);
          line-height: 1rem;
          span {
            font-size: 0.28rem;
            font-family: MicrosoftYaHei;
            color: #00fffc;
          }
        }
      }
    }
    .selete_main::-webkit-scrollbar {
      display: none;
    }
  }
  .orderDetail {
    .detail_box {
      width: 60% !important;
      height: 5.89rem !important;
      .detail_main {
        height: auto !important;
      }
      .detail_main > div {
        height: auto !important;
        margin-top: 0.88rem !important;
        ul {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
          width: 100%;
          li {
            height: 0.28rem;
            font-family: SimHei;
            display: flex;
            margin-bottom: 0.27rem;

            img {
              height: 0.28rem;
              margin-right: 0.1rem;
            }
            span {
              color: #acc2e2;
              font-size: 0.2rem;
              margin-right: 0.15rem;
            }
            p {
              color: #7599cf;
            }
          }
        }
      }
    }
  }
  .timeList{
        background: linear-gradient(0deg, #0b1b33 0%, #1e3d5d 100%);
        ul{
          height: 100%;
          overflow-y: scroll;
          li{
            height: .7rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #fff;
            font-size: .22rem;
            font-family: SimHei;
            border-bottom: 1px solid #5a677e;
            padding: 0 .4rem;
          }
          .actively{
            background: #1e3d5d;
            color: #10c1c8;
          }
        }
        ul::-webkit-scrollbar{
          display: none;
        }
  }
}
</style>
