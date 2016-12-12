var React = require('react');
var axios = require('axios');

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

var Login = React.createClass({
    onLogin: function(e) {
      e.preventDefault();
      var data={
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue()
      };
      axios.post('/api/getAuth', data).then(function(data){
        console.log('Success');
        window.location.hash = '#/home';
      }, function(err){
        console.log(err);
      })
    },
    render: function() {
        return (
            <div>
                <form onSubmit={this.onLogin}>
                    <div>
                        <TextField hintText="Email" defaultValue="blakshay93@gmail.com" ref="email" style={{
                            margin: '5px 0px 0px 400px'
                        }}/>
                    </div>
                    <div>
                        <TextField hintText="Password" ref="password" type="password" style={{
                            margin: '5px 0px 0px 400px'
                        }}/>
                    </div>
                    <div>
                        <RaisedButton type="submit" label="Submit" primary={true} style={{
                            margin: '5px 0px 0px 500px'
                        }} />
                    </div>
                    <div>
                      <a href="#/home">Home</a>
                    </div>
                </form>
            </div>

        );
    }
})

module.exports = Login;
