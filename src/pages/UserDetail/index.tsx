import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Avatar
} from '@material-ui/core';
import { getUser } from 'redux/slices/userReducer';
import RepoView from './repos';

interface RouteParams {
  name: string
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function SearchList() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { name } = useParams<RouteParams>();

  const { user } = useSelector((state:any) => state.user);

  React.useEffect(() => {
    dispatch(getUser(name));
  }, [dispatch, name]);

  return (
    <div className={classes.root}>
        { user !== undefined && user !== null && (
          <Grid container>
            <Grid item xs={6} sm={4} md={3} className="user-sidebar">
              <Avatar className="user-avatar-big" alt={user.login} src={user.avatar_url} />
              <h3 className="username">{user.name}</h3>
              <p className="userlogin">{user.login}</p>
              <p className="usertype">{user.type}</p>
            </Grid>
            <Grid item xs={6} sm={8} md={9} className="user-content-side">
              <div>
                <RepoView query={user.login} />
              </div>
            </Grid>
          </Grid>
          )
        }
    </div>
  );
}
