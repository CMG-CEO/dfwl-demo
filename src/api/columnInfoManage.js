import request from '@/util/request'

// 获取栏目内容列表 ​/basic​/cdmAppColumns​/listDetailPage
export function getColumnsInfoList(params) {
  return request({
    url: '/basic/cdmAppColumns/listDetailPage',
    method: 'get',
    params
  })
}
// 获取栏目内容 新增中查询列表 ​basic/cdmColumnsDetail/listPage
export function getQueryInfoList(params) {
  return request({
    url: `/basic/cdmColumnsDetail/listPage`,
    method: 'get',
    params
  })
}
// 获取栏目内容 栏目选项
export function getColumnsInfoListAll(params) {
  return request({
    url: '/basic/cdmAppColumns/listAll',
    method: 'get',
    params
  })
}

// 删除栏目内容信息
export function delColumnsDetail(params) {
  return request({
    url: `/basic/cdmColumnsDetail/?columnsDetailId=${params}`,
    method: 'delete',
  })
}
// 保存顺序
export function seveColumnsIndexNo(data) {
  return request({
    url: `/basic/cdmColumnsDetail/`,
    method: 'patch',
    data
  })
}
// 选择添加
export function addColumnsSelect(data) {
  return request({
    url: `/basic/cdmColumnsDetail/`,
    method: 'post',
    data
  })
}
