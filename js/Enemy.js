TM.Enemy = (function() {
  var r = TM.Utils.rand;

  var settings = [
    {
      name : 'lasher',
      spell : 'earth',
      weakTo : 'air'
    },
    {
      name : 'imp',
      spell : 'fire',
      weakTo : 'water'
    },
    {
      name : 'banshee',
      spell : 'air',
      weakTo : 'earth'
    },
    {
      name : 'frostgiant',
      spell : 'water',
      weakTo : 'fire'
    }/*,
    {
      name : 'tribble',
      spell : 'cuteness'
    }*/
  ];

  function Enemy(o) {
    this.fov = 60;
    this.depth = o.depth;
    this.step = 0.5;
    this.stepTimer = 0;

    this.x = 0;
    this.y = 0;
    this.z = this.depth;

    this.type = r(0, settings.length - 1);
    this.name = settings[this.type].name;
    this.spell = settings[this.type].spell;
    this.weakTo = settings[this.type].weakTo;

    this.level = o.level;
    this.baseHealth = 20;
    this.health = /*this.level * */20;
    this.strength = /*this.level * */20;

    this.image = TM.images['e_' + this.name];
    this.w = this.image.width;
    this.h = this.image.height;
    this.attacking = false;
    this.dead = false;
  }

  Enemy.prototype.drawHealthMeter = function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(1, 1, 20, 4);
    ctx.fillStyle = 'black';
    ctx.fillRect(2, 2, 18, 2);
    ctx.fillStyle = 'red';
    ctx.fillRect(2, 2, 18 * (this.health / this.baseHealth), 2);
  };

  Enemy.prototype.hit = function(o, callback) {
    var base = 1, damage = 0, text = '';

    if (o.spell === this.spell) {
      base = 0;
      text = '-IMMUNE-';
    } else if (o.spell === this.weakTo) {
      base = 2;
      text = 'CRIT!';
    }

    damage = base * o.strength; // * level multiplier

    this.health -= damage;
    callback('-' + damage + ' ' + text);
  };

  Enemy.prototype.update = function(vel, seconds) {
    // position update
    this.stepTimer += seconds;
    if (this.stepTimer > this.step) {
      this.z -= vel * seconds;
      this.stepTimer = 0;
    }

    // dead?
    if (this.health <= 0) this.dead = true;
  };

  Enemy.prototype.render = function(sw, sh) {
    var scale = this.fov / (this.fov + this.z);

    var x = (this.x * scale) + (sw / 2);
    var y = (this.y * scale) + (sh / 2);

    if (!this.dead) {
      // health meter
      this.drawHealthMeter();

      // sprite
      ctx.drawImage(this.image, x - (this.w * scale) / 2, y - (this.h * scale) / 2, this.w * scale, this.h * scale);
    } else {

    }
  };

  return Enemy;

})();