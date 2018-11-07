// pages/setbooks/setbooks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canteenid: '',
    BookList: [],
    ids: ['aaa']
  },
  checkboxChange: function(e) {
    // var selectlist = e.detail.value;
    // console.log(selectlist);
    this.setData({
      ids: e.detail.value
    })
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    console.log(this.data.ids)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    var canteenid = options.id;
    console.log('canteenid:', canteenid);
    this.setData({
      canteenid: id
    })
    this.getCanteenBookList(canteenid);
  },
  getCanteenBookList: function(canteenid) {
    var self = this;
    wx.request({
      url: 'https://gwzs.hn.189.cn/union/cookbook/canteen/' + canteenid,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var result = res.data.result;
        console.log(res.data);
        let list = res.data.data;
        if (result == '0000') {
          self.setData({
            BookList: res.data.data
          })
        }
      }
    })
  },
  sublist: function(e) {
    var self = this;
    console.log('aaaa:', this.data.canteenid);
    wx.request({
      url: 'https://gwzs.hn.189.cn/union/cookbook/today',
      data: {
        canteenid: self.data.canteenid,
        id: self.data.ids
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        let message = res.data.message;
        if (message && message == '新增当日菜肴信息成功') {
          wx.showToast({
            title: '新增成功',
            duration: 2000
          })
        }
      }
    })

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