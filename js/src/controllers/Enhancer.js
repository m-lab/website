/**
* @fileoverview - Base enhancers file that runs specific enhancer types
*/

define([
  'jquery',
  'controllers/enhancers/NavigationEnhancer',
  'controllers/enhancers/HomePageEnhancer',
  'controllers/enhancers/SubPageEnhancer'
],
function(
  $,
  NavigationEnhancer,
  HomePageEnhancer,
  SubPageEnhancer
) {


  return {

    attach: function( name ) {
      if ( name ) {
        console.log( 'ENHANCER: attaching', name );

        setTimeout( function() {
          switch ( name ) {
            case 'NavigationEnhancer':
            NavigationEnhancer.run();
            break;

            case 'HomePageEnhancer':
            HomePageEnhancer.run();
            break;

            case 'SubPageEnhancer':
            SubPageEnhancer.run();
            break;

            default:
            break;
          }
        }, 250 );
        
      }

      return true;
    }

  }


});