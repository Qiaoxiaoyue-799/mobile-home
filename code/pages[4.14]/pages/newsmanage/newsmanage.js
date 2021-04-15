// pages/newsmanage/newsmanage.js
let searchText="";
Page({
  data:{
    config:{
      show1:"block",
      show2:"none"
    }
  },
  onLoad() {
    wx.cloud.database().collection("news")
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
      url: '/pages/newsmanagede/newsmanagede?id=' + e.currentTarget.dataset.id,
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
            name: "removeDataNews",
            data: {
              id: id
            }
          })
          .then(res => {
            console.log("删除成功",res)
                wx.cloud.database().collection("news")
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
  },
  getSearch(e){
    searchText = e.detail.value;
    console.log("内容：",searchText)
  },
  goSearch(e){
    console.log("点击了搜索")
    var that=this
    // 关键词搜索
    const db = wx.cloud.database()
    const newsSearch = db.collection('news')
    newsSearch.where({
      content: {
        $regex: '.*' + searchText + '.*',
        $options: '1'
      }
    }).get({
      success: res => {
        console.log('匹配', res)
        if (res.data.length == 0) {
          wx.showModal({
            title: '提示',
            content: '暂时没找到对应答案',
            showCancel: false,
            success: function (res) { }
          })
          return;
        }else{
          that.setData({
            obj: res.data,
            config: {
              show1:"none",
              show2:"block"
            }
          })
        }
      }
    })
  }
})