import React from 'react';
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';

const InfinityScrollList = ({
  data, renderItem, onEndReached = () => {}, keyExtractor, ListHeaderComponent, reference,
}) => {
  const { width, height } = useWindowDimensions();

  const listStyles = { ...styles.list, marginBottom: width > height ? 0 : 50 };
  return (
    <FlatList
      ref={reference}
      keyExtractor={keyExtractor}
      style={listStyles}
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
  },
});

export default InfinityScrollList;
