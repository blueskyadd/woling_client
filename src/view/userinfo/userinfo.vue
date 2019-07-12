<template>
  <div class="web-userinfo-bigbox">
    <headerTitle :title="headerTitle" :editForm="true" @editFormdata="editForm" />
    <div class="web-userinfo-menu">
      <div class="web-userinfo-left">
        <div class="userinfo">
          <span>个人主页</span>
          <span>社交</span>
        </div>
      </div>
      <div class="web-user-contnet">
        <div class="web-userinfo-words">
          <div class="user-header-box">
            <div class="user-header">
              <div class="user-headerImg-box">
                <div class="user-head-bg"></div>
                <div class="user-head"><img :src="user.picture" alt /></div>
              </div>
              <div class="userinfo-nama-box">
                <div class="userinfo-name"><span>{{user.name}}</span></div>
                <div class="userinfo-iphone-box"><span class="iphone-tit"></span></div>
              </div>
            </div>
          </div>
          <div class="web-userinfo-jjBox">
            <div class="web-userinfo-wordsBox">
              <div class="UPbox">
                <div class="UserS">
                  <ul>
                    <li><p>{{user.see_minutes}}</p><p>看赛事时长</p></li>
                    <li><p>{{user.threat_num}}</p><p>挑战</p></li>
                    <li><p>{{user.class_num}}</p><p>课程</p></li>
                    <li><p>{{user.video_num}}</p><p>上传视频</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="show-put">
                <div class="user-sheng"><img src="../../assets/img/daka.png" alt /><p>生涯</p></div>
                <div class="user-daka"><span>{{user.sign}}</span><p style="    margin-top: -.04rem;">打卡次数</p></div>
              </div>
            </div>
          </div>
          <div class="FK">
            <span>最近访客></span>
            <ul><li></li><li></li><li></li></ul>
          </div>
        </div>
        <!--球星展示-->
        <div class="football-prohoto-box">
          <div class="footballStar-prohoto">
            <img src="../../assets/img/football-star.png" alt />
          </div>
          <div class="change_footballStar">
            <span>换球星</span>
          </div>
        </div>
      </div>
    </div>
    <popup-detail ref="userDetail"  :detailName='detailName'>
      <template >
        <div class="userDetail">
          <div><label for="">姓名:</label><input  placeholder="点击输入您的姓名" type="text"></div>
          <div><label for="">手机号:</label><input placeholder="点击输入您的手机号" type="text"></div>
          <div><label for="">监护人:</label><input placeholder="点击输入监护人姓名" type="text"></div>
          <div><label for="">手机号:</label><input placeholder="点击输入监护人手机号" type="text"></div>
          <div><label for="">学籍号:</label><input placeholder="点击输入您的学籍号" type="text"></div>
          <div><label for="">学校:</label><input placeholder="点击输入所在学校" type="text"></div>
          <div><label for="">家庭住址:</label><input placeholder="点击输入家庭住址" type="text"></div>
        </div>
        <span class="submitButton">确定</span>
      </template>
    </popup-detail>
  </div>
