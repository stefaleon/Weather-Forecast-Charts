import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import _ from 'lodash';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(cityData) {
        const temps = cityData.list.map(weather => weather.main.temp);
        const tempsC = _.map(temps, (t) => t-273);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const { lon, lat } = cityData.city.coord;


        return(
            <tr key={cityData.city.id}>
                <td><GoogleMap lon={lon} lat={lat} /></td>
                <td>
                    <Chart data={tempsC} color="red" unit="°C"/>
                </td>
                <td>
                    <Chart data={pressures} color="green" unit="hPa"/>
                </td>
                <td>
                    <Chart data={humidities} color="blue" unit="%"/>
                </td>
            </tr>
        );

    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th width="200">City</th>
                        <th width="150">Temperature</th>
                        <th width="150">Pressure</th>
                        <th width="150">Humidity</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

// ES6 syntactic sugar, in the argument get the
// weather property out of state, {weather} is state.weather
const mapStateToProps = ({weather}) => {
    return {weather};
};

export default connect(mapStateToProps) (WeatherList);
