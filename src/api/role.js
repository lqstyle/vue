import request from '@/utils/request'

export function fetchRoleList() {
  return request({
    url: '/v1/roles',
    method: 'get',
    params: ''
  })
}
