//import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  grow: {
  },
}));

export default function Bookmarks() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <Typography>
        BookMarkView
      </Typography>
    </div>
  );
}
