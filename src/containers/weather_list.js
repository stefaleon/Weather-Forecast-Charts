import React, {Component} from 'react';
import {connect} from 'react-redux';


class WeatherList extends Component {
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
