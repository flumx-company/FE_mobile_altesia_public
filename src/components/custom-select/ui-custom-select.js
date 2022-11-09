import React, { useState } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet, FlatList, Pressable, Platform, Modal,
} from 'react-native';
import colors from '../../constants/colors';
import ArrowDownIcon from '../icons/arrow-down-icon';
import CheckboxUncheckedIcon from '../icons/checkbox-unchecked-icon';
import CheckboxCheckedIcon from '../icons/checkbox-checked-icon';
import RadioCheckedIcon from '../icons/radio-checked-icon';
import RadioUncheckedIcon from '../icons/radio-unchecked-icon';
import fonts from '../../constants/fonts';
import DeleteIcon from '../icons/delete-icon';
import cutString from '../../helpers/cutString';

const ListItem = ({
  value, id, selected, handleSelect, isRadio, withIcons, isMulti, isChecked,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const clickStyles = { opacity: isPressed ? 0.5 : 1 };
  return isMulti
    ? (
      <Pressable
        style={styles.listItem}
        onPress={() => handleSelect(id, value)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        {isRadio
          ? (
            withIcons && (
            <View style={{ ...styles.iconsContainer, ...clickStyles }}>
              { isChecked ? <RadioCheckedIcon /> : <RadioUncheckedIcon />}
            </View>
            )
          )
          : (
            withIcons && (
            <View style={{ ...styles.iconsContainer, ...clickStyles }}>
              { isChecked ? <CheckboxCheckedIcon /> : <CheckboxUncheckedIcon />}
            </View>
            )
          ) }
        <Text style={{ ...styles.listItemText, ...clickStyles }}>{value}</Text>
      </Pressable>
    )
    : (
      <Pressable
        style={styles.listItem}
        onPress={() => handleSelect(id, value)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        {isRadio
          ? (
            withIcons && (
            <View style={{ ...styles.iconsContainer, ...clickStyles }}>
              { value === selected ? <RadioCheckedIcon /> : <RadioUncheckedIcon />}
            </View>
            )
          )
          : (
            withIcons && (
            <View style={{ ...styles.iconsContainer, ...clickStyles }}>
              { value === selected ? <CheckboxCheckedIcon /> : <CheckboxUncheckedIcon />}
            </View>
            )
          ) }
        <Text style={{ ...styles.listItemText, ...clickStyles }}>{value}</Text>
      </Pressable>
    );
};

const UiCustomSelect = ({
  data = [],
  id,
  selected,
  setSelected = () => {},
  withDeleteBtn = false,
  placeholder,
  isRadio,
  handleCheck = () => {},
  handleRemove = () => {},
  arrowIconColor,
  containerStyles = {},
  btnStyles = {},
  placeholderStyles = {},
  selectedTextStyles = {},
  listStyles = {},
  withIcons = true,
  title,
  zIndex,
  isMulti = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => setIsOpen((prev) => !prev);

  const handleCloseModal = () => setIsOpen(false);

  const handleSelect = (idItem, value) => {
    if (!isMulti) {
      setSelected(value);
      setIsOpen(false);
    }
    handleCheck(idItem, value);
  };

  const handleDelete = () => {
    setSelected(false);
    handleRemove(id);
  };

  const selectBtnStyles = {
    ...styles.selectBtn,
    borderColor: error ? colors.validation : colors.mainGrey,
    paddingRight: withDeleteBtn && selected ? 0 : 17,
    ...btnStyles,
  };

  const IosList = {
    top: title ? 70 : 50,
  };

  const getNames = (arr) => cutString(arr.map((item) => item.name).join(', '), 35);

  return (
    <View style={{ ...styles.container, ...containerStyles, zIndex }}>
      {title && <Text style={styles.selectTitle}>{title}</Text>}
      {
        isMulti
          ? (
            <TouchableOpacity
              style={selectBtnStyles}
              onPress={handleToggleOpen}
            >
              {selected.length
                ? <Text style={{ ...styles.selectedText, ...selectedTextStyles }}>{getNames(selected)}</Text>
                : <Text style={{ ...styles.placeholderText, ...placeholderStyles }}>{placeholder}</Text>}
              {withDeleteBtn && selected
                ? (
                  <Pressable
                    onPress={handleDelete}
                    style={styles.deleteIcon}
                  >
                    <DeleteIcon />
                  </Pressable>
                ) : <ArrowDownIcon color={arrowIconColor} />}
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity
              style={selectBtnStyles}
              onPress={handleToggleOpen}
            >
              {selected
                ? <Text style={{ ...styles.selectedText, ...selectedTextStyles }}>{selected}</Text>
                : <Text style={{ ...styles.placeholderText, ...placeholderStyles }}>{placeholder}</Text>}
              {withDeleteBtn && selected
                ? (
                  <Pressable
                    onPress={handleDelete}
                    style={styles.deleteIcon}
                  >
                    <DeleteIcon />
                  </Pressable>
                ) : <ArrowDownIcon color={arrowIconColor} />}
            </TouchableOpacity>
          )
      }
      {error && (
      <Text style={styles.errorText}>
        {error}
      </Text>
      )}
      {isOpen && Platform.OS === 'ios' && (
      <View style={{ ...styles.listContainer, ...IosList, ...listStyles }}>
        <FlatList
          data={data}
          persistentScrollbar
          renderItem={({ item }) => (
            <ListItem
              value={item.name}
              id={item.id}
              selected={selected}
              handleSelect={handleSelect}
              isChecked={item.isChecked}
              isMulti={isMulti}
              isRadio={isRadio}
              withIcons={withIcons}
            />
          )}
          style={styles.list}
        />
      </View>
      )}
      {Platform.OS === 'android'
      && (
      <Modal
        animationType="fade"
        transparent
        visible={isOpen}
        supportedOrientations={['portrait', 'landscape']}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={handleCloseModal}>
          {
            isMulti
              ? (
                <TouchableOpacity
                  style={{ ...selectBtnStyles, ...{ width: '100%', marginBottom: 0 } }}
                  onPress={handleToggleOpen}
                >
                  {selected.length
                    ? <Text style={{ ...styles.selectedText, ...selectedTextStyles }}>{getNames(selected)}</Text>
                    : <Text style={{ ...styles.placeholderText, ...placeholderStyles }}>{placeholder}</Text>}
                  {withDeleteBtn && selected
                    ? (
                      <Pressable
                        onPress={handleDelete}
                        style={styles.deleteIcon}
                      >
                        <DeleteIcon />
                      </Pressable>
                    ) : <ArrowDownIcon color={arrowIconColor} />}
                </TouchableOpacity>
              )
              : (
                <TouchableOpacity
                  style={{ ...selectBtnStyles, ...{ width: '100%', marginBottom: 0 } }}
                  onPress={handleToggleOpen}
                >
                  {selected
                    ? <Text style={{ ...styles.selectedText, ...selectedTextStyles }}>{selected}</Text>
                    : <Text style={{ ...styles.placeholderText, ...placeholderStyles }}>{placeholder}</Text>}
                  {withDeleteBtn && selected
                    ? (
                      <Pressable
                        onPress={handleDelete}
                        style={styles.deleteIcon}
                      >
                        <DeleteIcon />
                      </Pressable>
                    ) : <ArrowDownIcon color={arrowIconColor} />}
                </TouchableOpacity>
              )
          }
          <View style={{ ...styles.listContainer, ...listStyles }}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <ListItem
                  value={item.name}
                  id={item.id}
                  selected={selected}
                  isChecked={item.isChecked}
                  isMulti={isMulti}
                  handleSelect={handleSelect}
                  isRadio={isRadio}
                  withIcons={withIcons}
                />
              )}
              style={styles.list}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 17,
    position: 'relative',
  },
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bgSecondary,
    height: 50,
    borderWidth: 1,
    paddingLeft: 17,
    borderRadius: 3,
  },
  selectedText: {
    fontFamily: fonts.primaryRegular,
    color: colors.textPrimary,
    fontSize: 16,
  },
  placeholderText: {
    fontFamily: fonts.primaryRegular,
    color: colors.mainGrey,
    fontSize: 16,
  },
  listContainer: {
    position: (Platform.OS === 'ios') ? 'absolute' : 'relative',
    left: 0,
    maxHeight: 200,
    width: '100%',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.mainGrey,
  },
  listItem: {
    height: 50,
    width: '100%',
    backgroundColor: colors.bgSecondary,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsContainer: {
    marginRight: 17,
  },
  listItemText: {
    fontFamily: fonts.primaryRegular,
    color: colors.textLight,
    fontSize: 16,
  },
  deleteIcon: {
    height: '100%',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgModal,
  },
  selectTitle: {
    marginBottom: 5,
    fontSize: 14,
    fontFamily: fonts.primaryMedium,
    color: colors.textPrimary,
  },
  errorText: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
    color: colors.validation,
  },
});

export default UiCustomSelect;
