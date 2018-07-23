import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/cases',
    method: 'get',
    params: query
  })
}

export function fetchCaseHistoryList(query) {
  return request({
    url: '/v1/cases/all/history',
    method: 'get',
    params: query
  })
}

export function fetchCase(id) {
  return request({
    url: '/v1/cases/' + id,
    method: 'get'
  })
}

export function createCase(client, processDefinitionId) {
  const data = {
    client,
    processDefinitionId
  }
  return request({
    url: '/v1/cases',
    method: 'post',
    data
  })
}

export function updateCase(data) {
  return request({
    url: '/v1/cases',
    method: 'put',
    data
  })
}
