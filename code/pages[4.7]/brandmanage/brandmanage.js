// 品牌管理
Page({
  data: {
    list: []
  },

  onLoad() {
    wx.cloud.database().collection("model")
      .where({
        brand_only: "true"
      })
      .get()
      .then(res => {
        // console.log("请求成功", res.data)
        this.setData({
          list: res.data
        })
      })
      .catch(res => {
        console.log("请求失败", res.data)
      })
  },

  // goDetail(e){
  //   console.log("跳转详情",e);
  //   wx.navigateTo({
  //     url: '/pages/modelmanage/modelmanage?id=' + e.currentTarget.dataset.id
  //   })
  // }

})