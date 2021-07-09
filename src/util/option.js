/*
 * @Author: KokoTa
 * @Date: 2020-12-23 10:02:11
 * @LastEditTime: 2021-02-02 13:42:19
 * @LastEditors: KokoTa
 * @Description: 下拉框的选项数据
 * @FilePath: /future-bms/src/util/option.js
 */

import { getAccountList } from "@/api/accountManage";
import { getGoodsGroupList } from "@/api/commodityGroup";
import { getCatalogList } from "@/api/itemManage";
import { getKnowledgeList } from "@/api/knowledgeManage";
import { getModuleList } from "@/api/moduleManage";
import { getSubjectList } from "@/api/subjectManage";
import { getTeacherList } from "@/api/teacherManage";
import { ResourceType } from "@/util/constant";

// 平台用户状态
export const userType = [
  {
    label: "启用",
    value: "enabled"
  },
  {
    label: "禁用",
    value: "disabled"
  }
];

// 基础状态
export const baseStatus = [
  {
    label: "禁用",
    value: 0
  },
  {
    label: "启用",
    value: 1
  }
];

// 知识点类型
export const knowledgeType = [
  {
    label: "科目",
    value: 1
  },
  {
    label: "模块",
    value: 2
  }
];

// 专栏状态
export const columnStatus = [
  {
    label: "已上架",
    value: 1
  },
  {
    label: "已下架",
    value: 2
  },
  {
    label: "待上架",
    value: 3
  }
];

export const shelfStatusList = [
  {
    label: "待上架",
    value: "01"
  },
  {
    label: "上架",
    value: "02"
  },
  {
    label: "下架",
    value: "03"
  }
];

// 获取科目列表
export const getSubjectOption = async (size = 1000) => {
  const data = await getSubjectList({ size });
  return data.data.content;
};

// 获取模块列表
export const getModuleOption = async (size = 1000) => {
  const data = await getModuleList({ size });
  return data.data.content;
};

// 获取知识点列表
export const getKnowledgeOption = async (size = 1000) => {
  const data = await getKnowledgeList({ size });
  return data.data.content;
};

// 获取分类列表
export const getCatalogOption = async (
  resourceType = ResourceType.ITEM,
  size = 1000
) => {
  const data = await getCatalogList({ resourceType, size });
  return data.data.content;
};

// 获取帐套列表
export const getAccountOption = async (size = 1000) => {
  const data = await getAccountList({ size });
  return data.data;
};

// 获取商品分组列表
export const getGoodsGroupListOption = async (size = 1000) => {
  const data = await getGoodsGroupList({ size });
  return data.data.content;
};

// 获取老师列表
export const getTeacherOption = async (size = 1000) => {
  const data = await getTeacherList({ size });
  return data.data.content;
};
