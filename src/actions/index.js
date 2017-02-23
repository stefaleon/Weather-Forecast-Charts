import axios from 'axios';

import {KEY} from '../../keys';
const API_KEY = KEY;


const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}`

export const FETCH_WEATHER = 'FETCH_WEATHER';

export const fetchWeather = (city) => {
    const url = `${ROOT_URL}&q=${city},us`;
    const request = axios.get(url);

    console.log('Request:', request);

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}
