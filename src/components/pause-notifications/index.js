import React from 'react';
import PropTypes from 'prop-types';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { DateTimePicker } from 'material-ui-pickers';

import connectComponent from '../../helpers/connect-component';

import { shouldPauseNotifications as shouldPauseNotificationsFunc } from '../../state/preferences/utils';

// https://www.sketchappsources.com/free-source/2501-iphone-app-background-sketch-freebie-resource.html
import nightBackgroundPng from '../../images/night-background.png';

const styles = () => ({
  hidden: {
    display: 'none',
  },
  root: {
    padding: 0,
  },
  pausingHeader: {
    background: `url(${nightBackgroundPng})`,
    height: 210,
    backgroundSize: 400,
    alignItems: 'flex-end',
  },
});

const DialogPauseNotifications = (props) => {
  const {
    classes,
    shouldPauseNotifications,
  } = props;

  // https://material-ui-pickers-v2.dmtr-kovalenko.now.sh/guides/controlling-programmatically
  const pickerRef = React.useRef(null);

  if (shouldPauseNotifications) {
    return (
      <List
        component="nav"
        className={classes.root}
      >
        <ListItem classes={{ root: classes.pausingHeader }}>
          <ListItemText primary="Notifications paused until 9:00 PM" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Resume notifications" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Adjust time" />
          <ChevronRightIcon color="action" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Pause notifications by schedule..." />
        </ListItem>
      </List>
    );
  }

  return (
    <>
      <List
        component="nav"
        subheader={<ListSubheader component="div">Pause notifications</ListSubheader>}
        className={classes.root}
      >
        <ListItem button>
          <ListItemText primary="15 minutes" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="30 minutes" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="1 hour" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="2 hours" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="4 hours" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="8 hours" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="12 hours" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Until tommorow" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Until next week" />
        </ListItem>
        <ListItem
          button
          onClick={(e) => {
            if (pickerRef.current) {
              pickerRef.current.open(e);
            }
          }}
        >
          <ListItemText primary="Custom..." />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Pause notifications by schedule..." />
        </ListItem>
      </List>
      <DateTimePicker
        value={new Date()}
        onChange={(e) => console.log(e.getTime())}
        label="Custom"
        ref={pickerRef}
        className={classes.hidden}
        disablePast
        showTodayButton
      />
    </>
  );
};

DialogPauseNotifications.defaultProps = {};

DialogPauseNotifications.propTypes = {
  classes: PropTypes.object.isRequired,
  shouldPauseNotifications: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  shouldPauseNotifications: shouldPauseNotificationsFunc(state),
});

const actionCreators = {};

export default connectComponent(
  DialogPauseNotifications,
  mapStateToProps,
  actionCreators,
  styles,
);
