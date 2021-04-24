<template>
  <main>
    <div class="container-fluid">
      <h1 class="mt-4">Quản trị viên</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>

      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-table mr-1"></i> Thực đơn đặt món ngày mai
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr style="font-size: 14px">
                  <th>STT</th>
                  <th>Tên món ăn</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                  <th>Ngày nhận món</th>
                  <th>Khách hàng</th>
                </tr>
              </thead>

              <tbody v-if="!this.$store.state.dataKitchen.message">
                <tr style="font-size: 12px" v-for="(item, index) in this.$store.state.dataKitchen"
                :key="'a' + index">
                  <td>{{index+1}} </td>
                  <td v-for="(itemA, index) in item.product_name" :key="'A'+index">{{ itemA.product_name }}</td>
                  <td style="max-width: 140px">{{ item.order_amount }}</td>
                  <td>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format( item.order_totalMoney)}}</td>
                  <td>{{ item.order_dateReceived.slice(0,10) }}</td>
                  <td>{{item.customers_id}}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <td class="text-center" colspan="6">{{this.$store.state.dataKitchen.message}}</td>
              </tbody>
            </table>


            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr style="font-size: 14px">
                  <th>STT</th>
                  <th>Tên nguyên liệu</th>
                  <th>Khối lượng</th>
                  <th>ĐVT</th>
                  <th>Ngày nhận món</th>
                </tr>
              </thead>

              <tbody
                v-for="(item, index) in this.$store.state.getNB"
                :key="index"
              >
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
  created() {
    
    this.$store.dispatch("DataKitchen",{
      url: "http://localhost:8080/apiDTfood/public/api/v1/kitchen"
    });
    this.$store.dispatch("getNB", {
      url: "http://localhost:8080/apiDTfood/public/api/v1/NKNVL",
    });

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
              this.$cookie.set('sendDataSuccess', 'sendDataSuccess', { expires: '1D' });
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
  },
};
</script>

<style>
</style>