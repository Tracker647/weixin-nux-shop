const model = require('../model/BaseModel.js')
//引入全局集合名
const {
  PRODUCT,
  PRODUCT_CATEGORY
} = require('../config/tableConfig.js')
//产品字段过滤
const {
  PRODUCTFIELD
} = require('../fields/productField.js')
//分类字段过滤
const {
  PRODUCT_CATEGORY_FIELD
} = require('../fields/productCategoryField.js')
// 头部引入
const {
  PRODUCTTHEMEFIELD
} = require('../fields/productThemeField.js')

// 获取商品分类
/**
 * @return
 */
const getCategoryMenu = () => {
  return model.query(PRODUCT_CATEGORY, PRODUCT_CATEGORY_FIELD)
}

/**
 * 根据商品分类获取商品
 * @param {*} options 
 */
const getCategoryProduct = (options) => {
  options.product_status = 0
  return model.query(PRODUCT, PRODUCTFIELD, options)
}

/**
 * 获取商品
 * @param options 条件
 * @param page    
 * @param size
 * @return 
 */
const getProduct = (options, page = 0, size = 10, order = {}) => {
  // 查询条件
  console.log(options);
  options.product_status = 0;
  // 排序条件 根据需要调正优化
  order.name = 'create_time'
  order.orderBy = 'asc'
  console.log(options);
  return model.query(PRODUCT, PRODUCTFIELD, options, page, size, order)
}

/**
 * 获取单个商品
 * @param product_id 条件
 * @return 
 */
const getProductById = (product_id) => {
  return model.findById(PRODUCT, product_id, PRODUCTFIELD)
}
/**
 * 获取商品主题
 * @param product_theme 条件
 * @return
 */
const getThemeProduct = (product_theme) => {
  let options = {
    product_theme: product_theme
  };
  return model.query(PRODUCT, PRODUCTFIELD, options)
}

module.exports = {
  getProduct,
  getCategoryMenu,
  getCategoryProduct,
  getProduct,
  getProductById,
  getThemeProduct

}