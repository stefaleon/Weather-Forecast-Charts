import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';


class WeatherList extends Component {
    renderWeather(cityData) {
        const temps = cityData.list.map(weather => weather.main.temp);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        const pressures = cityData.list.map(weather => weather.main.pressure);

        return(
            <tr key={cityData.city.id}>
                <td>{cityData.city.name}</td>
                <td>
                    <Chart data={temps} color="red" />
                </td>
                <td>
                    <Chart data={pressures} color="green" />
                </td>
                <td>
                    <Chart data={humidities} color="blue" />
                </td>
            </tr>
        );

    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th width="100">City</th>
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
