H5P.P2 = (function ($) {
  'use strict';

  function P2(options, contentId){
    var self = this;

    // Data pages:
    var pages = [];

    // DOM pages:
    var $pages = [];

    var $presentation = $('<div>', {
      'class': 'h5p-p2-presentation'
    });

    var $wrapper = $('<div>', {
      'class': 'h5p-p2-wrapper'
    });

    var $smallScreen = $('<div>', {
      'class': 'h5p-p2-small-screen'
    }).append($('<div>', {
      'class': 'h5p-p2-small-screen-title',
      text: options.title
    }));

    var $loadingScreen = $('<div>', {
      'class': 'h5p-p2-loading-page'
    }).append($('<div>', {
      'class': 'h5p-p2-loading-icon'
    }));

    var progressDots = new H5P.P2.ProgressDots(options.pages.length);
    progressDots.on('clicked', function (event) {
      $.fn.fullpage.moveTo(event.data.index+1);
    });

    var $startButton = H5P.JoubelUI.createButton({
      'class': 'h5p-p2-start-button',
      html: 'Show Content', // TODO translate
      on: {
        click: function () {
          startPresentation();
        }
      }
    }).appendTo($smallScreen);

    var $closeButton = $('<div>', {
      'class': 'h5p-p2-close-button',
      click: function () {
        H5P.exitFullScreen();
      }
    });

    for (var i = 0; i < options.pages.length; i++) {
      var el = new H5P.P2.Page(options.pages[i], contentId, i);
      var $page = el.getDomElement();

      el.on('clicked', function (event) {
        $.fn.fullpage.moveTo(event.data.index+2);
      });

      $pages.push($page);
      pages.push(el);
    }

    var initPresentation = function () {
      $wrapper.fullpage({
        onLeave: function(index, nextIndex, direction) {
          $pages[index-1].removeClass('fadein')
          pages[nextIndex-1].setActive();
          progressDots.setActive(nextIndex-1);
          var color = pages[nextIndex-1].getForegroundColor();
          progressDots.setColor(color);
          $closeButton.css('color', color);
        },
        afterRender: function () {
          setTimeout (function () {
            $pages[0].addClass('fadein');
            progressDots.setActive(0);
            // Resize pages
            resize();
          }, 0);
        }
      });

      //leavePresentation();
      $('html, body').css('overflow', 'visible');
    };

    var leavePresentation = function () {
      self.$container.removeClass('h5p-p2-loaded');
      $('html, body').css('overflow', 'visible');
    };

    var resize = function () {
      var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

      var isPortrait = height/width > 1.5;
      var isLandscape = false; //width/height > 1.5;

      self.$container.toggleClass('h5p-p2-portrait', isPortrait);
      // self.$container.toggleClass('h5p-p2-landscape', isLandscape);

      var layout = isPortrait ? 'portrait' : (isLandscape ? 'landscape' : undefined);

      /*for (var i = 0; i < pages.length; i++) {
        pages[i].toggleLayout(layout);
      }*/
    };

    var startPresentation = function () {
      $('html, body').css('overflow', 'hidden');

      self.$container.addClass('h5p-p2-loading');
      $.fn.fullpage.moveTo(1);
      if (!options.settings.initialFullscreen && options.settings.realFullscreen) {
        H5P.fullScreen(self.$container, self, leavePresentation);
      }
      else {
        H5P.semiFullScreen(self.$container, self, leavePresentation);
      }

      setTimeout(function () {
        self.$container.removeClass('h5p-p2-loading').addClass('h5p-p2-loaded');
        resize();
      }, 1000);
    };

    self.attach = function ($container) {
      self.$container = $container;

      self.$container.css({
        'z-index': options.settings.zIndex
      });

      $wrapper.append($pages);
      $presentation.append($wrapper);
      if (options.settings.showNavigation) {
        $presentation.append(progressDots.getDomElement());
      }
      $presentation.append($closeButton);
      $container.append($presentation);
      $container.append($smallScreen);
      $container.append($loadingScreen);
      $loadingScreen.css({
        'color': pages[0].getForegroundColor(),
        'background': pages[0].getBackgroundColor(),
      });

      initPresentation();

      if (options.settings.initialFullscreen) {
        startPresentation();
      }

      self.on('resize', resize);
    };
  }

  /**
   * Adds Open Sans font from google
   */
  window.WebFontConfig = {
    google: { families: [ 'Open+Sans:300,800' ] }
  };
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);

  return P2;
})(H5P.jQuery);
