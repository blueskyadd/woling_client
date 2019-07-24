<template>
  <div class="course_courseDetail">
    <headerTitle :title="headerTitle" :isUpload="false" :isLocation="false" />
    <div class="main">
      <mu-paper :z-depth="1" class="demo-loadmore-wrap list"   ref="scroll">
        <mu-load-more
          @refresh="refresh()"
          :refreshing="refreshing"
          @load="load()"
          :loaded-all="isLoaded"
        >
          <ul>
            <li v-for="(val,index) in ClassList" :key="index">
              <div class="mainLeft_img">
                <img class="weather" :src="val.weather.day_weather_pic" alt />
                <div class="mainRight">
                  <img class="mainRight_img" src="../../assets/img/selfImg.jpg" alt />
                  <div class="mainRight_text">
                    <h3>{{titleName}}</h3>
                    <div>
                      <span>主教练:</span>
                      <p>{{val.coach}}</p>
                      <span>副教练:</span>
                      <p>{{val.assistant_coach}}</p>
                    </div>
                    <div class="classTime">
                      <span>上课时间:</span>
                      <p>{{val.start_time}}</p>
                      <span>上课时间:</span>
                      <p>{{val.end_time}}</p>
                    </div>
                    <div class="classUp">
                      <span>上课地址:</span>
                      <p>{{val.province}} {{val.city}} {{val.area}} {{val.address}}</p>
                    </div>
                    <div class="UpClass" :class="val.status === '正常上课'?'':'active'">
                      <img src="../../assets/img/gre.png" alt v-if="val.status === '正常上课'" />
                      <img src="../../assets/img/red.png" alt v-else />
                      <div>{{val.status}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          </mu-load-more>
        </mu-paper>
    </div>
  </div>
</template>
<script>
import headerTitle from "../../components/header";
import mianList from "../../components/mainList";
export default {
  name: "courtseDetail",
  components: { headerTitle, mianList },
  data() {
    return {
      headerTitle: "课表",
      ClassList: [],
      refreshing: false,
      titleName: this.$route.params.titleName,
      refreshing:  false,
      number:1,
      isLoaded:false,
    };
  },
  mounted() {
    //      this.$loading('');
    console.log(this.$route.params);
    this.getCourseDetail(1);
  },
  methods: {
    refresh(flag) {
        this.refreshing = false;
        this.number = 1
        this.isLoaded = false
        console.log("上拉刷新")
        this.getCourseDetail(1);
    },
    load(flag) {
      console.log('加载')
      this.number += 1
      // this.loading = true;
      this.getCourseDetail(this.number);
    },
    getCourseDetail(num) {
      var url = num == 1 ? this.$route.params.id : this.$route.params.id + '&p=' + num
      this.$http.get(this.$conf.env.getCourseDetail + url ).then(res => {
          this.$loading.close();
          this.refreshing = false;
          if (!res.data.next ) {
            if(res.data.results.length == 0 || res.data.results.length ==  res.data.count/this.number){
              this.number ==1?this.$toast.center('暂无数据') :this.$toast.center('已加载全部数据')
            }else if(res.data.results.length > 0 && res.data.results.length < res.data.count/this.number && this.number !=  1){
              this.$toast.center('已加载全部数据')
            }
            this.isLoaded = true
          } else {
            this.isLoaded = false
            num == 1? (this.ClassList = res.data.results) : (this.ClassList = this.ClassList.concat(res.data.results));
            this.ClassList[0].status = "取消上课";
          }
        })
        .catch(err => {
          this.isLoaded = true
          // this.refreshing = false;
          this.$loading.close();
           this.$toast.center('服务器错误');
          // this.loading = false
        });
    }
  }
};
</script>
<style lang="scss">
.course_courseDetail {
  width: 100%;
  height: 100%;
  background: url(../../assets/img/bj1.png) 0 0 / 100% 100%;
  .main {
    margin: 0.18rem;
    height: calc(100% - 1rem);
    width: calc(100% - 0.36rem);
    background: rgba(35, 65, 101, 0.5);
    border-radius: 0.05rem;
    padding: 0.13rem 0.05rem 0.13rem 0.19rem;
    overflow-y: scroll;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 49%;
        height: 1.48rem;
        background: orange;
        margin-right: 0.14rem;
        margin-bottom: 0.1rem;
        border-radius: 0.05rem;
        background: #271948 url(../../assets/img/selfBg.png) 0 0 / 100% 100%;
        padding: 0.15rem 0.14rem;
        .weather {
          width: 0.4rem;
          height: 0.4rem;
          border-radius: 0.04rem;
          float: right;
          position: absolute;
          right: 0;
        }
        .mainLeft_img {
          position: relative;
          width: 100%;
          height: 100%;

          .mainRight {
            height: 100%;
            width: 100%;
            float: left;
            // width: calc(100% - 1.21rem);
            padding-left: 0.13rem;
            display: flex;
            justify-content: flex-start;
            .mainRight_img {
              width: 1.21rem !important;
              height: 1.2rem !important;
              margin-right: 0.14rem;
            }
            .mainRight_text {
              h3 {
                font-size: 0.23rem;
                color: #dcf0f2;
                line-height: 0.4rem;
                font-family: SimHei;
                width: 100%;
                overflow: hidden;
                height: 0.36rem;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              div {
                font-size: 0.18rem;
                color: #7da1cd;
                line-height: 0.3rem;
                font-family: SimHei;
                display: flex;
                span {
                  display: block;
                  float: left;
                  margin-right: 0.1rem;
                  white-space: nowrap;
                }
                p {
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  width: 1.04rem;
                  float: left;
                  overflow: hidden;
                  margin-right: 0.09rem;
                }
              }
            }
            .classTime {
              p {
                width: auto;
              }
            }
            .classUp {
              p {
                    width: 2rem!important;
              }
            }
            .UpClass {
              display: flex;
              position: absolute;
              right: 0;
              bottom: 0;
              align-items: center;
              color: #fc1c36;
              div {
                color: #62f875;
                font-size: 0.18rem;
                line-height: 0.1rem;
              }
              img {
                width: 0.15rem;
                height: 0.15rem;
                margin-right: 0.06rem;
                border-radius: 0;
              }
              &.active {
                div {
                  color: rgba(252, 28, 54, 1);
                }
              }
            }
          }
        }
      }
    }
  }
  .main::-webkit-scrollbar {
    display: none;
  }
}
</style>
