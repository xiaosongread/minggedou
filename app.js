App({
	api:{
		domainName:'http://localhost:8080'//本地域名
		// domainName:"https://blog.songyanbin.com"//生产域名
	},
	data:{
		encryptedData: "",//后台用来解密，获取用户的openId等用户的信息
		appId: "wxfd528d56a6f059ec",
		sessionKey: "",
		iv:"",
		code:"",
		secret:'53350954146a3e4255987c11746fd19d',
		openid:"",
		header:"",
		userName:""
	},
	fn:{
		setTime:function (now) { 
			var now = new Date((new Date(now).getTime()));
			var year=now.getYear() - 100 + 2000;   
			var month=now.getMonth()+1;     
			var date=now.getDate();     
			var hour=now.getHours();     
			var minute=now.getMinutes();     
			var second=now.getSeconds();     
			return year+"年"+month+"月"+date+"日   "+hour+":"+minute+"";     
		}
	},
	onLaunch:function(){//小程序初始化完成的时候执行一次（全程生命周期只执行一次）
		var _this = this;
		wx.login({
			success: function(res) {
				console.log(res)
				_this.data.code = res.code;
				if (res.code) {
					wx.getUserInfo({
						success: function(res) {
							console.log(res)
							var userInfo = res.userInfo
							var nickName = userInfo.nickName
							var avatarUrl = userInfo.avatarUrl
							var gender = userInfo.gender //性别 0：未知、1：男、2：女
							var province = userInfo.province
							var city = userInfo.city
							var country = userInfo.country
							_this.data.encryptedData = res.encryptedData;
							_this.data.iv = res.iv;
							_this.data.header = res.userInfo.avatarUrl;
							_this.data.userName = res.userInfo.nickName;
							console.log(_this.data.encryptedData)
							wx.request({
								url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+_this.data.appId+'&secret='+_this.data.secret+'&js_code='+_this.data.code+'&grant_type=authorization_code',
								success: function (res) {
									console.log(res)
									_this.data.sessionKey = res.data.session_key;
									_this.data.openid = res.data.openid;
								}
							})
						}
					})
				} else {
					console.log('获取用户登录态失败！' + res.errMsg)
				}
			}
    	});
	}
})