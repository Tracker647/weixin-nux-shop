import {
  CloudRequest
} from '../utils/CloudRequest.js'
class CategoryModel extends CloudRequest {
  /**
   * 获取分类
   * @param {*} callBack
   */
  getCateGory(cb) {
    this.request({
      url: "getCategoryMenu",
      success: res => {
        console.log(res);
        cb(res)
      }
    })
  }

  /**
   * 根据商品类型获取商品
   * @param {*} category_type
   * @param {*} callBack
   */
  getCateGoryProduct(category_type, callBack) {
    this.request({
      url: "getCategoryProduct",
      data: category_type,
      success: res => {
        console.log(res)
        callBack(res)
      }
    })
  }
}
export {
  CategoryModel
}