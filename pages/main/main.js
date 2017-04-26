var app = getApp();
Page({
  data:{
    userInfoShow:true,//标记是否显示用户信息
    code:"",
    header:"",
    userName:"",
    isExitBtn:true,
    header:'',
    userName:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var userInfos = wx.getStorageSync('userInfo');//本地缓存获取用户信息
    if(userInfos){//之前登陆过
      this.setData({
        userInfoShow: true,
        header:userInfos.header,
        userName:userInfos.username,
        isExitBtn:true
      })
    }else{
      this.setData({
        userInfoShow: false,
        header:userInfos.header,
        userName:userInfos.username,
        isExitBtn:false
      })
    }
  },
  onReady:function(){
  },
  loginFn:function(){
    var userInfos = wx.getStorageSync('userInfo');//本地缓存获取用户信息
    if(userInfos){//之前登陆过
      this.setData({
        userInfoShow: false,
        header:userInfos.header,
        userName:userInfos.username,
        isExitBtn:false
      })
    }else{
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1500
      });
      var _this = this
      wx.login({
        success: function(res) {
          console.log(res)
          _this.setData({
            code:res.code
          })
          wx.getUserInfo({
              success: function(res) {
                _this.setData({
                  header:res.userInfo.avatarUrl,
                  userName:res.userInfo.nickName
                })
                wx.request({
                    url:app.api.domainName + '/api/user/WeChat/register',
                    method: 'get',
                    data:{
                      appid:app.data.appId,
                      secret:app.data.secret,
                      jscode:_this.data.code,
                      header:_this.data.header,
                      username:_this.data.userName
                    },
                    success:function(res){
                      console.log(res)
                      wx.setStorageSync('userInfo', res.data.data)
                      _this.setData({
                        userInfoShow: true,
                        header:_this.data.header,
                        userName:_this.data.username,
                        isExitBtn:true
                      })
                      wx.hideToast();
                    }
                })
              }
            })
          }
        });
      

    }
  },
  remove:function(){
    wx.clearStorageSync('userInfo');
    this.setData({
        userInfoShow: false,
        header:"",
        userName:"",
        isExitBtn:false
      })
  }
})