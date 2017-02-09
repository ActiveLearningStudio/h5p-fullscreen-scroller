H5P.P2.ProgressDots = (function ($) {

  function Dot(index, cb) {
    var self = this;

    var $dot = $('<div>', {
      'class': 'h5p-p2-dot',
      click: function () {
        cb(index);
      }
    });

    self.toggleActive = function (activate) {
      $dot.toggleClass('active', activate);
    };

    self.getDomElement = function () {
      return $dot;
    };
  }

  function ProgressDots(num) {
    var self = this;
    H5P.EventDispatcher.call(self);

    var dots = [];
    var $dots = [];

    var $dotContainer = $('<div>', {
      'class': 'h5p-p2-dot-wrapper'
    });

    for (var i = 0; i < num; i++) {
      var dot = new Dot(i, function (index) {
        self.trigger('clicked', {index: index});
      });
      dots.push(dot);
      $dots.push(dot.getDomElement());
    }

    $dotContainer.append($dots);

    self.getDomElement = function () {
      return $dotContainer;
    };

    self.setActive = function (index) {
      for (var i = 0; i < dots.length; i++) {
        dots[i].toggleActive(i === index);
      }
    };

    self.setColor = function (color) {
      $dotContainer.css('color', color);
    };
  }

  ProgressDots.prototype = Object.create(H5P.EventDispatcher.prototype);
  ProgressDots.prototype.constructor = ProgressDots;

  return ProgressDots;
})(H5P.jQuery);
