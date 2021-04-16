// pages/newsmanagede/newsmanagede.js
let id = "";
Page({
  changeData: function (e) {
    console.log("进入change")
    this.onLoad(e);//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },
  onLoad(options) {
    console.log("进入onload")
    // var id="";
    id=options.id;
    console.log(options)
    console.log(id);
    wx.cloud.database().collection("news").doc(id).get()
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
  // onShow: function (e) {
  //   this.onLoad(e)
  // },
  goDetail(e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/newsmanagechde/newsmanagechde?id=' + e.currentTarget.dataset.id,
    })
  },
})