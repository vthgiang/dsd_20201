import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { WarningFilled } from '@ant-design/icons';

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    display: "flex",
    marginBottom: 0
  },
  rating: {
    color: 'red'
  }
}));


const SimpleRating = (props) => {
  const classes = useStyles();
  const { level } = props;
  return (
    <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxContainer} >
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Rating className={classes.rating} name="read-only" value={level} readOnly />
      </Grid>
    </Box>
  );
}

export default SimpleRating;