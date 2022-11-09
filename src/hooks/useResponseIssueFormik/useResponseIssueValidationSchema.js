import { object, string } from 'yup';

const schema = object({
  description: string().max(65535),
});

export default schema;
