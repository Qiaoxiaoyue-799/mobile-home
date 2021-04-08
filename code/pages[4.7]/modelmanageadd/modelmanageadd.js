// pages/modelmanageadd/modelmanageadd.js

let id = "";
let name = "";
let battery = "";
let chip = "";
let screen = "";
let cache = "";
let fcamera = "";
let rcamera = "";
let price = "";
let brand = "";
let series = "";

Page({
  onLoad(){},

  //获取用户输入的新电池容量
  getBrand(e) {
    brand = e.detail.value
    // console.log(name)
  },

  //获取用户输入的新电池容量
  getSeries(e) {
    series = e.detail.value
    // console.log(name)
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

  //添加商品到数据库
  addModel(e) {
    console.log('商品名', name)
    console.log('商品价格', price)
    if (name == "") {
      wx.showToast({
        icon: 'none',//把提示框的对勾去掉
        title: '商品名为空'
      })
    } else if (price == "") {
      wx.showToast({
        icon: 'none',//把提示框的对勾去掉
        title: '价格为空'
      })
    } else {
      //添加操作
      console.log("可以进行添加操作啦");
      wx.cloud.database().collection('model')
        .add({
          data: {
            brand:brand,
            series:series,
            name: name,
            battery: parseInt(battery),
            chip: chip,
            screen: screen,
            cache: cache,
            fcamera: fcamera,
            rcamera: rcamera,
            price: parseInt(price)
          }
        })
        .then(res => {
          console.log("添加成功", res)
          // this.getList()
        })
        .catch(res => {
          console.log("添加失败",res)
        })
    }

  },
})