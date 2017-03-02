import { Component } from 'preact';

export default class DelegateElement extends Component {
  componentDidMount() {
    const events = Object.assign({}, this.props);
    delete events.children;

    const { __delegateContainer__ } = this.context;

    __delegateContainer__.addEvents(events, this.base);
  }

  componentWillUnmount() {
    const events = Object.assign({}, this.props);
    delete events.children;

    const { __delegateContainer__ } = this.context;

    __delegateContainer__.removeEvents(events, this.base);
  }

  render({ children }) {
    return children[0];
  }
}