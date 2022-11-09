import { object, string } from 'yup';

const passwordRegExp = /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

function textFn(value) {
  return this.parent.password === value;
}

const schema = object({
  password: string().min(6, 'Must contain at least 6 characters').matches(passwordRegExp, 'Must contain at least one number and one capital letter'),
  passwordConfirmation: string()
    .test('passwords-match', 'Passwords must match', textFn),
});

export default schema;
