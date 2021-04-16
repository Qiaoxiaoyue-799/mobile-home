let id = "";
let series = "";
Page({
  onLoad(options) {
    id=options.id;
    console.log("options" + options.id);
    console.log(options.series);
    console.log(options.brand);
    wx.cloud.database().collection("model")
    .where({
      brand:options.brand,
      series: options.series
    })
    .get()
      .then(res => {
        console.log("请求手机型号成功", res)
        this.setData({
          model: res.data
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
      url: '/pages/modelmanagedetail/modelmanagedetail?id=' + e.currentTarget.dataset.id,
    })
  },
  //删除操作
  shanchu(e) {
    console.log(e.currentTarget.dataset);
    id = e.currentTarget.dataset.id;
    series = e.currentTarget.dataset.series;
    console.log("点击了删除按钮", id,series);
    wx.showModal({
      title: '是否确定删除',
      content: '您再仔细考虑，是否真的要删除？',
      success(res) {
        if (res.confirm == true) {//用户点击了确认
          console.log("用户点击了确认", id);
          //删除操作
          wx.cloud.callFunction({
            name: "removeData",
            data: {
              id: id
            }
          })
            .then(res => {
              console.log("删除成功",res)
              wx.navigateTo({
                url: '/pages/modelmanage/modelmanage?series='+series,
              })
            })
            .catch(res => {
              console.log("删除失败", res)
            })
        } else if (res.cancel == true) {//用户点击了取消
          console.log("用户点击了取消");
        }
      }
    })
  }
})