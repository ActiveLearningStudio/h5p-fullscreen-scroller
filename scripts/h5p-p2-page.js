H5P.P2.Page = (function ($) {
  function Page(options, contentId, index) {
    var self = this;
    H5P.EventDispatcher.call(self);
    var elements = [];
    var isSinglePage = options.length === 1;

    var $page = $('<div>', {
      'class': 'h5p-p2-page section ' + (isSinglePage ? 'single-page' : 'double-page')
    });

    self.getDomElement = function () {
      return $page;
    };

    self.setActive = function () {
      $page.addClass('fadein');
    };

    self.getForegroundColor = function () {
      return options[options.length-1].visuals.foregroundColor;
    };

    self.getBackgroundColor = function () {
      return options[options.length-1].visuals.backgroundColor;
    };

    self.toggleLayout = function (type) {

      for (var i = 0; i < elements.length; i++) {
        elements[i].toggleLayout(type);
      }
    };

    var $inner = $('<div>', {
      'class': 'h5p-p2-inner'
    }).appendTo($page);


    for (var i = 0; i < options.length; i++) {
      var element = new H5P.P2.Element(options[i], contentId);
      elements.push(element);
      $inner.append(element.getDomElement());
    }

    if (index === 0) {
      // If first page, add some stuff:
      $inner.append($('<div>', {
        'class': 'h5p-p2-element-mouse'
      }));
    }

    // Add down arrow
    $inner.append($('<div>', {
      'class': 'h5p-p2-element-arrow',
      click: function () {
        self.trigger('clicked', {index: index});
      },
      css: {
        color: self.getForegroundColor()
      }
    }));
  }

  Page.prototype = Object.create(H5P.EventDispatcher.prototype);
  Page.prototype.constructor = Page;

  return Page;
})(H5P.jQuery);
