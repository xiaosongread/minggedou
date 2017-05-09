var app = getApp();
Page({
	data: {
		data: [],
		page: 1, //记录当前请求数据的页数
		count: 0 ,//文章列表总共的页数
		categories:[],//分类
		nowCategoriesName:"",//当前分类名称
		id:"",//分类的id
		height:0,//屏幕的高度
		isAjaxSucess:false//标记ajax请求数据是否成功
	},
	onLoad: function(options){
		var that = this;
		this.setData({
			id:options.id
		})
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
	getData: function (id) {
		var height = app.data.screenHeight
		this.setData({
			height:height
		})
		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 2000
		});
		var _this = this;
		setTimeout(function(){
			wx.request({
				url: app.api.domainName + '/api/categoryListContent',
				method: 'get',
				data:{
					page:_this.data.page,
					limte:10,
					id:_this.data.id
				},
				success: function (res) {
					console.log(res.data.data)
					console.log(res.data.data[0].category.name)
					res.data.data.forEach(function(item,index){
						res.data.data[index].startTime = app.fn.setTime(res.data.data[index].startTime)
					})
					_this.setData({
						count: res.data.count,
						data: _this.data.data.concat(res.data.data),
						nowCategoriesName:res.data.data[0].category.name,
						isAjaxSucess:true
					})
					wx.hideToast();
				}
			})
		},500)
	},
	getData1: function (id) {
		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 2000
		});
		var _this = this;
		this.setData({
			data: []
		})
		wx.request({
			url: app.api.domainName + '/api/categoryListContent',
			method: 'get',
			data:{
				page:_this.data.page,
				limte:10,
				id:_this.data.id
			},
			success: function (res) {
				console.log(res.data)
				res.data.data.forEach(function(item,index){
					res.data.data[index].startTime = app.fn.setTime(res.data.data[index].startTime)
				})
				_this.setData({
					count: res.data.count,
					data: _this.data.data.concat(res.data.data),
					nowCategoriesName:res.data.data[0].category.name
				})
				wx.hideToast();
			}
		})
	},
	jumpCategories:function(e){
		var id = e.currentTarget.id;
		this.setData({
			id: id,
			page: 1
		})
		console.log(id)
		this.getData1(id)
	},
	jumpFn: function(e){
		var id = e.currentTarget.id;
		wx.navigateTo({
		  url: '../contentInfo/contentInfo?id='+id
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
			data:[],
			isAjaxSucess:false
		})
		this.getData1();
    },
	onShareAppMessage: function () {//设置分享
        return {
          title: '抿圪斗博客',
          desc: '抿圪斗博客-首页',
          path: 'index/index'
        }
    }
})