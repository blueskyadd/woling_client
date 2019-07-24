<template>
  <div class="chenge_child">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" ref="DOMS" v-for="item in childData" :id="item.id" :key="item.id">
          <p>{{item.name}}</p>
          <img src="../../assets/img/football-star.png" alt />
        </div>
      </div>

      <div class="swiper-pagination" @click="goIndex">进入沃凌</div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="goOut_woling" v-on:click="CoBack"><img src="../../assets/img/exit.png" alt=""></div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
    name:'changeChild',
  data() {
    return {
      childData: [ ],
      activeIndex: 0
    };
  },
  created(){
      this.getStatent()
  },
  mounted() {
      var that = this
    new Swiper(".swiper-container", {
      initialSlide: 0,
      slidesPerView: 3,
      spaceBetween: -10, //mange
      centeredSlides: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      on: {

        slideChangeTransitionStart: function () {
          console.log(this.activeIndex)
          that.activeIndex = this.activeIndex
        },
      }
    });

  },
  methods:{
      goIndex(){
        this.$http.get(this.$conf.env.SelectSon + this.$refs.DOMS[this.activeIndex].id)
          .then(res => {
            sessionStorage.setItem('jp_token', res.data.token)
            console.log(res.data)
            this.$router.push({
              name:"index"
            })
          })
          .catch(err => {
            // this.$loading.close();
            this.$toast.center('网络错误');
          });
      },
    getStatent(){
        this.childData = this.$route.params.data
    },
    CoBack(){
      sessionStorage.removeItem("jp_token");
      localStorage.clear();
      this.$router.push({ name:"loging"})
    },
  }
};
</script>
<style lang="scss" scoped>
@import "swiper/dist/css/swiper.css";
.chenge_child {
  height: 100%;
  background: #041424;
  .swiper-container {
    // width: 100%;
    height: 100%;
    background: #041424;
    margin: 0 1.63rem;
  }
  .swiper-slide {
    text-align: center;
    background: #041424;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition: 150ms;
    color: #9efcfe;
    display: flex;
    flex-direction: column;
    font-family: FZSEJW--GB1-0;
    font-weight:400;
    // width: 35%;
    img {
      width: 110%;
    }
    p{
        padding-bottom: .29rem;
        font-size: .3rem;
    }
  }
  .swiper-slide-active {
    //   width:
    background: #041424 url(../../assets/img/childactive.png) 49% 7%/320% 85% !important;
    img {
        margin-left: .39rem;
        width: 100%;
        margin-bottom: -.6rem;
    }
    p{
        padding-bottom: .24rem;
         font-size: .25rem;
    }
  }
  .swiper-slide:not(.swiper-slide-active) {
    transform: scale(0.8);
  }
  .swiper-button-prev {
    background-image: url(../../assets/img/left.png);
  }
  .swiper-button-next {
    background-image: url(../../assets/img/right.png);
  }
  .swiper-pagination {
    bottom: 0.35rem;
    height: 0.84rem;
    width: 3.6rem;
    background: #587eaa;
    color: #9efeff;
    display: flex;
    justify-content: center;
    font-family: FZSEJW--GB1-0;
    align-items: center;
    font-size: 0.33rem;
    border-radius: 0.42rem;
    left: 0;
    margin: auto;
    right: 0;
  }
  .goOut_woling{
    position: absolute;
    width: .31rem;
    height: .31rem;
    top: .3rem;
    right: .44rem;
    img{
        height: 100%;
    }
  }
}
</style>
