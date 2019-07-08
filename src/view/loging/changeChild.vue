<template>
    <swipe class="my-swipe">
        <swipe-item class="slide1">1</swipe-item>
        <swipe-item class="slide2">2</swipe-item>
        <swipe-item class="slide3">3</swipe-item>
    </swipe>
</template>
<script>
import { Swipe, SwipeItem } from 'vue-swipe';
export default {
    components:{Swipe, SwipeItem}
    
}
</script>
<style lang="scss" scoped>
@import 'vue-swipe/dist/vue-swipe.css';
.my-swipe {
  height: 200px;
  color: #000;
  font-size: 30px;
  text-align: center;
}
</style>
