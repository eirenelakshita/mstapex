import React, { Component } from 'react';
import Chart from "react-apexcharts";
import './App.css';
import Select from 'react-select';
//import weatherlist model here
//import { WeatherList } from "../models/WeatherList";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weatherList: props.weatherList,
            renderList: props.renderList.items,
            menu: [
                {
                    value:"London,UK",
                    label:"London,UK"
                },
                {
                    value:"Atlanta,US",
                    label:"Atlanta,US"
                },
                {
                    value:"Bujumbura,BI",
                    label:"Bujumbura,BI"
                },
                {
                    value:"Tokyo,JP",
                    label:"Tokyo,JP"
                }
            ],
            selectedOption: null,
            sorted: null,
            options: {
              chart: {
                  height: 350,
                  type: "line"
              },
              colors: ["#FF1654", "#247BA0", "#633194", "#1CB527"],
              xaxis: {
                categories: [1602525600, 1602536400, 1602547200, 1602558000, 1602568800, 1602579600, 1602590400, 1602601200, 1602612000, 1602622800, 1602633600, 1602644400, 1602655200, 1602666000, 1602676800, 1602687600, 1602698400, 1602709200, 1602720000, 1602730800, 1602741600, 1602752400, 1602763200, 1602774000, 1602784800, 1602795600, 1602806400, 1602817200, 1602828000, 1602838800, 1602849600, 1602860400, 1602871200, 1602882000, 1602892800, 1602903600, 1602914400, 1602925200, 1602936000, 1602946800],
                title: {
                     text: "Days",
                     style: {
                     color: "#000000"
                  }
                }
              },
              yaxis:
                {
                  title: {
                    text: "Temperatures"
                  }
                },
              legend: {
                horizontalAlign: "left",
                offsetX: 40,
                onItemClick: {
                  toggleDataSeries: true
                }
              },
              noData: {
                text: 'Loading...'
              }
            },
            series: []
        }
    }

    componentDidMount = () => {
        this.state.menu.map(option => this.state.weatherList.update(option.value))
        let newRender = [{
            name: "average",
            data: this.state.weatherList.average
        }]
        this.setState({ renderList: newRender })
//        console.log(this.state.weatherList.items)
    }

    handleChange = selectedOption => {
      this.setState({ selectedOption },() => {
        if (!selectedOption) {
            let newRender = [{
                name: "average",
                data: this.state.weatherList.average
            }]
            this.setState({ renderList: newRender }, ()=> console.log(this.state.renderList))
        } else {
            let newRender = this.state.weatherList.selected(selectedOption)
            this.setState({ renderList: newRender }, ()=> console.log(this.state.renderList))
        }
      })
    }

    rankCities = () => {
        let sorted = this.state.weatherList.ranking
        this.setState({ sorted }, ()=>console.log(this.state.sorted))
    }


  render() {
    const { selectedOption } = this.state;
    return (
        <div className="App">
          <Select
                  isMulti
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={this.state.menu}
          />
          <Chart
                  className="achart"
                  options={this.state.options}
                  series={this.state.renderList}
                  type="line"
                  width="500"
          />
          <h4>City Average</h4>
          { selectedOption && this.state.renderList.map(item=>(<h5>{item.name}: {item.average} C</h5>)) }
          <button onClick={this.rankCities}>Rank</button>
          { this.state.sorted && this.state.sorted.map(city=><p>{city[0]}</p>)}
        </div>
    );
  }
}

export default App;
