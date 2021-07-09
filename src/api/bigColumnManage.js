import request from "@/util/request";

// 删除商品
export function delSmallColumn(params) {
  return request({
    url: "/basic/goodsColumn/",
    method: "delete",
    params
  });
}
// 删除专栏单品
export function delBigColumnSingleProduct(params) {
  return request({
    url: "/basic/goodsBigColumn/subGoods",
    method: "delete",
    params
  });
}
// 添加专栏
export function addSmallColumn(data) {
  // 01-视频、02-商品、03-会员卡、04-专栏、05-大专栏
  data.goodsType = "04";
  return request({
    url: "/basic/goodsColumn/",
    method: "post",
    data
  });
}

// 编辑专栏
export function saveSmallColumn(data) {
  return request({
    url: "/basic/goodsColumn/",
    method: "patch",
    data
  });
}
//大专栏详情
export function getBigColumn(params) {
  const { goodsId } = params;
  return request({
    url: `/basic/goodsBigColumn/${goodsId}`,
    method: "get"
  });
}
// 添加专栏商品
export function addBigColumnCommodity(data) {
  // 01-视频、02-商品、03-会员卡、04-专栏、05-大专栏
  // data.goodsType = "04 ";
  return request({
    url: "/basic/goodsBigColumn/subGoods",
    method: "post",
    data
  });
}
// 上/下架专栏
export function changeSmallColumnStatus(data) {
  return request({
    url: "/basic/goodsColumn/status",
    method: "patch",
    data
  });
}
