import React from 'react';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import urlCreator from '../../services/urlCreator';
import toastMessages from '../../constants/toastMessages';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import FileIcon from '../icons/file-icon';

const AttachmentsBlock = ({ attachmentFiles }) => {
  if (!attachmentFiles) return <></>;
  const getStylesImages = (index, length) => {
    if (index === 0) {
      return styles.firstImage;
    }

    if (index === 1 && length === 2) {
      return styles.firstImage;
    }

    return styles.imageItem;
  };
  const saveImage = async (data) => {
    const asset = await MediaLibrary.createAssetAsync(data.uri);
    const album = await MediaLibrary.getAlbumAsync('Download');
    if (album == null) {
      await MediaLibrary.createAlbumAsync('Download', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
    }
  };

  const imagesList = attachmentFiles.filter((el) => el.mineType.split('/')[0] === 'image').map((item, i, array) => {
    const downloadFile = () => {
      const uri = `${urlCreator.imagesPath}/${item.path}`;
      const fileUri = `${FileSystem.documentDirectory}${item.originalName}`;
      FileSystem.downloadAsync(uri, fileUri)
        .then((data) => {
          saveImage(data);
          /* eslint-disable-next-line */
          toast.show(toastMessages.downloadImage(item.originalName));
        })
        .catch();
    };
    return (
      <View style={getStylesImages(i, array.length)} key={item.id}>
        <TouchableOpacity onPress={downloadFile}>
          <Image
            source={{ uri: `${urlCreator.imagesPath}/${item.path}` }}
            style={styles.image}
            key={item.id}
          />
        </TouchableOpacity>
      </View>
    );
  });

  const fileList = attachmentFiles.filter((el) => el.mineType.split('/')[0] !== 'image').map((item) => {
    const downloadFile = () => {
      const uri = `${urlCreator.imagesPath}/${item.path}`;
      WebBrowser.openBrowserAsync(uri);
    };

    return (
      <TouchableOpacity
        onPress={downloadFile}
        key={item.id}
        style={styles.file}
      >
        <FileIcon />
        <Text style={styles.fileText}>
          {item.originalName}
        </Text>
      </TouchableOpacity>
    );
  });
  return (
    <View>
      <View style={styles.imageContainer}>
        {imagesList}
      </View>
      <View style={styles.fileContainer}>
        {fileList}
      </View>
    </View>
  );
};

export default AttachmentsBlock;

const styles = StyleSheet.create({
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
});
