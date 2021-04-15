// pages/advertisemanage/advertisemanage.js
Page({
  onLoad() {
    wx.cloud.database().collection("advertise")
      .get()
      .then(res => {
        console.log("请求成功", res)
        this.setData({
          list: res.data
        })
      })
      .catch(res => {
        console.log("请求失败", res.data)
      })
  },
  goDetail(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/advertisemanagede/advertisemanagede?id=' + e.currentTarget.dataset.id,
    })
  },
  delData(e){
    console.log(e.currentTarget.dataset);
    let id = e.currentTarget.dataset.id;
    console.log("点击了删除按钮", id);
    wx.showModal({
      title: '是否确定删除',
      content: '您再仔细考虑，是否真的要删除？',
      success:res=>{
        if (res.confirm == true) {//用户点击了确认
          console.log("用户点击了确认", id);
          //删除操作
          wx.cloud.callFunction({
            name: "removeDataAdvertise",
            data: {
              id: id
            }
          })
          .then(res => {
            console.log("删除成功",res)
                wx.cloud.database().collection("advertise")
                .get()
                .then(res => {
                  console.log("请求成功", res)
                  this.setData({
                    list: res.data
                  })
                })
                .catch(res => {
                  console.log("请求失败", res.data)
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