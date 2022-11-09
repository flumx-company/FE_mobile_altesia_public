import { object, string } from 'yup';

const schema = object({
  title: string().max(1024),
  description: string().max(65535),
});

export default schema;
