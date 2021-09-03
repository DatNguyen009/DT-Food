<template>
  <main>
    <div class="container-fluid">   
      <h1 class="mt-4">Quản lý đơn hàng</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>
        
      <div class="mb-4">
          <div class="row">
                
                <div class="col-xl-3 col-md-6">
                    <div class="card   mb-4">
                        <div class="card-body">
                            <img src="../../assets/not_delivered_rejected_failed_shipping_truck-512.png" alt="" width="20">
                            Chưa giao hàng</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <router-link class="small" to="/admin/orderManagement">View Details</router-link>
                            <div class="small "><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card   mb-4">
                        <div class="card-body">
                            <img src="../../assets/packing-1537468-1302513.png" alt="" width="20">
                            
                            Đang giao hàng</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <router-link class="small" to="/admin/orderManagement/OrderPacking">View Details</router-link>
                            <div class="small "><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card   mb-4">
                        <div class="card-body">
                            <img src="../../assets/successful-delivery.png" alt="" width="20">
                            Giao hàng thành công</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <router-link class="small" to="/admin/orderManagement/OrderSuccess">View Details</router-link>
                            <div class="small "><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-md-6">
                    <div class="card   mb-4">
                        <div class="card-body">
                            <img src="../../assets/not_delivered_rejected_failed_shipping_truck-512.png" alt="" width="20">
                            Đơn hàng đã hủy
                        </div>

                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <router-link class="small" to="/admin/orderManagement/OrderCanceled">View Details</router-link>
                            <div class="small "><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="default" v-if="$route.name == 'OrderManagement'">
                <el-table
                    :data="ListOrder"
                    style="width: 100%"  >
                    <el-table-column
                    label="ID"
                    width="50%"
                    >
                        <template slot-scope="scope">
                            <p>{{scope.$index + 1}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="Mã đơn hàng"
                    prop="order_id" width="120px;">
                    </el-table-column>
                    <el-table-column
                    label="Tên khách hàng"
                    prop="customers_id">
                    </el-table-column>

                    <el-table-column
                    label="Trạng thái"
                    prop="order_status">
                    </el-table-column>
                    <el-table-column
                    label="Ngày giao"
                    prop="order_dateReceived">
                    </el-table-column>
                    <el-table-column
                    label="Tùy chọn"
                    align="right"  prop="order_id" style="display: grid;">
                    
                    <template slot-scope="scope" >
                       
                        <el-button
                        type="warning"
                        v-if="scope.row.order_status == 'chua giao hang'"
                        @click="handlePack(scope.$index, scope.row.order_id, scope.row.order_dateReceived)" style="width: 100%;margin:10px 0;">Đóng gói</el-button>
                        
                        <el-popover
                            placement="left"
                            width="800"
                            trigger="click">
                            <el-table :data="tableDetail">
                                <el-table-column width="auto" property="product_name" label="Tên sản phẩm">
                                <template slot-scope="scope">
                                    <p> {{scope.row.product_name[0].product_name}} </p>
                                </template>
                                </el-table-column>
                                <el-table-column width="auto" property="orderDetail_price" label="Giá"></el-table-column>
                                <el-table-column width="auto" property="orderDetail_amount" label="Số lượng"></el-table-column>
                                
                            </el-table>
                            <el-button  slot="reference" type="danger" @click="Show(scope.row.order_id)" style="width: 100%;">Chi tiết đơn hàng</el-button>
                        </el-popover>
                    </template>
                    </el-table-column>
                </el-table>
                <el-pagination class="d-flex justify-content-center" background layout="prev, pager, next" :total="parseInt(totalPages)" @current-change="handleCurrentChange" style="margin: 5rem;"></el-pagination>
                
            </div>
            <router-view></router-view>
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
            ListOrder: [],
            totalPages: 0,
            tableDetail: [],
            date:'',
        }
    },
    props:{
        a:{
            type: String
        }
    },
    created() {
        this.getListOrder();
        if (this.a != "qtv") {
            this.$router.push({ path: "/admin" });
        }
        var today = new Date();
        if (today.getDate() < 10) {
            this.date = `${today.getFullYear()}-0${today.getMonth()+1}-0${today.getDate()}`;
        } else {
            this.date = `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}`;
        }
    },
    methods: {
        getListOrder(){
            Axios.get('http://localhost:8080/apiDTfood/public/api/v1/orderManagement')
            .then(res => {
                this.ListOrder = res.data.data;
                this.totalPages = `${res.data.last_page}0`;
                })
            .catch(err => console.log(err))
        },
        handleCurrentChange(val){
            Axios.get(`http://localhost:8080/apiDTfood/public/api/v1/orderManagement?page=${val}`)
            .then(res => {
                this.ListOrder = res.data.data;
            })
            .catch(err => console.log(err))
        },
        handleSuccess(i,r, order_status)
        {
            
            if (order_status == "chua giao") {
                this.$notify({
                    type: 'error',
                    message: 'Vui lòng đóng sản phẩm trước khi giao!!!',
                    title: 'Thất bại',
                    position: 'top-right',
                })
            }
            else{
                this.$confirm(`Bạn có chắc chắn sản phẩm này đã giao thành công??`,'Thông báo',{
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'info'
            })
            .then(() => {
                Axios.put("http://localhost:8080/apiDTfood/public/api/v1/orderManagement/{id}",{
                    update: "giao",
                    data: r
                })
                .then(res => {
                    if (res.data == "success") {
                        this.$notify({
                            type: 'success',
                            message: 'Đóng gói sản phẩm thành công!!!',
                            title: 'Thành công',
                            position: 'top-left',
                        })
                        location.reload();
                    }
                })
                .catch(err => console.log(err))
                })
                .catch(()=>{
                    this.$notify({
                        type: 'error',
                        message: 'Đóng sản phẩm thất bại!!!',
                        title: 'Thất bại',
                        position: 'top-right',
                    })
                })
            }

        },
        handlePack(i,r, orderDay){

            if (this.date < orderDay.slice(0, 10)) {
                this.$notify({
                    type: 'error',
                    message: 'Đóng sản phẩm thất bại!!!',
                    title: 'Thất bại',
                    position: 'top-right',
                })
                return false;
            }
            else{

                this.$confirm(`Bạn có chắc chắn muốn đóng gói sản phẩm này??`,'Thông báo',{
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'info'
                })
                .then(() => {
                    Axios.put("http://localhost:8080/apiDTfood/public/api/v1/orderManagement/{id}",{
                        update: "pack",
                        data: r
                    })
                    .then(res => {
                        if (res.data == "success") {
                            this.$notify({
                                type: 'success',
                                message: 'Đóng gói sản phẩm thành công!!!',
                                title: 'Thành công',
                                position: 'top-left',
                            })
                            location.reload();
                        }
                    })
                    .catch(err => console.log(err))
                })
                .catch(()=>{
                    this.$notify({
                        type: 'error',
                        message: 'Đóng sản phẩm thất bại!!!',
                        title: 'Thất bại',
                        position: 'top-right',
                    })
                })
            }
             
        },
        Show(id)
        {
            Axios.get(`http://localhost:8080/apiDTfood/public/api/v1/OrderDetail/${id}`)
            .then(res => this.tableDetail = res.data)
            .catch(err => console.log(err))
            }
        },
}
</script>

<style>

</style>