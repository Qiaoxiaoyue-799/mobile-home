// pages/yuncunchu/yuncunchu.js
Page({
  data:{
    showImg:false,
    showVideo:false
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
        this.uploadFile(res.tempFilePaths[0],"tiaotiao.jpg",1);//调用上传方法
      }
    })
  },
  //上传视频
  chooseVideo(){
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],//从相册选择视频或者拍摄视频
      maxDuration: 60,//视频时长
      camera: 'back',
      success(res) {
        that.uploadFile(res.tempFilePath,"tiaotiao.mp4",2);
      }
    })
  },
  //上传文件  
  //type 1代表图片 2代表视频
  uploadFile(temfile, fileName,type) {
    console.log("上传图片的临时路径", temfile);
    wx.cloud.uploadFile({
      cloudPath: fileName,//进入云存储后图片的名字
      filePath: temfile, // 文件路径,filePath是string类型
      success: res => {
        // get resource ID
        // console.log(res.fileID)
        console.log("上传成功", res)
        if(type == 1){//图片
          this.setData({
            imgUrl: res.fileID,
            showImg: true,//显示图片
            showVideo: false//隐藏视频
          })
        }
        else if (type == 2) {//视频
          this.setData({
            videoUrl: res.fileID,
            showImg: false,
            showVideo: true
          })
        }
        
      },
      fail(err) {
        console.log("上传失败", res)
        // handle error
      }
    })
  },

})