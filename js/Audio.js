TM.Audio = (function() {
  var r = TM.Utils.randInt;

  var settings = {
    earth : {
      max : 1,
      data : [
        [3,0.14,0.35,0.18,0.62,0.12,,,0.3,0.49,,-0.4599,,,-0.7,0.1839,-0.48,-0.7576,0.22,0.34,0.48,0.56,0.04,0.5]
      ]
    },

    water : {
      max : 1,
      data : [
        [2,0.11,0.38,0.25,0.87,0.3,,0.0397,0.6799,0.0495,0.0062,0.6,0.0332,,0.56,0.2,-0.06,0.6,0.87,-0.4399,0.17,0.14,-0.6,0.5]
      ]
    },

    air : {
      max : 1,
      data : [
        [3,0.2,0.0505,0.1809,0.5,0.41,,-0.0108,0.002,-0.0133,,0.2719,0.509,0.9626,-0.0969,-0.5361,0.0753,0.1552,0.9993,-0.0002,0.6453,,0.2999,0.5]
      ]
    },

    fire : {
      max : 1,
      data : [
        [3,,0.2477,0.4477,0.34,0.223,,-0.2666,,,,,,,,,,,1,,,,,0.5]
      ]
    },

    lasher : {
      max : 1,
      data : [
        [1,0.0331,0.2341,0.3025,0.293,0.5057,,0.3536,-0.6702,,,-0.6175,,,-0.047,0.5549,0.0015,0.3833,0.285,,-0.6082,0.0111,0.2431,0.5]
      ]
    },

    imp : {
      max : 1,
      data : [3,,0.2477,0.4477,0.34,0.223,,-0.2666,,,,,,,,,,,1,,,,,0.5]
    },

    banshee : {
      max : 1,
      data : [
        [0,0.4,0.01,0.02,0.2699,0.5604,,0.1673,,,,,,0.2157,0.02,0.72,-0.0799,-0.86,0.9174,,,,,0.5]
      ]
    },

    frostgiant : {
      max : 1,
      data : [
        [2,,0.049,0.2173,0.5542,0.5711,,-0.1999,-0.0045,0.0213,0.7235,-0.0938,0.2236,,0.4777,0.867,0.1158,0.7062,0.7015,0.2018,0.4116,0.0692,0.0036,0.5]
      ]
    },

    thud : {
      max : 1,
      data : [
        [3,0.0122,0.1754,0.0444,0.183,0.438,0.0156,-0.492,0.0906,,0.03,0.0314,0.1224,0.0381,0.053,0.083,0.1109,-0.0124,1,0.1502,0.1029,0.167,-0.1358,0.5]
      ]
    }
  };

  function Sound(settings) {
    var _this = this, sound;

    this.max = settings.max;
    this.tick = 0;
    this.pool = [];

    settings.data.forEach(function(item, index) {
      sound = new Audio();
      sound.src = jsfxr(item);
      sound.loop = settings.loop || false;
      _this.pool.push(sound);
    });
  }

  var _Audio = {
    sounds : {},

    init : function() {
      var i;

      for (i in settings) {
        if (settings.hasOwnProperty(i)) {
          this.sounds[i] = new Sound(settings[i]);
        }
      }
    },

    play : function(sound) {
      var sound = this.sounds[sound],
          data = sound.pool[0];

      if (data) data.play();
      sound.tick = (sound.tick < sound.max - 1) ? sound.tick + 1 : 0;
    }
  };

  return _Audio;

})();
