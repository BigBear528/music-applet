import { getTopMV } from '../../service/api_video'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		topMVs: [],
		hasMore: true
	},

	/**
	 * 生命周期函数--监听页面加载(created)
	 */
	onLoad: async function (options) {
		this.getTopMVData(0)
	},


	// 页面下拉到底部出发的生命周期函数
	onReachBottom: function () {
		this.getTopMVData(this.data.topMVs.length)
	},

	// 页面上拉刷新生命周期函数
	onPullDownRefresh: function () {
		this.getTopMVData(0)
	},

	// 请求页面数据
	getTopMVData: async function (offset) {
		// 判断是否后面还有数据，没有则不请求
		if (!this.data.hasMore && offset !== 0) return

		// 请求开始前显示加载中图片
		wx.showNavigationBarLoading()

		// 真正发送请求
		const res = await getTopMV(offset)
		let newData = this.data.topMVs

		// 判断是上滑刷新还是下滑加载数据
		if (offset === 0) {
			newData = res.data
		} else {
			newData = newData.concat(res.data)
		}

		this.setData({ topMVs: newData })
		this.setData({ hasMore: res.hasMore })

		// 请求结束，关闭动画
		wx.hideNavigationBarLoading()
		if (offset === 0) {
			wx.stopPullDownRefresh()
		}
	},

	// 监听视频点击事件
	handleVideoItemClick: function (event) {
		const id = event.currentTarget.dataset.item.id
		wx.navigateTo({
			url: `/pages/detail-video/index?id=${id}`,
		})
	}

})