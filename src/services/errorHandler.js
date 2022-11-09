import colors from '../constants/colors';

const errorHandler = (message) => {
  /* eslint-disable-next-line */
  toast.show(message, {
    color: colors.validation,
  });
};

export default errorHandler;
