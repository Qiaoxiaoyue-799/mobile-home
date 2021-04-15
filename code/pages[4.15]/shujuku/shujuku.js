// pages/shujuku/shujuku.js
Page({
  //渲染数据
  data:{
    list:[],//列一个空数组list
    good:[]
  },


  onLoad(){
    //ES6简洁写法
    wx.cloud.database().collection('goods')
    // .where({//条件查询
    //   name:'苹果'
    // })
    .get()
    .then(res=>{//请求成功
      console.log('第二种方法请求成功',res)
      console.log('第二种方法请求成功',res.data)
      this.setData({
        list:res.data
      })
    })
    .catch(err=>{//请求失败
      console.log('第二种方法请求失败',err)
    })
    //使用doc查询单条数据
    wx.cloud.database().collection('goods').doc("79550af2606539160cf6101f13b7783f"
)
    .get()
    .then(res => {
      console.log('查询单条数据成功',res)
      console.log('查询单条数据成功', res.data)
      this.setData({
        good:res.data
      })
    })
    .catch(res => {
      console.log('查询单条数据失败', err)
    })

  }
 
  
})