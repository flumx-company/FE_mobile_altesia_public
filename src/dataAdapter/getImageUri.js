import urlCreator from '../services/urlCreator';

const getImageUri = (item) => {
  if (!item) {
    return null;
  }
  if (!item.attachmentFiles) {
    return null;
  }
  if (!item.attachmentFiles.length) {
    return null;
  }
  return `${urlCreator.imagesPath}/${item.attachmentFiles[0].path}`;
};

export default getImageUri;
