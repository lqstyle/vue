import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/users',
    method: 'get',
    params: query
  })
}

export function fetchUser(id) {
  return request({
    url: '/v1/users/' + id,
    method: 'get'
  })
}

export function createUser(user) {
  const data = {
    user
  }
  return request({
    url: '/v1/users',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/v1/users',
    method: 'put',
    data
  })
}

export function deleteUser(userId) {
  return request({
    url: '/v1/users/' + userId,
    method: 'delete'
  })
}

