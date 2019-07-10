
<template>
    <div class="coach_Detail">
        <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='true'/>
        <div class="main">
            <sideBar :leftList='leftList' @change="getcoachList" :setIndex='setIndex'/>
            <div class="selete_main" >
                <mian-list  :loading='loading' :tableList='tableList' :refreshing='refreshing' @goDetail = 'getCoachDetail'  @getClassList ='getSclassList' :isLoaded='isLoaded'>
                    <template slot="second" slot-scope="scope">
                        <img :src="scope.dataItem.front_image" alt="">
                        <span>{{scope.dataItem.name}}</span>
                    </template>
                </mian-list>
            </div>
            <coachDetail ref="coachDetail" :detailData='detailData'/>
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
            leftList:[
                {
                    'id':1,
                    'name':'熊猫球场',
                    'coach':"而开发后尔瓦佛尔积分日光金额偶然间g"
                }
            ],
            tableList: [
                {
                    'id':1,
                    'front_image':'http://img4.duitang.com/uploads/item/201412/01/20141201183854_TRArc.thumb.700_0.png',
                    'name':'张三',
                    'coach':"而开发后尔瓦佛尔积分日光金额偶然间g"
                }
            ],//数据列表
            loading: false,//全屏Loading
            isLoaded: true,//加载完毕
            refreshing: false,//上拉刷新
            setIndex:0,
            isDetail:false,
            detailData:{}
        }
    },
    methods: {
        activeList(data){
            this.headerTitle = data.item.name
            this.setIndex = data.index
        },
        getCoachDetail(data){
            this.detailData = data
            this.$refs.coachDetail.isDetail = !this.$refs.coachDetail.isDetail

        },
        /**@name获取班级名称列表 */
        getSclassList(num){
            this.$http.get(this.$conf.env.getSclassList).then( res =>{
                if(!res.data || res.data.length == 0) {
                 this.$toast.center('暂时没有数据呢'); 
                 this.$loading.close()
                }else{
                   res.data.forEach( (Element, index) =>{
                        Element.index = index
                    })

                    this.getcoachList({'item': res.data[0], 'index': res.data[0].index})
                    this.leftList = res.data 
                }
            }).catch(err =>{
                console.log(err)
                this.$loading.close()
                this.$toast.center('服务器错误');
            })
        },
        getcoachList(data){
            this.$loading('');
            this.headerTitle = data.item.name + '学员'
            this.setIndex = data.index
            this.$http.get(this.$conf.env.getcoachList + data.item.id).then( res =>{
            this.$loading.close()
            console.log(res)

            res.data.forEach(element =>{
                element.front_image = element.image
                element.id = element.user_id
                delete element.image
                delete element.user_id
            })
            this.tableList = res.data
            }).catch(err =>{
                this.$loading.close()
            })
        }

    },
    mounted(){
        // this.$loading('');
        // this.getSclassList(1)
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
