import { useEffect, useState } from 'react';
import './App.css';
import Form from './Form';
import * as yup from 'yup';
import schema from './formSchema';
import axios from 'axios';

//SET UP ALL INITIAL STATES

//Initial state for person
const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false
}
//Initial state for errors
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: ''
}
//Initial state for current person
const initialPerson = []

//Initial state for submit
const initialDisabled = true

function App() {
  //SET VARIABLES TO CORRESPONDING STATE
  const [person, setPerson] = useState(initialPerson) //Array of people
  const [formValues, setFormValues] = useState(initialFormValues) //Object
  const [formErrors, setFormErrors] = useState(initialFormErrors) //Object
  const [disabled, setDisabled] = useState(initialDisabled) // boolean
  //SEND DATA TO SERVER
  const postNewPerson = newPerson => {
    axios.post(`https://reqres.in/api/users`, newPerson)
      .then(res => {
        setPerson([...person, res.data])
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }
  //EVENT HANDLERS
  //Validation
  const inputChange = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({
      ...formErrors,
      [name]: ''
    }))
    .catch(err => setFormErrors({
      ...formErrors,
      [name]: err.errors[0]
    }))
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newPerson = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    }
    //POST NEW FRIEND
    postNewPerson(newPerson)
    setFormValues(initialFormValues)
}
  //SIDE EFFECTS
  useEffect(() => {
    console.log(formValues)
    schema.isValid(formValues)
    .then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className="App">
      <Form values={formValues}
            change={inputChange}
            submit={formSubmit}
            disabled={disabled}
            errors={formErrors} />

          {person.map((user, index) => {
            return(
              <div key={index}>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.password}</p>
              </div>
            )
          })}
    </div>
  );
}

export default App;
