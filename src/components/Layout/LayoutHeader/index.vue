<!--
 * @Author: KokoTa
 * @Date: 2020-12-21 10:05:34
 * @LastEditTime: 2021-01-07 09:00:17
 * @LastEditors: KokoTa
 * @Description: 头部导航栏
 * @FilePath: /future-bms/src/components/Layout/LayoutHeader/index.vue
-->
<template>
  <div class="header">
    <div class="left">
      <!-- logo -->
      <img class="logo" src="@/assets/imgs/logo.png" alt />
      <!-- 收展菜单 -->
      <i
        v-if="isCollapse"
        class="el-icon-s-fold fold"
        @click="triggerMenuCollapse"
      ></i>
      <i v-else class="el-icon-s-unfold fold" @click="triggerMenuCollapse"></i>
      <!-- 欢迎语 -->
      <span class="welcome">欢迎使用得分教育平台管理系统</span>
      <span class="welcome">{{ $store.state.commune || $store.state.user.communeName }}</span>
    </div>
    <div class="right">
      <!-- 通知 -->
      <!-- <i class="el-icon-bell bell" @click="showWx"></i> -->
      <img class="el-icon-bell bell" :src="src" @click="showWx" />
      <!-- 头像 -->
      <img class="avatar" :src="profilePicture" alt />
      <!-- 下拉框 -->
      <el-dropdown trigger="click" @command="command">
        <span class="el-dropdown-link dropdown-link">
          {{ nickName }}
          <i class="el-icon-arrow-down el-icon--down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="reset">重置密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 密码重置框 -->
      <index v-show="showWx" class="wx"></index>
      <Reset ref="reset"></Reset>
    </div>
  </div>
</template>

<script>
import Bell_no from "../../../assets/image/messageBellZero.png";
import Bell from "../../../assets/image/messageBell.png";
import index from "@/index";
import Reset from "@/components/Layout/LayoutHeader/dialog/Reset.vue";
import { logout } from "@/api/user";
import { removeToken, getProfilePicture, getNickName } from "@/util/auth";
export default {
  components: { Reset, index },
  data() {
    return {
      isCollapse: false,
      showFlag: false,
      src: Bell,
      profilePicture: getProfilePicture(),
      nickName: getNickName()
    };
  },
  mounted() {
    this.$bus.$on("showMessage", val => {
      this.src = Bell;
    });
  },
  methods: {
    showWx() {
      this.$bus.$emit("changeWxShow", true);
      this.src = Bell_no;
    },
    triggerMenuCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("triggerMenuCollapse", this.isCollapse);
    },
    command(type) {
      // 重置
      if (type === "reset") {
        this.$refs.reset.showFlag = true;
      }
      // 登出
      if (type === "logout") {
        this.$confirm("是否退出登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            await logout();
            removeToken();
            tim.logout().then(() => {
              context.commit("toggleIsLogin");
              context.commit("stopComputeCurrent");
              context.commit("reset");
            });
            this.$router.replace("/login");
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-icon-bell {
  cursor: pointer;
}
.wx {
  position: absolute;
  /* width: 300px; */
  height: 0;
  margin: auto;
  top: 0px;
  left: 0;
  /* bottom: 200px; */
  right: 0;
  z-index: 1000;
}
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $mainColor;
  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 150px;
      height: 50px;
      margin: 0 10px;
    }
    .fold {
      font-size: 24px;
      color: $black;
      &:hover {
        cursor: pointer;
      }
    }
    .welcome {
      font-weight: bolder;
      margin-left: 10px;
      color: $black;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .bell {
    }
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-left: 10px;
    }
    .dropdown-link {
      outline: none;
      margin: 0 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
