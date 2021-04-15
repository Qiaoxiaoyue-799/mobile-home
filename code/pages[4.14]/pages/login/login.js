// pages/login/login.js

const app = getApp()

Page({
  data:{
    name :'',
    password :''
  },
  getName(e){

    this.setData({
      name : e.detail.value
    })
    // console.log("获取名",this.data.name)
  },
  // getTele(e){
  //   this.setData({
  //     tele : e.detail.value
  //   })
  //   // console.log("获取tele",tele)
  // },
  getPassword(e){
    this.setData({
      password : e.detail.value
    })
    // console.log("获取password",password)
  },
  //登录方法
  login(){
    let name = this.data.name;
    // let tele = this.data.tele;
    let password = this.data.password;
    // console.log("点击登录",name,tele,password);
    //字符校验
    //姓名长度校验
    if(name.length<2){
      wx.showToast({
        icon:"none",
        title: '用户名至少两位',
      })
      return
    }
    else if(name.length>10){
      wx.showToast({
        icon:"none",
        title: '用户名不得超多10位',
      })
    }
    //密码长度校验
    else if(password.length<6){
      wx.showToast({
        icon:"none",
        title: '密码不得少于6位',
      })
    }
    //修改数据库
    wx.cloud.database().collection('admin')
    .where({
      name:name
    }).get({
      success(res){
        console.log("登录成功",res)
        let user = res.data[0]
        console.log("user",user);
        if(password==user.password){
          console.log("密码正确")
          console.log(password,user.password)
          wx.showToast({
            title: '登录成功',
          })
          // getApp().globalData.showDialog = res.result;
          wx.setStorage({
            data: user.name,
            key: 'name',
          })  
          wx.switchTab({
            url: '../adminmanage/adminmanage',
          })
        }
        else{
          console.log("密码错误")
          wx.showToast({
            icon:'none',
            title: '账号或密码错误！',
          })
        }
      },
      fail(res){
        console.log("登录失败",res)
      }
    })

  }
})