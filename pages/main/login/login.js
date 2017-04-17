var app = getApp();
Page({
    data: {

    },
    onReady: function () {
		
	},
	getData: function () {
		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 500
		});
		var _this = this;
		wx.request({
			url: app.api.domainName + '/api/contentList',
			method: 'get',
			data:{
				page:_this.data.page,
				limte:10
			},
			success: function (res) {
				res.data.data.forEach(function(item,index){
					res.data.data[index].startTime = app.fn.setTime(res.data.data[index].startTime)
				})
				_this.setData({
					count: res.data.count,
					data: _this.data.data.concat(res.data.data)
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
	}
})