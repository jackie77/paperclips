import { Component } from 'react-native';
import { connect } from 'react-redux';
import Login from '../components/login.js';

import loginUser from '../actions/action_login.js';

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { loginUser })(Login);