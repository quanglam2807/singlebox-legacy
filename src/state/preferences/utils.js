// return reason why notifications are paused
export const getPauseNotificationsInfo = (state) => {
  const {
    pauseNotifications,
    pauseNotificationsBySchedule,
    pauseNotificationsByScheduleFrom,
    pauseNotificationsByScheduleTo,
  } = state.preferences;

  // check schedule
  if (pauseNotificationsBySchedule) {
    const fromDate = new Date(pauseNotificationsByScheduleFrom);
    const toDate = new Date(pauseNotificationsByScheduleTo);
    const currentDate = new Date();
    // convert to minute for easy calculation
    const fromMinute = fromDate.getHours() * 60 + fromDate.getMinutes();
    const toMinute = toDate.getHours() * 60 + toDate.getMinutes();
    const currentMinute = currentDate.getHours() * 60 + currentDate.getMinutes();

    // pause notifications from 8 AM to 7 AM
    // means pausing from 8 AM to midnight (today), midnight to 7 AM (next day)
    if (fromMinute > toMinute) {
      if (currentMinute >= fromMinute && currentMinute <= 23 * 60 + 59) {
        const tilDate = new Date();
        tilDate.setDate(tilDate.getDate() + 1);
        tilDate.setHours(toDate.getHours());
        tilDate.setMinutes(toDate.getMinutes()); // til 7 AM of the next day
        return {
          reason: 'scheduled',
          til: tilDate.toString(),
        };
      }
      if (currentMinute >= 0 && currentMinute <= toMinute) {
        const tilDate = new Date();
        tilDate.setHours(toDate.getHours());
        tilDate.setMinutes(toDate.getMinutes()); // til 7 AM of the same day
        return {
          reason: 'scheduled',
          til: tilDate.toString(),
        };
      }
    }

    // pause notification from 7 AM to 8 AM
    // means pausing from 7 AM to 8 AM of the same day
    if (fromMinute <= toMinute) {
      if (currentMinute >= fromMinute && currentMinute <= toMinute) {
        const tilDate = new Date();
        tilDate.setDate(tilDate.getDate());
        tilDate.setHours(toDate.getHours());
        tilDate.setMinutes(toDate.getMinutes()); // til 8 AM of the next day
        return {
          reason: 'scheduled',
          til: tilDate.toString(),
        };
      }
    }
  }

  return null;
};

export const shouldPauseNotifications = (state) => Boolean(
  getPauseNotificationsInfo(state) !== null,
);
