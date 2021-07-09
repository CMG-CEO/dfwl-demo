<!--
 * @Author: KokoTa
 * @Date: 2020-12-22 09:43:10
 * @LastEditTime: 2020-12-28 16:00:46
 * @LastEditors: KokoTa
 * @Description: 平台管理 - 资源管理
 * @FilePath: /future-bms/src/views/platformManage/resourceManage/index.vue
-->
<template>
  <div class="tree-manage-wrap">
    <!-- 左侧树形菜单 -->
    <div class="panel left">
      <Tree :showOperation="true" :treeData="treeData"></Tree>
    </div>
    <!-- 右侧表单 -->
    <div class="panel right">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级资源">
          <el-select v-model="form.name" placeholder="请选择上级资源">
            <el-option label="label" value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源代码">
          <el-input v-model="form.name" placeholder="请输入资源代码"></el-input>
        </el-form-item>
        <el-form-item label="资源名称">
          <el-input v-model="form.name" placeholder="请输入资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源地址">
          <el-input v-model="form.name" placeholder="请输入资源地址"></el-input>
        </el-form-item>
        <el-form-item label="资源类型">
          <el-select v-model="form.name" placeholder="请选择资源类型">
            <el-option label="label" value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源图标">
          <el-input v-model="form.name" placeholder="请输入资源图标"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序">
          <el-input v-model="form.name" placeholder="请输入显示顺序"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.name" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.name" placeholder="请选择状态">
            <el-option label="label" value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认权限">
          <el-select v-model="form.name" placeholder="请选择默认权限">
            <el-option label="label" value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mockTreeData } from '@/util/mock'
import Tree from '@/components/Tree'

export default {
  components: { Tree },
  data () {
    return {
      treeData: mockTreeData(4, 2),
      form: {}
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
