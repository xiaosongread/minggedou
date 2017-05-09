var app = getApp();
Page({
	data: {
		array: [],
		height:0,//屏幕的高度
		isAjaxSucess:false//标记ajax请求数据是否成功
	},
	onReady: function () {
		this.getData();
	},
	getData: function () {
		var height = app.data.screenHeight
		this.setData({
			height:height
		})
		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 500
		});
		var _this = this;
		setTimeout(function(){
			wx.request({
				url: app.api.domainName + '/api/content/hotContents',
				method: 'POST',
				success: function (res) {
					console.log(res.data.data)
					res.data.data.forEach(function(item,index){
						res.data.data[index].startTime = app.fn.setTime(res.data.data[index].startTime)
					})
					_this.setData({
						array: res.data.data,
						isAjaxSucess:true
					})
					wx.hideToast();
				}
			})
		},500)
	},
	jumpFn: function(e){
		var id = e.currentTarget.id;
		wx.navigateTo({
		  url: '../contentInfo/contentInfo?id='+id
		})
	},
	onShareAppMessage: function () {//设置分享
		return {
			title: '抿圪斗博客',
			desc: '抿圪斗博客-热门文章',
			path: 'hotContent/hotContent'
		}
    }
})