<template>
<main>
    <div class="container-fluid">
        <h1 class="mt-4">Quản lý người dùng</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">Dashboard</li>
        </ol>

        <div class="mb-4">

            <el-table :data="ListUser" border style="width: 100%">
                <el-table-column prop="customers_id" label="ID" width="80">
                </el-table-column>
                <el-table-column prop="customers_name" sortable label="Tên người dùng">

                </el-table-column>
                <el-table-column prop="customers_email" sortable label="Email khách hàng" width="auto">
                </el-table-column>
                <el-table-column prop="customer_phone" sortable label="Số điện thoại">
                </el-table-column>
                <el-table-column prop="customers_address" label="Địa chỉ">
                </el-table-column>
                <el-table-column label="Tùy chọn">
                    <template slot-scope="scope">
                        <el-button type="danger" @click="DeleteUser(scope.row.customers_id)">Xóa</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</main>
</template>

<script>
import Axios from 'axios'
import ElementUI from 'element-ui'
import Vue from 'vue'
Vue.use(ElementUI)
export default {
    data() {
        return {
            ListUser: [],
        }
    },
    props: {
        a: {
            type: String
        }
    },
    created() {
        if (this.a != "qtv") {
            this.$router.push({
                path: "/admin"
            });
        }
        this.fetchDataUser();
    },
    methods: {
        fetchDataUser() {
            Axios.get("http://localhost:8080/apiDTfood/public/api/v1/customers")
                .then(res => this.ListUser = res.data.data)
                .catch(err => console.log(err))
        },
        DeleteUser(id) {
            this.$confirm('Bạn có chắc chắn muốn xóa người dùng này?', 'Thông báo', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                console.log(id);
                Axios.delete("http://localhost:8080/apiDTfood/public/api/v1/customers/"+id)
                .then(res => {
                    if (res.data.msg == "Successfully") {
                        this.$message({
                            type: 'success',
                            message: 'Delete completed'
                        });
                        location.reload();
                    }
                })
               
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Delete canceled'
                });
            });
        }
    },
}
</script>

<style>
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");
</style>
