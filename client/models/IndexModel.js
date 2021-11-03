import {
  CloudRequest
} from '../utils/CloudRequest.js'
class IndexModel extends CloudRequest {
  /**
   * 获取首页轮播
   * @param {*} callBack
   */

  getBanner(cb) {
    this.request({
      url: "getBanner",
      success: res => {
        console.log(res)
        cb(res);
      }
    })
  }
  /**
   * 获取主题 
   * @param {*} callBack 
   */
  getTheme(callBack) {
    this.request({
      url: "getTheme",
      success: res => {
        callBack(res)
      }
    })
  }

  /**
   * 获取最新商品
   * @param {*} callBack 
   */
  getProductNew(callBack) {
    this.request(
    {
      url: "getProductNew",
      success: res => {
        callBack(res)
      }
    }
    )
  }

}

export {
  IndexModel
}