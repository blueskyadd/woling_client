<template>
    <div class="coling_orderForm">
        <headerTitle :title="headerTitle" :isUpload = 'false ' :isLocation='false'/>
         <div class="main">
            <sideBar :leftList='leftList' @change="getorderForm" :setIndex='setIndex'/>
            <div class="selete_main" >
                <ul> 
                    <li v-for="(val,index) in orderFormList" :key="index" @click="getOrderDetail">
                        <div>
                            <div><img :src="val.day_weather_pic" alt=""></div>
                            <div>
                                <h3>{{val.coach}}</h3>
                                <p>{{val.assistant_coach}}</p>
                                <button>{{val.province}}</button>
                            </div>
                        </div>
                        <div>
                            <span>￥321</span>
                            <span>选择商品1</span>
                            <button :style="{'background': val.status ? 'red' :'#D8CB5A'}">{{val.province}}</button>
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
                        <p>3242342342433</p>
                    </li>
                    <li>
                        <img src="../../assets/img/orderDetailFooter.png" alt="">
                        <span>订单商品:</span>
                        <p>32423423423423</p>
                    </li>
                    <li>
                        <img src="../../assets/img/orderDetailFooter.png" alt="">
                        <span>使用时间:</span>
                        <p>32423423423423</p>
                    </li>
                    <li>
                        <img src="../../assets/img/orderDetailFooter.png" alt="">
                        <span>付款时间:</span>
                        <p>423423423423423423423</p>
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
                    'id':1,
                    'name':'熊猫球场',
                    'coach':"而开发后尔瓦佛尔积分日光金额偶然间g"
                },
                 {
                    'id':21,
                    'name':'熊猫球场',
                    'coach':"而开发后尔瓦佛尔积分日光金额偶然间g"
                },
                 {
                    'id':14,
                    'name':'熊猫球场',
                    'coach':"而开发后尔瓦佛尔积分日光金额偶然间g"
                }
            ],
            setIndex: 0,
            
            orderFormList:[
                {
                    coach:'花式足球',
                    assistant_coach:'阿尔法我去饿请问',
                    start_time:'2028-04-02',
                    province:'为违',
                    city:'士大夫',
                    area:'阿尔法',
                    address:'阿尔法',
                    status: false,
                    day_weather_pic:'http://pic18.nipic.com/20111129/4155754_234055006000_2.jpg'
                }
            ],
            detailDataObj:{
                'title':'订单详情',
                'buttonText':'确定'
            }

        }
    },
    methods:{
        getorderForm(data){
            this.setIndex = data.index
        },
         getOrderDetail(data){
            // this.detailDataObj = data
            this.$refs.popUpDetail.isDetail = !this.$refs.popUpDetail.isDetail

        },
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
