import request from "@/util/request";
// 获取专栏列表
export function getBigColumnList(params) {
  return request({
    url: `/basic/goodsBigColumn/list`,
    method: "get",
    params
  });
}

// 新增大专栏详情
export function addBigColumn(data) {
  // 01-视频、02-商品、03-会员卡、04-专栏、05-大专栏
  data.goodsType = "05";
  return request({
    url: "/basic/goodsBigColumn/",
    method: "post",
    data
  });
}

export function saveBigColumn(data) {
  return request({
    url: "/basic/goodsBigColumn/",
    method: "patch",
    data
  });
}
// 大专栏详情
export function getBigColumn(params) {
  const { goodsId } = params;
  return request({
    url: `/basic/goodsBigColumn/${goodsId}`,
    method: "get"
  });
}

export function delBigColumn(params) {
  return request({
    url: "/basic/goodsBigColumn/",
    method: "delete",
    params
  });
}

export function changeBigColumnStatus(data) {
  return request({
    url: "/basic/goodsBigColumn/status",
    method: "patch",
    data
  });
}
