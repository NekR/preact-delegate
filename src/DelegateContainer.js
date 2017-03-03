import { Component } from 'preact';

export default class DelegateContainer extends Component {
  constructor(...args) {
    super(...args);

    this.events = {};

    this.onEvent = (event) => {
      const items = this.events[event.type];

      if (!items) {
        return;
      }

      items.some(item => {
        if (item.elem === event.target || item.elem.contains(event.target)) {
          item.handler(event);
          return true;
        }
      });
    }
  }

  getChildContext() {
    return { __delegateContainer__: this };
  }

  componentWillUnmount() {
    Object.keys(this.events).forEach(name => {
      this.teardownListener(name);
    });

    this.events = {};
  }

  setupListener(name) {
    this.base.addEventListener(name, this.onEvent, true);
  }

  teardownListener(name) {
    this.base.removeEventListener(name, this.onEvent, true);
  }

  addEvents(events, base) {
    Object.keys(events).forEach(name => {
      if (!this.events[name]) {
        this.events[name] = [];
        this.setupListener(name);
      }

      this.events[name].push({
        handler: events[name],
        elem: base
      });
    });
  }

  removeEvents(events, base) {
    Object.keys(events).forEach(name => {
      const items = this.events[name];
      const handler = events[name];

      if (!items) {
        return;
      }

      let index = -1;

      items.some((item, i) => {
        if (item.base === base /*&& item.handler === handler*/) {
          index = i;
          return true;
        }
      });

      if (index !== -1) {
        items.splice(index, 1);
      }

      if (!items.length) {
        this.events[name] = null;
        this.teardownListener(name);
      }
    });
  }

  render({ children }) {
    return children[0];
  }
}