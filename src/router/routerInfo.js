/*
 * @Author: KokoTa
 * @Date: 2020-12-22 11:37:38
 * @LastEditTime: 2021-02-03 10:37:37
 * @LastEditors: KokoTa
 * @Description: 路由信息
 * @FilePath: /future-bms/src/router/routerInfo.js
 */
const constantRouter = [
  {
    path: "/",
    redirect: "/login",
    hidden: true
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@/views/login/index.vue"),
    hidden: true
  },
  /**
   * 公共面板
   * 1. 首页
   * 2. 数据统计
   */
  {
    path: "/dashboard",
    name: "公社概况",
    icon: "public",
    redirect: "/dashboard/home",
    component: () => import("@/components/Layout/index.vue"),
    children: [
      {
        path: "home",
        name: "运营数据",
        icon: "public",
        component: () => import("@/views/dashboard/home/index.vue")
      }
      // {
      //   path: "statistics",
      //   name: "数据统计",
      //   icon: "public",
      //   component: () => import("@/views/dashboard/statistics/index.vue")
      // }
    ]
  },

  /**
   * 平台管理
   * 1. 用户管理
   * 2. 账套管理
   * 3. 数据字典
   * 4. 资源管理
   */
  {
    path: "/platformManage",
    name: "平台管理",
    module: "platform",
    icon: "backend",
    redirect: "/platformManage/userManage",
    component: () => import("@/components/Layout/index.vue"),
    children: [
      {
        path: "userManage",
        name: "账套管理员", 
        module: "platform:admins",
        icon: "backend",
        component: () => import("@/views/platformManage/userManage/index.vue")
      },
      {
        path: "accountManage",
        icon: "backend",
        module: "system:accounts",
        name: "账套管理",
        component: () =>
          import("@/views/platformManage/accountManage/index.vue")
      },
      {
        path: "dataDictionary",
        name: "数据字典",
        icon: "backend",
        component: () =>
          import("@/views/platformManage/dataDictionary/index.vue")
      },
      {
        path: "resourceManage",
        name: "资源管理",
        icon: "backend",
        component: () =>
          import("@/views/platformManage/resourceManage/index.vue")
      }
    ]
  },
  /**
   * 系统管理
   * 1. 用户管理
   * 2. 角色管理
   * 3. 权限管理
   * 4. 组织机构
   */
  {
    path: "/systemManage",
    name: "系统管理",
    module: "system",
    icon: "system",
    redirect: "/systemManage/userManage",
    component: () => import("@/components/Layout/index.vue"),
    children: [
      {
        path: "userManage",
        name: "用户管理",
        module: 'platform:users',
        icon: "system",
        component: () => import("@/views/systemManage/userManage/index.vue")
      },
      {
        path: "roleManage",
        name: "角色管理",
        module: "system:roles",
        icon: "system",
        component: () => import("@/views/systemManage/roleManage/index.vue")
      },
      {
        path: "authManage",
        name: "权限管理",
        icon: "system",
        component: () => import("@/views/systemManage/authManage/index.vue")
      },
      {
        path: "orgManage",
        name: "组织机构",
        icon: "system",
        component: () => import("@/views/systemManage/orgManage/index.vue")
      }
    ]
  },
  /**
 * 基础数据
 * 1. 项目管理
 * 2. 科目管理
 * 3. 模块管理
 * 4. 知识点管理
 */
  {
    path: "/baseDataManage",
    name: "基础数据",
    module: "​basic",
    icon: "baseData",
    redirect: "/baseDataManage/home",
    component: () => import("@/components/Layout/index.vue"),
    children: [
      {
        path: "projectManage",
        name: "项目管理",
        module: "​basic​:projects​",
        icon: "project",
        component: () =>
          import("@/views/baseDataManage/projectManage/index.vue")
      },
      {
        path: "subjectManage",
        name: "科目管理",
        module: "​basic​:subjects​",
        icon: "subject",
        component: () =>
          import("@/views/baseDataManage/subjectManage/index.vue")
      },
      {
        path: "moduleManage",
        name: "模块管理",
        module: "​basic​:modules​",
        icon: "module",
        component: () => import("@/views/baseDataManage/moduleManage/index.vue")
      },
      {
        path: "knowledgeManage",
        name: "知识点管理",
        module: "​basic​:knowledges​",
        icon: "knowledge",
        component: () =>
          import("@/views/baseDataManage/knowledgeManage/index.vue")
      }
    ]
  },

  /**
   * 商品管理
   * 1. 大专栏
   * 2. 专栏
   * 3. 会员卡
   * 4. 商品管理
   * 5. 视频管理
   * 6. 商品分组
   * 7. 商品属性
   */
  {
    path: "/commodityManage",
    name: "商品管理",
    module: "goods",
    icon: "system",
    redirect: "/commodityManage/commodityGroup",
    component: () => import("@/components/Layout/index.vue"),
    children: [
      {
        path: "bigColumnManage",
        name: "大专栏",
        module: "​basic​:goodsBigColumn​",
        icon: "system",
        component: () =>
          import("@/views/commodityManage/bigColumnManage/index.vue")
      },
      {
        path: "smallColumnManage",
        name: "专栏",
        module: "​basic​:goodsColumn​",
        icon: "system",
        component: () =>
          import("@/views/commodityManage/smallColumnManage/index.vue")
      },
      {
        path: "smallColumnmembershipCardManage",
        name: "会员卡",
        module: "​basic​:goodsMember​",
        icon: "system",
        component: () =>
          import("@/views/commodityManage/smallColumnmembershipCard/index.vue")
      },
      // {
      //   path: 'columnManage',
      //   name: '专栏',
      //   icon: 'system',
      //   component: () => import('@/views/commodityManage/columnManage/index.vue')
      // },
      // {
      //   path: 'vipManage',
      //   name: '会员卡',
      //   module: "​basic​:goodsMember​",
      //   icon: 'system',
      //   component: () => import('@/views/commodityManage/vipManage/index.vue')
      // },
      {
        path: "videoManage",
        name: "视频课程",
        module: "​basic​:goodsVideo​",
        icon: "system",
        component: () => import("@/views/commodityManage/videoManage/index.vue")
      },
      {
        path: "commodityManage",
        name: "直播课程",
        module: "​basic:goods​",
        icon: "system",
        component: () =>
          import("@/views/commodityManage/commodityManage/index.vue")
      },
      {
        path: "offlineCourses",
        name: "线下课程",
        module: "​basic:goods​Offline",
        icon: "system",
        component: () =>
          import("@/views/commodityManage/offlineCourses/index.vue")
      },
      {
        path: "commodityGroup",
        name: "商品分组",
        module: "basic​:goodsGroups​",
        icon: "system",
        component: () =>
          import("@/views/commodityManage/commodityGroup/index.vue")
      },
      {
        path: "commodityAttributes",
        name: "商品属性",
        module: "​basic​:goodAttrs​",
        icon: "system",
        component: () =>
          import("@/views/commodityManage/commodityAttributes/index.vue")
      }
    ]
  },
  /**
   * 教务管理
   * 1. 项目管理
   * 2. 物品管理
   */
  {
    path: "/orderManagement",
    name: "订单管理",
    icon: "system",
    module: "order",
    redirect: "/orderManagement/order",
    component: () => import("@/components/Layout/index.vue"),
    children: [
      {
        path: "order",
        name: "销售订单",
        module: "​basic:order",
        icon: "system",
        component: () => import("@/views/orderManagement/order.vue")
      },
      {
        path: "refund",
        name: "销售退款",
        icon: "system",
        component: () => import("@/views/orderManagement/refund.vue")
      }
    ]
  },
  {
    path: "/questionBank",
    name: "题库管理",
    module: "qvw",
    icon: "system",
    redirect: "/questionBank/testManagement",
    component: () => import("@/components/Layout/index.vue"),
    children: [
      {
        path: "testManagement",
        name: "试题管理",
        module: "qwm:qwmquestion",
        icon: "system",
        component: () => import("@/views/questionBank/testManagement/index.vue")
      },
      {
        path: "testManagement",
        name: "试题管理",
        icon: "system",
        component: () => import("@/views/questionBank/testManagement/index.vue")
      }
    ]
  },
  {
    path: "/educationManage",
    name: "教务管理",
    module: "administration",
    icon: "system",
    redirect: "/educationManage/materialManage",
    component: () => import("@/components/Layout/index.vue"),
    children: [
      {
        path: "materialManage",
        name: "素材管理",
        module: "basic:EamCatalogResources",
        icon: "system",
        component: () =>
          import("@/views/educationManage/materialManage/index.vue")
      },
      {
        path: "itemManage",
        name: "物品管理",
        module: "basic:materials",
        icon: "system",
        component: () => import("@/views/educationManage/itemManage/index.vue")
      },
      {
        path: "teacherManage",
        name: "师资管理",
        module: "basic:teachers",
        icon: "system",
        component: () =>
          import("@/views/educationManage/teacherManage/index.vue")
      },
      {
        path: "studentManage",
        name: "学员管理",
        module: "basic:students",
        icon: "system",
        component: () =>
          import("@/views/educationManage/studentManage/index.vue")
      }
    ]
  },
  /**
* 前台管理
* 1. 栏目设置
* 2. 栏目内容
*/
  {
    path: "/frontDeskManagement",
    name: "前台设置",
    module: "frontend",
    icon: "baseData",
    redirect: "/frontDeskManagement/home",
    component: () => import("@/components/Layout/index.vue"),
    children: [
      {
        path: "columnSetting",
        name: "栏目设置",
        module: "basic:cdmAppColumns",
        icon: "module",
        component: () => import("@/views/frontDeskManagement/columnSetting/index.vue")
      },
      {
        path: "columnInfoManage",
        name: "栏目内容",
        module: "basic:cdmColumnsDetail",
        icon: "module",
        component: () => import("@/views/frontDeskManagement/columnInfoManage/index.vue")
      },
    ]
  },
  /**
   * 404
   */
  {
    path: "/404",
    name: "错误页",
    component: () => import("@/views/error/404.vue"),
    hidden: true
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];

export default {
  constantRouter
};
