
<template>
    <div class="grade_index">
        <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='false'/>
        <div class="main">
            <aside>
              <div class="TabSel">
                  <div class="News" :class="SelectNes === 0 ? 'active':''">最新</div>
                  <div class="history" :class="SelectNes === 1 ? 'active':''">历史</div>
                </div>
              <div class="NewsBox" v-if="SelectNes === 0 ">
                <div class="imageBoxTit">位置与综合评价</div>
                <div class="MyCharts">
                  <canvas id="cl"></canvas>
                </div>
              </div>
              <div class="historyBox" v-else></div>
            </aside>
        </div>
    </div>
</template>
<script>
import headerTitle from "../../components/header";
import GM from 'g2-mobile'
export default {
    name:'gradeIndex',
    components:{headerTitle},
    data(){
        return{
          headerTitle: '成就',
          SelectNes:0,
          Charts:[]
        }
    },
    mounted() {

        GM.Global.pixelRatio = 1;
        var data = [
          {name: '张飞',props: '力量', value: 4.5},
          {name: '张飞',props: '速度', value: 4.5},
          {name: '张飞',props: '传球', value: 3.5},
          {name: '张飞',props: '盘带', value: 3.5},
          {name: '张飞',props: '射门', value: 4.5},
          {name: '张飞',props: '防守', value: 5},
          {name: '张飞',props: '意识', value: 5},
          {name: '张飞',props: '精神', value: 2},
        ];
        var chart = new GM.Chart({
          id: 'c1'
        });
        chart.coord('polar');
        chart.source(data, {
          value: {
            min: 0,
            tickInterval: 1
          }
        });
        //配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
        chart.axis('props', {
          label: {
            fontSize: 14
          },
          line: null
        });
        chart.axis('value', {
          label: {
            fontSize: 14
          }
        });
        chart.line().position('props*value').color('name');
        chart.render();
      }

}
</script>

<style lang="scss" >
  @import "../../assets/style/AllStyle";
      .grade_index{
        background: url(../../assets/img/bj1.png)  0 0 / 100% 100% ;
        width: 100%;
        height:100%;
        .main{
          width: 100%;
          height: calc(100% - .64rem);
          overflow: hidden;
          aside{
            width:3.54rem;
            height:100%;
            background:linear-gradient(0deg,rgba(16,32,57,1) 0%,rgba(27,46,78,1) 100%);
            .TabSel{
              width: 100%;
              height: .53rem;
              margin-top: .06rem;
              display: flex;
              justify-content: space-between;
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
            .NewsBox,.historyBox{
              width: 100%;
              height: calc(100% -  .53rem);
              &.active{
                display: none;
              }
            }
            .NewsBox{
              .imageBoxTit {
                width: 2.85rem;
                height: .76rem;
                margin: .26rem auto .2rem;
                background: url("../../assets/img/tuceng.png") no-repeat;
                background-size:100%;
                font-size:.25rem;
                font-family:SimHei;
                color:rgba(0,228,255,1);
                line-height:.76rem;
                text-indent: .7rem;
              }
              .ayCharts{
                width: 3.35rem;
                height: 2.88rem;
                #cl{
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
    }
</style>
