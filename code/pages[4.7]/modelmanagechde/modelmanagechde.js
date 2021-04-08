// pages/modelmanagechde/modelmanagechde.js

let id = "";
let name = "";
let battery = "";
let chip = "";
let screen = "";
let cache = "";
let fcamera = "";
let rcamera = "";
let price = "";

Page({
  onLoad(options) {
    id = options.id;
    console.log(options.id);
    this.getList()
  },
  getList() {
    wx.cloud.database().collection("model").doc(id).get()
      .then(res => {
        console.log("请求成功", res)
        this.setData({
          detail: res.data,
          name: res.data.name,
          battery: res.data.battery,
          chip: res.data.chip,
          screen: res.data.screen,
          cache: res.data.cache,
          fcamera: res.data.fcamera,
          rcamera: res.data.rcamera,
          price: res.data.price
        })
      })
      .catch(res => {
        console.log("请求失败", res)
      })
  },
  //获取用户输入的新电池容量
  getBattery(e) {
    battery = e.detail.value
    // console.log(name)
  },

  //获取用户输入的新型号
  getName(e) {
    name = e.detail.value
    console.log(name)
  },

  //获取用户输入的新芯片
  getChip(e) {
    chip = e.detail.value
  },

  //获取用户输入的新屏幕大小
  getScreen(e) {
    screen = e.detail.value
  },

  //获取用户输入的新储存
  getCache(e) {
    cache = e.detail.value
    console.log(e)
  },

  //获取用户输入的新前置像素
  getFcamera(e) {
    fcamera = e.detail.value
  },

  //获取用户输入的新后置像素
  getRcamera(e) {
    rcamera = e.detail.value
  },

  //获取用户输入的价格
  getPrice(e) {
    price = e.detail.value
  },

  //修改参数数据
  updateName(e) {
    console.log("新的商品名字", name)
    console.log("新的商品电池", battery)
    console.log("新的后置像素", rcamera)

    if (name == "") {
      console.log("型号为空，请输入！")
      wx.showToast({
        icon: 'none',//把提示框的对勾去掉
        title: '手机型号未填写哦'
      })
    } else {
    //云函数更新商品价格
    //调用云函数updateData
    wx.cloud.callFunction({
      name: "updateData",
      //云函数传参data   
      data: {
        id: id,
        name: name,
        battery: parseInt(battery),
        chip:chip,
        screen:screen,
        cache:cache,
        fcamera:fcamera,
        rcamera:rcamera,
        price: parseInt(price)
      }
    })
      .then(res => {
        console.log("调用云函数成功", res)
        this.getList()
      })
      .catch(res => {
        console.log("调用云函数失败", res)
      })
    }
  },
  // //删除操作
  // shanchu() {
  //   console.log("点击了删除按钮", id);
  //   wx.showModal({
  //     title: '是否确定删除',
  //     content: '您再仔细考虑，是否真的要删除？',
  //     success(res) {
  //       if (res.confirm == true) {//用户点击了确认
  //         console.log("用户点击了确认",id);
  //         //删除操作
  //         wx.cloud.callFunction({
  //           name: "removeData",
  //           data: {
  //             id: id
  //           }
  //         })
  //           .then(res => {
  //             console.log("删除成功")
  //             wx.navigateTo({
  //               url: '/pages/seriesmanage/seriesmanage',
  //             })
  //           })
  //           .catch(res => {
  //             console.log("删除失败", res)
  //           })
  //       } else if (res.cancel == true) {//用户点击了取消
  //         console.log("用户点击了取消");
  //       }
  //     }
  //   })
  // }
})