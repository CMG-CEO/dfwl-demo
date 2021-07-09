###
 # @Author: KokoTa
 # @Date: 2021-01-07 16:25:18
 # @LastEditTime: 2021-01-08 09:35:40
 # @LastEditors: KokoTa
 # @Description: 
 # @FilePath: /future-bms/docker.sh
### 
read -p "输入版本号" v
echo "设置版本号为"$v
yarn build
docker build . -t dfwl-web-manage:$v
docker tag dfwl-web-manage:$v 192.168.101.201:5000/dfwl-web-manage:$v
docker push 192.168.101.201:5000/dfwl-web-manage:$v
# docker run -d -p 8080:80 dfwl-web-manage:$v