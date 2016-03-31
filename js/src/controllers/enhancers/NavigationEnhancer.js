/**
* @fileoverview - Enhancer containing the back-to-top functionality
*/

define([
  'jquery'
],
function(
  $
) {

  return {
    run: function() {

      var btnToTop = $('.btn-to-top'),
          anchorElements = $("h1, h2, h3, h4, h5, h6");

      //adds anchor permalinks to any Header tag that has an id
      $(anchorElements).each(function (i, el) {
        var $el, id;
        $el = $(el);
        id = $el.attr('id');
        if (id) {
          return $el.prepend($("<a />").addClass("anchor-link")
            .attr("href", "#" + id).attr("data-icon", ""));
        }
      });

      btnToTop.on('click', function(e){
        e.preventDefault();

        $('html, body').animate({
          scrollTop: 0
        }, 600);
      });

      $(window).scroll(function () {
        if ( $(this).scrollTop() > 500 ) {
          btnToTop.addClass('is-visible');
        } else {
          btnToTop.removeClass('is-visible');
        }
      });

    }
  };

});