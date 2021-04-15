// pages/adminmanageadd/adminmanageadd.js
let id = "";
let name = "";
let gender = "";
let mail = "";
let tele = "";
Page({
  onLoad(){},

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

  //添加商品到数据库
  addAdmin(e) {
    if (name == "") {
      wx.showToast({
        icon: 'none',//把提示框的对勾去掉
        title: '名为空'
      })
    }else {
      //添加操作
      console.log("可以进行添加操作啦");
      wx.cloud.database().collection('admin')
        .add({
          data: {
            name: name,
            tele: parseInt(tele),
            mail:mail,
            gender:gender,
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