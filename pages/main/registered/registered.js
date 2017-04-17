var app = getApp();
Page({
  data:{
    username:"",
    password:"",
    repassword:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    
  },
  usernameValue:function(e){
    console.log(e.detail.value)
    this.data.username = e.detail.value;
  },
  passwordValue:function(e){
    console.log(e)
    this.data.password = e.detail.value;
  },
  repasswordValue:function(e){
    console.log(e)
    this.data.repassword = e.detail.value;
  },
  registeredFn:function(){
    var _this = this;
    console.log(app.data.iv)
    console.log(app.data.sessionKey)
    wx.showModal({
      title: '温馨提示',
      content: '您确定注册小宋博客账号',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: app.api.domainName + '/api/user/WeChat/register',
            method: 'get',
            data:{
              // username:_this.data.username,
              // password:_this.data.password,
              // repassword:_this.data.repassword,
              // appId : app.data.appId,
              // sessionKey : app.data.sessionKey,
              // encryptedData : app.data.encryptedData,
              // iv : app.data.iv
              openId : app.data.openid,
              header : app.data.header
            },
            success: function (res) {
              console.log(res)
              if(res.data.code == 38 || res.data.code == 4){
                wx.navigateBack({//返回上一个页面(我的页面)
                  delta: 1
                })
              }
            }
          })
        }
      }
    })
  }
})