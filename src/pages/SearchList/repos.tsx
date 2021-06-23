//import React from 'react';
import PropTypes from 'prop-types';
import { //useDispatch, 
    useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@material-ui/core';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
//import { getRepos } from 'redux/slices/repoReducer';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

interface Props {
    query: any;
}

ReposSerarchList.propTypes = {
    query: PropTypes.string
};

function ReposSerarchList(props: Props) {
  const classes = useStyles();

  //const dispatch = useDispatch();

  const history = useHistory();

  const { repos } = useSelector((state:any) => state.repo);

  /*React.useEffect(() => {
    dispatch(getRepos(props.query));
  }, [dispatch, props.query]);*/

  const handleListClick = (event:any, owner:string, name:string) => {
    history.push(`/repo/${owner}/${name}`);
  };

  const renderItems = (): JSX.Element => {
    if(repos.items === undefined || repos.items.length === 0)
        return (<></>);

    const items = repos.items.map(({id, full_name, description, name, owner}: any) => (
        <div key={id}>
            <ListItem className="repo-item" onClick={(event) => handleListClick(event, owner.login, name)}>
                <ListItemIcon className="repo-bookmark-icon">
                    <BookOutlinedIcon />
                </ListItemIcon>
                <ListItemText className="repo-item-text" primary={full_name} secondary={description}/>
            </ListItem>
            <Divider className="item-devider" />
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
        <List className="repo-list" component="nav" aria-label="main left panel">
            { renderItems() }
        </List>
    </div>
  );
};

export default ReposSerarchList;
