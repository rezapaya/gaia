'use strict';

var FixedHeader = (function FixedHeader() {

  var selector;
  var view;
  var fixedContainer;
  var currentlyFixed;
  var previousOffset = 0;

  var init = function init(scrollView, container, select) {
    selector = select;
    view = document.querySelector(scrollView);
    fixedContainer = document.querySelector(container);
    view.addEventListener('scroll', scrolling);
  };

  var scrolling = function scrolling() {
    var headings = document.querySelectorAll(selector);
    var currentScroll = view.scrollTop;
    for (var i = headings.length - 1; i >= 0; i--) {
      var currentHeader = headings[i];
      var headingPosition = currentHeader.offsetTop;
      var offset = headingPosition - currentScroll;
      var currentHeight = currentHeader.offsetHeight;
      var differentHeaders = currentlyFixed != currentHeader;

      // Switching Header
      if (offset <= 0) {
        if (differentHeaders) {
          currentlyFixed = currentHeader;
          fixedContainer.style.display = 'block';
          var background = '-moz-element(#' + currentHeader.id + ')';
          fixedContainer.style.backgroundImage = background;
        }
        return;
      }
    }
    currentlyFixed = null;
    fixedContainer.style.display = 'none';
  };

  var stop = function stop() {
    view.removeEventListener('scroll', scrolling);
  };

  return {
    'init': init,
    'stop': stop
  };
})();
