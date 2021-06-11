<template>
<div class="shop">
    <div class="about__header">
        <div class="header__overplay"></div>
        <h1>Tìm kiếm</h1>
    </div>
    <div class="our__product">
        <div class="product__title"></div>
        <div class="product__content">
            <div class="row">
                <div class="NoResult" v-if="this.$store.state.resultSearch.message">
                    <p class="text-danger">{{ this.$store.state.resultSearch.message }}</p>
                </div>
                <div class="col-4" v-for="(item, index) in this.$store.state.resultSearch" :key="index" v-else>
                    <div class="product__item mb-3">
                        <el-image v-for="(itemA, index) in item.product_image" :key="'A' + index" :src="itemA.images_url" alt="" lazy>

                        </el-image>
                        <div class="product__overplay"></div>
                        <div class="product__cost">
                            <p>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product_price) }}</p>
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
</div>
</template>

<script>
export default {
    data() {
        return {
            resultSearch: [],
        };
    },
    created() {
        this.search();
    },
    methods: {
        search() {
            this.$store.dispatch("search", {
                url: "http://localhost:8080/apiDTfood/public/api/v1/products",
                key: this.$route.query.q
            });
        }

    },
    watch: {
        "$route.query.q": function () {
            this.search();
        }
    },

};
</script>

<style lang="scss">
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
    grid-template-columns: repeat(2, 1fr);
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

.item1 {
    grid-column: 1 / 3;
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
