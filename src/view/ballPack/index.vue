
<template>
  <div class="student_Detail">
    <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='true'/>
    <div class="main">
      <sideBar :leftList='leftList' @change="getStudentList" :setIndex='setIndex'/>
      <div class="selete_main" >
        <div class="ChangJie">
          <div class="ImageBox">
            <img src="../../assets/img/CD.png" alt="">
          </div>
          <div class="ContentMenu">
            <h2>熊猫球场   <span>70元 / 小时 / 位</span></h2>
            <span>经营时间：8:30-17:30</span>
            <p style="padding-top: .09rem;padding-bottom: .1rem">场地介绍：该场地建于2015年，有着最新的设备、和一流的管理人员，举办过少儿的足 球比赛，也作为各大公司的活动举办地。</p>
            <p>地址：上海市浦东新区海趣路</p>
          </div>
        </div>
        <div class="YD">
          <ul>
            <li>
              <h2>在线预定  <span>提前3天可退款</span></h2>

            </li>
            <li>
              <p>选择日期<span>2019年5月20日</span></p>

            </li>
            <li style="display: flex;align-items: center;justify-content: space-between">
              <p>是否包场</p>
              <group>
                <x-switch title="" v-model="value"></x-switch>
              </group>
            </li>
          </ul>
        </div>
        <div class="RC">
          <ul>
            <li><p>入场时间：</p></li>
            <li style="display: flex;align-items: center;height: .6rem;justify-content: space-between">
              <x-button class="checkedBut">8:00-10:00</x-button>
              <x-button class="NoChecked">8:00-10:00</x-button>
              <x-button>8:00-10:00</x-button>
              <x-button>8:00-10:00</x-button>
              <x-button :disabled="true">8:00-10:00</x-button>
              <x-button>8:00-10:00</x-button>

            </li>
          </ul>
        </div>
        <div class="PerNum">
          <div>
            <p>使用人数（剩余8人）</p>
            <p>该球场最多预订12人</p>
          </div>
          <group>
            <x-number title="" v-model="valNum"></x-number>
          </group>
        </div>
        <div class="UserInfo">
          <ul>
            <li>
              <group>
                <x-input title="姓名" v-model="userName"></x-input>
              </group>
            </li>
            <li>
              <group>
                <x-input title="联系方式" type="number" v-model="Iphone"></x-input>
              </group>
            </li>
            <li>
              <group>
                <x-input title="用途" placeholder="包场时一定要填写包场用途" v-model="introduce"></x-input>
              </group>
            </li>
          </ul>
        </div>
        <div class="Puy">
          <div class="Money">金额:<span>￥240.00</span></div>
          <div class="But">预定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headerTitle from "../../components/header";
  import sideBar from "../../components/sidebar"
  import mianList from '../../components/mainList'
  import { XSwitch,Group,XButton,XNumber,XInput} from 'vux'
  export default {
    name:'ballPack',
    components:{headerTitle, sideBar, mianList,XSwitch,Group,XButton,XNumber,XInput},
    data(){
      return{
        headerTitle: '球场',
        leftList:[
          {
            id:0,
            name:'熊猫球场'
          },
          {
            id:1,
            name:'蓝狐球场'
          }
        ],
        loading: false,//全屏Loading
        setIndex:0,
        value:false,
        valNum:0,
        userName:"习近平",
        Iphone:13520154310,
        introduce:''
      }
    },
    methods: {
      /**@name获取班级名称列表 */
      getStudentList(data){
        this.headerTitle = data.item.name + '学员'
        this.setIndex = data.index
      }

    },
    mounted(){
    }
  }
