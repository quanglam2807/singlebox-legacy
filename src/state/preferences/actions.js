import { SET_PREFERENCE, UPDATE_PAUSE_NOTIFICATIONS_INFO } from '../../constants/actions';
import { getPauseNotificationsInfo, getCurrentScheduledDateTime } from './utils';


let timeouts = [];
let updating = false;
export const updatePauseNotificationsInfo = () => (dispatch, getState) => {
  // avoid multiple timeouts running at the same time
  if (updating) return;
  updating = true;

  const state = getState();

  const pauseNotificationsInfo = getPauseNotificationsInfo(state);

  // update info
  dispatch({
    type: UPDATE_PAUSE_NOTIFICATIONS_INFO,
    pauseNotificationsInfo,
  });

  // set schedule for reupdating
  const { pauseNotifications } = state.preferences;
  const schedule = getCurrentScheduledDateTime(state);

  // clear old timeouts
  timeouts.forEach((timeout) => {
    clearTimeout(timeout);
  });

  timeouts = [];

  // create new update timeout
  const addTimeout = (d) => {
    const t = new Date(d).getTime() - new Date().getTime();
    if (t > 0) {
      const newTimeout = setTimeout(() => {
        dispatch(updatePauseNotificationsInfo());
      }, t);
      timeouts.push(newTimeout);
    }
  };
  if (pauseNotifications) {
    if (pauseNotifications.startsWith('resume:')) {
      addTimeout(new Date(pauseNotifications.substring(7)));
    }
    if (pauseNotifications.startsWith('pause:')) {
      addTimeout(new Date(pauseNotifications.substring(6)));
    }
  }
  if (schedule) {
    addTimeout(schedule.from);
    addTimeout(schedule.to);
  }

  updating = false;
};

export const setPreference = (name, value) => (dispatch) => {
  dispatch({
    type: SET_PREFERENCE,
    name,
    value,
  });

  if (name.startsWith('pauseNotifications')) {
    dispatch(updatePauseNotificationsInfo());
  }
};
