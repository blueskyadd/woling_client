
<template>
    <div class="achievement_index">
        <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='false'/>
        <div class="main">
          <!-- 侧边栏 -->
          <aside>
            <div class="TabSel" v-if="setTabtitle">
                <div class="News" @click="SelectNes = 0" :class="SelectNes === 0 ? 'active':''">最新</div>
                <div class="history" @click="SelectNes = 1, getAbilityTime()" :class="SelectNes === 1 ? 'active':''">历史</div>
            </div>
            <div class="TabSel" v-else>
              <div class="News active detailTime" > <span @click="gobackAchievementIndex"></span>{{detailTime}}</div>
            </div>
            <div class="NewsBox" v-show ="SelectNes == 0 ">
              <div>
                <div class="imageBoxTit">位置与综合评价</div>
                <div style="margin:0 auto">
                  <canvas id="c1" style="width:170px;height:150px;"></canvas>
                </div>
              </div>
              <div>
                <div class="imageBoxTit">综合评价</div>
                <div class="textarea">{{achievementDetail.comment}}</div>
                <div class="bottomImg" >
                  <img src="../../assets/img/achievementBottomImg.png" alt="">
                </div>
              </div>
            </div>
            <div class="historyBox" v-show ="SelectNes == 1 ">
              <ul>
                <li v-for="(item, index) in historyLeftList" @click="changeHistoryData(item,index)" :class="{activly: index == setIndex}" :key="item.id">
                  <p>{{item.create_time}}</p>
                </li>
              </ul>
            </div>
          </aside>
          <!-- 主体 -->
          <section>
            <div>
              <div class="header">
                <img src="../../assets/img/football.png" alt=""><span>运动能力</span>
              </div>
              <ul>
                <li><span>强身健体</span><rater v-model="achievementDetail.strong" active-color='#01D2EC' color="red" :font-size='20' disabled></rater></li>
                <li><span>速度</span><rater v-model="achievementDetail.speed" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>动作频率</span><rater v-model="achievementDetail.hz" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>耐力</span><rater v-model="achievementDetail.endurance" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>爆发力</span><rater v-model="achievementDetail.power" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>协调性</span><rater v-model="achievementDetail.harmony" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>灵活</span><rater v-model="achievementDetail.agility" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>平衡</span><rater v-model="achievementDetail.balance" active-color='#01D2EC' :font-size='20' disabled></rater></li>
              </ul>
            </div>
            <div>
              <div class="header">
                <img src="../../assets/img/foot.png" alt=""><span>技术能力</span>
              </div>
              <ul>
                <li><span>压力控球</span><rater v-model="achievementDetail.trap " active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>第一触球</span><rater v-model="achievementDetail.first_touch" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>短传</span><rater v-model="achievementDetail.short_pass" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>长传</span><rater v-model="achievementDetail.long_pass" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>盘带</span><rater v-model="achievementDetail.taping" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>1v1进攻</span><rater v-model="achievementDetail.attack" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>1v1防守</span><rater v-model="achievementDetail.defense" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>铲球上抢</span><rater v-model="achievementDetail.tackle" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>头球</span><rater v-model="achievementDetail.header" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>逆足</span><rater v-model="achievementDetail.inverse" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>远射</span><rater v-model="achievementDetail.long_shot" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>定位球</span><rater v-model="achievementDetail.place_kick" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>射门</span><rater v-model="achievementDetail.shoot" active-color='#01D2EC' :font-size='20'  disabled></rater></li>
                <li><span>转身技术</span><rater v-model="achievementDetail.turn_back" active-color='#01D2EC' :font-size='20'  disabled></rater></li>
              </ul>
            </div>
            <div>
              <div class="header">
                <img src="../../assets/img/football.png" alt=""><span>战术意识能力</span>
              </div>
              <ul>
                <li><span>组织能力</span><rater v-model="achievementDetail.organizing_ability" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>位置感</span><rater v-model="achievementDetail.location" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>提前观察</span><rater v-model="achievementDetail.observe" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>视野</span><rater v-model="achievementDetail.view" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>无球跑动</span><rater v-model="achievementDetail.running" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>阅读比赛</span><rater v-model="achievementDetail.reading" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>攻守转换</span><rater v-model="achievementDetail.transition" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>盯人</span><rater v-model="achievementDetail.marking" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>补位保护</span><rater v-model="achievementDetail.independent" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>决断</span><rater v-model="achievementDetail.resolve" active-color='#01D2EC' :font-size='20' disabled></rater></li>
              </ul>
            </div>
            <div>
              <div class="header">
                <img src="../../assets/img/football.png" alt=""><span>精神属性</span>
              </div>
              <ul>
                <li><span>影响力</span><rater v-model="achievementDetail.influence" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>创造力</span><rater v-model="achievementDetail.creativity" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>战斗精神</span><rater v-model="achievementDetail.fighting" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>压力抵抗</span><rater v-model="achievementDetail.stress_ability" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>团队合作</span><rater v-model="achievementDetail.teamwork" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>专注度</span><rater v-model="achievementDetail.concentration" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>侵略性</span><rater v-model="achievementDetail.aggressive" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>稳定状态</span><rater v-model="achievementDetail.steady" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>体育精神</span><rater v-model="achievementDetail.sportsmanship" active-color='#01D2EC' :font-size='20' disabled></rater></li>
                <li><span>执行力</span><rater v-model="achievementDetail.execution" active-color='#01D2EC' :font-size='20' disabled></rater></li>
              </ul>
            </div>
          </section>

    </div>
  </div>
