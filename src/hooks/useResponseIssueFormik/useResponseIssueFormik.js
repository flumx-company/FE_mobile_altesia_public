import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import schema from './useResponseIssueValidationSchema';
import { responseIssueDirectRequested } from '../../redux/community/actions';
import transformAttachments from '../../helpers/transformAttachments';

const useResponseIssueFormik = (handleRedirect, responseType) => {
  const dispatch = useDispatch();

  const state = {
    id: '',
    description: '',
    attachments: [],
  };

  return useFormik({
    initialValues: state,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: schema,
    onSubmit: ({ id, description, attachments }) => {
      const transformedAttachments = transformAttachments(attachments);
      dispatch(responseIssueDirectRequested(id, description, responseType, transformedAttachments, handleRedirect));
    },
  });
};

export default useResponseIssueFormik;
