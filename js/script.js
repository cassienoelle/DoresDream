"use strict";


$(document).ready(function() {
  let imgfp = 'imgs/';

  // modal options
  $('#sub-modal').modal({
    closeExisting: false
  });

  $('video').height($('video').width() * 0.418);

  loadStories();

  function loadStories() {
    console.log('call loadStories()');
    $.getJSON('data/stories.json', function( data ) {
      console.log('getJSON');
      let grid = $('.grid');
      let modals = $('.modals');
      for (let i = 0 ; i < data.length; i++) {
        console.log('iterate data');

        (() => {
          for (let j = 0; j < data[i].imgs.length; j++) {
            let gridItem = $('<div/>', {
                class : 'grid-item'
              }).appendTo(grid);
            let link = $('<a/>', {
                href : '#' + data[i].id,
                rel : 'modal:open'
              }).appendTo(gridItem);
            if (data[i].id.startsWith('TXT')) {

            }
            let img = $('<img />', {
                src : imgfp + data[i].imgs[j].url
              }).appendTo(link);
            }
        })();

        (() => {
          let modal = $('<div/>', {
              class : 'modal',
              id : data[i].id
            }).appendTo(modals);
          let mStory = $('<div/>', {
              class : 'modal-story'
            }).appendTo(modal);
          let mTxt = $('<div/>', {
              class : 'modal-text'
            }).appendTo(mStory);
          generateForm(data[i].id).appendTo(mStory);
          let mCon = $('<div/>', {
              class : 'modal-imgs'
            }).appendTo(modal);

          for (let j = 0; j < data[i].imgs.length; j++) {
            let fig = $('<figure/>', {
                class : 'modal-img'
              }).appendTo(mCon);
            let img = $('<img />', {
                src : imgfp + data[i].imgs[j].url
              }).appendTo(fig);
            let figCap = $('<figCaption/>', {
                text: data[i].imgs[j].caption
              }).appendTo(fig);
          }


          let title = $('<h2/>', {
              class : 'mt mt-h2',
              text : data[i].title
            }).appendTo(mTxt);
          let blurb = $("<p/>", {
              class : 'mt mt-p',
              text : data[i].blurb
            }).appendTo(mTxt);
          // for (let j = 0; j < data[i].sources.length; j++) {
          //
          // }
        })();
      }
    }).done(function() {
    // init Isotope
      let $grid = $('.grid').isotope({
        layoutMode: 'masonry',
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
          columnWidth: '.grid-sizer',
        }
      });

      $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
        console.log('layout');
      });
  });
  }

  // function generateSources(source) {
  //   let link = $('<a/>', {
  //     href = source
  //   });
  //   let span = $('<span/>', {
  //     class = 'source'
  //   }).appendTo(link);
  //
  //   return link;
  // }

  function generateForm(id) {
    let container = $('<div/>', {class : 'modal-form'});
    let txt = $('<p/>', {
      class : 'cmt-txt',
      text: 'Do you have thoughts or experiences relating to this story? Share them here and join our storytelling community.'
    }).appendTo(container);
    let form = $('<form />', {
      id : id,
      action : ' '
    }).appendTo(container);
    let name = $('<input />', {
      class : 'mf mf-c',
      type : 'text',
      id : 'name-' + id,
      name : 'name-' + id,
      placeholder : 'Name (Can Be Anonymous)...'
    }).appendTo(form);
    let content = $('<textarea />', {
      class : 'mf mf-c mf-ce',
      id : 'cont-' + id,
      name : 'cont-' + id,
      placeholder : 'Your Comment Or Experience...'
    }).appendTo(form);
    let submit = $('<input />', {
      class : 'mf mf-b',
      type : 'submit',
      value : 'submit'
    }).appendTo(form);

    return container;
  }

});
