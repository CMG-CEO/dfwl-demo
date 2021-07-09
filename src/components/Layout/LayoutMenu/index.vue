<!--
 * @Author: KokoTa
 * @Date: 2020-12-21 10:26:14
 * @LastEditTime: 2020-12-30 10:57:09
 * @LastEditors: KokoTa
 * @Description: 侧边导航栏
 * @FilePath: /future-bms/src/components/Layout/LayoutMenu/index.vue
-->
<template>
  <div class="menu-wrap">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true"
      background-color="#ffcc42"
      text-color="#000000"
      active-text-color="#000000"
    >
      <template v-for="(route, index) in routes">
        <!-- 有子路由才会渲染 -->
        <template v-if="route.child">
          <!-- 只有一个子路由就显示单项 -->
          <el-menu-item
            v-if="route.child.length === 1"
            :index="
              resolvePath(
                route.path,
                route.child[0].path,
                route.child[0].btnShowOrHide
              )
            "
            :key="index"
          >
            <svg-icon :icon-class="route.icon" />
            <span slot="title">{{ route.child[0].name }}</span>
          </el-menu-item>
          <!-- 如果有多个子路由就显示多项 :data="permissions[index].module == route.nickname" -->
          <el-submenu
            :hh="route.nickname"
            v-else
            :index="resolvePath(route.path, route.child[0].path)"
            :key="index"
          >
            <template slot="title">
              <svg-icon :icon-class="route.icon" />
              <span slot="title">{{ route.name }}</span>
            </template>
            <template v-for="(childRoute, childIndex) in route.child">
              <el-menu-item
                :query="'fds'"
                :index="
                  resolvePath(
                    route.path,
                    childRoute.path,
                    childRoute.btnShowOrHide
                  )
                "
                :key="childIndex"
              >
                <svg-icon :icon-class="childRoute.icon" />
                <span slot="title">{{ childRoute.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import path from "path";
import { mapGetters } from "vuex";
import { getPermissions } from "@/util/auth";
import { stringify } from "querystring";

export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["userRoutes"])
  },
  data() {
    return {
      routes: [],
      routesLists: [],
      permissions: JSON.parse(getPermissions()).data[0].children
    };
  },
  created() {
    const perNewArr = this.permissions;

    for (let i = 0; i < perNewArr.length; i++) {
      for (let j = 0; j < perNewArr[i].children.length; j++) {
        perNewArr[i].children[j].arrays = [];
        perNewArr[i].children[j].btnShowOrHide = "";
        const newsArr = perNewArr[i].children[j].children;
        for (let k = 0; k < newsArr.length; k++) {
          perNewArr[i].children[j].arrays.push(newsArr[k].permission);
        }
        perNewArr[i].children[j].btnShowOrHide = perNewArr[i].children[
          j
        ].arrays.join("-");
      }
    }
    const routesLeng = this.routes.length;
    for (let i = 0; i < routesLeng; i++) {
      this.permissions.push({
        children: [{ module: i }, { options: i }],
        module: i
      });
      this.permissions[i].children.push(
        { module: 1 },
        { module: 2 },
        { module: 3 },
        { module: 4 },
        { module: 5 },
        { module: 6 },
        { module: 7 },
        { module: 8 },
        { module: 9 }
      );
    }
    // 遍历全部路由列表
    const routeslist = this.routes;
    const listrou = [];
    // start
    // 把匹配到的数据重新push到新数组中 进行渲染
    for (let i = 0; i < routeslist.length; i++) {
      // 模板一
      if (routeslist[i].module == this.permissions[0].module) {
        routeslist[i].child = [];
        for (let j = 0; j < routeslist[i].children.length; j++) {
          if (
            routeslist[i].children[j].module ==
            this.permissions[0].children[0].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[0].children[1].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[0].children[2].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[0].children[3].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
        }
        // 把 新增/删除/查询... 添加到新数组中
        for (let k = 0; k < routeslist[i].child.length; k++) {
          routeslist[i].child[k].children = this.permissions[0].children[
            k
          ].children;
          routeslist[i].child[k].btnShowOrHide = this.permissions[0].children[
            k
          ].btnShowOrHide;
        }
        listrou.push(routeslist[i]);
      }
      // 模板二
      if (routeslist[i].module == this.permissions[1].module) {
        routeslist[i].child = [];
        for (let j = 0; j < routeslist[i].children.length; j++) {
          if (
            routeslist[i].children[j].module ==
            this.permissions[1].children[0].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[1].children[1].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
        }
        for (let k = 0; k < routeslist[i].child.length; k++) {
          routeslist[i].child[k].children = this.permissions[1].children[
            k
          ].children;
          routeslist[i].child[k].btnShowOrHide = this.permissions[1].children[
            k
          ].btnShowOrHide;
        }
        listrou.push(routeslist[i]);
      }
      if (routeslist[i].module == this.permissions[2].module) {
        routeslist[i].child = [];
        for (let j = 0; j < routeslist[i].children.length; j++) {
          if (
            routeslist[i].children[j].module ==
            this.permissions[2].children[0].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[2].children[1].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[2].children[2].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[2].children[3].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
        }
        for (let k = 0; k < routeslist[i].child.length; k++) {
          routeslist[i].child[k].children = this.permissions[2].children[
            k
          ].children;
          routeslist[i].child[k].btnShowOrHide = this.permissions[2].children[
            k
          ].btnShowOrHide;
        }
        listrou.push(routeslist[i]);
      }
      if (routeslist[i].module == this.permissions[3].module) {
        routeslist[i].child = [];
        for (let j = 0; j < routeslist[i].children.length; j++) {
          if (
            routeslist[i].children[j].module ==
            this.permissions[3].children[0].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[3].children[1].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[3].children[2].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[3].children[3].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[3].children[4].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[3].children[5].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[3].children[6].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[3].children[7].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
        }
        for (let k = 0; k < routeslist[i].child.length; k++) {
          routeslist[i].child[k].children = this.permissions[3].children[
            k
          ].children;
          routeslist[i].child[k].btnShowOrHide = this.permissions[3].children[
            k
          ].btnShowOrHide;
        }
        listrou.push(routeslist[i]);
      }
      if (routeslist[i].module == this.permissions[4].module) {
        routeslist[i].child = [];
        for (let j = 0; j < routeslist[i].children.length; j++) {
          if (
            routeslist[i].children[j].module ==
            this.permissions[4].children[0].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
        }
        for (let k = 0; k < routeslist[i].child.length; k++) {
          routeslist[i].child[k].children = this.permissions[4].children[
            k
          ].children;
          routeslist[i].child[k].btnShowOrHide = this.permissions[4].children[
            k
          ].btnShowOrHide;
        }
        listrou.push(routeslist[i]);
      }
      if (routeslist[i].module == this.permissions[5].module) {
        routeslist[i].child = [];
        for (let j = 0; j < routeslist[i].children.length; j++) {
          if (
            routeslist[i].children[j].module ==
            this.permissions[5].children[0].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
        }
        for (let k = 0; k < routeslist[i].child.length; k++) {
          routeslist[i].child[k].children = this.permissions[5].children[
            k
          ].children;
          routeslist[i].child[k].btnShowOrHide = this.permissions[5].children[
            k
          ].btnShowOrHide;
        }
        listrou.push(routeslist[i]);
      }
      if (routeslist[i].module == this.permissions[6].module) {
        routeslist[i].child = [];
        for (let j = 0; j < routeslist[i].children.length; j++) {
          if (
            routeslist[i].children[j].module ==
            this.permissions[6].children[0].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[6].children[1].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[6].children[2].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[6].children[3].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
        }
        for (let k = 0; k < routeslist[i].child.length; k++) {
          routeslist[i].child[k].children = this.permissions[6].children[
            k
          ].children;
          routeslist[i].child[k].btnShowOrHide = this.permissions[6].children[
            k
          ].btnShowOrHide;
        }
        listrou.push(routeslist[i]);
      }
      if (routeslist[i].module == this.permissions[7].module) {
        routeslist[i].child = [];
        for (let j = 0; j < routeslist[i].children.length; j++) {
          if (
            routeslist[i].children[j].module ==
            this.permissions[7].children[0].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
          if (
            routeslist[i].children[j].module ==
            this.permissions[7].children[1].module
          ) {
            routeslist[i].child.push(routeslist[i].children[j]);
          }
        }
        for (let k = 0; k < routeslist[i].child.length; k++) {
          routeslist[i].child[k].children = this.permissions[7].children[
            k
          ].children;
          routeslist[i].child[k].btnShowOrHide = this.permissions[7].children[
            k
          ].btnShowOrHide;
        }
        listrou.push(routeslist[i]);
      }
    }
    this.routes = listrou;
    // for (let i = 0; i < listrou.length; i++) {
    //   if (listrou.indexOf(this.permissions[i].module) !== -1) {
    //   }
    // }
    // end

    // 把当前路由列表定义的nickname单独取出
    // for (let i = 0; i < routeslist.length; i++) {
    //   listrou.push(routeslist[i].nickname);
    // }
    // 定义的nickname是否包含返回权限名称
    // const permissionslist = this.permissions;
    // for (let i = 0; i < permissionslist.length; i++) {
    //   if (listrou.indexOf(permissionslist[i].module) != -1) {
    //     this.routesLists.push(routeslist[i]);
    //   }
    // }
    /*
      第一步
        获取本地所有列表和请求过来的权限（需求：根据后端返回的数据进行匹配）
    */
  },
  watch: {
    userRoutes: {
      immediate: true,
      handler(routes) {
        // 筛选掉不显示的路由
        this.routes = this.userRoutes.filter(route => !route.hidden);
      }
    }
  },
  methods: {
    resolvePath(basePath, routePath, fun) {
      return decodeURI(path.resolve(basePath, routePath + "?id=" + fun));
    }
  }
};
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu .svg-icon {
  margin-right: 5px;
  margin-left: 5px;
}
.el-menu-item.is-active {
  background: $mainLightColor !important;
}
</style>
