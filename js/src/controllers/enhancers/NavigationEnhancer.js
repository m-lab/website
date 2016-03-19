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

      var btnToTop = $('.btn-to-top');

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