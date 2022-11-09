import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import schema from './forgotPasswordValidationSchema';
import { resetPasswordRequested } from '../../redux/auth/action';

const useForgotPasswordFormik = (handleRedirectVerification) => {
  const dispatch = useDispatch();
  const state = {
    email: '',
  };
  return useFormik({
    initialValues: state,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: schema,
    onSubmit: ({ email }) => dispatch(resetPasswordRequested(email.trim(), handleRedirectVerification)),
  });
};

export default useForgotPasswordFormik;
