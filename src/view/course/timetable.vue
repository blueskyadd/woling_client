<template>
    <div class="course_timetable">
        <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='false'/>
        <div class="main">
            <mian-list @goDetail='goCourseDetail' :loading='loading' :tableList='tableList' :refreshing='refreshing'  @getClassList = 'getCourselist' :isLoaded='isLoaded' class="main_list">
                <template slot="second" slot-scope="scope">
                    <img :src="scope.dataItem.image" alt="">
                    <span>{{scope.dataItem.classify}}</span>
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
            tableList: [],//数据列表
            loading: false,//全屏Loading
            isLoaded: false,//下拉加载
            refreshing: false,//上拉刷新
        }
    },
    methods: {
        getcoachList(data){
            this.setIndex = data.index
        },
        goCourseDetail(data){
            console.log(data)
            this.$router.push({name:'courtseDetail',params:{id:data.course_id, titleName: data.classify}})
        },
        /**@name获取课程列表 */
        getCourselist(num){
            console.log(num)
            var url = this.$conf.env.getCourselist + num
            this.$http.get(num == 1 ? this.$conf.env.getCourselist : url ).then( res =>{
                this.$loading.close()
                this.refreshing = false;
                if(!res.data){
                    this.isLoaded = true
                    var text = num == 1 ? '暂时没有数据呢':'已加载全部数据'
                    this.$toast.center(text);
                    return
                }else{
                    num == 1 ?  this.tableList = res.data : this.tableList = this.tableList.concat(res.data)
                    this.loading = false
                    console.log(this.tableList)
                }

            }).catch(err =>{
                console.log(err)
                this.isLoaded = true
                this.refreshing = false;
                this.$loading.close()
                this.loading = false
            })
        },
    },
    mounted(){
        this.$loading('');
        this.getCourselist(1)
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
