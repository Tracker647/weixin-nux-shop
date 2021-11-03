import {
  OrderModel
} from "../../models/orderModel.js"
import {
  CartModel
} from '../../models/CartModel.js'
import {
  ProductModel
} from '../../models/ProductModel.js'
const cartModel = new CartModel();
const orderModel = new OrderModel();
const productModel = new ProductModel();
// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    address: [],
    account: '',
    products: [],
    orderStatus: 0,
    oldOrder: false,
    orderId: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.data.account = options.account
    //购物车
    if (options.from == 'cart') {
      this.setData({
        products: cartModel.getCartDataFromLocal(true),
        account: options.account,
        orderStatus: 0
      })
    } else if (options.from == 'product') {
      // let 获取商品信息
      productModel.getProductById(options.productId, res => {
        console.log(res.result.data.data)
        let product = res.result.data.data
        product.counts = parseInt(options.count)
        let newData = []
        newData.push(product);
        this.setData({
          products: newData,
          account: options.count * product.product_sell_price,
          orderStatus: 0
        })
      })
    }
    //旧订单
    else {
      orderModel.getOrderById(options.id, res => {
        console.log(res);
        let data = res.result.data.data;
        let address = {}
        address.userName = data.buyer_name
        address.phone = data.buyer_phone
        address.detailAddress = data.buyer_address
        this.setData({
          orderId: data._id,
          address: address,
          products: data.orderdetail,
          account: data.order_amount,
          orderStatus: data.order_status,
          oldOrder: true
        })
      })
    }
  },
  //地址信息
  addressInfo: function (e) {
    if ("ok" == e.detail.status) {
      let address = {}
      let addressInfo = e.detail.addressInfo
      address.userName = addressInfo.userName
      address.phone = addressInfo.telNumber
      address.detailAddress = addressInfo.provinceName + addressInfo.cityName + addressInfo.countyName + addressInfo.detailInfo
      this.setData({
        address
      })
    }

  },
  //提交订单
  confirm() {
    if (this.data.address.length == 0) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    //getUserInfo改了 这个估计失效了，得再看看
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '授权提示',
            content: '下单需要在个人中心授权！',
            success(res) {
              wx.switchTab({
                url: '/pages/my/my'
              })
            }
          })
        } else {
          // 判断是否是旧订单
          if (this.data.oldOrder) {
            this._showToast('none', '订单支付暂未开通！')
            return
          }
          
          // 不是则创建新的订单
          let orderData = {}
          orderData.address = this.data.address;
          orderData.products = this.data.products;
          orderData.account = this.data.account;
          orderModel.creatOrder(orderData, res => {
            console.log(res);
            if (res.result.code == 0) {
              this._showToast('none', '订单创建成功!')
              // 设置成旧订单
              this.setData({
                oldOrder: true
              })
              let ids = []
              let products = this.data.products
              for (let i = 0; i < products.length; i++) {
                ids.push(products[i]._id);
              }
              cartModel.delete(ids, res => {})
              wx.showModal({
                title: '支付提示',
                content: '支付暂未实现！',
                success(res) {
                  wx.switchTab({
                    url: '/pages/my/my'
                  })
                }
              })
            }
          })


        }
      }
    })

  },
  _showToast: function (type, msg) {
    wx.showToast({
      icon: type,
      title: msg
    })
  },
  //订单详情
  productDetail(e) {
    let product_id = orderModel.getDataSet(e, "id")
    wx.navigateTo({
      url: '/pages/product/product?product_id=' + product_id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})