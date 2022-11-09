import { object, string } from 'yup';
import 'yup-phone';

const schema = object({
  min: string().matches(/^\d+$/, 'only numbers'),
  max: string().matches(/^\d+$/, 'only numbers'),
});

export default schema;
