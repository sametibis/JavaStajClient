import React, { Component } from 'react';
import { login } from '../api/apiCalls';
import Input from './Input';

export default class LoginPage extends Component {
  state = {
    userName: null,
    password: null,
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onClick = (e) => {
    e.preventDefault();
    const { userName, password } = this.state;
    const creds = {
      userName,
      password,
    };
    login(creds);
  };

  render() {
    return (
      <div>
        <div className='container'>
          <form>
            <h1 className='text-center'>Login</h1>
            <Input label='User Name' name='userName' onChange={this.onChange} />
            <Input
              label='Password'
              name='password'
              type='password'
              onChange={this.onChange}
            />
            <div className='text-center'>
              <button className='btn btn-primary' onClick={this.onClick}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
