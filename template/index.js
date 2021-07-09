/*
 * @Author: KokoTa
 * @Date: 2020-12-21 16:25:51
 * @LastEditTime: 2020-12-22 09:16:10
 * @LastEditors: KokoTa
 * @Description:
 *    输入路径名，生成对应视图模板文件
 *    比如输入 /test/test/index.vue，则会生成 /src/views/test/test/index.vue
 * @FilePath: /future-bms/template/index.js
 */
const readLine = require('readline')
const fs = require('fs')
const path = require('path')

// 获取控制台输入
const readInput = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

readInput.on('line', (data) => {
  const match = data.match(/(.+)\/(.+)(?=\.vue)/)
  if (!match) {
    console.log('非法的 vue 文件路径，格式应为 /xxx/ooo.vue')
    readInput.close()
  } else {
    const filePath = match[1]
    const fileName = match[2]
    const fileExt = path.extname(data)
    const fileDir = path.resolve(path.join(__dirname, '../src/views', filePath)) + '/'
    try {
      // 检查是否存在文件夹
      const exist = fs.existsSync(fileDir)
      if (!exist) fs.mkdirSync(fileDir, { recursive: true })
      // 新建文件
      const templateData = fs.readFileSync(path.resolve(__dirname, 'vueTemplate.vue'))
      fs.writeFileSync(`${fileDir}${fileName}${fileExt}`, templateData)
      console.log(`新建 ${fileDir}${fileName}${fileExt} 成功`)
    } catch (error) {
      console.log(error)
    }
  }
})
