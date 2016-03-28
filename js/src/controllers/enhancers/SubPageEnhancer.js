/**
* @fileoverview - Enhancer used on "subpages".  Currently the functionality is
* purely accordion functionality
*/

define([
  'jquery'
],
function(
  $

) {

  return {
    run: function() {

      // Subpage Accordions
      var accordion = $('.accordion'),
        listItem = accordion.children('li'),
        heading = listItem.find('.tabbed-heading'),
        content = listItem.find('.accordion-content').hide();

      //Open first entry of each accordion
      accordion.first().children().first().addClass('is-active').find(content).show();

      heading.on('click', function(e) {
        e.preventDefault();

        var el = $(this),
          thisAccordion = el.parents('.accordion');

        if( !el.parent().hasClass('is-active') ) {
          slideUp(thisAccordion);
          el.parent().addClass('is-active').end().next(content).stop(true, true).slideDown( function() {

            // Retrigger iframe src when accordion is opened. FF is picky about iframes in hidden divs.
            if ( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ) {
              $( 'iframe', el.parent() ).each( function( index, elem ) {
                $( elem ).attr( 'src', $( elem ).attr( 'src' ) );
              } );
            }

          } );
        } else {
          slideUp(thisAccordion);
        }
      });

      function slideUp(acc) {
        acc.find('.accordion-entry.is-active').find('.accordion-content').slideUp(function(){
          $('.more-ctn').hide();
        }).end().removeClass('is-active');
      }

      // Read more accordion
      var moreCtn = content.find('.read-more-ctn').hide(),
        accordionReadMore = content.find('.read-more');

      accordionReadMore.on('click', function(e){
        e.preventDefault();

        var el = $(this),
          content = el.parent().next('.read-more-ctn');

          content.slideToggle();
      });

    }
  };

});