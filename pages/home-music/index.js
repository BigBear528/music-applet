// pages/home-music/index.js
import {
	getBanners,
	getSongMenu
} from '../../service/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'

import {
	rankingStore
} from '../../store/inde.js'

const throttleQueryRect = throttle(queryRect)

Page({
	data: {
		banners: [],
		swiperHeight: 0,
		recommendSongs: [],
		hotSongMenu: [],
		recommendSongMenu: [],
		rankings: {
			0: {},
			2: {},
			3: {}
		}
	},

	onLoad(options) {
		// 获取页面数据
		this.getPageData()

		// 发起共享数据的请求
		rankingStore.dispatch('getRankingDataAction')

		// 从store中获取数据
		rankingStore.onState('hotRanking', (res) => {
			const recommendSongs = res.tracks?.slice(0, 6)
			this.setData({
				recommendSongs: recommendSongs
			})
		})

		rankingStore.onState('newRanking', this.getRankingHandler(0))
		rankingStore.onState('originRanking', this.getRankingHandler(2))
		rankingStore.onState('upRanking', this.getRankingHandler(3))
	},

	// 网络请求
	getPageData() {
		getBanners().then(res => {
			this.setData({
				banners: res.banners
			})
		})

		getSongMenu().then(res => {
			this.setData({
				hotSongMenu: res.playlists
			})
		})

		getSongMenu('华语').then(res => {
			this.setData({
				recommendSongMenu: res.playlists
			})
		})
	},

	// 事件处理
	handleSearchClick() {
		wx.navigateTo({
			url: '/pages/detail-search/index',
		})
	},

	handleSwiperImageLoaded() {
		// 获取图片的高度(获取一个组件的高度)
		throttleQueryRect('.swiper-image').then(res => {
			const rect = res[0]
			this.setData({
				swiperHeight: rect.height
			})
		})
	},

	getRankingHandler(idx) {
		return (res) => {
			if (Object.keys(res).length === 0) return
			// console.log("idx:", idx)
			const name = res.name
			const coverImgUrl = res.coverImgUrl
			const playCount = res.playCount
			const songList = res.tracks.slice(0, 3)
			const rankingObj = {
				name,
				coverImgUrl,
				playCount,
				songList
			}
			const newRankings = {
				...this.data.rankings,
				[idx]: rankingObj
			}
			this.setData({
				rankings: newRankings
			})
			// console.log(this.data.rankings)
		}
	},

})