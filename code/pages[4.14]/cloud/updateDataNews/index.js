// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);//打印的结果在云端，本地终端看不到
  return cloud.database().collection('news')
    .doc(event.id)
    .update({
      data: {
        picture: event.picture,
        title: event.title,
        content: event.content,
      }
    })
}