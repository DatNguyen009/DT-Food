<template>
<div class="home">
    <app-carousel />
    <div class="best__menu">
        <div class="best__title">
            <h3>Trending</h3>
            <h2>PHỔ BIẾN</h2>
        </div>
        <div class="best__content">
            <div class="row best__item">
                <div class="col-12 col-lg-6" v-for="(item, index) in this.$store.state.trendingFood" :key="index" style="padding-bottom: 2rem;">
                    <router-link :to="{name: 'Detail', params:{product_slug: item.product_slug}}">
                        <div class="row">
                            <div class="col-2" v-for="(itemA, index) in item.product_image" :key="'B'+index">
                                <el-image :src="itemA.images_url" :alt="item.product_name" lazy></el-image>
                            </div>
                            <div class="col-10">
                                <div class="best__text">
                                    <div class="row">
                                        <div class="col-8">
                                            <h4>{{item.product_name}}</h4>

                                        </div>
                                        <div class="col-4">
                                            <h4>{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product_price)}}</h4>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-8">
                                            <p class="d-inline-block text-truncate" style="max-width: 280px;">
                                                {{item.product_description}}
                                            </p>
                                        </div>
                                        <div class="col-4">
                                            <div class="best__danhgia">
                                                <img src="../assets/star.png" alt="" />
                                                <img src="../assets/star.png" alt="" />
                                                <img src="../assets/star.png" alt="" />
                                                <img src="../assets/star.png" alt="" />
                                                <img src="../assets/star.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>

            </div>

        </div>
    </div>
    <div class="our__news">
        <div class="news__title">
            <h3>News</h3>
            <h2>MÓN MỚI</h2>
        </div>
        <div class="news__content">
            <div class="row">
                <div class="col-6">
                    <img src="../assets/canh ga la giang.jpg" alt="canh ga la giang" />
                </div>
                <div class="col-6">
                    <div class="news__text">
                        <h4>MỚI</h4>
                        <h3>CANH GÀ LÁ GIANG</h3>
                        <h6>THÁNG 5</h6>
                        <p>
                            Canh gà lá giang là một trong những món canh phổ biến được nhiều người ưa thích. Vị chua thanh của lá giang, béo của thịt gà giúp món canh đưa cơm liên tục.
                        </p>
                        <a href="http://localhost:3000/detail/canh-ga-la-giang">CHI TIẾT</a>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-6">
                    <div class="news__text">
                        <h4>MỚI</h4>
                        <h3>BÁNH CANH CÁ LÓC</h3>
                        <h6>THÁNG 6</h6>
                        <p>
                            Bánh canh là một món ăn Việt Nam. Bánh canh bao gồm nước dùng được nấu từ tôm, cá và giò heo thêm gia vị tùy theo từng loại bánh canh.
                        </p>
                        <a href="http://localhost:3000/detail/banh-canh-ca-loc">CHI TIẾT</a>
                    </div>
                </div>
                <div class="col-6">
                    <img src="../assets/banh canh ca loc.jpg" alt="" />
                </div>
            </div>
        </div>
    </div>

    <div class="our__product">
        <div class="product__title">
            <h3>Products</h3>
            <h2>SẢN PHẨM</h2>
        </div>
        <div class="product__content">
            <div class="row">
                <div class="col-4" v-for="(item, index) in this.$store.state.product" :key="index">
                    <div class="product__item">

                        <el-image v-for="(itemA, index) in item.product_image" :key="'A' + index" :src="itemA.images_url" alt="" lazy>

                        </el-image>
                        <div class="product__overplay"></div>
                        <div class="product__cost">
                            <p>{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product_price)}}</p>
                        </div>
                        <div class="product__name">
                            <p>{{ item.product_name }}</p>
                        </div>
                        <div class="product__detail">
                            <router-link :to="{name: 'Order', params:{product_slug: item.product_slug}}">ĐẶT NGAY</router-link>
                            <router-link :to="{name: 'Detail', params:{product_slug: item.product_slug}}">CHI TIẾT</router-link>
                            <a class="item1" @click="addCart(item.product_slug, item.product_price)">THÊM VÀO GIỎ HÀNG</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="about__icon">
        <div class="icon__content container">
            <div class="icon__item">
                <img src="../assets/icon-1.png" alt="" />
                <h5>Ngon miệng</h5>
            </div>
            <div class="icon__item">
                <img src="../assets/icon-2.png" alt="" />
                <h5>Tốt cho sức khỏe</h5>
            </div>
            <div class="icon__item">
                <img src="../assets/icon-3.png" alt="" />
                <h5>Giá cả hợp lý</h5>
            </div>
            <div class="icon__item">
                <img src="../assets/icon-4.png" alt="" />
                <h5>Chất lượng</h5>
            </div>
        </div>
    </div>
    <app-backTop />
