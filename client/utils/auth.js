const app = getApp();
// const model = require('../../cloud/index/model/BaseModel.js');
/**
 * 授权类，有云开发和本地两种模式(mode = cloud |local)
 * 
 */
class Auth {
  /**
   *@param {String} mode
   */
  constructor(mode) {
    this.userCollectionName = 'user'; //用户集合名称
    this.mode = mode;
  }

  /**
   * 获得用户登录态
   */
  getUserProfile() {
    return new Promise((solve, ject) => {
      wx.getUserProfile({
        desc: '业务需要',
        success: res => {
          console.log(res);
          solve(res);
        },
        fail: err => {
          console.log(err);
          wx.showModal({
            title: '提示',
            content: '您取消了授权,将无法进行登录,请先授权!',
          })
        }

      })
    })
  }
  /**
   * 保存获得的用户登录态,参数是保存的位置，可选择保存在app全局变量，本地存储和云服务器中
   * @param {String} storageIn  保存位置，参数有global,local,cloud
   * @param {String} collctionName 云服务器集合名
   */
  async onSaveUserInfo(storageIn, collctionName) {
    var userInfo = await this.getUserProfile();
    if (userInfo) {
      switch (storageIn) {
        case 'local':
          wx.setStorageSync(this.userCollectionName, userInfo); //如果登录态存在,便将其保存
          break;
        case 'global':
          app.globalData.userInfo = userInfo;
          break;
          // case 'cloud':
          //   model.add(this.userCollectionName, userInfo);
          //   break;
      }
    }

  }
}
export {
  Auth
}