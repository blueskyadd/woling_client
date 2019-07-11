// const winchaingroupApi = "https://www.bmeauto.cn";
const winchaingroupApi = "http://94.191.15.122/";


module.exports = {
    //登录
    login: winchaingroupApi + 'user/apps/login/',//客户端app
    SelectSon:winchaingroupApi + 'user/apps/login/?id=',//选孩子
    sms_code: winchaingroupApi + 'user/sms_code/',//发送短信验证码
    change_pwd: winchaingroupApi + 'user/app/change_pwd/',//修改密码

    //个人信息
   userinfo: winchaingroupApi + 'user/apps/data/3/', //个人信息


    //主推热点
    getActivityList:winchaingroupApi + 'good/apps/activity/',  //主推热点列表
    getActivelyDetail: winchaingroupApi + 'good/apps/activity/',//主推热点详情

    //课程
    getClassList:winchaingroupApi + 'good/apps/course/?status=0&city=',  //课程详情
    getClassDetail:winchaingroupApi + 'good/apps/course/',  //课程详情

      //首页
    isSingIn: winchaingroupApi+ "user/apps/sign/",  //判断学生是否需要签到

        //商城
    ShoppIngList:winchaingroupApi + 'good/apps/goods/?goods_type=',   //商品列表,
    ShppingDetail: winchaingroupApi + 'good/apps/goods/',   //商品详情
}
