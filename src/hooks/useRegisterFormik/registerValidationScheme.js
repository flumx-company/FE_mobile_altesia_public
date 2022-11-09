import { object, string } from 'yup';
import 'yup-phone';

const nameRegExp = /^[A-Za-z]/;
const passwordRegExp = /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

const schema = object({
  firstName: string().trim().min(3, 'Min 3 symbols').matches(nameRegExp, 'Only letters')
    .matches(/^[A-Z][a-z0-9_-]{3,19}$/, 'First letter must be capital'),
  lastName: string().trim().min(3, 'Min 3 symbols').matches(nameRegExp, 'Only letters')
    .matches(/^[A-Z][a-z0-9_-]{3,19}$/, 'First letter must be capital'),
  phoneNumber: string().phone(null, null, 'Phone number is not valid'),
  email: string().trim().email('Invalid Email'),
  password: string().trim().min(6, 'At least 6 symbols').max(20, 'Max 20 symbols')
    .matches(passwordRegExp, 'Password should have at least one number and one capital letter'),
  country: string(),
  degree: string(),
  experience: string(),
  expertise: string(),
});

export default schema;
