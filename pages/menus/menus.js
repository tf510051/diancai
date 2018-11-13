// pages/menus/menus.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canteenid: '',
    proList: [],
    imgUrls: [
      '/images/sw1.jpg',
      '/images/sw2.jpg',
      '/images/sw3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    //所有图片的高度
    imgheights: [],
    //图片宽度
    imgwidth: 750,
    //默认
    current: 0,



    // imageLoad: function (e) {//获取图片真实宽度  
    //   var imgwidth = e.detail.width,
    //     imgheight = e.detail.height,
    //     //宽高比  
    //   ratio = imgwidth / imgheight;
    //   console.log(imgwidth, imgheight)
    //   //计算的高度值  
    //   var viewHeight = 750 / ratio;
    //   var imgheight = viewHeight;
    //   var imgheights = this.data.imgheights;
    //   //把每一张图片的对应的高度记录到数组里  
    //   imgheights.push(imgheight)
    //  // imgheights[e.target.dataset.id] = imgheight;
    //   this.setData({
    //     imgheights: imgheights
    //   })
    // },
    bindchange: function() {
      //  console.log(e.detail.current)
      // this.setData({ current: e.detail.current })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    this.getProList(id);

  },
  getProList: function(id) {
    var self = this;

    wx.request({
      url: 'https://gwzs.hn.189.cn/union/cookbook/today/canteen/' + id,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var result = res.data.result;
        var list = res.data.data;
        console.log(list);
        if (result && result == '0000') {
          list.forEach((item) => {
            // var array = wx.arrayBufferToBase64(item.pic);           
            // var base64 = wx.base64ToArrayBuffer(array); 
            item.pic = 'https://gwzs.hn.189.cn/union/' + item.pic
          });

          self.setData({
            proList: res.data.data
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