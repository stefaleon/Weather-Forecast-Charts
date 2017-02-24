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
