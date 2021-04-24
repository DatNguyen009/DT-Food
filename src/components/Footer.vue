<template>
    <div class="my__footer">
        <div class="footer__content container">
            <div class="row">
                <div class="col-4">
                    <div class="footer__item">
                        <div class="footer__logo">
                            <a href="#"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                        </div>
                        <p>STAY TUNED</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu libero elit.</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="footer__item">
                        <img src="../assets/logo.png" alt="">
                        <p>vantrongle1999@gmail.com</p>
                        <p>0352073743</p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="footer__item">
                        <ul>
                            <li><a href="#">HOME</a></li>
                            <li><a href="#">ABOUT US</a></li>
                            <li><a href="#">SERVICERS</a></li>
                            <li><a href="#">SHOP</a></li>
                            <li><a href="#">CONTACT</a></li>
                            <li><a href="#">PRODUCT</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

.my__footer {
    text-align: center;
    background-image: url("../assets/backgound--2.jpg");
    font-size: 16px;
    letter-spacing: 2px;
    background-size: cover;
    width: 100%;
}

.my__footer p {
    margin-bottom: 20px;
    padding: 0;
}

.my__footer a {
    color: white;
}

.my__footer i {
    font-size: 24px;
    padding: 20px 6px;
    transition: all 0.5s;
}

.my__footer i:hover {
    color: #00cdce;
}

.footer__item {
    padding: 0 50px;
}

.footer__item ul {
    list-style: none;
}

.footer__item a {
    text-decoration: none;
    font-weight: 500;
    transition: all 0.5s;
}

.footer__item img {
    margin-top: 35px;
    width: 100px;
    height: 45px;
    margin-bottom: 20px;
}

.footer__item a:hover {
    color: #00cdce;
}

.footer__content {
    padding: 50px 0 30px 0;
}

.footer__item ul li {
    padding-bottom: 8px;
}

</style>