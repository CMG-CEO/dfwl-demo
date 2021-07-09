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
      <el-form-item label="角色编号" prop="code">
        <el-input
          v-model="form.code"
          placeholder="请输入编号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入角色名称"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="角色描述" prop="description">
        <el-input
          type="textarea"
          v-model="form.description"
          placeholder="请输入角色描述"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit" v-if="!view"
        >确定</el-button
      >
    </span>
    <div class="belong-wrap">
      <div class="belong-left">
        <div class="belong-title">可配角色权限</div>
        <div class="belong-left-content">
          <Tree
            ref="tree"
            :showCheckbox="true"
            :treeData="treeData"
            @checkChange="checkChange"
          ></Tree>
        </div>
      </div>
      <div class="belong-right">
        <div class="belong-title">已配角色权限</div>
        <div class="belong-right-content">
          <div v-for="(item, index) in nodeArr" :key="index">
            <div>{{ item.path }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { baseStatus } from "@/util/option";
import { ResourceType } from "@/util/constant";
import { createRequiredRules } from "@/util";
import Tree from "@/components/Tree";
import { getResources } from "@/api/user";
import {
  privilegesRequest,
  addAccount,
  saveAccount,
  getAccountId,
} from "@/api/role";

export default {
  components: { Tree },
  props: {
    isCreate: {
      // 类型: true 新建 false 编辑
      type: Boolean,
      required: true,
    },
    view: {},
    currentSelect: {
      // 传入的数据
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // columnList: [],
      treeData: [],
      nodeArr: [],
      tableData: [],
      showFlag: false,
      // columnList: [
      //   { prop: "id", label: "资源编码" },
      //   { prop: "name", label: "资源名称" },
      //   { prop: "domain", label: "模块定义" },
      //   { prop: "description", label: "描述" },
      // ],
      form: {},
      baseStatus,
      resourceType: ResourceType.IMAGE,
      rules: createRequiredRules(
        ["code", "name", "description"],
        ["角色编号", "角色名称", "角色描述"]
      ),
      value: [],
      resData: [],
    };
  },
  computed: {
    title() {
      return this.isCreate ? "新建" : "编辑";
    },
  },
  watch: {
    showFlag(newVal, oldVal) {
      if (newVal == false) {
        this.$emit("update:view", false);
      }
    },
  },
  methods: {
    async privilegesRequest() {
      let data = await privilegesRequest();
      this.tableData = data.data;
      // 获取可配置资源列表
      let res = [];
      let showData = data.data;
      for (var i = 0; i < showData.length; i++) {
        res.push({
          label: showData[i].description,
          key: showData[i].name,
        });
      }
      this.resData = res;
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        const privileges = this.nodeArr.map((item) => item.id);
        if (valid) {
          // const [effectiveDate, expiryDate] = this.form.range;
          if (this.isCreate) {
            await addAccount({ ...this.form, privileges });

            this.$message.success("新增成功");
          } else {
            const { id } = this.currentSelect;
            await saveAccount({ ...this.form, roleId: id, privileges });
            this.$message.success("保存成功");
          }
          this.showFlag = false;
          this.$emit("reload");
          this.value = [];
        }
      });
    },

    // 加载初始数据
    async open() {
      const treeResources = await getResources({ projectId: 0 });
      for (let i = 0; i < treeResources.data.length; i++) {
        treeResources.data[i].label = treeResources.data[i].description;
        treeResources.data[i].id = treeResources.data[i].module;
        const resChild = treeResources.data[i].children;
        for (let i = 0; i < resChild.length; i++) {
          resChild[i].label = resChild[i].description;
          resChild[i].id = resChild[i].module;
          const resChildOne = resChild[i].children;
          for (let i = 0; i < resChildOne.length; i++) {
            resChildOne[i].label = resChildOne[i].description;
            resChildOne[i].id = resChildOne[i].module;
            const resChildTwo = resChildOne[i].children;
            for (let i = 0; i < resChildTwo.length; i++) {
              resChildTwo[i].label = resChildTwo[i].description;
              resChildTwo[i].id = resChildTwo[i].module;
            }
          }
        }
      }
      this.treeData = treeResources.data;
      this.form = {};
      this.$refs.form && this.$refs.form.resetFields();
      this.nodeArr = [];
      this.$refs.tree.$refs.tree.setCheckedKeys([]);
      // this.privilegesRequest();
      if (!this.isCreate) {
        // 根据类型获取对应详情
        const { id } = this.currentSelect;
        this.form = (await getAccountId({ roleId: id })).data;
        const getPrivilegesData = [];
        for (let i = 0; i < this.form.privileges.length; i++) {
          getPrivilegesData.push(this.form.privileges[i].name);
        }
        this.form = { ...this.form, getPrivilegesData };
        this.$refs.tree.$refs.tree.setCheckedKeys(this.form.getPrivilegesData);
        // 获取编辑时（可配/已配）资源列表
        let resForm = this.form.privileges;
        let resFormArr = [];
        for (var i = 0; i < resForm.length; i++) {
          resFormArr.push(resForm[i].name);
        }
        this.value = resFormArr;
      } else {
        this.value = [];
      }
    },
    checkChange(data) {
      const index = this.nodeArr.findIndex((node) => node.path === data.path);
      if (data.checked && index === -1) {
        this.nodeArr.push(data);
      }
      if (!data.checked && index !== -1) {
        this.nodeArr.splice(index, 1);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-input, .el-select {
  width: 300px;
}

.el-textarea {
  width: 55%;
}

.belong-wrap {
  display: flex;

  .belong-left {
    flex: 1;
  }

  .belong-right {
    flex: 1;
    margin-left: 20px;
    box-sizing: border-box;
  }

  .belong-left-content, .belong-right-content {
    max-height: 300px;
    overflow: scroll;
  }

  .belong-right-content {
    line-height: 1.5;
    // & div:hover {
    // cursor: pointer;
    // background: $hover;
    // }
  }

  .belong-title {
    padding-bottom: 5px;
  }
}
</style>
