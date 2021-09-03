<template>
<main>
    <div class="container-fluid">
        <h1 class="mt-4">Quản trị viên</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">Dashboard</li>
        </ol>

        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table mr-1" v-if="date < dateNow">Danh sách nguyên liệu cần cung cấp cho ngày {{date.slice(0,10)}}</i>
                <i class="fas fa-table mr-1" v-else>Danh sách nguyên liệu cần cung cấp cho ngày {{dateTomorrow.slice(0,10)}}</i>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <el-tabs type="card">
                        <el-tab-pane label="Bảng đơn hàng">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr style="font-size: 14px">
                                        <th>STT</th>
                                        <th>Tên món ăn</th>
                                        <th>Số lượng</th>
                                        <th>Tổng tiền</th>
                                        <th>Ngày nhận món</th>
                                    </tr>
                                </thead>

                                <tbody v-if="!this.$store.state.dataKitchen.message">
                                    <tr style="font-size: 12px" v-for="(item, index) in this.$store.state.dataKitchen" :key="'a' + index">
                                        <td>{{index+1}} </td>
                                        <td v-for="(itemA, index) in item.product_name" :key="'A'+index">{{ itemA.product_name }}</td>
                                        <td style="max-width: 140px">{{ item.orderDetail_amount }}</td>
                                        <td v-for="(itemA, index) in item.product_price" :key="'C'+index">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format( item.orderDetail_amount * itemA.product_price)}}</td>
                                        <td v-for="(itemA, index) in item.order_dateReceived" :key="'B'+index">{{ itemA.order_dateReceived.slice(0,10) }}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <td class="text-center" colspan="6">{{this.$store.state.dataKitchen.message}}</td>
                                </tbody>
                            </table>
                        </el-tab-pane>
                        <el-tab-pane label="Bảng nguyên liệu">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr style="font-size: 14px">
                                        <th>STT</th>
                                        <th>Tên nguyên liệu</th>
                                        <th>Khối lượng</th>
                                        <th>ĐVT</th>
                                        <th>Ngày nhận món</th>
                                    </tr>
                                </thead>

                                <tbody v-for="(item, index) in this.$store.state.getNB" :key="index">
                                    <tr style="font-size: 12px">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.material_name }}</td>
                                        <td style="max-width: 140px">{{ item.material_amount }}</td>
                                        <td>{{ item.material_unit }}</td>
                                        <td>{{ item.order_created.slice(0,10) }}</td>
                                    </tr>
                                </tbody>
                                <tbody v-if="this.$store.state.getNB.length == 0">
                                    <td class="text-center" colspan="5">Hôm nay không có nguyên liệu</td>
                                </tbody>
                            </table>
                        </el-tab-pane>
                    </el-tabs>

                    <!-- <el-button @click="Submit()"
              >Gửi nguyên liệu cho nhà sản xuất nhập giá</el-button
            > -->
                </div>
            </div>

        </div>
    </div>
</main>
</template>

<script>
import Axios from "axios";
import ElementUI from "element-ui";
import VueCookie from "vue-cookie";
import Vue from "vue";
Vue.use(ElementUI);
Vue.use(VueCookie);
export default {
    data() {
        return {
            date: "",
            dateNow: '',
            dateTomorrow: ''
        }
    },
    created() {

        this.$store.dispatch("DataKitchen", {
            url: "http://localhost:8080/apiDTfood/public/api/v1/kitchen"
        });
        this.$store.dispatch("getNB", {
            url: "http://localhost:8080/apiDTfood/public/api/v1/NKNVL",
        });
        this.countdown();
    },
    methods: {
        Submit() {
            if (this.$cookie.get('sendDataSuccess') == null) {
                Axios.post("http://localhost:8080/apiDTfood/public/api/v1/ncc", {
                        data: this.$store.getters.getNB,
                    })
                    .then((res) => {
                        if (res.data == "success") {
                            this.$notify({
                                title: "Thành công",
                                message: "Gửi dữ liệu thành công!!!",
                                type: "success",
                                position: "top-left",
                            });
                            this.$cookie.set('sendDataSuccess', 'sendDataSuccess', {
                                expires: '1D'
                            });
                        }
                    })
                    .catch((err) => {
                        this.$notify({
                            title: "Thất bại",
                            message: "Gửi dữ liệu thất bại!!!",
                            type: "error",
                            position: "top-right",
                        });
                        console.log(err);
                    });
            } else {
                this.$notify({
                    type: "Info",
                    message: "Bạn đã gửi dữ liệu thành công, bạn có thể gửi trong vòng 24h nữa",
                    title: "Thông báo",
                    position: "top-right"
                })
            }

        },
        countdown() {
            var today = new Date();
            if (today.getDate() < 10) {
                if (today.getHours() < 10){
                    this.date = `${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()} 0${today.getHours()}:${today.getMinutes()}`;
                }else{
                    this.date = `${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
                }
                this.dateTomorrow = `${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()}`;
                this.dateNow = `${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()} 19:30`;
                today.setDate(new Date().getDate()+1);
            } else {
                if (today.getHours() < 10){
                    this.date = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()} 0${today.getHours()}:${today.getMinutes()}`;
                    this.dateTomorrow = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()} 0${today.getHours()}:${today.getMinutes()}`;
                }else{
                    this.date = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
                    this.dateTomorrow = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
                }
                
                this.dateNow = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()} 19:30`;
                today.setDate(new Date().getDate()+1);
            }
        },
    },
};
</script>

<style>
</style>
