import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import C3Chart from "react-c3js";

import { railsToJsTime, getDays } from "../../../libs/convertTime.js";
import "./Graph.module.scss";
import "c3/c3.css";

class Graph extends Component {
  render() {
    const { sprint } = this.props;
    const chart = this.getGraphInfo();
    return (
      <div className="graph-modal">
        <h4>GRAPH of {sprint.name.toUpperCase()}</h4>
        <div className="content">
          <C3Chart
            id="chart"
            data={{
              columns: [
                ['hours', ...chart.columns],
                ["plan", ...chart.columns.map((x, index) => ~~(index / chart.columns.length * chart.allHours))]
              ],
              types: {
                hours: 'area-spline',
                plan: 'area-spline'
              }
            }}
            size={{ width: 900 }}
            legend={{ show: false }}
            axis={{
              x: {
                type: "category",
                categories: chart.columns.map((x, index) => `${index + 1} day`)
              },
              y: {
                tick: { format: (d) => d + "h" },
                min: 1
              }
            }}
          />
        </div>
        <div className="buttons">
          <Button variant="outlined" color="primary" className="button" onClick={this.props.close}>
            Ok
          </Button>
        </div>
      </div>
    );
  }

  getGraphInfo = () => {
    const { sprint, tasks } = this.props;
    if (!tasks)
      return;
    const begin = railsToJsTime(sprint.created_at);
    const end = railsToJsTime(sprint.deadline);
    const days = getDays(end - begin) + 1;
    const allHours = tasks.reduce((sum, task) => sum + task.time, 0);
    let columns = new Array(days).fill(0);

    tasks.forEach(task => {
      if (task.done_time) {
        const day = railsToJsTime(task.done_time);
        for (let i = getDays(day - begin); i < days; ++i)
          columns[i] += task.time;
      }
    });

    return { columns, allHours };
  }
}

export default Graph;