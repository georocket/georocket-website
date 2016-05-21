(function() {
    var shown = false;
    var gotoTopBtn = $("#goto-top-button");

    if (gotoTopBtn.length == 0) {
        return;
    }

    gotoTopBtn.click(function() {
        $("html,body").animate({scrollTop: 0}, 500);
    });

    function check() {
        if ($(window).scrollTop() > 300 && $(window).width() >= 1300) {
            if (!shown) {
                gotoTopBtn.fadeIn();
                shown = true;
            }
        } else {
            if (shown) {
                gotoTopBtn.fadeOut();
                shown = false;
            }
        }
    }

    $(window).resize(check);
    $(window).scroll(check);
    check();
})();
