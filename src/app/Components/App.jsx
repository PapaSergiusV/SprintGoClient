import React, { Component } from 'react';

export default class App extends Component {
  state = {
    workers: null
  }

  render() {
    const { workers } = this.state;
    return (
      <div>
        <h1>App</h1>
        {workers && workers.map(x => <p>{x}</p>)}
      </div>
    );
  }

  componentDidMount = () => {
    this.loadWorkers();
  }

  loadWorkers = () => {
    fetch("http://0.0.0.0:3000/companies",
      {
        mode: "no-cors"//,
        // headers: {
        //   "Content-type": "application/json; charset=UTF-8"
        // }
      })
      .then(response => {
        response.json()
          .then(data => {
            console.log('data', data)
          })
      })
    // fetch("http://192.168.0.78:3000/companies/1/employees", { mode: "no-cors" })
    //   .then(function (response) {
    //     if (response.status !== 200) {
    //       return Promise.reject(new Error(response.statusText))
    //     }
    //     return Promise.resolve(response)
    //   })
    //   .then(function (response) {
    //     return response.json()
    //   })
    //   .then(function (data) {
    //     console.log('data', data)
    //   })
    //   .catch(function (error) {
    //     console.log('error', error)
    //   })
  }
}