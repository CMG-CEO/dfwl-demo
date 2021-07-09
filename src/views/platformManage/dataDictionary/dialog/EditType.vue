<!--
 * @Author: KokoTa
 * @Date: 2020-12-23 16:24:19
 * @LastEditTime: 2020-12-23 17:25:29
 * @LastEditors: KokoTa
 * @Description: 字典类型新增或编辑
 * @FilePath: /future-bms/src/views/platformManage/dataDictionary/dialog/CreateOrModifyType.vue
-->
<template>
  <el-dialog :title="title" width="375px" :visible.sync="showFlag">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="字典类型">
        <el-input v-model="form.account" placeholder="请输入字典类型" clearable></el-input>
      </el-form-item>
      <el-form-item label="字典名称">
        <el-input v-model="form.account" placeholder="请输入字典名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="序号">
        <el-input v-model="form.account" placeholder="请输入序号" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.account" placeholder="请选择状态" clearable filterable>
          <el-option
            v-for="(item, index) in baseStatus"
            :key="index"
            :label="item.label"
            :value="item.value"
          >{{item.label}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明">
        <el-input type="textarea" v-model="form.account" placeholder="请输入说明" clearable></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { baseStatus } from '@/util/option'

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
      baseStatus
    }
  },
  computed: {
    title () {
      return this.isCreate ? '新建' : '编辑'
    }
  },
  methods: {
    submit () {
      console.log(this.form)
    }
  }
}
</script>

<style>
</style>
