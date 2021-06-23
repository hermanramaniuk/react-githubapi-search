import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Divider,
  Button,
} from '@material-ui/core';
import { getRepo } from 'redux/slices/repoReducer';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import {ReactComponent as ForkIcon} from '../../assets/icons/git-fork-24.svg';
import {ReactComponent as BranchIcon} from '../../assets/icons/git-branch-24.svg';
import {ReactComponent as IssueIcon} from '../../assets/icons/issue-opened-24.svg';
import {ReactComponent as NetworkIcon} from '../../assets/icons/git-pull-request-24.svg';

interface RouteParams {
  owner: string,
  name: string
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function SearchList() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { owner, name } = useParams<RouteParams>();

  const { repo } = useSelector((state:any) => state.repo);

  React.useEffect(() => {
    dispatch(getRepo(owner, name));
  }, [dispatch, owner, name]);

  return (
    <div className={classes.root}>
        { repo !== undefined && repo !== null && (
          <Grid container>
            <Grid item xs={6} sm={4} md={3} className="repo-sidebar">
              <BookOutlinedIcon className="repo-bookmark-icon-big"/>
              <h3 className="repo-fullname">{repo.full_name}</h3>
              <p className="repo-description">{repo.description}</p>
              <div className="repo-link-div">
                <LinkOutlinedIcon />
                <a className="repo-link" target="_blank" rel="noreferrer" href={repo.html_url}>{repo.full_name}</a>
              </div>
              <div className="repo-attr-div">
                <div className="repo-attr-title">
                  <VisibilityOutlinedIcon />
                  <span>Watch</span>
                </div>
                <span className="repo-attr-count">{repo.watchers}</span>
              </div>
              <Divider className="sidebar-devider"/>

              <div className="repo-attr-div">
                <div className="repo-attr-title">
                  <StarOutlineOutlinedIcon />
                  <span>Star</span>
                </div>
                <span className="repo-attr-count">{repo.stargazers_count}</span>
              </div>
              <Divider className="sidebar-devider"/>

              <div className="repo-attr-div fork-div">
                <div className="repo-attr-title">
                  <ForkIcon />
                  <span>Fork</span>
                </div>
                <span className="repo-attr-count">{repo.forks}</span>
              </div>


              <div className="repo-attr-div">
                <div className="repo-attr-title">
                  <BranchIcon />
                  <span>Subscribers</span>
                </div>
                <span className="repo-attr-count">{repo.subscribers_count}</span>
              </div>
              <Divider className="sidebar-devider"/>

              <div className="repo-attr-div">
                <div className="repo-attr-title">
                  <IssueIcon />
                  <span>Issues</span>
                </div>
                <span className="repo-attr-count">{repo.open_issues}</span>
              </div>
              <Divider className="sidebar-devider"/>

              <div className="repo-attr-div">
                <div className="repo-attr-title">
                  <NetworkIcon />
                  <span>Networks</span>
                </div>
                <span className="repo-attr-count">{repo.network_count}</span>
              </div>

              <Button className="add-bookmark-btn">
                <BookmarkBorderOutlinedIcon/>
                Add to Bookmarks
              </Button>
              <Button className="remove-bookmark-btn">
                <BookmarkBorderOutlinedIcon/>
                Remove Bookmarks
              </Button>
            </Grid>
            <Grid item xs={6} sm={8} md={9} className="repo-content-side">
              {repo.description}
            </Grid>
          </Grid>
          )
        }
    </div>
  );
}
