(function($) {
    "use strict";
    var $window = $(window);
    $('#preloader').fadeOut('normall', function() {
        $(this).remove();
    });
    $window.on('scroll', function() {
        var scroll = $window.scrollTop();
        if (scroll <= 50) {
            $("header").removeClass("scrollHeader").addClass("fixedHeader");
        } else {
            $("header").removeClass("fixedHeader").addClass("scrollHeader");

        }
    });

    var pageSection = $(".parallax,.bg-img");
    pageSection.each(function(indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    $(document).ready(function() {

        $('#clients').owlCarousel({
			loop: true, nav: false, dots: false,
            smartSpeed: 500, autoplay: true,
			autoplayTimeout: 3000, responsiveClass: true,
			autoplayHoverPause: false, stagePadding: 0,
            slideTransition: 'linear',
            autoplayTimeout: 1300, autoplaySpeed: 1300,
			responsive: {
                0: {items: 5, margin: 25}, 
                768: {items: 10, margin: 15}, 
                992: {items: 12, margin: 20}, 
                1200: {items: 17, margin: 20},
			}
		});

    });

}
)(jQuery);
