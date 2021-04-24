<template>
<div class="my__news">
        <div class="news__header">
            <div class="header__overplay"></div>
          
            <h1>Our News</h1>
        </div>
        <div class="our__news">
            <div class="news__title">
                <h3>Blog</h3>
                <h2>OUR NEWS</h2>
            </div>
            <div class="news__content ">
                <div class="row">
                    <div class="col-6">
                        <img src="../assets/news-1.jpg" alt="">
                    </div>
                    <div class="col-6">
                        <div class="news__text">
                            <h4>NEWS</h4>
                            <h3>New Appetizers</h3>
                            <h6>10 JANUARY</h6>
                            <p>Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et.
                                Quisque euismod orci ut et lobortis.</p>
                            <a href="#">READ MORE</a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="news__text">
                            <h4>NEWS</h4>
                            <h3>Inauguration</h3>
                            <h6>10 JANUARY</h6>
                            <p>Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et.
                                Quisque euismod orci ut et lobortis.</p>
                            <a href="#">READ MORE</a>
                        </div>
                    </div>
                    <div class="col-6">
                        <img src="../assets/news-2.jpg" alt="">
                    </div>

                </div>
                <div class="row">
                    <div class="col-6">
                        <img src="../assets/news-3.jpg" alt="">
                    </div>
                    <div class="col-6">
                        <div class="news__text">
                            <h4>NEWS</h4>
                            <h3>Fresh Ingredients</h3>
                            <h6>10 JANUARY</h6>
                            <p>Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et.
                                Quisque euismod orci ut et lobortis.</p>
                            <a href="#">READ MORE</a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="news__text">
                            <h4>NEWS</h4>
                            <h3>Menu Update</h3>
                            <h6>10 JANUARY</h6>
                            <p>Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies magna et.
                                Quisque euismod orci ut et lobortis.</p>
                            <a href="#">READ MORE</a>
                        </div>
                    </div>
                    <div class="col-6">
                        <img src="../assets/news-4.jpg" alt="">
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

.news__header {
    background-image: url("../assets/backgound-5.jpg");
    width: 100%;
    height: 330px;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.news__header h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    font-size: 100px;
    font-weight: lighter;
    letter-spacing: 5px;
}
.header__overplay {
    background: linear-gradient(to bottom, rgba(45, 45, 45, 0.4) 0%, rgba(45, 45, 45, 0.9) 100%);
    width: 100%;
    height: 100%;
}


</style>