function check_video() {
    console.log(3);
    if ($('#hero-video-src').length < 1) {
        return 0;
    }
    var screenWidth = $(window).width();
    // if window width is smaller than 800 remove the autoplay attribute
    // from the video
    if (screenWidth < 769) {
        $('#hero-video-src').removeAttr('autoplay');
    } else {
        $('#hero-video-src').attr('autoplay');
        var v_element = document.getElementById('hero-video-src');
        v_element.play();
    }
}
$(document).ready(function () {
    check_video();
    $(window).resize(check_video);
    init_testies();
    init_partners();
    init_accordeon();
});
function init_accordeon() {
    if ($(".single-accordeon-row").length < 1) {
        return 0;
    }
    $(".single-accordeon-row").find(".cross").on("click", function () {
        $(this).closest(".single-accordeon-row").toggleClass("open_accordeon");
        $(this).toggleClass("open_accordeon");
    });
}
function init_partners() {
    if ($(".partner_image-shape").length < 1) {
        return 0;
    }
    $(".partner_image-shape").on("click", function () {
        $(this).closest(".partner_section").toggleClass("partner_open");
    });
    $(".partners_details-shape").on("click", function () {
        $(this).closest(".partner_section").toggleClass("partner_open");
    });
    $(".main_partner_image").on("click", function () {
        $(this).closest(".partner_section").toggleClass("partner_open");
    });
}
function init_testies() {
    if ($("#testimonials").length < 1) {
        return 0;
    }
    $("#testies-slide").slick({
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}
$(document).ready(function () {
    $(".has_submenu").find(".single-menu-link-shape > a").on("click", function (e) {
        e.preventDefault();
        set_menu($(this));
    });
    $(".has_submenu").find(".cross").on("click", function (e) {
        set_menu($(this).closest(".has_submenu").find(".single-menu-link-shape > a"));
        //$(this).closest(".has_submenu").find("a").trigger("click");
    });
    $("#burger_button").on("click", function () {
        $('html').toggleClass("small_menu_opened");
    });
    $("#close_side").on("click", function () {
        $("#burger_button").trigger("click");
    });
    
    var waypoint = new Waypoint({
        element: document.getElementById('menu_trigger'),
        handler: function (direction) {
            console.log(direction);
            if (direction == 'down') {
                $("body").addClass("fixed_menu");
            } else {
                $("body").removeClass("fixed_menu");
            }
        },
        offset: -2
    });
    init_search();
});
function init_search() {
    $(".menu_search-shape input").on("click", function () {
        $("html").addClass("open_search");
    });
    $(".menu_search-icon").on("click", function () {
        $(".search-input").val($(this).closest(".menu_search-shape").find("input").val());
        $("form.search").trigger("submit");
    });
    /*$(".menu_search-shape input").on("keyup", function(e) {
    if (e.keyCode == 13) {
    $(".menu_search-icon").trigger('click');
    }
    });*/
    $(window).click(function () {
        //Hide the menus if visible
        $("html").removeClass("open_search");
    });
    $('#menu_search').click(function (event) {
        event.stopPropagation();
    });
}
function set_menu($item) {
    var close = false;
    if ($item.closest(".has_submenu").hasClass("opened")) {
        close = true;
    }
    $(".opened").removeClass("opened");
    $("#menu").css("paddingBottom", "0px");
    if (!close) {
        $item.closest(".has_submenu").addClass("opened");
        if ($item.closest("#side_menu").length > 0) {
        } else {
            var submenu_h = $item.closest(".has_submenu").find(".submenu-shape").height() - ($("#menu").height() / 2);
            if (submenu_h > -40) {
                submenu_h += 70;
                $("#menu").css("paddingBottom", submenu_h + "px");
            }
        }
        //	return 0;
    }
}