import { object, string } from 'yup';

const schema = object({
  email: string().trim().email('Invalid Email'),
});

export default schema;
