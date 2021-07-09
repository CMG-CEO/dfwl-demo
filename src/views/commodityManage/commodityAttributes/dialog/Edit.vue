<!--
 * @Author: KokoTa
 * @Date: 2020-12-29 13:41:29
 * @LastEditTime: 2021-01-07 16:05:04
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/baseDataManage/commodityAttributes/dialog/Edit.vue
-->
<template>
  <el-dialog :title="title" width="375px" :visible.sync="showFlag" @open="open">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="属性名称" prop="goodsAttrType">
        <el-select v-model="form.goodsAttrType" placeholder="选择属性名称" clearable filterable>
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.typeName"
            :value="item.typeName"
          >{{item.typeName}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="属性值" prop="goodsAttrValue">
        <el-input v-model="form.goodsAttrValue" placeholder="请输入属性值" clearable></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addGoodAttr, getGoodAttr, saveGoodAttr } from '@/api/commodityAttributes'
import { createRequiredRules } from '@/util'
export default {
  props: {
    isCreate: { // 类型: true 新建 false 编辑
      type: Boolean,
      required: true
    },
    currentSelect: { // 传入的数据
      type: Object,
      default: () => {}
    },
    typeList: {
      type: Array,
      defualt: () => []
    }
  },
  data () {
    return {
      showFlag: false,
      form: {},
      rules: createRequiredRules([
        'goodsAttrType',
        'goodsAttrValue'
      ], [
        '属性名称',
        '属性值'
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
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isCreate) {
            await addGoodAttr({ ...this.form })
            this.$message.success('新增成功')
          } else {
            await saveGoodAttr({ ...this.form })
            this.$message.success('保存成功')
          }
          this.showFlag = false
          this.$emit('reload')
        }
      })
    },

    async open () {
      setTimeout(async () => { // 延迟执行保证数据同步，其他框不加 setTimeout 是因为前面有请求作为阻塞了
        this.form = {}
        this.$refs.form && this.$refs.form.resetFields()
        if (!this.isCreate) {
          const { goodsAttrId } = this.currentSelect
          const goodsRes = await getGoodAttr({ goodsAttrId })
          this.form = goodsRes.data
        }
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
