

```jsx
<Textarea
  className='Textarea'
  style={{ width: '200px', height: '200px'}}
  labelStyles={{
    fontSize: '12px',
    marginBottom: '3px',
    color: '#000'
  }}
  inputStyles={{
    fontSize: '12px',
    color: '#333',
    lineHeight: '12px'
  }}
  onChange={(v) => console.log(v)}
  label="My post"
  placeholder="Write something"
/>
```

Auto height
---

If `autoHeight` is set, then you can set `minHeight` or `maxHeight` in the inputStyles property, just remenber to have the Textarea `height` style as auto.

Without min and max height.
```jsx

<Textarea
  className='Textarea'
  style={{ width: '200px', height: 'auto'}}
  labelStyles={{
    fontSize: '12px',
    marginBottom: '3px',
    color: '#000'
  }}
  inputStyles={{
    fontSize: '12px',
    color: '#333',
    lineHeight: '12px',
    width: '100%'
  }}
  autoHeight
  onChange={(v) => console.log(v)}
  label="My post"
  placeholder="Write something"
/>
```

With min height
```jsx

<Textarea
  className='Textarea'
  style={{ width: '200px', height: 'auto'}}
  labelStyles={{
    fontSize: '12px',
    marginBottom: '3px',
    color: '#000'
  }}
  inputStyles={{
    fontSize: '12px',
    color: '#333',
    lineHeight: '12px',
    width: '100%',
    minHeight: '50px'
  }}
  autoHeight
  onChange={(v) => console.log(v)}
  label="My post"
  placeholder="Write something"
/>
```

With min and max height
```jsx

<Textarea
  className='Textarea'
  style={{ width: '200px', height: 'auto'}}
  labelStyles={{
    fontSize: '12px',
    marginBottom: '3px',
    color: '#000'
  }}
  inputStyles={{
    fontSize: '12px',
    color: '#333',
    lineHeight: '12px',
    width: '100%',
    minHeight: '50px',
    maxHeight: '100px'
  }}
  autoHeight
  onChange={(v) => console.log(v)}
  label="My post"
  placeholder="Write something"
/>
```

If you set a `height` to the Textarea overall component, then the proper value
will be taken as the max heigth to the inner textarea with auto height.
```jsx

<Textarea
  className='Textarea'
  style={{ width: '200px', height: '200px'}}
  labelStyles={{
    fontSize: '12px',
    marginBottom: '3px',
    color: '#000'
  }}
  inputStyles={{
    fontSize: '12px',
    color: '#333',
    lineHeight: '12px',
    width: '100%',
    minHeight: '50px'
  }}
  autoHeight
  onChange={(v) => console.log(v)}
  label="My post"
  placeholder="Write something"
/>
```

Customization
---

##### prefix
A prefix to the input value can be added, this prefix will put it in an absolute position so remember to have the proper space to show it. In this case the prefix is visible because the parent has a padding.

```jsx

<Textarea
  className='Textarea'
  style={{ width: '200px', height: 'auto'}}
  labelStyles={{
    fontSize: '12px',
    marginBottom: '3px',
    color: '#000'
  }}
  inputStyles={{
    fontSize: '12px',
    color: '#333',
    lineHeight: '12px',
    width: '100%',
    minHeight: '50px',
    maxHeight: '100px'
  }}
  prefix='#'
  autoHeight
  onChange={(v) => console.log(v)}
  label="My post"
  placeholder="Write something"
/>
```

##### inputStyles

As seen in the examples, this property is very important for the component, appart from the `minHeight` and `maxHeight` properties, other CSS rules can be applied.


```jsx

<Textarea
  className='Textarea'
  style={{ width: '200px', height: 'auto'}}
  labelStyles={{
    fontSize: '12px',
    marginBottom: '3px',
    color: '#000'
  }}
  inputStyles={{
    fontSize: '12px',
    color: '#13171A',
    lineHeight: '16px',
    padding: '5px',
    width: '100%',
    minHeight: '50px',
    maxHeight: '100px',
    background: '#F3F3F3'
  }}
  prefix='#'
  autoHeight
  onChange={(v) => console.log(v)}
  label="My post"
  placeholder="Write something"
/>
```


##### withLine

There is a line on the inner textarea component, it can be disabled; useful when using some kind of customization on the textarea that can be better without a bottom line.


```jsx

<Textarea
  className='Textarea'
  style={{ width: '200px', height: 'auto'}}
  labelStyles={{
    fontSize: '12px',
    marginBottom: '3px',
    color: '#000'
  }}
  inputStyles={{
    fontSize: '12px',
    color: '#13171A',
    lineHeight: '16px',
    padding: '5px',
    width: '100%',
    minHeight: '50px',
    maxHeight: '100px',
    background: '#F3F3F3'
  }}
  prefix='#'
  autoHeight
  withLine={false}
  onChange={(v) => console.log(v)}
  label="My post"
  placeholder="Write something"
/>
```
