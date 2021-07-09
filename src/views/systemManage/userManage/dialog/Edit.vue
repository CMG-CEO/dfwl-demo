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
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        v-for="(item, index) in formItems"
        :key="item.prop + index"
      >
        <el-input
          v-model="form[item.prop]"
          :placeholder="`请输入${item.label}`"
          clearable
          v-if="item.type == 'text'"
        ></el-input>
        <el-select
          v-model="form[item.prop]"
          placeholder="请选择"
          v-else-if="item.type == 'select'"
        >
          <el-option
            v-for="item in shelfStatusList"
            :key="item.itemCode"
            :label="item.itemName"
            :value="item.itemCode"
          >
          </el-option>
        </el-select>
        <SelectMaterial
          ref="selectMaterial"
          :url="form.profilePicture"
          v-else-if="item.type == 'uploadImg'"
          :resourceType="resourceType"
          @selected="handleSelect"
          :iShow="iShow"
        ></SelectMaterial>
      </el-form-item>
      <shuttle
        @getData="getdata"
        :data="resData"
        :value="value"
        :titles="['可配角色权限', '已配角色权限']"
      ></shuttle>
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
import { baseStatus } from "@/util/option";

import { ResourceType } from "@/util/constant";
import SelectMaterial from "@/components/SelectMaterial";
import { createRequiredRules, requestList } from "@/util";
import PaginationMixin from "@/mixin/pagination";
import { roleList } from "@/api/role";
import { querySelect } from "@/api/testManagement";
import { addAccount, saveAccount, getAccountId } from "@/api/user";
import shuttle from "@/components/Shuttle";

export default {
  name: "userManageSysDialog",
  components: { SelectMaterial, shuttle },
  mixins: [PaginationMixin],

  data() {
    return {
      title: "详情",
      formItems: [
        { label: "登录账户", prop: "loginId", type: "text" },
        { label: "密码", prop: "password", type: "text" },
        { label: "用户类型", prop: "userType", type: "select" },
        { label: "用户姓名", prop: "userName", type: "text" },
        { label: "昵称 ", prop: "nickName", type: "text" },
        { label: "头像", prop: "profilePicture", type: "uploadImg" },
        { label: "微信号", prop: "wechat", type: "text" },
        { label: "QQ号", prop: "qq", type: "text" },
        { label: "钉钉号", prop: "dingding", type: "text" },
        { label: "联系电话", prop: "mobile", type: "text" },
        { label: "邮箱", prop: "email", type: "text" },
        { label: "性别", prop: "sex", type: "text" },
        { label: "生日", prop: "birth", type: "text" },
        { label: "地区", prop: "regionName", type: "text" },
        { label: "公司", prop: "companyName", type: "text" },
        { label: "职位", prop: "postName", type: "text" }
      ],
      rules: createRequiredRules(
        [
          "loginId",
          "password",
          "userType",
          "userName",
          "nickName",
          "profilePicture"
        ],
        ["登录账户", "密码", "用户类型", "用户姓名", "昵称", "头像"]
      ),
      tableData: [],
      showFlag: false,
      form: {},
      baseStatus,
      resourceType: ResourceType.IMAGE,
      value: [],
      resData: [],
      getResLength: "",
      iShow: false,
      shelfStatusList: []
    };
  },
  methods: {
    add() {
      this.isCreate = true;
      this.edit();
    },
    edit(record) {
      this.showFlag = true;
      if (record) {
        this.isCreate = false;
      }

      this.$refs.form && this.$refs.form.resetFields();
      this.$nextTick(() => {
        // record.status === "ENABLED"
        //   ? (record.status = "启用")
        //   : (record.status = "禁用");
        this.form = record;
        this.open();
        this.querySelect();
      });
    },

    handleSelect(url) {
      this.iShow = true;
      this.form = { ...this.form, profilePicture: url };
    },
    async getList(val) {
      // 配置资源按照全部条数进行请求
      val ? (this.page.pageSize = val) : "";
      const data = await requestList(roleList, {}, this.page);
      debugger;
      this.tableData = data;
      this.page = data.page;
      // 获取可配置资源列表
      let res = [];
      let showData = data.content;
      for (var i = 0; i < showData.length; i++) {
        res.push({
          label: showData[i].name,
          key: showData[i].code
        });
      }
      this.resData = res;
    },
    // 获取 （穿梭组件） 子组件切换的值
    getdata(res) {
      let roles = res;
      this.form = { ...this.form, roles };
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
            await saveAccount({ ...this.form, userId: id });
            this.$message.success("保存成功");
          }
          this.showFlag = false;
          this.$emit("reload");
          // 提交 清空穿梭组件已选中状态
          this.value = [];
        }
      });
    },

    async open() {
      this.$refs.selectMaterial && (this.$refs.selectMaterial.form = {});
      // 先请求配置资源总条数 按需进行请求条数
      const data = await requestList(roleList, {}, this.page);
      this.getList(data.page.totalCount);
      if (!this.isCreate) {
        this.iShow = true;
        // 根据类型获取对应详情
        const { id } = this.currentSelect;
        this.form = (await getAccountId({ userId: id })).data;
        // 获取编辑时（可配/已配）资源列表
        let resForm = this.form.roles;
        let resFormArr = [];
        for (var i = 0; i < resForm.length; i++) {
          resFormArr.push(resForm[i].code);
        }
        this.value = resFormArr;
        this.formItems[1].prop === "password"
          ? this.formItems.splice(1, 1)
          : "";
      } else {
        this.iShow = false;
        this.value = [];
        Object.assign(this.$data.formItems, this.$options.data().formItems);
      }
    },
    async querySelect() {
      const { data } = await querySelect({ dictCodes: "user_type" });
      this.shelfStatusList = data.user_type;
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
