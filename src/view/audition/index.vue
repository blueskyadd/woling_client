<template>
    <div class="auditionBig">
      <headerTitle :title="headerTitle"  @changeCity='changeCity' :headersetCategory='headersetCategory' :headersetAge='headersetAge' :isAgeList='true' @setShowCategory='setShowCategory' @setShowAge='setShowAge' :isUpload = 'false' :isLocation='true'/>
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
              <div class="Py" @click="getOrderDetail">{{buttonText}}</div>
            </div>
            <div class="AllImgBox">
              <div class="Scll">
                <img :src="item.image" alt="" :key="item.id" v-for="item in ClassDetal.good_details">
              </div>
            </div>
          </section>
        </div>
      </div>
      <!-- 详情 -->
      <pop-up ref="popUpDetail" class="orderDetail" :detailData='detailDataObj'>
          <template slot="second" >
            <mu-paper :z-depth="1" class="demo-loadmore-wrap list"   ref="scroll">
              <mu-load-more
                @refresh="refresh()"
                :refreshing="refreshing"
                @load="load(true)"
                :loaded-all="isLoaded"
              >
                <ul>
                  <li v-for="(item, index) in AuditionTimeList" @click="setClassTime(item, index)" :class="{'actively': index == classTimeindex}" :key="item.id"><p>{{item.start_time}}-{{item.end_time}}</p></li>
              </ul>
              </mu-load-more>
          </mu-paper>
               <span class="submitButton"  @click="setappoint">{{detailDataObj.buttonText}}</span>
          </template>
      </pop-up>
      <!-- 年龄 课程分类 -->
      <popup v-model="ispopupList" position="bottom" max-height="50%">
        <div class="popupList">
          
          <ul  v-if="isType">
            <li v-for="(item, index) in popupList" :key="item.id" :class="index == setCategoryPopupIndex ? 'actively' : ''" @click="stePopupID(item, index)">
              <div>{{item.name}}</div>
            </li>
          </ul>
          <ul v-else>
            <li v-for="(item, index) in popupList" :key="item.id" :class="index == setAgePopupIndex ? 'actively' : ''" @click="stePopupID(item, index)">
              <div>{{item.name}}</div>
            </li>
          </ul>
        </div>
      </popup>
    </div>
</template>
<script>
  import headerTitle from "../../components/header";
  import sideBar from "../../components/sidebar";
  import popUp from "../../components/popUp"
  import { querystring, Popup } from 'vux'
