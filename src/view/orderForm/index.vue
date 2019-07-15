<template>
    <div class="coling_orderForm">
        <headerTitle :title="headerTitle" :isUpload = 'false ' :isLocation='false'/>
         <div class="main">
            <sideBar :leftList='leftList' @change="getorderForm" :setIndex='setIndex'/>
            <div class="selete_main" >
                <ul> 
                    <li v-for="(val,index) in orderFormList" :key="index" @click="getOrderDetail(val)">
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
                            <button  :style="{'background': val.pay_status == '已取消' ? '#6F6F6F'  :val.pay_status  ==''||  '支付'? 'transparent': '#FF3737' , 'color' :val.pay_status  == ''|| '支付'? 'transparent' :'#D8CB5A'}">{{val.pay_status}}</button>
                            <span>3254653513143</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <pop-up ref="popUpDetail" class="orderDetail" :detailData='detailDataObj'>
                <template slot="second" >
                 <ul>
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
            
            orderFormList:[],
            detailDataObj:{
                'title':'订单详情',
                'buttonText':'确定'
            },
            orderDetail:{pay_time:'',times:[],order_sn:'',pitch:''}

        }
    },
    methods:{
        getorderForm(data){
            this.setIndex = data.index
            console.log(data)
            this.$loading('');
            this.getClassifyList(data.item.id)
        },
         getOrderDetail(data){
             this.$loading('');
            // this.detailDataObj = data
            this.$http.get(this.$conf.env.getPitchList + data.id +'/').then( res =>{
                console.log(res)
                 this.$loading.close()
                this.orderDetail = res.data
                this.$refs.popUpDetail.isDetail = !this.$refs.popUpDetail.isDetail
            }).catch(err =>{
                this.$loading.close()
                if(err.request.status == '404'){
                    this.$toast.center('暂无详情数据');
                }else{
                    this.$toast.center('服务器错误');
                }
                 
                
            })
            
        },
        getClassifyList(ID){
            this.$http.get(this.$conf.env.getClassifyList + ID).then( res =>{
                this.$loading.close()
                this.orderFormList = res.data.results
            }).catch(err =>{
                this.$loading.close()
                console.log(err)
                this.$toast.center('服务器错误');
            })
        }
    },
    mounted(){
        this.$loading('');
        this.getClassifyList(0)
    }
}
</script>
<style lang="scss" scoped>
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
                ul{
                    display: flex;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    background:linear-gradient(0deg,rgba(22,37,68,.6) 0%,rgba(57,87,139,.8) 100%);
                    padding: .14rem .11rem;
                    width: 100%;
                    height: 100%;
                    li{
                        width: 6.227rem;
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
                        width: 50%;
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
                            h3{
                                font-size: .26rem;
                                font-family:SimHei;
                                font-weight:400;
                                color:rgba(220,240,242,1);
                                margin-bottom: .14rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            p{
                                font-size:.2rem;
                                font-family:SimHei;
                                font-weight:400;
                                color:rgba(129,167,211,1);
                                margin-bottom: .18rem;
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
        ul{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            
            height: 100%;
            width: 100%;
            margin-bottom: .49rem;
            li{
                height: .28rem;
                font-family: SimHei;
                display: flex;

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
    }
}
</style>
