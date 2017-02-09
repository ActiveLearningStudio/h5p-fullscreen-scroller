H5P.P2.Element = (function ($) {
  function Element(options, contentId) {
    var self = this;
    H5P.EventDispatcher.call(self);

    var $element = $('<div>', {
      'class': 'h5p-p2-element',
      css: {
        backgroundColor: options.visuals.backgroundColor,
        color: options.visuals.foregroundColor
      }
    });

    var $inner = $('<div>', {
      'class': 'h5p-p2-element-inner'
    }).appendTo($element);

    if (options.image) {
      var $image = $('<img>', {
        'class': 'h5p-p2-element-image',
        src: H5P.getPath(options.image.path, contentId),
        css: {
          height: options.imageMaxWidth ? options.imageMaxWidth + 'vmin' : undefined
        }
      }).appendTo($inner);
    }

    if (options.title) {
      var $title = $('<div>', {
        'class': 'h5p-p2-element-title',
        text: options.title
      }).appendTo($inner);
    }

    if (options.description) {
      $inner.append($('<div>', {
        'class': 'h5p-p2-element-description',
        html: options.description
      }));
    }

    if (options.link && options.link.url && options.link.title) {

      var $link = $('<a>', {
        'class': 'h5p-p2-element-anchor',
        href: options.link.url.protocol + options.link.url.url,
        text: options.link.title,
        target: 'blank',
        css: {
          backgroundColor: options.visuals.backgroundColor,
          color: options.visuals.foregroundColor,
          borderColor: options.visuals.foregroundColor
        }
      }).hover(
        function () {
          $(this).css ({
            backgroundColor: options.visuals.foregroundColor,
            color: options.visuals.backgroundColor,
            borderColor: options.visuals.backgroundColor
          });
        },
        function () {
          $(this).css({
            backgroundColor: options.visuals.backgroundColor,
            color: options.visuals.foregroundColor,
            borderColor: options.visuals.foregroundColor
          });
        }
      );

      $inner.append($('<div>', {
        'class': 'h5p-p2-element-link'
      }).append($link));
    }

    self.getDomElement = function () {
      return $element;
    };

    self.toggleLayout = function (type) {

      console.log(type);

      var maxWidth = options.imageMaxWidth || undefined;
      if (type === 'landscape') {
        maxWidth = 45;
      }
      //$image.css('maxWidth', maxWidth ? maxWidth + '%' : undefined);
    }
  }

  Element.prototype = Object.create(H5P.EventDispatcher.prototype);
  Element.prototype.constructor = Element;

  return Element;
})(H5P.jQuery);
