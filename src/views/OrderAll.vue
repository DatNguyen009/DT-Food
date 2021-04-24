<template>
  <div class="order">
      <div class="detail__header">
        <div class="header__overplay"></div>
        <h1>Order</h1>
    </div>
    <div class="order__icon">
        <div class="container">
            <div class="order__content">
                <div class="row">
                    <div class="col-6">
                        <div class="row">
                            <div class="order__item">
                                <img src="../assets/order-1.png" alt="">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at
                                    porttitor vehicula nullam augue ipsum dolor</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="order__item">
                                <img src="../assets/order-2.png" alt="">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at
                                    porttitor vehicula nullam augue ipsum dolor</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="row">
                            <div class="order__item">
                                <img src="../assets/order-3.png" alt="">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at
                                    porttitor vehicula nullam augue ipsum dolor</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="order__item">
                                <img src="../assets/order-4.png" alt="">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at
                                    porttitor vehicula nullam augue ipsum dolor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="order__form">
        <div class="order__overplay"></div>

        <div class="form__order">
            <form ref="order">
                <input type="text" :placeholder="this.$store.state.username" :value="this.$store.state.username"  disabled style="cursor: not-allowed;">
                <input type="text" :placeholder="this.$store.state.customers_email" :value="this.$store.state.customers_email" disabled style="cursor: not-allowed;">
                <input type="text" :placeholder="this.$store.state.customers_phone" :value="'0'+this.$store.state.customers_phone" disabled style="cursor: not-allowed;">
                <input type="text" :placeholder="this.$store.state.customers_address" :value="this.$store.state.customers_address" disabled style="cursor: not-allowed;">

                <div class="tag">
                    <el-tag type="primary"  v-for="(item, index) in this.$store.state.getCart" :key="'A' + index"> <p v-for="(itemA,index) in item.product_info" :key="'B'+index">{{itemA.product_name}}</p></el-tag>                          
                </div>
                <input type="text" placeholder="Tổng tiền" :value="this.$store.getters.getTotalPrice" disabled  style="cursor: not-allowed;">
                
                <el-date-picker v-model="value1" type="date" placeholder="Pick a day"  ></el-date-picker>
                <el-time-select v-model="timePicker" :picker-options="{start: '08:30',step: '00:15', end: '20:30'}" placeholder="Select time">
                </el-time-select>
            </form>
            <a @click="order()" style="cursor: pointer;">ĐẶT NGAY</a>
        </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import ElementUI from 'element-ui'
import Vue from 'vue'

