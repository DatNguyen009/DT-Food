<template>
<div class="shop">
    <div class="about__header">
        <div class="header__overplay"></div>
        <h1>Thực đơn</h1>
    </div>
    <div class="our__product">
        <div class="product__title">
            <h3>Thực đơn</h3>
            <h2>ĐẶT NGAY</h2>
        </div>
        <div class="product__content">
            <div class="row">
                <div class="col-4" v-for="(item, index) in ListProduct.data" :key="index">
                    <div class="product__item">

                        <el-image v-for="(itemA, index) in item.product_image" :key="'A' + index" :src="itemA.images_url" alt="" lazy>

                        </el-image>
                        <div class="product__overplay"></div>
                        <div class="product__cost">
                            <p>{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product_price) }}</p>
                        </div>
                        <div class="product__name">
                            <p>{{ item.product_name }}</p>
                        </div>
                        <div class="product__detail">
                            <router-link :to="{name: 'Order', params:{product_slug: item.product_slug}}">ĐẶT NGAY</router-link>
                            <router-link :to="{name: 'Detail', params:{product_slug: item.product_slug}}">CHI TIẾT</router-link>
                            <a class="item1" @click="addCart(item.product_slug, item.product_price)" >THÊM VÀO GIỎ HÀNG</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-pagination class="d-flex justify-content-center" background layout="prev, pager, next" :total="parseInt(totalPages)" @current-change="handleCurrentChange" style="margin: 5rem;"></el-pagination>
</div>
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
            totalPages: 0
        };

    },
    created() {
        Axios.get("http://localhost:8080/apiDTfood/public/api/v1/productspaginate")
            .then(res => {
                this.ListProduct = res.data;
                this.totalPages = `${this.ListProduct.last_page}0`;
            })
            .catch(err => {
                console.log(err);
            })
    },
    methods: {
        handleCurrentChange(val) {
            Axios.get(`http://localhost:8080/apiDTfood/public/api/v1/productspaginate?page=${val}`)
                .then(res => {
                    this.ListProduct = res.data;
                })
                .catch(err => console.log(err))
        },
        addCart(slug, price) {
           
            if (this.$store.state.statusLogin != "Login") {
                this.$router.push({
                    path: '/login'
                });
            } else {
                Axios.post('http://localhost:8080/apiDTfood/public/api/v1/cart', {
                        product_id: slug,
                        customers_id: this.$store.state.customers_email,
                        product_amount: 1,
                        product_totalPrice: parseInt(price) * 1
                    })
                    .then(res => {
                        if (res.data == "success") {
                            this.$notify({
                                type: 'success',
                                message: 'Thêm sản phẩm vào giỏ hàng thành công!!!',
                                title: 'Thành công',
                                position: 'top-right',
                            })
                        } else {
                            this.$notify({
                                type: 'success',
                                message: 'Thêm sản phẩm vào giỏ hàng thành công!!!',
                                title: 'Thành công',
                                position: 'top-right',
                            })
                        }

                    })
                    .catch(() => {
                        this.$notify({
                            type: 'error',
                            message: 'Thêm sản phẩm vào giỏ hàng thất bại!!!',
                            title: 'Thất bại',
                            position: 'top-right',
                        })
                    })

            }
        }
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

.product__content {
    padding-left: 90px;
    padding-right: 70px;
    padding-top: 40px;
}

.product__content .row {
    width: 100%;
}

.product__item {
    position: relative;
    margin-bottom: 3rem;
}

.product__item img {
    width: 350PX;
    height: 350px;
    border-radius: 10px;
}

.product__overplay {
    position: absolute;
    width: 350px;
    height: 350px;
    left: 0;
    top: 0;
    z-index: 2;
    background: linear-gradient(to bottom,
            rgba(45, 45, 45, 0.15) 0%,
            rgba(45, 45, 45, 0.5) 75%,
            rgba(45, 45, 45, 1) 100%);
    opacity: 0;
    transition: all 1s;
    border-radius: 10px;
}

.product__cost p {
    font-size: 16px;
    position: absolute;
    padding: 5px 12px;
    top: 30px;
    right: 30px;
    background-color: #db7137;
    border-radius: 3px;
    color: white;
    z-index: 3;
    letter-spacing: 2px;
    opacity: 1;
    transition: all 1s;
}

.product__name {
    text-align: center;
    color: white;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 3;
    font-size: 20px;
    letter-spacing: 2px;
    opacity: 1;
    transition: all 1s;
}

.product__detail {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    width: 300px;
    z-index: 6;
    transition: all 1s;
    opacity: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.item1 {
    grid-column: 1 / 3;
}

.product__detail a {
    text-decoration: none;
    background-color: rgb(219, 113, 55);
    color: white;
    padding: 10px 10px;
    margin: 4px;
    font-size: 11px;
    line-height: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    border-radius: 4px;
    transition: all 0.5s;
    z-index: 6;
    cursor: pointer;
}

.product__detail a:hover {
    background-color: rgb(45, 45, 45);
    color: #00cdce;
}

.product__detail a:hover {
    background-color: rgb(45, 45, 45);
    color: #00cdce;
}

.product__item:hover .product__detail {
    opacity: 1;
}

.product__item:hover .product__overplay {
    opacity: 1;
}

.product__content .row {
    padding-bottom: 30px;
}
</style>
