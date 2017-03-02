'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var preact = require('preact');

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var DelegateContainer = function (_Component) {
  inherits(DelegateContainer, _Component);

  function DelegateContainer() {
    classCallCheck(this, DelegateContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

    _this.events = {};

    _this.onEvent = function (event) {
      var items = _this.events[event.type];

      if (!items) {
        return;
      }

      items.some(function (item) {
        if (item.elem === event.target || item.elem.contains(event.target)) {
          item.handler(event);
          return true;
        }
      });
    };
    return _this;
  }

  DelegateContainer.prototype.getChildContext = function getChildContext() {
    return { __delegateContainer__: this };
  };

  DelegateContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    var _this2 = this;

    Object.keys(this.events).forEach(function (name) {
      _this2.teardownListener(name);
    });

    this.events = {};
  };

  DelegateContainer.prototype.setupListener = function setupListener(name) {
    this.base.addEventListener(name, this.onEvent, true);
  };

  DelegateContainer.prototype.teardownListener = function teardownListener(name) {
    this.base.removeEventListener(name, this.onEvent, true);
  };

  DelegateContainer.prototype.addEvents = function addEvents(events, base) {
    var _this3 = this;

    Object.keys(events).forEach(function (name) {
      if (!_this3.events[name]) {
        _this3.events[name] = [];
        _this3.setupListener(name);
      }

      _this3.events[name].push({
        handler: events[name],
        elem: base
      });
    });
  };

  DelegateContainer.prototype.removeEvents = function removeEvents(events, base) {
    var _this4 = this;

    Object.keys(events).forEach(function (name) {
      var items = _this4.events[name];
      var handler = events[name];

      if (!items) {
        return;
      }

      var index = items.findIndex(function (item) {
        return item.base === base /*&& item.handler === handler*/;
      });

      if (!index !== -1) {
        items.splice(index, 1);
      }

      if (!items.length) {
        _this4.events[name] = null;
        _this4.teardownListener(name);
      }
    });
  };

  DelegateContainer.prototype.render = function render(_ref) {
    var children = _ref.children;

    return children[0];
  };

  return DelegateContainer;
}(preact.Component);

var DelegateElement = function (_Component) {
  inherits(DelegateElement, _Component);

  function DelegateElement() {
    classCallCheck(this, DelegateElement);
    return possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  DelegateElement.prototype.componentDidMount = function componentDidMount() {
    var events = Object.assign({}, this.props);
    delete events.children;

    var __delegateContainer__ = this.context.__delegateContainer__;


    __delegateContainer__.addEvents(events, this.base);
  };

  DelegateElement.prototype.componentWillUnmount = function componentWillUnmount() {
    var events = Object.assign({}, this.props);
    delete events.children;

    var __delegateContainer__ = this.context.__delegateContainer__;


    __delegateContainer__.removeEvents(events, this.base);
  };

  DelegateElement.prototype.render = function render(_ref) {
    var children = _ref.children;

    return children[0];
  };

  return DelegateElement;
}(preact.Component);

exports.DelegateContainer = DelegateContainer;
exports.DelegateElement = DelegateElement;
