import {
  config
} from "../config.js"
class CloudRequest {
  constructor(cloud_route) {
    //默认调用index云函数,可以设置为其他云函数
    this.cloud_route = (cloud_route === undefined) ? config.cloud_route : cloud_route
    console.log('调用云函数：' + this.cloud_route);
  }
  request(params) {
    console.log(params);
    wx.cloud.callFunction({
      name: this.cloud_route,
      data: {
        $url: params.url,
        data: params.data
      },
      success: res => {
        console.log(res)
        params.success(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  }
  /*获得元素上的绑定的值 */
  getDataSet(event, key) {
    console.log(event.currentTarget.dataset[key]);
    return event.currentTarget.dataset[key];
  }

}
export {
  CloudRequest
}