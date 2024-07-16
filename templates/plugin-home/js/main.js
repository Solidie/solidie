(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });
    
})(jQuery);

