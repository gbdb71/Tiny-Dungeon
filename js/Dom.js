TM.Dom = (function(w, d) {
  var utils = TM.Utils,
      input = TM.Input,
      game = TM.Game;

  var pressed = false,
      touch = !!('ontouchstart' in window);

  function getClientPos(e, maxTouches) {
    var x, y;

    if (touch && e.touches) {
      if (e.touches.length > maxTouches) return;
      x = e[maxTouches ? 'touches' : 'changedTouches'][0].clientX;
      y = e[maxTouches ? 'touches' : 'changedTouches'][0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }

    return { x : x, y : y };
  }


  var Dom = {
    init : function() {
      var _this = this;

      this.bind(d, 'DOMContentLoaded', utils.loadAllAssets.call(utils));
      this.bind(d, 'imagesLoaded', game.init);
      this.bind(d, 'gameReady', game.ready);
      this.bind(d, 'gameEnd', game.end);

      this.bind(d, 'mousedown touchstart', function(e) {
        var p = getClientPos(e, 1);

        if (TM.currentScreen === 'title') {
          input.trigger('start');
          return;
        }

        if (TM.currentScreen !== 'game') return;
        input.trigger('firstInChain', { x : p.x, y : p.y });
        pressed = true;
        e.preventDefault();
      });

      this.bind(d, 'mousemove touchmove', function(e) {
        var p = getClientPos(e, 1);

        if (TM.currentScreen !== 'game') return;
        if (pressed) input.trigger('nextInChain', { x : p.x, y : p.y });
        e.preventDefault();
      });

      this.bind(d, 'mouseup touchend', function(e) {
        var p = getClientPos(e, 0);

        if (TM.currentScreen !== 'game') return;
        input.trigger('lastInChain', { x : p.x, y : p.y });
        pressed = false;
        e.preventDefault();
      });

      this.bind($('.tweet'), 'mousedown touchstart', function(e) {
        // http://js13kgames.com/entries/tiny-dungeon
        // console.log(this);
        e.preventDefault();
      });

      this.bind($('.share'), 'mousedown touchstart', function(e) {
        // console.log(this);
        e.preventDefault();
      });

      this.bind($('.again'), 'mousedown touchstart', function(e) {
        input.trigger('start');
        e.preventDefault();
      });

      (function pageVisibility() {
        var prefixes = ['webkit', 'moz', 'ms', ''];

        prefixes.forEach(function(prefix, index) {
          if (prefix + 'Hidden' in d) {
            _this.bind(d, prefix + 'visibilitychange', function(e) {
              input.trigger('pause', !!(d[prefix + 'Hidden']));
            });
          }
        });
      })();
    },

    // bind dom events
    bind : function(el, event, handler) {
      if (typeof el === 'string') el = $(el);
      if (event.indexOf(' ') >= 0) {
        event = event.split(' ');
      } else {
        event = [event];
      }

      // bind dom events
      event.forEach(function(e) {
        el.addEventListener(e, handler, false)
      });
    }
  };

  Dom.init();
  return Dom;

})(window, document);