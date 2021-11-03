// 放在云函数的业务层使用,组件内仅做参考
const model = require('../model/BaseModel.js');
const SEARCHQUERY = {
  BANNER: 'banner',
  THEME: 'theme',
  PRODUCT: 'product',
  PRODUCT_THEME: 'product_theme',
  PRODUCT_CATEGORY: 'product_category',
  ORDER: "order"
}
const SEARCHFIELD = {
  
}
const getSearchResult = async (keyword) => {
  const OPTIONS = {
    product_name: keyword
  }
 return model.query(SEARCHQUERY.PRODUCT, SEARCHFIELD, OPTIONS, 0, Number.MAX_SAFE_INTEGER);
}
module.exports = {
  getSearchResult
}