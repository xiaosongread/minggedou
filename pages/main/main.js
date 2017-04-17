var app = getApp();
Page({
  data:{
    userInfoShow:true,//标记是否显示用户信息
    header:"",
    userName:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  login:function(e){
    this.setData({
      userInfoShow: false,
      header:app.data.header,
      userName:app.data.userName
    })

  },
  registered:function(){ 
    wx.navigateTo({
      url: './registered/registered'
    })
  }
})