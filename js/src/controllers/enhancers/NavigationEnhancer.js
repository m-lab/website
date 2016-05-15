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
        var $el, id, permalink;
        $el = $(el);
        id = $el.attr('id');
        if (id) {
          if ( $('#blog-nav-page').length ) {
            permalink = $('.blog-entry').attr('id') + "#" + id;
          } else {
            permalink = "#" + id
          }
          return $el.prepend($("<a />").addClass("anchor-link")
            .attr("href", permalink).attr("data-icon", ""));
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

      //minor event listener on mobile menu accordions to flip the arrow
      // glyphicon depending if the particular accordion is open or closed.
      $('.mobile-sub-nav').on('show.bs.collapse', function(){
        $(this).parent().find(".glyphicon-triangle-bottom")
          .removeClass("glyphicon-triangle-bottom")
          .addClass("glyphicon-triangle-top");
      }).on('hide.bs.collapse', function(){
        $(this).parent().find(".glyphicon-triangle-top")
          .removeClass("glyphicon-triangle-top")
          .addClass("glyphicon-triangle-bottom");
      });

      //click event logic that decides if a top level nav item follow the href
      //link or act as an accordion since on desktop, it is just a link, but on
      // mobile, it is an accordion.
      $('.mobile-sub-nav-trigger').click( function(e) {
          if ( $('#mobile-main-nav').is(":visible") ) {
            e.preventDefault();
            $(this).attr("href", "#"+$(this).attr("data-target"));

            var parent = $(this).data('parent');
            var actives = parent && $(parent).find('.collapse.in');

            if (actives && actives.length) {
                hasData = actives.data('collapse');
                actives.collapse('hide');
            }

            $('#'+$(this).attr("data-target")).collapse('toggle');

          } else {
            $(this).attr("href", $(this).attr("data-link"));
          }
        }
      );

    }
  };

});