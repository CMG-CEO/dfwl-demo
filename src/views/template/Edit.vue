<!--
 * @Author: KokoTa
 * @Date: 2020-12-29 13:42:15
 * @LastEditTime: 2021-01-06 11:02:08
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/template/Edit.vue
-->
<template>
  <el-dialog :title="title" width="400px" :visible.sync="showFlag" @open="open">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="上级名称">
        <el-select v-model="form.account" placeholder="请选择上级名称" clearable filterable>
          <el-option
            v-for="(item, index) in subjectList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >{{item.label}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品分组名称">
        <el-input v-model="form.account" placeholder="商品分组名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.account" type="textarea" placeholder="请输入备注" clearable></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mockTreeData } from '@/util/mock'

export default {
  props: {
    isCreate: { // 类型: true 新建 false 编辑
      type: Boolean,
      required: true
    },
    currentSelect: { // 传入的数据
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showFlag: false,
      form: {},
      treeData: mockTreeData(4, 2)
    }
  },
  computed: {
    title () {
      return this.isCreate ? '新建' : '编辑'
    }
  },
  methods: {
    async submit () {
      console.log(this.form)
    },

    async open () {}
  }
}
</script>

<style lang="scss" scoped>
</style>
