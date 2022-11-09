import { object, string } from 'yup';

const schema = object({
  id: string().required('Choose Category'),
  title: string().max(1024),
  description: string().max(65535),
});

export default schema;
