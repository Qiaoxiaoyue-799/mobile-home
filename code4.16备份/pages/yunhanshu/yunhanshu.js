// pages/yunhanshu/yunhanshu.js
Page({
  onLoad() {
    //云函数的获取数据  上限100条
    wx.cloud.callFunction({
      name:"getData"
    })
    .then(res => {
      console.log("云函数获取数据成功",res)
      this.setData({
        openid : res.result.openid
      })
    })
    .catch(res => {
      console.log("云函数获取数据失败",res)
    })

    //数据库获取数据   上限20条
    wx.cloud.database().collection("num").get()
    .then(res => {
      console.log("数据库获取数据成功", res)
    })
    .catch(res => {
      console.log("数据库获取数据失败", res)
    })



    //用云函数做简单的加法运算
    wx.cloud.callFunction({
      name: "addData",
      data:{
        a:1,
        b:1
      }
    })
      .then(res => {
        console.log("加法成功", res.result)
      })
      .catch(res => {
        console.log("加法失败", res)
      })
  }

  

})