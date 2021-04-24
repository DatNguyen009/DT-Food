<template>
  <main>
    <div class="container-fluid">
      <h1 class="mt-4">Lịch sử giá nguyên liệu hằng ngày</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>

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
                  <th>Tên nguyên liệu</th>
                  <th>Số lượng</th>
                  <th>Đơn vị tính</th>
                  <th>Giá tiền</th>
                  <th>Ngày tạo</th>
                </tr>
              </thead>

              <tbody>
                <tr style="font-size: 12px" v-for="(item, index) in this.$store.state.getNcc"
                :key="'a' + index" :class="'customtable'+index">
                  <td style="width: 3%;">{{index+1}} </td>
                  <td style="width: 15%;">{{ item.materials_name }}</td>
                  <td style="width: 15%;">{{ item.materials_amount }}</td>
                  <td style="width: 10%;">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.materials_price) }}</td>
                  <td  style="width: 30%;">{{ item.NCC_dateCreated.slice(0,10) }}</td>
                 
                </tr>
              </tbody>
              <tbody v-if="this.$store.state.getNcc.length == 0">
                <td class="text-center" colspan="8">Không có lịch sử giá ngày hôm nay!!</td>
              </tbody>
            </table>

          </div>
        </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
//import Axios from 'axios'
Vue.use(ElementUI)

export default {
    created() {
        this.$store.dispatch("getNcc", {
            url: "http://localhost:8080/apiDTfood/public/api/v1/setPriceNcc",
        });
    },
}
</script>

<style lang="scss">
@import '../../assets/css/style.css';
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");
</style>