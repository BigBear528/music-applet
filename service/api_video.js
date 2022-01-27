import dxRequest from './index'

// 请求MV列表信息
export function getTopMV(offset, limit = 10) {
	return dxRequest.get('/top/mv', { offset, limit })
}


// 请求MV的播放地址
export function getMVURL(id) {
	return dxRequest.get("/mv/url", {
		id
	})
}