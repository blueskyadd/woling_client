<template>
    <div class="course_timetable">
        <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='false'/>
        <div class="main">
            <mian-list @goDetail='goCourseDetail' :loading='loading' :tableList='tableList' :refreshing='refreshing'  @getClassList = 'getCourseList' :isLoaded='isLoaded' class="main_list">
                <template slot="second" slot-scope="scope">
                    <img :src="scope.dataItem.front_image" alt="">
                    <span>{{scope.dataItem.name}}</span>
                </template>
            </mian-list>
        </div>
    </div>
</template>
<script>
import headerTitle from "../../components/header";
import mianList from '../../components/mainList';
export default {
    components:{headerTitle, mianList},
    data(){
        return{
            headerTitle: '课表',//标题名称
            tableList: [
                {
                    'id':1,
                    'front_image':'http://img4.duitang.com/uploads/item/201412/01/20141201183854_TRArc.thumb.700_0.png',
                    'name':'张三',
                    'coach':"而开发后尔瓦佛尔积分日光金额偶然间g"
                }
            ],//数据列表
            loading: false,//全屏Loading
            isLoaded: false,//下拉加载
            refreshing: false,//上拉刷新
        }
    },
    methods: {
        getcoachList(data){
            this.setIndex = data.index
        },
        goCourseDetail(){
            this.$router.push({name:'courseDetail'})
        },
        /**@name获取课程列表 */
        getCourseList(num){
            console.log(num)
            var url = this.$conf.env.getClassList + num
            this.$http.get(num == 1 ? this.$conf.env.getClassList : url ).then( res =>{
                this.$loading.close()
                this.refreshing = false;
                if(!res.data.results){
                    this.isLoaded = true
                    var text = num == 1 ? '暂时没有数据呢':'已加载全部数据'
                    this.$toast.center(text);
                    return
                }else{
                    num == 1 ?  this.tableList = res.data.results : this.tableList = this.tableList.concat(res.data.results)
                    this.loading = false
                    console.log(this.tableList)
                }

            }).catch(err =>{
                this.isLoaded = true
                this.refreshing = false;
                this.$loading.close()
                this.loading = false
            })
        },
    },
    mounted(){
        // this.$loading('');
        // this.getClassList(1)
    }
}
</script>
<style lang="scss">
.course_timetable{
    width: 100%;
    height: 100%;
    background: url(../../assets/img/bj1.png)  0 0 / 100% 100% ;
    .main{
        margin: .18rem;
        height: calc(100% - .64rem);
        width: calc(100% - 1.4rem);
        
        border-radius: .05rem;
        padding: .16rem .21rem;
        overflow-y: scroll;
        .main_list{

        }
        ul{
            li{
                margin-right: .21rem ;
                border-radius: .05rem;
                overflow: hidden;
            }
        }

    }
    // .main::-webkit-scrollbar {
    //     display: none;
    // }
}
</style>
