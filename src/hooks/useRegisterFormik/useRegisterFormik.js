import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import schema from './registerValidationScheme';
import { registerRequested } from '../../redux/auth/action';

const useRegisterFormik = (handleRedirectToVerification) => {
  const dispatch = useDispatch();

  const state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    phoneNumber: '',
    degree: '',
    experience: '',
  };

  return useFormik({
    initialValues: state,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: schema,
    onSubmit: ({
      country,
      phoneNumber,
      degree,
      experience,
      firstName,
      lastName,
      email,
      password,
    }) => {
      dispatch(registerRequested(country,
        phoneNumber.trim(),
        degree,
        experience,
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        password.trim(),
        handleRedirectToVerification));
    },
  });
};

export default useRegisterFormik;
