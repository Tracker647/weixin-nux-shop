// 导入数据库操作公共方法
const model = require('../model/BaseModel.js');
//全局集合名称
const {
  BANNER
} = require("../config/tableConfig.js");
//返回字段处理
const {
  BANNERFIELD
} = require('../fields/bannerField.js');
/**
 * 获取首页轮播
 * @return
 */

const getBanner = () => {
  // 查询需要前天显示的轮播
  let options = {
    show: true
  }
  // 传递参数   对应的BaseModel的方法名称
  return model.query(BANNER, BANNERFIELD, options)
}
// 导出
module.exports = {
  getBanner
}