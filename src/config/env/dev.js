// const winchaingroupApi = "https://www.bmeauto.cn";
// const winchaingroupApi = "http://10.102.100.23:8080/";
const winchaingroupApi = "http://94.191.15.122/";


module.exports = {
    //登录
    login: winchaingroupApi + 'user/apps/login/',//客户端app
    SelectSon:winchaingroupApi + 'user/apps/login/?id=',//选孩子
    sms_code: winchaingroupApi + 'user/sms_code/',//发送短信验证码
    change_pwd: winchaingroupApi + 'user/app/change_pwd/',//修改密码

    //个人信息
   userinfo: winchaingroupApi + 'user/apps/data/3/', //个人信息--学生数据 
   getUserinfo: winchaingroupApi + 'user/apps/info/1/ ',//学生信息
   getrankingDetail: winchaingroupApi + 'user/apps/ranking/',//学生排行榜 详情
   getVistitList: winchaingroupApi + 'user/apps/visit/',// 访问者


    //主推热点
    getActivityList:winchaingroupApi + 'good/apps/activity/',  //主推热点列表
    getActivelyDetail: winchaingroupApi + 'good/apps/activity/',//主推热点详情


    //试听
    getAuditionList: winchaingroupApi + 'good/apps/course/?city=',//课程试听列表
    getAuditionTime: winchaingroupApi + 'good/apps/coursetime/?course=',//试听课程上课时间
    setappoint: winchaingroupApi + 'order/apps/appoint/',//试听课程 确认试听
    //课程
    getClassList:winchaingroupApi + 'good/apps/course/?status=1&city=',  //课程详情
    getClassDetail:winchaingroupApi + 'good/apps/course/',  //课程详情
    getCourseBuy: winchaingroupApi + 'order/apps/course/',//课程购买

    //首页
    isSingIn: winchaingroupApi+ "user/apps/sign/",  //判断学生是否需要签到
    rankingList: winchaingroupApi + 'user/apps/ranking/',//学生排行榜
    getCounselor: winchaingroupApi + 'user/apps/counselor/',//客户顾问

    //教练
    getCoachList: winchaingroupApi + 'good/apps/pitch/',//球场教练列表

    //勋章
    getMedalList: winchaingroupApi + 'order/apps/medal/',//勋章

    //成就
    getAchievement: winchaingroupApi + 'assess/apps/ability/1/?now=now',// 最新成就
    getAbilityTime: winchaingroupApi + 'assess/apps/ability/',//成就历史

    //教练
    getVideolist: winchaingroupApi + 'good/apps/video/',//练习教练视频
    getSeleVideoList: winchaingroupApi + 'good/apps/svideo/',//练习个人视频
    getClassVideo: winchaingroupApi + 'good/apps/video/1/',//需上传视频列表
    uploadvideo: winchaingroupApi + 'good/apps/svideo/',// 上传视频

    //订单  
    getClassifyList: winchaingroupApi + 'order/apps/order/?classify=',//订单列表
    getPitchList: winchaingroupApi + 'order/apps/pitch/',//球场订单详情
    getProjectDetail: winchaingroupApi + 'order/apps/goods/',//商品订单详情
    
    //球场  
    getPitchListDetail: winchaingroupApi + 'good/apps/pitch/',//球场订单详情
    getPitchListData: winchaingroupApi + 'good/apps/pitch/?status=1&area=',//球场列表
    getPicthTimeList: winchaingroupApi + 'good/apps/pitch_days/?store=',//球场日期
    getday_timeList: winchaingroupApi + 'good/apps/day_time/?day=',//球场日期时间段
    setOrderBallPack: winchaingroupApi + 'order/apps/pitch_order/',// 球场订单创建


    //课表
    getCourselist: winchaingroupApi + 'order/apps/courselist/',//学生课程列表
    getCourseDetail: winchaingroupApi + 'good/apps/lesson/?lesson__course=',//课程课表 todo
    //商城
    ShoppIngList:winchaingroupApi + 'good/apps/goods/?goods_type=',   //商品列表,
    ShppingDetail: winchaingroupApi + 'good/apps/goods/',   //商品详情    
    getcart_nums: winchaingroupApi +  'order/apps/cart_nums/',//购物车数量

    //购物车
    AddShoppCart:winchaingroupApi + 'order/apps/cart/',  //商品加入购物车
    deleteCartData: winchaingroupApi + 'order/apps/choice/',//购物车多个删除    
    ShoppCartList:winchaingroupApi + 'order/apps/cart/',   //购物车列表
    ShoppPuy:winchaingroupApi + 'order/apps/goods/',   //购物车购买
    WxPayment:winchaingroupApi + 'order/apps/pay/',   //购物车支付--微信支付
    
}
