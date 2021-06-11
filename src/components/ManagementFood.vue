<template>
    <main>
    <div class="container-fluid">
      <h1 class="mt-4">Quản lý món ăn</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>

      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-table mr-1"><p>Danh sách món ăn</p></i> 
          <i class="fas fa-trash-restore" slot="reference" > <router-link to="/admin/softDeleted"> <p>Khôi phục</p></router-link></i>
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
                  <th>Mô tả</th>
                  <th>Ngày tạo</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>

              <tbody>
                <tr style="font-size: 12px" v-for="(item, index) in ListProduct.data"
                :key="'a' + index" :class="'customtable'+index">
                  <td style="width: 3%;">{{index+1}} </td>
                  <td style="width: 15%;">{{ item.product_name }}</td>
                  <td style="width: 15%;">{{ item.product_slug }}</td>
                  <td style="width: 10%;">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product_price) }}</td>
                  <td  style="width: 30%;">{{ item.product_description }}</td>
                  <td style="width: 10%;">{{ item.created_at.slice(0,10) }}</td>
                  <td style="width: 10%;">
                    <el-popover placement="left-start" width="auto" trigger="click" style="over">
                      <el-table :data="$store.state.productDetail[0].product_material">
                        <el-table-column width="250" property="materials_name" label="Tên nguyên liệu"></el-table-column>
                        <el-table-column width="200" property="materials_slug" label="Slug"></el-table-column>
                        <el-table-column width="200" property="materials_image" label="Ảnh">
                          <template slot-scope="scope">
                            <img style="width: 30%;" :src="scope.row.materials_image"/>
                          </template>
                        </el-table-column>
                        <el-table-column width="350" property="materials_amount" label="Số lượng"></el-table-column>
                        <el-table-column width="100" property="materials_unit" label="Đơn vị tính"></el-table-column>
                      </el-table>
                      <el-button slot="reference" class="optionBtn" type="primary" @click="detailProduct(item.product_slug)">Chi tiết</el-button>
                    </el-popover>
                      <router-link  to="/admin/managerChangeFood"><el-button class="optionBtn" type="warning" style="margin-bottom:10px;">Sửa</el-button></router-link>
                      <el-button class="optionBtn" type="danger" @click="DeleteProduct(item.product_slug)">Xóa</el-button>
                  </td>
                </tr>
              </tbody>
             
            </table>
            <el-pagination class="d-flex justify-content-center" background layout="prev, pager, next" :total="parseInt(totalPages)" @current-change="handleCurrentChange" style="margin: 5rem;"></el-pagination>

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
            ListProduct: [],
            totalPages: 0,
            DataRestore: [],
            gridData: [{
              date: '2016-05-02',
              name: 'Jack',
              address: 'New York City'
            }]
        }
    },
    props:{
        a:{
            type: String
        }
    },
    created() {
        this.getListProduct();
        if (this.a != "qtv") {
            this.$router.push({ path: "/admin" });
        }
    },
   
    methods: {
        getListProduct(){
          Axios.get("http://localhost:8080/apiDTfood/public/api/v1/productspaginate")
            .then(res => {
                this.ListProduct = res.data;
                this.totalPages = `${this.ListProduct.last_page}0`;
            })
            .catch(err => {
                console.log(err);
            })
        },
        handleCurrentChange(val){
            Axios.get(`http://localhost:8080/apiDTfood/public/api/v1/productspaginate?page=${val}`)
            .then(res => {
                this.ListProduct = res.data;
            })
            .catch(err => console.log(err))
        },
        DeleteProduct(slug)
        {

          this.$confirm('Bạn có chắc muôn xóa sản phẩm này?', 'Thông báo', {
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            type: 'warning'
          })
          .then(()=>{
          Axios.delete('http://localhost:8080/apiDTfood/public/api/v1/productspaginate/' + slug)
            .then(res => {
              if (res.data == "success") {
                this.$notify({
                  title: 'Thành công',
                  message: 'Xóa sản phẩm thành công!!!',
                  type: 'success',
                  position: 'top-left'
                })
                this.getListProduct();
              } else {
                this.$notify({
                  title: 'Thất bại',
                  message: 'Xóa sản phẩm thất bại!!!',
                  type: 'error',
                  position: 'top-right'
                })
              }
            })
            .catch(() => {
              this.$notify({
                  title: 'Thất bại',
                  message: 'Xóa sản phẩm thất bại!!!',
                  type: 'error',
                  position: 'top-right'
                })
            })
          })
          
        },
        reStore(){
          Axios.get('http://localhost:8080/apiDTfood/public/api/v1/softDeleted')
          .then(res => {
              this.DataRestore = res.data;
          })
          .catch(err => console.log(err))
        },
        detailProduct(slug)
        {
          this.$store.dispatch("productDetail",{
            product_slug: slug,
            url: "http://localhost:8080/apiDTfood/public/api/v1/productDetail/"
          })
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
button.el-button.optionBtn.el-button--primary.el-popover__reference {
    margin-bottom: 10px;
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