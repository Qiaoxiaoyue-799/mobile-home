// pages/adminmanagechde/adminmanagechde.js


Page({
  data:{
    admin:[]
  },
  onLoad: function (options) {
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("admin").where({
        _id: options.id
      }).get({
        success: res => {
          this.setData({
            admin: res.data[0]//返回的是一个数组，取第一个
          })
          console.log(res.data[0]._id)


        }, fail: err => {
          console.log(err)

        }
      })
    }
  },
  comfirm:function(e){
    const db=wx.cloud.database()
    console.log(e.detail.value)
    let admin=e.detail.value
    console.log(admin)

    this.update(db, admin)  //修改记录

  },
  update: function (db,admin) {
    console.log(admin)
    console.log(admin.name)

    wx.cloud.callFunction({
      name:'updateDataAdmin',
      data:{
        id: admin.id,
        name: admin.name,
        tele: parseInt(admin.tele),
        mail:admin.mail,
        gender:admin.gender,
      }
    }).then(res=>{
      console.log('调用云函数成功',res)
      wx.showToast({
        title: '修改记录成功',
      })
    }).catch(res=>{
      console.log('调用云函数失败',res)
    })
  }
})