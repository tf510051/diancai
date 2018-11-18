// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {    
    CanTeenList: [],
    canEidt: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUser();
    this.getCanTeenList();
  },
  getUser() {
    this.setData({
            canEidt: true
          });
    var user = wx.getStorageSync("user");
    console.log(user.umask);
    //用户openid判断，如果是指定账号才可以修改设置
    // if (user.umask && user.umask =='3'){
    //       this.setData({
    //         canEidt: true
    //       })
    //  }
  },

  getCanTeenList: function() {
    var self = this;
    wx.request({
      url: 'https://gwzs.hn.189.cn/union/canteen/city/长沙',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var result = res.data.result;       
        let list = res.data.data;
        if (result== '0000') {
          self.setData({
            CanTeenList: res.data.data
          })
        }
      }
    })
  },

  go: function(event) {
    var index = event.currentTarget.dataset.index;
    //console.log(index);
    var list = this.data.CanTeenList;
    // var id = list[index].id;
    // var id = this.data.CanTeenList[index].id;
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../menus/menus?id=' + id
      // url: '../index/index'
    })
  },
  setCookBook: function(event) {
    var list = this.data.CanTeenList;
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../setbooks/setbooks?id=' + id
    })
  },

  subList: function(event) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})