</template>
  
<script>
import headerTitle from "../../components/header";
import { Rater } from 'vux'
import GM from "g2-mobile";
export default {
  name: "achievement",
  components: { headerTitle, Rater },
  data() {
    return {
      "headerTitle": "成就",
      "SelectNes": 0,
      "Charts": [],
      "historyLeftList":[],
      "setIndex": -1,
      "data":4,
      "achievementDetail":{
        // 运动能力
        "strong": 1,//强身健体
        "speed": 1,//速度
        "hz": 1,//动作频率
        "endurance": 1,//耐力
        "power": 1,//爆发力
        "harmony": 1,//协调性
        "agility": 1,//灵活
        "balance": 1,//平衡
        // 技术能力
        "trap": 1,//压力控球
        "first_touch": 1,//第一触球
        "short_pass": 1,//短传
        "long_pass": 1,//长传
        "taping": 1,//盘带
        "attack": 1,//1v1进攻
        "defense": 1,//1v1防守
        "tackle": 1,//铲球上抢
        "header": 1,//头球
        "inverse": 1,//逆足
        "long_shot": 1,//远射
        "place_kick": 1,//定位球
        "shoot":3,//射门
        "turn_back": 1,//转身技术
        //战术意识能力
        "organizing_ability": 1,//组织能力
        "location": 1,//位置感
        "observe": 1,//提前观察
        "view": 1,//视野
        "running": 1,//无球跑动
        "reading": 1,//阅读比赛
        "transition": 1,//攻守转换
        "marking": 1,//盯人
        "independent": 1,//补位保护
        "resolve": 1,//决断
        //精神属性
        "influence": 1,//影响力
        "creativity": 1,//创造力
        "fighting": 1,//战斗精神
        "stress_ability": 1,//压力抵抗
        "teamwork": 1,//团队合作
        "execution": 1,
        "concentration": 1,
        "aggressive": 1,
        "steady": 1,
        "sportsmanship": 1,
      },
      "setTabtitle": true,
      "detailTime":'',
      "convasData":[
        {name: '张飞',props: '力量', value: 4.5},
        {name: '张飞',props: '速度', value: 4.5},
        {name: '张飞',props: '传球', value: 3.5},
        {name: '张飞',props: '盘带', value: 3.5},
        {name: '张飞',props: '射门', value: 4.5},
        {name: '张飞',props: '防守', value: 5},
        {name: '张飞',props: '意识', value: 5},
        {name: '张飞',props: '精神', value: 2}
      ]
    };
  },
  methods: {
    changeHistoryData(item, index){
      this.setIndex = index
      this.detailTime = item.name;
      this.setTabtitle = false;
      this.SelectNes = 0
      
    },
    getAbilityTime(){
      console.log('aaa')
      this.$http.get(this.$conf.env.getAbilityTime).then( res =>{
        console.log(res)
        if(!res.data || res.data.length == 0){this.$toast.center('暂无历史数据');}
        this.historyLeftList = res.data
      }).catch(err =>{
        this.$toast.center('服务器错误');
      })
    },
    gobackAchievementIndex(){
      this.SelectNes = 1
      this.setTabtitle = true;
      this.convasData=[
        {name: '张飞',props: '力量', value: 0},
        {name: '张飞',props: '速度', value:0},
        {name: '张飞',props: '传球', value: 5},
        {name: '张飞',props: '盘带', value: 5},
        {name: '张飞',props: '射门', value: 5},
        {name: '张飞',props: '防守', value: 5},
        {name: '张飞',props: '意识', value: 5},
        {name: '张飞',props: '精神', value: 5}
      ]
      console.log(this.SelectNes)
      this.setConvas()
    },
    setConvas(){
      GM.Global.pixelRatio =2;
      var chart = new GM.Chart({
        id: 'c1'
      });
      var c = document.getElementById("c1");
      c.strokeStyle ='red'
      chart.coord('polar');
      chart.source( this.convasData, {
        value: {
          min: 0,
          tickInterval: 2
        }
      });
      //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
      chart.axis('props', {
        label: {
          fontSize: 12
        },
        line: null
      });
      chart.axis('value', {
        label: {
          fontSize:0.0001
        }
      });
      chart.area().position('props*value').color('name').style({
        opacity: 0.6
      });
      // x和y轴同时缩放的动画
      chart.animate().scalexy();
      chart.render();
    },
    getAchievement(){
      this.$http.get(this.$conf.env.getAchievement).then( res =>{
        console.log(res)
        this.achievementDetail = res.data
      }).catch(err =>{
        this.toast.center('服务器错误');
      })
    }
  },
  mounted() {
    this.setConvas()
    this.getAchievement()
  }

}
</script>

