Page({
  data: {
    list: []
  },
  getList(){
    wx.cloud.database().collection("goods").get()
      .then(res => {
        // console.log("请求成功",res.data)
        wx.stopPullDownRefresh();//请求成功停止刷新动画
        this.setData({
          list: res.data
        })
      })
      .catch(res => {
        console.log("请求失败", res.data)
      })
  },
  onLoad() {
    wx.startPullDownRefresh();//启动刷新动画
    this.getList()
  },

  onPullDownRefresh(){
    console.log("下拉刷新的监听");//自带刷新动画
    this.getList();
  }

})