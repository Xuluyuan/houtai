<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avator_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">提交</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid === true) {
          // let res=await this.axios.post('login',`username=${this.username}&password=${this.password}`)
          let res = await this.axios.post(
            "login",
            this.qs.stringify(this.loginForm)
          );
          if (res.data.meta.status !== 200) {
            return this.$message.error("用户名或密码错误");
          } else {
            this.$message.success("登录成功");
            //1.将登录成功之后的token 保存到客户端的 sessionStorage中
            //1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
            //1.2 token 只应在当前网站打开期间生效，所以必须将token保存到sessionStorage中
            sessionStorage.setItem("token", res.data.data.token);
            //2.通过编程式导航跳转到后台主页
            this.$router.push("/home");
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.login_container
  background-color #2b4b6b
  height 100%
  .login_box
    height 300px
    width 450px
    background-color #ffffff
    border-radius 5px
    position absolute
    left 50%
    top 50%
    margin-left -225px
    margin-top -150px
    .avator_box
      height 130px
      width 130px
      border 1px solid #eee
      border-radius 50%
      padding 10px
      box-shadow 0 0 10px #eee
      margin-left 140px
      margin-top -75px
      img
        width 100%
        height 100%
        border-radius 50%
        background-color #eeeeee
    .login_form
      padding 20px
      .btns
        display flex
        justify-content flex-end
</style>