</template>
<script>
import headerTitle from "../../components/header";
import popupDetail from "../../components/popUpDetail"
export default {
  name: "userinfo",
  components: { headerTitle, popupDetail },
  data() {
    return {
      userIphont: 16625487452,
      headerTitle: "个人主页",
      detailName: '更改个人信息',
      user: {}
    };
  },
  methods: {
    editForm() {
      this.$refs.userDetail.isDetail = !this.$refs.userDetail.isDetail
    },
    GetUserInfo() {
      this.$http.get(this.$conf.env.userinfo).then(res => {
          this.$loading.close();
          this.user = res.data;
        })
        .catch(err => {
          this.$loading.close();
          this.$toast.center("网络错误");
        });
    }
  },
  created() {
    this.$loading("");
    this.GetUserInfo();
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.web-userinfo-bigbox {
  background: url(../../assets/img/bj1.png) 0 0 / 100% 100%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .web-userinfo-topBox {
    width: 100%;
    height: 0.64rem;
    background: linear-gradient(
      0deg,
      rgba(22, 37, 68, 1) 0%,
      rgba(57, 87, 139, 1) 100%
    );
    overflow: hidden;

    .web-userinfo-back {
      height: 100%;
      float: left;
      a {
        width: 100%;
        height: 100%;
        display: block;
        img {
          display: block;
          width: 2.08rem;
          height: 100%;
        }
      }
    }
    .web-userinfo-tit {
      float: left;
      p {
        font-size: 0.34rem;
        font-family: SimHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 0.92rem;
      }
    }
  }
  .web-userinfo-menu {
    flex: 1;
    display: flex;

    .web-userinfo-left {
      width: 1.4rem;
      height: 100%;
      background: rgba(29, 52, 84, 1);
      box-shadow: 2px 0px 2px 0px rgba(0, 0, 0, 0.26);
      .userinfo {
        width: 100%;
        height: 0.8rem;
        background: rgba(96, 122, 159, 1);
        margin-top: 0.14rem;
        padding: 0 0.21rem;
        box-sizing: border-box;
        span {
          font-size: 0.24rem;
          font-family: SimHei;
          color: rgba(254, 254, 254, 1);
          line-height: 0.8rem;
          display: block;
          text-align: center;
          border-bottom: 1px solid #2e4564;
        }
      }
    }
    .web-user-contnet {
      flex: 1;
      background: url("../../assets/img/bj1.png") 0 0 / 100% 100%;
      background-size: cover;
      display: flex;
      justify-content: space-between;
      .web-userinfo-words {
        width: 7.4rem;
        height: 100%;
        .user-header-box {
          width: 7.24rem;
          height: 1.98rem;
          margin-top: 0.1rem;
          margin-left: 0.16rem;
          background: linear-gradient(
            0deg,
            rgba(57, 110, 162, 1) 0%,
            rgba(18, 41, 72, 0) 100%
          );
          border-radius: 4px;
          padding: 0.62rem 0 0.26rem 0.08rem;
          box-sizing: border-box;
          .user-header {
            width: 100%;
            height: 100%;
            display: flex;
            .user-headerImg-box {
              width: 1.36rem;
              height: 1.3rem;
              position: relative;
              .user-head-bg {
                width: 100%;
                height: 100%;
                background: url("../../assets/img/headk.png") no-repeat;
                background-size: cover;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 9;
              }
              .user-head {
                width: 86%;
                height: 90%;
                position: absolute;
                left: 0.1rem;
                top: 0.04rem;
                z-index: 6;
                img {
                  width: 100%;
                  height: 100%;
                  display: block;
                }
              }
            }
            .userinfo-nama-box {
              display: flex;
              flex-direction: column;
              .userinfo-name {
                margin-bottom: 0.28rem;
                span {
                  font-size: 0.32rem;
                  font-family: SimHei;
                  font-weight: bold;
                  color: rgba(255, 255, 255, 1);
                  display: block;
                }
              }
              .userinfo-iphone-box {
                display: flex;
                align-items: center;
                span {
                  font-size: 0.2rem;
                  font-family: SimHei;
                  color: rgba(255, 255, 255, 1);
                }
                input {
                  font-size: 0.2rem;
                  font-family: SimHei;
                  color: rgba(255, 255, 255, 1);
                  outline: none;
                  border: 0;
                  background: transparent;
                  display: block;
                  width: 1.6rem;
                }
                .change-iphone {
                  width: 0.2rem;
                  height: 0.2rem;
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
        .web-userinfo-jjBox {
          width: 6.96rem;
          height: 3.89rem;
          margin-left: 0.3rem;
          background: linear-gradient(
            0deg,
            rgba(11, 27, 51, 1) 0%,
            rgba(30, 61, 93, 1) 100%
          );
          opacity: 0.8;
          .web-userinfo-wordsBox {
            width: 100%;
            height: 100%;
            padding: 0 0.54rem 0 0.26rem;
            box-sizing: border-box;
            .web-userinfo-wordTit {
              font-size: 0.2rem;
              font-family: SimHei;
              color: rgba(255, 255, 255, 1);
              line-height: 0.72rem;
            }
            .web-usserinfo-wordContent {
              width: 100%;
              height: 1.44rem;
              padding-bottom: 0.34rem;
              overflow: hidden;
              background: url(../../assets/img/border.png) repeat-x bottom;
              p {
                font-size: 0.16rem;
                font-family: SimHei;
                color: rgba(184, 207, 238, 1);
                line-height: 0.28rem;
                text-indent: 0.28rem;
                width: 100%;
                height: 100%;
                overflow: auto;
              }
            }
            .show-put {
              width: 100%;
              height: 1.5rem;
              display: flex;
              align-items: center;
              padding-left: 0.34rem;
              box-sizing: border-box;
              .user-sheng {
                text-align: center;
                margin-right: 0.2rem;
                img {
                  width: 0.36rem;
                  height: 0.36rem;
                  display: block;
                  margin: 0 auto;
                }
                p {
                  margin-top: 7px;
                  font-size: 0.16rem;
                  font-family: SimHei;
                  color: rgba(184, 207, 238, 1);
                }
              }
              .user-daka {
                text-align: center;
              }
              span {
                font-size: 0.36rem;
                font-family: SimHei;
                color: rgba(184, 207, 238, 1);
                display: block;
              }
              p {
                margin-top: 5px;
                font-size: 0.16rem;
                font-family: SimHei;
                color: rgba(184, 207, 238, 1);
              }
            }
            .UPbox {
              width: 100%;
              height: 1.66rem;
              padding: 0.37rem 0.32rem 0 0.34rem;
              box-sizing: border-box;
              margin-bottom: 0.7rem;
              .UserS {
                width: 100%;
                height: 100%;
                border-bottom: 1px solid #254260;
                padding-bottom: 0.56rem;
                box-sizing: border-box;
                ul {
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-wrap: nowrap;
                  li {
                    width: 24.9%;
                    border-right: 1px solid #254260;
                    &:last-child {
                      border-right: 0;
                    }
                    p {
                      color: #b8cfee;
                      white-space: nowrap;
                      text-align: center;
                      &:first-child {
                        font-size: 0.36rem;
                        line-height: 0.5rem;
                        font-family: SimHei;
                      }
                      &:last-child {
                        font-size: 0.16rem;
                        line-height: 0.34rem;
                        font-family: SimHei;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .FK {
          display: flex;
          height: 1rem;
          width: 100%;
          align-items: center;
          padding-left: 0.29rem;
          box-sizing: border-box;
          span {
            font-size: 0.18rem;
            font-family: SimHei;
            color: rgba(184, 207, 238, 1);
          }
          ul {
            display: flex;
            margin-left: 0.1rem;
            li {
              width: 0.36rem;
              height: 0.36rem;
              background: red;
              border-radius: 50%;
              margin: 0 0.04rem;
            }
          }
        }
      }
      /*球星展示*/
      .football-prohoto-box {
        width: 4.49rem;
        height: 100%;
        .footballStar-prohoto {
          width: 100%;
          height: 100%;
          position: relative;
          img {
            width: 100%;
            height: 90%;
            display: block;
            position: absolute;
            bottom: 0.24rem;
          }
        }
        .change_footballStar {
          width: 0.68rem;
          height: 0.68rem;
          background: url("../../assets/img/zuqiu.png") no-repeat;
          background-size: cover;
          position: absolute;
          right: 0.32rem;
          bottom: 0.4rem;
          span {
            font-size: 0.22rem;
            font-family: SimHei;
            color: rgba(201, 235, 247, 1);
            text-stroke: 1px undefined;
            display: block;
            white-space: nowrap;
            position: absolute;
            bottom: -0.08rem;
          }
        }
      }
    }
  }
  .userDetail{
      display: flex;
      flex-wrap: wrap;
      padding: 0.69rem .82rem 0 .55rem;
      justify-content: space-between;
      margin-bottom: .74rem;
      div{
        width: 4.32rem;
        display: flex;
        justify-content: flex-end;
        height: .41rem;
        margin-bottom: .2rem;
        align-items: center;
        label{
          font-family:SimHei;
          font-weight:400;
          color:rgba(160,188,223,1);
          font-size: .2rem;
          margin-right: .14rem;
        }
        input{
          width: 2.95rem;
          height: 100%;
          background:rgba(24,41,66,1);
          border:1px solid rgba(49,83,122,1);
          color: #fff;
          border-radius:2px;
          font-family:SimHei;
          font-weight:400;
          color:rgba(74,99,129,1);
          font-size: .2rem;
          padding-left: .15rem;
        }
        input::placeholder{
          color:rgba(74,99,129,1);
        }
    }
    div:last-child{
      width: 100%;
      input{
        width: 8.45rem;
      }
    }

  }
}
</style>
