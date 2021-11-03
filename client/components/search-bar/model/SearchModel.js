import {
  CloudRequest
} from '../../../utils/CloudRequest.js';
class SearchModel extends CloudRequest {
  constructor() {
    super();
  }
  getSearchResult(keyword, cb) {
    console.log(keyword);
    this.request({
      url: "getSearchResult",
      data: {
        keyword:keyword
      },
      success: res => {
        console.log(res.result.data)
        cb(res.result.data);
      },
      fail: err => {
        console.log(err)
      }
    })
  }
}
export {
  SearchModel
}