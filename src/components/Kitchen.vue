<template>
  <main>
    <div class="container-fluid">
      <h1 class="mt-4">Nhà bếp</h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>

      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-table mr-1"></i> Danh sách món ăn cho ngày mai
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
                  <th>Tùy chọn</th>
                </tr>
              </thead>

              <tbody v-if="!this.$store.state.dataKitchen.message">
                <tr style="font-size: 12px" v-for="(item, index) in this.$store.state.dataKitchen"
                :key="'a' + index">
                  <td>{{index+1}} </td>
                  <td v-for="(itemA, index) in item.product_name" :key="'A'+index">{{ itemA.product_name }}</td>
                  <td style="max-width: 140px">{{ item.order_amount }}</td>
                  <td>{{ item.order_totalMoney }}</td>
                  <td>{{ item.order_dateCreated }}</td>
                  <td>
                    <el-popover
                    placement="right"
                    width="auto"
                    trigger="click" >
                    <el-table :data="$store.state.detailKitchenData[0].order_materials">
                      <el-table-column width="350" property="materials_name" label="Tên nguyên liệu"></el-table-column>
                      <el-table-column width="200" property="materials_amount" label="Số lượng"></el-table-column>
                      <el-table-column width="100" property="materials_unit" label="Đơn vị tính"></el-table-column>
                    </el-table>
                    <el-button @click="test(`${item.product_id}`,`${item.customers_id}`)" slot="reference">Chi tiết món ăn</el-button>
                    </el-popover>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <td class="text-center" colspan="6">{{this.$store.state.dataKitchen.message}}</td>
              </tbody>
            </table>
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

    }
  },
  created() {
    this.$store.dispatch("DataKitchen",{
      url: "http://localhost:8080/apiDTfood/public/api/v1/kitchen"
    });
  },

  methods: {
    test(product_id, customers_id)
    {
      this.$store.dispatch("DetailKitchenData",{
        url: `http://localhost:8080/apiDTfood/public/api/v1/kitchen/${product_id}_${customers_id}`,
      })
    }
  },
}
</script>

<style>

</style>