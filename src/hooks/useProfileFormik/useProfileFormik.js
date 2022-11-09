import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import schema from './profileValidationScheme';
import { putProfileRequested } from '../../redux/profile/actions';

const useProfileFormik = () => {
  const dispatch = useDispatch();

  const state = {
    min: '',
    max: '',
    linkedInLink: '',
  };

  return useFormik({
    initialValues: state,
    validateOnChange: true,
    validateOnBlur: false,
    validationSchema: schema,
    onSubmit: ({
      min, max, linkedInLink,
    }) => dispatch(putProfileRequested(min, max, linkedInLink)),
  });
};

export default useProfileFormik;
