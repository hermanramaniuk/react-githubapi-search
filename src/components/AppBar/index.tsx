import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import { getRepos } from '../../redux/slices/repoReducer';
import { getUsers } from '../../redux/slices/userReducer';
//import { getBookmarks } from '../../redux/slices/bookmarkReducer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ReactComponent as AppLogo } from '../../assets/icons/app-logo.svg';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    height: '64px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    height: '24px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#19417f',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  bookmarks: {
      display: 'flex'
  }
}));

export default function PrimaryAppBar() {
  const classes = useStyles();
  const [query, setQuery] = React.useState<string>('');

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state:any) => state.user);

  const doGithubSearch = (e:any) => {
    e.preventDefault();
    
    searchGithub();   
  }

  const searchGithub = React.useCallback(async () => {
    
    dispatch(getRepos(query));
    dispatch(getUsers(query));
    //dispatch(getBookmarks(query));
    
  }, [dispatch, query]);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
           <AppLogo />
          </Typography>
          <div className={classes.search}>
            <form onSubmit={doGithubSearch}>
              
                <div className={classes.searchIcon}>
                  {
                    !isLoading &&
                      <SearchIcon/>
                  }
                  {
                    isLoading &&
                    <CircularProgress className="loading-spinner"/>
                  }
                </div>
              
              
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={e => setQuery(e.target.value)}
              />
              
            </form>
          </div>
          <div className={classes.bookmarks}>
            <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                >
                <BookmarkIcon />
            </IconButton>
            <p>Bookmarks</p>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
