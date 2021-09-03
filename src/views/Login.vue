<template>
<div class="contact__content">
    <div class="contact__header">
        <div class="header__overplay"></div>
        <h1>Đăng nhập</h1>
    </div>
    <div class="container">
        <div class="princess_component--social">
            <div class="facebook">
                <a href="#"><i class="fab fa-facebook-square"></i>Facebook</a>
            </div>
            <div class="google">
                <a href="#"> <svg aria-hidden="true" class="svg-icon native iconGoogle" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4"></path>
                        <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" fill="#34A853"></path>
                        <path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" fill="#FBBC05"></path>
                        <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" fill="#EA4335"></path>
                    </svg>Google</a>
            </div>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" :ref="ruleForm" label-width="120px" class="demo-ruleForm" style="margin:0 5rem">
            <el-form-item label="Email" prop="user" width="50px">
                <el-input type="text" v-model="ruleForm.user" placeholder="Email"></el-input>
            </el-form-item>

            <el-form-item label="Mật khẩu" prop="pass">
                <el-input v-model="ruleForm.pass" @keyup.enter.native="Submit(ruleForm)" placeholder="Mật khẩu" show-password></el-input>
            </el-form-item>
            <div class="forgetPass">
                <router-link to="/forgetpass"> Quên mật khẩu? </router-link>
            </div>
            <el-form-item style="display: flex; justify-content: center; ">
                <el-button type="primary" @click="Submit(ruleForm)">Đăng nhập</el-button>
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
                user: "",
                pass: "",
            },
            rules: {
                user: [{
                    validator: checkUser,
                    trigger: "change"
                }],
                pass: [{
                    validator: checkPass,
                    trigger: "change"
                }],
            },
        };
    },

    methods: {
        notifyMessage(title, message, type, position){

            return this.$notify({
                title: title,
                message: message,
                type: type,
                position: position,
            });

        },
        Submit(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    Axios.post("http://localhost:8080/apiDTfood/public/api/v1/login", {
                            customers_email: ruleForm.user,
                            customers_password: ruleForm.pass,
                        })
                        .then((res) => {
                            console.log(res);
                            if (res.data.msg != "Successfuly") {
                                this.notifyMessage("Thất bại", "Đăng nhập thất bại", "error", "top-right");
                            } else {
                                this.$store.dispatch("login", {
                                    SaveUsername: res.data.data,
                                });
                               
                                this.notifyMessage("Thành công", "Đăng nhập thành công", "success", "top-left");

                                this.$router.go(-1)
                            }
                        })
                        .catch(() => {
                                this.notifyMessage("Thất bại", "Mật khẩu của bạn không đúng, vui lòng kiểm tra lại!!", "error", "top-right");
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

.princess_component--social {
    display: flex;
    justify-content: center;
    padding: 50px;
}

.facebook a {
    width: 50%;
    padding: 6px 50px;
    border: none;
    background-color: #385499;
    color: white;
    border-radius: 2px;

}

.facebook a:hover {
    color: white;
    text-decoration: none;
}

.google a {
    width: 50%;
    padding: 6px 50px;
    border: 1px solid rgb(245, 245, 245);
    color: black;
    border-radius: 2px;
    text-decoration: none !important;

}

.el-form-item__content:nth-child(1) {
    margin-left: 0 !important;
}

.forgetPass {
    text-align: end;
}
</style>