Vue.use(ElementUI);
export default {
    data() {
        return {
               value1: '',
               product_slug: this.$route.params.product_slug,
               totalMoney: "",
               timePicker: ""
        }
    },
    created() {
        if (this.$store.state.statusLogin != "Login") {
            this.$router.push({path: '/login'});
        }
        this.$store.dispatch("getCart", {
            url: `http://localhost:8080/apiDTfood/public/api/v1/cart/${this.$store.state.customers_email}`,
        });
    },
   
    methods: {
        order(){
           
            let date = new Date();
            let getdatenow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
            if (this.$refs.order[5].value == "" ) {
                    this.$message.error("Vui lòng nhập date!!!");
                } else {
                    if (getdatenow >= this.$refs.order[5].value) {
                        this.$message.error("Vui lòng chọn ngày trước ngày hiện tại");
                    }
                    else{
                        if (this.$refs.order[6].value == "") {
                            this.$message.error("Vui lòng chọn giờ nhận!!!");
                        } else {
                            if (`${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()+1}` == this.$refs.order[5].value) {
                            
                                if (`${getdatenow} ${date.getHours()}:${date.getMinutes()}` < `${getdatenow} 19:35`) {
                                    Axios.post('http://localhost:8080/apiDTfood/public/api/v1/multiOrder',{
                                        data: this.$store.state.getCart,
                                        order_dateCreated: `${getdatenow} ${date.getHours()}:${date.getMinutes()}`,
                                        order_dateReceived: `${this.$refs.order[5].value} ${this.$refs.order[6].value}`,
                                    })
                                    .then(res => {
                                        if (res.data == "success") {
                                            this.$notify({
                                                title: 'Thành công',
                                                message: 'Đặt hàng thành công!!!',
                                                type: 'success',
                                                position: 'top-left'
                                            })
                                            this.$router.push({path: '/home'});
                                        }
                                    })
                                    .catch(err => {
                                        this.$notify({
                                            title: 'Thất bại',
                                            message: 'Đặt hàng thất bại!!!',
                                            type: 'error',
                                            position: 'top-right'
                                        })
                                        console.log(err);
                                    })
                                } else {
                                    if (`${getdatenow} ${date.getHours()}:${date.getMinutes()}` > `${getdatenow} 19:35`) {
                                        this.$confirm(`Đơn hàng của bạn đã quá giờ đặt. Đơn hàng của bạn sẽ sẽ được gửi vào ngày ${date.getDate()+2}-0${date.getMonth()+1}-${date.getFullYear()}`,'Thông báo',{
                                            confirmButtonText: 'OK',
                                            cancelButtonText: 'Cancel',
                                            type: 'info'
                                        })
                                        .then(() => {
                                        
                                            Axios.post('http://localhost:8080/apiDTfood/public/api/v1/multiOrder',{
                                                data: this.$store.state.getCart,
                                                order_dateCreated: `${getdatenow} ${date.getHours()}:${date.getMinutes()}`,
                                                order_dateReceived: `${this.$refs.order[5].value} ${this.$refs.order[6].value}`,
                                            })
                                            .then(res => {
                                                if (res.data == "success") {
                                                    this.$notify({
                                                        title: 'Thành công',
                                                        message: 'Đặt hàng thành công!!!',
                                                        type: 'success',
                                                        position: 'top-left'
                                                    })
                                                    this.$router.push({path: '/home'});
                                                }
                                            })
                                            .catch(err => {
                                                this.$notify({
                                                    title: 'Thất bại',
                                                    message: 'Đặt hàng thất bại!!!',
                                                    type: 'error',
                                                    position: 'top-right'
                                                })
                                                console.log(err);
                                            })

                                        })
                                        .catch(() => {
                                            this.$notify({
                                                title: 'Hủy',
                                                message: 'Hủy đơn hàng thành công',
                                                type: 'error',
                                                position: 'top-right'
                                            })
                                        })
                                    }
                                }
                            }
                            else{
                                Axios.post('http://localhost:8080/apiDTfood/public/api/v1/multiOrder',{
                                    data: this.$store.state.getCart,
                                    order_dateCreated: `${getdatenow} ${date.getHours()}:${date.getMinutes()}`,
                                    order_dateReceived: `${this.$refs.order[5].value} ${this.$refs.order[6].value}`,
                                })
                                .then(res => {
                                    if (res.data == "success") {
                                        this.$notify({
                                            title: 'Thành công',
                                            message: 'Đặt hàng thành công!!!',
                                            type: 'success',
                                            position: 'top-left'
                                        })
                                        this.$router.push({path: '/home'});
                                    }
                                })
                                .catch(err => {
                                    this.$notify({
                                        title: 'Thất bại',
                                        message: 'Đặt hàng thất bại!!!',
                                        type: 'error',
                                        position: 'top-right'
                                    })
                                    console.log(err);
                                })
                            }
                        }
                    }
                }
            
        },
        totalPrice(){
            if (this.$refs.order[5].value < 1 || this.$refs.order[5].value >20) {
                this.$message.error('Số lượng đơn hàng phải lớn hơn 1 hoặc nhỏ hơn 21');
                return false;
            } else {
                this.totalMoney = this.$refs.order[5].value * parseInt(this.$store.getters.getProductPrice); 
                this.totalMoney = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.totalMoney);   
            }
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

.order__content {
    padding: 60px 0;
}

.order__content .row {
    width: 100%;
    color: #878787;
    font-size: 14px;
    letter-spacing: 2px;
}

.order__item {
    display: flex;
    width: 100%;
    padding: 20px 0;
}

.order__item img {
    width: 50px;
    height: 50px;
}

.order__item p {
    margin-left: 30px;
}

.order__form {
    background-image: url(../assets/backgound-about.jpg);
    width: 100%;
    height: 600px;
    background-size: cover;
    position: relative;
}

.order__overplay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 79%);
}

.form__order {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 7;
}

.form__order .tag{
    text-align: left;
}

.form__order .tag .el-tag{
    margin-right: 1rem;
}

.form__order form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 80%;
    margin: 0 auto;
    gap: 15px 30px;
}

.order__form input::placeholder {
    color: white;
    letter-spacing: 2px;
}

.order__form input {
    padding: 15px;
    font-size: 15px;
    border: 2px solid #00adef;
    border-radius: 5px;
    transition: all 0.5s;
    width: 100%;
    background-color: transparent;
    color: white;
}

.order__form input:focus {
    outline: none;
}

.order__form textarea {
    grid-column: 1 / 3;
    font-size: 15px;
    padding: 8px 0 0 5px;
    border: 2px solid #00adef;
    border-radius: 5px;
    color: white;
    background-color: transparent;
}

.order__form textarea::placeholder {
    color: white;
    letter-spacing: 2px;
}

.order__form textarea:focus {
    outline: none;
}

.form__order {
    text-align: center;
}

.order__form form {
    margin-bottom: 40px;
}

.form__order a {
    text-decoration: none;
    background-color: rgb(219, 113, 55);
    color: white;
    padding: 16px 400px;
    font-size: 15px;
    line-height: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    border-radius: 4px;
    transition: all 0.5s;
}

.form__order a:hover {
    background-color: rgb(45, 45, 45);
    color: #00cdce;
}
.el-input{
    width: 100% !important;
}
.el-input__inner{
    height: 100%;
}
</style>