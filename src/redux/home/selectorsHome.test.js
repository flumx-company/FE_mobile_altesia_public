import { getCreateFeatureRequest, getRequestRespond, getRequests } from './selectors';

describe('home selectors', () => {
  const state = {
    features: {
      requests: 'requests',
      createFeatureRequest: 123,
      requestRespond: 'requestRespond',
    },
  };

  it('getRequests', () => {
    expect(getRequests(state)).toEqual('requests');
  });

  it('getCreateFeatureRequest', () => {
    expect(getCreateFeatureRequest(state)).toEqual(123);
  });

  it('getRequestRespond', () => {
    expect(getRequestRespond(state)).toEqual('requestRespond');
  });
});
