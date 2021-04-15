// pages/modelmanagechde/modelmanagechde.js


Page({
  data:{
    model:[]
  },
  onLoad: function (options) {
    if (options.id) {
      const db = wx.cloud.database();
      db.collection("model").where({
        _id: options.id
      }).get({
        success: res => {
          this.setData({
            model: res.data[0]//返回的是一个数组，取第一个
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
    let model=e.detail.value
    console.log(model)

    this.update(db, model)  //修改记录

  },
  update: function (db, model) {
    console.log(model)
    console.log(model.name)

    wx.cloud.callFunction({
      name:'updateData',
      data:{
        id:model.id,
        name: model.name,
        battery: parseInt(model.battery),
        chip:model.chip,
        screen:model.screen,
        cache:model.cache,
        fcamera:model.fcamera,
        rcamera:model.rcamera,
        price: parseInt(model.price)
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
})