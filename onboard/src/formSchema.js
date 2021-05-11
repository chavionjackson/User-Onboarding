//SET UP ERROR DISPLAYS
import * as yup from 'yup';
//Errors to be displayed if state does not meet criteria.
const schema = yup.object().shape({
    name: yup.string().required('Name is required!'),
    email: yup.string().required('Must be a valid email!'),
    password: yup.string().required('Password is required!')
              .min(7, 'Password must be at least 7 characters!'),
    terms: yup.boolean()

})

export default schema;
