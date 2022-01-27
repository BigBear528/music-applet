// pages/detail-video/index.js
import { getMVURL } from '../../service/api_video'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		const id = options.id
		console.log(id)
		const res = await getMVURL(id)
		console.log(res)
	},

})