import dxRequest from './index'

export function getBanners() {
  return dxRequest.get('/banner', {
    type: 2
  })
}