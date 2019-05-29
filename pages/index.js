var app = getApp();
Page({
	data: {
		data: [],
		page: 1, //记录当前请求数据的页数
		count: 0 ,//文章列表总共的页数
		categories:[],//分类
		height:0,//屏幕的高度
		isAjaxSucess:false,//标记ajax请求数据是否成功
    token:''

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
						data: _this.data.data.concat(res.data.data),
						isAjaxSucess:true
					})
					wx.hideToast();
				}
			})
		},500)
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
			data:[],
			isAjaxSucess:false
		})
		this.getData();
    },
	onShareAppMessage: function () {//设置分享
        return {
          title: '抿圪斗博客',
          desc: '抿圪斗博客-首页',
          path: 'index/index'
        }
  },
  saoma: function(){
    var _this = this;
    wx.request({
      url: app.api.domainName + '/api/user/WeChat/token',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("数据分析接口数据:", res)
        // _this.setData({
        //   token: res.token
        // })
      }
    })

    // wx.request({
    //   url: 'https://api.weixin.qq.com/datacube/getweanalysisappiduserportrait?access_token=ACCESS_TOKEN',
    //   method: 'post',
    //   headers: {
    //     id: _this.data.page,
    //     limte: 10
    //   },
    //   data: {
    //     "begin_date": "2017-06-11",
    //     "end_date": "2017-12-17"
    //   },
    //   success: function (res) {
    //     console.log("111:",res)
        
    //   }
    // })
  }
})