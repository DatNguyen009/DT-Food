<template>
  <main>
    <div class="container-fluid">
      <h1 class="mt-4">Lịch sử giá nguyên liệu hằng ngày</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>

        <div class="card-body">
          <div class="table-responsive">
            <p>Chọn ngày xem nguyên vật liệu</p>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="Chọn ngày xem"
              @change="pickDay()"
              ref="day"
              style="margin-bottom: 10px;"
              >
              
            </el-date-picker>

            <el-table
                :data="this.$store.state.getNcc"
                border
                show-summary
                sum-text="Tổng tiền"
                :summary-method="getSummaries"
                style="width: 100%">
                <el-table-column
                label="STT"
                width="80">
                  <template slot-scope="scope">
                    <p>{{scope.$index}}</p>
                  </template>
                </el-table-column>
                <el-table-column
                prop="materials_name"
                label="Tên nguyên liệu"
                width="auto"
                >
                </el-table-column>
                <el-table-column
                prop="materials_amount"
                label="Số lượng"
                width="auto"
                >
                </el-table-column>
                <el-table-column
                prop="materials_unit"
                label="Đơn vị tính"
                width="auto"
                >
                </el-table-column>
                 <el-table-column
                prop="materials_price"
                label="Đơn giá"
                width="auto"
                >
                   <template slot-scope="scope">
                        <p v-for="(item, index) in scope.row.materials_price" :key="index">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format( item.materials_price)}}</p>
                    </template>
                </el-table-column>
                 <el-table-column
                prop="materials_total"
                label="Thành tiền"
                width="auto"
                >
                   <template slot-scope="scope">
                        <p>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format( scope.row.materials_total)}}</p>
                    </template>
                </el-table-column>
                 <el-table-column
                prop="NCC_dateCreated"
                label="Ngày tạo"
                width="auto"
                >
                   <template slot-scope="scope">
                        <p>{{scope.row.NCC_dateCreated.slice(0,10)}}</p>
                    </template>
                </el-table-column>
                
            </el-table>
          </div>
        </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import elementLocale  from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI ,{locale: elementLocale});

export default {
    data() {
      return {
        value1: ''
        
      }
    },
    created() {
        // this.$store.dispatch("getNcc", {
        //     url: "http://localhost:8080/apiDTfood/public/api/v1/setPriceNcc",
        // });

       
    },
    methods: {
      pickDay(){
       
        this.$store.dispatch("getNccTimeSub", {

            url: "http://localhost:8080/apiDTfood/public/api/v1/historyPriceTimeSub/"+ this.$refs.day.displayValue,
        });
      },
      getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    return sums[index] = 'Tổng tiền';
                }
                if (index === 2) {
                    return sums[index] = '';
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    var total = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                        
                    }, 0);
                    this.TotalRevenue = total;
                    sums[index] = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
                } 
               
            });
                return sums;
            }
    },

    
    
}
</script>

<style lang="scss">
@import '../../assets/css/style.css';
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");
</style>