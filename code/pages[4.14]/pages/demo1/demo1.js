// pages/demo1/demo1.js
//设置为全局变量
let name=""
let price=""
Page({
  onLoad(){
    this.getList()
  },
  //获取列表数据
  // getList(){
  //   wx.cloud.database().collection('goods')
  //     .get()
  //     .then(
  //       res => {
  //         // console.log("商品列表请求成功",res)
  //         this.setData({
  //           list: res.data
  //         })
  //       }
  //     )
  //     .catch(res => {
  //       console.log("商品列表请求失败", res)
  //     })
  // },

  //跳转到商品详情页
  goDetail(e){
    console.log("点击了跳转商品详情",e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/demo1-1/demo1-1?id=' + e.currentTarget.dataset.id,
    })
  },

  //获取用户输入的商品名
  getName(e){
    name = e.detail.value;
    console.log(name)
  },
  //获取用户输入的商品价格
  getPrice(e) {
    price = e.detail.value;
    console.log(price)
  },
  //添加商品到数据库
  addGood(e){
    console.log('商品名',name)
    console.log('商品价格', price)
    if(name == ""){
      // console.log("商品名为空，请输入！")
      wx.showToast({
        icon:'none',//把提示框的对勾去掉
        title:'商品名为空'
      })
    }else if (price == "") {
      // console.log("价格为空，请输入！")
      wx.showToast({
        icon: 'none',//把提示框的对勾去掉
        title: '价格为空'
      })
    }else{
      //添加操作
      console.log("可以进行添加操作啦");
      wx.cloud.database().collection('goods')
      .add({
        data:{
          name: name,
          price: parseInt(price)
        }
      })
      .then(res =>{
        console.log("添加成功",res)
        this.getList()
      })
      .catch(res => {
        console.log("添加失败")
      })
    }
    
  },

  //优化getList方法，type : 0不排序，1升序，-1降序，默认值为0。
  getList(type) {
    let db = wx.cloud.database().collection('goods')
    if (type == 1) {
      db = db.orderBy("price", "asc")
    } else if (type == -1) {
      db = db.orderBy("price", "desc")
    }
    db.get().then
      (res => {
        // console.log("商品列表请求成功",res)
        this.setData({
          list: res.data
        })
      }
      )
      .catch(res => {
        console.log("商品列表请求失败", res)
      })
  },

  //排序
  paixu(){
    this.getList(1)
  },

  //降序
  jiangxu() {
    this.getList(-1)
  },

  //返回规定条数数据
  limit(){
    wx.cloud.database().collection('goods')
      .limit(3)
      .get()
      .then
      (res => {
        // console.log("商品列表请求成功",res)
        this.setData({
          list: res.data
        })
      }
      )
      .catch(res => {
        console.log("商品列表请求失败", res)
      })
  }

})