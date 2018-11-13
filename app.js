//app.js
App({
  onLaunch: function () {
    var that=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
         // console.log(res.code)
        }
        var d = that.globalData;//这里存储了appid、secret、token串  
        // var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
        var l = 'https://gwzs.hn.189.cn/union/wexin/getUserInfo?appid=' + d.appid + '&js_code=' + res.code + '&grant_type=authorization_code';
       // console.log(l)
        wx.request({
          url: l,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          // header: {}, // 设置请求的 header  
          success: function (res) {
            console.log(JSON.stringify(res.data));           
            var obj = {};
            //console.log(res.data);
            obj.openid = res.data.openid;
            obj.session_key = res.data.session_key; 
            obj.umask = res.data.umask;     
            wx.setStorageSync('user', obj);//存储openid  
          }
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo 
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    appid: 'wxa7f9d14751c8860c',//appid需自己提供
    secret: '6747f1fbec876b8b68bc6a12e465f94c',//secret需自己提供
  }
})