/**
* @fileoverview - Enhancer used on the homepage which includes a carousel and
* youtube videos
*/

define([
  'jquery',
  'jquery.flexslider',
  'jquery.imagesLoaded',
  'config'
],
function(
  $,
  flexslider,
  imagesLoaded,
  config

) {

  return {
    run: function() {

      // Main Carousel - WIP
      var carouselSection = $('.carousel-section'),
      carouselPreloader = carouselSection.children('.carousel-preloader'),
      carouselCtn = carouselSection.children('.carousel-ctn'),
      carouselSlides = carouselCtn.children('.slides');


      /**
       *  Show preloader while all carousel images load
       *   Once all images loaded initialise flexslider, fade out preloader and fade in slides
       */
      carouselPreloader.show();
      carouselSlides.imagesLoaded(function(){
        carouselCtn.flexslider({
          animation: "slide",
          slideshow: true,
          directionNav: false
        });
        carouselPreloader.fadeOut(function(){
          carouselCtn.fadeIn();
          carouselPreloader.remove();
        });
      });


      // YouTube API
      //Create the player
      var player;

      //Get Global YouTube URL if 1 exists if not then default to Main MLabs video
      var video_id = $( '#main meta[data-video-id]' ).attr( 'data-video-id' );
      var YTID = video_id.length > 0 ? video_id : 'RnIVMfBP4So';
      console.log( 'VIDEO id:', YTID );

      // If video has been initialized/played already fire it up again.
      // Else do the full init procedure.
      if ( config.internalState.youTubeAPIReady ) {
        createVideo();
      } else {
      //Set up youTube iFrame API script
      var tag = document.createElement('script');
      tag.src = "//www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = function() {
          config.internalState.youTubeAPIReady = true;
          createVideo();
        }
      }

      function createVideo() {
        player = new YT.Player(video, {
          width: '630px',
          height: '354px',
          videoId: YTID,
          title: '',
          playerVars: {
            modestbranding: 0,
            iv_load_policy: 3,
            showinfo: 0,
            wmode: 'transparent',
            origin : window.location.host,
            rel: 0
          }
        });
      }

      //Click handler
      var playerCtn = $('.player-ctn'),
      playerOverlay = playerCtn.find('.player-overlay'),
      playerControl = playerOverlay.find('.player-control');

      playerOverlay.off().on('click', function(e){
        e.preventDefault();
        playerOverlay.fadeOut();
        player.playVideo();
      });
    }
  }

});