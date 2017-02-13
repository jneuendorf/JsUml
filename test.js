// Generated by CoffeeScript 1.10.0
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.Test = {};

  Test.A = (function() {
    function A() {}

    return A;

  })();

  Test.B = (function(superClass) {
    extend(B, superClass);

    function B() {
      return B.__super__.constructor.apply(this, arguments);
    }

    return B;

  })(Test.A);

  Test.C = (function(superClass) {
    extend(C, superClass);

    function C() {
      return C.__super__.constructor.apply(this, arguments);
    }

    return C;

  })(Test.A);

  Test.D = (function(superClass) {
    extend(D, superClass);

    function D() {
      return D.__super__.constructor.apply(this, arguments);
    }

    return D;

  })(heterarchy.multi(Test.B, Test.C));

  JsUml.generateUml(Test);

}).call(this);
