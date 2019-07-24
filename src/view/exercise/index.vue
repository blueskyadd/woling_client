<template>
  <div class="exercise_router_page">
    <headerTitle :title="headerTitle" @showUpdata="showUpdata" :isUpload="isUpload" :isLocation='false'/>
    <div class="exprcise_main">
      <div class="exprcise_sidebar" v-if="isGrade">
        <div class="sidebar_title">
          <span @click="goexerciseCoach" :class="{'activeButton': routerIndex == 1}">教练</span>
          <span @click="goexerciseGrade" :class="{'activeButton': routerIndex == 2}">个人</span>
        </div>
        <div style="overflow:hidden;height:calc(100% + 0.6rem);" >
          <mu-paper :z-depth="1" class="demo-loadmore-wrap list" v-if="routerIndex == 1"   ref="scroll">
              <mu-load-more
                @refresh="refresh(true)"
                :refreshing="refreshing"
                @load="load(true)"
                :loaded-all="isLoaded"
              >
              <ul class="routerIndexOne" >
                    <li v-for="(item,index) in listCoach " :key="index">
                      <div>
                        <div @click="changeStatusVideoTitle(item, index)" class="scrollButton">
                          <div class="footballImg">
                            <img src="../../assets/img/足球.png" />
                          </div>
                          <div :class="{'active': index==setstudentVideoIndex}">
                            <div><span>{{item.time}}</span></div>
                            <div><span>{{item.name}}</span></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
               </mu-load-more>
          </mu-paper>
          <mu-paper :z-depth="1" class="demo-loadmore-wrap list"  v-else  ref="scroll">
              <mu-load-more
                @refresh="refresh(false)"
                :refreshing="refreshing"
                @load="load(false)"
                :loaded-all="isLoaded"
              >
              <ul class="routerIndexOne" >
                <li v-for="(item,index) in listCoach " :key="index">
                  <div class="list-item" data-type="0">
                    <div @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip(item, index)" class="scrollButton">
                      <div class="footballImg"><img src="../../assets/img/足球.png" /></div>
                      <div :class="{'active': index==setVideoIndex}">
                        <div><span>{{item.time}}</span></div>
                        <div><span>{{item.name}}</span></div>
                      </div>
                    </div>
                    <div class="deleteButton" @click="deleteVideo(item)">
                      <i><img src="../../assets/img/删除.png" alt /></i>
                    </div>
                  </div>
                </li>
              </ul>
              </mu-load-more>
          </mu-paper> 
        </div>
      </div>
      <div class="exercise_rightVideo">
        <exercise-coach
          :htmlUrl="htmlUrl"
          :videoImge="videoImge"
          :setIndex="setIndex"
          :setVideoIndex="setVideoIndex"
          :videoUrl="videoUrl"
          @changeisGrade="changeisGrade"
          @changeStudentVideo="changeStudentVideo"
          ref="childObj"
          @changeTitle="changeTitle"
          @setVideoNameList="setVideoNameList"
        ></exercise-coach>
      </div>
    </div>
    <div class="uploadVideo" v-if="isuploadVideo">
      <header>上传练习<span><img src="../../assets/img/orderDetailClose.png" @click="isuploadVideo = false" /></span></header>
      <div class="upoloadMaian">
        <div class="updata" v-for="(item, index) in classVideo" :key="item.video" ref="file">
          <span>练习上传:</span>
          <img src="../../assets/img/上传拷贝.png" alt @click="changefile(item, index)" />
          <input type="file" accept="video/*" @change="uploadfile($event, item)" name="fileTrans" class="Updata"  value mutiple="mutiple"/>上传
          <span style="margin-left:.05rem">{{item.name}}</span>
        </div>
      </div>
      <yd-progressbar
        v-if="isprogressbar"
        stroke-width="10"
        stroke-color="#282828"
        trail-color="#a9cdff"
        :progress="progress3"
        trail-width="10"
      >
        <yd-countup :endnum="progress3 * 100" :duration="1" suffix="%">{{progress3 * 100}}%</yd-countup>
      </yd-progressbar>
      <span class="submitButton" @click="uploadvideo(0)">确定上传</span>
    </div>
  </div>
</template>
<script>
import headerTitle from "../../components/header";
import exerciseCoach from './coach'
import store from "../../store/index";
import { formatDate } from "../../assets/js/date.js";
  
