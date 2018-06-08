$(function () {
//    轮播的js
    new Swiper('#topSwiper', {
        loop: true,
        pagination: '.swiper-pagination',
    });

    new Swiper('#swiperMenu', {
        slidesPerView: 3,
    })
});

