<template>
<main>
    <div class="container-fluid">
        <h1 class="mt-4">Nhà bếp</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">Dashboard</li>
        </ol>

        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table mr-1" v-if="date < dateNow1">Danh sách nguyên liệu cần cung cấp cho ngày {{date.slice(0,10)}}</i>
                <i class="fas fa-table mr-1" v-else>Danh sách nguyên liệu cần cung cấp cho ngày {{dateTomorrow.slice(0,10)}}</i>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <el-tabs type="card">
                        <el-tab-pane label="Thực đơn ngày hôm nay">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr style="font-size: 14px">
                                        <th>STT</th>
                                        <th>Tên món ăn</th>
                                        <th>Số lượng</th>
                                        <th>Ngày chế biến</th>
                                        <th>Tùy chọn</th>
                                    </tr>
                                </thead>

                                <tbody v-if="!this.$store.state.dataKitchen.message">
                                    <tr style="font-size: 12px" v-for="(item, index) in this.$store.state.dataKitchen" :key="'a' + index">
                                        <td>{{index+1}} </td>
                                        <td v-for="(itemA, index) in item.product_name" :key="'A'+index">{{ itemA.product_name }}</td>
                                        <td style="max-width: 140px">{{ item.orderDetail_amount }}</td>

                                        <td v-for="(itemA, index) in item.order_dateReceived" :key="'B'+index">{{ itemA.order_dateReceived }}</td>
                                        <td>
                                            <el-popover placement="right" width="auto" trigger="click">
                                                <el-table :data="item.order_materials">
                                                    <el-table-column width="350" property="materials_name" label="Tên nguyên liệu"></el-table-column>
                                                    <el-table-column width="200" property="materials_amount" label="Số lượng"></el-table-column>
                                                    <el-table-column width="100" property="materials_unit" label="Đơn vị tính"></el-table-column>
                                                </el-table>
                                                <el-button slot="reference">Chi tiết món ăn</el-button>
                                            </el-popover>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <td class="text-center" colspan="6">{{this.$store.state.dataKitchen.message}}</td>
                                </tbody>
                            </table>
                        </el-tab-pane>
                        <el-tab-pane label="Lịch sử món ăn đã chế biến">
                            <p>Chọn ngày xem món ăn</p>
                            <el-date-picker v-model="value1" type="date" placeholder="Chọn ngày xem" @change="pickDay()" ref="day" style="margin-bottom: 10px;">

                            </el-date-picker>

                            <el-table :data="this.$store.state.getNcc" border style="width: 100%">
                                <el-table-column label="STT" width="80">
                                    <template slot-scope="scope">
                                        <p>{{scope.$index}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="product_name" label="Tên món ăn" width="auto">
                                    <template slot-scope="scope">
                                        <p v-for="(item, index) in scope.row.product_name" :key="'D'+index">{{item.product_name}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="orderDetail_amount" label="Số lượng" width="auto">
                                </el-table-column>
                                <el-table-column prop="order_dateReceived" label="Ngày chế biến" width="auto">
                                    <template slot-scope="scope">
                                        <p v-for="(item, index) in scope.row.order_dateReceived" :key="'D'+index">{{item.order_dateReceived}}</p>
                                    </template>
                                </el-table-column>

                            </el-table>
                        </el-tab-pane>

                        <el-tab-pane label="Lịch sử nguyên liệu đã chế biến">

                            <p>Chọn ngày xem lịch sử nguyên liệu</p>
                            <el-date-picker v-model="value2" type="date" placeholder="Chọn ngày xem" @change="pickHistoryDay()" ref="day1" style="margin-bottom: 10px;">

                            </el-date-picker>

                            <el-table :data="this.$store.state.getHistoryMaterial" border style="width: 100%">
                                <el-table-column label="STT" width="80">
                                    <template slot-scope="scope">
                                        <p>{{scope.$index+1}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="materials_name" label="Tên nguyên liệu" width="auto">
                                </el-table-column>
                                <el-table-column prop="materials_amount" label="Số lượng" width="auto">
                                </el-table-column>
                                <el-table-column prop="materials_unit" label="Đơn vị tính" width="auto">
                                </el-table-column>

                                <el-table-column prop="NCC_dateCreated" label="Ngày tạo" width="auto">
                                    <template slot-scope="scope">
                                        <p>{{scope.row.NCC_dateCreated.slice(0,10)}}</p>
                                    </template>
                                </el-table-column>

                            </el-table>
                        </el-tab-pane>
                    </el-tabs>

                </div>
            </div>

        </div>
    </div>
</main>
</template>

<script>
export default {
    data() {
        return {
            value1: "",
            value2: "",
            dateNow: "",
            date: "",
            dateNow1: '',
            dateTomorrow: ''
        }
    },
    created() {
        this.$store.dispatch("DataKitchen", {
            url: "http://localhost:8080/apiDTfood/public/api/v1/kitchen"
        });
        this.countdown();
    },

    methods: {
        pickDay() {

            this.$store.dispatch("getNccTimeSub", {
                url: "http://localhost:8080/apiDTfood/public/api/v1/kitchen/" + this.$refs.day.displayValue,
            });

        },
        pickHistoryDay() {
            this.$store.dispatch("getHistoryMaterial", {
                url: "http://localhost:8080/apiDTfood/public/api/v1/historyPriceTimeSub/" + this.$refs.day1.displayValue,
            });
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
}
</script>

<style>

</style>
