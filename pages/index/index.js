//index.js
//获取应用实例
const app = getApp()

Page({
  data: {  
    proList: [],  
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  
  onLoad: function () {
    if (app.globalData.userInfo) {     
      this.setData({      
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况

      // 给app.js 定义一个方法。
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }    
    
    // var user = wx.getStorageSync("user");  
    // this.setData({
    //  myid:user.openid
    // })
    // console.log('bb:', this.data.myid);

    this.getProList();
  },

  getProList: function () {
    var self = this;
    wx.request({
      url: 'https://gwzs.hn.189.cn/union/cookbook/today/canteen/1',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
       // console.log(res.data); 
        if (res.data.result && res.data.result=='0000'){
        var list = res.data.data;
       // console.log(message);      
        list.forEach((item) => {
            // var array = wx.arrayBufferToBase64(item.pic);           
            // var base64 = wx.base64ToArrayBuffer(array); 
            item.pic = 'https://gwzs.hn.189.cn/union/' + item.pic
          })
        }
        self.setData({
          proList: res.data.data,         
        })
      }
    })
  },
  getUserInfo: function (e) {
    //console.log(e)  
    app.globalData.userInfo = e.detail.userInfo   
    this.setData({    
      userInfo: e.detail.userInfo,
      hasUserInfo: true     
    })
  },

  onShow: function() {
    console.log('onshow started');
    this.getProList();

    // var self = this;
    // wx.request({
    //   url: 'https://gwzs.hn.189.cn/union/cookbook/today/canteen/1',
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     // console.log(res.data); 
    //     if (res.data.result && res.data.result == '0000') {
    //       var list = res.data.data;
    //       // console.log(message);      
    //       list.forEach((item) => {
    //         // var array = wx.arrayBufferToBase64(item.pic);           
    //         // var base64 = wx.base64ToArrayBuffer(array); 
    //         item.pic = 'https://gwzs.hn.189.cn/union/' + item.pic
    //       })
    //     }
    //     self.setData({
    //       proList: res.data.data,
    //     })
    //   }
    // })

  }

})
