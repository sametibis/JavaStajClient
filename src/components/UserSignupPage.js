import React from 'react';
import { signup } from '../api/apiCalls';

class UserSignupPage extends React.Component {
  state = {
    userName: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    apiCall: false,
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onClickSignup = async (e) => {
    e.preventDefault();
    const { userName, displayName, password } = this.state;

    const body = {
      userName: userName,
      displayName: displayName,
      password: password,
    };

    this.setState({ apiCall: true });

    try {
      await signup(body);
    } catch (err) {
      console.error(err);
    }

    this.setState({
      apiCall: false,
    });
  };

  render() {
    const { apiCall } = this.state;

    return (
      <div className='container'>
        <form>
          <h1 className='text-center'>Sign Up</h1>
          <div className='form-group'>
            <label>User Name</label>
            <input
              className='form-control'
              name='userName'
              onChange={this.onChange}
            />
          </div>
          <div className='form-group'>
            <label>Display Name</label>
            <input
              className='form-control'
              name='displayName'
              onChange={this.onChange}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              className='form-control'
              name='password'
              type='password'
              onChange={this.onChange}
            />
          </div>
          <div className='form-group'>
            <label>Repeat Password</label>
            <input
              className='form-control'
              name='passwordRepeat'
              type='password'
              onChange={this.onChange}
            />
          </div>
          <div className='text-center'>
            <button
              disabled={apiCall}
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
