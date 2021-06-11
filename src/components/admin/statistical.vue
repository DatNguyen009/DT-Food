<template>
  <main>
    <div class="container-fluid">
      <h1 class="mt-4">Thống kê</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>
        
      <div class="mb-4">
            <div class="row">
                <div class="col-xl-3 col-md-6">
                    <div class="card   mb-4">
                        <div class="card-body">
                            <img src="https://img.icons8.com/dotty/80/000000/money.png" width="20" />
                            Tổng lợi nhuận
                            <p> </p>
                        </div>

                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small  stretched-link" href="#">0</a>
                            <div class="small "><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card   mb-4">
                        <div class="card-body">
                            <img src="https://img.icons8.com/dotty/80/000000/get-revenue--v3.png" width="20" />
                            Tổng doanh thu</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small  stretched-link" href="#">0</a>
                            <div class="small "><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card   mb-4">
                        <div class="card-body">
                            <img src="https://img.icons8.com/carbon-copy/100/000000/cost.png" width="20" />
                            Tổng chi phí</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small  stretched-link" href="#">0</a>
                            <div class="small "><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card   mb-4">
                        <div class="card-body">------------------------</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small  stretched-link" href="#">0</a>
                            <div class="small "><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <el-select v-model="value" placeholder="Select" @change="statiscal()" style="margin-bottom: 10px;"> 
                <el-option
                v-for="item in months"
                :key="item.value"
                :label="item.name"
                :value="item.value">
                </el-option>
            </el-select>
            <el-table
                :data="ListStatistical"
                border
                show-summary
                sum-text="Tổng tiền"
                :summary-method="getSummaries"
                style="width: 100%">
                <el-table-column
                prop="order_id"
                label="ID"
                width="80">
                </el-table-column>
                <el-table-column
                prop="product_name"
                label="Tên món ăn">
                    <template slot-scope="scope">
                        <p v-for="(item, index) in scope.row.product_name" :key="index">{{item.product_name}}</p>
                    </template>
                </el-table-column>
                 <el-table-column
                prop="orderDetail_amount"
                label="Số lượng"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="product_price"
                sortable
                label="Tổng doanh thu tháng">
                    <template slot-scope="scope">
                        <p v-for="(item, index) in scope.row.product_price" :key="index">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format( item.product_price * scope.row.orderDetail_amount)}}</p>
                      
                    </template>
                </el-table-column>
                <el-table-column
                label="Tổng chi phí tháng">
                </el-table-column>
                <el-table-column
                prop="order_dateReceived"
                sortable
                label="Ngày giao hàng">
                    <template slot-scope="scope">
                        <p v-for="(item, index) in scope.row.order_dateReceived" :key="'A'+ index">{{item.order_dateReceived}}</p>
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
Vue.use(ElementUI);
export default {
    data() {
        return {
            months: [
                {name: "Tháng 1", value: '1'},
                {name: "Tháng 2", value: '2'},
                {name: "Tháng 3", value: '3'},
                {name: "Tháng 4", value: '4'},
                {name: "Tháng 5", value: '5'},
                {name: "Tháng 6", value: '6'},
                {name: "Tháng 7", value: '7'},
                {name: "Tháng 8", value: '8'},
                {name: "Tháng 9", value: '9'},
                {name: "Tháng 10", value: '10'},
                {name: "Tháng 11", value: '11'},
                {name: "Tháng 12", value: '12'},
            ],
            value: '',
            ListStatistical: [],
            CostStatistical: 0,
            TotalRevenue: 0
        }
    },
    props:{
        a:{
            type: String
        }
    },
    created() {
        if (this.a != "qtv") {
            this.$router.push({ path: "/admin" });
        }
    },
    methods: {
        statiscal()
        {
            let date = new Date();
            Axios.get(`http://localhost:8080/apiDTfood/public/api/v1/statistical/${date.getFullYear()}-${this.value}`)
            .then(res => {this.ListStatistical = res.data})
            .catch(err => console.log(err))
            Axios.get(`http://localhost:8080/apiDTfood/public/api/v1/statisticalCost/${date.getFullYear()}-${this.value}`)
            .then(res => {this.CostStatistical = res.data;})
            .catch(err => console.log(err))
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    return sums[index] = 'Tổng tiền';
                }
                if (index === 3) {
                   
                    const values = data.reduce((a,item) => {
                        return a + (item.orderDetail_amount * item.product_price[0].product_price);
                    },0);
                    this.TotalRevenue = values;
                    sums[index] = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(values);
                    
                }
                if (index === 2) {
                    return sums[index] = "";
                }
                if (index === 4) {
                    return sums[index] = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.CostStatistical);
                   
                }
                if (index === 5) {
                    return sums[index] = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.TotalRevenue - this.CostStatistical);
                   
                }
            });
                return sums;
            }
    },
}
</script>

<style>
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");

</style>