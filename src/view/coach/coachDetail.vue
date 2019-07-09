<template>
    <div class="coach_detail">
      <popup v-model="isDetail" height="270px" is-transparent >
        <div class="detail_box">
            <header>{{detailData.name}} <img @click="isDetail = false" src='../../assets/img/close.png'/> </header>
            <div class="detail_main">
                <div><img :src="detailData.front_image" alt=""></div>
                <div>
                    <span>教练简介</span>
                    <div>{{detailData.coach}}</div>
                </div>
            </div>
        </div>
      </popup>
    </div>
</template>
<script>
import { Popup, Group, } from 'vux';
export default {
    components: { Popup, Group },
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
.coach_detail{
    .vux-popup-dialog{
        top: .78rem;
        height: 100%!important;
        .detail_box{
            width: 76%;
            background-color:#fff;
            height: 6rem;
            margin: 0 auto;
            border-radius:.2rem;
            background:  url(../../assets/img/coachDetailbg.png)  0 0 / 100% 100%;
            header{
                color: #fff;
                font-size: .3rem;
                height: .64rem;
                justify-content: center;
                align-items: center;
                display: flex;
                position: relative;
                img{
                    position: absolute;
                    top: .14rem;
                    right: .4rem;
                    width: .5rem;
                    height: .5rem;
                }
            }
            .detail_main{
                display: flex;
                padding: .18rem .2rem;
                height: calc(100% - .64rem);
                div:first-child{
                    width: 2.72rem;
                    margin-right: .39rem;
                    border-radius: .08rem;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                div:last-child{
                    span{
                        color: #00F0FF;
                        font-family:SimHei;
                        font-weight:400;
                        font-size: .26rem;
                    }
                    div{
                        font-family:SimHei;
                        font-weight:400;
                        color:rgba(206,240,245,1);
                        font-size: .24rem;
                        line-height: .3rem;
                    }
                }

            }
        }
    }
}
</style>
