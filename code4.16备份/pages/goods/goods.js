// pages/goods/goods.js
Page({
  data:{
    list:[]
  },
  onLoad(){
    wx.cloud.database().collection("goods").get()
    .then(res=>{
      // console.log("请求成功",res.data)
      this.setData({
        list:res.data
      })
    })
    .catch(res=>{
      console.log("请求失败",res.data)
    })
  },

  goDetail(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/goodsdetail/goodsdetail?id=' + e.currentTarget.dataset.id,
    })
  }
})