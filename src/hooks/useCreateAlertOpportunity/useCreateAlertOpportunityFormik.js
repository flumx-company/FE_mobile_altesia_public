import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import schema from './useCreateAlertOpportunityValidationSchema';
import { createAlertOpportunityByIdRequested } from '../../redux/opportunities/actions';
import transformAttachments from '../../helpers/transformAttachments';

const useCreateAlertOpportunityFormik = (handleRedirect) => {
  const dispatch = useDispatch();

  const state = {
    id: '',
    title: '',
    description: '',
    attachments: [],
  };

  return useFormik({
    initialValues: state,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: schema,
    onSubmit: ({
      id, title, description, attachments,
    }) => {
      const transformedAttachments = transformAttachments(attachments);
      dispatch(createAlertOpportunityByIdRequested(id, title, description, transformedAttachments, handleRedirect));
    },
  });
};

export default useCreateAlertOpportunityFormik;
