// 云函数入口文件
const cloud = require('wx-server-sdk');
const TcbRouter = require('tcb-router');
const search = require('service/searchService.js');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const app = new TcbRouter({
    event
  });
  app.router('getSearchResult', async (ctx, next) => {
    await next();
  })

  return app.serve();
}