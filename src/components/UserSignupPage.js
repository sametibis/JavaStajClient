import React from 'react';
import { signup } from '../api/apiCalls';
import Input from './Input';

class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    apiCall: false,
    errors: {},
  };

  onChange = (e) => {
    const { name, value } = e.target;
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    if (name === 'password' || name === 'passwordRepeat') {
      if (name === 'password' && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = 'Passwords mismatch';
      } else if (name === 'passwordRepeat' && value !== this.state.password) {
        errors.passwordRepeat = 'Passwords mismatch';
      } else {
        errors.passwordRepeat = undefined;
      }
    }
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignup = async (e) => {
    e.preventDefault();
    const { username, displayName, password } = this.state;

    const body = {
      username: username,
      displayName: displayName,
      password: password,
    };

    this.setState({ apiCall: true });

    try {
      await signup(body);
    } catch (err) {
      if (err.response.data.validationError) {
        this.setState({
          errors: err.response.data.validationError,
        });
      }
    }

    this.setState({
      apiCall: false,
    });
  };

  render() {
    const { apiCall } = this.state;
    const {
      username,
      displayName,
      password,
      passwordRepeat,
    } = this.state.errors;

    return (
      <div className='container'>
        <form>
          <h1 className='text-center'>Sign Up</h1>
          <Input
            name='username'
            label='User Name'
            error={username}
            onChange={this.onChange}
          />
          <Input
            name='displayName'
            label='Display Name'
            error={displayName}
            onChange={this.onChange}
          />
          <Input
            name='password'
            label='Password'
            error={password}
            type='password'
            onChange={this.onChange}
          />
          <Input
            name='passwordRepeat'
            label='Password Repeat'
            error={passwordRepeat}
            type='password'
            onChange={this.onChange}
          />
          <div className='text-center'>
            <button
              disabled={apiCall || passwordRepeat !== undefined}
              className='btn btn-primary'
              onClick={this.onClickSignup}
            >
              {apiCall && (
                <span className='spinner-border spinner-border-sm'></span>
              )}{' '}
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignupPage;
