$( document ).ready(function() {
  console.log('doc ready');

  // front page banner definition
  $('#banner-slide').bjqs({
    animtype      : 'fade',
    animduration : 450, // how fast the animation are
    animspeed : 6000, // the delay between each slide
    height        : 150,
    width         : 800,
    responsive    : true,
    randomstart   : false,
    centercontrols: false,
    showmarkers : false,
    hoverpause : true,
    nexttext : '<span class="control-button" title="Next slide">></span>', // Text for 'next' button (can use HTML)
    prevtext : '<span class="control-button" title="Previous slide"><</span>', // Text for 'previous' button (can use HTML)
  });
});

 // end docready
