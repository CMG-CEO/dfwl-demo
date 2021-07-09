<!--
 * @Author: KokoTa
 * @Date: 2020-12-22 11:08:20
 * @LastEditTime: 2021-02-03 10:22:54
 * @LastEditors: KokoTa
 * @Description: 登录页
 * @FilePath: /future-bms/src/views/login/index.vue
-->
<template>
  <div class="login-container">
    <div class="login-header">
      <div class="login-header-content">
        <img class="logo" src="@/assets/imgs/logo.png" />
      </div>
    </div>
    <div class="login-left"></div>
    <div class="login-right">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <section class="login-radio-group">
          <el-radio-group v-model="loginForm.accountType">
            <el-radio label="1">平台管理员</el-radio>
            <el-radio label="2">公社用户</el-radio>
          </el-radio-group>
        </section>
        <el-form-item v-if="loginForm.accountType === '2'" prop="accountId">
          <img class="icon" :src="logoUrl" alt />
          <el-select
            v-model="loginForm.accountId"
            placeholder="请选择公社"
            @change="accountIdChange"
          >
            <el-option
              v-for="item in optionList"
              :key="item.accountId"
              :label="item.accountName"
              :value="item.accountId"
              >{{ item.accountName }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item prop="username">
          <img class="icon" src="@/assets/imgs/user.png" alt />
          <el-input
            ref="username"
            v-model.trim="loginForm.username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <img class="icon" src="@/assets/imgs/password.png" alt />
          <el-input
            ref="password"
            v-model="loginForm.password"
            name="password"
            tabindex="2"
            auto-complete="on"
            show-password
            @keyup.enter.native="handleLogin"
            placeholder="请输入密码"
            clearable
          />
        </el-form-item>
        <!-- <div class="verify-wrap">
          <el-form-item class="verify-left" prop="verify">
            <img class="icon" src="@/assets/imgs/verification.png" alt />
            <el-input
              ref="verify"
              v-model="loginForm.verify"
              name="verify"
              tabindex="3"
              @keyup.enter.native="handleLogin"
              placeholder="请输入验证码"
              clearable
            />
          </el-form-item>
          <el-form-item class="verify-right"></el-form-item>
        </div>-->
        <el-button
          class="login-button"
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
        <div class="login-forget">忘记密码</div>
      </el-form>
    </div>
    <div class="login-footer">
      <span>厦门得分未来科技有限公司</span>
    </div>
  </div>
</template>

<script>
import { login, loginPlatform, getPermissions, imGetUserid } from "@/api/user";
import {
  setToken,
  setCommuneName,
  setProfilePicture,
  setNickName,
  setPermissions,
  setCommuneId,
  setUserId,
} from "@/util/auth";
import { getCommuneList } from "@/api/public";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入登录账号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码长度不能小于3位"));
      } else {
        callback();
      }
    };
    return {
      accountName: "",
      loginForm: {
        accountType: "1", // 账号类型
        username: "chenyf",
        password: "123",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        verify: [
          { required: true, trigger: "blur", message: "验证码不能为空" },
        ],
        accountId: [
          { required: true, trigger: "blur", message: "公社不能为空" },
        ],
      },
      loading: false,
      optionList: [],
    };
  },
  computed: {
    logoUrl() {
      const { accountId, accountName } = this.loginForm;
      if (accountId) {
        const account = this.optionList.find(
          (item) => item.accountId === accountId
        );

        if (account) return account.logoUrl;
      }
      return "";
    },
  },
  watch: {
    "loginForm.accountType"(val) {
      if (val === "1") {
        this.loginForm.accountId = "";
      }
    },
  },
  methods: {
    accountIdChange(data) {
      this.optionList.forEach((item) => {
        if (item.accountId == data) {
          console.log("cunlemei");
          setCommuneId(item.accountId);
          this.accountName = item.accountName;
        }
      });
    },
    // 登录操作
    async handleLogin() {
      let _this = this;
      const { accountType } = this.loginForm;
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          try {
            let res = null;
            if (accountType === "1") {
              res = await loginPlatform(this.loginForm);
            } else {
              res = await login(this.loginForm);
            }
            if (res) {
              setToken(res.headers["x-jti"]);
              let userInform = await imGetUserid();
              this.$store.commit({
                type: "GET_USER_INFO",
                userID: userInform.data.userId,
                userSig: userInform.data.userSig,
                password: this.loginForm.password,
                // userID: "550@3",
                // userSig:
                //   "eJw1jlELgjAUhf-LXgu5brsmQlBg9FK*JAx7s23lRYqhlqPov2daj*c754PzYvnuEFjvqLEsCRGRA8B8pA-bsITxANiUW1OXzpEZdhIAQcQgp4aMvXV0plFAhJX4K3QZyL30JDbPAlSabbUoXH0yqLifiZ7nlVO*XfQZHfVer5c-saPr908UxogRSP7*APCAMLU_",
                sdkAppID: 1400491625,
              });

              _this.tim
                .login({
                  userID: userInform.data.userId,
                  userSig: userInform.data.userSig,
                  // userID: "550@3",
                  // userSig:
                  //   "eJw1jlELgjAUhf-LXgu5brsmQlBg9FK*JAx7s23lRYqhlqPov2daj*c754PzYvnuEFjvqLEsCRGRA8B8pA-bsITxANiUW1OXzpEZdhIAQcQgp4aMvXV0plFAhJX4K3QZyL30JDbPAlSabbUoXH0yqLifiZ7nlVO*XfQZHfVer5c-saPr908UxogRSP7*APCAMLU_"
                })
                .then(() => {
                  this.loading = false;
                  this.$store.commit("toggleIsLogin", true);
                  this.$store.commit("startComputeCurrent");
                  this.$store.commit("saveCommune", this.accountName);
                  this.$store.commit("saveNickName", res.data.nickName);
                  this.$store.commit(
                    "saveProfilePicture",
                    res.data.profilePicture
                  );
                  setCommuneName(this.accountName);
                  setProfilePicture(res.data.profilePicture);
                  setNickName(res.data.nickName);
                  setUserId(res.data.userId);
                  this.$store.commit("showMessage", {
                    type: "success",
                    message: "登录成功",
                  });

                  this.$router.push("/dashboard/home");
                })
                .catch((error) => {
                  this.loading = false;
                  this.$store.commit("showMessage", {
                    message: "登录失败：" + error.message,
                    type: "error",
                  });
                });

              // this.$message.success("登录成功");
            }
            const permissionsList = await getPermissions();
            this.$store.commit("savePermissions", permissionsList);
            setPermissions(permissionsList);
          } catch (error) {
            console.log(error);
          }
          this.loading = false;
        } else {
          this.$message.info("请完善登录信息");
        }
      });
    },

    // 获取公社列表
    async getOptionList() {
      const res = await getCommuneList();
      this.optionList = res.data;
    },
  },
  mounted() {
    this.getOptionList();
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg: #283443;
$light_gray: #707070;
$cursor: #707070;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    input {
      text-indent: 30px;
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #707070;
    background: #fff;
    border-radius: 5px;
    color: #454545;
    overflow: hidden;
    position: relative;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #606266;
  }
}
</style>

