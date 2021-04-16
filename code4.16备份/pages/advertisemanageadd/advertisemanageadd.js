// pages/advertisemanageadd/advertisemanageadd.js

let picture = "";
let title = "";
let tel = "";
let fileId= "";
let id="";
// let series_o
let optionsAll=[];


Page({
  data:{
    model:[],
    imgUrl:""
  },
  onLoad: function (options) {
    id=options.id;
    optionsAll=options;
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("advertise").where({
        _id: options.id
      }).get({
        success: res => {
          this.setData({
            model: res.data[0],//返回的是一个数组，取第一个
            imgUrl:res.data[0].picture
          })
          console.log(res.data[0])
        }, fail: err => {
          console.log(err)
        }
      })
    }
  },

  // //获取用户输入的新电池容量
  // getTel(e) {
  //   tel = e.detail.value
  //   // console.log(name)
  // },

  // //获取用户输入的新电池容量
  // getTitle(e) {
  //   title = e.detail.value
  //   // console.log(name)
  // },

   //上传图片
   chooseImg() {
    // var that=this;
    //1.上传图片第一步，选择图片
    wx.chooseImage({
      count: 1,//可以选择多少张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],//设置图片来源
      success : res=> {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths[0])
        this.uploadFile(res.tempFilePaths[0],"adver123.jpg");//调用上传方法
      },
    })
  },
  uploadFile(temfile, fileName) {
    var that=this;
    console.log("上传图片的临时路径", temfile);
    console.log("imgUrl"+that.imgUrl)
    
    // that.imgUrl=temfile;
    that.setData({
      imgUrl: temfile,
    })  
    console.log("imgUrl=temofile后"+that.imgUrl)
    wx.cloud.uploadFile({
      cloudPath: fileName,//进入云存储后图片的名字
      filePath: temfile, // 文件路径,filePath是string类型
      success: res => {
        console.log("成功")
      },
      fail(err) {
        console.log("上传失败", res)
        // handle error
      }
    })
  },
  comfirm:function(e){
    const db=wx.cloud.database()
    console.log(e.detail.value)
    let model=e.detail.value
    console.log(model)
    this.update(db, model)  //修改记录
  },
  update: function (db, model) {
    var that =this;
    console.log(that.data.imgUrl)
    var a = that.data.imgUrl;
    if (model.title==""){
      wx.showToast({
              icon: 'none',//把提示框的对勾去掉
              title: '标题为空'
            })
    }else if(model.tel==""){
          wx.showToast({
            icon: 'none',//把提示框的对勾去掉
            title: '电话为空'
          })
        } else {
          wx.cloud.callFunction({
            name:'addAdvertise',
            data:{
              id:model.id,
              picture: a,
              tel:model.tel,
              title:model.title,
            }
          }).then(res=>{
            console.log('调用云函数成功',res)
            wx.showToast({
              title: '增加记录成功',
            })
          }).catch(res=>{
            console.log('调用云函数失败',res)
          })
        }
  },
  // //添加商品到数据库
  // addAdvertise(e) {
  //   // console.log('商品名', name)
  //   // console.log('商品价格', price)
  //   var that =this;
  //   console.log(that.data.imgUrl)
  //   var a = that.data.imgUrl;
  //   if (title == "") {
  //     wx.showToast({
  //       icon: 'none',//把提示框的对勾去掉
  //       title: '标题为空'
  //     })
  //   } else if (tel == "") {
  //     wx.showToast({
  //       icon: 'none',//把提示框的对勾去掉
  //       title: '电话为空'
  //     })
  //   } else {
  //     //添加操作
  //     console.log("可以进行添加操作啦");
  //     wx.cloud.database().collection('advertise')
  //       .add({
  //         data: {
  //           title:title,
  //           tel:tel,
  //           picture:a
  //         }
  //       })
  //       .then(res => {
  //         console.log("添加成功", res)
  //         // this.getList()
  //         wx.showToast({
  //           title: '添加成功',
  //         })
  //       })
  //       .catch(res => {
  //         console.log("添加失败",res)
  //       })
  //   }

  // },
})