</div>
</template>

<script>
// @ is an alias to /src
import Axios from 'axios'
import Vue from 'vue'
import ElementUI from 'element-ui'
import Carousel from "@/components/Carousel.vue";
import backTop from '@/components/backTop.vue';
Vue.use(ElementUI)

export default {
    name: "Home",
    data() {
        return {};
    },
    created() {
        this.$store.dispatch("product", {
            url: "http://localhost:8080/apiDTfood/public/api/v1/products",
            url_trendFood: "http://localhost:8080/apiDTfood/public/api/v1/trendingFood"
        });
    },
    methods: {
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
    components: {
        "app-carousel": Carousel,
        "app-backTop": backTop
    },
};
</script>

<style lang="scss">
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");

.news__title {
    text-align: center;
    margin: 50px 0;
}

.news__title h3 {
    color: #eeeeee;
    font-size: 60px;
    font-weight: lighter;
    line-height: 25px;
}

.news__title h2 {
    color: black;
    font-size: 50px;
    line-height: 50px;
    letter-spacing: 2px;
    font-weight: lighter;
}

.news__content .row {
    width: 100%;
}

.news__content img {
    width: 500px;

}

.news__text h4 {
    color: #db7137;
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 2px;
}

.news__text h3 {
    color: #2d2d2d;
    font-weight: 300;
    letter-spacing: 3px;
    font-size: 34px;
}

.news__text h6 {
    color: #7e7e7e;
    letter-spacing: 4px;
    font-weight: 400;
    padding: 16px 0;
}

.news__text p {
    color: #7e7e7e;
    letter-spacing: 2px;
    font-weight: 400;
}

.news__text p {
    padding-bottom: 20px;
}

.news__text {
    padding-top: 80px;
    padding-left: 40px;
}

.news__content {
    padding: 0 90px;
}

.news__content .row {
    padding-bottom: 30px;
}

/* BEST MENU  */

.best__menu {
    margin-top: 40px;
    color: #2d2d2d;
}

.best__title {
    text-align: center;
}

.best__title h3,
.product__title h3 {
    color: #eeeeee;
    font-size: 60px;
    font-weight: lighter;
    line-height: 25px;
}

.best__title h2 {
    color: black;
    font-size: 50px;
    line-height: 16px;
    letter-spacing: 10px;
    font-weight: lighter;
}

.best__content .row {
    width: 100%;
}

.best__content img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
}

.best__text h4 {
    color: #2d2d2d;
    font-size: 17px;
    line-height: 17px;
    font-weight: 400;
    letter-spacing: 2px;
}

.best__text p {
    color: #7e7e7e;
    font-size: 14px;
    line-height: 27px;
    letter-spacing: 2px;
}

.best__danhgia img {
    width: 11px;
    height: 11px;
    display: inline-block;
}

.best__text .col-4 h4 {
    float: right;
}

.best__text {
    padding-top: 18px;
    padding-left: 30px;
}

.best__danhgia {
    float: right;
}

.best__item {
    padding-bottom: 20px;
}

.best__content .row .col-6,
.best__content .row .col-8,
.best__content .row .col-4 {
    padding: 0;
    margin: 0;
}

.best__content {
    padding-top: 60px;
    padding-left: 74px;
}

.best__content {
    background-color: #fafafa;
}

.best__content a {
    text-decoration: none;
}

/* OUR PRODUCT  */

.our__product {
    margin-top: 50px;
}

.product__title {
    text-align: center;
}

.product__title h2 {
    color: black;
    font-size: 50px;
    line-height: 16px;
    letter-spacing: 2px;
    font-weight: lighter;
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
    width: 350px;
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
    grid-template-columns: repeat(2,1fr);

}

.item1{
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

//our icon
.icon__content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    color: #7e7e7e;
    padding: 60px 0;
}

.icon__item {
    text-align: center;
}

.icon__item img {
    width: 70px;
    height: 70px;
}

.icon__item h5 {
    margin-top: 10px;
    letter-spacing: 2px;
    font-weight: normal;
}
</style>
