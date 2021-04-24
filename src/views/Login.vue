<template>
  <div class="contact__content">
    <div class="contact__header">
      <div class="header__overplay"></div>
      <h1>Login</h1>
    </div>
    <div class="container">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        :ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        style="margin: 10rem"
      >
        <el-form-item label="Tên đăng nhập" prop="user">
          <el-input
            type="text"
            v-model="ruleForm.user"
            autocomplete="off"
            placeholder="tên đăng nhập"
          ></el-input>
        </el-form-item>

        <el-form-item label="Mật khẩu" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            @keyup.enter="Submit(ruleForm)"
            autocomplete="off"
            placeholder="mật khẩu"
          ></el-input>
        </el-form-item>

        <el-form-item style="display: flex; justify-content: center">
          <el-button
            type="primary"
            @click="Submit(ruleForm)"
            @keyup.enter="Submit(ruleForm)"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Axios from "axios";
import ElementUI from "element-ui";

Vue.use(ElementUI);
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập tên đăng nhập"));
      } else {
        if (value.indexOf("@gmail.com") == -1) {
          callback(new Error("Không đúng địa chỉ Email"));
        } else {
          callback();
        }
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập mật khẩu"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "",
        pass: "",
      },
      rules: {
        user: [{ validator: checkUser, trigger: "change" }],
        pass: [{ validator: checkPass, trigger: "change" }],
      },
    };
  },

  methods: {
    Submit(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          Axios.post("http://localhost:8080/apiDTfood/public/api/v1/login", {
            customers_email: ruleForm.user,
            customers_password: ruleForm.pass,
          })
            .then((res) => {
              if (res.data.length == 0) {
                this.$notify({
                  title: "Thất bại",
                  message: "Đăng nhập thất bại",
                  type: "error",
                  position: "top-right",
                });
              } else {
                this.$store.dispatch("login", {
                  SaveUsername: res.data,
                });
                this.$notify({
                  title: "Thành công",
                  message: "Đăng nhập thành công",
                  type: "success",
                  position: "top-left",
                });

              this.$router.go(-1)
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  
};
</script>

<style lang="scss">
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");
.contact__header {
  background-image: url("../assets/backgound-6.jpg");
  width: 100%;
  height: 330px;
  background-size: cover;
  position: relative;
}

.contact__header h1 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  font-size: 100px;
  font-weight: lighter;
  letter-spacing: 5px;
}
</style>