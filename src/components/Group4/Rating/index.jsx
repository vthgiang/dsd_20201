import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    display: "flex",
    marginBottom: 0
  }
}));


const SimpleRating = (props) => {
  const classes = useStyles();
  const { level } = props;
  console.log(`level: ${level}`);
  return (
    <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxContainer} >
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Typography component="legend" style={{ width: "auto" }}>Mức độ:</Typography>
        <Rating name="read-only" value={level} readOnly />
      </Grid>
    </Box>
  );
}

export default SimpleRating;