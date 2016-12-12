import React from 'react';
import axios from 'axios';
import Home from 'Home';

import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
//var i=0;
var MetricsTable = React.createClass({
  getInitialState: function () {
    return {
      fields: {}
    }
  },
  handleBooleanValues: function (event, index, value, metricName) {
    var fields = this.state.fields;
    fields[metricName] = value;
    this.setState({fields: fields});
    console.log(this.state.fields);
  },
  handleTextValues: function (event, metricName) {
    var fields = this.state.fields;
    fields[metricName] = event.target.value;
    this.setState({fields: fields});
    console.log(this.state.fields);
  },
  handleButtonSubmit: function (e) {
    e.preventDefault();
    var data = {
      fields: this.state.fields
    }

    axios.post('/api/postChanges', data).then(function (response){
      console.log('Saved metrics file successfully!');
    }, function (error) {
      console.log(error);
    });
  },
  componentWillMount:function(){
    var fieldsInitial;
    var self = this;
    axios.get('/api/getMetricValues').then(function (response){

      fieldsInitial=response.data;
      self.setState({fields:fieldsInitial});
      console.log('Loaded metrics file successfully!');

    }, function (error) {
      console.log(error);
    });
  },
  render: function () {
    var self=this;
    var metricArray = this.props.metrics;
    var valueField = function(metric) {
        var dataType=metric.data_type;
        var metricName=metric.name;

        if(dataType == 0 || dataType==1)
        {
          return <TextField key={metricName} hintText="Enter value" value={self.state.fields[metricName] || ''}
          onChange={function(e) {self.handleTextValues(e, metricName); } } />;
        }
        if(dataType == 2)
        {
          // Set default false values for all SelectFields
          // var fields = self.state.fields;
          // if(fields[metricName] === undefined) {
          //   fields[metricName] = false;
          // }

           return (
            <SelectField key={metricName} value={self.state.fields[metricName]}
            onChange={function(e, index, value) { self.handleBooleanValues(e, index, value, metricName); }}>
              <MenuItem value={false} primaryText="false" />
              <MenuItem value={true} primaryText="true" />
            </SelectField>
          );
        }
      }

    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn colSpan="4" tooltip="List of All Metrics" style={{textAlign: 'center'}}>
                <h2>List of All Metrics</h2>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn><h4>S.No</h4></TableHeaderColumn>
              <TableHeaderColumn><h4>Metric Key</h4></TableHeaderColumn>
              <TableHeaderColumn><h4>Metric Name</h4></TableHeaderColumn>
              <TableHeaderColumn><h4>Metric Value</h4></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            {metricArray.map(function(metric, i) {
              return (
                <TableRow key={metric.name}>
                  <TableRowColumn>{i}</TableRowColumn>
                  <TableRowColumn>{metric.metric_key}</TableRowColumn>
                  <TableRowColumn>{metric.name}</TableRowColumn>
                  <TableRowColumn>
                    {valueField(metric)}
                  </TableRowColumn>
                </TableRow>
              )
            }
          )}
          </TableBody>
          <TableFooter adjustForCheckbox={false} >
            <TableRow>
              <TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
                <RaisedButton type="submit" label="Submit" primary={true} onClick={this.handleButtonSubmit}
                  />
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>

      </div>
    );
  }
})

module.exports = MetricsTable;
