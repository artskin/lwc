# Authoring Format - Discussion 1

## Important Pieces

* public methods -> decorated with @api
* public attributes -> decorate with @attribute or via `static attributes` definition
* private fields -> language (for now, we will stay away until formalized by Ecma)
* template attributes -> anything available in the component instance (this.<something>), no signal is needed.

## Example

```js
export default class {
    constructor() {

    }
    privateSecret = 1;

    // template attributes
    foo = 1;
    onClick(e) {}
    doSomething() {
        this.focus(); // static error
    }

    // public attributes
    @attribute({ type: AuraType.Component, required: true })
    bar = 2;

    // public methods
    @api focus(abs: Event, xyz: Function) {}

    static attributes = {
        bar: AuraTypes.Boolean.required
    }

    // We don't like this, we think that we can add an extractor that runs before the type checks, and store
    // info in memory per component, per method, and then adds the assertions during the regular babel transformation
    // static methods = {
    //     focus: [Event, Function]
    // }
}
```

### `static` versus `@attribute`

`static` is definitely simpler to implement, it is what react uses today, but `@attribute()` seems more ergonomic, but might have some performance implications, a prototype is needed.

## References

* Accessing references from another component is only allowed via a proxy. In the following example, component `baz` attempts access a component reference foo, which correspond to an instance of `foo` that it creates inside its markup via `<foo bar.bind="something" />`:

```js
let foo = this.getRef('foo');
```

`foo` will be a proxy to a component instance of "foo", this proxy will only expose decorated attributes and methods. Also, in dev mode, it will enforce the api via assertions, and in prod it will just whitelist them. This aligns with the principles behind locker service as well.