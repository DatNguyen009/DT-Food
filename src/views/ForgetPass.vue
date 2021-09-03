<template>
<div class="contact__content">
    <div class="contact__header">
        <div class="header__overplay"></div>
        <h2>Quên mật khẩu</h2>
    </div>
    <div class="container">
        <el-form :model="ruleForm" status-icon :rules="rules" :ref="ruleForm" label-width="120px" class="demo-ruleForm" style="margin:2rem 15rem">
            <el-form-item label="Email" prop="user" width="50px">
                <el-input type="text" v-model="ruleForm.user" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item style="display: flex; justify-content: center; ">
                <el-button type="primary" @click="onSubmit(ruleForm)">Gửi</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import Axios from 'axios'

Vue.use(ElementUI);
export default {
    data() {
        var checkEmail = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("Vui lòng nhập email"));
            } else {
                if (value.indexOf("@gmail.com") == -1)
                    callback(new Error("Email không hợp lệ !"));
                callback();
            }
        };
        return {
            ruleForm: {
                user: "",
            },
            rules: {
                user: [{
                    validator: checkEmail,
                    trigger: "change"
                }],
            },
        }
    },
    methods: {  
        onSubmit(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    Axios.post("http://localhost:8080/apiDTfood/public/api/v1/forgetpass", {
                        email: this.ruleForm.user
                    })
                    .then(res => {
                        if (res.message == "Successfully"){
                            this.$message({ message: 'Gửi email thành công!!',type: 'success'});
                        }
                        else{
                            this.$message({ message: 'Gửi email thất bại!!',type: 'error'});
                        }
                    })
                    .catch(err => console.log(err))

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
