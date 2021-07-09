<!--
 * @Author: KokoTa
 * @Date: 2021-01-22 10:36:30
 * @LastEditTime: 2021-02-05 17:20:36
 * @LastEditors: KokoTa
 * @Description: 商品管理-通用新增组件
 *    大专栏没有关联、没有防盗录
 *    专栏有关联、没有防盗录
 *    会员卡有特定输入项、没有关联、没有防盗录
 *    商品管理有关联、没有防盗录
 *    视频管理有关联、有防盗录
 * @FilePath: /future-bms/src/views/commodityManage/bigColumnManage/dialog/Edit.vue
-->

<template>
  <el-dialog
    :title="title"
    width="1000px"
    :visible.sync="showFlag"
    @open="open"
  >
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <h3>基本信息</h3>
      <el-form-item :label="`${typeName}名称`" prop="goodsName">
        <el-input
          v-model="form.goodsName"
          :placeholder="`请输入${typeName}名称`"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item :label="`${typeName}简介`" prop="introduce">
        <el-input
          v-model="form.introduce"
          type="textarea"
          :placeholder="`请输入${typeName}简介`"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item :label="`${typeName}封面`" prop="coverUrl">
        <SelectMaterial
          ref="selectMaterial"
          :url="form.coverUrl"
          :resourceType="resourceType"
          @selected="handleSelect"
          :iShow="iShow"
        ></SelectMaterial>
      </el-form-item>
      <el-form-item :label="`${typeName}详情`" prop="detailsInfo">
        <!-- <quill-editor v-model="form.detailsInfo"></quill-editor> -->
        <SelectMaterial
          ref="selectMaterial"
          :url="form.detailsInfo"
          :resourceType="resourceType"
          @selected="handleSelect2"
          type="detail"
          :iShow="iShow"
        ></SelectMaterial>
      </el-form-item>
      <el-form-item label="考试项目" prop="projectId">
        <ProjectTreeDialog
          ref="ProjectTreeDialog"
          @nodeClick="nodeClick"
        ></ProjectTreeDialog>
        <div>{{ form.projectName }}</div>
        <el-button size="mini" @click="openTreeDialog">选择项目</el-button>
      </el-form-item>
      <!-- 线下课程新增协议功能 -->
      <div v-if="type === CommodityManageType.OFFLINE_COURSES">
        <h3>协议相关</h3>
        <el-form-item
          class="determine"
          label="确认协议再购买"
          prop="confirmFlag"
        >
          <el-checkbox
            v-model="form.confirmFlag"
            true-label="1"
            false-label="0"
          ></el-checkbox>
          <SelectMaterial
            class="determineInput"
            ref="selectMaterial"
            :resourceType="resourceTypefile"
            :agreementName="form.agreementName"
            :agreementUrl="form.agreementUrl"
            :confirmFlag="form.confirmFlag"
            @selected="handleSelect4"
            :iShow="iShow"
          ></SelectMaterial>
        </el-form-item>
      </div>
      <h3>商品信息</h3>
      <el-form-item label="售卖方式" prop="saleFlag">
        <!-- 单独售卖 -->
        <el-checkbox
          v-model="form.singleSaleFlag"
          true-label="1"
          false-label="0"
          >支持单独售卖</el-checkbox
        >
        <section v-if="form.singleSaleFlag === '1'">
          <el-radio-group v-model="form.singleSaleType">
            <el-radio label="1">付费</el-radio>
            <el-radio label="2">免费</el-radio>
            <el-radio label="3">加密</el-radio>
          </el-radio-group>
          <!-- 付费 -->
          <div v-if="form.singleSaleType === '1'">
            <el-form-item class="w-360 mg-10" label="商品价格">
              <el-input-number
                v-model="form.price"
                placeholder="请输入商品价格"
                clearable
                :min="0"
              ></el-input-number>
            </el-form-item>
            <el-form-item class="w-360 mg-10" label="划线价格">
              <el-input-number
                v-model="form.underlinedPrice"
                placeholder="请输入商品价格"
                clearable
                :min="0"
              ></el-input-number>
            </el-form-item>
            <el-form-item
              v-if="type === CommodityManageType.VIP_MANAGE"
              class="w-360 mg-10"
              label="会员有效期"
            >
              <el-input-number
                v-model="form.validityPeriod"
                placeholder="会员卡有效期"
                clearable
                :min="0"
              ></el-input-number>
              <el-select
                style="margin-top: 10px"
                v-model="form.periodUnit"
                placeholder="会员卡有效期单位"
              >
                <el-option label="天" value="天">天</el-option>
                <el-option label="月" value="月">月</el-option>
                <el-option label="日" value="日">日</el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 加密 -->
          <div v-if="form.singleSaleType === '3'">
            <el-form-item class="w-360 mg-10" label="密码">
              <el-input
                v-model="form.singleSalePwd"
                placeholder="请输入密码"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              v-if="type === CommodityManageType.VIP_MANAGE"
              class="w-360 mg-10"
              label="会员有效期"
            >
              <el-input-number
                v-model="form.validityPeriod"
                placeholder="会员卡有效期"
                clearable
                :min="0"
              ></el-input-number>
              <el-select
                style="margin-top: 10px"
                v-model="form.periodUnit"
                placeholder="会员卡有效期单位"
              >
                <el-option label="天" value="天">天</el-option>
                <el-option label="月" value="月">月</el-option>
                <el-option label="日" value="日">日</el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 添加物品  -->
          <!-- 这里的物品是教务管理中的物品管理中的物品 -->
          <!-- 视频管理中没有添加物品的功能 -->
          <div
            v-if="
              type !== CommodityManageType.VIDEO_MANAGE &&
              form.singleSaleType == 1
            "
          >
            <AddItem ref="AddItem" @getCommodity="getCommodity"></AddItem>
            <el-button type="default" size="mini" @click="openAddItem"
              >选择物品</el-button
            >
            <el-table
              class="table"
              height="250"
              border
              :data="form.materialsList"
            >
              <el-table-column label="物品名称">
                <template slot-scope="scope">
                  <div class="image-wrap">
                    <el-image
                      class="image-content"
                      :src="scope.row.materialsUrl"
                      :preview-src-list="[scope.row.materialsUrl]"
                    ></el-image>
                    <div class="image-info">
                      <div>名称：{{ scope.row.materialsName }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="delCommodity(scope)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </section>
        <!-- 关联售卖 -->
        <template
          v-if="
            type === CommodityManageType.COLUMN_Manage ||
            type === CommodityManageType.COMMODITY_MANAGE ||
            type === CommodityManageType.VIDEO_MANAGE
          "
        >
          <el-checkbox
            v-model="form.linkSaleFlag"
            true-label="1"
            false-label="0"
            >支持关联售卖</el-checkbox
          >
          <section v-if="form.linkSaleFlag === '1'">
            <AddConnection
              ref="AddConnection"
              :type="type"
              @getConnection="getConnection"
              :linkSaleList="form.linkSaleList"
            ></AddConnection>
            <!-- 专栏页面关联大专栏和会员卡，其余页面关联专栏和会员卡 -->
            <el-button type="default" size="mini" @click="openAddConnection"
              >选择{{
                type === CommodityManageType.COLUMN_Manage ? "大" : ""
              }}专栏/会员卡</el-button
            >
            <el-table
              class="table"
              height="250"
              border
              :data="form.linkSaleList"
            >
              <el-table-column label="名称">
                <template slot-scope="scope">
                  <div class="image-wrap">
                    <el-image
                      class="image-content"
                      :src="scope.row.coverUrl"
                      :preview-src-list="[scope.row.coverUrl]"
                    ></el-image>
                    <div class="image-info">
                      <div>名称：{{ scope.row.goodsName }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="delConnection(scope)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </section>
        </template>
      </el-form-item>
      <el-form-item label="商品分组">
        <el-select
          v-model="form.goodsGroup"
          placeholder="请选择商品分组"
          clearable
        >
          <el-option
            v-for="(item, index) in commodityGroup"
            :label="item.name"
            :value="item.goodsGroupId"
            :key="index"
            >{{ item.name }}</el-option
          >
        </el-select>
      </el-form-item>
      <h3 v-if="!isCreate">上架设置</h3>
      <el-form-item v-if="!isCreate" label="上架设置" prop="shelfType">
        <el-radio-group v-model="form.shelfType">
          <el-radio label="1">立即上架</el-radio>
          <el-radio label="2">定时上架</el-radio>
          <el-radio label="3">暂不上架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.shelfType === '2'" prop="shelfDate">
        <el-date-picker
          v-model="form.shelfDate"
          type="datetime"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item v-if="!isCreate" label="隐藏">
        <el-checkbox v-model="form.hideFlag" true-label="1" false-label="0"
          >隐藏</el-checkbox
        >
      </el-form-item>
      <el-form-item v-if="!isCreate" label="停售">
        <el-checkbox v-model="form.stopFlag" true-label="1" false-label="0"
          >停售</el-checkbox
        >
      </el-form-item>
      <el-form-item
        v-if="type === CommodityManageType.VIDEO_MANAGE && !isCreate"
        label="防录屏跑马灯"
      >
        <el-radio-group v-model="form.drawMarqueeFlag">
          <el-radio label="1">开启</el-radio>
          <el-radio label="0">关闭</el-radio>
        </el-radio-group>
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
import { createRequiredRules, unionArrays } from "@/util";
import { CommodityManageType, ResourceType } from "@/util/constant";
import SelectMaterial from "@/components/SelectMaterial";
import ProjectTreeDialog from "@/views/commodityManage/bigColumnManage/dialog/ProjectTreeDialog";
import AddItem from "@/views/commodityManage/bigColumnManage/dialog/AddItem";
import AddConnection from "@/views/commodityManage/bigColumnManage/dialog/AddConnection";
import { getGoodsGroupListOption } from "@/util/option";
import {
  addGoodsVideo,
  getGoodsVideo,
  saveGoodsVideo,
} from "@/api/videoManage";
import {
  addOfflineCourses,
  saveOfflineCourses,
  getOfflineDetails,
} from "@/api/offlineCourses";
import {
  addSmallColumn,
  saveSmallColumn,
  getSmallColumn,
} from "@/api/smallColumnManage";
import {
  addMembershipCard,
  saveMembershipCard,
  getVipmange,
} from "@/api/smallColumnmembershipCard";
import { addGoods, getGoods, saveGoods } from "@/api/commodityManage";
import {
  addBigColumn,
  saveBigColumn,
  getBigColumn,
} from "@/api/merchandiseManagement/bigColumnManage.js";
import axios from "axios";
export default {
  components: { SelectMaterial, ProjectTreeDialog, AddItem, AddConnection },
  props: {
    isCreate: {
      // 类型: true 新建 false 编辑
      type: Boolean,
      required: true,
    },
    currentSelect: {
      // 传入的数据
      type: Object,
      default: () => {},
    },
    type: {
      // 该组件是从哪个页面调用的，值为 CommodityManageType 枚举中的一个
      type: String,
      required: true,
    },
  },
  data() {
    const saleOfflineCourses = (rule, value, callback) => {
      // 判断是否选中协议文件 （提示语）
      const { confirmFlag, agreementName } = this.form;
      // if (!confirmFlag || confirmFlag === '0') {
      //   callback(new Error("请勾选协议"));
      //   return;
      // }
      if (confirmFlag === "1" && !agreementName) {
        callback(new Error("请选择协议"));
        return;
      }
      callback();
    };
    const saleFlagValidator = (rule, value, callback) => {
      const {
        singleSaleFlag,
        linkSaleFlag,
        singleSaleType,
        price,
        underlinedPrice,
        singleSalePwd,
        shelfDate,
      } = this.form;

      if (!singleSaleFlag && !linkSaleFlag) {
        callback(new Error("售卖方式不能为空"));
        return;
      }
      if (singleSaleFlag && !singleSaleType) {
        callback(new Error("单独售卖内容不能为空"));
        return;
      }
      if (singleSaleType === "1" && !price && !underlinedPrice) {
        callback(new Error("价格不能为空"));
        return;
      }
      if (singleSaleType === "3" && !singleSalePwd) {
        callback(new Error("密码不能为空"));
        return;
      }
      // if (shelfDate && new Date() > new Date(shelfDate)) {
      //   callback(new Error("定时上架时间要大于等于当前时间"));
      //   return;
      // }
      callback();
    };
    const saleFlagValidator2 = (rule, value, callback) => {
      if (value && new Date() > new Date(value)) {
        callback(new Error("定时上架时间要大于等于当前时间"));
        return;
      }
      callback();
    };
    return {
      showFlag: false,
      form: { hideFlag: false },
      linkSaleList: [],
      rules: {
        ...createRequiredRules(
          [
            "goodsName",
            "introduce",
            "coverUrl",
            "detailsInfo",
            "projectId",
            "shelfType",
            "shelfDate",
          ],
          ["名称", "简介", "封面", "详情", "项目", "上架", "时间"]
        ),
        shelfDate: [{ validator: saleFlagValidator2, trigger: "blur" }],
        saleFlag: [{ validator: saleFlagValidator, trigger: "blur" }],
        confirmFlag: [{ validator: saleOfflineCourses, trigger: "blur" }],
      },
      resourceType: ResourceType.IMAGE,
      resourceTypefile: ResourceType.FILE,
      commodityGroup: [],
      CommodityManageType,
      linkSaleIds: [],
      saleIdListData: [],
      iShow: false,
    };
  },

  computed: {
    title() {
      return this.isCreate ? "新建" : "编辑";
    },
    typeName() {
      switch (this.type) {
        case CommodityManageType.BIG_COLUMN_MANAGE:
          return "大专栏";
        case CommodityManageType.COLUMN_Manage:
          return "专栏";
        case CommodityManageType.VIP_MANAGE:
          return "会员卡";
        case CommodityManageType.COMMODITY_MANAGE:
          return "商品";
        case CommodityManageType.VIDEO_MANAGE:
          return "视频";
        case CommodityManageType.COMMODITY_GROUP:
          return "商品分组";
        case CommodityManageType.OFFLINE_COURSES:
          return "线下";
        default:
          return "";
      }
    },
  },
  watch: {
    "form.shelfType"(val) {
      if (+val === 1) {
        this.form.shelfStatus = "02"; // 上架
      } else {
        this.form.shelfStatus = "01"; // 待上架
      }
    },
  },
  methods: {
    /**
     * 专栏封面选择
     */
    handleSelect(url) {
      this.iShow = true;
      this.form = { ...this.form, coverUrl: url };
    },
    /*
      详情选择
    */
    handleSelect2(url) {
      this.iShow = true;
      this.form = { ...this.form, detailsInfo: url };
    },
    /*
      协议选择
    */
    handleSelect4(item) {
      this.iShow = true;
      this.form = {
        ...this.form,
        agreementName: item.resourceName,
        agreementUrl: item.resourceUrl,
      };
    },
    /**
     * 考试项目选择
     */
    openTreeDialog() {
      this.$refs.ProjectTreeDialog.showFlag = true;
    },
    nodeClick(item) {
      this.form = { ...this.form, projectId: item.id, projectName: item.path };
    },
    /**
     * 物品操作
     */
    openAddItem() {
      this.$refs.AddItem.showFlag = true;
    },
    getCommodity(items) {
      const { materialsList } = this.form;
      if (!materialsList) {
        const materialsIds = items.map((item) => item.materialsId);
        this.form = { ...this.form, materialsList: items, materialsIds };
      } else {
        const arr = unionArrays(materialsList, items, "materialsId");
        const materialsIds = arr.map((item) => item.materialsId);
        this.form = { ...this.form, materialsList: arr, materialsIds };
      }
    },
    delCommodity(scope) {
      const { $index } = scope;
      this.form.materialsList.splice($index, 1);
    },
    /**
     * 关联操作
     */
    openAddConnection() {
      this.$refs.AddConnection.showFlag = true;
    },
    getConnection(itemres) {
      this.saleIdListData = this.saleIdListData.concat(itemres);
      const itemsdata = this.saleIdListData;
      // 数组内对象去重
      const objItem = {};
      const items = itemsdata.reduce((cur, next) => {
        objItem[next.goodsId] ? "" : (objItem[next.goodsId] = true && cur.push(next));
        return cur;
      }, []);
      const { linkSaleList } = this.form;
      this.linkSaleIds = [];
      // this.linkSaleList = linkSaleList;
      items.forEach((item) => this.linkSaleIds.push(item.goodsId));

      this.form = {
        ...this.form,
        linkSaleList: items,
        linkSaleIds: this.linkSaleIds,
      };
    },
    delConnection(scope) {
      const { $index } = scope;
      this.form.linkSaleList.splice($index, 1);
      this.form.linkSaleIds.forEach((item, index2) => {
        if (item == scope.row.goodsId) {
          this.form.linkSaleIds.splice(index2, 1);
        }
      });
    },
    /**
     * 提交
     */
    async submit() {
      console.log(this.form)
      // 判断是否选中协议
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.form.hideFlag) {
            this.form.hideFlag = 0;
          }
          switch (this.type) {
            case CommodityManageType.VIDEO_MANAGE:
              if (this.isCreate) {
                await addGoodsVideo({ ...this.form });
                this.$message.success("新增成功");
              } else {
                await saveGoodsVideo({ ...this.form });
                this.$message.success("编辑成功");
              }
              break;
            case CommodityManageType.COLUMN_Manage:
              if (this.isCreate) {
                await addSmallColumn({ ...this.form });
                this.$message.success("新增成功");
              } else {
                await saveSmallColumn({ ...this.form });
                this.$message.success("编辑成功");
              }
              break;
            case CommodityManageType.COMMODITY_MANAGE:
              if (this.isCreate) {
                await addGoods({ ...this.form });
                this.$message.success("课程新增成功");
              } else {
                // this.linkSaleList.forEach(item => {
                //   this.form.linkSaleList.push(item);
                // });

                await saveGoods({ ...this.form });

                this.$message.success("课程编辑成功");
              }
              break;
            case CommodityManageType.BIG_COLUMN_MANAGE:
              if (this.isCreate) {
                await addBigColumn({ ...this.form });
                this.$message.success("新增成功");
              } else {
                await saveBigColumn({ ...this.form });
                this.$message.success("编辑成功");
              }
              break;
            case CommodityManageType.VIP_MANAGE:
              if (this.isCreate) {
                await addMembershipCard({ ...this.form });
                this.$message.success("新增成功");
              } else {
                await saveMembershipCard({ ...this.form });
                this.$message.success("编辑成功");
              }
              break;
            case CommodityManageType.OFFLINE_COURSES:
              if (this.isCreate) {
                await addOfflineCourses({ ...this.form });
                this.$message.success("新增成功");
              } else {
                await saveOfflineCourses({ ...this.form });
                this.$message.success("编辑成功");
              }
              break;
          }
          this.showFlag = false;
          this.$emit("reload");
        }
      });
    },

    async open() {
      this.form = {};
      this.form.shelfType = 3
      this.$refs.form && this.$refs.form.resetFields();
      this.$refs.selectMaterial && (this.$refs.selectMaterial.form = {});
      this.commodityGroup = await getGoodsGroupListOption();

      if (!this.isCreate) {
        this.iShow = true;
        // 根据类型获取对应详情
        const { goodsId } = this.currentSelect;
        switch (this.type) {
          case CommodityManageType.COMMODITY_MANAGE:
            this.form = (await getGoods({ goodsId })).data;
            break;
          case CommodityManageType.BIG_COLUMN_MANAGE:
            this.form = (await getBigColumn({ goodsId })).data;
            break;
          case CommodityManageType.COLUMN_Manage:
            this.form = (await getSmallColumn({ goodsId })).data;
            break;
          case CommodityManageType.VIDEO_MANAGE:
            this.form = (await getGoodsVideo({ goodsId })).data;
            break;
          case CommodityManageType.OFFLINE_COURSES:
            this.form = (await getOfflineDetails({ goodsId })).data;
            break;
          case CommodityManageType.VIP_MANAGE:
            this.form = (await getVipmange({ goodsId })).data;
            break;
        }
      } else {
        this.iShow = false;
      }
    },

    /**
     * 清空操作
     */
    resetSingleSaleParams() {
      delete this.form.price;
      delete this.form.underlinedPrice;
      delete this.form.validityPeriod;
      delete this.form.periodUnit;
      delete this.form.singleSalePwd;
    },
  },
};
</script>

<style lang="stylus" scoped>
.determine {
  /deep/.el-form-item__label {
    width: 130px !important;
  }

  .determineInput {
    width: 600px;
    display: inline-block;
    margin-left: 10px;
  }
}
</style>
