// pages/newsmanagechde/newsmanagechde.js
let id = "";
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
      db.collection("news").where({
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
    var pages = getCurrentPages();//当前页面栈
          if (pages.length > 1) {
            var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
            beforePage.changeData(optionsAll);//触发父页面中的方法
          } 
  },
  update: function (db, model) {
    var that =this;
    console.log(that.data.imgUrl)
    var a = that.data.imgUrl;
    wx.cloud.callFunction({
      name:'updateDataNews',
      data:{
        id:model.id,
        picture: a,
        content:model.content,
        title:model.title,
      }
    }).then(res=>{
      console.log('调用云函数成功',res)
      wx.showToast({
        title: '修改记录成功',
      })
    }).catch(res=>{
      console.log('调用云函数失败',res)
    })
  },

  // onLoad(options) {
  //   id = options.id;
  //   this.getList()
  // },
  // getList() {
  //   wx.cloud.database().collection("news").doc(id).get()
  //     .then(res => {
  //       console.log("请求成功", res)
  //       this.setData({
  //         detail: res.data,
  //         picture: res.data.picture,
  //         title: res.data.title,
  //         content: res.data.content,
  //         imgUrl:res.data.picture
  //       })
  //     })
  //     .catch(res => {
  //       console.log("请求失败", res)
  //     })
  // },

  // //获取新标题
  // getTitle(e) {
  //   title = e.detail.value
  //   // console.log(name)
  // },

  // //获取新电话
  // getContent(e) {
  //   content = e.detail.value
  // },

  // //上传图片
  // chooseImg() {
  //   // var that=this;
  //   //1.上传图片第一步，选择图片
  //   wx.chooseImage({
  //     count: 1,//可以选择多少张图片
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],//设置图片来源
  //     success : res=> {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       console.log(res.tempFilePaths[0])
  //       this.uploadFile(res.tempFilePaths[0],"adver123.jpg");//调用上传方法
  //     },
  //   })
  // },
  // uploadFile(temfile, fileName) {
  //   console.log("上传图片的临时路径", temfile);
  //   console.log("imgUrl"+imgUrl)
  //   imgUrl=temfile;
  //   console.log("imgUrl=temofile后"+imgUrl)
  //   wx.cloud.uploadFile({
  //     cloudPath: fileName,//进入云存储后图片的名字
  //     filePath: temfile, // 文件路径,filePath是string类型
  //     success: res => {
  //       // get resource ID
  //       console.log(res.fileID)
  //       console.log("上传成功", res)
  //       fileId = res.fileID;
  //       console.log("76行fileId"+fileId)
  //       this.setData({
  //         imgUrl: res.fileID,
  //       })  
  //     },
  //     fail(err) {
  //       console.log("上传失败", res)
  //       // handle error
  //     }
  //   })
  //   wx.cloud.database().collection("news").doc(id).get()
  //     .then(res => {
  //       console.log("请求fileId", fileId)
  //       this.setData({
  //         imgUrl:fileId
  //       })
  //     })
  //     .catch(res => {
  //       console.log("请求失败", res)
  //     })
  // },

  // //修改参数数据
  // updateNews(e) {
  //   console.log("新的picture", imgUrl)
  //   console.log("新的title", title)
  //   console.log("新的content", content)

  //   if (title == "") {
  //     console.log("型号为空，请输入！")
  //     wx.showToast({
  //       icon: 'none',//把提示框的对勾去掉
  //       title: '标题未填写哦'
  //     })
  //   } else {
  //   //云函数更新广告位数据
  //   //调用云函数updateDataNews
  //   wx.cloud.callFunction({
  //     name: "updateDataNews",
  //     //云函数传参data   
  //     data: {
  //       id: id,
  //       picture: imgUrl,
  //       content: content,
  //       title:title,
  //     }
  //   })
  //     .then(res => {
  //       console.log("imgUrl"+imgUrl)
  //       console.log("调用云函数成功", res)
  //       this.getList()
  //     })
  //     .catch(res => {
  //       console.log("调用云函数失败", res)
  //     })
  //   }
  // },


})