<style lang="scss" >
 @import "../../assets/style/AllStyle";
      .achievement_index{
        background: url(../../assets/img/bj1.png)  0 0 / 100% 100% ;
        width: 100%;
        height:100%;
        .main{
          width: 100%;
          height: calc(100% - .64rem);
          overflow: hidden;
          display: flex;
          //侧边栏
          aside{
            width:3.54rem;
            height:100%;
            background:linear-gradient(0deg,rgba(16,32,57,1) 0%,rgba(27,46,78,1) 100%);
            .TabSel{
              width: 100%;
              height: .53rem;
              padding-top: .06rem;
              display: flex;
              justify-content: space-between;
              background: linear-gradient(0deg,rgba(16,32,57,1) 0%,rgba(27,46,78,1) 100%);
              align-items: center;
              .News,.history{
                width: 50%;
                height: 100%;
                text-align: center;
                line-height: .53rem;
                font-size:.2rem;
                font-family:SimHei;
                font-weight:bold;
                color:rgba(135,175,211,1);
                &.active{
                  background:linear-gradient(0deg,rgba(50,104,148,1) 0%,rgba(22,38,63,1) 100%);
                  color: #FFFFFF;
                }
              }
            }
            .detailTime{
              width: 100% !important;
              display: flex;
              justify-content: flex-start;
              padding-left: .26rem;
              align-items: center;
              span{
                width: .14rem;
                height: .14rem;
                border-bottom:1px solid #fff;
                border-left:1px solid #fff;
                transform: rotateZ(45deg);
                margin-right: .18rem;
              }
            }
            .NewsBox,.historyBox{
              width: 100%;
              height: calc(100% -  .53rem);
              display: flex;
              flex-direction: column;
              overflow-y: scroll;
              &.active{
                display: none;
              }
            }
            .historyBox{
              ul{
                display: flex;
                flex-direction: column;
                margin-top: .03rem;
                li{
                  height: .6rem;
                  font-size: .2rem;
                  p{
                    margin: 0 .18rem 0 .05rem;
                    height: 100%;
                    line-height: .6rem;
                    color: #a4b7d7;
                    padding-left: .27rem;
                    background: url(../../assets/img/border.png) bottom repeat-x;
                  }
                }
                .activly{
                  background: #182841;
                  p{
                    color: #5be5ff;
                  }
                }
              }
            }
            .NewsBox{
              .imageBoxTit {
                width: 2.85rem;
                height: .76rem;
                margin: .26rem .26rem 0 0;
                background:  url("../../assets/img/tuceng.png") no-repeat;
                background-size:100%;
                font-size:.25rem;
                font-family:SimHei;
                color:rgba(0,228,255,1);
                line-height:.76rem;
                text-indent: .7rem;
              }
              .textarea{
                  width: 3.12rem;
                  height: 1.18rem;
                  background: #0A1426;
                  color:rgba(187,225,230,1);
                  font-family:SimHei;
                  font-size: .2rem;
                  padding: .19rem .13rem;
                  border-radius: .05rem;
                  line-height: .3rem;
                  overflow-y: scroll;
                  margin-bottom: .17rem;
                }
                .textarea::-webkit-scrollbar {
                    display: none;
                }
              .MyCharts{
                width: 3.35rem;
                height: 2.88rem;
                #cl{
                  width: 100%;
                  height: 100%;
                }
              }
              .bottomImg{
                width: 2.23rem;
                height: 2.87rem;
                background: url(../../assets/img/achievementBottomBg.png) 0 0 / 100% 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: .47rem;
                img{
                  width: 40%;
                }
              }
            }
            .NewsBox>div{
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .NewsBox::-webkit-scrollbar{
              display: none;
            }
          }
          //主题
          section{
            margin: .19rem .2rem .11rem;
            background:linear-gradient(0deg,rgba(11,27,51,1) 0%,rgba(30,61,93,1) 100%);
            opacity:0.8;
            border-radius: .05rem;
            width: calc(100% - 3.54rem);
            padding: .19rem .2rem;
            overflow-y: scroll;
            div{
              .header{
                height: .35rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;

              }
              .header>img{
                width: .51rem;
                height: .37rem;
                margin-right: .08rem;
              }
              
              .header>span{
                color: #00E4FF;
                font-size: .24rem;
                font-family:SimHei;;
              }
              ul{
                display: flex;
                flex-wrap: wrap;
                margin-top: .26rem;
                li{
                  margin-right: 0.05rem;
                  margin-left: .05rem;
                  display: flex;
                  justify-content: flex-end;
                  width: 3.3rem;
                  align-items: center;
                  margin-bottom: .07rem;
                  .vux-rater-box{
                    color: #3c5f85!important;
                  }
                  .is-active{
                    color: rgb(1, 210, 236)!important;
                  }
                }
                li>span{
                  margin-right: .09rem;
                  color: #00E4FF;
                  font-size: .2rem;
                  font-family:SimHei;
                }
              }
            }
            div:nth-child(2) .header >img{
              width: .27rem;
              height: .35rem;
              margin-right: .12rem;
            }
          }
          section>div{
            width: 100%;
            background:rgba(10,34,63,1);
            border-radius: .1rem;
            margin-bottom: .06rem;
            padding: .11rem 0 .18rem .25rem;
          }
          section::-webkit-scrollbar {
              display: none;
          }
        }
                      .MyCharts{
                width: 3.35rem;
                height: 2.88rem;
                #cl{
                  width: 100%;
                  height: 100%;
                }
              }
    }
</style>
