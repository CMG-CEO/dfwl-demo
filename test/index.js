/*
 * @Author: KokoTa
 * @Date: 2020-12-23 13:46:40
 * @LastEditTime: 2020-12-23 14:28:27
 * @LastEditors: KokoTa
 * @Description: 本地服务器，用于调试请求
 * @FilePath: /future-bms/test/index.js
 */
const http = require('http')

const server = http.createServer((request, response) => {
  const { url, method } = request

  console.log(url, method)

  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (url === '/good' && method === 'GET') {
    response.statusCode = 200
    response.write('ok')
  }
  if (url === '/bad' && method === 'GET') {
    response.statusCode = 500
    response.write('error')
  }
  response.end()
})

server.listen(3000)
