$(function () {
    let isMobile = window.innerWidth <= 580; // 초기값 설정

    $(window).resize(function () {
        if (window.innerWidth > 580) {
            if (isMobile !== false) {
                isMobile = false;
            }
            $(".dim").removeClass("active");
            $("header nav").removeClass("active");
            $("header .menu").removeClass("active");
            document.body.style.overflow = "auto";
        } else {
            if (isMobile !== true) {
                isMobile = true;
            }
        }
    });

    $(window).trigger("resize");

    // Slider
    let idx = 0;
    let targetx = 0;
    let sliderw = 2000;

    function galleryfn() {
        $("#slider .controller li").removeClass("on");
        $("#slider .controller li").eq(idx).addClass("on");

        targetx = -1 * sliderw * idx;

        $("#slider .image ul li").removeClass("active");
        $("#slider .image ul li").eq(idx).addClass("active");
    }

    $("#slider .controller ul li").eq(idx).addClass("on");
    $("#slider .image ul li").eq(idx).addClass("active");

    $("#slider .controller li").click(function (e) {
        e.preventDefault();
        idx = $(this).index();
        galleryfn();
    });

    // 슬라이드 자동 재생 (중복 실행 방지)
    let slideInterval = setInterval(function () {
        idx = (idx + 1) % 4;
        galleryfn();
    }, 3000);

    // #part1 슬라이드
    let swiper = null;

    function updateSwiper() {
        if (window.innerWidth < 720) {
            if (!swiper) {
                swiper = new Swiper(".mySwiper", {
                    slidesPerView: 2,
                    spaceBetween: 0,
                });
            }
        } else {
            if (swiper) {
                swiper.destroy();
                swiper = null;
            }
        }
    }

    $(document).ready(updateSwiper);
    $(window).resize(updateSwiper);

    // 해상도 580px 이하에서 메뉴 토글
    $("header .menu").click(function (e) {
        e.preventDefault();
        if (isMobile) {
            let isActive = $("header nav").hasClass("active");
            $(".dim, header nav, header .menu").toggleClass("active", !isActive);
            document.body.style.overflow = isActive ? "auto" : "hidden";
        }
    });

    $("header nav > ul > li").click(function (e) {
        e.preventDefault();
        $(this).toggleClass("active").siblings().removeClass("active");
    });

    // 데스크탑 메뉴 hover 효과
    $("header nav > ul > li, header nav > ul > li .sub li, #part1 .swiper-wrapper .swiper-slide a, #part3 .lab a").hover(
        function () {
            if (!isMobile) $(this).addClass("active");
        },
        function () {
            if (!isMobile) $(this).removeClass("active");
        }
    );
});