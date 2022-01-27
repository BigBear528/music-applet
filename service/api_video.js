import dxRequest from './index'

export function getTopMV(){
	return dxRequest.get('/top/mv', { offset: 0, limit: 10 })
}