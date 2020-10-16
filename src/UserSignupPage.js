import React from 'react';
import axios from 'axios';

class UserSignupPage extends React.Component {
  state = {
    userName: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  };

  onChange = (e) => {
    const { name, value } = e.target;
    // const name = e.target.name;
    // const value = e.target.value;

    this.setState({
      [name]: value,
    });
  };

  onClickSignup = (e) => {
    e.preventDefault();
    const { userName, displayName, password } = this.state;

    const body = {
      userName: userName,
      displayName: displayName,
      password: password,
    };
    axios.post('/api/1.0/users', body);
  };
  // onChangeUserName = (e) => {
  //   this.setState({
  //     userName: e.target.value,
  //   });
  // };

  // onChangeDisplayName = (e) => {
  //   this.setState({
  //     displayName: e.target.value,
  //   });
  // };

  // onChangePassword = (e) => {
  //   this.setState({
  //     password: e.target.value,
  //   });
  // };

  // onChangePasswordRepeat = (e) => {
  //   this.setState({
  //     passwordRepeat: e.target.value,
  //   });
  // };

  render() {
    return (
      <form>
        <h1>Sign Up</h1>
        <div>
          <label>User Name</label>
          <input name='userName' onChange={this.onChange} />
        </div>
        <div>
          <label>Display Name</label>
          <input name='displayName' onChange={this.onChange} />
        </div>
        <div>
          <label>Password</label>
          <input name='password' type='password' onChange={this.onChange} />
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            name='passwordRepeat'
            type='password'
            onChange={this.onChange}
          />
        </div>

        <button onClick={this.onClickSignup}>Sign Up</button>
      </form>
    );
  }
}

export default UserSignupPage;
