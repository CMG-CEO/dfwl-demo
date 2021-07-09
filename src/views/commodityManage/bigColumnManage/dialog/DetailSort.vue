<!--
 * @Author: KokoTa
 * @Date: 2021-02-01 15:40:06
 * @LastEditTime: 2021-02-01 17:24:07
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/commodityManage/bigColumnManage/dialog/DetailSort.vue
-->
<template>
  <el-dialog :title="title" width="400px" :visible.sync="showFlag" @open="open" append-to-body>
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="排序" prop="indexNo">
        <el-input-number v-model="form.indexNo" placeholder="请输入排序顺序"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createRequiredRules } from '@/util'
import { sortGoodsVideoAttach } from '@/api/videoManage'

export default {
  props: {
    currentItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showFlag: false,
      form: {},
      rules: createRequiredRules([
        'indexNo'
      ], [
        '排序'
      ])
    }
  },
  computed: {
    title () {
      return this.isCreate ? '新建' : '编辑'
    }
  },
  methods: {
    async submit () {
      const { goodsAttachId, indexNo } = this.form
      await sortGoodsVideoAttach({ goodsAttachId, indexNo })
      this.$message.success('操作成功')
      this.showFlag = false
      this.$emit('reload')
    },

    async open () {
      setTimeout(() => {
        this.form = { ...this.currentItem }
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
