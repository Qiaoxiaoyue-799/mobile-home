// pages/adminmanage/adminmanage.js
Page({
  onLoad(option) {
    // var showDialog = getApp().globalData.showDialog;
    // console.log( showDialog);
    console.log("option:",option);
    wx.cloud.database().collection("admin")
    .get()
    .then(res => {
      // console.log("请求手机型号成功", res)
      this.setData({
        admin: res.data
      })
    })
    .catch(res => {
      console.log("请求失败", res)
    })
    let that=this;
    //获取名字
    wx.getStorage({
      key: 'name',
      success:function(e){
        console.log(e.data)
        that.setData({
          username:e.data,
        })
      }
    })

  },
  goDetail(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/adminmanagede/adminmanagede?id=' + e.currentTarget.dataset.id,
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
            name: "removeDataAdmin",
            data: {
              id: id
            }
          })
          .then(res => {
            console.log("删除成功",res)
                wx.cloud.database().collection("admin")
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