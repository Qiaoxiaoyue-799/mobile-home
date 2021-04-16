// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);//打印的结果在云端，本地终端看不到
  return cloud.database().collection('model')
    .doc(event.id)
    .update({
      data: {
        name: event.name,
        battery: event.battery,
        chip: event.chip,
        screen: event.screen,
        cache: event.cache,
        fcamera: event.fcamera,
        rcamera: event.rcamera,
        price: event.price,
      }
    })
} 