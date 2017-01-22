$(document).ready(function() {
  // find <code> and <strong> elements and insert invisible whitespace
  // after every non-word character, so the browser can break the line
  // almost everywhere
  $("table code,table strong").each(function(i, e) {
    e.innerHTML = e.innerHTML.replace(/\W/g, '$&&#8203;');
  });
});