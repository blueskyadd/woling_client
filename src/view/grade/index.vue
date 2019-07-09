
<template>
    <div class="grade_index">
        <headerTitle :title="headerTitle" :isUpload = 'false'/>
        <div class="main">
          <aside>

          </aside>
          <section>

          </section>
        </div>
    </div>
</template>
<script>
import headerTitle from "../../components/header";
export default {
    name:'gradeIndex',
    components:{headerTitle},
    data(){
        return{
            headerTitle: '成就',
        }
    },
}
</script>
<style lang="scss" >
    .grade_index{
        background: url(../../assets/img/bj1.png)  0 0 / 100% 100% ;
        width: 100%;
        height:100%;
        .main{
          width: 100%;
          height: calc(100% - .64rem);
          overflow: hidden;
        }
    }
</style>
