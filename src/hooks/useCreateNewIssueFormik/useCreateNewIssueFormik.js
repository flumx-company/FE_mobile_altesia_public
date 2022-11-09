import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import schema from './useCreateNewIssueValidationSchema';
import { createCommunityIssueRequested } from '../../redux/community/actions';
import transformAttachments from '../../helpers/transformAttachments';

const useCreateNewIssueFormik = (handleRedirect) => {
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
      dispatch(createCommunityIssueRequested(id, title, description, transformedAttachments, handleRedirect));
    },
  });
};

export default useCreateNewIssueFormik;
