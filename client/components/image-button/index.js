// components/image-button/index.js

Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {
    openType: {
      type: String,
      observer: "_methodRoute"
    },
    imageSrc: {
      type: String
    },
    bindGetUserProfile: {
      type: String
    }

  },
  observers: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    addressInfo: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _methodRoute() {
      console.log(this.data);
    },
    onGetUserProfile(event) {
      console.log(this.data);
      console.log(event.detail);
      if (this.data.openType == "getuserprofile") {
        this.triggerEvent('getUserProfile', event.detail, {})
      }
    },
    address(event) {
      console.log(event.detail);
      if (this.data.openType == "primary") {
        this.addressInfo(event);
      }
    },
    addressInfo(e) {
      wx.chooseAddress({
        success: res => {
          console.log(res);
          this.setData({
            addressInfo: res
          })
        },
        fail: (err) => {},
        complete: e => {
          if (e.errMsg == "chooseAddress:ok") {
            this.triggerEvent('addressInfo', {
              addressInfo: this.data.addressInfo,
              status: "ok"
            }, {})
          } else {
            this.triggerEvent('addressInfo', {
              status: "error"
            }, {})
          }
        }
      })
    }
  }
})