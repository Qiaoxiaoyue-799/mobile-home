// pages/demo1-1/demo1-1.js
let price="";
let id="";//提升全局变量
Page({
  data:{
    good:[]
  },

  onLoad(options){
    console.log("列表携带的参数值",options)
    id = options.id
    //查询单条数据
    this.getList()
  },
  //获取列表数据
  getList() {
    wx.cloud.database().collection('goods').doc(id)
      .get()
      .then(res => {
        console.log('详情页请求成功', res)
        this.setData({
          good: res.data
        })
      })
      .catch(res => {
        console.log('详情页失败', res)
      })
  },
  //获取用户输入的新价格
  getPrice(e){
    price = e.detail.value
  },
  //修改商品价格
  updatePrice(e){
    console.log("新的商品价格",price)
    if (price == "") {
      // console.log("价格为空，请输入！")
      wx.showToast({
        icon: 'none',//把提示框的对勾去掉
        title: '价格为空'
      })
    }else{
      //云函数更新商品价格
      //调用云函数updateData
      wx.cloud.callFunction({
        name: "updateData",
        //云函数传参data
        data: {
          id: id,
          price: parseInt(price)
        }
      })
        .then(res => {
          console.log("调用云函数成功", res)
          this.getList()
        })
        .catch(res => {
          console.log("调用云函数失败", res)
        })
    }
  },
  //删除操作
  shanchu(){
    console.log("点击了删除按钮",id);
    wx.showModal({
      title: '是否确定删除',
      content: '您再仔细考虑，是否真的要删除？',
      success(res){
        if(res.confirm == true){//用户点击了确认
          console.log("用户点击了确认");
          //删除操作
          wx.cloud.callFunction({
            name:"removeData",
            data:{
              id:id
            }
          })
          .then(res => {
            console.log("删除成功")
            wx.navigateTo({
              url: '/pages/demo1/demo1',
            })
          })
          .catch(res=>{
            console.log("删除失败",res)
          })
        }else if(res.cancel == true){//用户点击了取消
          console.log("用户点击了取消");
        }
      }
    })
  }
})