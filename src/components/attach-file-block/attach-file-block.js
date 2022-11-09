import React, { useEffect, useState } from 'react';
import {
  Text, TouchableOpacity, View, StyleSheet, Platform, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import EditIcon from '../icons/edit-icon';
import DeleteAllIcon from '../icons/delete-all-icon';
import DetailsIcon from '../icons/details-icon';
import ClipBtn from '../buttons/clip-btn/clip-btn';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import ModalChooseFrom from '../modal-choose-from/modal-choose-from';
import DeleteImgIcon from '../icons/delete-img-icon';
import FileIcon from '../icons/file-icon';
import DeleteFileIcon from '../icons/delete-file-icon';

const AttachFileBlock = ({ attachFiles, setAttachFiles, error }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isEditOn, setIsEditOn] = useState(false);
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    if (attachFiles.length >= 5) {
      setValidationError('Maximum 5 attachments');
    } else if (attachFiles.find((el) => el.type === 'png' || el.type === 'jpeg')) {
      setValidationError('Only doc|docx|jpeg|pdf files are allowed!');
    } else if (attachFiles.find((el) => el.type !== 'png') && attachFiles.length < 5) {
      setValidationError(null);
    }
  }, [attachFiles]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
    setIsOpenEdit(false);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setIsOpenEdit(false);
  };

  const handleToggleOpenEdit = () => setIsOpenEdit((prev) => !prev);
  const handleEdit = () => {
    setIsEditOn(true);
    setIsOpenEdit(false);
  };

  const handleStopEdit = () => {
    setIsEditOn(false);
    setIsOpenEdit(false);
  };

  const handleDeleteAll = () => setAttachFiles([]);

  const selectPicture = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const { length } = result.uri.split('/');
      const name = result.uri.split('/')[length - 1];
      const typeLength = result.uri.split('.').length;
      const type = result.uri.split('.')[typeLength - 1];
      setAttachFiles((prev) => [...prev, {
        uri: result.uri, id: uuid.v4(), name, type,
      }]);
    }
  };

  const takePicture = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const { length } = result.uri.split('/');
      const name = result.uri.split('/')[length - 1];
      const typeLength = result.uri.split('.').length;
      const type = result.uri.split('.')[typeLength - 1];
      setAttachFiles((prev) => [...prev, {
        uri: result.uri, id: uuid.v4(), name, type,
      }]);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/*', copyToCacheDirectory: false });
    if (result.type) {
      if (result.type === 'cancel') {
        return;
      }
      const uri = FileSystem.documentDirectory + result.name;
      const { length } = uri.split('/');
      const name = uri.split('/')[length - 1];
      const typeLength = uri.split('.').length;
      const type = uri.split('.')[typeLength - 1];

      setAttachFiles((prev) => [...prev, {
        uri, id: uuid.v4(), name, type,
      }]);

      await FileSystem.copyAsync({
        from: result.uri,
        to: uri,
      });
    }
  };

  const getStylesImages = (index, length) => {
    if (index === 0) {
      return styles.firstImage;
    }

    if (index === 1 && length === 2) {
      return styles.firstImage;
    }

    return styles.imageItem;
  };

  const imagesList = attachFiles.filter((el) => el.type === 'jpg' || el.type === 'png').map((item, i) => {
    const handleDelete = () => setAttachFiles((prev) => prev.filter((el) => el.id !== item.id));
    return (
      <View style={getStylesImages(i, attachFiles.length)} key={item.id}>
        {
          isEditOn
          && (
          <TouchableOpacity style={styles.deleteImgBtn} onPress={handleDelete}>
            <DeleteImgIcon />
          </TouchableOpacity>
          )
        }
        <Image
          source={{ uri: item.uri }}
          style={styles.image}
          key={item.id}
        />
      </View>
    );
  });

  const fileList = attachFiles.filter((el) => el.type === 'pdf' || el.type === 'doc' || el.type === 'docx').map((item) => {
    const handleDelete = () => setAttachFiles((prev) => prev.filter((el) => el.id !== item.id));
    return (
      <View
        key={item.id}
        style={styles.file}
      >
        <FileIcon />
        <Text style={styles.fileText}>
          {item.name}
        </Text>
        {
          isEditOn
          && (
            <TouchableOpacity style={styles.deleteFileBtn} onPress={handleDelete}>
              <DeleteFileIcon />
            </TouchableOpacity>
          )
        }
      </View>
    );
  });

  return (
    <>
      {attachFiles.length === 0
        ? <ClipBtn text="Add picture if you need it" onPress={handleOpenModal} />
        : (
          <TouchableOpacity
            style={styles.attachContainer}
            activeOpacity={1}
            onPress={handleStopEdit}
          >
            {
            isOpenEdit
            && (
            <View style={styles.editContainer}>
              {
                isEditOn
                  ? (
                    <TouchableOpacity style={styles.editItem} onPress={handleStopEdit}>
                      <EditIcon />
                      <Text style={styles.editText}>
                        Back
                      </Text>
                    </TouchableOpacity>
                  )
                  : (
                    <TouchableOpacity style={styles.editItem} onPress={handleEdit}>
                      <EditIcon />
                      <Text style={styles.editText}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  )
              }
              <TouchableOpacity style={styles.editItem} onPress={handleDeleteAll}>
                <DeleteAllIcon />
                <Text style={styles.editText}>
                  Delete All
                </Text>
              </TouchableOpacity>
            </View>
            )
          }
            <View style={styles.attachTitleContainer}>
              <Text style={styles.attachTitle}>
                Attached files (
                {attachFiles.length}
                {' '}
                items)
              </Text>
              <TouchableOpacity onPress={handleToggleOpenEdit}>
                <DetailsIcon />
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              {imagesList}
            </View>
            <View style={styles.fileContainer}>
              {fileList}
            </View>
            <ClipBtn
              text="Add picture if you need it"
              onPress={handleOpenModal}
              insideBlock
              /* eslint-disable-next-line */
              btnStyles={error || validationError && styles.attachContainerError}
              disabled={validationError}
            />
            {error
          && (
          <Text style={styles.errorText}>
            {error}
          </Text>
          )}
            {validationError
            && (
              <Text style={styles.errorText}>
                {validationError}
              </Text>
            )}
          </TouchableOpacity>
        )}
      <ModalChooseFrom
        visible={isOpenModal}
        handleCloseModal={handleCloseModal}
        handleGallery={selectPicture}
        handleCamera={takePicture}
        handleDocument={pickDocument}
      />
    </>
  );
};

