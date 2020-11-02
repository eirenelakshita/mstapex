import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
//import weatherlist model here
import { WeatherList } from "./models/WeatherList";
import { onSnapshot, getSnapshot } from "mobx-state-tree";

//Sets default initial state for all cities in the menu
let initialState = {
    items: [
        {
            name: "London,UK",
            data: [11.59, 10.61, 9.47, 8.84, 8.89, 10.12, 11.41, 12.61, 12.49, 10.85, 9.68, 9.6, 10.05, 11.32, 12.98, 12.63, 10.78, 9.91, 9.28, 8.87, 9.28, 11.07, 12.87, 13.46, 13.36, 13.73, 13.9, 14.35, 14.39, 14.33, 14.98, 15.28, 14.73, 14.95, 14.55, 14.82, 14.85, 15, 15.84, 15.98]
        },
        {
            name: "Atlanta,US",
            data: [19.07, 20.42, 18.99, 18.09, 18.62, 18.1, 17.08, 21.5, 24.49, 24.78, 22.12, 20.43, 19.55, 19.06, 18.01, 20.63, 20.32, 19.26, 19.38, 19.12, 19.23, 19.95, 20.64, 21.83, 22.76, 24.43, 22.7, 21.97, 18.26, 15.05, 13.42, 17, 19.02, 19.63, 16.71, 15.43, 14.52, 12.47, 10.55, 12.92]
        },
        {
            name: "Bujumbura,BI",
            data: [24.12, 23.19, 22.1, 22.03, 24.07, 27.13, 28.57, 26.17, 23.15, 22.1, 22.25, 22.49, 24.35, 27.69, 27.47, 25.42, 22.4, 22.26, 22.44, 22.66, 24.45, 26.33, 25.06, 24.11, 23.39, 23.06, 22.53, 22.51, 24.45, 24.65, 25.26, 25.34, 23.08, 22.91, 22.93, 22.42, 23.89, 26.65, 26.05, 23.78]
        },
        {
            name: "Tokyo,JP",
            data: [16.87, 16.5, 17.83, 20.09, 20.75, 19.18, 18.17, 17.52, 17.32, 17.15, 17.98, 19.78, 20.69, 19.82, 19.51, 18.78, 17.71, 16.98, 18.9, 21.23, 21.82, 19.75, 17.89, 16.05, 14.25, 13.48, 14.12, 15.46, 17.76, 15.83, 15.17, 14.31, 13.57, 12.75, 14.81, 17.17, 18.32, 17.56, 17.41, 17.03]
        }
    ]
}

// store the WeatherListItems that's selected (to be rendered)
let initialRender = {
    items: []
}

//If there's already data in local storage, make the weatherlist with that.
//If not, make weatherlist with data above
if (localStorage.getItem("mstapexapp")) {
    const json = JSON.parse(localStorage.getItem("mstapexapp"))
    //Checks if the current snapshot in local storage is still up to date with WishList model
    if (WeatherList.is(json)) initialState = json
}

let weatherList = WeatherList.create(initialState)

let renderList = WeatherList.create(initialRender)

//Write new data on local storage every time there's a new snapshot
onSnapshot(weatherList, snapshot => {
    localStorage.setItem("mstapexapp", JSON.stringify(snapshot))
})

function renderApp() {
//Injects weatherlist MST data to App and render at root
    ReactDOM.render(
        <App weatherList={ weatherList } renderList={ renderList } />,
        document.getElementById('root')
    )
}

renderApp()

if (module.hot) {
    module.hot.accept(["./components/App"], () => {
        // new components
        renderApp()
    })

    module.hot.accept(["./models/WeatherList"], () => {
        // new model definitions
        const snapshot = getSnapshot(weatherList);
        weatherList = WeatherList.create(snapshot);
        renderApp()
    })
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();