// pages/register/register.js

Page({
  data:{
    name :'',
    tele :'',
    password :''
  },
  getName(e){

    this.setData({
      name : e.detail.value
    })
    // console.log("获取名",this.data.name)
  },
  getTele(e){
    this.setData({
      tele : e.detail.value
    })
    // console.log("获取tele",tele)
  },
  getPassword(e){
    this.setData({
      password : e.detail.value
    })
    // console.log("获取password",password)
  },
  //注册方法
  register(){
    let name = this.data.name;
    let tele = this.data.tele;
    let password = this.data.password;
    console.log("点击注册",name,tele,password);
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
      return
    }
    //电话长度校验
    else if(tele.length!==11){
      wx.showToast({
        icon:"none",
        title: '电话应为11位',
      })
      return
    }
    //密码长度校验
    else if(password.length<6){
      wx.showToast({
        icon:"none",
        title: '密码不得少于6位',
      })
      return
    }
    //修改数据库
    wx.cloud.database().collection('admin').add({
      data:{
        name:name,
        tele:tele,
        password:password
      },
      success(){
        console.log("注册成功")
        wx.navigateTo({
          url: '../login/login',
        })
      },
      fail(){
        console.log("注册失败")
      }

    })
  }
})