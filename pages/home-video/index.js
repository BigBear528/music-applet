import dxRequest, { getTopMV } from '../../service/api_video'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		topMVs: []
	},

	/**
	 * 生命周期函数--监听页面加载(created)
	 */
	onLoad: function (options) {
		getTopMV().then((res) => {
			this.setData({ topMVs: res.data.data })
		}).catch((err) => {
			console.log(err)
		})
	},


})