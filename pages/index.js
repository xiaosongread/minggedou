var app = getApp();
Page({
  data: {
    decorationImage: '../img/1.jpg', // 右下角装饰图片
    canvasW: 300,
    canvasH: 300,
    canvasWidth: 250,
    canvasHeight: 250,
    smallImage: 74,
    marginWidth: 25,
    headerImage: ''
  },
  onReady: function () {
    this.drawCanvas()
  },
  // 获取相册头像图片
  setHeader() {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: 'original', // 可以指定是原图还是压缩图，默认二者都有
      sourceType: 'album', // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          headerImage: tempFilePaths[0]
        });
        that.drawCanvas()
      }
    })
  },
  // 绘制圆角矩形
  roundRectColor: function (context, x, y, w, h, r) {  //绘制圆角矩形（纯色填充）
    context.save();
    context.fillStyle = "#fff";
    context.strokeStyle = '#fff';
    context.lineJoin = 'round';  //交点设置成圆角
    context.lineWidth = r;
    context.strokeRect(x + r / 2, y + r / 2, w - r, h - r);
    context.fillRect(x + r, y + r, w - r * 2, h - r * 2);
    context.stroke();
    context.closePath();
  },
  // 渲染画布内容
  drawCanvas: function () {
    var that = this;
    // 拿到canvas context
    let ctx = wx.createCanvasContext('share_canvas');
    this.roundRectColor(ctx, that.data.marginWidth, that.data.marginWidth, this.data.canvasWidth, this.data.canvasHeight, 30)
    // ctx.setFillStyle('white')
    // ctx.fillRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
    if (that.data.headerImage) {
      ctx.drawImage(that.data.headerImage, 35, 35, this.data.canvasWidth - 20, this.data.canvasHeight - 20)
    }
    let x = this.data.canvasWidth - (that.data.smallImage - 20)
    let y = this.data.canvasWidth - (that.data.smallImage - 20)
    ctx.drawImage(this.data.decorationImage, x, y, that.data.smallImage, that.data.smallImage)
    ctx.draw();
  },
  // 保存图片到本地
  saveImage: function () {
    wx.showLoading({
      title: '正在保存图片..',
    });
    let that = this;
    wx.canvasToTempFilePath({
      x: that.data.marginWidth,
      y: that.data.marginWidth,
      fileType: 'jpg',
      width: that.data.canvasW - (that.data.marginWidth * 2),
      height: that.data.canvasH - (that.data.marginWidth * 2),
      destWidth: 960,
      destHeight: 960,
      canvasId: 'share_canvas',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res);
            wx.showToast({
              title: '保存到相册成功',
              duration: 1500,
            })
          },
          fail(res) {
            console.log(res)
            wx.showToast({
              title: '保存到相册失败',
              icon: 'fail'
            })
          },
          complete(res) {
            console.log(res)
          }
        })
      }
    })
  },
  getData: function () {

  },
  //设置分享
  onShareAppMessage: function () {
    return {
      title: '',
      desc: '',
      path: ''
    }
  }
})
