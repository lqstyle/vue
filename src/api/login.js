import request from '@/utils/request'

export function loginByUsername(loginName, password) {
  const data = {
    loginName,
    password
  }
  return request({
    url: '/v1/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/v1/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/v1/login/user',
    method: 'get',
    params: { token }
  })
}

