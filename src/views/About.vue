<template>
  <div class="about__content">
        <div class="about__header">
            <div class="header__overplay"></div>
            
            <h1>Giới thiệu</h1>
        </div>
        <div class="about__intro">
            <div class="intro__top">
                <div class="row">
                    <div class="col-8">
                        <div class="intro__text">
                            <span>T</span>
                            <p> hành lập từ năm 1945. DT-FOOD là công ty thực phẩm hàng đầu được đón nhận trên toàn Việt Nam.
DT-FOOD mang lại cho quý khác một bữa ăn ngon lành, bổ dưỡng cùng với giá cả hợp lí.</p>
                            <div class="intro__text1">
                                <p> Đề cao nguyên liệu tươi ngon tự nhiên ít tẩm ướp gia vị và sự cân bằng dưỡng chất cho cơ thể, bàn tiệc DT-FOOD luôn là sự kết hợp tuyệt vời giữa các loại thịt tuyển gắt gao cùng rau củ tươi ngon để tạo nên một bữa tiệc hoàn hảo, tươi ngon, thơm ngọt từ từng thớ thịt.</p>
                            </div>


                        </div>
                    </div>
                    <div class="col-4">
                        <div class="intro__info">
                            <div class="info__content1">
                                <div class="info__item">
                                    <img src="../assets/ico-05.png" alt="">
                                    <div class="info__text3">
                                        <p>ĐỊA CHỈ</p>
                                        <p>29 - Bàu Cát 6 - Q.Tân Bình - HCM</p>
                                    </div>
                                </div>
                                <div class="info__item">
                                    <img src="../assets/ico-05.png" alt="">
                                    <div class="info__text3">
                                        <p>SĐT</p>
                                        <p>0352073743</p>
                                    </div>
                                </div>
                                <div class="info__item">
                                    <img src="../assets/ico-05.png" alt="">
                                    <div class="info__text3">
                                        <p>EMAIL</p>
                                        <p>Vantrongle1999@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="about__contact">
            <div class="contact__overplay"></div>
            <div class="row">
                <div class="col-8"></div>
                <div class="col-4">
                    <div class="contact__form">
                        <div class="form__content">
                            <div class="form__text">
                                <p>LIÊN HỆ</p>
                                <h3>LIÊN HỆ NGAY</h3>
                            </div>
                            <div class="form__form">
                                <input type="text" placeholder="Email">
                                <textarea cols="40" rows="4" placeholder="Tin nhắn"></textarea>
                                <a href="#">Gửi</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="about__chef">
            <div class="chef__content container">
                <div class="chef__item">
                    <img src="../assets/chef-1.jpg" alt="">
                    <div class="chef__text">
                        <h5>Nick Mcallister</h5>
                        <p>Đầu bếp</p>
                        <p>Nhiệt tình, thân thiện, trình độ cao.
                        </p>
                        <a href="#">LIÊN HỆ</a>
                    </div>
                </div>
                <div class="chef__item">
                    <img src="../assets/chef-2.jpg" alt="">
                    <div class="chef__text">
                        <h5>Ralph Johnson
                        </h5>
                        <p>Đầu bếp</p>
                        <p>Nhiệt tình, thân thiện, trình độ cao.
                        </p>
                        <a href="#">LIÊN HỆ</a>
                    </div>
                </div>
                <div class="chef__item">
                    <img src="../assets/chef-3.jpg" alt="">
                    <div class="chef__text">
                        <h5>Benj Spitch</h5>
                        <p>Quản lý
                        </p>
                        <p>Nhiệt tình, thân thiện, trình độ cao.
                        </p>
                        <a href="#">LIÊN HỆ</a>
                    </div>
                </div>
                <div class="chef__item">
                    <img src="../assets/chef-4.jpg" alt="">
                    <div class="chef__text">
                        <h5>Tom Zafron</h5>
                        <p>
                            Đầu bếp</p>
                        <p>Nhiệt tình, thân thiện, trình độ cao.
                        </p>
                        <a href="#">LIÊN HỆ</a>
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
.about__header {
    background-image: url("../assets/backgound-about.jpg");
    width: 100%;
    height: 330px;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.header__overplay {
    background: linear-gradient(to bottom, rgba(45, 45, 45, 0.4) 0%, rgba(45, 45, 45, 0.9) 100%);
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

.intro__text {
    color: #7e7e7e;
    letter-spacing: 2px;
}

.intro__text span {
    padding: 10px 28px;
    font-size: 70px;
    float: left;
}

.intro__text p {
    padding-top: 11px;
    line-height: 30px;
}

.intro__text1 p {
    padding-left: 28px;
}

.intro__info {
    width: 370px;
    height: 240px;
    background-color: #db7137;
}

.about__intro .row {
    width: 100%;
}

.info__item {
    display: flex;
    padding: 6px 0;
}

.info__text3 p {
    padding: 0;
    margin: 0;
    line-height: 25px;
    letter-spacing: 2px;
}

.info__item img {
    width: 30px;
    height: 30px;
    margin-top: 10px;
}

.info__text3 {
    padding-left: 20px;
}

.intro__info {
    position: relative;
}

.info__content1 {
    position: absolute;
    width: 310px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.intro__top {
    padding-top: 60px;
    padding-bottom: 150px;
    padding-left: 40px;
}


/* ABOUT CONTACT  */

.about__contact {
    background-image: url("../assets/backgound-3.jpg");
    width: 100%;
    height: 536px;
    background-size: cover;
    position: relative;
}

.contact__overplay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(45, 45, 45, 0.4) 0%, rgba(45, 45, 45, 0.9) 100%);
}

.about__chef {
    margin-top: -135px;
    position: relative;
    color: #7e7e7e;
}

.chef__content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    text-align: center;
}

