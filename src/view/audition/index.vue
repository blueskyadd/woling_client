<template>
    <div class="auditionBig">
      <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='true'/>
      <div class="Menu">
        <sideBar :leftList='leftList' @change="getStudentList" :setIndex='setIndex'/>
        <div class="MenuRight">
          <section>
            <div class="ClassName">课程名称：{{ClassDetal.name}}</div>
            <div class="XinNew">
              <p>适合年龄段：{{ClassDetal.age_type}}岁</p>
              <p>课程类别：{{ClassDetal.course_type}}</p>
              <p>上课时段：{{ClassDetal.start_time}}-{{ClassDetal.start_time}}</p>
              <p>课时：{{ClassDetal.course_num}}课时</p>
            </div>
            <div class="address">
              <p>上课地址：{{ClassDetal.address}}</p>
            </div>
            <div class="priceBOx">
              <p>￥{{ClassDetal.price}}</p>
              <div class="Py">{{buttonText}}</div>
            </div>
            <div class="AllImgBox">
              <div class="Scll">
                <img :src="item.image" alt="" :key="item" v-for="item in ClassDetal.good_details">
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
</template>
<script>
  import headerTitle from "../../components/header";
  import sideBar from "../../components/sidebar";
  import { querystring } from 'vux'
    export default {
      components:{headerTitle,sideBar},
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
          City:{
            province :"上海",
            City:"上海",
            area:"杨浦",
            age:"0-3",   //  age_type 年龄段 (1,”5-6”), (2,”7-8”), (3,”8-10”),  (4,”10-12”)
            course:1    //(1, “基础足球课”), (2, “进阶足球课”), (3, “成人足球课”), (4, “守门员课”)
            //上海&area=杨浦&age_type=&course_type=
          },
          setIndex:0,
          ClassDetal:{},
          buttonText: this.$route.query.flag == 1 ?"试听": "购买"
        }
      },
    methods: {
        /**@name获取班级名称列表 */
        getStudentList(data){
          this.headerTitle = data.item.name + '学员'
          this.setIndex = data.index
        },

        GetClassList(){
          var url =this.City.province+"&area="+this.City.City+"&age_type"+this.City.age+"=&course_type="+this.City.course;
          this.$http.get(this.$conf.env.getClassList + encodeURI(encodeURI(url)))
            .then(res => {
              this.$loading.close();
              console.log(res.data)
            })
            .catch(err => {
              this.$loading.close();
              this.$toast.center('网络错误');
            });
        },
        GetClassDetal(id){

          this.$http.get(this.$conf.env.getClassDetail + id)
            .then(res => {
              this.$loading.close();
              this.ClassDetal = res.data
              console.log(this.ClassDetal)
              console.log(this.ClassDetal.age_type)
            })
            .catch(err => {
              this.$loading.close();
              this.$toast.center('网络错误');
            });

        },

      },
      created() {
        this.GetClassList()

        //暂时
        this.GetClassDetal(3)
      }
    }
</script>

<style scoped lang="scss">
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
  }
</style>
