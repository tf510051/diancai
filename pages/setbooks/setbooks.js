// pages/setbooks/setbooks.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 180,//删除按钮宽度单位（rpx）
    startX:0,
    canteenid: '',
    BookList: [],
    ids: []
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
    this.initEleWidth();

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
    console.log('https://gwzs.hn.189.cn/union/cookbook/canteen/',canteenid);
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
        let result = res.data.result;
        if (result && result == '0000') {
          // wx.showToast({
          //   title: '新增成功',
          //   duration: 2000
          // });
          var canteenid = self.data.canteenid
          wx.redirectTo({
            url: '../menus/menus?id=' +canteenid
           
            // url: '../index/index'
          })
        }
      }
    })
  },

  addnew:function(){
    wx.redirectTo({
      url: '../addmenu/addmenu?canteenid=' + this.data.canteenid

      // url: '../index/index'
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

  },

  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.BookList;
      if (index >= 0) {
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          BookList: list
        });
      }
    }
  },

  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.target.dataset.index;
      var list = this.data.BookList;
      console.log(e);
      if (index >= 0) {
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          BookList: list
        });
      }
    }
  },
  //点击删除按钮事件
  delItem: function (e) {
    //获取列表中要删除项的下标
    var index = e.target.dataset.index;
    var list = this.data.BookList;
    //移除列表中下标为index的项
    list.splice(index, 1);
    //更新列表的状态
    this.setData({
      BookList: list
    });
  },

  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  }



})