import { get } from 'http';
    export default {
      components:{headerTitle,sideBar, popUp, Popup},
        name: "index",
      data(){
        return{
          headerTitle:this.$route.query.flag == 1 ?"试听": "课程",
          leftList:[],
          Category:{
            province :"",
            City:"",
            area:"",
            age:'',   //  age_type 年龄段 (1,”5-6”), (2,”7-8”), (3,”8-10”),  (4,”10-12”)
            course:''   //(1, “基础足球课”), (2, “进阶足球课”), (3, “成人足球课”), (4, “守门员课”)
          },
          setIndex:0,
          buttonText: this.$route.query.flag == 1 ?"试听": "购买",
          detailDataObj:{
              'title':'订单详情',
              'buttonText':'确定'
          },
          ClassDetal:{},
          age_typeList:[
            {
              id: 1,
              name: '5-6岁'
            },
            {
              id: 2,
              name: '7-8岁'
            },
            {
              id: 3,
              name: '8-10岁'
            },
            {
              id: 4,
              name: '10-12岁'
            }
          ],
          course_typeList:[
            {
              id: 1,
              name: '基础足球课'
            },
            {
              id: 2,
              name: '进阶足球课'
            },
            {
              id: 3,
              name: '成人足球课'
            },
            {
              id: 4,
              name: '守门员课'
            }
          ],

          popupList:[],
          ispopupList: false,
          setAgePopupIndex: -1,
          setCategoryPopupIndex: -1,
          isType: true,//年龄段与课程分类列表切换
          getCourseId:'',//课程ID
          headersetAge:'年龄段',
          headersetCategory:'课程类别',
          AuditionTimeList: [],//试听课程上课时间列表
          refreshing:  false,//上拉刷新
          number:1,//上拉加载页数
          isLoaded:false,//数据是否加载完毕
          classTimeId: '',//试听课程时间ID
          classTimeindex: -1,//试听课程时间下标
        }
      },
    methods: {
        /**@name获取班级名称列表 */
        getStudentList(data){
          this.setIndex = data.index
          this.getCourseId = data.item.id
          this.$loading('');
           this.GetClassDetal(data.item.id)
        },
        getOrderDetail(){
           this.number = 1
            this.$route.query.flag == 1 ? this.getAuditionTime(1)  : this.getCourseBuy()
            this.$route.query.flag == 1 ? this.$refs.popUpDetail.isDetail = true : ''
        },
        setappoint(){
          if(!this.classTimeId){
            this.$toast.center('请选择具体试听时间')
          }else{
            this.$loading('');
            var params = {audition_time: this.classTimeId }
            this.$http.post(this.$conf.env.setappoint, params).then( res =>{
              this.$loading.close();
              this.$toast.center('预定成功')
              this.$refs.popUpDetail.isDetail = false
              console.log(res)
            }).catch(err =>{
              this.$loading.close();
              if(err.request.status == '400'){
                this.$toast.center('你已试听或购买本课程')
              }else{
                this.$toast.center('服务器错误')
              }
              this.$refs.popUpDetail.isDetail = false
              
            })
          }
        },
        refresh(flag) {
            this.refreshing = false;
            this.number = 1
            this.isLoaded = false
            console.log("上拉刷新")
            this.getAuditionTime(1);
        },
        load(flag) {
          console.log('加载')
          this.number += 1
          // this.loading = true;
          this.getAuditionTime(this.number);
        },
        /**@name 试听课程上课时间 */
        getAuditionTime(number){
          
          this.$http.get(this.$conf.env.getAuditionTime + this.getCourseId + '&p=' + number).then( res =>{
             if(!res.data.next){
                if(res.data.results.length == 0 || res.data.results.length ==  res.data.count/number){
                    number ==1?this.$toast.center('暂无数据') :this.$toast.center('已加载全部数据')
                  }else if(res.data.results.length > 0 && res.data.results.length < res.data.count/number && number !=  1){
                    this.$toast.center('已加载全部数据')
                  }
                  this.isLoaded = true
              this.isLoaded = true
            }else{
              this.isLoaded = false
            }
             number==1 ? this.AuditionTimeList = res.data.results : this.AuditionTimeList = this.AuditionTimeList.concat(res.data.results)
            console.log(res)
          }).catch(err =>{
            this.isLoaded = true
          this.$toast.center('服务器错误');
          })
        },
        
        /**@name 课程列表 */
        GetClassList(){
          var url =this.Category.province+"&area="+this.Category.City+"&age_type="+this.Category.age+"&course_type="+this.Category.course;
          this.$http.get(this.$conf.env.getClassList + url)
            .then(res => {
              this.$loading.close();
              if(!res.data.length){
                this.$toast.center('暂无数据');
                this.leftList = []
                this.ClassDetal = {}
              }else{
                this.leftList = res.data
                this.getCourseId = res.data[0].id
                this.$loading('');
                this.GetClassDetal(res.data[0].id)
              }
            })
            .catch(err => {
              console.log(err)
              this.$loading.close();
              this.$toast.center('网络错误');
            });
        },
        /**@name 试听列表 */
        getAuditionList(){
          var url = this.Category.province+"&area="+this.Category.City+"&age_type="+this.Category.age+"&course_type="+this.Category.course;
          this.$http.get(this.$conf.env.getAuditionList + url)
            .then(res => {
              this.$loading.close();
              if(!res.data.length){
                this.$toast.center('暂无数据');
                this.leftList = []
                this.ClassDetal = {}
              }else{
                this.leftList = res.data
                this.getCourseId = res.data[0].id
                this.$loading('');
                this.GetClassDetal(res.data[0].id)
              }
            })
            .catch(err => {
              console.log(err)
              this.$loading.close();
              this.$toast.center('网络错误');
            });
        },
        GetClassDetal(id){
          this.$http.get(this.$conf.env.getClassDetail + id)
            .then(res => {
              this.$loading.close();
              this.ClassDetal = res.data
            })
            .catch(err => {
              this.$loading.close();
              this.$toast.center('网络错误');
            });

        },

        /**@name 课程购买 */
        getCourseBuy(){
          this.$loading('');
          var params ={'course': this.getCourseId } 
          this.$http.post(this.$conf.env.getCourseBuy, params).then( res =>{
            this.$loading.close();
            if(res.data.order){
              this.$store.commit('setOrder',{orderID: res.data.order, orderPrice: this.ClassDetal.price} )
              this.$router.push({'name':'puy'})
            }else{
              this.$toast.center(res.data.msg)
            }
          }).catch(err =>{
            this.$toast.center('服务器错误')
          })
        },
        changeCity(data){
          this.Category.province = data [1];
          this.Category.City = data [1];
          this.Category.area = data [2];
          this.$loading('');
           this.$route.query.flag == 1 ? this.getAuditionList():this.GetClassList()
        },

        /**@name选择课程类别 */
        setShowCategory(){
          this.isType = true;
          this.popupList = this.course_typeList;
          this.ispopupList = true;
        },
        /**@name 选择年龄段 */
        setShowAge(){
          this.isType = false;
          this.popupList = this.age_typeList;
          this.ispopupList = true;
        },
        stePopupID(item, index){
           this.isType ? this.setCategoryPopupIndex = index : this.setAgePopupIndex = index
          this.isType ? this.Category.course = item.id : this.Category.age = item.id
          this.$loading('');
           this.$route.query.flag == 1 ? this.getAuditionList():this.GetClassList()
          this.isType ? this.headersetCategory = item.name : this.headersetAge = item.name
           this.ispopupList = false;
        },
        /**@name 选择预约课程的时间 */
        setClassTime(item, index){
          this.classTimeindex = index;
          this.classTimeId = item.id
        }
      },
      mounted() {
        this.$loading('');
        this.$route.query.flag == 1 ? this.getAuditionList():this.GetClassList()
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
      width: 57% !important;
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
        .DETAIL{
          width:100%!important;
          padding: 0 .27rem;
          ul{
            height: 2.4rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            width: 100%;
            li{
              width: 29%;
              height: .42rem;
              border: 1px solid #C1D8F8;
              color: #c1d8f7;
              font-size: .18rem;
              text-align: center;
              line-height: .42rem;
              border-radius: .05rem;
              margin-right: 4%;
              margin-bottom: .29rem;
            }
            .actively{
              border-color: #90ffbd;
              color: #90ffbd;
            }
            
          }
          .mu-paper-round{
              background: transparent!important;
              box-shadow: none!important;
              .mu-load-more{
                overflow-y: scroll;
                height: 2.4rem;
              }
            }
          .submitButton{
            margin: 0 auto !important;
          }
        }
      }
    }
    .popupList{
      background: linear-gradient(0deg, #0b1b33 0%, #1e3d5d 100%);
      li{
        height: .7rem;
        display: flex;
        justify-content: center;
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
  }
</style>
