<template>
    <div class="auditionBig">
      <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='false'/>
      <div class="Menu">
        <sideBar :leftList='leftList' @change="getStudentList" :setIndex='setIndex'/>
        <div class="MenuRight">
          <section>
            <div class="ClassName">课程名称：射门课程</div>
            <div class="XinNew">
              <p>适合年龄段：3-6岁</p>
              <p>课程类别：少儿课</p>
              <p>上课时段：2019.03-2019.08</p>
              <p>课时：32课时</p>
            </div>
            <div class="address">
              <p>上课地址：上海市浦东新区祥科路53号</p>
            </div>
            <div class="priceBOx">
              <p>￥3000.00</p>
              <div class="Py" @click="getOrderDetail">{{buttonText}}</div>
            </div>
            <div class="AllImgBox">
              <div class="Scll">
              </div>
            </div>
          </section>
        </div>
      </div>
      <pop-up ref="popUpDetail" class="orderDetail" :detailData='detailDataObj'>
          <template slot="second" >
                <ul>
                  <li><p>2019-05-23-12</p></li>
                  <li><p>2019-05-23-12</p></li>
                  <li><p>2019-05-23-12</p></li>
                  <li><p>2019-05-23-12</p></li>
                  <li><p>2019-05-23-12</p></li>
                  <li><p>2019-05-23-12</p></li>
                  <li><p>2019-05-23-12</p></li>
                  <li><p>2019-05-23-12</p></li>
                  <li><p>2019-05-23-12</p></li>
              </ul>
              
          </template>
      </pop-up>
    </div>
</template>
<script>
  import headerTitle from "../../components/header";
  import sideBar from "../../components/sidebar";
  import popUp from "../../components/popUp"
  import { querystring } from 'vux'
    export default {
      components:{headerTitle,sideBar, popUp},
        name: "index",
      data(){
        return{
          headerTitle:this.$route.query.flag == 1 ?"试听": "课程",
          leftList:[
            {
              id:0,
              name:'射门课程'
            },
            {
              id:1,
              name:'运动课程'
            }
          ],
          setIndex:0,
          buttonText: this.$route.query.flag == 1 ?"试听": "购买",
          detailDataObj:{
              'title':'订单详情',
              'buttonText':'确定'
          }
        }
      },
      methods: {
        /**@name获取班级名称列表 */
        getStudentList(data){
          this.headerTitle = data.item.name + '学员'
          this.setIndex = data.index
        },
        getOrderDetail(data){
            // this.detailDataObj = data
            this.$refs.popUpDetail.isDetail = !this.$refs.popUpDetail.isDetail

        },

      },
      mounted(){
        console.log(this.$route.query.flag)
      }
    }
</script>

<style  lang="scss">
@import "../../assets/style/AllStyle";
  .auditionBig{
    width: 100%;
    height: 100%;
    background: url(../../assets/img/bj1.png)  0 0 / 100% 100% ;
    .Menu{
      width: 100%;
      height: calc(100% - .64rem);
      overflow: hidden;
      display: inline-flex;
      .MenuRight{
        flex: 1;
        height: 100%;
        padding: .2rem .16rem .18rem .18rem;
        box-sizing: border-box;
        section{
          width: 100%;
          height: 100%;
          background:linear-gradient(0deg,rgba(11,27,51,1) 0%,rgba(30,61,93,1) 100%);
          border-radius:5px;
          padding:0 .24rem;
          box-sizing: border-box;
          .ClassName{
            font-size:.26rem;
            font-family:SimHei;
            color:rgba(201,235,247,1);
            line-height: .72rem;
          }
          .XinNew{
            display: flex;
            flex-wrap: nowrap;
            p{
              width: 30%;
              line-height: .38rem;
              font-size:.2rem;
              font-family:SimHei;
              color:rgba(201,235,247,1);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:nth-child(1){
                width: 25%;
              }
              &:nth-child(2){
                width: 25%;
              }
              &:nth-child(4){
                width: 20%;
              }
            }
          }
          .address{
            p{
              font-size:.2rem;
              font-family:SimHei;
              color:rgba(201,235,247,1);
              line-height: .5rem ;
            }
          }
          .priceBOx{
            display: flex;
            justify-content: flex-end;
            p{
              font-size:.34rem;
              font-family:MFShangHei_Noncommercial-Regular;
              color:rgba(255,43,68,1);
              line-height: .48rem;
            }
            .Py{
              width: 1.27rem;
              height: .48rem;
              background: url("../../assets/img/puy.png") no-repeat;
              background-size: 100% 100%;
              font-size:.21rem;
              font-family:MicrosoftYaHei;
              color:rgba(212,240,243,1);
              line-height:.48rem;
              text-align: center;
              margin-left: .19rem;
            }
          }
          .AllImgBox{
            margin-top:.17rem;
            width:100%;
            height:4.8rem;
            background:rgba(64,76,130,1);
            overflow: hidden;
            .Scll{
              width: 100%;
              height: 100%;
              overflow-y: scroll;
              overflow-x: hidden;
              img{
                @include ImgStyle;
              }
            }
          }
        }
      }
      
      
    }
    .detail_box{
      height: 4.02rem!important;
      position: relative;
      .close{
        position: absolute!important;
        
        right: 0;
        top: 0;
      }
      .detail_main{
        width: 100%;
        padding-top: 0.07rem!important;
        header{
          margin: 0 .25rem 0 0!important;
        }
        div{
          width:100%!important;
          padding: 0 .27rem;
          ul{
            height: 2.4rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            li{
              width: 2.22rem;
              height: .42rem;
              border: 1px solid #c1d8f7;
              color: #c1d8f7;
              font-size: .18rem;
              text-align: center;
              line-height: .42rem;
              border-radius: .05rem;
            }
            .actively{
              border-color: #90ffbd;
              color: #90ffbd;
            }
          }
          .submitButton{
            margin: 0 auto !important;
          }
        }
      }
    }
  }
</style>
