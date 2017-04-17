var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({
    data: {
    	data: [],
		id:'',//当前文章的ID
		contents:''//文章的内容
    },
	onLoad: function(options){
		var that = this;
		this.setData({
			id:options.id
		})
		this.getData(options.id);
	},
    onReady: function () {
		// this.getData();
	},
	getData: function (id) {
		wx.showToast({
			title: '加载中',
			icon: 'loading',
			duration: 500
		});
		var _this = this;
		wx.request({
			url: app.api.domainName + '/api/content/nowContentInfo',
			method: 'get',
			data: {
				contentId: id
			},
			header: {
				'content-Type': 'application/json;charset=UTF-8;'
			},
			success: function (res) {
				var data = res.data.data[0];
				_this.setData({
					data: data,
					contents:data.content
				})
				var article = _this.data.contents;
				WxParse.wxParse('article', 'html', article, _this);
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
          desc: '抿圪斗博客-文章详情',
          path: 'contentInfo/contentInfo'
        }
    }
})