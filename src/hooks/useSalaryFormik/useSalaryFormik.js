import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import schema from './salaryValidationScheme';
import { rateSalary } from '../../redux/profile/actions';

const useSalaryFormik = (handleRedirectNextStep) => {
  const dispatch = useDispatch();

  const state = {
    min: '',
    max: '',
  };

  return useFormik({
    initialValues: state,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: schema,
    onSubmit: ({
      min, max,
    }) => {
      dispatch(rateSalary(min, max));
      handleRedirectNextStep();
    },
  });
};

export default useSalaryFormik;
