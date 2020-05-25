import React from 'react';
import PropTypes from 'prop-types';

import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import SearchIcon from '@material-ui/icons/Search';
import ViewListIcon from '@material-ui/icons/ViewList';
import CreateIcon from '@material-ui/icons/Create';

import { FixedSizeList } from 'react-window';

import connectComponent from '../../helpers/connect-component';

import { requestOpenInBrowser } from '../../senders';

import { getHits, updateMode } from '../../state/dialog-add-workspace/actions';

import AppCard from './app-card';
import SubmitAppCard from './submit-app-card';
import AddCustomAppCard from './add-custom-app-card';
import NoConnection from './no-connection';
import EmptyState from './empty-state';
import SearchBox from './search-box';
import Form from './form';

import searchByAlgoliaLightSvg from '../../images/search-by-algolia-light.svg';
import searchByAlgoliaDarkSvg from '../../images/search-by-algolia-dark.svg';


const styles = (theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  title: {
    flex: 1,
  },
  paper: {
    zIndex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 0,
    overflow: 'hidden',
    boxSizing: 'border-box',
    position: 'relative',
  },
  grid: {
    marginBottom: theme.spacing(1),
  },
  searchByAlgoliaContainer: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    outline: 'none',
    width: '100%',
    textAlign: 'center',
  },
  searchByAlgolia: {
    height: 20,
    cursor: 'pointer',
  },
  bottomNavigation: {
    height: 40,
  },
  bottomNavigationActionWrapper: {
    flexDirection: 'row',
  },
  bottomNavigationActionLabel: {
    fontSize: '0.8rem !important',
    paddingLeft: 4,
  },
  homeContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  cardContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  contentContainer: {
    padding: theme.spacing(1),
  },
});

class AddWorkspace extends React.Component {
  componentDidMount() {
    const { onGetHits } = this.props;

    onGetHits();

    // const { isGetting, currentQuery, hits } = this.props;
    // if (!isGetting && currentQuery.length > 0 && hits.length < 1) return; // no result
  }

  render() {
    const {
      classes,
      currentQuery,
      hasFailed,
      hits,
      isGetting,
      mode,
      onGetHits,
      onUpdateMode,
      shouldUseDarkColors,
    } = this.props;

    const renderContent = () => {
      if (hasFailed) {
        return (
          <div className={classes.contentContainer}>
            <NoConnection
              onTryAgainButtonClick={onGetHits}
            />
          </div>
        );
      }

      if (!isGetting && hits.length < 1) {
        return (
          <EmptyState icon={SearchIcon} title="No Matching Results">
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  align="center"
                >
                  Your search -&nbsp;
                  <b>{currentQuery}</b>
                  &nbsp;- did not match any apps in the catalog.
                </Typography>
              </Grid>
              <Grid item>
                <AddCustomAppCard />
              </Grid>
              <Grid item>
                <SubmitAppCard />
              </Grid>
            </Grid>
          </EmptyState>
        );
      }

      const Row = ({ index, style }) => {
        if (index >= hits.length) {
          return (
            <div className={classes.cardContainer} style={{ ...style, height: 'auto', paddingTop: 8 }}>
              <SubmitAppCard />
              <div
                onKeyDown={(e) => {
                  if (e.key !== 'Enter') return;
                  requestOpenInBrowser('https://algolia.com');
                }}
                onClick={() => requestOpenInBrowser('https://algolia.com')}
                role="link"
                tabIndex="0"
                className={classes.searchByAlgoliaContainer}
              >
                <img
                  src={shouldUseDarkColors ? searchByAlgoliaDarkSvg : searchByAlgoliaLightSvg}
                  alt="Search by Algolia"
                  className={classes.searchByAlgolia}
                />
              </div>
            </div>
          );
        }

        const app = hits[index];
        return (
          <div className={classes.cardContainer} style={style}>
            <AppCard
              key={app.id}
              id={app.id}
              name={app.name}
              url={app.url}
              icon={app.icon}
              icon128={app.icon128}
            />
          </div>
        );
      };

      return (
        <FixedSizeList
          height={window.innerHeight - 80} // total height - search bar (40) - bottom nav (40)
          itemCount={!isGetting ? hits.length + 1 : hits.length}
          itemSize={60}
          width="100%"
        >
          {Row}
        </FixedSizeList>
      );
    };

    return (
      <div className={classes.root}>
        <div className={classes.homeContainer} style={mode !== 'catalog' ? { display: 'none' } : null}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SearchBox />
            </Grid>
          </Grid>
          <div
            className={classes.scrollContainer}
          >
            <Grid container className={classes.grid} spacing={2}>
              <Grid item xs={12}>
                {renderContent()}
              </Grid>
            </Grid>
            {isGetting && (
              <div style={{ position: 'absolute', bottom: 8, right: 8 }}>
                <CircularProgress size={28} />
              </div>
            )}
          </div>
        </div>
        {mode === 'custom' && <Form />}

        <Paper elevation={1} square className={classes.paper}>
          <BottomNavigation
            showLabels
            value={mode}
            onChange={(e, value) => onUpdateMode(value)}
            classes={{ root: classes.bottomNavigation }}
          >
            <BottomNavigationAction
              label="Catalog"
              value="catalog"
              icon={<ViewListIcon />}
              classes={{
                wrapper: classes.bottomNavigationActionWrapper,
                label: classes.bottomNavigationActionLabel,
              }}
            />
            <BottomNavigationAction
              label="Custom Workspace"
              value="custom"
              icon={<CreateIcon />}
              classes={{
                wrapper: classes.bottomNavigationActionWrapper,
                label: classes.bottomNavigationActionLabel,
              }}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

AddWorkspace.defaultProps = {
  currentQuery: '',
};

AddWorkspace.propTypes = {
  classes: PropTypes.object.isRequired,
  currentQuery: PropTypes.string,
  hasFailed: PropTypes.bool.isRequired,
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  isGetting: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  onGetHits: PropTypes.func.isRequired,
  onUpdateMode: PropTypes.func.isRequired,
  shouldUseDarkColors: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currentQuery: state.dialogAddWorkspace.currentQuery,
  hasFailed: state.dialogAddWorkspace.hasFailed,
  hits: state.dialogAddWorkspace.hits,
  isGetting: state.dialogAddWorkspace.isGetting,
  mode: state.dialogAddWorkspace.mode,
  shouldUseDarkColors: state.general.shouldUseDarkColors,
});

const actionCreators = {
  getHits,
  updateMode,
};

export default connectComponent(
  AddWorkspace,
  mapStateToProps,
  actionCreators,
  styles,
);
