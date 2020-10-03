var e, nicoJS;

nicoJS = (function() {
  function nicoJS(params) {
    this.version = '1.1.8';
    this.timer = null;
    this.interval = null;
    this.fps = 1000 / 30;
    this.step = 2 * 1000;
    this.comments = [];
    this.app = params.app;
    this.font_size = params.font_size || 50;
    this.color = params.color || '#fff';
    this.width = params.width || 500;
    this.height = params.height || 300;
    this.render();
  }

  nicoJS.prototype.render = function() {
    this.app.style.whiteSpace = 'nowrap';
    this.app.style.overflow = 'hidden';
    this.app.style.position = 'relative';
    this.app.style.width = this.width + 'px';
    return this.app.style.height = this.height + 'px';
  };

  nicoJS.prototype.resize = function(width, height) {
    this.width = width;
    this.height = height;
    this.app.style.width = this.width + 'px';
    return this.app.style.height = this.height + 'px';
  };

  nicoJS.prototype.send = function(text, color, font_size) {
    var ele, x, y;
    font_size = font_size || this.font_size;
    color = color || this.color;
    text = text || '';
    x = Math.random() * (this.width - this.font_size);
    y = this.height;
    ele = document.createElement('div');
    ele.innerHTML = text;
    ele.style.position = 'absolute';
    ele.style.left = x + 'px';
    ele.style.top = y + 'px';
    // ele.style.top = 0 + 'px';
    ele.style.fontSize = font_size + 'px';
    ele.style.color = color;
    this.app.appendChild(ele);
    return this.comments.push({
      ele: ele,
      x: x,
      y: y
    });
  };

  nicoJS.prototype.flow = function() {
    var end, i, j, len, ref, results;
    len = this.comments.length;
    end = -200
    results = [];
    for (i = j = 0, ref = len; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      if (this.comments[i].y > end) {
        this.comments[i].y -= 3;
        results.push(this.comments[i].ele.style.top = this.comments[i].y + 'px');
      } else {
        results.push(void 0);
          try {
            this.app.removeChild(this.comments[i].ele);
          }
          catch (e) {
            
          }
      }
    }
    return results;
  };

  nicoJS.prototype.listen = function() {
    this.stop();
    return this.timer = setInterval((function(_this) {
      return function() {
        return _this.flow();
      };
    })(this), this.fps);
  };

  nicoJS.prototype.loop = function(comments) {
    var i, len;
    i = 0;
    len = comments.length;
    this.listen();
    this.send(comments[i++]);
    return this.interval = setInterval((function(_this) {
      return function() {
        if (len < i) {
          i = 0;
        }
        return _this.send(comments[i++]);
      };
    })(this), this.step);
  };

  nicoJS.prototype.stop = function() {
    clearInterval(this.timer);
    return clearInterval(this.interval);
  };

  return nicoJS;

})();

try {
  module.exports = nicoJS;
} catch (_error) {
  e = _error;
}