export default {
  name: "exercise",
  components: { headerTitle, exerciseCoach },
  filters: {
    //时间转换
  },
  data() {
    return {
      headerTitle: "练习",
      progress3: 0.3,
      isGrade: true,
      date: "",
      videoUrl: "",
      htmlUrl: "",
      course: "",
      routerIndex: 1,
      startX: 0,
      file: "",
      endX: 0,
      setIndex: 0,
      setVideoIndex: 0,
      setstudentVideoIndex: 0,
      isuploadVideo: false,
      listCoach: [ ],//教练
      listSelf:[
        {
          'time':'2018--11-01',
          'name':'足球卡萨丁'
        },
        {
          'time':'2018--11-01',
          'name':'足球卡萨丁'
        },
        {
          'time':'2018--11-01',
          'name':'足球卡萨丁'
        }
      ],//个人
      leftList: [],
      StudentName: "",
      isUpload: true, //是否显示上传按钮
      courseId: "",
      courseName: "",
      searchData: [],
      citys: [{ name: "啊哈" }],
      videoImge: {},
      isprogressbar: false,
      refreshing:false,
      number:1,
      isLoaded:false,
      min_date:new Date(),
      classVideo: [],//视频上传列表
      classVideoList: [],
      index: 0,
      flag: true
    };
  },
  methods: {
    /**@name 子页面切换 */
    //不记录当前跳转路由，直接返回父级的上一层
    goexerciseCoach() {
      console.log()
      this.$refs.scroll.scrollTop = 0
      // document.documentElement.scrollTop = document.body.scrollTop = 0;
      this.number = 1
      this.isLoaded = false
      this.routerIndex = 1;
      this.$refs.childObj.getuploadvideoList(1, true);
    },
    goexerciseGrade() {
      this.$refs.scroll.scrollTop = 0
      this.number = 1
      this.isLoaded = false
      this.routerIndex = 2;
      this.$refs.childObj.getuploadvideoList(1, false);
    },
    /**@name教练视频页面左滑删除 */
    //滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd(e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement;
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      // 左滑
      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        parentElement.dataset.type = 1;
      }
      // 右滑
      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide();
        parentElement.dataset.type = 0;
      }
      this.startX = 0;
      this.endX = 0;
    },
    //判断当前是否有滑块处于滑动状态还是点击状态
    skip(item, index) {
      if (this.checkSlide()) {
        this.restSlide();
      } else {
        console.log(item);
        this.setVideoIndex = index;
        // this.courseId = item.id
        // this.courseName = item.name
        this.$refs.childObj.getVideoListData(item);
      }
    },
    //删除视频
    deleteVideo(item) {
      this.$loading("");
      this.$http.delete(this.$conf.env.getSeleVideoList + item.id + "/").then(res => {
          this.$loading.close();
          this.$toast.center("删除成功");
          this.number = 1
          this.isLoaded = false
          this.$refs.childObj.getuploadvideoList(1);
          console.log(res);
        })
        .catch(err => {
          this.$loading.close();
          this.$toast.center("服务器错误");
        });
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll(".list-item");
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true;
        }
      }
      return false;
    },
    //复位滑动状态
    restSlide() {
      let listItems = document.querySelectorAll(".list-item");
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
      }
    },
    /**@name使用input上传视频 */
    changefile(item, index) {
      document.getElementsByClassName('Updata')[index].dispatchEvent(new MouseEvent("click"));
    },
    uploadfile(ev, item) {
      if(ev.target.files[0].size/1024/1024 > 20){
        this.$toast.center("视频文件过大");
      }else{
       this.$toast.center("上传成功")
        var Obj ={
          'video':item.video,
          'file': ev.target.files[0]
        }
        this.classVideoList.push(Obj)
      }
      
    },
    uploadvideo(index) {
      if(this.classVideoList.length == 0){
        this.$toast.center("您还没有选择上传文件")
      }else{
        this.progress3 = (1/this.classVideoList.length) * (index + 1);
        var vm = this;
        this.isprogressbar = true;
        let params = new FormData();
            params.append("file", this.classVideoList[index].file);
            params.append("video", this.classVideoList[index].video);
            this.$http.post(this.$conf.env.uploadvideo, params, true)
            .then(res => {
              if(this.classVideoList[index +1 ]){
                this.progress3 += (1/this.classVideoList.length) * (index + 1);
                return this.uploadvideo(index + 1)
              }
              if(this.progress3 == 1){
                setTimeout(() => {
                  vm.isprogressbar = false;
                  vm.$toast.center("提交成功");
              })
              }
            }).catch(err => {
            console.log(err);
            if (err.response.status == "400") {
              vm.isprogressbar = false;
              this.$toast.center(err.response.data[0]);
            } else {
              this.$toast.center("服务器错误");
            }
          });
        }
    },
    upload(params){
      debugger;
      this.$http.post(this.$conf.env.uploadvideo, params, true).then(res => {
        // this.uploadvideo()
        this.uploadvideo()
        debugger;
      })
    },
    showUpdata(data) {
      this.isuploadVideo = true;
      this.getclassVideo()
    },
    getclassVideo(){
      this.$http.get(this.$conf.env.getClassVideo).then( res =>{
        this.classVideo = res.data
        // console.log(this.classVideo)
      }).catch(err =>{
        this.$toast.center('服务器错误');
      })
    },
    getformatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    /**@name班级相关 */
    //修改左边标题
    changeTitle(data) {
      this.leftList = data;
    },
    //切换班级列表
    activeList(item, index) {
      this.setIndex = index;
      console.log(this.setIndex, item);
      this.$refs.childObj.getExerciseListData({ item: item, index: index });
    },
    //班级视频详情
    changeStudentVideo(data) {
      this.isGrade = false;
      this.isUpload = false;
      this.list = data.data;
      this.StudentName = data.name;
      this.setstudentVideoIndex = 0;
      this.$router.push({ name: "exerciseCoach", params: { data: data.data } });
    },
    //切换视频详情
    changeStatusVideoTitle(item, index) {
      this.setstudentVideoIndex = index;

      this.$refs.childObj.getVideoListData(item);
    },
    /**@name视频相关 */
    setVideoNameList(data) {
      if(!data.flag){
        this.isLoaded = true
         this.listCoach = this.list
      }
        this.listCoach = data.data;
     
    },
    changeisGrade() {
      this.isGrade = true;
    },
    change(data) {
      this.courseName = data.name + "教程";
      this.courseId = data.id;
    },
    refresh(flag) {
      this.refreshing = false;
      this.number = 1
      this.$refs.container.scrollTop = 0;
       this.isLoaded = false
      console.log("上拉刷新")
      this.$refs.childObj.getuploadvideoList(1,flag);
    },
    // refreshDetail() {
    //   this.refreshingDetail = false;
    //   this.numberDetail = 1
    //   this.$refs.containerDetail.scrollTop = 0;
    //    this.isLoadedDetail = false
    //   console.log("上拉刷新")
    //   this.$refs.childObj.getuploadvideoList(1);
    //   //  this.$emit('getClassList', 1 )
    // },
    load(flag) {
      console.log('加载')
      this.number += 1
      // this.loading = true;
      this.$refs.childObj.getuploadvideoList(this.number, flag);
    }
  },

  watch: {
    isUpload(newData, oldData) {
      if (newData) {
      }
    }
  },
  mounted() {
  }
};
</script>
<style lang="scss">
.exercise_router_page {
  width: 100%;
  height: 100%;
  position: relative;
  .exprcise_main {
    height: calc(100% - 0.64rem);
    width: 100%;
    background: url(../../assets/img/bj1.png) 0 0 / 100% 100%;
    .exprcise_sidebar {
      background: rgba(29, 52, 84, 1);
      box-shadow: 2px 0px 2px 0px rgba(0, 0, 0, 0.26);
      height: 100%;
      float: left;
      width: 2.73rem;
      padding-top: 0.1rem;
      .sidebar_title {
        height: 0.53rem;
        width: 100%;
        display: flex;
        background: rgba(23, 40, 65, 1);
        span {
          flex: 1;
          text-align: center;
          line-height: 0.53rem;
          font-size: 0.2rem;
          font-family: SimHei;
          font-weight: bold;
          color: #87afd3;
        }
        .activeButton {
          background: linear-gradient(
            0deg,
            rgba(50, 104, 148, 1) 0%,
            rgba(22, 38, 63, 1) 100%
          );
          color: #ffffff;
        }
      }
      .routerIndexOne {
        overflow-y: scroll;
        height: 100%;
        padding: 0 0.14rem 0 0.04rem;
        overflow: hidden;
        li {
          width: 100%;
          height: 1.05rem;
          background: url(../../assets/img/border.png) repeat-x bottom;
          .scrollButton {
            display: flex;
            align-items: center;
            height: 1.05rem;

            .footballImg {
              width: 0.69rem;
              height: 1.05rem;
              img {
                width: 0.36rem;
                height: 0.34rem;
                margin: 0.15rem auto;
                display: block;
              }
            }
            div {
              span {
                font-family: SimHei;
                color: #fff;
                font-size: 0.24rem;
              }
            }
          }
        }
      }
      .routerIndexTwo {
        padding-top: 0.14rem;
        li {
          font-size: 0.21rem;
          color: #6f91b4;
          line-height: 0.8rem;
          padding: 0 0 0 0.23rem;
          span {
            display: block;
            height: 100%;
            border-bottom: 1px solid #2e4564;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .active {
          background: #607a9f;
          color: #fefefe;
          span {
            border: 0;
          }
        }
      }
      .list-item {
        position: relative;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        .scrollButton {
          /* padding: 0.2rem; */
          margin-left: 0.04rem;
          margin-right: 0.14rem;
          display: flex;
          align-items: center;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          justify-content: flex-start;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        .deleteButton {
          width: 0.5rem;
          height: 1.02rem;
          background: rgba(29, 52, 84, 1);
          font-size: 0.373333rem;
          color: #fff;
          text-align: center;
          line-height: 1.02rem;
          position: absolute;
          top: 0;
          right: -0.504rem;
          img {
            height: 0.24rem;
          }
        }
        
      }
      .list-item[data-type="0"] {
        transform: translate3d(0, 0, 0);
      }
      .list-item[data-type="1"] {
        transform: translate3d(-0.5rem, 0, 0);
      }
    }
    .active {
          div {
            span {
              color: #5ce6ff !important;
            }
          }
        }
    .exercise_rightVideo {
      float: left;
      width: calc(100% - 2.73rem);
      height: 100%;
      padding: 0.16rem 0.11rem;
    }
  }
  .uploadVideo {
    position: absolute;
    width: 8.18rem;
    height: 4.05rem;
    background: url(../../assets/img/tkbj.png) 0 0 / 100% 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    .yd-progressbar {
      position: absolute;
      color: #333;
      width: 1.86rem;
      height: 1.86rem;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
    .yd-progressbar-content {
      color: #a9cdff;
    }
    header {
      padding-top: 0.13rem;
      width: 100%;
      text-align: center;
      text-shadow: 0 0 0.1rem #90ffbf;
      color: #90ffbf;
      font-size: 0.26rem;
      font-family: SimHei;
      padding-left: 0.35rem;
      padding-right: 0.14rem;
      span {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        float: right;
        margin-top: -0.02rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .upoloadMaian {
      font-size: 0.2rem;
      font-family: SimHei;
      margin: 0.52rem .2rem 0 0.82rem;
      height: 2.08rem;
      overflow: hidden;
      overflow-y: scroll;
      div {
        margin-bottom: 0.13rem;
      }
      .search {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        div {
          margin: 0;
          min-height: inherit;
        }
      }
      .Time {
        overflow: hidden;
        span {
          float: left;
          display: block;
          line-height: 0.55rem;
        }
        div {
          width: 5.08rem;
          height: 0.41rem;
          float: left;
          background: none;
          max-width: fit-content;
          padding: 0;
          margin: 0;
          min-height: auto;
          margin-top: 0.02rem;
        }
      }
      .updata {
        font-size: 0.18rem;
        line-height: 0.42rem;
        color: #2fe2cb;
        display: flex;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        span {
          line-height: 0.42rem;
          display: block;
          float: left;
        }
        input {
          display: none;
        }
        img {
          height: 0.42rem;
          width: 0.38rem;
          margin-right: 0.11rem;
          margin-left: 0.13rem;
        }
      }
      span {
        color: #acc2e2;
        margin-right: 0.14rem;
      }
      input {
        background: #1a355c;
        color: #4a6381;
        border: 0;
        border: 1px solid #31537a;
        width: 5.08rem;
        padding-left: 0.14rem;
        height: 0.41rem;
        font-size: 0.2rem;
      }
      input:focus {
        outline: none;
        box-shadow: none;
      }
    }
    .submitButton {
      font-family: SimHei;
      display: block;
      float: none;
      width: 3.11rem;
      height: 0.73rem;
      background: url(../../assets/img/ok.png) 0 0 / 100% 100%;
      font-size: 0.27rem !important;
      color: #ffffff !important;
      text-align: center;
      line-height: 0.73rem;
      border-radius: 0.08rem;
      margin:0 auto;
    }
  }
  .mu-input-line,
  .mu-input-focus-line.focus,
  .mu-select-action {
    display: none;
  }
  .mu-select-content,
  .mu-input-content {
    margin: 0;
  }
}
.mu-popover.transition-bottom {
  left: 474.5px !important;
}
.mu-paper {
  background: none;
  overflow-y: scroll;
  height: 100%;
}
.mu-paper::-webkit-scrollbar {
                display: none;
            }
</style>
