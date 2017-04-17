var app = getApp();
Page({
	data: {
		array: []
	},
	onReady: function () {
		this.getData();
	},
	getData: function () {
		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 500
		});
		var _this = this;
		wx.request({
			url: app.api.domainName + '/api/content/hotContents',
			method: 'POST',
			success: function (res) {
				console.log(res.data.data)
				res.data.data.forEach(function(item,index){
					res.data.data[index].startTime = app.fn.setTime(res.data.data[index].startTime)
				})
				_this.setData({
					array: res.data.data
				})
				wx.hideToast();
			}
		})
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