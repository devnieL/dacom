```js
<Checkbox
  id="checkbox-1"
  className="my-checkbox"
  label={'Example'}
/>
```

With a preset value.

```js
<Checkbox
  id="checkbox-2"
  value={true}
  className="my-checkbox"
  label={'Example'}
/>
```

Non editable. By now the `value` should be true.

```js
<Checkbox
  id="checkbox-3"
  value={true}
  editable={false}
  className="my-checkbox"
  label={'Example'}
/>
```

Disabled

```js
<Checkbox
  id="checkbox-3"
  defaultChecked
  disabled={true}
  className="my-checkbox"
  label={'Example'}
/>
```
