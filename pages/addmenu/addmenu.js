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
    canteenid: '',
    titleCount: 0,
    contentCount: 0,
    title:'香干炒肉',
    content: '火锅',
    images:[],
    filepath: '',
    pic: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // 初始化组件数据和绑定事件
    var id = options.canteenid;
    this.setData({
      canteenid: id
    })
    cropper.init.apply(that, [W, H]);

  },

  handleTitleInput(e) {
    const value = e.detail.value
    this.setData({
      title: value,
      titleCount: value.length
    })
  },

  handleContentInput(e) {
    const value = e.detail.value
    this.setData({
      content: value,
      contentCount: value.length
    })   
  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    const imgs = this.data.images
    imgs.splice(idx,1)
    this.setData({
      images: imgs
    }) 
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    
    wx.previewImage({
      current: images[idx],
      urls: this.data.images,
    })
  },

  submitForm(e) {
    const title = this.data.title
    const content = this.data.content
    const pic=this.data.pic
    console.log(this.data.canteenid, '-', title, '-', this.data.content)
    console.log(pic)

    if (title && content&&pic) {
      wx.showLoading({
        title: '正在提交上传...',
        mask: true
      })
      wx.request({
        url: 'https://gwzs.hn.189.cn/union/cookbook/',
        data: {
          canteenid: this.data.canteenid,
          name: title,
          type: content,
          pic: pic
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.hideLoading()
          var result=res.data.result
          if (result=='0000'){
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          }
          console.log(res.data);
        }
      })

    }
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
                that.hideCropper() //隐藏
                console.log('转换中', res);               
                that.setData({
                  filepath: res,
                  images: [res]
                });
                wx.getFileSystemManager().readFile({
                  filePath: that.data.filepath, //选择图片返回的相对路径
                  encoding: 'base64', //编码格式
                  success: res => { //成功的回调                                       
                    //console.log('data:image/png;base64,' + res.data);   
                    that.setData({
                      pic: res.data
                    });                 
                  },
                  fail: function (res) {
                    // wx.hideLoading();
                    console.log('fail');
                  },
                  complete: function (res) {
                    console.log('complete');
                    // wx.hideLoading()
                  }
                });

                //console.log('filepath', that.data.filepath);
              }
            }
          });
        
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