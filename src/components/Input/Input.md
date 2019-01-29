
Types
---

#### Text
The default type of the component

```js
<Input type='text'/>
{/* or <Input /> */}
```

#### Number


```js
const Utils = require('./../../utils').default;

<Input
  type='number'
  unit='$'
  label='Price'
  value={10}
  onChange={(v) => console.log(v)}
  labelPosition='bottom'
/>
```

Customization
---

#### Label position

- Label at **top**
```js
<Input
  type='text'
  label='First name'
  placeholder='Your first name'
  labelPosition='top'
/>
```

- Label at **bottom**
```js
<Input
  type='text'
  label='Last name'
  placeholder='Your last name'
  labelPosition='bottom'
/>
```

#### Custom prefix


```js
<Input
  type='text'
  label='First goal'
  labelPosition='bottom'
  placeholder="What's your first goal?"
  prefix='1.'
/>
```

```js
<Input
  type='number'
  label='Price'
  labelPosition='bottom'
  prefix='$'
/>
```

#### CSS Styles

```js
<Input
  labelStyles={{
    fontSize: '12px',
    marginBottom: '3px',
  }}
  inputStyles={{
    fontSize: '60px',
    color: '#333',
    lineHeight: '60px',
  }}
  onChange={(v) => console.log(v)}
  value={'Daniel Flores'}
  className="OpportunityPage-Header-CompanyName"
  label="Company name"
  placeholder="Type in company name"
/>
```

