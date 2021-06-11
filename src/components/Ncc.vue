<template>
<main>
    <div class="container-fluid">
        <h1 class="mt-4">Nhà cung cấp</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">Dashboard</li>
        </ol>

        <div class="card mb-4">
            <div class="card-header justify-content-left">
                <i class="fas fa-table mr-1" v-if="date < dateNow">Danh sách nguyên liệu cần cung cấp cho ngày  {{date.slice(0,10)}}</i> 
                <i class="fas fa-table mr-1" v-else>Danh sách nguyên liệu cần cung cấp cho ngày  {{dateTomorrow.slice(0,10)}}</i> 
            </div>
            <div class="card-body">
                <div class="table-responsive">

                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr style="font-size: 14px">
                                <th>STT</th>
                                <th>Tên món ăn</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                                <th>Đơn vị tính</th>
                                <th>Ngày đặt món</th>

                            </tr>
                        </thead>

                        <tbody v-for="(item, index) in this.$store.getters.getPriceCalculation" :key="'a' + index">
                            <tr style="font-size: 12px">
                                <td>{{index+1}} </td>
                                <td>{{ item.materials_name }}</td>
                                <td style="max-width: 140px">{{ item.materials_amount }}</td>
                                <td v-for="(itemA, index) in item.materials_priceDetail" :key="'b'+index"> {{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(itemA.materials_price) }} </td>
                                <td>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.materials_price) }} </td>
                                <td>{{ item.materials_unit }}</td>
                                <td>{{ item.NCC_dateCreated.slice(0,10) }}</td>
                                <!-- <td> <el-button type="success" @click="SetPrice(`${item.NCC_dateCreated}`,`${item.materials_name}`,`${index+1}`)">Send</el-button> </td> -->
                            </tr>
                        </tbody>
                        <tbody v-if="this.$store.state.getNccA.length == 0">
                            <td class="text-center" colspan="8">Hôm nay không có nguyên liệu</td>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</main>
</template>

<script>
import Axios from 'axios'
import Vue from 'vue'
Vue.use(Axios)
export default {
    data() {
        return {
            input: '',
            date:"",
            dateNow: '',
            dateTomorrow: ''
        }
    },
    created() {
        this.$store.dispatch("getNccA", {
            url: "http://localhost:8080/apiDTfood/public/api/v1/setPriceNcc",
            url_supplier: "http://localhost:8080/apiDTfood/public/api/v1/supplierPrice",
        });
        
        this.countdown();
        
    },
    methods: {

        SetPrice(day, name, index) {
            let valuePrice = document.querySelector(`#price_${index}`).value;
            if (valuePrice == "") {
                this.$notify({
                    title: 'Thông báo',
                    message: 'Vui lòng nhập giá!!!',
                    type: 'warning',
                    position: 'top-right'
                })
            } else {
                Axios.put('http://localhost:8080/apiDTfood/public/api/v1/setPriceNcc/{id}', {
                        name: name,
                        day: day,
                        valuePrice: valuePrice
                    })
                    .then(res => {
                        if (res.data == "success") {
                            this.$store.dispatch("getNcc", {
                                url: "http://localhost:8080/apiDTfood/public/api/v1/setPriceNcc",
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        countdown() {
            var today = new Date();
            if (today.getDate() < 10) {
                this.date = `${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
                this.dateNow = `${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
                today.setDate(new Date().getDate()+1);
                this.dateTomorrow = `${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()}`;
            } else {
                this.date = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
                this.dateNow = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()} 19:30`;
                today.setDate(new Date().getDate()+1);
                this.dateTomorrow = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}  ${today.getHours()}:${today.getMinutes()}`;
            }
        },
        
    },

   
}
</script>

<style>

</style>
