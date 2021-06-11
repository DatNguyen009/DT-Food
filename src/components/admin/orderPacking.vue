<template>
    <div class="orderPacking">
        <el-table
            :data="ListOrder"
            style="width: 100%">
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
                type="success"
                v-if=" scope.row.order_status == 'Đang giao hàng'"
                @click="handleSuccess(scope.$index, scope.row.order_id, scope.row.order_status)" style="width: 100%;">Giao</el-button>
                
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
                    <el-button  slot="reference" type="danger" @click="Show(scope.row.order_id)" style="width: 100%;margin: 10px 0;">Chi tiết đơn hàng</el-button>
                </el-popover>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination class="d-flex justify-content-center" background layout="prev, pager, next" :total="parseInt(totalPages)" @current-change="handleCurrentChange" style="margin: 5rem;"></el-pagination>

    </div>
    
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
            tableDetail: []
        }
    },
    created() {
        this.getListOrder();
    },
    methods: {
        getListOrder(){
            Axios.get('http://localhost:8080/apiDTfood/public/api/v1/orderManagement/orderPacking')
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
        Show(id)
        {
            Axios.get(`http://localhost:8080/apiDTfood/public/api/v1/OrderDetail/${id}`)
            .then(res => this.tableDetail = res.data)
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
    },
}
</script>

<style>

</style>