import request from '@/utils/request'

export function claimTask(taskId) {
  return request({
    url: '/v1/usertask/claim/' + taskId,
    method: 'put'
  })
}

export function unclaimTask(taskId) {
  return request({
    url: '/v1/usertask/unclaim/' + taskId,
    method: 'put'
  })
}

export function completeTask(taskId) {
  return request({
    url: '/v1/usertask/complete',
    method: 'post',
    params: { taskId }
  })
}