.chef__item img {
    width: 270px;
    height: 270px;
}

.chef__text {
    padding: 16px 20px;
    letter-spacing: 2px;
    font-size: 16px;
}

.chef__text a {
    margin-top: 16px;
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

.chef__text a:hover {
    background-color: rgb(45, 45, 45);
    color: #00cdce;
}


.about__contact {
    background-image: url("../assets/backgound-3.jpg");
    width: 100%;
    height: 536px;
    background-size: cover;
    position: relative;
}

.contact__overplay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(45, 45, 45, 0.4) 0%, rgba(45, 45, 45, 0.9) 100%);
}


.about__contact .row {
    width: 100%;
}

.contact__form {
    background-image: url("../assets/backgound-4.jpg");
    width: 370px;
    height: 448px;
    margin-left: 16px;
    color: white;
    position: relative;
    margin-top: -120px;
}

.contact__form input {
    width: 90%;
}

.contact__form textarea {
    width: 90%;
}

.form__text {
    text-align: center;
}

.form__form {
    width: 100%;
    text-align: center;
}

.form__content {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.form__text p {
    letter-spacing: 2px;
}

.form__text h3 {
    font-size: 30px;
    letter-spacing: 2px;
    font-weight: normal;
    padding-bottom: 30px;
}

.form__form input {
    padding: 10px 20px;
    background-color: transparent;
    border-top: none;
    box-shadow: none;
    border-left: none;
    border-right: none;
    margin-bottom: 20px;
    border-bottom: 1px solid white;
    letter-spacing: 2px;
    font-size: 16px;
    color: white;
}

.form__form input:focus,
.form__form textarea:focus {
    padding: 10px 20px;
    background-color: transparent;
    border-top: none;
    box-shadow: none;
    border-left: none;
    border-right: none;
    margin-bottom: 20px;
    border-bottom: 1px solid white;
    letter-spacing: 2px;
    font-size: 16px;
    outline: none;
}

.form__form input::placeholder,
.form__form textarea::placeholder {
    color: white;
}

.form__form textarea {
    padding: 10px 20px;
    background-color: transparent;
    border-top: none;
    box-shadow: none;
    border-left: none;
    border-right: none;
    margin-bottom: 20px;
    border-bottom: 1px solid white;
    letter-spacing: 2px;
    font-size: 16px;
    color: white;
}

.form__form a {
    color: white;
    text-decoration: none;
    background-color: #db7137;
    width: 333px;
    display: inline-block;
    padding: 10px 0;
    border-radius: 4px;
    font-size: 15px;
    letter-spacing: 2px;
    font-weight: 400;
    transition: all 0.5s;
    border: solid 1px #db7137;
}

.form__form a:hover {
    background-color: rgb(45, 45, 45);
    color: #00cdce;
    border: solid 1px white;
}


</style>