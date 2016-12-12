import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

var Navigation = React.createClass({
  getInitialState:function(){
     return {open: false};
  },
  handleToggle:function(){
    this.setState({open: !this.state.open});
},
handleClose:function(){
  this.setState({open: false});
},
  render: function(){
    return (
      <div>
          <AppBar title="Datonis Portal" onLeftIconButtonTouchTap={this.handleToggle} iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            <Drawer docked={false}
              width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
            <MenuItem onTouchTap={this.handleClose}>Things</MenuItem>
            <MenuItem onTouchTap={this.handleClose}>Metrics</MenuItem>
          </Drawer>
      </div>
    );
  }
})

module.exports = Navigation;
