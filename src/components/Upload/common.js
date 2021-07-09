export const changeSeconds = value => {
  var theTime = parseInt(value); // 需要转换的时间秒
  var theTime1 = 0; // 分
  var theTime2 = 0; // 小时
  var theTime3 = 0; // 天
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
      if (theTime2 > 24) {
        //大于24小时
        theTime3 = parseInt(theTime2 / 24);
        theTime2 = parseInt(theTime2 % 24);
      }
    }
  }
  var result = "";
  if (theTime > 0) {
    result = "" + parseInt(theTime) + "秒";
  }
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1) + "分" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + "小时" + result;
  }
  if (theTime3 > 0) {
    result = "" + parseInt(theTime3) + "天" + result;
  }
  return result;
};
export const timeFn = (d1, d2) => {
  //di作为一个变量传进来
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  var dateBegin = new Date(d1); //将-转化为/，使用new Date
  var dateEnd = new Date(d2); //获取当前时间
  var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000);
  console.log(
    " 相差 " +
      dayDiff +
      "天 " +
      hours +
      "小时 " +
      minutes +
      " 分钟" +
      seconds +
      " 秒"
  );
  // console.log(
  //   dateDiff + "时间差的毫秒数",
  //   dayDiff + "计算出相差天数",
  //   leave1 + "计算天数后剩余的毫秒数",
  //   hours + "计算出小时数",
  //   minutes + "计算相差分钟数",
  //   seconds + "计算相差秒数"
  // );
  return (
    dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
  );
};
