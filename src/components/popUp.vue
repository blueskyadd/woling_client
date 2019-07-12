<template>
      <popup v-model="isDetail" height="270px" is-transparent >
        <div class="detail_box">
            <header class="close"><img @click="isDetail = false" src='../assets/img/orderDetailClose.png'/> </header>
            <div class="detail_main">
                <header>{{detailData.title}}</header>
                <div>
                    <slot name="second" :dataItem='detailData'></slot>
                    <span class="submitButton" >{{detailData.buttonText}}</span>
                </div>
            </div>
        </div>
      </popup>
</template>
<script>
import { Popup } from 'vux';
export default { 
    name:'orderDetail',
    components: { Popup },
    props:{
        detailData:{
            type:Object,
            required:true
        }
    },
    data(){
        return{
            isDetail:false
        }
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
    .vux-popup-dialog{
        top: 1.47rem;
        height: 100%!important;
        .detail_box{
            width: 61%;
            height: 4.8rem;
            margin: 0 auto;
            border-radius:.2rem;
            background:  url(../assets/img/orderDetailbg.png)  0 0 / 100% 100%;
            .close{
                color: #fff;
                font-size: .3rem;
                height: .64rem;
                justify-content: center;
                align-items: center;
                display: flex;
                position: relative;
                width: 1rem;
                float: right;
                img{
                    position: absolute;
                    top: .14rem;
                    right: .11rem;
                    width: .5rem;
                    height: .5rem;
                }
            }
            .detail_main{
                display: flex;
                padding: .15rem .2rem;
                height: calc(100% - .64rem);
                display: flex;
                flex-direction: column;
                align-items: center;
                header{
                    text-shadow: 0 0 0.1rem #90ffbf;
                    color: #90ffbf;
                    font-size: 0.26rem;
                    width: 100%;
                    display: flex;
                    font-family: SimHei;
                    justify-content: center;
                    margin-left: .8rem;
                }
                div{
                    width: 65%;
                    margin-top: .31rem;
                    height: 2.72rem;
                    
                }
            .submitButton {
                font-family: SimHei;
                display: block;
                float: none;
                width: 3.11rem;
                height: 0.73rem;
                background: url(../assets/img/ok.png) 0 0 / 100% 100%;
                font-size: 0.27rem !important;
                color: #ffffff !important;
                text-align: center;
                line-height: 0.73rem;
                border-radius: 0.08rem;
                margin: 0 0 0 1.5rem;
                }
            }
            .vux-badge{
                position: absolute;
                right: .1rem;
                top: .8rem;
            }
        }
    }
</style>
