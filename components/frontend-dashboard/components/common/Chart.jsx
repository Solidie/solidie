import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Chart {...this?.props} />
    )
  }
}