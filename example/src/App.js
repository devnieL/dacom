import React, { Component } from 'react';
import {Input, Textarea} from 'dacom';
import './App.css';

export default class App extends Component {
  render () {
    return (
      <div>
        <Input />

        <Textarea
          className='Textarea'
          style={{ width: '200px', height: '200px', marginLeft: '100px'}}
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
          value={'Daniel Flores'}
          multiline
          label="Company name"
          placeholder="Type in company name"
        />

      </div>
    )
  }
}
