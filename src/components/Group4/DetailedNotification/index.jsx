import { CheckCircleTwoTone } from '@ant-design/icons';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { PROJECT_TYPE_MAP_TITLE, ref } from '../config4';

var axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: 8,
    maxWidth: 1400,
  },
  image: {
    margin: 'auto',
    display: 'block',
    width: 650,
    height: 410,
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  header: {
    fontSize: 24
  },
  gridDescription: {
    direction: "row",
    justify: "flex-start",
    alignItems: "center"
  }
}));


const GridDetailed = (props) => {
  const { title, content, link } = props;
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item sm={3} xs={12}>
        <Typography className={classes.gridDescription, classes.title}>{title}</Typography>
      </Grid>
      <Grid item sm={9} xs={12}>
        {link ?
          <Typography><Link href={content}>{content}</Link></Typography> :
          <Typography>{content}</Typography>
        }
      </Grid>
    </Grid>
  )
}

const DetailedNotification = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [notification, setNotification] = useState([]);
  const [status, setStatus] = useState(false);

  const onVerify = () => {
    setStatus(!status);
  }

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://it4483-dsd04.herokuapp.com/get_ntf',
      headers: {
        'Content-Type': 'application/json',
        'api-token': '1fa6b94047ba20d998b44ff1a2c78bba',
        'project-type': 'CHAY_RUNG'
      },
      params: { "idNtf": id }
    };
    axios(config).then(function (response) {
      setNotification(response.data.data);
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });

  }, [])

  console.log(`notification: ${notification}`);

  return (
    <div className={classes.root}>
      <div className={classes.header}>Thông tin cảnh báo chi tiết</div>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              {notification.ref && <img className={classes.image} alt="complex" src={ref.prop[notification.ref._type].img} />}
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  {notification.project_type && <Typography gutterBottom variant="h4" className={classes.title} >{PROJECT_TYPE_MAP_TITLE[notification.project_type]}</Typography>}
                  <Tooltip title={status ? "verified" : "unverified"}>
                    <CheckCircleTwoTone twoToneColor={status ? "#52c41a" : "#8c8c8c"} style={{ fontSize: 32, marginLeft: 8, marginBottom: 10, cursor: "pointer" }} onClick={onVerify} />
                  </Tooltip>
                </Grid>
                <GridDetailed title={"ID Sự cố:"} content={notification._id}></GridDetailed>
                <Grid container spacing={3}>
                  <Grid item sm={3} xs={12}>
                    <Typography className={classes.gridDescription, classes.title}>Mức độ:</Typography>
                  </Grid>
                  <Grid item sm={9} xs={12}>
                    <Rating name="read-only" value={notification.level || 0} readOnly style={{ color: "red" }} />
                  </Grid>
                </Grid>
                <GridDetailed title={"Mô tả:"} content={notification.content}></GridDetailed>
                {notification.fromUser && <GridDetailed title={"From user:"} content={notification.fromUser._id}></GridDetailed>}
                <GridDetailed title={"created At:"} content={notification.createdAt}></GridDetailed>
                {notification.ref && <GridDetailed title={"Ref Link:"} content={notification.ref._link} link={true}></GridDetailed>}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );

}

export default DetailedNotification;