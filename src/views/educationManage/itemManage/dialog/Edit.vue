<!--
 * @Author: KokoTa
 * @Date: 2021-01-06 14:03:02
 * @LastEditTime: 2021-01-20 14:06:28
 * @LastEditors: KokoTa
 * @Description: 新增/购入/领用
 * @FilePath: /future-bms/src/views/educationManage/itemManage/dialog/Edit.vue
-->
<template>
  <el-dialog :title="title" width="400px" :visible.sync="showFlag" @open="open">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="类型" prop="catalogId">
        <el-select
          v-model="form.catalogId"
          placeholder="请选择类型"
          clearable
          filterable
          :disabled="type > 2"
        >
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.catalogName"
            :value="item.catalogId"
            >{{ item.catalogName }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="物品编码" prop="materialsNo">
        <el-input
          v-model="form.materialsNo"
          placeholder="物品编码"
          clearable
          :disabled="type > 2"
        ></el-input>
      </el-form-item>
      <el-form-item label="物品名称" prop="materialsName">
        <el-input
          v-model="form.materialsName"
          placeholder="请输入物品名称"
          clearable
          :disabled="type > 2"
        ></el-input>
      </el-form-item>
      <el-form-item label="物品数量" prop="quantity">
        <el-input-number
          v-model="form.quantity"
          placeholder="请输入数量"
          clearable
          :min="1"
        ></el-input-number>
        <span v-if="type > 2">当前数量：{{ form.quantityBackup }}</span>
      </el-form-item>
      <el-form-item label="物品图片" prop="materialsUrl">
        <!-- 素材选择组件 -->
        <SelectMaterial
          ref="selectMaterial"
          :url="form.materialsUrl"
          :resourceType="resourceType"
          :disabled="type > 2"
          @selected="handleSelect"
        ></SelectMaterial>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请输入备注信息"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createRequiredRules } from "@/util";
import {
  addMaterial,
  consumeMaterial,
  getMaterial,
  purchaseMaterial,
  saveMaterial
} from "@/api/itemManage";
import { getCatalogOption } from "@/util/option";
import SelectMaterial from "@/components/SelectMaterial";
import { ResourceType } from "@/util/constant";

export default {
  components: { SelectMaterial },
  props: {
    type: {
      // 类型: 1 新增 2 编辑 3 购入 4 领用
      type: Number,
      default: 1
    },
    currentSelect: {
      // 传入的数据
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showFlag: false,
      form: {},
      typeList: [],
      rules: createRequiredRules(
        [
          "catalogId",
          "materialsNo",
          "materialsName",
          "quantity",
          "materialsUrl"
        ],
        ["类型", "物品编码", "物品名称", "物品数量", "物品图片"]
      ),
      resourceType: ResourceType.IMAGE
    };
  },
  computed: {
    title() {
      switch (this.type) {
        case 1:
          return "新增";
        case 2:
          return "编辑";
        case 3:
          return "购入";
        case 4:
          return "领用";
        default:
          return "未知";
      }
    }
  },
  methods: {
    handleSelect(url) {
      this.form = { ...this.form, materialsUrl: url };
    },
    show(type, data) {
      // this.visible = true
      console.log("this is datas from index.vue", type, data);
    },
    async submit() {
      const { type } = this;
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (type === 1) {
            await addMaterial({ ...this.form });
          }
          if (type === 2) {
            await saveMaterial({ ...this.form });
          }
          if (type === 3) {
            await purchaseMaterial({ ...this.form });
          }
          if (type === 4) {
            await consumeMaterial({ ...this.form });
          }
          this.showFlag = false;
          this.$message.success("操作成功");
          this.$emit("reload");
        }
      });
    },

    async open() {
      this.typeList = await getCatalogOption();
      // 表单清空
      this.$refs.form && this.$refs.form.resetFields();
      this.form = {};

      // 资源选择组件清空
      this.$refs.selectMaterial.form = {};

      if (this.currentSelect && this.type !== 1) {
        const { materialsId } = this.currentSelect;
        const data = await getMaterial({ materialsId });
        this.form = data.data;
      }

      if (this.type > 2) {
        this.form.quantityBackup = this.form.quantity;
        this.form.quantity = 1;
        this.form.remark = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