const styles = StyleSheet.create({
  attachContainer: {
    width: '100%',
    marginBottom: 42,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.mainGrey,
    backgroundColor: colors.bgSecondary,
  },
  attachContainerError: {
    borderColor: colors.validation,
  },
  attachTitleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  attachTitle: {
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  fileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  file: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.mainGrey,
    paddingHorizontal: 9,
    paddingVertical: 7,
    marginRight: 5,
    marginBottom: 5,
  },
  fileText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
  },
  firstImage: {
    width: '100%',
    height: 100,
    marginBottom: 4,
  },
  imageItem: {
    width: '49.5%',
    height: 100,
    marginBottom: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  editContainer: {
    width: 102,
    height: 72,
    padding: 10,
    backgroundColor: colors.bgSecondary,
    borderRadius: 8,
    position: 'absolute',
    zIndex: 2,
    top: 40,
    right: 0,
  },
  editItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  editText: {
    marginLeft: 10,
    fontSize: 16,
    letterSpacing: 0.44,
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
  },
  deleteImgBtn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    borderBottomEndRadius: 4,
    backgroundColor: colors.bgSecondary,
  },
  deleteFileBtn: {
    marginLeft: 9,
  },
  errorText: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
    color: colors.validation,
  },
});

export default AttachFileBlock;
