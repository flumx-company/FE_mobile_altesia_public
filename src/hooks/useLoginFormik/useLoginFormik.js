import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import schema from './loginValidationSchema';
import { loginRequested } from '../../redux/auth/action';

const useLoginFormik = () => {
  const dispatch = useDispatch();
  const state = {
    email: '',
    password: '',
  };
  return useFormik({
    initialValues: state,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: schema,
    onSubmit: ({ email, password }) => dispatch(loginRequested(email.trim(), password.trim())),
  });
};

export default useLoginFormik;
