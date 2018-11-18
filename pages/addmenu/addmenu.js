// pages/addmenu/addmenu.js
// 获取显示区域长宽
const device = wx.getSystemInfoSync()
const W = device.windowWidth
const H = device.windowHeight - 50

let cropper = require('../../welCropper/welCropper.js');

// console.log(device)


Page({

  /**
   * 页面的初始数据
   */
  data: {
    canteenid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // 初始化组件数据和绑定事件
    cropper.init.apply(that, [W, H]);
  },

  selectTap(e) {
    let that = this
    let mode = e.currentTarget.dataset.mode
    // console.log(e)

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const tempFilePath = res.tempFilePaths[0]
        // console.log(tempFilePath)

        // 将选取图片传入cropper，并显示cropper
        // mode=rectangle 返回图片path
        // mode=quadrangle 返回4个点的坐标，并不返回图片。这个模式需要配合后台使用，用于perspective correction
        // let modes = ["rectangle", "quadrangle"]
        // let mode = modes[1]   //rectangle, quadrangle
        that.showCropper({
          src: tempFilePath,
          mode: mode,
          sizeType: ['original', 'compressed'], //'original'(default) | 'compressed'
          maxLength: 1000, //默认2000，允许最大长宽，避免分辨率过大导致崩溃
          callback: (res) => {
            if (mode == 'rectangle') {
              //console.log("crop callback:" + res);
              that.hideCropper() //隐藏，我在项目里是点击完成就上传，所以如果回调是上传，那么隐藏掉就行了，不用previewImage
              
              wx.showLoading({
                title: '转换中'
              });
              //1 得到压缩后的图片URL，首先要进行BASE64转码
              wx.getFileSystemManager().readFile({
                filePath: res, //选择图片返回的相对路径
                encoding: 'base64', //编码格式
                success: res => { //成功的回调                  
                 console.log('data:image/png;base64,' + res.data);
                  wx.hideLoading();
                  //2 开始上传压缩后图片 
                },
                fail: function(res) {
                  wx.hideLoading();
                  console.log('fail');
                },
                complete: function(res) {
                  console.log('complete');
                 wx.hideLoading()
                }
              });

              wx.uploadFile({
                url: 'https://...',      //此处换上你的接口地址
                filePath: tempFilePaths[0],
                name: 'img',
                header: {
                  "Content-Type": "multipart/form-data",
                  'accept': 'application/json',               
                },
                formData: {
                  'user': 'test'  //其他额外的formdata，可不写
                },
                success: function (res) {
                  var data = res.data;
                  console.log('data');
                },
                fail: function (res) {
                  console.log('fail');
                }
              })




              // wx.previewImage({
              //   current: '',
              //   urls: [res]
              // })
            } 

            
          }
        })
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