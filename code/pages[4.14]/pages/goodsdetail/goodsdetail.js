// pages/goodsdetail/goodsdetail.js
Page({
  onLoad(options){
    // console.log(options.id);
    wx.cloud.database().collection("goods").doc(options.id).get()
    .then(res=>{
      console.log("请求成功",res)
      this.setData({
        detail:res.data
      })
    })
    .catch(res=>{
      console.log("请求失败",res)
    })
  }
})