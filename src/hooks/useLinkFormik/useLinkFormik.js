import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import schema from './linkValidationScheme';
import { addLink } from '../../redux/profile/actions';

const useLinkFormik = (handleRedirectNextStep) => {
  const dispatch = useDispatch();

  const state = {
    link: '',
  };

  return useFormik({
    initialValues: state,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: schema,
    onSubmit: ({
      link,
    }) => {
      dispatch(addLink(link));
      handleRedirectNextStep();
    },
  });
};

export default useLinkFormik;
