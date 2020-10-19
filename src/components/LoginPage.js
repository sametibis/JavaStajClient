import React, { Component } from 'react';
import { login } from '../api/apiCalls';
import Input from './Input';

export default class LoginPage extends Component {
  state = {
    username: null,
    password: null,
    error: null,
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };

  onClick = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const creds = {
      username,
      password,
    };
    this.setState({
      error: null,
    });
    try {
      await login(creds);
    } catch (err) {
      this.setState({
        error: err.response.data.message,
      });
    }
  };

  render() {
    const { username, password, error } = this.state;

    const buttonEnabled = username && password;

    return (
      <div>
        <div className='container'>
          <form>
            <h1 className='text-center'>Login</h1>
            <Input label='User Name' name='username' onChange={this.onChange} />

            <Input
              label='Password'
              name='password'
              type='password'
              onChange={this.onChange}
            />
            {error && (
              <div className='alert alert-danger' role='alert'>
                {error}
              </div>
            )}

            <div className='text-center'>
              <button
                className='btn btn-primary'
                onClick={this.onClick}
                disabled={!buttonEnabled}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
