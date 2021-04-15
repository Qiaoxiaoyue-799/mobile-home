// pages/adminmanagede/adminmanagede.js
let name = "";
let id = "";
// let usernameqj = 
Page({
  data:{
    username:"123",
    detail:[]
  },
  onLoad(options) {
    // id=options.id;
    // console.log(options.id);
    console.log(this.data.username)

    // var that = this;
    //获取名字
    wx.getStorage({
      key: 'name',
      success:res=>{
        console.log(res.data)
        // usernameqj=res.data;
        // console.log("全局变量"+usernameqj)
        // this.setData({
        //   username:"456"
        // })
        this.getList(res.data);
      }
    })
    // console.log(this.data.username)
  },
  getList(data){
    var that = this;
    wx.cloud.database().collection("admin")
    .where({
      name:data
    }).get()
    .then(res => {
      console.log("请求成功", res.data)
      this.setData({
        detail: res.data[0]
      })
      console.log("detail",that.data.detail)
    })
    .catch(res => {
      console.log("请求失败", res)
    })
  },
  goDetail(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/adminmanagechde/adminmanagechde?id=' + e.currentTarget.dataset.id,
    })
  },
  
})