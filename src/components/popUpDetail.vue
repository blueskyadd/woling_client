<template>
    <div class="popup_detail">
      <popup v-model="isDetail" height="270px" is-transparent >
        <div class="detail_box">
            <header>{{detailName}} <img @click="isDetail = false" src='../assets/img/close.png'/> </header>
            <!-- <div class="detail_main">
                <div v-if="!detailData.good_details"><img :src="detailData.front_image" alt=""></div>
                <div v-else>
                    <swiper :list="detailData.good_details" height="4.93rem" :min-moving-distance="12" dots-position="center" :auto='true' :loop='true'></swiper>
                </div>
                <div>
                    <span>{{detaiilTitle}}</span>
                    <div>{{detailData.desc}}</div>
                </div>
            </div> -->
            <slot></slot>
        </div>
      </popup>
    </div>
</template>
<script>
import { Popup, Swiper} from 'vux';
export default {
    name:'popupDetail',
    components: { Popup, Swiper },
    props:{
        detailName: String,
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
<style lang="scss">

.popup_detail{
    .vux-popup-dialog{
        top: .78rem;
        height: 100%!important;
        .detail_box{
            width: 76%;
            background-color:#fff;
            height: 6rem;
            margin: 0 auto;
            border-radius:.2rem;
            background:  url(../assets/img/coachDetailbg.png)  0 0 / 100% 100%;
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
                    .vux-img{
                        background-size: cover;
                    }
                    .vux-icon-dot{
                        width: .34rem;
                        height: .08rem;
                    }
                    .active{
                        background-color: #FFD100 !important;
                    }
                    .vux-indicator{
                        width: 100%;
                        display: flex;
                        justify-content: center;
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
