## Weather Forecast Charts

* Part of [Modern React with Redux](https://www.udemy.com/react-redux/)
* Using the [ReduxSimpleStarter](https://github.com/StephenGrider/ReduxSimpleStarter) boilerplate by [Stephen Grider](https://github.com/stephengrider)

## 001 Create the SearchBar container
* In *src/containers* create the *search_bar.js* file.
* Import *React* and the *Component* property.
* Create a form inside the *SearchBar* component and style it with Bootstrap. Add an input and a submit button.
* Show the form by importing it in *src/components/app.js* and inserting the relative tag.

## 002 Controlled components and binding context
* The *SearchBar* input will be a controlled field, a form element where the value of the input is set by the state of our component.
* Initialize the component state with a constructor. Assign an empty string value to a *term* property.
* Assign a value to the form equal to *this.state.term* and an onChange handler, *onInputChange*.
* Set the state in *onInputChange* with *this.setState* so that the *event.target.value* is assigned to *term* and the component state gets updated when the input changes.
* The *this* object of *onInputChange* has to be binded to the *this* context of the class in the conctructor.

## 003 Handling form submissions
* On form submit the page is reset from the backend. To avoid that, set the onSubmit handler *onFormSubmit* to *preventDefault*.

## 004 Openweather API and redux-promise
* Register in *openweathermap.org* and sign in. Get an API key and assign it to the *API_KEY* value in *src/actions/index.js*.
* Install the *redux-promise* package. Import *ReduxPromise* in *src/index.js* and add it as an argument in *applyMiddleware*.

## 005 Create a fetching weather action with axios
* Inside *src/actions/index.js* create the *fetchWeather* action creator. It returns an action object containing a *type* property with the value *FETCH_WEATHER*.
* Create the request URL for the openweathermap API data. Thre *ROOT_URL* consists of the API web address and the *API_KEY*.
* A *city* argument is required in the *fetchWeather* function call. It is used to create the final request url.
* Install the *axios* package in order to make the simple AJAX request and import it inside *src/actions/index.js*. Use *axios.get* to create the *request* promise.
* Pass the *request* as a value to the action's *payload* property.

## 006 Connect the *fetchWeather* action creator to the *SearchBar* container
* Inside *src/containers/search_bar.js* import the *connect* method from *'react-redux'*.
* Import the *bindActionCreators* property from *'redux'*.
* Import the *fetchWeather* action creator from *'../actions/index'*.
* Define the *mapDispatchToProps* function which binds the *fetchWeather* action creator to the *dispatch* function via *bindActionCreators*.
* Export by default the *SearchBar* state container after the connection between it and the dispatched action has been established via *connect*.

## 007 Call *fetchWeather*
* Now *this.props.fetchWeather* can be accessed inside *SearchBar*. Call it inside *onFormSubmit* with *this.state.term* as a city argument.
* After the search is initiated, clear the search input by setting the *term* state to an empty string.
* The *this* object of *onFormSubmit* has to be binded to the *this* context of the class in the conctructor.

## 008 Create the *WeatherReducer*
* Inside *src/reducers* create the file *reducer_weather.js*.
* Assign the reducer's default state to *null*. Console log the action for initial testing.
In the console we can see the default initialization actions dispatched by Redux.
* In *src/reducers/index.js* import *WeatherReducer* from *'./reducer_weather'* and add the *weather: WeatherReducer* assignment for the *weather* part of state inside the *combineReducers* argument object.
* Add a console log inside the action creator as well in order to log the request.

## 009 The effect of the *ReduxPromise* middleware
* Now, when a city name is entered in the form input, in the console we can see from the action creator log that the request is a promise. From the reducer log we can see that the received action already contains the requested weather data. The *request* promise is being returned on the *payload* key of the received action object and inside the *payload* object, a *data* object exists and contains all the requested API data, such as *city*, *coord* and a *list* array of weather data containing objects.
* This is due to the *ReduxPromise* in *applyMiddleware*, which is monitoring the actions which have a promise status. The *request* promise returned by axios, passed to the *payload* action property, causes the *ReduxPromise* middleware to stop the action and await for the response to the request. When the response is received, the middleware dispatches a new action of the same *FETCH_WEATHER* type, which now contains the *payload* of the resolved request, i.e. the weather data.  

## 010 Configure the *WeatherReducer*
* We will be rendering weather data for a few cities, so a list structure will be used.
* Inside *src/reducers/reducer_weather*, set the initial state to an empty array instead of null.
* Import the *FETCH_WEATHER* constant from *'../actions/index'* and add the *FETCH_WEATHER* action type switch case.
* While adding weather states for different cities in the list structure, we must be careful to avoid mutating the state object. A new state instance has to be created instead, for every new city entered in the input form. So *concat* could be used instead of *push* while adding state objects in the existing state array. Another option is to use ES6 syntax and the spread operator along with the *action.payload.data* object which contains the weather data of interest.

## 011 Create the *WeatherList* container
* Inside *src/containers* create the *weather_list.js* file.
* Import *React* and the *Component* property.
* The *WeatherList* class renders a Bootstrap styled table. Add headers for the city and for weather data.
* In *src/components/app.js* import *WeatherList* from *'../containers/weather_list'* and display it by inserting the relative tag in the *App* class.
* Inside *src/containers/weather_list.js* import the *connect* method from *'react-redux'*.
* Map the weather state to the *WeatherList* props with *mapStateToProps*.
* Export by default the *WeatherList* container after the connection between it and *mapStateToProps* has been established via *connect*.

## 012 Map props to a render helper
* Now inside *WeatherList* we have access to *this.props.weather*, which contains an array of objects, one object per each city that is entered in the form input.
* We will use the map function on the data of this array and the argument function will be the rendering helper *renderWeather(cityData)*.
* To start with,  *renderWeather(cityData)* returns the city name, which due to the response format is *cityData.city.name*.
* The *cityData.city.id* value is used as key in order to stop the *"Each child in an array or iterator should have a unique "key" prop"* warning.

## 013 Pull the weather data from the response object
* The data we are interested in are contained inside the *cityData.list* array. We will use the map function and return those required for the application.
* By setting the mapping function argument to *weather*, the required data which are the three arrays *temps*, *humidities* and *pressures* can be mapped out by returning *weather.main.temp*, *weather.main.humidity* and *weather.main.pressure* equivalently.
* Console log these arrays to test that they are pulled out correcty.

## 014 Present the data with *Sparkline* charts
* Install the *react-sparklines* package in order to present the weather data in chart format.
* Import the *Sparklines* and *SparklinesLine* properties from *'react-sparklines'*.
* In the *renderWeather* helper return, add a row containing the *Sparklines* tag with the *temps* array data drawn in a red line chart with *SparklinesLine*.
* In order to keep the code DRY, a chart component will be created before the *humidities* and *pressures* are set to be displayed.

## 015 Add the chart component
* Inside *src/components* create the file *chart.js*.
* Import the *Sparklines* and *SparklinesLine* properties from *'react-sparklines'*.
* In the chart component, the *temps*, *humidities* and *pressures* will be passed as props from the parent, which is the *WeatherList* container. Hence the data for the *Sparklines* tag are set to *props.data*.
* The chart color will be also be passed as *props.color*.
* Now the chart component exports a div tag containing the *Sparkline* chart.
* In *src/containers/weather_list.js* import *Chart* from *'../components/chart'*.
* Add the *Chart* tags in the *renderWeather* helper return, passing the data props *temps*, *humidities* and *pressures* and the color props "red", "green" and "blue".
