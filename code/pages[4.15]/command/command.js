// pages/command/command.js
Page({
  onLoad(){
    let db = wx.cloud.database()
    db.collection('goods')
      // .where({
      //   price:db.command.lte(15)//高级比较操作符
      // })
      .where(
        db.command.and([{
          price:db.command.gt(5)//大于5
        },{
          price: db.command.lt(20)//小于20
        }
      ])
      )
      .get()
      .then(res => {
        console.log("成功", res)
      })
      .catch(res => {
        console.log("失败")
      })
  }
})