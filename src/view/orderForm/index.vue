<template>
    <div class="coling_orderForm">
        <headerTitle :title="headerTitle" :isUpload = 'false ' :isLocation='false'/>
         <div class="main">
            <sideBar :leftList='leftList' @change="getorderForm" :setIndex='setIndex'/>
            <div class="selete_main" >
                <mu-paper :z-depth="1" class="demo-loadmore-wrap list BigBox" ref="scroll">
                <mu-load-more @refresh="refresh" :refreshing="refreshing"   @load="load" :loaded-all='isLoaded'>
                    <ul> 
                        <li v-for="(val,index) in orderFormList" :key="index" @click=" getDetail(val)">
                            <div>
                                <div><img :src="'http://94.191.15.122/'+val.image" alt=""></div>
                                <div>
                                    <h3>{{val. name}}</h3>
                                    <p>{{val.assistant_coach || val.create_time}}</p>
                                    <button :style="{'background': val.classify == '其他' ? '#5A75D8' : val.classify == '课程' ? '#5AD8A4' : '' }">{{val.classify}}</button>
                                </div>
                            </div>
                            <div>
                                <span>￥{{val.money}}</span>
                                <span>选择商品{{val.nums}}</span>
                                <button  :style="{'background': val.pay_status == '已取消' ? '#6F6F6F'  :val.pay_status  =='' ? 'transparent': val.pay_status  == '支付' ?  '#FF3737' : 'transparent' , 'color' : val.pay_status  ==  '' ?  'transparent' :  val.pay_status  ==  '支付' ? '#fff' : '#fff'}">{{val.pay_status == '支付' ? '取消' : val.pay_status }}</button>
                                <span>3254653513143</span>
                            </div>
                        </li>
                    </ul>
                </mu-load-more>
            </mu-paper>
            </div>
        </div>
        <pop-up ref="popUpDetail" class="orderDetail" :detailData='detailDataObj'>
                <template slot="second" >
                 <ul v-if="isDetail">
                    <li>
                        <img src="../../assets/img/orderDetailFooter.png" alt="">
                        <span>订单编号:</span>
                        <p>{{orderDetail.order_sn}}</p>
                    </li>
                    <li>
                        <img src="../../assets/img/orderDetailFooter.png" alt="">
                        <span>订单商品:</span>
                        <p>{{orderDetail.pitch}}</p>
                    </li>
                    <li>
                        <img src="../../assets/img/orderDetailFooter.png" alt="">
                        <span>使用时间:</span>
                        <p>{{orderDetail.times[0]}}</p>
                    </li>
                    <li>
                        <img src="../../assets/img/orderDetailFooter.png" alt="">
                        <span>付款时间:</span>
                        <p>{{orderDetail.pay_time}}</p>
                    </li>
                </ul>
                <ul v-else>
                     <li>
                        <img src="../../assets/img/orderDetailFooter.png" alt="">
                        <span>订单编号:</span>
                        <p>{{projectDetail.order_sn}}</p>
                    </li>
                    <li>
                        <img src="../../assets/img/orderDetailFooter.png" alt="">
                        <span>订单商品:</span>
                        <div>
                            <p v-for="item in projectDetail.order_details" :key="item.id"><span>{{item.name}}</span><span>X{{item.num}}............￥{{item.unit_price}}</span></p>
                            <p>共{{projectDetail.order_details.length}}件商品</p>
                        </div>
                        
                    </li>
                    <li>
                        <img src="../../assets/img/orderDetailFooter.png" alt="">
                        <span>付款时间:</span>
                        <p>{{projectDetail.pay_time}}</p>
                    </li>
                </ul>
                <span class="submitButton"   @click="deleteOrder()">{{detailDataObj.buttonText}}</span>
            </template>
        </pop-up>
    </div>
