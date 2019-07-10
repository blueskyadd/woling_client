<template>
  <div class="shoping_list">
    <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='false'/>
    <div class="Menu">
      <sideBar :leftList='leftList' @change="getStudentList" :setIndex='setIndex'/>
      <div class="MenuRight">
        <mian-list class="main_list" :loading='loading' :tableList='tableList' :refreshing='refreshing' @goDetail = 'getshopDetail'  @getClassList ='getShopList' :isLoaded='isLoaded'>
            <template slot="second" slot-scope="scope">
                <div class="mask_layer "></div>
                <img class="projectImg" :src="scope.dataItem.front_image" alt="">
                <div class="project_main">
                  <span class="projectName">{{scope.dataItem.name}}</span>
                  <span class="projectPrice"><img class="projectPriceLeft" src="../../assets/img/projectPriceLeft.png" alt="">{{scope.dataItem.name}}<img class="projectPriceRight" src="../../assets/img/projectPriceRight.png" alt=""></span>
                  <span class="project">购买</span>
                </div>
            </template>
        </mian-list>
      </div>
    </div>
    <shopDetail ref="coachDetail" :detailData='detailData' :detaiilTitle='detaiilTitle'/>
    
    <img @click="goCart" class="shopCart" src="../../assets/img/shopCart.png" alt="">
    <badge :text="setcartNumber"></badge>
  </div>
</template>

<script>
  import headerTitle from "../../components/header";
  import sideBar from "../../components/sidebar";
  import mianList from '../../components/mainList';
  import shopDetail from "../coach/coachDetail"
  import { Badge } from 'vux'
    export default {
      components:{headerTitle, sideBar, mianList, shopDetail, Badge},
        name: "index",
      data(){
        return{
          headerTitle:"商城",
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
          tableList: [
              {
                  'id':1,
                  'front_image':'http://img3.imgtn.bdimg.com/it/u=2017451364,1155593535&fm=15&gp=0.jpg',
                  'good_details':[{
                    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
                  }, {
                    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
                  }, {
                    img: 'http://img3.imgtn.bdimg.com/it/u=2017451364,1155593535&fm=15&gp=0.jpg', 
                  }],
                  'name':'张三',
                  'coach':"而开发后尔瓦佛尔积分日光金额偶然间g"
              }
          ],//数据列表
          setIndex:0,
          isLoaded:false,
          refreshing:false,
          loading:false,
          detailData:{},
          detaiilTitle: '商品简介',
          cartNumber:100
        }
      },
      computed:{
        setcartNumber(){
          if(this.cartNumber > 99){
            return '99+'
          }else{
            return this.cartNumber
          }
        }
      },
      methods: {
        /**@name获取班级名称列表 */
        getStudentList(data){
          this.headerTitle = data.item.name + '学员'
          this.setIndex = data.index
        },
        getshopDetail(data){
           this.detailData = data
          this.$refs.coachDetail.isDetail = !this.$refs.coachDetail.isDetail
        },
        getShopList(){

        },
        goCart(){
          this.$router.push({name:'cart'})
        }

      },
    }
</script>

<style scoped lang="scss">

  .shoping_list{
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
        padding: .16rem 0 0 .46rem;
        box-sizing: border-box;
        .main_list{
          position: relative;
          .mask_layer{
            position: absolute;
            width: 100%;
            height: 100%;
            background-color:rgba(0,0,0,.4);
            border-bottom-right-radius: .1rem;
            border-bottom-left-radius: .1rem;
          }
          .projectImg{
            height: 2.38rem;
          }
          .project_main{
              position: absolute;
              bottom: 0;
              left: 0;
              display: flex;
              flex-direction: column;
              width: 100%;
              span{
                position: static;
                display: flex;
                justify-content: flex-start;
                padding: 0 .09rem;
              }
              span:last-child{
                width: 100%;
                height: .54rem;
                line-height: .54rem;
                text-align: center;
                color: #00FFF0;
                font-size: .24rem;
                font-family:SimHei;
                font-weight:bold;
                background: url(../../assets/img/puy.png) 0 0 / 100%  100%;
                justify-content: center;
              }
              .projectName{
                font-size: .18rem;
                font-family:SimHei;
              }
              .projectPrice{
                height: .6rem;
                align-items: center;
                
                img{
                  width: .3rem;
                  height: .31rem;
                }
                .projectPriceLeft{
                  margin-right: .05rem;
                }
                .projectPriceRight{
                  margin-left: .56rem;
                }
                
              }
            }
        }
        
      }
    }
    .shopCart{
      width: .98rem;
      height: .93rem;
      position: absolute;
      right: .11rem;
      top: .84rem;
      
    }
    .vux-badge{
      position: absolute;
      background: #E6054A;
      right: .1rem;
      top: .8rem;
    }
  }
</style>
