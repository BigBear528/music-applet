import dxRequest from './index'

export function getBanners() {
  return dxRequest.get('/banner', {
    type: 2
  })
}

export function getRankings(idx) {
  return dxRequest.get('/top/list', {
    idx
  })
}

export function getSongMenu(cat = '全部', limit = 6, offset = 0) {
  return dxRequest.get('/top/playlist', {
    cat,
    limit,
    offset
  })
}