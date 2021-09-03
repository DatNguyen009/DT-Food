<template>
<div class="inforUser">
    <div class="inforUser__header">
        <div class="header__overplay"></div>
        <h1>Thông tin cá nhân</h1>
    </div>
    <div class="container-fluid">
        <el-tabs tab-position="top" style="height: auto;">
            <el-tab-pane label="Thông tin cá nhân">
                <el-form status-icon label-width="200px" class="demo-ruleForm" v-for="(item, index) in this.$store.state.getInforUser" :key="index">
                    <el-form-item label="Họ vè tên" prop="name">
                        <el-input type="text" :value="item.customers_name" autocomplete="off" placeholder="Họ và tên"></el-input>
                    </el-form-item>
                    <el-form-item label=" Email" prop="user">
                        <el-input type="text" :value="item.customers_email" autocomplete="off" placeholder="Email"></el-input>
                    </el-form-item>
                    <el-form-item label="Địa chỉ" prop="address">
                        <el-input type="text" :value="item.customers_address" autocomplete="off" placeholder="Địa chỉ"></el-input>
                    </el-form-item>
                    <el-form-item label="Số điện thoại" prop="phoneNumber">
                        <el-input type="tel" :value="'0'+item.customer_phone" autocomplete="off" :placeholder="item.customer_phone"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="Thông tin đơn hàng">
                <el-table ref="multipleTable" :data="tableData" style="width: 100%; display: grid; justify-content: center">
                    <el-table-column type="selection" width="55"> </el-table-column>

                    <el-table-column property="order_id" label="Mã đơn hàng" width="auto"> </el-table-column>

                    <el-table-column property="order_status" label="Trạng thái đơn hàng" width="auto">
                    </el-table-column>

                    <el-table-column property="order_dateReceived" label="Ngày giao hàng" width="auto">
                    </el-table-column>

                    <el-table-column property="order_id" label="Tùy chọn" width="auto">
                        <template slot-scope="scope">
                            <el-popover placement="left" width="800" trigger="click">
                                <el-table :data="tableDetail">
                                    <el-table-column width="auto" property="product_name" label="Tên sản phẩm">
                                        <template slot-scope="scope">
                                            <p> {{scope.row.product_name[0].product_name}} </p>
                                        </template>
                                    </el-table-column>
                                    <el-table-column width="auto" property="orderDetail_price" label="Giá"></el-table-column>
                                    <el-table-column width="auto" property="orderDetail_amount" label="Số lượng"></el-table-column>

                                </el-table>
                                <el-button slot="reference" type="danger" @click="Show(scope.row.order_id)" style="width: 70%;">Chi tiết đơn hàng</el-button>
                                <el-button slot="reference" v-if="scope.row.order_status == 'chua giao hang' " type="danger" style="margin: 10px 0;width: 70%;" @click="CancelOrder(scope.row.order_id)">Hủy đơn hàng</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="Đổi mật khẩu">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
                    <el-form-item label="Mật khẩu" prop="pass" :rules="{ min: 6, message: 'Độ dài của mật khẩu phải lớn hơn 5', trigger: 'change'}">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Mật khẩu xác nhận" prop="checkPass" :rules="{ min: 6, message: 'Độ dài của xác nhận mật khẩu phải lớn hơn 5', trigger: 'change'}">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">Cập nhật mật khẩu</el-button>
                        <el-button @click="resetForm('ruleForm')">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

    </div>
</div>
</template>

<script>
import Axios from 'axios'
import ElementUI from "element-ui";
import Vue from "vue";
Vue.use(ElementUI);

export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Vui lòng nhập mật khẩu!!'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Vui lòng nhập mật khẩu confirm!!!'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('Mật khẩu và mật khẩu xác nhận không trùng nhau!'));
            } else {
                callback();
            }
        };
        return {
            tableData: [],
            tableDetail: [],
            ruleForm: {
                pass: '',
                checkPass: ''
            },
            rules: {
                pass: [{
                    validator: validatePass,
                    trigger: 'blur'
                }],
                checkPass: [{
                    validator: validatePass2,
                    trigger: 'blur'
                }],
            }
        };
    },
    mounted() {
        if (this.$store.state.statusLogin != "Login") {
            this.$router.push({
                path: "/login"
            });
        }
        this.$store.dispatch("getCart", {
            url: `http://localhost:8080/apiDTfood/public/api/v1/customerOrder/${this.$store.state.customers_email}`,
            url_inforUser: `http://localhost:8080/apiDTfood/public/api/v1/customers/${this.$store.state.customers_email}`,
        });

    },
    methods: {
        Show(id) {
            Axios.get(`http://localhost:8080/apiDTfood/public/api/v1/OrderDetail/${id}`)
                .then(res => this.tableDetail = res.data)
                .catch(err => console.log(err))
        },
        CancelOrder(order_id) {
            this.$confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?', 'Thông báo', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                Axios.delete(`http://localhost:8080/apiDTfood/public/api/v1/orderManagement/${order_id}`)
                    .then(res => {
                        if (res.data == "success") {
                            this.$notify({
                                type: 'success',
                                title: "Thông báo",
                                message: "Hủy đơn hàng thành công!!",
                                position: 'top-right'
                            })
                            location.reload();
                        } else {
                            if (res.data == "faildate") {
                                this.$notify({
                                    type: 'error',
                                    title: "Thông báo",
                                    message: "Hủy đơn hàng không thành công!!",
                                    position: 'top-right'
                                })
                            }
                        }

                    })
                    .catch(err => console.log(err))
            }).catch(() => {

            });

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    Axios.put('http://localhost:8080/apiDTfood/public/api/v1/customers/{id}', {
                            email: this.$store.state.customers_email,
                            newPass: this.ruleForm.pass
                        }, {
                            headers: {
                                "Content-Type": "application/json;charset=utf-8"
                            }
                        })
                        .then(res => {
                            if (res.data.status == "successfully") {
                                this.$message({
                                    type: 'success',
                                    message: res.data.message,
                                });
                            } else {
                                this.$message({
                                    type: 'success',
                                    message: res.data.message,
                                });
                            }
                        })
                        .catch(err => console.log(err))
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    watch: {
        "$store.state.getCart": function () {
            this.tableData = this.$store.state.getCart;
        },
    },

};
</script>

<style lang="scss">
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");

.inforUser__header {
    background-image: url("../assets/backgound-about.jpg");
    width: 100%;
    height: 330px;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.header__overplay {
    background: linear-gradient(to bottom,
            rgba(45, 45, 45, 0.4) 0%,
            rgba(45, 45, 45, 0.9) 100%);
    width: 100%;
    height: 100%;
}

.inforUser__header h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    font-size: 70px;
    font-weight: lighter;
    letter-spacing: 5px;
}
</style>
