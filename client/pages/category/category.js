// pages/category/category.js
import {
  CategoryModel
} from '../../models/categoryModel.js'
let category = new CategoryModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCategories: [],
    menuSelect: 1,
    menuName: '',
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._init();
  },
  // 初始化数据
  _init() {
    category.getCateGory(res => {
      let menuCategories = res.result.data.data;
      let menuSelect = menuCategories[0].category_type;
      let menuName = menuCategories[0].category_name;
      this.setData({
        menuCategories
      })
      this._getCateGory(menuSelect);
    })

  },
  // 菜单切换
  menu(e) {
    let index = category.getDataSet(e, "index");
    let menuCategories = this.data.menuCategories;
    let menuName = menuCategories[index].category_name;
    let menuSelect = menuCategories[index].category_type;
    this._getCateGory(menuSelect);
    this.setData({
      menuSelect,
      menuName
    })
  },
  // 跳转商品详情

  _getCateGory(type) {
    category.getCateGoryProduct(type, res => {
      this.setData({
        products: res.result.data.data
      })
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