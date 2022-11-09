import { getAllEvents, getMetaData } from './selectors';

describe('events selectors', () => {
  const state = {
    events: {
      metaData: 321,
    },
  };

  it('getAllEvents', () => {
    expect(getAllEvents(state)).toEqual({
      metaData: 321,
    });
  });

  it('getMetaData', () => {
    expect(getMetaData(state)).toEqual(321);
  });
});
