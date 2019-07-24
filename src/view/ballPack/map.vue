<template>
    <div class="map">
        <headerTitle title="地图"/>
        <div class="main">
            <div id="allmap"></div>
            <div class="path">
                <a @click="goBack">到这里去</a>
            </div>
        </div>
    </div>
</template>
<script>
import headerTitle from "../../components/header";
export default {
  name:'map',
  components: {headerTitle},
  data(){
      return{
          setHref:''
      }
  },
  methods: {
        loadmap(){
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(116.331398,39.897445);
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);              // 将标注添加到地图中
            map.centerAndZoom(point,12);
            // 创建地址解析器实例
            var myGeo = new BMap.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            var vm =this
            myGeo.getPoint(vm.$route.params.address, function(point){
                if (point) {
                    var opts = {
                        width : 200,     // 信息窗口宽度
                        height: 100,     // 信息窗口高度
                        title : vm.$route.params.title , // 信息窗口标题
                        enableMessage:true,//设置允许信息窗发送短息
                        message:""
                    }
                    var infoWindow = new BMap.InfoWindow("地址:"+vm.$route.params.address, opts);  // 创建信息窗口对象        
                    map.openInfoWindow(infoWindow,point); //开启信息窗口


                    map.centerAndZoom(point, 16);
                    map.addOverlay(new BMap.Marker(point));
                }else{
                    alert("您选择地址没有解析到结果!");
                }
            },this.$route.params.city);
        },
        goBack(){
            this.$loading('');
            //如果还知道其他地图的包名，也可以放这个数组里
            var mapsPackageNames = ['com.baidu.BaiduMap', 'com.autonavi.minimap', 'com.tencent.map'];
            var vm = this
            this.operationAfterCheckInstall(mapsPackageNames, function() {
                vm.$loading.close();
                var dst = new plus.maps.Point(46.1757500000,129.4252800000); // 目的地 
                var src = new plus.maps.Point(); // 起始地 可以不填
                plus.maps.openSysMap(dst, vm.$route.params.address , src);
            }, function() {
                vm.$loading.close();
                alert("您未安装百度地图、高德地图、腾讯地图,请前往应用市场下载");
            })
        },
        operationAfterCheckInstall(mapsPackageNames, success, fail) {
            var vm = this
            var res = mapsPackageNames.map(function(item) {
                return vm.isInstall(item);
            })

            if (eval(res.join("||"))) {
                success();
            } else {
                fail();
            }
        },
        isInstall(packageName) { 
            try {
                var main = plus.android.runtimeMainActivity();
                var packageManager = main.getPackageManager();
                var PackageManager = plus.android.importClass(packageManager);
                var packageinfo = packageManager.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES)
                if (packageinfo) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        },
    },
    mounted() {
        this.loadmap();
    },
}
</script>
<style lang="scss" scoped>
.map{
    width: 100%;
    height: 100%;   
    .main{
         width: 100%;
        height: calc(100% - 0.64rem);
        overflow: hidden;
        #allmap{
            width: 100%;
            height: 100%; 
            .BMap_cpyCtrl {
            display: none;
            }
            .anchorBL {
                display: none;
            }
        }
        .path{
            position: absolute;
            background: linear-gradient(0deg, #2d4979 0%, #233354 100%);
            right: 0;
            bottom: 0;
            width: 3rem;
            display: flex;
            height: .7rem;
            border-radius: .1rem;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
    }
}
</style>
