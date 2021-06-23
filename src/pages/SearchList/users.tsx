//import React from 'react';
import PropTypes from 'prop-types';
import { //useDispatch, 
  useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Avatar
} from '@material-ui/core';
//import { getUsers } from 'redux/slices/userReducer';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

interface Props {
    query: any;
}

UsersSerarchList.propTypes = {
    query: PropTypes.string
};

function UsersSerarchList(props: Props) {
  const classes = useStyles();

  //const dispatch = useDispatch();

  const history = useHistory();

  const { users } = useSelector((state:any) => state.user);

  /*React.useEffect(() => {
    dispatch(getUsers(props.query));
  }, [dispatch, props.query]);*/

  const handleListClick = (event:any, name:string) => {
    history.push(`/user/${name}`);
  };

  const renderItems = (): JSX.Element => {
    if(users.items === undefined || users.items.length === 0)
        return (<></>);

    const items = users.items.map(({id, login, type, avatar_url}: any) => (
        <div key={id}>
            <ListItem className="user-item" onClick={(event) => handleListClick(event, login)}>
                <ListItemAvatar className="user-avatar">
                  <Avatar  className="user-avatar-img" alt={login} src={avatar_url} />
                </ListItemAvatar>
                <ListItemText className="user-item-text" primary={login} secondary={type}/>
            </ListItem>
            <Divider className="item-devider"/>
        </div>
    ));

    return (
        <>
            {items}
        </>
    );
  };

  return (
    <div className={classes.root}>
        <List className="user-list" component="nav" aria-label="main left panel">
            { renderItems() }
        </List>
    </div>
  );
};

export default UsersSerarchList;
