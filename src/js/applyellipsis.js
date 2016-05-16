if (document.fonts && document.fonts.ready) {
    // 'CSS Font Loading Module Level 3' is available. Layout text only after
    // all fonts have been loaded.
    // For more information see:
    // http://dev.w3.org/csswg/css-font-loading/#dom-fontfaceset-loadfont-text
    // http://caniuse.com/#feat=font-loading
    var fontsReady = document.fonts.ready;
    if (typeof fontsReady === "function") {
        // backwards compatibility
        fontsReady = document.fonts.ready();
    }
    fontsReady.then(function() {
        $(".ellipsis").dotdotdot({ watch: true });
    });
} else {
    // 'CSS Font Loading Module Level 3' is not available. Try to layout now and
    // retry after 500ms and finally after 3 seconds.
    $(".ellipsis").dotdotdot({ watch: true });
    setTimeout(function() {
        $(".ellipsis").trigger("update");
    }, 500);
    setTimeout(function() {
        $(".ellipsis").trigger("update");
    }, 3000);
}
