const stateListenersKey = '_stateListeners';
const propsListenersKey = '_propsListeners';

function addListener(listenersKey, field, callback) {
  if (!this[listenersKey]) {
    this[listenersKey] = {};
  }
  if (!this[listenersKey][field]) {
    this[listenersKey][field] = [];
  }
  this[listenersKey][field].push(callback);
}

function runCallbacks(listenersKey, oldObj, newObj) {
  Object.keys(this[listenersKey] || {}).filter((key) => {
    return oldObj[key] !== newObj[key];
  }).forEach((key) => {
    this[listenersKey][key].forEach((callback) => callback());
  }, this);
}

const ObservableState = {
  listenState (field, callback) {
    addListener.call(this, stateListenersKey, field, callback);
  },
  listenProps (field, callback) {
    addListener.call(this, propsListenersKey, field, callback);
  },
  componentDidUpdate (prevProps, prevState) {
    runCallbacks.call(this, stateListenersKey, prevState || {}, this.state);
    runCallbacks.call(this, propsListenersKey, prevProps || {}, this.props);
  }
};

export default ObservableState;
