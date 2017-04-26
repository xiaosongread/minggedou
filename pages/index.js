var app = getApp();
Page({
	data: {
		data: [],
		page: 1, //记录当前请求数据的页数
		count: 0 ,//文章列表总共的页数
		categories:[]//分类
	},
	onReady: function () {
		this.getCategories();
		this.getData();
	},
	getCategories:function(){
		var _this = this;
		wx.request({
			url: app.api.domainName + '/api/categories',
			method: 'post',
			success: function (res) {
				console.log(res.data)
				_this.setData({
					categories: res.data.data
				})
			}
		})
	},
	getData: function () {
		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 2000
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
				console.log(res.data.data)
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
	getCategoriesData:function(e){
		wx.request({
			url: app.api.domainName + '/api/categoryListContent',
			method: 'post',
			headers:{
				id:_this.data.page,
				limte:10
			},
			success: function (res) {
				console.log(res.data.data)
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
		  url: './contentInfo/contentInfo?id='+id
		})
	},
	jumpCategories:function(e){
		var id = e.currentTarget.id;
		wx.navigateTo({
		  url: './categoryList/categoryList?id='+id
		})
	},
	onReachBottom: function () {
		this.setData({
			page: ++ this.data.page
		})
		if(this.data.count != this.data.data.length){
				this.getData();
		}
	},
	onPullDownRefresh: function () {//下拉刷新
		setTimeout(function(){
			wx.stopPullDownRefresh();
		},1000)
		this.setData({
			page:1,
			data:[]
		})
		this.getData();
    },
	onShareAppMessage: function () {//设置分享
        return {
          title: '抿圪斗博客',
          desc: '抿圪斗博客-首页',
          path: 'index/index'
        }
    }
})