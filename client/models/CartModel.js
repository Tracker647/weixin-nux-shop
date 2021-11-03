import {
  CloudRequest
} from '../utils/CloudRequest.js'
class CartModel extends CloudRequest {
  _storageName = 'cart';
  constructor() {
    super()
  };
  /**
   * 获取购物车数据
   * @param {*} callBack
   */
  getCartData(cb) {
    cb(this.getCartDataFromLocal());
  }

  /**
   * 添加到购物车
   * @param {*} item 
   * @param {*} counts 
   * @param {*} callBack 
   */
  add(item, counts) {
    console.log(item);
    this._localAdd(item, counts)
  }
  /**
   * 添加商品数量
   * @param {*} id 
   * @param {*} callBack 
   */
  addCounts(id, callBack) {
    console.log(id);
    this._changeCounts(id, 1)
    callBack()
  }
  /**
   * 减少数量
   * @param {*} id 
   * @param {*} callBack 
   */
  cutCounts(id, callBack) {
    this._changeCounts(id, -1)
    callBack()
  }
  /**
   * 删除商品
   * @param {*} ids 
   * @param {*} callBack
   */
  delete(ids, callBack) {
    console.log(ids);
    callBack(this._delete(ids))
  }

  /********************* 下面本地数据  ***************************/

  /* 本地缓存 保存/更新 */

  /**
   * 加入购物车
   * @param {*} item 商品
   * @param {*} counts 数量
   */
  localSetStorageSync(data) {
    console.log(this._storageName);
    wx.setStorageSync(this._storageName, data)
  }

  _localAdd(item, counts) {
    let cartData = this.getCartDataFromLocal();
    if (!cartData) {
      cartData = []
    }
    let isProduct = this._checkProduct(item._id, cartData)
    console.log(isProduct);
    // 新商品
    if (isProduct.index == -1) {
      item.counts = counts
      item.selectStatus = true //默认在购物车中为选中状态
      cartData.push(item)
    }
    // 已有商品
    else {
      cartData[isProduct.index].counts += counts
    }
    console.log(cartData);
    this.localSetStorageSync(cartData);
    return cartData;
  }


  getCartTotalCounts() {
    let data = this.getCartDataFormLocal();
    let counts = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].selectStatus)
        counts++
    }
    return counts
  }


  /**
   *修改商品数目
   * @params id - {int} 商品id
   * @params counts - {int} counts 
   */
  _changeCounts(id, counts) {
    let cartData = this.getCartDataFromLocal();
    let hasInfo = this._checkProduct(id, cartData);
    if (hasInfo.index != -1 && hasInfo.data.counts >= 1) {
      cartData[hasInfo.index].counts += counts
    }
    this.localSetStorageSync(cartData);

  }

  /**
   * 获取购物车
   * @param  {boolean} flag  是否过滤掉不下单的商品
   */
  getCartDataFromLocal(flag) {
    let res = wx.getStorageSync(this._storageName);
    if (!res) {
      res = []
    }
    /* 在下单的时候过滤不下单的商品 */
    if (flag) {
      let newRes = [];
      for (let i = 0; i < res.length; i++) {
        if (res[i].selectStatus) {
          newRes.push(res[i])
        }
      }
      res = newRes;
    }
    return res;
  }
  /**购物车是否已经存在该商品 */
  _checkProduct(id, arr) {
    let item, result = {
      index: -1
    };
    for (let i = 0; i < arr.length; i++) {
      item = arr[i];
      if (item._id == id) {
        result = {
          index: i,
          data: item
        }
        break;
      }
    }
    return result;
  }
  /**
   * 删除某些商品
   */
  _delete(ids) {

    if (!(ids instanceof Array)) {
      ids = [ids];
    }
    console.log(ids);
    let cartData = this.getCartDataFromLocal();
    for (let i = 0; i < ids.length; i++) {
      let hasInfo = this._checkProduct(ids[i], cartData)
      if (hasInfo.index != -1) {
        cartData.splice(hasInfo.index, 1) //删除数组某一项
      }
    }
    this.localSetStorageSync(cartData);
  }
}

export {
  CartModel
}