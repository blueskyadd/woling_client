<template>
    <div class="medal_timetable">
        <headerTitle :title="headerTitle" :isUpload = 'false ' :isLocation='false'/>
       
        <div class="main">
             <div class="medal_sitBar_list">
                <div class="list">
                     <span>勋章等级</span>
                     <div>
                         <img src="../../assets/img/medalLogo.png" alt="">
                     </div>
                </div>
                <div class="list" v-if="newAcquisition">
                     <span>最新获得</span>
                     <div >
                         <img :src="newAcquisition" alt="">
                    </div>
                </div>
             </div>
            <mian-list class="medal_main_list" :loading='loading' :tableList='tableList' :refreshing='refreshing'  @getClassList = 'getMedalList' :isLoaded='isLoaded'>
                <template slot="second" slot-scope="scope">
                    <img :src="scope.dataItem.image" alt="">
                    <span class="list_name">{{scope.dataItem.name}}</span>
                    <span class="list_time">{{scope.dataItem.update_time}}</span>
                </template>
            </mian-list>
        </div>
    </div>
</template>
<script>
import headerTitle from "../../components/header";
import mianList from '../../components/mainList';
export default {
    name:'medal',
    components:{headerTitle, mianList},
    data(){
        return{
            headerTitle: '勋章',//标题名称
            tableList: [],//数据列表
            newAcquisition: '',//最新获得勋章
            loading: false,//全屏Loading
            isLoaded: false,//下拉加载
            refreshing: false,//上拉刷新
        }
    },
    methods: {
        /**@name获取课程列表 */
        getMedalList(num){
            console.log(num)
            var url = this.$conf.env.getMedalList + num 
            this.$http.get(num == 1 ? this.$conf.env.getMedalList : url ).then( res =>{
                this.$loading.close()
                this.refreshing = false;
                if(!res.data.next ){
                    if(res.data.results.length == 0 || res.data.results.length ==  res.data.count/num){
                        num ==1?this.$toast.center('暂时没有获得的勋章') :this.$toast.center('已加载全部勋章')
                    }else if(res.data.results.length > 0 && res.data.results.length < res.data.count/num && num !=  1){
                        this.$toast.center('已加载全部勋章')
                    }
                    this.isLoaded = true 
                    
                }else{
                    this.isLoaded = false
                }
                if(res.data.results && res.data.results.length != 0 && num == 1){
                    this.newAcquisition = res.data.results[0].image
                }
                num == 1 ?  this.tableList = res.data.results : this.tableList = this.tableList.concat(res.data.results)
            }).catch(err =>{
                this.isLoaded = true
                this.refreshing = false;
                this.$loading.close()
                this.loading = false
            })
        }
    },
    mounted(){
        this.$loading('');
        this.getMedalList(1)
       
    }
}
</script>
<style lang="scss">
.medal_timetable{
    width: 100%;
    height: 100%;
    background: url(../../assets/img/bj1.png)  0 0 / 100% 100% ;
    
    .main{
        // margin: .18rem;
        height: calc(100% - .64rem);
        width: 100%;
        background: rgba(35, 65, 101,0.5);
        display: flex;
        overflow-y: scroll;
        .medal_sitBar_list{
            width: 2.73rem;
            background: #1a2e4d;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 0 .32rem 0 .3rem;
            .list{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                span{
                    display: block;
                    width: 1.51rem;
                    height: .47rem;
                    float: right;
                    border: 1px solid #5272a0;
                    margin: .16rem .67rem 0 0;
                    text-align: center;
                    line-height: .47rem;
                    color:rgba(201,235,247,1);
                    font-size: .2rem;
                    font-family:SimHei;
                    background: url(../../assets/img/upload.png) 0 0 / 100% 100%;
                    text-shadow: 0 0 .1rem #fff;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-bottom: .12rem;
                }
                div{
                    height: 2.58rem;
                    width: 2.04rem;
                    background: url(../../assets/img/medalBg.png) 0 0 / 100% 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 80%;
                    }
                }
            }
        }
        .medal_main_list{
            width: calc(100% - 2.73rem);
            margin: .37rem 0 .37rem .18rem;
             ul{
                li{
                    margin-right: .21rem ;
                    border-radius: .05rem;
                    overflow: hidden;
                    background: url(../../assets/img/dt3@2x.png) 0 0 / 100% 100%;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    img{
                        width: 70%;
                        height: auto;
                        position: absolute;
                        top: .8rem;left: 0;right: 0;
                        margin: auto;
                    }
                    span{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 1.3rem;
                        left: 0;right: 0;
                        margin: auto;
                    }
                    .list_name{
                        bottom: .43rem;
                        border-bottom: 1px solid #254260;
                        font-size: .22rem;
                        line-height: .34rem;
                    }
                    .list_time{
                        bottom: 0;
                        height: .42rem;
                        line-height: .42rem;
                        border-top: 1px solid #001d3f;
                        color: #8799bd;
                        font-size: .16rem;
                        
                    }
                    
                }
            }
        }
       

    }
}
</style>
