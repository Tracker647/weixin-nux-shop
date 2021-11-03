// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [],

  },
  navToResult(e){
    wx.hideLoading({
      success: (res) => {},
    })
    // 用url向子页面传数据
    wx.navigateTo({
      url: `../search/searchResult/searchResult?keyword=${e.detail.keyword}&result=${JSON.stringify(e.detail.data)}`
    })
    console.log(e.detail);
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