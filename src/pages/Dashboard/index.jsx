import React, { Component } from 'react';
import { render } from 'react-dom';
import { Form, Input, Col, Row } from "antd";
import Button from '@material-ui/core/Button';

class FormDrone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "",
      color: "",
      dimensions: "",
      id: props.id,
      idLog: 0,
      maxFlightHeight: 0,
      maxFlightRange: 0,
      maxFlightSpeed: 0,
      maxFlightTime: 0,
      name: "na",
      rangeBattery: 0,
      task: 0,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <Input type="text" value={this.state.name} onChange={event => {this.setState({name: event.target.value})}} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default FormDrone;

