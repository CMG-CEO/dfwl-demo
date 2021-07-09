<!--
 * @Author: KokoTa
 * @Date: 2020-12-23 14:58:35
 * @LastEditTime: 2021-01-21 15:39:10
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/platformManage/accountManage/dialog/Edit.vue
-->
<template>
  <el-dialog :title="title" :visible.sync="showFlag">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="账套编号" prop="accountCode">
        <el-input
          v-model="form.accountCode"
          placeholder="请输入编号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="账套名称" prop="accountName">
        <el-input
          v-model="form.accountName"
          placeholder="请输入账套名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="法人代表" prop="corpLegal">
        <el-input
          v-model="form.corpLegal"
          placeholder="请输入法人代表"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="contactNumber">
        <el-input
          v-model="form.contactNumber"
          placeholder="请输入联系电话"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="companyAddress">
        <el-input
          v-model="form.companyAddress"
          placeholder="请输入公司地址"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="有效时间" prop="range">
        <el-date-picker
          v-model="date"
          clearable
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="账套状态" prop="isClose">
        <el-radio-group v-model="form.isClose">
          <el-radio :label="false">启用</el-radio>
          <el-radio :label="true">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="省份" prop="provinceId">
        <el-select v-model="form.provinceId" placeholder="请选择">
          <el-option
            v-for="item in provinceList"
            :key="item.provinceId"
            :label="item.provinceName"
            :value="item.provinceId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="logo地址" prop="logoUrl">
        <!-- 素材选择组件 -->
        <SelectMaterial
          ref="selectMaterial"
          :url="form.logoUrl"
          :resourceType="resourceType"
          @selected="handleSelect"
          :iShow="iShow"
        ></SelectMaterial>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          v-model="form.remark"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="belong-wrap">
      <div class="belong-left">
        <div class="belong-title">资源</div>
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
        <div class="belong-title">资源</div>
        <div class="belong-right-content">
          <div v-for="(item, index) in nodeArr" :key="index">
            <div>{{ item.path }}</div>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { baseStatus } from "@/util/option";
import { ResourceType } from "@/util/constant";
import SelectMaterial from "@/components/SelectMaterial";
import { createRequiredRules } from "@/util";
import {
  addAccount,
  saveAccount,
  getAccountId,
  privilegesRequest,
  getAccountResources,
  getProvince
} from "@/api/accountManage";
import Tree from "@/components/Tree";
import day from "dayjs";
export default {
  name: "accountManageDialog",
  components: { SelectMaterial, Tree },

  data() {
    return {
      title: "详情",
      showFlag: false,
      treeData: [],
      nodeArr: [],
      date: [],
      form: {},
      baseStatus,
      resourceType: ResourceType.IMAGE,
      rules: createRequiredRules(
        [
          "accountCode",
          "accountName",
          "corpLegal",
          "contactNumber",
          "companyAddress",
          "date",
          "isClose",
          "logoUrl",
          "provinceId"
        ],
        [
          "账套编号",
          "账套名称",
          "法人代表",
          "联系电话",
          "公司地址",
          "有效时间",
          "账套状态",
          "logo地址",
          "省份"
        ]
      ),
      provinceList: [],
      iShow: false
    };
  },
  methods: {
    add() {
      this.showFlag = true;
      this.isCreate = true;
      this.$refs.form && this.$refs.form.resetFields();
    },
    edit(record) {
      this.showFlag = true;
      this.isCreate = false;
      console.log(record);
      this.$nextTick(() => {
        this.dataopen();
        this.form = record;
        const stDate = this.dayHandle(record.effectiveDate);
        const edDate = this.dayHandle(record.expiryDate);
        this.date = [stDate, edDate];
      });
    },
    handleSelect(url) {
      this.iShow = true;
      this.form = { ...this.form, logoUrl: url };
    },
    dayHandle(date) {
      return day(date).format("YYYY-MM-DD");
    },
    async submit() {
      this.$refs.form.validate(async valid => {
        const privileges = this.nodeArr.map(item => item.id);
        if (valid) {
          if (this.isCreate) {
            await addAccount({
              ...this.form,
              privileges
            });
            this.$message.success("新增成功");
          } else {
            await saveAccount({
              ...this.form,
              privileges
            });
            this.$message.success("保存成功");
          }
        }
        this.showFlag = false;
        this.$emit("reload");
      });
    },

    async dataopen() {
      const treeResources = await getAccountResources({ projectId: 0 });
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
              resChildTwo[i].name = resChildTwo[i].module;
            }
          }
        }
      }
      this.treeData = treeResources.data;
      const dataList = await getProvince();
      this.provinceList = dataList.data.data;
      this.nodeArr = [];
      this.$refs.tree.$refs.tree.setCheckedKeys([]);
      if (!this.isCreate) {
        const getPrivilegesData = [];
        this.form.privileges.forEach(item => {
          getPrivilegesData.push(item.name);
        });
        this.form = { ...this.form, getPrivilegesData };
        this.$refs.tree.$refs.tree.setCheckedKeys(this.form.getPrivilegesData);
      }
    },
    checkChange(data) {
      const index = this.nodeArr.findIndex(node => node.path === data.path);
      if (data.checked && index === -1) {
        this.nodeArr.push(data);
      }
      if (!data.checked && index !== -1) {
        this.nodeArr.splice(index, 1);
      }
    }
  }
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
  }

  .belong-title {
    padding-bottom: 5px;
  }
}
</style>
