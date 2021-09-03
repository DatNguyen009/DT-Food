<template>
<div class="contact__content">
    <div class="contact__header">
        <div class="header__overplay"></div>
        <h2>Reset mật khẩu</h2>
    </div>
    <div class="container">
        <el-form :model="ruleForm" status-icon  :ref="ruleForm" label-width="120px" class="demo-ruleForm" style="margin:2rem 15rem">
            <el-form-item label="Email" prop="email" width="50px" disabled="true">
                <el-input type="text" placeholder="Mật khẩu" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Nhập mật khẩu" prop="pass" width="50px" :rules="[
                { required: true, message: 'Xác nhận mật khẩu không được bỏ trống', trigger: 'change'},
                { min: 6, message: 'Độ dài mật khẩu phải lớn hơn 5', trigger: 'change'},
            ]">
                <el-input type="text" v-model="ruleForm.pass" placeholder="Mật khẩu"></el-input>
            </el-form-item>
            <el-form-item label="Nhập mật khẩu xác nhận" prop="passConfirm" width="50px" :rules="[
                { required: true, message: 'Mật khẩu xác nhận không được bỏ trống', trigger: 'change'},
                { min: 6, message: 'Độ dài của xác nhận mật khẩu phải lớn hơn 5', trigger: 'change'},
            ]">
                <el-input type="text" v-model="ruleForm.passConfirm" placeholder="Mật khẩu xác nhận"></el-input>
            </el-form-item>
            <el-form-item style="display: flex; justify-content: center; ">
                <el-button type="primary" @click="onSubmit(ruleForm)">Cập nhật</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
import Axios from 'axios'
import Vue from "vue";
import ElementUI from "element-ui";

Vue.use(ElementUI);
export default {
    data() {
        return {
            ruleForm: {
                email: '',
                pass: "",
                passConfirm: ""
            },
        }
    },
    created() {
        this.email = localStorage.getItem("email");
    },
    methods: {
        checkPass() {
            if (this.pass !== this.passConfirm) {
                this.$message({
                    message: "Mật khẩu và mật khẩu xác nhận không trùng khớp!!",
                    type: 'error'
                });
                return false;
            }
        },
        onSubmit(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    if (!this.checkPass()) {
                        Axios.put("http://localhost:8080/apiDTfood/public/api/v1/customers/{id}", {
                                email: this.ruleForm.user,
                                newPass: this.pass
                            })
                            .then(res => {
                                console.log(res);
                            })
                            .catch(err => console.log(err))
                    }

                } else {
                    console.log('error');
                }
            })
        }
    },
}
</script>

<style>
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");

.contact__header {
    background-image: url("../assets/backgound-6.jpg");
    width: 100%;
    height: 330px;
    background-size: cover;
    position: relative;
}

.contact__header h2 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    font-size: 80px;
    font-weight: lighter;
    letter-spacing: 5px;
}
</style>
