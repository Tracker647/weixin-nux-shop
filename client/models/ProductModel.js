import {
  CloudRequest
} from '../utils/CloudRequest.js'
class ProductModel extends CloudRequest {
  /**
   * 根据主题类型获取商品信息
   * @param {*} theme_type 主题类型
   * @param {*} callBack 
   */
  getThemeProduct(theme_type, callBack) {
    theme_type = parseInt(theme_type);
    this.request({
      url: "getThemeProduct",
      data: {
        theme_type: theme_type
      },
      success: res => {
        callBack(res)
      }
    })
  }
  /**
   * 根据商品ID 获取商品信息
   * @param {*} product_id
   * @param {*} callBack 
   *  */
  getProductById(product_id, callback) {
    console.log(product_id);
    this.request({
      url: "getProductById",
      data: {
        product_id: product_id
      },
      success: res => {
        callback(res)
      }
    })
  }

}
export {
  ProductModel
}