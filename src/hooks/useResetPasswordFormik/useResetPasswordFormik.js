import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import schema from './resetPasswordValidationScheme';
import { completeResetPasswordRequested } from '../../redux/auth/action';
import { getResetPasswordEmail, getVerifyCode } from '../../redux/auth/selectors';

const useResetPasswordFormik = (handleRedirectNextStep) => {
  const dispatch = useDispatch();
  const resetPasswordEmail = useSelector(getResetPasswordEmail);
  const verifyCode = useSelector(getVerifyCode);
  const state = {
    password: '',
    passwordConfirmation: '',
  };

  return useFormik({
    initialValues: state,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: schema,
    onSubmit: ({
      password,
    }) => {
      dispatch(completeResetPasswordRequested(resetPasswordEmail, verifyCode, password, handleRedirectNextStep));
    },
  });
};

export default useResetPasswordFormik;
