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
