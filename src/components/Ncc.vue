<template>
  <main>
    <div class="container-fluid">
      <h1 class="mt-4">Nhà cung cấp</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>

      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-table mr-1"></i> Danh sách món ăn cần nhập giá
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
                  <th>Đơn vị tính</th>
                  <th>Ngày đặt món</th>
                  <th>Giá</th>
                  <th>Nhập giá</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>

              <tbody
                v-for="(item, index) in this.$store.state.getNcc"
                :key="'a' + index"
              >
                <tr style="font-size: 12px">
                  <td>{{index+1}} </td>
                  <td>{{ item.materials_name }}</td>
                  <td style="max-width: 140px">{{ item.materials_amount }}</td>
                  <td>{{ item.materials_unit }}</td>
                  <td>{{ item.NCC_dateCreated.slice(0,10) }}</td>
                  <td>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.materials_price) }} </td>
                  <td><input class="form-control" type="number" :id="`price_${index+1}`" :value="`price_${index+1}`" placeholder="Nhập giá"></td>
                  <td> <el-button type="success" @click="SetPrice(`${item.NCC_dateCreated}`,`${item.materials_name}`,`${index+1}`)">Send</el-button> </td>
                </tr>
              </tbody>
              <tbody v-if="this.$store.state.getNcc.length == 0">
                <td class="text-center" colspan="8">Không có món ăn cần nhập giá ngày hôm nay!!</td>
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
    }
  },
  created() {
    this.$store.dispatch("getNcc", {
      url: "http://localhost:8080/apiDTfood/public/api/v1/setPriceNcc",
    });
  },
  methods: {
    SetPrice(day, name, index){
      let valuePrice = document.querySelector(`#price_${index}`).value;
      if (valuePrice == "") {
        this.$notify({
          title: 'Thông báo',
          message: 'Vui lòng nhập giá!!!',
          type: 'warning',
          position: 'top-right'
        })
      } else {
        Axios.put('http://localhost:8080/apiDTfood/public/api/v1/setPriceNcc/{id}',{
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
    }
  },
}
</script>

<style>

</style>