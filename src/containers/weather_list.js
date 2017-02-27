import React, {Component} from 'react';
import {connect} from 'react-redux';


class WeatherList extends Component {
    renderWeather(cityData) {

        const temps = cityData.list.map(weather => weather.main.temp);
        console.log('temps for '+ cityData.city.name + ' are ' + temps);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        console.log('humidities for '+ cityData.city.name + ' are ' + humidities);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        console.log(pressures);


        return(
            <tr key={cityData.city.id}>
                <td>{cityData.city.name}</td>
            </tr>
        );

    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature</th>
                        <th>Pressure</th>
                        <th>Humidity</th>
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
