```jsx
const Utils = require('./../../utils');

<Textarea
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
