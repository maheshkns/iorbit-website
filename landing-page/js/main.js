jQuery(document).on('ready', function ($) {
    "use strict";

    /*--------------------------
        SCROLLSPY ACTIVE
    ---------------------------*/
    $('body').scrollspy({
        target: '.bs-example-js-navbar-scrollspy',
        offset: 65
    });


    /*--------------------------
        STICKY MAINMENU
    ---------------------------*/
    $("#mainmenu-area").sticky({
        topSpacing: 0
    });


    /*--------------------------
        SMOOTH SCROLL
    ----------------------------*/
    $(".push-menu-and-content").niceScroll({
        cursorwidth: "10px"
    });


   
    /*----------------------------
        SCROLL TO TOP
    ------------------------------*/
    $(window).on("scroll", function () {
        var $totalHeight = $(window).scrollTop();
        var $scrollToTop = $(".scrolltotop");
        if ($totalHeight > 300) {
            $scrollToTop.fadeIn();
        } else {
            $scrollToTop.fadeOut();
        }
        if ($totalHeight + $(window).height() === $(document).height()) {
            $scrollToTop.css("bottom", "90px");
        } else {
            $scrollToTop.css("bottom", "20px");
        }


        // scroll and fade header text
        var scrollPosition = jQuery(this).scrollTop();
        jQuery('.welcome-text').css({
            'margin-top': -(scrollPosition / 4) + "px",
            'opacity': 1 - (scrollPosition / 400)
        });
    });

    /*---------------------------
        MICHIMP INTEGRATION
    -----------------------------*/
    $('#mc-form').ajaxChimp({
        url: 'http://intimissibd.us14.list-manage.com/subscribe/post?u=a77a312486b6e42518623c58a&amp;id=4af1f9af4c', //Set Your Mailchamp URL
        callback: function (resp) {
            if (resp.result === 'success') {
                $('.subscriber-form input, .subscriber-form button').hide();
            }
        }
    });


    /*--------------------------
        ACTIVE WOW JS
    ----------------------------*/
    new WOW().init();

}(jQuery));



jQuery(window).on('load', function () {
    "use strict";
    /*--------------------------
        PRE LOADER
    ----------------------------*/
    $(".preeloader").fadeOut(1000);
});
