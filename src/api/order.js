import request from "@/util/request";

// 获取订单列表
export function getOrderList(params) {
  return request({
    url: `/basic/order/list`,
    method: "get",
    params
  });
}

// 添加订单
export function addOrder(data) {
  return request({
    url: "/basic/order/add/",
    method: "post",
    data
  });
}

//编辑订单
export function saveOrder(data) {
  return request({
    url: "/basic/order/",
    method: "patch",
    data
  });
}
//专栏详情
export function editOrder(params) {
  const { orderId } = params;
  return request({
    url: `/basic/order/${orderId}`,
    method: "get"
  });
}
// 保存地址
export function addressSave(data) {
  return request({
    url: "/basic/order/address",
    method: "post",
    data
  });
}
//支付确认
export function paySubmit(data) {
  return request({
    url: "/basic/order/confirmPlay",
    method: "post",
    data
  });
}
//取消订单
export function cancelOrder(data) {
  return request({
    url: "/basic/order/cancel",
    method: "post",
    data
  });
}
//关闭订单
export function closeOrder(data) {
  return request({
    url: "/basic/order/close",
    method: "post",
    data
  });
}
export function refuseSubmit(data) {
  return request({
    url: "/basic/order/orderRefund/",
    method: "patch",
    data
  });
}
