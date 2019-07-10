<template>
  <div class="auditionBig">
    <headerTitle :title="headerTitle" :isUpload = 'false' :isLocation='false'/>
    <div class="Menu">
      <sideBar :leftList='leftList' @change="getStudentList" :setIndex='setIndex'/>
      <div class="MenuRight">
      </div>
    </div>
  </div>
</template>

<script>
  import headerTitle from "../../components/header";
  import sideBar from "../../components/sidebar"
    export default {
      components:{headerTitle,sideBar},
        name: "index",
      data(){
        return{
          headerTitle:"课程",
          leftList:[
            {
              id:0,
              name:'射门课程'
            },
            {
              id:1,
              name:'运动课程'
            }
          ],
          setIndex:0,
        }
      },
      methods: {
        /**@name获取班级名称列表 */
        getStudentList(data){
          this.headerTitle = data.item.name + '学员'
          this.setIndex = data.index
        }

      },
    }
</script>

<style scoped lang="scss">
  @import "../../assets/style/AllStyle";
  .auditionBig{
    width: 100%;
    height: 100%;
    background: url(../../assets/img/bj1.png)  0 0 / 100% 100% ;
    .Menu{
      width: 100%;
      height: calc(100% - .64rem);
      overflow: hidden;
      display: inline-flex;
      .MenuRight{
        flex: 1;
        height: 100%;
        padding: .2rem .16rem .18rem .18rem;
        box-sizing: border-box;
      }
    }
  }
</style>
