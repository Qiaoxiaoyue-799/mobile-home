// pages/modelmanage/modelmanage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  onLoad() {
    wx.cloud.database().collection("model").get()
      .then(res => {
        console.log("请求成功",res.data)
        this.setData({
          list: res.data
        })
      })
      .catch(res => {
        console.log("请求失败", res.data)
      })
  },

})