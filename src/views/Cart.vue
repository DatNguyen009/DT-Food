<template>
<div class="shop">
    <div class="about__header">
        <div class="header__overplay"></div>
        <h1>Giỏ hàng</h1>
    </div>
    <div class="container-fluid">
        <el-table ref="multipleTable" :data="tableData" style="width: 100%; display: grid; justify-content: center" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column property="product_image[0].images_url" label="Ảnh" width="240">
                <template slot-scope="scope">
                    <img style="width: 50%;" :src="scope.row.product_image[0].images_url" />
                </template>
            </el-table-column>
            <el-table-column property="product_info[0].product_name" label="Tên món ăn" width="240">
            </el-table-column>
            <el-table-column property="product_amount" label="Số lượng" width="200">
            </el-table-column>
            <el-table-column property="product_totalPrice" label="Tổng tiền" width="200">
                <template slot-scope="scope">
                    <p>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format( scope.row.product_totalPrice)}}</p>
                </template>
            </el-table-column>
            <el-table-column label="Tùy chọn" width="240">
                <template slot-scope="scope">
                    <el-button type="danger" @click.native.prevent="Delete(scope.$index, tableData)">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <h3 style="color: black;    text-align: end;">Tổng tiền: {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.$store.getters.getTotalPrice)}}</h3> -->
        <el-button type="primary" @click="SubmitCart()" style="display: grid;margin: 2rem auto;">Đặt hàng</el-button>
    </div>
</div>
</template>

<script>
import Axios from 'axios'
import ElementUI from "element-ui";
import Vue from "vue";
Vue.use(ElementUI);

export default {
    data() {
        return {
            tableData: [],
            multipleSelection: [],
        };
    },
    mounted() {
        if (this.$store.state.statusLogin != "Login") {
            this.$router.push({
                path: "/login"
            });
        }
        this.$store.dispatch("getCart", {
            url: `http://localhost:8080/apiDTfood/public/api/v1/cart/${this.$store.state.customers_email}`,
        });

    },

    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        SubmitCart() {
            if (this.multipleSelection.length == 0) {
                this.$notify({
                    type: 'error',
                    title: "Thông báo",
                    message: "Vui lòng chọn sản phẩm muốn mua trong giỏ hàng!!",
                    position: 'top-right'
                })
            } else {
                this.$store.dispatch("multipleSelection", {
                    data: this.multipleSelection
                });
                this.$router.push({
                    path: '/orderAll'
                })
            }
        },
        Delete(index, array) {
            Axios.delete('http://localhost:8080/apiDTfood/public/api/v1/cart/' + array[index].product_id + "_" + array[index].customers_id)
                .then(res => {
                    if (res.data == "success") {
                        this.$notify({
                            type: 'success',
                            title: 'Thành công',
                            message: 'Xóa sản phẩm thành công!!',
                            position: 'top-left'
                        })
                        this.$store.dispatch("getCart", {
                            url: `http://localhost:8080/apiDTfood/public/api/v1/cart/${this.$store.state.customers_email}`,
                        });
                    }
                })
                .catch(() => {
                    this.$notify({
                        type: 'error',
                        title: 'Thất bại',
                        message: 'Xóa sản phẩm thất bại!!',
                        position: 'top-right'
                    })
                })
        }
    },
    watch: {
        "$store.state.getCart": function () {
            this.tableData = this.$store.state.getCart;
        },
    },
};
</script>

<style lang="scss">
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");

.about__header {
    background-image: url("../assets/backgound-about.jpg");
    width: 100%;
    height: 330px;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.header__overplay {
    background: linear-gradient(to bottom,
            rgba(45, 45, 45, 0.4) 0%,
            rgba(45, 45, 45, 0.9) 100%);
    width: 100%;
    height: 100%;
}

.about__header h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    font-size: 100px;
    font-weight: lighter;
    letter-spacing: 5px;
}

.cart__item {
    display: flex;
    justify-content: space-around;
}

.cart__infor p {
    color: black;
}

.cart__image {
    width: 8%;
}

.el-checkbox__label {
    display: flex;

    padding-left: 1rem;
}

button.el-button.el-button--primary {
    display: grid;
    margin: 2rem auto;

}
</style>
