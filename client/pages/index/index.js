//index.js
const app = getApp()
// 引入我们需要的类 
import {
  IndexModel
} from "../../models/IndexModel.js"
// 使用钱需要实例化才能使用
let index = new IndexModel()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    themes: [],
    products: [],
    banners: []
  },
  onLoad: function (options) {
    // _下划线开头 代表私有方法 我们将所有的进来加载数据存放在_init方法
    this._init()
  },
  // 页面初始化数据
  _init: function () {
    // 轮播图 在头部我们实例化 复制给index 在这里我们直接通过实例名称调用里面的方法，res=>{} 取出我们回调函数的值，取出我们想要的结果，在setData 
    index.getBanner(res => {
      console.log(res)
      this.setData({
        banners: res.result.data.data
      })
    })
    //主题
    index.getTheme(res => {
      this.setData({
        themes: res.result.data.data
      })
    })
    //最新商品
    index.getProductNew(res => {
      this.setData({
        products: res.result.data.data
      })
    })

  },
  themeNavigation(event) {
    let theme_type = index.getDataSet(event, "themetype");
    console.log(theme_type);
    wx.navigateTo({
      url: '../theme/theme?theme_type=' + theme_type
    })
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },
  toSearch(e){
    console.log(e.detail);
    wx.navigateTo({
      url: '../../pages/search/search',
    })
  }


})