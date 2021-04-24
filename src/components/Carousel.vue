<template>
    <div class="my__carousel">
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
            <div class="carousel-inner  ">
                <div class="carousel-item active" data-interval="2000">
                    <div class="carousel__content">
                        <img src="../assets/carousel-2.jpg" alt="carousel-1">
                        <div class="carousel__info ">
                            <div class="row">
                                <div class="col-6 info__content">
                                    <div class="info__text">
                                        <div class="text__h6">
                                            <h6>PROMOTION</h6>
                                            <div class="text__overplay"></div>
                                        </div>
                                        <div class="text__h2">
                                            <h2>
                                                Amazing Table with River View & lot of Menus
                                            </h2>
                                            <div class="text__overplay"></div>
                                        </div>
                                        <div class="text__a">
                                            <a href="#">DETAILS</a>
                                            <div class="text__overplay"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 info__img">
                                    <img src="../assets/carousel-1.jpg" alt="">
                                    <div class="img__overplay"></div>

                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="carousel__overplay"></div>
                </div>
                <div class="carousel-item " data-interval="2000">
                    <div class="carousel__content">
                        <img src="../assets/carousel-1.jpg" alt="carousel-2">
                        <div class="carousel__info ">
                            <div class="row">
                                <div class="col-6 info__content">
                                    <div class="info__text">
                                        <div class="text__h6">
                                            <h6>PROMOTION</h6>
                                            <div class="text__overplay"></div>
                                        </div>
                                        <div class="text__h2">
                                            <h2>
                                                Amazing Food with Fresh Daily Products & Wine
                                            </h2>
                                            <div class="text__overplay"></div>
                                        </div>
                                        <div class="text__a">
                                            <a href="#">DETAILS</a>
                                            <div class="text__overplay"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 info__img">
                                    <img src="../assets/carousel-2.jpg" alt="">
                                    <div class="img__overplay"></div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="carousel__overplay"></div>
                </div>

            </div>
            <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

.carousel__item {
    position: relative;
}

.carousel__content img {
    width: 100%;
    height: 624px;
}

.carousel__overplay {
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.7);
    top: 0;
    position: absolute;
    left: 0;
}

.carousel__info {
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    z-index: 2;
}

.carousel__info .row img {
    width: 100%;
    height: 100%;
}

.info__content {
    position: relative;
}

.info__text {
    z-index: 5;
    position: absolute;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translateX(10%) translateY(-50%);
}

.info__content h6 {
    letter-spacing: 2px;
    color: #999;
    padding-bottom: 16px;
}

.info__content h2 {
    letter-spacing: 3px;
    font-size: 40px;
    font-weight: 400;
    padding-bottom: 40px;
}

.info__text a,
.news__text a {
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

.info__text a:hover,
.news__text a:hover {
    background-color: rgb(45, 45, 45);
    color: #00cdce;
}

.info__img {
    position: relative;
    overflow: hidden;
}

.img__overplay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 4;
    transform: translateX(-101%);
    transition: all 1s;
}

.active .img__overplay {
    transform: translateX(101%);
}

.text__h6,
.text__h2,
.text__a {
    position: relative;
    display: inline-block;
    overflow: hidden;
}

.text__h6 h6,
.text__h2 h2,
.text__a a {
    display: inline-block;
}

.text__overplay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    background-color: rgb(231, 112, 48);
    transform: translateX(-101%);
    transition: all 1s;
}

.active .text__overplay {
    transform: translateX(101%);
}

</style>