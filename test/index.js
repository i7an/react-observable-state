import {renderIntoDocument} from 'react-addons-test-utils';
import ObservableState from '../src/index';
import React from 'react';

let onStateChange;
let onPropChange;

const TestComponent = React.createClass({
  mixins: [ObservableState],
  componentDidMount () {
    this.listenState('a', onStateChange);
    this.listenProps('b', onPropChange);
  },
  render () {
    return <div></div>;
  }
});

describe('Component with ObservableState mixin', () => {
  beforeEach(() => {
    onStateChange = jest.fn(() => true);
    onPropChange = jest.fn(() => true);
  }),

  it ('can be instantiated', () => {
    expect(() => {
      renderIntoDocument(<TestComponent />);
    }).not.toThrow();
  }),
  it ('listens state', () => {
    const component = renderIntoDocument(<TestComponent />);
    component.setState({a: 1});
    expect(onStateChange).toBeCalled();
    expect(onPropChange).not.toBeCalled();
  }),
  it ('does not listens other state', () => {
    const component = renderIntoDocument(<TestComponent />);
    component.setState({b: 1});
    expect(onStateChange).not.toBeCalled();
    expect(onPropChange).not.toBeCalled();
  })
});
