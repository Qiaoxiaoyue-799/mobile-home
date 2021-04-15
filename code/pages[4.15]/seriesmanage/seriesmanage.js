// pages/modelmanage/modelmanage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    detail:[]
  },
  onLoad(options) {
    console.log(options);
    wx.cloud.database().collection("model")
      .where({
        brand: options.brand,
        series_only:"true"
      })
    .get()
      .then(res => {
        this.setData({
          list: res.data
        })
      })
      .catch(res => {
        console.log("请求失败", res)
      })
  },

  // onLoad() {
  //   wx.cloud.database().collection("model")
  //     .where({
  //       brand:"华为"
  //     })
  //     .get()
  //     .then(res => {
  //       console.log("请求成功", res.data)
  //       this.setData({
  //         list: res.data
  //       })
  //     })
  //     .catch(res => {
  //       console.log("请求失败", res.data)
  //     })
  // },

  goDetail(e){
    console.log("跳转详情", e);
    // console.log("跳转详情", e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/modelmanage/modelmanage?series=' + e.currentTarget.dataset.series + '&id=' + e.currentTarget.dataset.id
      // url: '/pages/modelmanage/modelmanage'
    })
  }

})