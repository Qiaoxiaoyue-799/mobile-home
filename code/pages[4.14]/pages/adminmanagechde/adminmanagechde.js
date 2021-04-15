// pages/adminmanagechde/adminmanagechde.js

let id = "";
let name = "";
let gender = "";
let mail = "";
let tele = "";

Page({
  onLoad(options) {
    id = options.id;
    console.log(options.id);
    this.getList()
  },
  getList() {
    wx.cloud.database().collection("admin").doc(id).get()
      .then(res => {
        console.log("请求成功", res)
        this.setData({
          detail: res.data,
          name: res.data.name,
          tele: res.data.tele,
          gender: res.data.gender,
          mail: res.data.mail,
        })
      })
      .catch(res => {
        console.log("请求失败", res)
      })
  },
  //获取用户输入的新姓名
  getName(e) {
    name = e.detail.value
  },

  //获取用户输入的新性别
  getGender(e) {
    gender = e.detail.value
  },

  //获取用户输入的新邮箱
  getMail(e) {
    mail = e.detail.value
  },

  //获取用户输入的新电话
  getTele(e) {
    tele = e.detail.value
  },

  //修改参数数据
  updateAdmin(e) {
    if (name == "") {
      console.log("姓名为空，请输入！")
      wx.showToast({
        icon: 'none',//把提示框的对勾去掉
        title: '姓名未填写哦'
      })
    } else {
    //云函数更新商品价格
    //调用云函数updateData
    wx.cloud.callFunction({
      name: "updateDataAdmin",
      //云函数传参data   
      data: {
        id: id,
        name: name,
        tele: parseInt(tele),
        mail:mail,
        gender:gender,
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
  }
})