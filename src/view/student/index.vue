
<template>
    <div class="student_Detail">
        <headerTitle :title="headerTitle" :isUpload = 'false'/>
        <div class="main">
            <sideBar :leftList='leftList' @change="getStudentList" :setIndex='setIndex'/>
            <div class="selete_main" >

            </div>
        </div>
    </div>
</template>
<script>
import headerTitle from "../../components/header";
import sideBar from "../../components/sidebar"
import mianList from '../../components/mainList'
export default {
    components:{headerTitle, sideBar, mianList},
    data(){
        return{
            headerTitle: '学员',
            leftList:[
              {
                id:1,
                name:'sdsd'
              },
              {
                id:0,
                name:'vddv'
              }
            ],
            loading: false,//全屏Loading
            setIndex:0
        }
    },
    methods: {
        /**@name获取班级名称列表 */
        getStudentList(data){
            this.headerTitle = data.item.name + '学员'
            this.setIndex = data.index
        }

    },
    mounted(){
    }
}
</script>
<style lang="scss" >
    .student_Detail{
        background: url(../../assets/img/bj1.png)  0 0 / 100% 100% ;
        width: 100%;
        height:100%;

        .main{
            width: 100%;
            height: calc(100% - .64rem);
            overflow: hidden;
           .selete_main{
               padding: .4rem .4rem .38rem .5rem;
               width: calc(100% -  1.4rem);
               float: left;
               height: 100%;
               overflow-y: scroll;

           }
           .selete_main::-webkit-scrollbar {
                display: none;
            }
        }
    }
</style>
