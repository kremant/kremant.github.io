(function ($) {
    "use strict";

    $("[data-bg-image]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-bg-image") + ")");
    });

    $("[data-bg-color]").each(function () {
        $(this).css("background-color", $(this).attr("data-bg-color"));
    });

    $(document).ready(function ($) {
        var lastScrollTop = 0;
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll > 300) {
                $(".krm-header-area.header-sticky").addClass("sticky");
                $(".krm-header-area.header-sticky").removeClass("sticky-out");
            } else if (scroll < lastScrollTop) {
                if (scroll < 500) {
                    $(".krm-header-area.header-sticky").addClass("sticky-out");
                    $(".krm-header-area.header-sticky").removeClass("sticky");
                }
            } else {
                $(".krm-header-area.header-sticky").removeClass("sticky");
            }

            lastScrollTop = scroll;
        });

        $(".menu-bar").on("click", function () {
            $(".menu-bar").toggleClass("menu-bar-toggeled");
            $(".header-menu").toggleClass("opened");
            $("body").toggleClass("overflow-hidden");
        });

        $(".header-menu ul li a").on("click", function () {
            $(".menu-bar").removeClass("menu-bar-toggeled");
            $(".header-menu").removeClass("opened");
            $("body").removeClass("overflow-hidden");
        });

        $(".header-menu nav ul").onePageNav({
            currentClass: "current-menu-ancestor",
            changeHash: false,
            easing: "swing",
        });

        var $grid = $(".portfolio-box").isotope({
            masonry: {
                columnWidth: ".portfolio-box .portfolio-sizer",
                gutter: ".portfolio-box .gutter-sizer",
            },
            itemSelector: ".portfolio-box .portfolio-item",
            percentPosition: true,
        });

        $(".filter-button-group").on("click", "button", function () {
            $(".filter-button-group button").removeClass("active");
            $(this).addClass("active");

            var filterValue = $(this).attr("data-filter");
            $grid.isotope({ filter: filterValue });
        });

        $(".portfolio_gallery.owl-carousel").owlCarousel({
            items: 2,
            loop: true,
            lazyLoad: true,
            center: true,

            autoplayHoverPause: true,
            autoplay: false,
            autoplayTimeout: 5000,
            smartSpeed: 800,
            margin: 30,
            nav: false,
            dots: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 0,
                },

                768: {
                    items: 2,
                    margin: 20,
                },
                992: {
                    items: 2,
                    margin: 30,
                },
            },
        });

        $(".testimonial-carousel.owl-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: false,
            active: true,
            smartSpeed: 1000,
            autoplayTimeout: 7000,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 2,
                },
            },
        });

        $(".krm-post__gallery.owl-carousel").owlCarousel({
            items: 1,
            loop: true,
            margin: 30,
            dots: false,
            nav: true,
            navText: ["&lt;", "&gt;"],
            autoplay: false,
            smartSpeed: 1000,
            autoplayTimeout: 3000,
        });

        $("select").niceSelect();

        if ($(".popup_video").length > 0) {
            $(`.popup_video`).lightcase({
                transition: "elastic",
                showSequenceInfo: false,
                slideshow: false,
                swipe: true,
                showTitle: false,
                showCaption: false,
                controls: true,
            });
        }

        $(".modal-popup").magnificPopup({
            type: "inline",
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: "auto",
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: "popup-mfp",
        });
    });

    $(window).on("load", function () {
        var wow = new WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: 100,
            mobile: true,
            live: true,
        });
        wow.init();

        const svg = document.getElementById("preloaderSvg");
        const svgText = document.querySelector(".hero-section .intro_text svg text");
        const tl = gsap.timeline({
            onComplete: startStrokeAnimation,
        });
        const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        tl.to(".preloader-heading .load-text , .preloader-heading .cont", {
            delay: 1.5,
            y: -100,
            opacity: 0,
        });
        tl.to(svg, {
            duration: 0.5,
            attr: { d: curve },
            ease: "power2.easeIn",
        }).to(svg, {
            duration: 0.5,
            attr: { d: flat },
            ease: "power2.easeOut",
        });
        tl.to(".preloader", {
            y: -1500,
        });
        tl.to(".preloader", {
            zIndex: -1,
            display: "none",
        });

        function startStrokeAnimation() {
            svgText.classList.add("animate-stroke");
        }

        function service_animation() {
            var active_bg = $(".services-widget .active-bg");
            var element = $(".services-widget .current");
            $(".services-widget .service-item").on("mouseenter", function () {
                var e = $(this);
                activeService(active_bg, e);
            });
            $(".services-widget").on("mouseleave", function () {
                element = $(".services-widget .current");
                activeService(active_bg, element);
                element.closest(".service-item").siblings().removeClass("mleave");
            });
            activeService(active_bg, element);
        }
        service_animation();

        function activeService(active_bg, e) {
            if (!e.length) {
                return false;
            }
            var topOff = e.offset().top;
            var height = e.outerHeight();
            var menuTop = $(".services-widget").offset().top;
            e.closest(".service-item").removeClass("mleave");
            e.closest(".service-item").siblings().addClass("mleave");
            active_bg.css({ top: topOff - menuTop + "px", height: height + "px" });
        }

        $(".services-widget .service-item").on("click", function () {
            $(".services-widget .service-item").removeClass("current");
            $(this).addClass("current");
        });

        function filter_animation() {
            var active_bg = $(".portfolio-filter .button-group .active-bg");
            var element = $(".portfolio-filter .button-group .active");
            $(".portfolio-filter .button-group button").on("click", function () {
                var e = $(this);
                activeFilterBtn(active_bg, e);
            });
            activeFilterBtn(active_bg, element);
        }
        filter_animation();

        function activeFilterBtn(active_bg, e) {
            if (!e.length) {
                return false;
            }
            var leftOff = e.offset().left;
            var width = e.outerWidth();
            var menuLeft = $(".portfolio-filter .button-group").offset().left;
            e.siblings().removeClass("active");
            e.closest("button").siblings().addClass(".portfolio-filter .button-group");
            active_bg.css({ left: leftOff - menuLeft + "px", width: width + "px" });
        }

        if ($(".odometer").length > 0) {
            $(".odometer").appear(function () {
                var odo = $(".odometer");
                odo.each(function () {
                    var countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            });
        }

        if ($("#contact-form").length > 0) {
            $("#contact-form").validate({
                rules: {
                    conName: "required",
                    conEmail: {
                        required: true,
                        email: true,
                    },
                },

                messages: {
                    conName: "Enter your name.",
                    conEmail: "Enter a valid email.",
                },
                submitHandler: function (form) {},
            });
        }
    });
})(jQuery);
