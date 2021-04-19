"use strict";


$(document).ready(function() {
  // init Isotope
  let $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      columnWidth: '.grid-sizer'
    }
  });

  // layout Isotope after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.isotope('layout');
  });

  // let $textBox = $('.text-box');
  // $textBox.height($textBox.width());


});
