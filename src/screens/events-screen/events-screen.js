import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenContainer from '../../components/screen-container/screen-container';
import ScreenTitle from '../../components/screen-title/screen-title';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import AllMineSwitch from '../../components/all-mine-switch/all-mine-switch';
import EventCard from './components/event-card';
import { getAllEvents } from '../../redux/events/selectors';
import {
  allEventsRequested, mineEventsRequested,
} from '../../redux/events/actions';
import InfinityScrollList from '../../components/infinity-scroll-list/infinity-scroll-list';
import getImageUri from '../../dataAdapter/getImageUri';
import EmptyMineBlock from '../../components/empty-mine-block/empty-mine-block';

const EventsScreen = () => {
  const [whoseEvents, setWhoseEvents] = useState('all');
  const [allPage, setAllPage] = useState(2);
  const [minePage, setMinePage] = useState(2);

  const dispatch = useDispatch();
  const events = useSelector(getAllEvents);

  const handleChooseAll = () => setWhoseEvents('all');
  const handleChooseMine = () => setWhoseEvents('mine');

  useEffect(() => {
    setAllPage(2);
    setMinePage(2);
    if (whoseEvents === 'all') {
      dispatch(allEventsRequested());
    }
    if (whoseEvents === 'mine') {
      dispatch(mineEventsRequested());
    }
  }, [whoseEvents]);

  const loadMoreAllEvents = () => {
    dispatch(allEventsRequested(allPage));
    setAllPage((prev) => prev + 1);
  };

  const loadMoreMineEvents = () => {
    dispatch(mineEventsRequested(minePage));
    setMinePage((prev) => prev + 1);
  };

  // render list item
  const renderItemFn = ({ item }) => (
    <EventCard
      whoseEvents={whoseEvents}
      id={item.id}
      title={item.title}
      text={item.description}
      date={item.updated_at}
      imgUri={item && getImageUri(item)}
      maxAttendanceNumber={item.maxAttendanceNumber}
      userEvents={item.userEvents}
      attachmentFiles={item.attachmentFiles}
      countOfAppliedUsers={item.countOfAppliedUsers}
    />
  );

  return (
    <ScreenContainer withScroll={false}>
      { whoseEvents === 'all'
        ? <ScreenTitle title="Events" />
        : <Text style={styles.mineText}>You’re going to visit below events</Text> }
      <AllMineSwitch
        handleChooseAll={handleChooseAll}
        handleChooseMine={handleChooseMine}
        whose={whoseEvents}
      />
      {whoseEvents === 'mine' && events.mine.length === 0 ? (
        <EmptyMineBlock
          onPress={handleChooseAll}
          text="You don’t have any planned events yet. Search one with the button below"
          textBtn="Show events"
        />
      )
        : (
          <InfinityScrollList
            data={whoseEvents === 'all' ? events.all : events.mine}
            renderItem={renderItemFn}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={whoseEvents === 'all' ? loadMoreAllEvents : loadMoreMineEvents}
          />
        )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  mineText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: fonts.primaryRegular,
    marginBottom: 30,
    marginTop: 40,
  },
});

export default EventsScreen;
