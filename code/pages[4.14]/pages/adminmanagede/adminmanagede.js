// pages/adminmanagede/adminmanagede.js
let name = "";
let id = "";
Page({
  onLoad(options) {
    id=options.id;
    console.log(options.id);
    wx.cloud.database().collection("admin").doc(options.id).get()
      .then(res => {
        console.log("请求成功", res)
        this.setData({
          detail: res.data
        })
      })
      .catch(res => {
        console.log("请求失败", res)
      })
  },
  goDetail(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/adminmanagechde/adminmanagechde?id=' + e.currentTarget.dataset.id,
    })
  },
  
})