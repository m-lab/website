/**
* @fileoverview - Setup RequireJS config, library paths and shims.
*/

requirejs.config({

  enforceDefine: false,
  waitSeconds: 60,

  paths: {
    'underscore':           '../libs/underscore.min',
    'backbone':             '../libs/backbone.0.9.10.min',
    'require.domready':     '../libs/require.domready',
    'jquery':               '../libs/jquery-1.9.1.min',
    'jquery.flexslider':    '../libs/jquery.flexslider',
    'jquery.imagesLoaded':  '../libs/jquery.imagesloaded.min'    
  },

  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'jquery.flexslider': {
      deps: ['jquery'],
    },
    'jquery.imagesLoaded': {
      deps: ['jquery']
    }
  }

});

/**
* Load all libs to be sure they are initialized.
* Launch the main app script.
*/
require([
  'underscore',
  'backbone',
  'require.domready',
  'jquery',
  'jquery.flexslider',
  'jquery.imagesLoaded',
  'config',
  'controllers/Enhancer'
], function(
  _,
  Backbone,
  domReady,
  $,
  jqueryFlexslider,
  jqueryImagesLoaded,
  config,
  Enhancer
){
  if (!window.console) window.console = {};
  if (!window.console.log) window.console.log = function () { };

  require( [ 'main' ], function( main ) {
    domReady( main );
  });

});