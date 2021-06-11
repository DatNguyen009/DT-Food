<template>
  <div class="contact__content">
    <div class="contact__header">
      <div class="header__overplay"></div>
      <h1>Đăng Ký</h1>
    </div>
    <div class="container">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        :ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
        style="margin: 10rem"
      >
        <el-form-item label="Nhập họ vè tên" prop="name"
            :rules="[
                { required: true, message: 'Tên không được bỏ trống', trigger: 'change'},
            ]"
        >
          <el-input
            type="text"
            v-model="ruleForm.name"
            autocomplete="off"
            placeholder="Họ và tên"
          ></el-input>
        </el-form-item>
        <el-form-item label="Nhập Email" prop="user">
          <el-input
            type="text"
            v-model="ruleForm.user"
            autocomplete="off"
            placeholder="Email"
          ></el-input>
        </el-form-item>
        <el-form-item label="Nhập địa chỉ" prop="address"
            :rules="[
                { required: true, message: 'Địa chỉ không được bỏ trống', trigger: 'change'},
            ]"
        >
          <el-input
            type="text"
            v-model="ruleForm.address"
            autocomplete="off"
            placeholder="Địa chỉ"
          ></el-input>
        </el-form-item>
        <el-form-item label="Nhập số điện thoại" prop="phoneNumber"    
         :rules="[
            { required: true, message: 'Số điện thoại không được bỏ trống', trigger: 'change'},
            { type: 'number', message: 'Số điện thoại không hợp lệ!!!'}
         ]"
        >
          <el-input
            type="tel"
            v-model.number="ruleForm.phoneNumber"
            autocomplete="off"
            placeholder="Số điện thoại"
          ></el-input>
        </el-form-item>
        <el-form-item label="Mật khẩu" prop="pass" :rules="[
            { required: true, message: 'Mật khẩu không được bỏ trống', trigger: 'change'},
            { min: 6, message: 'Độ dài của mật khẩu phải lớn hơn 5', trigger: 'change'},
         ]">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="Mật khẩu"
          ></el-input>
        </el-form-item>
        <el-form-item label="Nhập mật khẩu xác nhận" prop="confirmPass" :rules="[
            { required: true, message: 'Xác nhận mật khẩu không được bỏ trống', trigger: 'change'},
            { min: 6, message: 'Độ dài của xác nhận mật khẩu phải lớn hơn 5', trigger: 'change'},
         ]">
          <el-input
            type="password"
            v-model="ruleForm.confirmPass"
            @keyup.enter="Submit(ruleForm)"
            autocomplete="off"
            placeholder="mật khẩu xác nhận"
          ></el-input>
        </el-form-item> 
        <el-form-item style="display: flex; justify-content: center">
          <el-button
            type="primary"
            @click="Submit(ruleForm)"
            @keyup.enter="Submit(ruleForm)"
            >Đăng ký</el-button
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
    var checkEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập email"));
      } else {
        if (value.indexOf("@gmail.com") == -1) {
          callback(new Error("Email không hợp lệ !"));
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
        name: "",
        user: "",
        pass: "",
        address: "",
        confirmPass: "",
        phoneNumber: ""

      },
      rules: {
        user: [{ validator: checkEmail, trigger: "change" }],
        pass: [{ validator: checkPass, trigger: "change" }],
      },
    };
  },

  methods: {
    Submit(ruleForm) {
        if (ruleForm.pass != ruleForm.confirmPass) {
            this.$message({
                showClose: true,
                message: "Mật khẩu và mật khẩu xác nhận không trùng khớp!!",
                type: 'error'
            });
        } else {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                Axios.post("http://localhost:8080/apiDTfood/public/api/v1/register", {
                    customers_email: ruleForm.user,
                    customers_name: ruleForm.name,
                    customers_address: ruleForm.address,
                    customers_phone: ruleForm.phoneNumber,
                    customers_password: ruleForm.pass,
                    confirm_password: ruleForm.confirmPass,
                })
                    .then((res) => {
            
                      if (res.data == "existUser") {
                        this.$notify({
                          title: "Thất bại",
                          message: "Email đã tồn tại",
                          type: "error",
                          position: "top-right",
                        });
                      } else {
                        if (res.data == "success") {
                            this.$notify({
                                title: "Thành công",
                                message: "Đăng ký thành công",
                                type: "success",
                                position: "top-left",
                            });
                        }
                        this.$router.push({path: '/login'});
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
        }
      
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