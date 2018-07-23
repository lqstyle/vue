import request from '@/utils/request'

export function fetchProcessDefinitionList(offset, limit, processDefinitionKey) {
  const data = {
    offset,
    limit,
    processDefinitionKey
  }
  return request({
    url: '/v1/models',
    method: 'get',
    params: data
  })
}

export function fetchFormInfo(taskId) {
  return request({
    url: '/v1/usertasks/' + taskId + '/form',
    method: 'get'
  })
}