</script>
<style lang="scss">
  @import '../../assets/style/AllStyle';
  .student_Detail{
    background: url(../../assets/img/bj1.png)  0 0 / 100% 100% ;
    width: 100%;
    height:100%;
    .main{
      width: 100%;
      height: calc(100% - .64rem);
      overflow: hidden;
      .selete_main{
        padding: .2rem .17rem 0 .18rem;
        width: calc(100% -  1.4rem);
        float: left;
        height: 100%;
        overflow-y: scroll;
        .ChangJie{
          width:100%;
          height:2.1rem;
          background:linear-gradient(0deg,rgba(11,27,51,1) 0%,rgba(30,61,93,1) 100%);
          border-radius:5px;
          padding: .15rem .43rem .18rem .39rem;
          box-sizing: border-box;
          display: flex;
          margin-bottom: .1rem;
          .ImageBox{
            width:2.93rem;
            height:1.77rem;
            background:rgba(2,8,25,1);
            border-radius:5px;
            img{
              @include ImgStyle;
            }
          }
          .ContentMenu{
            padding-left: .27rem;
            box-sizing: border-box;
            flex: 1;
            h2{
              font-size:.3rem;
              color:#BCDBE6;
              span{
                float: right;
                color: #F50962;
              }
            }
            p,span{
              font-size: $MiddleSize;
              @include FontSize;
              font-family:SimHei;
            }
          }
        }
        .YD{
          width: 100%;
          height:1.61rem;
          background:linear-gradient(0deg,rgba(11,27,51,1) 0%,rgba(30,61,93,1) 100%);
          border-radius:5px;
          padding:.03rem .38rem 0 .18rem;
          box-sizing: border-box;
          margin-bottom: .08rem;
          ul{
            width: 100%;
            height: 100%;
            li{
              width: 100%;
              height:.53rem;
              border-bottom:1px solid #406089;
              &:last-child{
                border: 0;
              }
              span{
                font-size:.16rem;
                font-family:SimHei;
                color:rgba(9,245,226,1);
                float: right;
                line-height: .53rem;
              }
              h2{
                font-size:.3rem;
                color:#BCDBE6;
                line-height: .53rem;
              }
              p{
                @include FontSize;
                font-family:SimHei;
                line-height: .53rem;
              }
              .weui-cells{
                background: transparent;
                font-size: .2rem;
                &:before,&:after{
                  border-top: 0;
                  border-bottom: 0;
                }
              }
              .vux-no-group-title{
                margin: 0;
                .weui-cell{
                  padding: 0;
                  .weui-switch{
                    height: .45rem;
                    width: .75rem;
                    &:after{
                      height: .4rem;
                      width: .4rem;
                    }
                    &:before{
                      height: .43rem;
                      width: .73rem;
                    }
                  }
                }
              }
              .weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box{
                border-color: #04BE02;
                background-color: #04BE02;
              }
              .weui-switch:checked:after, .weui-switch-cp__input:checked ~ .weui-switch-cp__box:after{
                -webkit-transform: translateX(.32rem);
                transform: translateX(.32rem);
              }
            }
          }
        }
        .RC{
          width:100%;
          height:1.1rem;
          background:linear-gradient(0deg,rgba(11,27,51,1) 0%,rgba(30,61,93,1) 100%);
          border-radius:5px;
          margin-bottom: .09rem;
          padding:0.03rem .22rem .06rem .18rem;
          ul{
            width: 100%;
            height: 100%;
            li{
              height: .47rem;
              border-bottom: 1px solid #406089;
              &:last-child{
                border:0;
              }
              p{
                @include FontSize;
                line-height: .47rem;
              }
              button.weui-btn, input.weui-btn{
                width:1.76rem;
                height:.48rem;
                background:#5680B3;
                border-radius:5px;
                padding: 0;
                margin: 0;
                font-size:.29rem;
                font-family:SimHei;
                color:rgba(255,255,255,1);
                line-height: .48rem;
              }
              .checkedBut{
                background:rgba(255,28,130,1)!important;
              }
              .NoChecked{
                background:rgba(54,76,107,1)!important;
                color: #5680B3!important;
              }
            }
          }
        }
        .PerNum{
          padding:.09rem .11rem .07rem .18rem;
          box-sizing: border-box;
          background:linear-gradient(0deg,rgba(11,27,51,1) 0%,rgba(30,61,93,1) 100%);
          border-radius:5px;
          display: flex;
          justify-content: space-between;
          margin-bottom: .11rem;
          p{
            @include FontSize;
            line-height: .33rem;
            font-size: $MiddleSize;
            font-family:SimHei;
            &:first-child{
              font-size: .24rem;
            }
          }
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
        .UserInfo{
          width:100%;
          height:1.51rem;
          background:linear-gradient(0deg,rgba(11,27,51,1) 0%,rgba(30,61,93,1) 100%);
          border-radius:5px;
          padding-left: .18rem;
          padding-right: .4rem;
          box-sizing: border-box;
          margin-bottom: .08rem;
          ul{
            width: 100%;
            li{
              height: .5rem;
              width: 100%;
              border-bottom:1px solid #406089;
              &:last-child{
                border: 0;
              }
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
              .weui-cell {
                padding: 0;
                .weui-label{
                  width: 1.27rem !important;
                  color: #BCDBE6;
                  font-size:.20rem;
                  font-family:SimHei;
                  font-weight:400;
                  color:rgba(188,219,230,1);
                }
                input{
                  font-size:.2rem;
                  font-family:SimHei;
                  font-weight:400;
                  color:rgba(188,219,230,1);
                }
              }
            }
          }
        }
        .Puy{
          width: 100%;
          height: 1rem;
          background:linear-gradient(0deg,rgba(45,73,121,1) 0%,rgba(35,51,84,1) 100%);
          box-shadow:0px -2px 4px 0px rgba(0, 0, 0, 0.24);
          display: flex;
          justify-content:flex-end;
          .But{
            width:2rem;
            height:1rem;
            background:rgba(16,193,200,1);
            line-height: 1rem;
            color: #fff;
            font-size:.31rem;
            font-family:MicrosoftYaHei;
            color:rgba(255,255,255,1);
            text-align: center;
            margin-left: .62rem;
          }
          .Money{
            font-size:.27rem;
            font-family:SimHei;
            color:rgba(255,255,255,1);
            line-height: 1rem;
            span{
              font-size:.28rem;
              font-family:MicrosoftYaHei;
              color: #00FFFC;
            }
          }
        }
      }
      .selete_main::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>
