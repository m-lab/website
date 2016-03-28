/**
* @fileoverview - Main file that sets up enhancers depending on the current pg
*/

define([
  'backbone',
  'config',
  'controllers/Enhancer'
], function (
  Backbone,
  config,
  Enhancer
) {

/**	
* Return a function that will be called once the boot process has completed
*/
  return function() {

    console.log( 'ENTRY: main.desktop.js' );

    config.setUp();

/**	
* Invoke initial enhancers
*/
    setTimeout( function() {
      Enhancer.attach( 'NavigationEnhancer' );
      Enhancer.attach( $( '#main meta[data-id="enhancer"]' ).attr( 'data-className' ) );
    }, 500 );

  };

});