// pages/newsmanageadd/newsmanageadd.js
let picture = "";
let title = "";
let content = "";
let fileId= "";


Page({
  onLoad(){},

  //获取用户输入的新电池容量
  getContent(e) {
    content = e.detail.value
    console.log("content新值",e.detail.value)
    console.log("content新值",content)
  },

  //获取用户输入的新电池容量
  getTitle(e) {
    title = e.detail.value
    // console.log(name)
  },

  chooseImg() {
    //1.上传图片第一步，选择图片
    wx.chooseImage({
      count: 1,//可以选择多少张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],//设置图片来源
      success : res=> {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        this.uploadFile(res.tempFilePaths[0]);//调用上传方法
      }
    })
  },
  uploadFile(temfile) {
    console.log("上传图片的临时路径", temfile);
    wx.cloud.uploadFile({
      cloudPath: "fileName",//进入云存储后图片的名字
      filePath: temfile, // 文件路径,filePath是string类型
      success: res => {
        // get resource ID
        console.log(res.fileID)
        console.log("上传成功", res)
        fileId=res.fileID
          this.setData({
            imgUrl: res.fileID,
          })
      },
      fail(err) {
        console.log("上传失败", res)
        // handle error
      }
    })
  },

  //添加资讯到数据库
  addNews(e) {
    // console.log('商品名', name)
    console.log('content:', content)
    if (title == "") {
      wx.showToast({
        icon: 'none',//把提示框的对勾去掉
        title: '标题为空'
      })
    } else if (content == "") {
      wx.showToast({
        icon: 'none',//把提示框的对勾去掉
        title: '正文为空'
      })
    } else {
      //添加操作
      console.log("可以进行添加操作啦");
      wx.cloud.database().collection('news')
        .add({
          data: {
            title:title,
            content:content,
            picture:fileId
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