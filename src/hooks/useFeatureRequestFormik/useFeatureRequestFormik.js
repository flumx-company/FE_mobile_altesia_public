import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createFeatureRequestRequested } from '../../redux/home/actions';
import schema from './useFeatureRequestValidationSchema';
import transformAttachments from '../../helpers/transformAttachments';

const useFeatureRequestFormik = (redirect) => {
  const dispatch = useDispatch();

  const state = {
    title: '',
    description: '',
    attachments: [],
  };

  return useFormik({
    initialValues: state,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: schema,
    onSubmit: ({ title, description, attachments }) => {
      const transformedAttachments = transformAttachments(attachments);
      dispatch(createFeatureRequestRequested(title, description, transformedAttachments, redirect));
    },
  });
};

export default useFeatureRequestFormik;
