# preact-delegate

Delegate DOM events with Preact (since Preact doesn't do that by default)

## Install

```sh
npm install preact-delegate --save-dev
```

## Usage

Just wrap your root element from where to capture events with `DelegateContainer` and then wrap individual elements which should receive events with `DelegateElement`. See example:

```js
import { DelegateContainer, DelegateElement } from 'preact-delegate';

class MyComponent extends preact.Component {
  constructor(...args) {
    super(...args);

    this.onClick = (e) => {
      console.log(e.target);
    };
  }

  render({ items }) {
    return <DelegateContainer>
      <div class="my-component">
        {items.map(item => (
          <div class="my-item">
            <DelegateElement click={this.onClick}>
              <button type="button" class="my-button">{ item.text }</button>
            </DelegateElement>
          </div>
        ))}
      </div>
    </DelegateContainer>
  }
}
```

# LICENSE

[MIT](LICEMSE.md)