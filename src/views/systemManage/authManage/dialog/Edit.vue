<!--
 * @Author: KokoTa
 * @Date: 2020-12-23 14:58:35
 * @LastEditTime: 2021-01-21 15:39:10
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/platformManage/accountManage/dialog/Edit.vue
-->
<template>
  <el-dialog :title="title" :visible.sync="showFlag" @open="open">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="权限编码" prop="code">
        <el-input
          v-model="form.code"
          placeholder="请输入编码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="权限名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入权限名称"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="权限描述" prop="description">
        <el-input
          type="textarea"
          v-model="form.description"
          placeholder="请输入权限描述"
        ></el-input>
      </el-form-item>
      <el-table
        :data="tableData"
        ref="table"
        style="width: 100%"
        max-height="250"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          width="180"
          v-for="(item, index) in columnList"
          :key="item.prop + index"
        >
        </el-table-column>
      </el-table>
    </el-form>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit" v-if="!view"
        >确定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { baseStatus } from "@/util/option";
import { ResourceType } from "@/util/constant";
import SelectMaterial from "@/components/SelectMaterial";
import { createRequiredRules } from "@/util";
import {
  privilegesRequest,
  addAccount,
  saveAccount,
  getAccountId
} from "@/api/role";

export default {
  components: { SelectMaterial },
  props: {
    isCreate: {
      // 类型: true 新建 false 编辑
      type: Boolean,
      required: true
    },
    view: {},
    currentSelect: {
      // 传入的数据
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      columnList: [],
      tableData: [],
      showFlag: false,
      columnList: [
        { prop: "id", label: "资源编码" },
        { prop: "name", label: "资源名称" },
        { prop: "domain", label: "模块定义" },
        { prop: "description", label: "描述" }
      ],
      form: {},
      baseStatus,
      resourceType: ResourceType.IMAGE,
      rules: createRequiredRules(
        ["code", "name", "description"],
        ["角色编号", "角色名称", "角色描述"]
      )
    };
  },
  computed: {
    title() {
      return this.isCreate ? "新建" : "编辑";
    }
  },
  watch: {
    showFlag(newVal, oldVal) {
      if (newVal == false) {
        this.$emit("update:view", false);
      }
    }
  },
  methods: {
    async privilegesRequest() {
      let data = await privilegesRequest();
      this.tableData = data.data;
      console.log(data);
    },
    handleSelectionChange(val) {
      console.log(val);
      let privileges = val.map(item => item.name);
      this.form = { ...this.form, privileges };
      console.log(this.form);
    },

    async submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // const [effectiveDate, expiryDate] = this.form.range;
          if (this.isCreate) {
            await addAccount({ ...this.form });

            this.$message.success("新增成功");
          } else {
            const { id } = this.currentSelect;
            await saveAccount({ ...this.form, roleId: id });
            this.$message.success("保存成功");
          }
          this.showFlag = false;
          this.$emit("reload");
        }
      });
    },

    async open() {
      this.form = {};
      this.$refs.form && this.$refs.form.resetFields();
      this.$refs.selectMaterial && (this.$refs.selectMaterial.form = {});
      this.privilegesRequest();
      if (!this.isCreate) {
        console.log(this.isCreate);
        // 根据类型获取对应详情
        const { id } = this.currentSelect;
        this.form = (await getAccountId({ roleId: id })).data;

        this.form.privileges.forEach(item2 => {
          this.tableData.forEach((item3, index3) => {
            if (item2.id == item3.id) {
              this.$nextTick(() => {
                // 注意：toggleRowSelection(item, true) 中 item 必须是行数据
                this.$refs.table.toggleRowSelection(item3, true);
              });
            }
          });
        });
      }
    }
  }
};
</script>

<style scoped>
.el-input,
.el-select {
  width: 300px;
}
.el-textarea {
  width: 55%;
}
</style>
