// components/search-bar/index.js
//搜索模型层和云数据库模型层引入
import {
  SearchModel
} from './model/SearchModel.js';


//候选搜索结果字段过滤
var searchModel = new SearchModel();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: {
      type: String,
      value: {},
      observer: "_methodRoute"
    },
    history: {
      type: Array,
      value: {

      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    keywordValue: '', //打字出的关键词
    historyList: [] //历史记录
  },
  /* 组件所在页面的生命周期 */
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this._init();
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  /*组件的生命周期 */
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _init() {
      // 加载历史搜索记录
      var historyList = this.loadHistory();
      this.setData({
        historyList
      })
    },
    // 方法路由 目前有导航和搜索两种模式
    _methodRoute() {
      console.log(this.data)
      switch (this.data.mode) {
        case "navigate":
          this.triggerEvent("toSearch", "triggerSet");
          break;
        case "search":
          break;
      }
    },
    searchInput(e) {
      this.setData({
        keywordValue: e.detail.value
      })
    },

    clearKeyword() {
      this.setData({
        keywordValue: ''
      })
    },

    //加载历史记录
    loadHistory(newHistory) {
      var historyList = [];
      if (!wx.getStorageSync('historyList'))
        wx.setStorageSync('historyList', []);
      historyList = wx.getStorageSync('historyList');
      if (newHistory) //如果函数被调用时有新的历史记录，把它加进去
        historyList.unshift(newHistory);
      wx.setStorageSync('historyList', historyList);
      return historyList;
    },

    //清空历史记录
    clearHistory() {
      wx.removeStorageSync('historyList');
      this.setData({
        historyList: []
      })
    },
    // 启动搜索
    searchConfirm(e) {
      var keyword = e.currentTarget.dataset.keyword;
      if (this.data.mode !== 'search')
        return;
      this.setData({
        keywordValue: keyword
      })
      if (this.data.keywordValue.length === 0) {
        wx.showToast({
          title: '搜索框内容不能为空',
          icon: "none"
        })
        return;
      }
      console.log('开始搜索关键词', keyword);
      var matchResult = this._getMatchResult(keyword);
      // 将关键词加入历史记录并清空原来的输入
      var historyList = this.loadHistory(keyword);
      this.setData({
        historyList: historyList,
        keywordValue: ''
      })
    },

    //得到匹配的搜索记录并展示在候选栏上
    _getMatchResult(keyword) {
      //跟用别的网购app一样，每次打字都会被追踪并请求数据库结果,估计现实网络请求的负载肯定很高,以后考虑网络问题的解决,目前设置为隔0.5秒后再请求
      wx.showLoading({
        title: '加载中',
      })
      searchModel.getSearchResult(keyword, res => {
        console.log(res.data);
        var request = {
          keyword: keyword,
          data: res.data
        }
        this.triggerEvent('navToResult', request);
      })
      // 超时时间设置为5分钟
      setTimeout(function () {
        wx.hideLoading()
      }, 300000)
    }


  },

})