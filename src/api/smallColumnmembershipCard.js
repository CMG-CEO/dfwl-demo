import request from "@/util/request";

// 获取会员卡列表
export function getSmallColumnmembershipCard(params) {
  return request({
    url: `/basic/goodsMember/list`,
    method: "get",
    params
  });
}

// 删除商品
export function delVipInterests(params) {
  return request({
    url: "/basic/goodsMember/subGoods",
    method: "delete",
    params
  });
}
// 添加会员卡
export function addMembershipCard(data) {
  // 01-视频、02-商品、03-会员卡、04-专栏、05-大专栏
  data.goodsType = "03";
  return request({
    url: "/basic/goodsMember/",
    method: "post",
    data
  });
}

// 编辑会员卡
export function saveMembershipCard(data) {
  return request({
    url: "/basic/goodsMember/",
    method: "patch",
    data
  });
}

//获取会员卡内容

export function getVipmange(params) {
  return request({
    url: `/basic/goodsMember/${params.goodsId}`,
    method: "get"
  });
}
// 添加会员子权益
export function addVipmanager(data) {
  // 01-视频、02-商品、03-会员卡、04-会员卡、05-大会员卡
  // data.goodsType = "04 ";
  return request({
    url: "/basic/goodsMember/subGoods",
    method: "post",
    data
  });
}
// 上/下架会员卡
export function changeSmallColumnStatus(data) {
  return request({
    url: "/basic/goodsMember/status",
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
