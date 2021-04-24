<template>
    <main>
    <div class="container-fluid">
      <h1 class="mt-4">Quản lý thư mục đã xóa</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>

      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-table mr-1"><p>Danh sách món ăn đã xóa </p></i> 
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
                  <th>Tên slug</th>
                  <th>Giá tiền</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>

              <tbody v-if="DataRestore.length != 0">
                <tr style="font-size: 12px" v-for="(item, index) in DataRestore"
                :key="'a' + index" :class="'customtable'+index">
                  <td style="width: 2%;">{{index+1}} </td>
                  <td style="width: 15%;">{{ item.product_name }}</td>
                  <td style="width: 15%;">{{ item.product_slug }}</td>
                  <td style="width: 10%;">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product_price) }}</td>
                 
                  <td style="width: 20%;">
                        <el-button type="success" @click="SureRestore(item.product_slug)">Khôi phục</el-button>
                        <el-button type="danger">Delete</el-button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <td class="text-center" colspan="5">Không có món ăn cần restore!!</td>
              </tbody>
            </table>
            <!-- <el-pagination class="d-flex justify-content-center" background layout="prev, pager, next" :total="parseInt(totalPages)" @current-change="handleCurrentChange" style="margin: 5rem;"></el-pagination> -->

          </div>
        </div>
        
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import Axios from 'axios'
Vue.use(ElementUI)

export default {
    data() {
        return {
          
            DataRestore: []
        }
    },
    created() {
        this.reStore();
    },
   
    methods: {
        
        reStore(){
          Axios.get('http://localhost:8080/apiDTfood/public/api/v1/softDeleted')
          .then(res => {
              this.DataRestore = res.data;
          })
          .catch(err => console.log(err))
        },
        SureRestore(slug){
            Axios.put('http://localhost:8080/apiDTfood/public/api/v1/softDeleted/{id}',{
                product_slug: slug
            })
            .then(() => {
                this.reStore();
            })
          .catch(err => console.log(err))
        }
          
    },
  
    components:{
        // 'app-left-nav': LeftNav,

    }
}
</script>

<style lang="scss">
@import '../assets/css/style.css';
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");
.card-header{
    display: flex;
    justify-content: space-between;
    .fas.fa-table{
        display: flex;
        p{
            font-weight: 100;
            padding-left: 5px;
        }
    }
    .fas.fa-trash-restore{
        display: flex;
        justify-content: flex-end;
        p{
            font-weight: 100;
            padding-left: 5px;  
        }
        cursor: pointer;
    }
}
.optionBtn{
  width: 100%;
}
.el-button.optionBtn +.el-button.optionBtn{
  margin-left: 0!important;
  margin-top: 10px;
}
.customtable0{
  background: oldlace;
}
.customtable2{
  background: #f0f9eb;
}
</style>