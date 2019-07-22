var app = getApp();
Page({
	onShareAppMessage: function () {//设置分享
        return {
          title: '抿圪斗博客',
          desc: '抿圪斗博客-首页',
          path: 'index/index'
        }
    }
})