<style lang="scss" scoped>
$bg: #f9ddc2;
$dark_gray: #889aa4;
$light_gray: #eee;
$color: #707070;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url("~@/assets/imgs/bg.png") center/cover;
  overflow: hidden;
  display: flex;
  .login-left,
  .login-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .login-form {
      min-width: 300px;
      width: 500px;
      margin-right: 290px;
      margin-top: 60px;
      margin-bottom: 60px;
      background: $bg;
      padding: 48px 43px 0 43px;
      box-sizing: border-box;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      border-radius: 8px;
      .login-radio-group {
        margin-bottom: 20px;
      }
      .login-button {
        border: 0;
        outline: 0;
        background: #ec7f7d;
      }
      .login-forget {
        color: $color;
        margin: 12px 0;
        &:hover {
          cursor: pointer;
        }
      }
      .verify-wrap {
        display: flex;
        .verify-left {
          width: 300px;
        }
        .verify-right {
          flex: 1;
          margin-left: 12px;
        }
      }
      .icon {
        width: 22px;
        height: 22px;
        padding: 12px;
        position: absolute;
        z-index: 100;
      }
    }
  }
  .login-footer,
  .login-header {
    height: 60px;
    line-height: 60px;
    color: $color;
    background: $bg;
    text-align: center;
  }
  .login-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .login-header-content {
      max-width: 1400px;
      margin: 0 auto;
      text-align: left;
      .logo {
        width: 140px;
        height: 60px;
      }
    }
  }
  .login-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
