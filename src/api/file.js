import request from '@/utils/request'

export function removeFile(id) {
  return request({
    url: '/v1/files/' + id,
    method: 'delete'
  })
}

export function fetchFiles(caseId) {
  return request({
    url: '/v1/files/' + caseId,
    method: 'get'
  })
}

