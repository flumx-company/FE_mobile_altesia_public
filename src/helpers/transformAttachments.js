import mime from 'mime';

const transformAttachments = (attachments) => attachments.map((item) => {
  const { length } = item.uri.split('/');
  const name = item.uri.split('/')[length - 1];
  const type = mime.getType(item.uri);
  return {
    uri: item.uri,
    name,
    type,
  };
});

export default transformAttachments;
