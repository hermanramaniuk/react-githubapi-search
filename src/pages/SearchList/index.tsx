import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  // ListItemText,
  Divider,
  Box,
 } from '@material-ui/core';
 import RepoIcon from '@material-ui/icons/InsertDriveFile';
 import UserIcon from '@material-ui/icons/SentimentVerySatisfied';
 import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
 import RepoView from './repos';
 import UserView from './users';
 import { ReactComponent as ScreenSearchIcon } from '../../assets/icons/screen_search_desktop.svg';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function SearchList() {
  const classes = useStyles();

  const [leftIndex, setLeftIndex] = React.useState<number>(0);

  const { repos } = useSelector((state:any) => state.repo);
  const { users } = useSelector((state:any) => state.user);

  const handleLeftListClick = (event:any, index:number) => {
    setLeftIndex(index);
  };

  const renderRepos = ():JSX.Element => {
    return (
      <div>
        <p className="content-title">{ numberWithCommas(repos.total_count) } Repository Results </p>
        <RepoView query={repos.query} />
      </div>
    );
  };

  const renderUsers = ():JSX.Element => {
    return (
      <div>
        <p className="content-title">{ numberWithCommas(users.total_count) } Users Results</p>
        <UserView query={repos.query} />
      </div>
    );
  };

  const numberWithCommas = (x:any) => {
    if(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else{
      return "0";
    }
  }

  return (
    <div className={classes.root}>
      {
        !(repos.total_count > 0 || users.total_count > 0) &&
        <div className="screen-no-result">
          <ScreenSearchIcon />
          <h3>Search results will appear here</h3>
        </div>
      }
      {
        (repos.total_count > 0 || users.total_count > 0) &&
        <Grid container>
          <Grid item xs={6} sm={4} md={3} className="sidebar">
            <List component="nav" aria-label="main left panel" className="sidebar-list">
              <ListItem
                button
                selected={leftIndex === 0}
                onClick={(event) => handleLeftListClick(event, 0)}
                className="sidebar-list-item"
              >
                <Box display="flex" justifyContent="flex-start" alignItems="center">
                  <ListItemIcon>
                    <RepoIcon />
                  </ListItemIcon>
                  <p>Repositories</p>
                </Box>
                <p>{numberWithCommas(repos.total_count)}</p>
                {/* <ListItemText primary={repos.total_count} /> */}
              </ListItem>
              <ListItem
                button
                selected={leftIndex === 1}
                onClick={(event) => handleLeftListClick(event, 1)}
                className="sidebar-list-item"
              >
                <Box display="flex" justifyContent="flex-start" alignItems="center">
                  <ListItemIcon>
                    <UserIcon />
                  </ListItemIcon>
                  <p>Users</p>
                </Box>
                <p>{numberWithCommas(users.total_count)}</p>
                {/* <ListItemText primary={users.total_count} /> */}
              </ListItem>
              <ListItem
                button
                selected={leftIndex === 2}
                onClick={(event) => handleLeftListClick(event, 2)}
                className="sidebar-list-item"
              >
                <Box display="flex" justifyContent="flex-start" alignItems="center">
                  <ListItemIcon>
                    <BookmarkBorderOutlinedIcon />
                  </ListItemIcon>
                  <p>Bookmarked</p>
                </Box>
                <p>12</p>
                {/* <ListItemText primary={users.total_count} /> */}
              </ListItem>
            </List>
            <Divider className="sidebar-devider"/>
          </Grid>
          <Grid item xs={6} sm={8} md={9} className="content-side">
            {leftIndex === 0 && renderRepos()}
            {leftIndex === 1 && renderUsers()}
          </Grid>
        </Grid>
      }
      
    </div>
  );
}
