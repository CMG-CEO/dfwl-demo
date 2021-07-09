<!--
 * @Author: KokoTa
 * @Date: 2021-02-05 14:23:03
 * @LastEditTime: 2021-02-05 14:35:22
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /future-bms/doc/index.md
-->

# 交接文档

## 基础信息

1. Github地址：`http://120.27.212.210:18080/root/web.management.git`
2. 发布命令：`sh ./docker.sh`（需要先安装 docker）
3. 纯打包命令：见 `package.json`
4. 默认的用户名：闽公社，chenfy，123
5. 代码接口地址：`http://192.168.101.201:28080/api/v1`

## 产品原型

1. 后台管理原型：[https://rz2tx4.axshare.com]，密码：1234
2. app学员端原型：[https://br1yc9.axshare.com]，密码：6789
3. app老师端原型：[https://yp5qk3.axshare.com]，密码：6666
4. 官网原型：[https://m3oq4d.axshare.com]，密码：1688
5. H5原型：[https://s207id.axshare.com]，密码：1888

## 部署过程

```shell
ssh dfwl-deploy@192.168.101.201

dfwl100

cd df-app-deployment/docker-compose

./down-web.sh
vi docker-compose.yml
./start-services.sh
```

## Docker相关

```shell
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "insecure-registries" : ["192.168.101.201:5000"]
}
EOF

sudo systemctl restart docker
docker login 192.168.101.201:5000

dfwl
dfwl100
```
 ## 项目说明

1. 当前项目进度见 `/src/router/index.js` 中的注释
2. 新建页面路由参见 `/src/router/routerInfo.js`
3. api 文件夹存放各个页面的请求路径信息，其中 request 函数是对 axios 的封装
4. components 组件的用法建议结合实际的页面看，推荐从 `/src/views/baseDataManage` 目录中开始看
5. `/src/mixin/pagination.js` 这个 mixin 几乎每个页面都会引入，里面把重复的一些操作都抽出来了，注意变量命名问题，比如 `searchData` 这个变量
6. `/src/views/commodityManage` 下的页面公用的组件都存放在 `/src/views/commodityManage/bigColumnManage/dialog` 中，也是结合页面开始看，可以先从 `/src/views/commodityManage/videoManage` 开始看起，然后进入组件部分看，样式都写好了，只要对接口和字段就行了
7. 关于打包，使用 `sh ./docker.sh` 输入版本号后会自动打包镜像到镜像库中，输入的版本号一般为 0.3.0205，第一个 0 为主版本号，正式上线后才改动，第二个 3 为功能版本号，第三个 0205 为日期
8. 打包后需要去服务器修改对应文件和执行对应的脚本，这里需要询问后端操作
