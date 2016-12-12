var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from 'Main';
import Login from 'Login';
import Home from 'Home';

// Load custom styles
require('style!css!sass!applicationStyles');

injectTapEventPlugin();

class  App extends React.Component{
render(){
  return(
   <MuiThemeProvider>
     <Router history={hashHistory}>
       <Route path="/" component={Main}>
         <Route path="/home" component={Home}></Route>
         <IndexRoute component={Login}/>
       </Route>
     </Router>
 </MuiThemeProvider>

);
}
}

ReactDOM.render(
    <App />,
  document.getElementById("app")
);
