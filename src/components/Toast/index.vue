<!--  Tost Loading 组件，供全局使用-->
<template>
    <div>
        <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="Hello World" :position="position">{{ $t('Basic Usage') }}</toast>
        <loading :show="isLoading" :text="text1"></loading>
    </div>
</template>
<script>
import { Toast, Loading} from 'vux'
export default {
    components: {Toast, Loading},
    data(){
        return{
            showPositionValue: false
        }
    }
    
}
</script>
<style lang="scss" scoped>

</style>
