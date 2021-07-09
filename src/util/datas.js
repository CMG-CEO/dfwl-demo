[
  {
    module: "platform",
    position: 0,
    description: "平台管理",
    children: [
      {
        module: "platform:admins",
        position: 0,
        description: "账套管理员",
        children: [
          {
            module: "platform-admins-read",
            description: "查询",
            permission: "platform:admins:query,read"
          },
          {
            module: "platform-admins-create",
            description: "新增",
            permission: "platform:admins:create"
          },
          {
            module: "platform-admins-update",
            description: "修改",
            permission: "platform:admins:update"
          },
          {
            module: "platform-admins-delete",
            description: "删除",
            permission: "platform:admins:delete"
          }
        ],
        arrays: [
          "platform:admins:query,read",
          "platform:admins:create",
          "platform:admins:update",
          "platform:admins:delete"
        ],
        btnShowOrHide:
          "platform:admins:query,read-platform:admins:create-platform:admins:update-platform:admins:delete"
      },
      {
        module: "system:accounts",
        position: 1,
        description: "账套管理",
        children: [
          {
            module: "system-accounts-read",
            description: "查询",
            permission: "system:accounts:query,read"
          },
          {
            module: "system-accounts-create",
            description: "新增",
            permission: "system:accounts:create"
          },
          {
            module: "system-accounts-update",
            description: "修改",
            permission: "system:accounts:update"
          },
          {
            module: "system-accounts-delete",
            description: "删除",
            permission: "system:accounts:delete"
          }
        ],
        arrays: [
          "system:accounts:query,read",
          "system:accounts:create",
          "system:accounts:update",
          "system:accounts:delete"
        ],
        btnShowOrHide:
          "system:accounts:query,read-system:accounts:create-system:accounts:update-system:accounts:delete"
      },
      {
        module: 1
      },
      {
        module: 2
      },
      {
        module: 3
      },
      {
        module: 4
      },
      {
        module: 5
      },
      {
        module: 6
      },
      {
        module: 7
      },
      {
        module: 8
      },
      {
        module: 9
      }
    ]
  },
  {
    module: "system",
    position: 1,
    description: "系统管理",
    children: [
      {
        module: "platform:users",
        position: 0,
        description: "用户管理",
        children: [
          {
            module: "platform-users-read",
            description: "查询",
            permission: "platform:users:query,read"
          },
          {
            module: "platform-users-create",
            description: "新增",
            permission: "platform:users:create"
          },
          {
            module: "platform-users-update",
            description: "修改",
            permission: "platform:users:update"
          },
          {
            module: "platform-users-delete",
            description: "删除",
            permission: "platform:users:delete"
          }
        ],
        arrays: [
          "platform:users:query,read",
          "platform:users:create",
          "platform:users:update",
          "platform:users:delete"
        ],
        btnShowOrHide:
          "platform:users:query,read-platform:users:create-platform:users:update-platform:users:delete"
      },
      {
        module: "system:roles",
        position: 1,
        description: "角色管理",
        children: [
          {
            module: "system-roles-read",
            description: "查询",
            permission: "system:roles:query,read"
          },
          {
            module: "system-roles-create",
            description: "新增",
            permission: "system:roles:create"
          },
          {
            module: "system-roles-update",
            description: "修改",
            permission: "system:roles:update"
          },
          {
            module: "system-roles-delete",
            description: "删除",
            permission: "system:roles:delete"
          }
        ],
        arrays: [
          "system:roles:query,read",
          "system:roles:create",
          "system:roles:update",
          "system:roles:delete"
        ],
        btnShowOrHide:
          "system:roles:query,read-system:roles:create-system:roles:update-system:roles:delete"
      },
      {
        module: 1
      },
      {
        module: 2
      },
      {
        module: 3
      },
      {
        module: 4
      },
      {
        module: 5
      },
      {
        module: 6
      },
      {
        module: 7
      },
      {
        module: 8
      },
      {
        module: 9
      }
    ]
  },
  {
    module: "​basic",
    position: 2,
    description: "基础数据",
    children: [
      {
        module: "​basic​:projects​",
        position: 0,
        description: "项目管理",
        children: [
          {
            module: "​basic​-projects​-create",
            description: "新增",
            permission: "​basic​:projects​:create"
          },
          {
            module: "​basic​-projects​-update",
            description: "修改",
            permission: "​basic​:projects​:update"
          },
          {
            module: "​basic​-projects​-delete",
            description: "删除",
            permission: "​basic​:projects​:delete"
          },
          {
            module: "​basic​-projects​-read",
            description: "查询",
            permission: "​basic​:projects​:query,read"
          }
        ],
        arrays: [
          "​basic​:projects​:create",
          "​basic​:projects​:update",
          "​basic​:projects​:delete",
          "​basic​:projects​:query,read"
        ],
        btnShowOrHide:
          "​basic​:projects​:create-​basic​:projects​:update-​basic​:projects​:delete-​basic​:projects​:query,read"
      },
      {
        module: "​basic​:subjects​",
        position: 1,
        description: "科目管理",
        children: [
          {
            module: "​basic-subjects​-create",
            description: "新增",
            permission: "​basic​:subjects​:create"
          },
          {
            module: "​basic-subjects​-read",
            description: "查询",
            permission: "​basic​:subjects​:query,read"
          },
          {
            module: "​basic-subjects​-update",
            description: "修改",
            permission: "​basic​:subjects​:update"
          },
          {
            module: "​basic-subjects​-delete",
            description: "删除",
            permission: "​basic​:subjects​:delete"
          }
        ],
        arrays: [
          "​basic​:subjects​:create",
          "​basic​:subjects​:query,read",
          "​basic​:subjects​:update",
          "​basic​:subjects​:delete"
        ],
        btnShowOrHide:
          "​basic​:subjects​:create-​basic​:subjects​:query,read-​basic​:subjects​:update-​basic​:subjects​:delete"
      },
      {
        module: "​basic​:modules​",
        position: 2,
        description: "模块管理",
        children: [
          {
            module: "​basic​-modules​-create",
            description: "新增",
            permission: "​basic​:modules​:create"
          },
          {
            module: "​basic​-modules​-read",
            description: "查询",
            permission: "​basic​:modules​:query,read"
          },
          {
            module: "​basic​-modules​-update",
            description: "修改",
            permission: "​basic​:modules​:update"
          },
          {
            module: "​basic​-modules​-delete",
            description: "删除",
            permission: "​basic​:modules​:delete"
          }
        ],
        arrays: [
          "​basic​:modules​:create",
          "​basic​:modules​:query,read",
          "​basic​:modules​:update",
          "​basic​:modules​:delete"
        ],
        btnShowOrHide:
          "​basic​:modules​:create-​basic​:modules​:query,read-​basic​:modules​:update-​basic​:modules​:delete"
      },
      {
        module: "​basic​:knowledges​",
        position: 3,
        description: "知识点管理",
        children: [
          {
            module: "​basic-knowledges​-create",
            description: "新增",
            permission: "​basic​:knowledges​:create"
          },
          {
            module: "​basic-knowledges​-read",
            description: "查询",
            permission: "​basic​:knowledges​:query,read"
          },
          {
            module: "​basic-knowledges​-update",
            description: "修改",
            permission: "​basic​:knowledges​:update"
          },
          {
            module: "​basic-knowledges​-delete",
            description: "删除",
            permission: "​basic​:knowledges​:delete"
          }
        ],
        arrays: [
          "​basic​:knowledges​:create",
          "​basic​:knowledges​:query,read",
          "​basic​:knowledges​:update",
          "​basic​:knowledges​:delete"
        ],
        btnShowOrHide:
          "​basic​:knowledges​:create-​basic​:knowledges​:query,read-​basic​:knowledges​:update-​basic​:knowledges​:delete"
      },
      {
        module: 1
      },
      {
        module: 2
      },
      {
        module: 3
      },
      {
        module: 4
      },
      {
        module: 5
      },
      {
        module: 6
      },
      {
        module: 7
      },
      {
        module: 8
      },
      {
        module: 9
      }
    ]
  },
  {
    module: "goods",
    position: 3,
    description: "商品管理",
    children: [
      {
        module: "​basic​:goodsBigColumn​",
        position: 0,
        description: "大专栏",
        children: [
          {
            module: "​basic​-goodsBigColumn​-read",
            description: "查询",
            permission: "​basic​:goodsBigColumn​:query,read"
          },
          {
            module: "​basic​-goodsBigColumn​-create",
            description: "新增",
            permission: "​basic​:goodsBigColumn​:create"
          },
          {
            module: "​basic​-goodsBigColumn​-update",
            description: "修改",
            permission: "​basic​:goodsBigColumn​:update"
          },
          {
            module: "​basic​-goodsBigColumn​-delete",
            description: "删除",
            permission: "​basic​:goodsBigColumn​:delete"
          },
          {
            module: "​basic​-goodsBigColumn​-on-shelf",
            description: "上架",
            permission: "​basic​:goodsBigColumn​:status:update"
          },
          {
            module: "​basic​-goodsBigColumn​-off-shelf",
            description: "下架",
            permission: "​basic​:goodsBigColumn​:status:update"
          }
        ],
        arrays: [
          "​basic​:goodsBigColumn​:query,read",
          "​basic​:goodsBigColumn​:create",
          "​basic​:goodsBigColumn​:update",
          "​basic​:goodsBigColumn​:delete",
          "​basic​:goodsBigColumn​:status:update",
          "​basic​:goodsBigColumn​:status:update"
        ],
        btnShowOrHide:
          "​basic​:goodsBigColumn​:query,read-​basic​:goodsBigColumn​:create-​basic​:goodsBigColumn​:update-​basic​:goodsBigColumn​:delete-​basic​:goodsBigColumn​:status:update-​basic​:goodsBigColumn​:status:update"
      },
      {
        module: "​basic​:goodsColumn​",
        position: 1,
        description: "专栏",
        children: [
          {
            module: "​basic​-goodsColumn​-read",
            description: "查询",
            permission: "​basic​:goodsColumn​:query,read"
          },
          {
            module: "​basic​-goodsColumn​-create",
            description: "新增",
            permission: "​basic​:goodsColumn​:create"
          },
          {
            module: "​basic​-goodsColumn​-update",
            description: "修改",
            permission: "​basic​:goodsColumn​:update"
          },
          {
            module: "​basic​-goodsColumn​-delete",
            description: "删除",
            permission: "​basic​:goodsColumn​:delete"
          },
          {
            module: "​basic​-goodsColumn​-on-shelf",
            description: "上架",
            permission: "​basic​:goodsColumn​​​:status:update"
          },
          {
            module: "​basic​-goodsColumn​-off-shelf",
            description: "下架",
            permission: "​basic​:goodsColumn​​​:status:update"
          }
        ],
        arrays: [
          "​basic​:goodsColumn​:query,read",
          "​basic​:goodsColumn​:create",
          "​basic​:goodsColumn​:update",
          "​basic​:goodsColumn​:delete",
          "​basic​:goodsColumn​​​:status:update",
          "​basic​:goodsColumn​​​:status:update"
        ],
        btnShowOrHide:
          "​basic​:goodsColumn​:query,read-​basic​:goodsColumn​:create-​basic​:goodsColumn​:update-​basic​:goodsColumn​:delete-​basic​:goodsColumn​​​:status:update-​basic​:goodsColumn​​​:status:update"
      },
      {
        module: "​basic​:goodsMember​",
        position: 2,
        description: "会员卡",
        children: [
          {
            module: "​basic​-goodsMember​-read",
            description: "查询",
            permission: "​basic​:goodsMember​:query,read"
          },
          {
            module: "​basic​-goodsMember​-create",
            description: "新增",
            permission: "​basic​:goodsMember​:create"
          },
          {
            module: "​basic​-goodsMember​-update",
            description: "修改",
            permission: "​basic​:goodsMember​:update"
          },
          {
            module: "​basic​-goodsMember​-delete",
            description: "删除",
            permission: "​basic​:goodsMember​:delete"
          },
          {
            module: "​basic​-goodsMember​-on-shelf",
            description: "上架",
            permission: "​basic​:goodsMember​​:status:update"
          },
          {
            module: "​basic​-goodsMember​-off-shelf",
            description: "下架",
            permission: "​basic​:goodsMember​​:status:update"
          }
        ],
        arrays: [
          "​basic​:goodsMember​:query,read",
          "​basic​:goodsMember​:create",
          "​basic​:goodsMember​:update",
          "​basic​:goodsMember​:delete",
          "​basic​:goodsMember​​:status:update",
          "​basic​:goodsMember​​:status:update"
        ],
        btnShowOrHide:
          "​basic​:goodsMember​:query,read-​basic​:goodsMember​:create-​basic​:goodsMember​:update-​basic​:goodsMember​:delete-​basic​:goodsMember​​:status:update-​basic​:goodsMember​​:status:update"
      },
      {
        module: "​basic​:goodsVideo​",
        position: 3,
        description: "视频课程",
        children: [
          {
            module: "​basic​-goodsVideo​-read",
            description: "查询",
            permission: "​basic​:goodsVideo​:query,read"
          },
          {
            module: "​basic​-goodsVideo​-on-shelf",
            description: "上架",
            permission: "​basic​:goodsVideo​:status:update"
          },
          {
            module: "​basic​-goodsVideo​-off-shelf",
            description: "下架",
            permission: "​basic​:goodsVideo​:status:update"
          },
          {
            module: "​basic​-goodsVideo​-create",
            description: "新增",
            permission: "​basic​:goodsVideo​:create"
          },
          {
            module: "​basic​-goodsVideo​-update",
            description: "修改",
            permission: "​basic​:goodsVideo​:update"
          },
          {
            module: "​basic​-goodsVideo​-delete",
            description: "删除",
            permission: "​basic​:goodsVideo​:delete"
          }
        ],
        arrays: [
          "​basic​:goodsVideo​:query,read",
          "​basic​:goodsVideo​:status:update",
          "​basic​:goodsVideo​:status:update",
          "​basic​:goodsVideo​:create",
          "​basic​:goodsVideo​:update",
          "​basic​:goodsVideo​:delete"
        ],
        btnShowOrHide:
          "​basic​:goodsVideo​:query,read-​basic​:goodsVideo​:status:update-​basic​:goodsVideo​:status:update-​basic​:goodsVideo​:create-​basic​:goodsVideo​:update-​basic​:goodsVideo​:delete"
      },
      {
        module: "​basic:goods​",
        position: 4,
        description: "直播课程",
        children: [
          {
            module: "​basic-goods​-read",
            description: "查询",
            permission: "​basic:goods​:query,read"
          },
          {
            module: "​basic-goods​-create",
            description: "新增",
            permission: "​basic:goods​:create"
          },
          {
            module: "​basic-goods​-update",
            description: "修改",
            permission: "​basic:goods​:update"
          },
          {
            module: "​basic-goods​-delete",
            description: "删除",
            permission: "​basic:goods​:delete"
          },
          {
            module: "​basic-goods​-on-shelf",
            description: "上架",
            permission: "​basic:goods​:status:update"
          },
          {
            module: "​basic-goods​-off-shelf",
            description: "下架",
            permission: "​basic:goods​:status:update"
          }
        ],
        arrays: [
          "​basic:goods​:query,read",
          "​basic:goods​:create",
          "​basic:goods​:update",
          "​basic:goods​:delete",
          "​basic:goods​:status:update",
          "​basic:goods​:status:update"
        ],
        btnShowOrHide:
          "​basic:goods​:query,read-​basic:goods​:create-​basic:goods​:update-​basic:goods​:delete-​basic:goods​:status:update-​basic:goods​:status:update"
      },
      {
        module: "​basic:goods​Offline",
        position: 5,
        description: "线下课程",
        children: [
          {
            module: "​basic-goods​Offline​-read",
            description: "查询",
            permission: "​basic:goods​Offline:query,read"
          },
          {
            module: "​basic-goods​Offline​-create",
            description: "新增",
            permission: "​basic:goods​Offline:create"
          },
          {
            module: "​basic-goods​Offline​-update",
            description: "修改",
            permission: "​basic:goods​Offline:update"
          },
          {
            module: "​basic-goods​Offline​-delete",
            description: "删除",
            permission: "​basic:goods​Offline:delete"
          },
          {
            module: "​basic-goods​Offline-on-shelf",
            description: "上架",
            permission: "​basic:goods​Offline:status:update"
          },
          {
            module: "​basic-goods​Offline​-off-shelf",
            description: "下架",
            permission: "​basic:goods​Offline:status:update"
          }
        ],
        arrays: [
          "​basic:goods​Offline:query,read",
          "​basic:goods​Offline:create",
          "​basic:goods​Offline:update",
          "​basic:goods​Offline:delete",
          "​basic:goods​Offline:status:update",
          "​basic:goods​Offline:status:update"
        ],
        btnShowOrHide:
          "​basic:goods​Offline:query,read-​basic:goods​Offline:create-​basic:goods​Offline:update-​basic:goods​Offline:delete-​basic:goods​Offline:status:update-​basic:goods​Offline:status:update"
      },
      {
        module: "basic​:goodsGroups​",
        position: 6,
        description: "商品分组",
        children: [
          {
            module: "basic​-goodsGroups​-read",
            description: "查询",
            permission: "basic​:goodsGroups​:query,read"
          },
          {
            module: "basic​-goodsGroups​-create",
            description: "新增",
            permission: "basic​:goodsGroups​:create"
          },
          {
            module: "basic​-goodsGroups​-update",
            description: "修改",
            permission: "basic​:goodsGroups​:update"
          },
          {
            module: "basic​-goodsGroups​-delete",
            description: "删除",
            permission: "basic​:goodsGroups​:delete"
          }
        ],
        arrays: [
          "basic​:goodsGroups​:query,read",
          "basic​:goodsGroups​:create",
          "basic​:goodsGroups​:update",
          "basic​:goodsGroups​:delete"
        ],
        btnShowOrHide:
          "basic​:goodsGroups​:query,read-basic​:goodsGroups​:create-basic​:goodsGroups​:update-basic​:goodsGroups​:delete"
      },
      {
        module: "​basic​:goodAttrs​",
        position: 7,
        description: "商品属性",
        children: [
          {
            module: "​basic​-goodAttrs​-read",
            description: "查询",
            permission: "​basic​:goodAttrs​:query,read"
          },
          {
            module: "​basic​-goodAttrs​-create",
            description: "新增",
            permission: "​basic​:goodAttrs​:create"
          },
          {
            module: "​basic​-goodAttrs​-update",
            description: "修改",
            permission: "​basic​:goodAttrs​:update"
          },
          {
            module: "​basic​-goodAttrs​-delete",
            description: "删除",
            permission: "​basic​:goodAttrs​:delete"
          }
        ],
        arrays: [
          "​basic​:goodAttrs​:query,read",
          "​basic​:goodAttrs​:create",
          "​basic​:goodAttrs​:update",
          "​basic​:goodAttrs​:delete"
        ],
        btnShowOrHide:
          "​basic​:goodAttrs​:query,read-​basic​:goodAttrs​:create-​basic​:goodAttrs​:update-​basic​:goodAttrs​:delete"
      },
      {
        module: 1
      },
      {
        module: 2
      },
      {
        module: 3
      },
      {
        module: 4
      },
      {
        module: 5
      },
      {
        module: 6
      },
      {
        module: 7
      },
      {
        module: 8
      },
      {
        module: 9
      }
    ]
  },
  {
    module: "order",
    position: 4,
    description: "订单管理",
    children: [
      {
        module: "​basic:order",
        position: 0,
        description: "销售订单",
        children: [
          {
            module: "​basic-order-read",
            description: "查询",
            permission: "​basic:order:query,read"
          },
          {
            module: "​basic-order-create",
            description: "新增",
            permission: "​basic:order:create"
          },
          {
            module: "​basic-order-update",
            description: "修改",
            permission: "​basic:order:update"
          },
          {
            module: "​basic-order-delete",
            description: "删除",
            permission: "​basic:order:delete"
          },
          {
            module: "​basic-order-orderRefund",
            description: "退款",
            permission: "​basic:order:orderRefund:update"
          },
          {
            module: "​basic-order-close",
            description: "关闭",
            permission: "​basic:order:update"
          }
        ],
        arrays: [
          "​basic:order:query,read",
          "​basic:order:create",
          "​basic:order:update",
          "​basic:order:delete",
          "​basic:order:orderRefund:update",
          "​basic:order:update"
        ],
        btnShowOrHide:
          "​basic:order:query,read-​basic:order:create-​basic:order:update-​basic:order:delete-​basic:order:orderRefund:update-​basic:order:update"
      },
      {
        module: 1
      },
      {
        module: 2
      },
      {
        module: 3
      },
      {
        module: 4
      },
      {
        module: 5
      },
      {
        module: 6
      },
      {
        module: 7
      },
      {
        module: 8
      },
      {
        module: 9
      }
    ]
  },
  {
    module: "qvw",
    position: 5,
    description: "题库管理",
    children: [
      {
        module: "qwm:qwmquestion",
        position: 0,
        description: "试题管理",
        children: [
          {
            module: "qwm-qwmquestion-read",
            description: "查询",
            permission: "qwm:qwmquestion:query,read"
          },
          {
            module: "qwm-qwmquestion-create",
            description: "新增",
            permission: "qwm:qwmquestion:create"
          },
          {
            module: "qwm-qwmquestion-update",
            description: "修改",
            permission: "qwm:qwmquestion:update"
          },
          {
            module: "qwm-qwmquestion-delete",
            description: "删除",
            permission: "qwm:qwmquestion:delete"
          }
        ],
        arrays: [
          "qwm:qwmquestion:query,read",
          "qwm:qwmquestion:create",
          "qwm:qwmquestion:update",
          "qwm:qwmquestion:delete"
        ],
        btnShowOrHide:
          "qwm:qwmquestion:query,read-qwm:qwmquestion:create-qwm:qwmquestion:update-qwm:qwmquestion:delete"
      },
      {
        module: 1
      },
      {
        module: 2
      },
      {
        module: 3
      },
      {
        module: 4
      },
      {
        module: 5
      },
      {
        module: 6
      },
      {
        module: 7
      },
      {
        module: 8
      },
      {
        module: 9
      }
    ]
  },
  {
    module: "administration",
    position: 6,
    description: "教务管理",
    children: [
      {
        module: "basic:EamCatalogResources",
        position: 0,
        description: "素材管理",
        children: [
          {
            module: "basic-eamCatalogResources-read",
            description: "查询",
            permission: "basic:EamCatalogResources:query,read"
          },
          {
            module: "basic-eamCatalogResources-create",
            description: "新增",
            permission: "basic:EamCatalogResources:create"
          },
          {
            module: "basic-eamCatalogResources-delete",
            description: "删除",
            permission: "basic:EamCatalogResources:delete"
          },
          {
            module: "basic-eamCatalogResources-update",
            description: "上传",
            permission: "basic:EamCatalogResources:upload:update"
          }
        ],
        arrays: [
          "basic:EamCatalogResources:query,read",
          "basic:EamCatalogResources:create",
          "basic:EamCatalogResources:delete",
          "basic:EamCatalogResources:upload:update"
        ],
        btnShowOrHide:
          "basic:EamCatalogResources:query,read-basic:EamCatalogResources:create-basic:EamCatalogResources:delete-basic:EamCatalogResources:upload:update"
      },
      {
        module: "basic:materials",
        position: 1,
        description: "物品管理",
        children: [
          {
            module: "basic-materials-read",
            description: "查询",
            permission: "basic:materials:query,read"
          },
          {
            module: "basic-materials-create",
            description: "新增",
            permission: "basic:materials:create"
          },
          {
            module: "basic-materials-update",
            description: "修改",
            permission: "basic:materials:update"
          },
          {
            module: "basic-materials-delete",
            description: "删除",
            permission: "basic:materials:delete"
          }
        ],
        arrays: [
          "basic:materials:query,read",
          "basic:materials:create",
          "basic:materials:update",
          "basic:materials:delete"
        ],
        btnShowOrHide:
          "basic:materials:query,read-basic:materials:create-basic:materials:update-basic:materials:delete"
      },
      {
        module: "basic:teachers",
        position: 2,
        description: "师资管理",
        children: [
          {
            module: "basic-teachers-read",
            description: "查询",
            permission: "basic:teachers:query,read"
          },
          {
            module: "basic-teachers-update",
            description: "修改",
            permission: "basic:teachers:update"
          }
        ],
        arrays: ["basic:teachers:query,read", "basic:teachers:update"],
        btnShowOrHide: "basic:teachers:query,read-basic:teachers:update"
      },
      {
        module: "basic:students",
        position: 3,
        description: "学员管理",
        children: [
          {
            module: "basic-students-read",
            description: "查询",
            permission: "basic:students:list:query,read"
          },
          {
            module: "basic-students-update",
            description: "修改",
            permission: "basic:students:update"
          }
        ],
        arrays: ["basic:students:list:query,read", "basic:students:update"],
        btnShowOrHide: "basic:students:list:query,read-basic:students:update"
      },
      {
        module: 1
      },
      {
        module: 2
      },
      {
        module: 3
      },
      {
        module: 4
      },
      {
        module: 5
      },
      {
        module: 6
      },
      {
        module: 7
      },
      {
        module: 8
      },
      {
        module: 9
      }
    ]
  },
  {
    module: "frontend",
    position: 7,
    description: "前台设置",
    children: [
      {
        module: "basic:cdmAppColumns",
        position: 0,
        description: "栏目设置",
        children: [
          {
            module: "basic-cdmAppColumns-read",
            description: "查询",
            permission: "basic:cdmAppColumns:query,read"
          },
          {
            module: "basic-cdmAppColumns-create",
            description: "新增",
            permission: "basic:cdmAppColumns:create"
          },
          {
            module: "basic-cdmAppColumns-update",
            description: "修改",
            permission: "basic:cdmAppColumns:update"
          },
          {
            module: "basic-cdmAppColumns-delete",
            description: "删除",
            permission: "basic:cdmAppColumns:delete"
          }
        ],
        arrays: [
          "basic:cdmAppColumns:query,read",
          "basic:cdmAppColumns:create",
          "basic:cdmAppColumns:update",
          "basic:cdmAppColumns:delete"
        ],
        btnShowOrHide:
          "basic:cdmAppColumns:query,read-basic:cdmAppColumns:create-basic:cdmAppColumns:update-basic:cdmAppColumns:delete"
      },
      {
        module: "basic:cdmColumnsDetail",
        position: 1,
        description: "栏目内容",
        children: [
          {
            module: "basic-cdmColumnsDetail-read",
            description: "查询",
            permission: "basic:cdmColumnsDetail:query,read"
          },
          {
            module: "basic-cdmColumnsDetail-create",
            description: "新增",
            permission: "basic:cdmColumnsDetail:create"
          },
          {
            module: "basic-cdmColumnsDetail-update",
            description: "修改",
            permission: "basic:cdmColumnsDetail:update"
          },
          {
            module: "basic-cdmColumnsDetail-delete",
            description: "删除",
            permission: "basic:cdmColumnsDetail:delete"
          }
        ],
        arrays: [
          "basic:cdmColumnsDetail:query,read",
          "basic:cdmColumnsDetail:create",
          "basic:cdmColumnsDetail:update",
          "basic:cdmColumnsDetail:delete"
        ],
        btnShowOrHide:
          "basic:cdmColumnsDetail:query,read-basic:cdmColumnsDetail:create-basic:cdmColumnsDetail:update-basic:cdmColumnsDetail:delete"
      },
      {
        module: "system:account-menus",
        position: 2,
        description: "公社菜单树-查询",
        children: [
          {
            module: "system-account-menus-tree",
            description: "公社菜单树-查询",
            permission: "system:account-menus:query,read"
          }
        ],
        arrays: ["system:account-menus:query,read"],
        btnShowOrHide: "system:account-menus:query,read"
      },
      {
        module: 1
      },
      {
        module: 2
      },
      {
        module: 3
      },
      {
        module: 4
      },
      {
        module: 5
      },
      {
        module: 6
      },
      {
        module: 7
      },
      {
        module: 8
      },
      {
        module: 9
      }
    ]
  },
  {
    children: [
      {
        module: 0
      },
      {
        options: 0
      },
      {
        module: 1
      },
      {
        module: 2
      },
      {
        module: 3
      },
      {
        module: 4
      },
      {
        module: 5
      },
      {
        module: 6
      },
      {
        module: 7
      },
      {
        module: 8
      },
      {
        module: 9
      }
    ],
    module: 0
  },
  {
    children: [
      {
        module: 1
      },
      {
        options: 1
      }
    ],
    module: 1
  },
  {
    children: [
      {
        module: 2
      },
      {
        options: 2
      }
    ],
    module: 2
  },
  {
    children: [
      {
        module: 3
      },
      {
        options: 3
      }
    ],
    module: 3
  },
  {
    children: [
      {
        module: 4
      },
      {
        options: 4
      }
    ],
    module: 4
  },
  {
    children: [
      {
        module: 5
      },
      {
        options: 5
      }
    ],
    module: 5
  },
  {
    children: [
      {
        module: 6
      },
      {
        options: 6
      }
    ],
    module: 6
  },
  {
    children: [
      {
        module: 7
      },
      {
        options: 7
      }
    ],
    module: 7
  },
  {
    children: [
      {
        module: 8
      },
      {
        options: 8
      }
    ],
    module: 8
  }
];
