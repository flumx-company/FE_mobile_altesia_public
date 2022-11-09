import { object, string } from 'yup';

const schema = object({
  password: string().trim(),
  email: string().trim().email('Invalid Email'),
});

export default schema;
