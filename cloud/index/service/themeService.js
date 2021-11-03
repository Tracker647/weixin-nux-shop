// 引入BaseModel 集合名  字段过滤
const model = require('../model/BaseModel.js')
const { THEME } = require('../config/tableConfig.js')
const { THEMEFIELD } = require('../fields/themeField.js')

/**
 * 获取主题列表
 * @return 
 */
const getTheme = () => {
  return model.query( THEME, THEMEFIELD )
}

module.exports = {
  getTheme
}
