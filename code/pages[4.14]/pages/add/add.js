// pages/add/add.js
Page({
  onLoad(){
    
  },
  //添加数据
  add(){
    wx.cloud.database().collection('goods')
      .add({//添加数据
        data: ({
          name: '车厘子',
          price: '200'
        })
      })
      .then(res => {
        console.log('添加成功', res)
      })
      .catch(res => {
        console.log("添加失败", res)
      })
  },

  //修改数据
  update() {
    wx.cloud.database().collection('goods')
      .doc("79550af26066c5e70d24390334105865")//修改要有doc的唯一id
      .update({//修改数据
        data: ({
          price: 10
        })
      })
      .then(res => {
        console.log('修改成功', res)
      })
      .catch(res => {
        console.err("修改失败", res)
      })
  },
  //删除单条数据
  remove() {
    wx.cloud.database().collection('goods')
      .doc("79550af26066c5e70d24390334105865")//删除要有doc的唯一id
      .remove()
      .then(res => {
        console.log('删除成功', res)
      })
      .catch(res => {
        console.err("删除失败", res)
      })
  }
})