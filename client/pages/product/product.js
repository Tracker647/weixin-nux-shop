// pages/product/product.js
import {
  ProductModel
} from '../../models/ProductModel.js'
import {
  CartModel
} from '../../models/CartModel.js'
let productModel = new ProductModel()
let cartmodel = new CartModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, // tab选项卡
    focusStatus: 1,
    product: {
      _id: '5cf526aaa87a1a18b6624ae6',
      product_description: '',
      product_img: '',
      product_name: '花生 300g',
      product_price: 0.1,
      product_sell_price: 0.1,
      product_stock: 100
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let product_id = options.product_id;
    console.log(product_id);
    this._init(product_id);
  },
  clickTab(e) {
    const currentTab = e.currentTarget.dataset.current
    this.setData({
      currentTab
    })
  },
  _init(product_id) {
    // 获取商品信息
    productModel.getProductById(product_id, res => {
      console.log(res);
      this.setData({
        product: res.result.data.data
      })
    })
  },
  // 购物车
  goCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  //回到首页
  goHome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  // 关注
  focus(e) {
    this.setData({
      focusStatus: !this.data.focusStatus
    })
  },
  //加入购物车
  joinCart() {
    console.log(this.data.product);
    cartmodel.add(this.data.product, 1, res => {
    })
    wx.showToast({
      icon: "success",
      title: "添加成功",
      duration: 2000
    })
  },
  immdiately() {
    let count = 1;
    console.log('immdiately');
    wx.navigateTo({
      url: '../order/order?count=' + count + '&productId=' + this.data.product._id + '&from=product',
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