App({
	api:{
		// domainName:'http://localhost:8080'//本地域名
		domainName:"https://blog.songyanbin.com"//生产域名
	},
	data:{
		encryptedData: "",//后台用来解密，获取用户的openId等用户的信息
		appId: "wxfd528d56a6f059ec",
		sessionKey: "",
		iv:"",
		code:"",
		secret:'53350954146a3e4255987c11746fd19d',
		screenHeight:0
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
		var res = wx.getSystemInfoSync()	
		this.data.screenHeight = res.screenHeight;
		// var _this = this;
		// wx.login({
		// 	success: function(res) {
		// 		console.log(res)
		// 		_this.data.code = res.code;
		// 		wx.getUserInfo({
		// 			success: function(res) {
		// 				var userInfo = res.userInfo
		// 				_this.data.header = userInfo.avatarUrl//用户头像
		// 				_this.data.userName = userInfo.nickName//用户姓名
		// 			}
		// 		})
		// 	}
    	// });
	}
})