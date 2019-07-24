
<template>
    <div class="coach_Detail">
        <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='true' @changeCity='changeCity'/>
        <div class="main">
            <sideBar :leftList='leftList' @change="getcoachTitle" :setIndex='setIndex'/>
            <div class="selete_main" >
                <mian-list  :loading='loading' :tableList='tableList' @refresh="refresh" :refreshing='refreshing' @goDetail = 'getCoachDetail'  @getClassList ='getCoachList' :isLoaded='isLoaded'>
                    <template slot="second" slot-scope="scope">
                        <img :src="scope.dataItem.front_image" alt="">
                        <span>{{scope.dataItem.name}}</span>
                    </template>
                </mian-list>
            </div>
            <coachDetail ref="coachDetail" :detailData='detailData' :detaiilTitle = 'detaiilTitle'/>
        </div>
    </div>
</template>
<script>
import headerTitle from "../../components/header";
import sideBar from "../../components/sidebar"
import mianList from '../../components/mainList'
import coachDetail from './coachDetail'
export default {
    components:{headerTitle, sideBar, mianList, coachDetail},
    name:'coach',
    data(){
        return{
            headerTitle: '教练',
            leftList:[ ],
            tableList: [],//数据列表
            loading: false,//全屏Loading
            isLoaded: false,//加载完毕
            refreshing: false,//上拉刷新
            setIndex:0,
            isDetail:false,
            detailData:{},
            detaiilTitle:'教练简介',
            area:'',
            city:'',
        }
    },
    methods: { 
        activeList(data){
            this.headerTitle = data.item.name
            this.setIndex = data.index
        },
        getCoachDetail(data){
            data.desc = data.intro
            this.detailData = data
            this.$refs.coachDetail.isDetail = !this.$refs.coachDetail.isDetail

        },
        refresh(){
            this.getCoachList()
        },
        /**@name获取班级名称列表 */
        getCoachList(){
            this.$http.get(this.$conf.env.getCoachList +'?area=' + this.area+ '&city=' + this.city).then( res =>{
                this.$loading.close()
                if(!res.data || res.data.length == 0) {
                 this.$toast.center('暂时没有数据呢');
                 this.leftList = res.data
                 this.getcoachTitle({'item': {coaches:[]}, 'index':0})

                }else{
                   res.data.forEach( (Element, index) =>{
                        Element.index = index
                    })
                    this.getcoachTitle({'item': res.data[0], 'index': res.data[0].index})
                    this.leftList = res.data
                }
            }).catch(err =>{
                console.log(err)
                this.$loading.close()
                this.$toast.center('服务器错误');
            })
        },
        getcoachTitle(data){
            console.log(data)
            this.setIndex = data.index? data.index : 0
            if(!data.item.coaches.length){
                this.$toast.center('暂无数据');
                this.tableList = []
            }else{
                data.item.coaches.forEach(element =>{
                    element.front_image = element.picture
                })
                this.tableList = data.item.coaches
            }
        },
        changeCity(data){
            console.log(data)
            this.area = data[2];this.city = data[1]
            this.getCoachList()
        }, 

    },
    mounted(){
        this.$loading('');
        this.getCoachList()
    }
}
</script>
<style lang="scss" >
    .coach_Detail{
        background: url(../../assets/img/bj1.png)  0 0 / 100% 100% ;
        width: 100%;
        height:100%;

        .main{
            width: 100%;
            height: calc(100% - .64rem);
            overflow: hidden;
           .selete_main{
               padding: .4rem .4rem .38rem .5rem;
               width: calc(100% -  1.4rem);
               float: left;
               height: 100%;
               overflow-y: scroll;

           }
           .selete_main::-webkit-scrollbar {
                display: none;
            }
        }
    }
</style>
