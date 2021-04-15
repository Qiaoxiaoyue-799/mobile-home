// app.js
App({
  //小程序一启动就会执行【云开发环境初始化】
  onLaunch() {
    // console.log('小程序开始启动啦！');
    wx.cloud.init({
      env:'mobile-home-jjq4l'//云开发环境ID
    })
  }
})
