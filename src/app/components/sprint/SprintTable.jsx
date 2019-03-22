import React, { Component } from "react";

import "./SprintTable.module.scss";

class SprintTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      "To Do",
      "Rejected",
      "In progress",
      "QA",
      "Deploy",
      "Done"
    ];
    this.state = {
      name: "Loading...",
      period: "Loading..."
    }
  }

  render() {
    const { name, period } = this.state;

    return (
      <div>
        <div>
          {/* Заголовок спринта */}
          <h3>{name}</h3>
          <p>{period}</p>
        </div>
        {/* Таблица с 6 колонками */}
        <div className="table">
          {
            this.columns.map((name, key) => 
              <div key={key}>
                <h4>{name}</h4>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default SprintTable;