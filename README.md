# dacom

> DA components

[![NPM](https://img.shields.io/npm/v/dacom.svg)](https://www.npmjs.com/package/dacom) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Docs & Examples:

https://devniel.github.io/dacom/

## Local install

1. Clone the project
2. Go to the project directory
3. Link it to NPM

```bash
npm link
```

4. Go to your app directory
5. Link Dacom using NPM

```bash
npm link dacom
```

## Coming soon

```bash
npm install --save dacom
```

## Usage

```jsx
import React, { Component } from 'react'

import {Input} from 'dacom'

class Post extends Component {
  render () {
    return (
      <Input />
    )
  }
}
```

Created with https://github.com/transitive-bullshit/create-react-library
