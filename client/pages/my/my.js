// pages/my/my.js
import {
  Auth
} from '../../utils/auth.js';
import {
  OrderModel
} from '../../models/orderModel.js';
let auth = new Auth();
let orderModel = new OrderModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    defaultImg: '../../images/my/header.png',
    orders: [],
    address: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this._init();
  },
  // 初始化
  _init() {
    var userInfo = wx.getStorageSync('user');
    if (userInfo) {
      // 获取订单信息
      orderModel.getOrderList(res => {
        this.setData({
          orders: res.result.data.data
        })
        console.log(this.data.orders)
      })
      // 获取用户信息  
      this.setData({
        userInfo
      })
    }
  },
  // 订单页面
  pay(e) {
    let id = orderModel.getDataSet(e, 'id');
    wx.navigateTo({
      url: '/pages/order/order?id=' + id,
    })
  },
  getUserProfile() {
    var userInfo = wx.getStorageSync('user');
    if (!userInfo) {
      wx.getUserProfile({
        desc: '业务需要',
        success: res => {
          console.log(res);
          this.setData({
            userInfo: res.userInfo
          })
          wx.setStorageSync('user', res.userInfo);
        },
        fail: err => {
          wx.showModal({
            title: '提示',
            content: '您取消了授权,将无法进行登录注册，请先授权!',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    }

  },
  addressInfo() {
    var that = this;
    wx.chooseAddress({
      success(res) {
        console.log(res.userName      )
        console.log(res.postalCode    )
        console.log(res.provinceName  )
        console.log(res.cityName      )
        console.log(res.countyName    )
        console.log(res.detailInfo    )
        console.log(res.nationalCode  )
        console.log(res.telNumber     )
        that.setData({
          address: res
        })
      }
    })
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