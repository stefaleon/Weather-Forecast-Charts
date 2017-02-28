import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Sparklines, SparklinesLine } from 'react-sparklines';


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
                <td>
                    <Sparklines data={temps}>
                        <SparklinesLine color="red" />
                    </Sparklines>
                </td>
                <td>
                    <Sparklines data={pressures}>
                        <SparklinesLine color="green" />
                    </Sparklines>
                </td>
                <td>
                    <Sparklines data={humidities}>
                        <SparklinesLine color="blue" />
                    </Sparklines>
                </td>
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
