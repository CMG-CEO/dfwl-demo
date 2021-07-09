import request from "@/util/request";

// 获取专栏列表
export function getSmallColumnList(params) {
  return request({
    url: `/basic/goodsColumn/list`,
    method: "get",
    params
  });
}

// 删除商品
export function delSmallColumn(params) {
  return request({
    url: "/basic/goodsColumn/",
    method: "delete",
    params
  });
}
// 删除子专栏单品
export function delSmallColumnSingleProduct(params) {
  return request({
    url: "/basic/goodsColumn/subGoods",
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
//专栏详情
export function getSmallColumn(params) {
  const { goodsId } = params;
  return request({
    url: `/basic/goodsColumn/${goodsId}`,
    method: "get"
  });
}
// 添加专栏商品
export function addSmallColumnCommodity(data) {
  // 01-视频、02-商品、03-会员卡、04-专栏、05-大专栏
  // data.goodsType = "04 ";
  return request({
    url: "/basic/goodsColumn/subGoods",
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

// export function getSmallColumn(params) {
//   const { goodsId } = params;
//   return request({
//     url: `/basic/goodsColumn/${goodsId}`,
//     method: "get"
//   });
// }
