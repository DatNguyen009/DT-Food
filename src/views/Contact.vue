<template>
  <div class="contact__content">
        <div class="contact__header">
            <div class="header__overplay"></div>
            
            <h1>Liên hệ</h1>
        </div>
        <div class="my__contact container">
            <div class="row">
                <div class="col-6">
                    <h5>LIÊN HỆ VỚI CHÚNG TÔI</h5>
                    <p>Mọi thắc mắc và yêu cầu cần hỗ trợ từ DT-FOOD, vui lòng để lại thông tin tại đây.
Chúng tôi sẽ xem xét và gửi phản hồi sớm nhất.</p>
                    <div class="my__form">
                        <label>Tên : </label>
                        <input type="text">
                        <label>Email : </label>
                        <input type="text">
                        <p>Tin nhắn : </p>
                        <textarea name="" id="" cols="40" rows="2"></textarea>
                        <a href="
                        #">Gửi</a>
                    </div>
                </div>
                <div class="col-6">
                    <div class="contact__map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.212664142749!2d106.71966481410534!3d10.795017761803782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529aff2892003%3A0x856b53b1af6b19f3!2sLandmark%2081!5e0!3m2!1svi!2s!4v1615633099552!5m2!1svi!2s"
                            width="600" height="280" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                    <div class="contact__table">
                        <div class="row">
                            <div class="col-6">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td>Địa chỉ :</td>
                                            <td>29 Bàu Cát</td>
                                        </tr>
                                        <tr>
                                            <td>Thành phố :</td>
                                            <td>Hồ Chí Minh</td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-6">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td>Phone:</td>
                                            <td>0352073743</td>
                                        </tr>
                                        <tr>
                                            <td>Mail :</td>
                                            <td>Vantrongle1999@gmail.com</td>
                                        </tr>
                                     
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <p>LIÊN HỆ TỪ : 10AM – 8PM</p>
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

.contact__header {
    background-image: url("../assets/backgound-6.jpg");
    width: 100%;
    height: 330px;
    background-size: cover;
    position: relative;
}

.contact__header h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    font-size: 100px;
    font-weight: lighter;
    letter-spacing: 5px;
}

.my__contact {
    color: #7e7e7e;
    padding: 70px 0;
}

.my__contact .row {
    width: 100%;
}

.table {
    width: 340px;
    margin-top: 30px;
}

.table tr td {
    color: #555555;
    line-height: 27px;
}

.my__contact h5 {
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 2px;
    font-weight: normal;
    color: #2d2d2d;
    padding-bottom: 20px;
}

.my__contact p {
    font-size: 16;
    letter-spacing: 1px;
    margin-bottom: 20px;
}

.my__contact input {
    width: 100%;
    padding: 10px 20px;
    background-color: transparent;
    border-top: none;
    box-shadow: none;
    border-left: none;
    border-right: none;
    margin-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
    ;
    letter-spacing: 2px;
    font-size: 16px;
}

.my__contact input:focus,
.my__contact textarea:focus {
    outline: none;
}

.my__contact textarea {
    width: 100%;
    background-color: transparent;
    border-top: none;
    box-shadow: none;
    border-left: none;
    border-right: none;
    margin-bottom: 20px;
    border-bottom: 1px solid #f1f1f1;
    ;
    letter-spacing: 2px;
    font-size: 16px;
}

.my__form a {
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

.my__form a:hover {
    background-color: rgb(45, 45, 45);
    color: #00cdce;
}

</style>