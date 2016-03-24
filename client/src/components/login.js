'use strict';
var React = require('react-native');
var t = require('tcomb-form-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var { 
  AppRegistry,
  Component, 
  Text, 
  View, 
  TouchableHighlight,
  Image,
  StyleSheet
} = React;

//Socket.io expects window.navigator.userAgent to be a string, need to set
window.navigator.userAgent = "react-native"; //or any other string value

var Form = t.form.Form;
var styles = require('../assets/styles.js').signupStyles;
var User   = t.struct({
  userName: t.String,
  password: t.String
});

var options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: '', password: '' };
  }

  onLogin(){
    var value = this.refs.form.getValue();
    if(value){
      this.setState({userName: value.userName, password: value.password});
      this.props.authUser(this.state, this.props.navigator, '/login');
    }
  }

  onSignup(){
    this.props.navigator.push({ name: 'Signup' });
  }

  render() {
    return (
      <View style={{height: windowSize.height, backgroundColor: '#f7f6f3'}}>

      <View style={styles.container}>
        <View style={styles.topSpace}>
        </View>
        <Form
          ref="form"
          type={User}
          options={options}
        />
        <View style={styles.twoButtons}>
        <TouchableHighlight style={styles.button1} onPress={this.onLogin.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>login</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button1} onPress={this.onSignup.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableHighlight>
        </View>
      </View>  
      </View>
    )
  }
};