// pages/skip/skip.js
Page({
  onLoad(){
    wx.cloud.database().collection('num')
    .limit(2)
    .skip(2)
    .get()
    .then(res=>{
      console.log("请求成功",res.data)
    })
    .catch(res => {
      console.log("请求失败")
    })
  }
})