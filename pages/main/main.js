var app = getApp();
Page({
  data:{
    userInfoShow:true,//标记是否显示用户信息
    header:"",
    userName:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var userInfos = wx.getStorageSync('userInfo');//本地缓存获取用户信息
    if(userInfos){//之前登陆过
      this.setData({
        userInfoShow: false,
        header:userInfos.header,
        userName:userInfos.username
      })
    }
    console.log(userInfos)
  },
  onReady:function(){
    
  },
  loginFn:function(){
    var userInfos = wx.getStorageSync('userInfo');//本地缓存获取用户信息
    if(userInfos){//之前登陆过
      this.setData({
        userInfoShow: false,
        header:userInfos.header,
        userName:userInfos.username
      })
    }else{
      wx.showModal({
        title: '温馨提示',
        content: '您还没有注册,请前往注册',
        success: function(res) {
          wx.navigateTo({
            url: './registered/registered'
          })
        }
      })
    }
    console.log(userInfos)
  },
  registered:function(){ 
    wx.navigateTo({
      url: './registered/registered'
    })
  }
})