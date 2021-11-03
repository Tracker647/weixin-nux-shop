import {
  CloudRequest
} from '../utils/cloud-request.js'
class TestModel extends CloudRequest {
  getTest(cb) {
    this.request({
      url: "路由路径",
      success: res => cb(res)
    })
  }
}
export {
  TestModel
}