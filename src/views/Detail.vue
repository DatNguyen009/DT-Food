<template>
    <div class="detail">
        <div class="detail__header">
            <div class="header__overplay"></div>
            <h1>Sản phẩm</h1>
        </div>
        <div class="detail__content container">
        <div class="row" v-for="(item, index) in this.$store.state.productDetail" :key="index">
            <div class="col-6">
                <el-image :src="item.product_image[0].images_url" alt="" lazy></el-image>
            </div>
            <div class="col-6">
                <div class="detail__text" >
                    <h3>{{item.product_name}}</h3>
                    <h4>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product_price) }} </h4>
                    <div class="detail__star">
                        <el-rate v-model="value2" :colors="colors" score-template="{value} points"> </el-rate>
                    </div>
                    <p>{{item.product_description}}</p>
                    <el-input-number v-model="num" :min="1" :max="10"></el-input-number>
                    <div class="detail__button">
                        <a @click="addCart(`${product_slug}`, item.product_price)">Thêm vào giở hàng</a>
                        <router-link :to="{name: 'Order', params:{product_slug: item.product_slug}}">Đặt ngay </router-link>
                    </div>
                    
                    <div class="category" style="display: flex;">
                        <span>Thể loại : </span>
                        <p v-for="(itemA, index) in item.product_category" :key="'B'+index"> {{itemA.category_name}},</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="detail__review">
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab"
                    aria-controls="nav-home" aria-selected="true">Thành phần</a>
                <a class="nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab"
                    aria-controls="nav-profile" aria-selected="false">Đánh giá()</a>

            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <div class="review__text">
                    <div class="related__content" v-if="this.$store.state.productDetail.length != 0">
                        <div class="row" v-for="(item, index) in this.$store.state.productDetail" :key="'C'+ index">
                            <div class="material_error" v-if="item.product_material == 0">
                                <p>Không có nguyên liệu</p> 
                            </div>
                            <div class="col-3" v-for="(itemA, index) in item.product_material" :key="'D' + index" v-else>
                                <div class="related__item">
                                    <el-image :src="itemA.materials_image" :alt="itemA.materials_image" lazy></el-image>
                                    <h3>{{itemA.materials_name}}</h3>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <div class="review__text">

                    <div class="d-flex">  
                        <p>Your rating :</p>
                        <el-rate v-model="value1" style="padding-left:1rem;" :colors="colors"></el-rate>
                    </div> 
                  
                    <div class="review__form">
                        <form @submit.prevent="formSubmit">
                            <p>Message : </p>
                            <textarea v-model="message" cols="40" rows="2"></textarea>
                            <button type="submit">SUBMIT</button>
                        </form>
                    </div>
                </div>
                <div class="d-flex review__content" v-for="(item, index) in this.$store.state.reviews" :key="'B'+ index">
                   
                    <img src="../assets/avatar.png" alt="avatar" >
                    
                    <div class="user__comment">
                        <div class="user__comment--infor d-flex ">
                            <p style="font-weight: bold;">{{item.customers_id}}</p>
                            <p>{{item.review_dateCreated}}</p>
                        </div>
                        <el-rate v-model="item.review_star" :colors="colors" score-template="{value} points"> </el-rate>
                        <p>{{item.review_content}}</p> 
                      
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="related__product  ">
        <h2>Món ăn tương tự</h2>
        <div class="related__content">
            <div class="row">
                <div class="col-3" v-for="(item, index) in this.$store.getters.getRelatedFood" :key="index">
                    <div class="related__item">
                        <img :src="item.product_image[0].images_url" :alt="item.product_name">
                        <h3>{{item.product_name}}</h3>
                        <p>{{item.product_price}}</p>
                        <router-link :to="{name: 'Order', params:{product_slug: item.product_slug}}">Đặt ngay</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import Axios from 'axios'