</template> 
<script>
import headerTitle from "../../components/header";
import sideBar from "../../components/sidebar";
import popUp from "../../components/popUp"
import { XButton } from 'vux'
export default {
    name: 'orderForm',
    components:{headerTitle, sideBar, XButton, popUp},
    data(){
        return{
            headerTitle: '订单',
            leftList:[
                {
                    'id': '',
                    'name':'全部'
                },{
                    'id': 4,
                    'name':'课程'
                },{
                    'id': 6,
                    'name':'球场'
                },{
                    'id': 6,
                    'name':'其他'
                }
            ],
            setIndex: 0,
            refreshing: false,
            isLoaded: false,
            orderFormList:[],
            detailDataObj:{
                'title':'订单详情',
                'buttonText':'取消预订'
            },
            orderDetail:{pay_time:'',times:[],order_sn:'',pitch:''},
            projectDetail:{pay_time:'', order_details:[], order_sn:''},
            number: 1,
            orderFormID: 0,
            isDetail: false,
            isOrderDetail: true,
            orderDetailID: '',
            orderclassify: ''
        }
    },
    methods:{
        refresh(){
            this.number = 1
            console.log('刷新')
            this.getClassifyList()
        },
        load(){
            this.number += 1
            this.isLoading = true
            console.log('加载')
            
            this.getClassifyList()
        },
        getorderForm(data){
            this.setIndex = data.index
            this.number = 1
            this.$refs.scroll.scrollTop = 0
            this.$loading('');
            this.orderFormID = data.item.id
            this.getClassifyList()
        },
        getDetail(data){
           
            if(data.pay_status == '支付' ){
                 this.$loading('');
                if(data.classify == '球场'){
                    this.isOrderDetail = true;
                    this.orderDetailID = data.id;
                    this.orderclassify = data.classify
                    this.getOrderDetail(data)
                }else{
                    this.isOrderDetail = false
                    this.orderDetailID = data.id;
                     this.orderclassify = data.classify
                    this.getProjectDetail(data)
                }
            }else{
                 this.$toast.center('暂不可取消预约');
            }
           
        },
         getOrderDetail(data){
            this.$http.get(this.$conf.env.getPitchList + data.id +'/').then( res =>{
                console.log(res)
                 this.$loading.close()
                this.orderDetail = res.data
                this.$refs.popUpDetail.isDetail = !this.$refs.popUpDetail.isDetail
                this.isDetail = true
            }).catch(err =>{
                this.$loading.close()
                if(err.request.status == '404'){
                    this.$toast.center('暂无详情数据');
                }else{
                    this.$toast.center('服务器错误');
                }
            })
        },
        getProjectDetail(data){
            this.$http.get(this.$conf.env.getProjectDetail + data.id +'/').then( res =>{
                this.$loading.close()
                this.projectDetail = res.data
                this.$refs.popUpDetail.isDetail = !this.$refs.popUpDetail.isDetail
                this.isDetail = false
            }).catch(err =>{
                this.$loading.close()
                if(err.request.status == '404'){
                    this.$toast.center('暂无详情数据');
                }else{
                    this.$toast.center('服务器错误');
                }
            })
        },
        getClassifyList(){
            this.$http.get(this.$conf.env.getClassifyList + this.orderFormID +  '&p='+ this.number ).then( res =>{
                this.$loading.close()
                if(!res.data.next){
                    if(res.data.results.length == 0 || res.data.results.length ==  res.data.count/this.number){
                        this.number ==1?this.$toast.center('暂无数据') :this.$toast.center('已加载全部数据')
                    }else if(res.data.results.length > 0 && res.data.results.length < res.data.count/this.number && this.number !=  1){
                        this.$toast.center('已加载全部数据')
                    }
                    this.isLoaded = true
                }else{
                    this.isLoaded = false
                }
                this.orderFormList = this.number == 1 ? res.data.results : this.orderFormList.concat(res.data.results)
            }).catch(err =>{
                this.$loading.close()
                console.log(err)
                this.$toast.center('服务器错误');
            })
        },
        deleteOrder(){
            
            this.orderclassify == '球场'  ? this.detailClassDetail() : this.orderclassify == '课程' ? this.deleteProjectDetail() : this.$toast.center('该订单暂不可取消哦')
        },
        detailClassDetail(){
            this.$loading('');
            this.$http.get(this.$conf.env.getPitchList + this.orderDetailID + '/').then( res =>{
                console.log(res)
                this.$loading.close()
                this.$toast.center('取消预约成功');
                this.$loading('');
                this.getClassifyList()
                this.$refs.popUpDetail.isDetail = false
            }).catch(err =>{
                this.$loading.close()
                this.$toast.center('服务器错误');
            })
        },
        deleteProjectDetail(){
            this.$loading('');
            this.$http.get(this.$conf.env.setappoint + this.orderDetailID + '/').then( res =>{
                console.log(res)
                this.$loading.close()
                this.$toast.center('取消预约成功');
                this.$loading('');
                this.getClassifyList()
                this.$refs.popUpDetail.isDetail = false
            }).catch(err =>{
                this.$loading.close()
                this.$toast.center('服务器错误');
            })
        }
    },
    mounted(){
        this.$loading('');
        this.getClassifyList()
    }
}
</script>
<style lang="scss" >
.coling_orderForm{
    width: 100%;
    height: 100%;
    background: url(../../assets/img/bj1.png)  0 0 / 100% 100% ;
    .main{
         height: calc(100% - .64rem);
        background: rgba(35, 65, 101,0.5);
        border-radius: .05rem;
        overflow-y: scroll;
        display: flex;
        .selete_main{
            width: calc(100% - 1.4rem);
            padding: .2rem .18rem;
            overflow: hidden;
            height: 100%;
            .mu-paper{
                height: 100%;
                overflow-y: scroll;
                background: transparent;
            }
                ul{
                    display: flex;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    background:linear-gradient(0deg,rgba(22,37,68,.6) 0%,rgba(57,87,139,.8) 100%);
                    padding: .14rem .11rem;
                    width: 100%;
                    height: 100%;
                    li{
                        width:48%;
                        height: 1.48rem;
                        background: orange;
                        margin-right: .14rem;
                        margin-bottom: .1rem;
                        border-radius: .05rem;
                        background: #271948 url(../../assets/img/selfBg.png )  0 0 / 100% 100% ;
                        padding: .15rem .14rem;
                        display: flex;
                        justify-content: space-between;
                        button{
                            border: 0;
                            width:.69rem;
                            height: .28rem;
                            background:rgba(90,216,164,1);
                            border-radius: .05rem;
                            font-size:.18rem;
                            font-family:SimHei;
                            font-weight:400;
                            color:rgba(220,240,242,1);
                            line-height: .28rem;
                        }
                    }
                    li>div:first-child{
                        display: flex;
                        justify-content: flex-start;
                        
                        div:first-child{
                            width: 1.2rem;
                            height: 1.21rem;
                            margin-right: .14rem;
                            border-radius: .05rem;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        div:last-child{
                            width: calc(100% - 1.2rem);
                        }
                        div{
                            overflow: hidden;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            h3{
                                font-size: .26rem;
                                font-family:SimHei;
                                font-weight:400;
                                color:rgba(220,240,242,1);
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            p{
                                font-size:.2rem;
                                font-family:SimHei;
                                font-weight:400;
                                color:rgba(129,167,211,1);
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            
                        }
                    }
                    li>div:last-child{
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        overflow: hidden;
                        justify-content: space-around;
                        button{
                          width: auto;
                          padding: 0 .15rem;
                        }
                        span{
                            font-family:SimHei;
                            font-weight:400;
                            color:rgba(220,240,242,1);
                            font-size: .16rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
    }
    
    .orderDetail{
        .detail_box{
            position: relative;
            .close{
                position: absolute;
                right: 0;
                top: 0;
                margin-left: 0;
                padding-right: 0.2rem;
            }
        }
        .detail_main>div{
            width: 85%!important;
            margin-left: 1.5rem;
        }
        ul{
            // display: flex;
            flex-direction: column;
            justify-content: space-around;
            overflow: scroll;
            height: 100%;
            // height: auto;
            width: 100%;
            li{
                font-family: SimHei;
                display: flex;
                margin-bottom: .2rem;
                div{
                    height: auto;
                    p{
                        display: flex;
                        justify-content: flex-start;
                        span{
                            display: block;
                        }
                        span:first-child{
                            width: 1rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                     p:last-child{
                         float: right;
                     }
                }
                img{
                    height: .28rem;
                    margin-right: .1rem;
                }
                span{
                    color: #acc2e2;
                    font-size: 0.2rem;
                    margin-right: .15rem;
                }
                p{
                    color: #7599cf;
                }
            }
        
        }
        ul::-webkit-scrollbar{
            display: none;
        }
    }
    .DETAIL{
        width: 100%;
    }
}
</style>
