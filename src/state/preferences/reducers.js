import { SET_PREFERENCE, UPDATE_PAUSE_NOTIFICATIONS_INFO } from '../../constants/actions';

import { getPreferences } from '../../senders';

const initialState = getPreferences();

const preferences = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAUSE_NOTIFICATIONS_INFO: {
      const newState = { ...state };
      newState.pauseNotificationsInfo = action.pauseNotificationsInfo;

      return newState;
    }
    case SET_PREFERENCE: {
      const newState = { ...state };
      newState[action.name] = action.value;

      return newState;
    }
    default:
      return state;
  }
};

export default preferences;
