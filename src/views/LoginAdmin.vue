<template>
  <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                <form ref="Data">
            
                    <span class="login100-form-title p-b-32">
                        Admin Login
                    </span>
                  
                    <p id="error_login"></p>
                    <span class="txt1 p-b-11">
                        Username
                    </span>
                  
                    <div class="wrap-input100 validate-input m-b-36" data-validate="Username is required">
                        <input class="input100" type="text">
                        <span class="focus-input100"></span>

                    </div>
                    <p id="error_email" style="color: red;"></p>
                    <span class="txt1 p-b-11">
                        Password
                    </span>
                   
                    <div class="wrap-input100 validate-input m-b-12" data-validate="Password is required">
                        <span class="btn-show-pass">
                            <i class="fa fa-eye"></i>
                        </span>
                        <input class="input100" type="password" @keyup.enter="Login()">
                        <span class="focus-input100"></span>

                    </div>
                    <p id="error_pass" style="color: red;"></p>
                    

                </form>
                <div class="container-login100-form-btn" style="margin-top: 20px;" id="login">
                    <button class="login100-form-btn" @click="Login()">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import Axios from 'axios'
Vue.use(ElementUI)
export default {
    methods: {
        Login()
        {   
            Axios.post('http://localhost:8080/apiDTfood/public/api/v1/admin',{
                name: this.$refs.Data[0].value,
                password: this.$refs.Data[1].value
            })
            .then(res => {
              
                if (res.data.length > 0 && res.data != "error") {
                    localStorage.setItem("Admin", res.data[0].name);
                    this.$notify({
                        title: "Thành công",
                        message: "Đăng nhập thành công",
                        type: 'success',
                        position: 'top-left'
                    })
                    this.$router.push({path: '/admin'});
                }
                else{
                    this.$notify({
                        title: "Thất bại",
                        message: "Đăng nhập thất bại",
                        type: 'error',
                        position: 'top-right'
                    })
                   
                }
                
            })
            .catch(() => {
                 this.$notify({
                    title: "Thất bại",
                    message: "Đăng nhập thất bại",
                    type: 'error',
                    position: 'top-right'
                })
            })
        }
    },
}
</script>

<style lang="scss">
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");
@import '../assets/css/util.css';
@import '../assets/css/main.css';

</style>