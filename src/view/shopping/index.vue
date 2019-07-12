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
                  <span class="projectPrice"><img class="projectPriceLeft" src="../../assets/img/projectPriceLeft.png" alt="">{{scope.dataItem.price}}<img class="projectPriceRight" src="../../assets/img/projectPriceRight.png" alt=""></span>
                  <span class="project" @click.stop="AddShoppCart(scope.dataItem.id)">购买</span>
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
              name:'餐饮'
            },
            {
              id:1,
              name:'运动课程'
            },
            {
              id:2,
              name:'豪门球衣'
            },
            {
              id:3,
              name:'足球'
            },
            {
              id:4,
              name:'配件'
            },
            {
              id:5,
              name:'门票'
            },
          ],
          tableList: [],//数据列表
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
          this.setIndex = data.index


          this.$http.get(this.$conf.env.ShoppIngList + (this.setIndex+1))
            .then(res => {
              // this.$loading.close();
              console.log(res.data)
              this.tableList = res.data.results
            })
            .catch(err => {
              // this.$loading.close();
              this.$toast.center('网络错误');
            });
        
        },
        getshopDetail(data){
          this.$http.get(this.$conf.env.ShppingDetail + data.id + "/")
            .then(res => {
              // this.$loading.close();
              this.detailData = res.data;
              this.detailData.name = data.name
              for(var j in res.data.good_details){
                res.data.good_details[j].img = res.data.good_details[j].image
              }
              this.$refs.coachDetail.isDetail = !this.$refs.coachDetail.isDetail
              console.log(res.data)
            })
            .catch(err => {
              // this.$loading.close();
              this.$toast.center('网络错误');
            });

        },

        AddShoppCart(ID){
          let params ={
            goods:ID
          }
          this.$http.post(this.$conf.env.AddShoppCart, params).then(res =>{
            // this.$loading.close()
            console.log(res.data)
            this.$toast.center('加入成功');
          }).catch(err =>{
            // this.$loading.close()
            this.$toast.center('网络错误');
          })


        },
        getShopList(){

        },
        goCart(){
          this.$router.push({name:'cart'})
        }

      },
      created() {
        this.getStudentList({index:0})

      }
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
