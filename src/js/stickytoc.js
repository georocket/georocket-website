$(document).ready(function() {
  $(window).scroll(function() {
    // make container for toc large enough to hold the toc even if user scrolls down
    $("#toccontainer").height($("#toccontainer").parent().parent().height());
  });
  // enable sticky toc
  $(".fixedsticky").fixedsticky();
});