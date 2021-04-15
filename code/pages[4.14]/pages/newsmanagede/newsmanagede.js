// pages/newsmanagede/newsmanagede.js
let id = "";
Page({
  onLoad(options) {
    id=options.id;
    // console.log(options.id);
    wx.cloud.database().collection("news").doc(options.id).get()
      .then(res => {
        // console.log("请求成功", res)
        this.setData({
          detail: res.data
        })
      })
      .catch(res => {
        console.log("请求失败", res)
      })
  },
  goDetail(e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/newsmanagechde/newsmanagechde?id=' + e.currentTarget.dataset.id,
    })
  },
})