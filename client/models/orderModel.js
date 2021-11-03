import {
  CloudRequest
} from '../utils/CloudRequest.js'
class OrderModel extends CloudRequest {
  /**
   * 生成订单
   */
  creatOrder(orderData, cb) {
    console.log(orderData);
    this.request({
      url: "creatOrder",
      data: {
        orderData: orderData
      },
      success: res => {
        cb(res)
      }
    })
  }
  getOrderById(orderId, cb) {
    this.request({
      url: "getOrderById",
      data: {
        orderId: orderId
      },
      success: res => {
        cb(res)
      }
    })
  }
  /**
   * 查询订单
   * @param {*} callBack
   */
  getOrderList(cb) {
    this.request({
      url: "getOrderList",
      success: res => {
        cb(res)
      }
    })
  }
}

export {
  OrderModel
}