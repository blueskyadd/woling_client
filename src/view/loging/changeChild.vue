<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      <div class="swiper-slide">Slide 4</div>
      <div class="swiper-slide">Slide 5</div>
      <div class="swiper-slide">Slide 6</div>
    </div>
  </div>


</template>
<script>
  import Swiper from 'swiper';
  export default {
    components:{Swiper},
    mounted(){
      new Swiper('.swiper-container', {
        initialSlide:1,
        slidesPerView: 3,     //没页展示几个
        spaceBetween: 30,    //每个盒子的右侧margin值
        centeredSlides: true,
      });





    }
  }
</script>
<style lang="scss" scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

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
    transition: 300ms;
  }
  .swiper-slide:not(.swiper-slide-active){
    transform: scale(0.8);
  }
</style>