import ElementUI from 'element-ui'
import Vue from 'vue'
Vue.use(ElementUI)
export default {
    data() {
        return {
            product_slug: this.$route.params.product_slug,
            value1: null,
            value2: 3.7,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'], 
            message: '',
            countSubmitReview: 0,
            num: 1,
        }
    },
    created() {
        this.$store.dispatch("product", {
            url: "http://localhost:8080/apiDTfood/public/api/v1/products",
            url_trendFood: "http://localhost:8080/apiDTfood/public/api/v1/trendingFood"
        });
        this.$store.dispatch("productDetail",{
            product_slug: this.product_slug,
            url: "http://localhost:8080/apiDTfood/public/api/v1/productDetail/"
        })
        this.$store.dispatch("RelatedFood",{
            product_slug: this.product_slug,
            url: "http://localhost:8080/apiDTfood/public/api/v1/relatedFood",
            
        })

        this.fetchReview();
       
    },
    
    methods: {
        formSubmit(event)
        {
            let date = new Date();
            let getdatenow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
            if (this.value1 == '' || this.message == '') {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: 'Bạn chưa đánh giá sao hoặc chưa bình luận?'
                })
            } else {
               
                Axios.post(`https://vue-dtfood-default-rtdb.firebaseio.com/data/${this.product_slug}.json`,{
                    product_id: this.product_slug,
                    customers_id: this.$store.state.customers_email,
                    review_star: this.value1,
                    review_content: this.message,
                    review_dateCreated: `${getdatenow} ${date.getHours()}:${date.getMinutes()}`
                })
                .then( res => {
                    if (res.status == 200) {
                        this.message ='';
                        this.$notify({
                            type: 'success',
                            message: 'Đánh giá thành công!!!',
                            title: 'Thành công',
                            position: 'bottom-left',
                        })
                        event.target.reset();
                    } 
                })
                .catch(() => {
                    this.$notify({
                        type: 'error',
                        message: 'Đánh giá thất bại!!!',
                        title: 'Thất bại',
                        position: 'bottom-left',
                    })
                })
               
                this.fetchReview();
               
            }
        },
        fetchReview()
        {
            this.$store.dispatch("getReviews",{
                url: `https://vue-dtfood-default-rtdb.firebaseio.com/data/${this.product_slug}.json`
            })
        },
        addCart(slug, price)
        {
            
            if (this.$store.state.statusLogin != "Login") {
                this.$router.push({path: '/login'});
            } else {
                Axios.post('http://localhost:8080/apiDTfood/public/api/v1/cart',{
                    product_id: slug,
                    customers_id: this.$store.state.customers_email,
                    product_amount: this.num,
                    product_totalPrice: parseInt(price) * this.num
                })
                .then(res => {
                    if (res.data == "success") {
                        this.$notify({
                            type: 'success',
                            message: 'Thêm sản phẩm vào giỏ hàng thành công!!!',
                            title: 'Thành công',
                            position: 'top-right',
                        })
                    }else
                    {
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

    // filters:{
    //     getLengthReviews(v){
    //         if (v == null) {
    //             return "0";
    //         }
    //         else{
    //             return v.length;
    //         }
    //     }
    // },

    watch: {
        '$store.state.reviews': function(){
            this.fetchReview();
        } 
    },
}
</script>

<style lang="scss">
@import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");

.header__overplay {
    background: linear-gradient(to bottom, rgba(45, 45, 45, 0.4) 0%, rgba(45, 45, 45, 0.9) 100%);
    width: 100%;
    height: 100%;
}
.detail__header {
    background-image: url("../assets/backgound-7.jpg");
    width: 100%;
    height: 330px;
    background-size: cover;
    position: relative;
}

.detail__header h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    font-size: 100px;
    font-weight: lighter;
    letter-spacing: 5px;
}

.detail__content .row {
    width: 100%;
}

.detail__content img {
    width: 100%;
}

.detail__star img {
    width: 20px;
    margin-bottom: 30px;
}

.detail__content h3 {
    margin-bottom: 30px;
    color: #2d2d2d;
    font-size: 30px;
    font-weight: normal;
}

.detail__content h4 {
    font-size: 30px;
    line-height: 30px;
    color: #7e7e7e;
    font-weight: normal;
    letter-spacing: 2px;
    margin-bottom: 20px;
}

.detail__content p {
    color: #7e7e7e;
    letter-spacing: 2px;
}

.detail__content a {
    text-decoration: none;
    background-color: rgb(219, 113, 55);
    color: white;
    padding: 10px 20px;
    font-size: 11px;
    line-height: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    border-radius: 4px;
    transition: all 0.5s;
}

.detail__content a:hover {
    background-color: rgb(45, 45, 45);
    color: #00cdce;
}

.detail__button {
    cursor: pointer;
    padding: 20px 0;
}

.detail__button a{
    margin-right: 1rem;
}

.detail__content span {
    color: #2d2d2d;
}

.detail__content {
    padding: 50px 0;
}


/* DETAIL__REVIEW */

.detail__review {
    padding: 0 105px;
}

.detail__review .nav a {
    font-size: 17px !important;
    line-height: 17px;
    font-weight: normal !important;
    padding: 20px 10px !important;
    color: #2d2d2d !important;
    border-top: none;
    border-left: none;
    border-right: none;
    letter-spacing: 2px;
}

.nav-tabs .nav-link.active {
    border-color: #db7137;
}

.nav-tabs .nav-link:hover {
    border-color: #db7137;
}

.nav-tabs .nav-link {
    border: 2px solid transparent;
}

.review__text {
    margin-top: 1rem;
    color: #7e7e7e;
}

.review__text h3 {
    color: #2d2d2d;
    font-size: 17px;
    line-height: 17px;
    font-weight: normal;
    padding: 20px 10px;
    letter-spacing: 2px;
}

.review__text p {
    letter-spacing: 2px;
}

.review__form input {
    width: 100%;
    padding: 10px 20px;
    background-color: transparent;
    border-top: none;
    box-shadow: none;
    border-left: none;
    border-right: none;
    margin-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
    letter-spacing: 2px;
    font-size: 16px;
}

.review__form input:focus,
.review__form textarea:focus {
    outline: none;
}

.review__form textarea {
    width: 100%;
    background-color: transparent;
    border-top: none;
    box-shadow: none;
    border-left: none;
    border-right: none;
    margin-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
    letter-spacing: 2px;
    font-size: 16px;
}

.review__form button {
    text-decoration: none;
    background-color: rgb(219, 113, 55);
    color: white;
    padding: 10px 20px;
    font-size: 11px;
    line-height: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    border-radius: 4px;
    border: none;
    transition: all 0.5s;
}

.review__form a:hover {
    background-color: rgb(45, 45, 45);
    color: #00cdce;
}

.review__content p{
    color: black;
}
.review__content img{
    width: 5rem;
    height: 5rem;
    margin: 2rem;
}

.user__comment--infor p{
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.user__comment--infor p:nth-child(2){
    padding-left: 2rem;
}

.user__comment{
    padding: 2rem;
}

.related__product {
    padding: 20px 105px;
    margin-bottom: 40px;
}

.related__content .row {
    width: 100%;
}

.related__item img {
    width: 258px;
    height: 258px;
}

.related__item {
    width: 100%;
    text-align: center;
    color: #7e7e7e;
}

.related__product h2 {
    letter-spacing: 2px;
    color: #2d2d2d;
    font-weight: normal;
    margin-bottom: 40px;
}

.related__item h3 {
    font-size: 25px;
    color: #2d2d2d;
    padding-top: 25px;
    font-weight: lighter;
    letter-spacing: 2px;
}

.related__item p {
    font-size: 18px;
    letter-spacing: 2px;
    padding: 10px 0;
    color: #7e7e7e;
}

.related__item a {
    text-decoration: none;
    background-color: rgb(219, 113, 55);
    color: white;
    padding: 10px 20px;
    font-size: 11px;
    line-height: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    border-radius: 4px;
    transition: all 0.5s;
}

.related__item a:hover {
    background-color: rgb(45, 45, 45);
    color: #00cdce;
}

</style>