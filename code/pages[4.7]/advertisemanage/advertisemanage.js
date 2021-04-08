// pages/advertisemanage/advertisemanage.js
Page({
  onLoad() {
    wx.cloud.database().collection("advertise")
      .get()
      .then(res => {
        console.log("请求成功", res.data)
        this.setData({
          list: res.data
        })
      })
      .catch(res => {
        console.log("请求失败", res.data)
      })
  },

})