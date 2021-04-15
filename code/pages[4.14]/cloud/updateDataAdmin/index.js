// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return cloud.database().collection('admin')
    .doc(event.id)
    .update({
      data: {
        name: event.name,
        tele: event.tele,
        gender: event.gender,
        mail: event.mail,
      }
    })
}