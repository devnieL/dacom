import React, { Component } from 'react';
import {Input, Textarea, Checkbox} from 'dacom';
import './App.css';

export default class App extends Component {
  render () {
    return (
      <div>
        <Input />

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
            height: '200px'
          }}
          onChange={(v) => console.log(v)}
          value={'Daniel Flores'}
          label="Company name"
          placeholder="Type in company name"
        />

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
          value={'Daniel Flores'}
          label="Company name"
          placeholder="Type in company name"
        />

        <Checkbox
          id="checkbox-attachment"
          defaultChecked
          className="ModalShareTemplate-attachment-checkbox"
          labelText={'xxx'}
          hideLabel={false}
          wrapperClassName=""
        />

      </div>
    )
  }
}
