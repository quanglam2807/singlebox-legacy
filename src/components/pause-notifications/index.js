import React from 'react';
import PropTypes from 'prop-types';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { DateTimePicker } from 'material-ui-pickers';

import connectComponent from '../../helpers/connect-component';

const styles = () => ({
  hidden: {
    display: 'none',
  },
});

const DialogPauseNotifications = (props) => {
  const {
    classes,
  } = props;

  // https://material-ui-pickers-v2.dmtr-kovalenko.now.sh/guides/controlling-programmatically
  const pickerRef = React.useRef(null);

  return (
    <div>
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
          <ListItemText primary="Do Not Disturb schedule..." />
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
    </div>
  );
};

DialogPauseNotifications.defaultProps = {};

DialogPauseNotifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({});

const actionCreators = {};

export default connectComponent(
  DialogPauseNotifications,
  mapStateToProps,
  actionCreators,
  styles,
);
