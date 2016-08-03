React Observable State
=============

```js
npm install --save react-observable-state
```

Experimental mixin that gives a simple way to listen for props or state changes.

```js
React.createClass({
  componentDidMount() {
    this.listenState('selectedItem', this.reloadSomeList);
  },
  reloadSomeList() {
    // reload
  },
  render() {
    return (
      <div>
        <CollectionView selectedItem={tis.state.selectedItem}
                        collection={this.state.collection} />
        <CollectionView selectedItem={tis.state.someSelectedItem}
                        collection={this.state.someCollection} />
      </div>
    );
  }
});
```
