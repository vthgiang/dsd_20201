import { Avatar, Button, List, ListItemAvatar, ListItemText, TablePagination } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TimeAgo from 'javascript-time-ago';
// English.
import vi from 'javascript-time-ago/locale/vi';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';
import {
  createNotificationSubscription,
  initializePushNotifications,
  isPushNotificationSupported,
  registerServiceWorker,
  sendPushNotification, sendSubscriptionToPushServer
} from '../../../services/pushNotifications';
import { ref } from '../config4';
import SimpleRating from '../Rating';
import { ListItemStyle } from './index.style';
import FilterDropdown from '../Dropdown';
import { Row, Col } from 'antd';
import { set } from 'local-storage';


function LastSeen({ date }) {
  return (
    <ReactTimeAgo date={date} timeStyle="round-minute" locale="en-US" />
  )
}

TimeAgo.addDefaultLocale(vi)


var axios = require('axios');


const useStyles = makeStyles((theme) => ({
  primary: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  title: {
    fontSize: 24
  },

  avatar: {
    margin: "auto",
    height: 116,
    width: 120
  },
  description: {
    marginLeft: 16,
  },
  item: {
    margin: "8px 0px",
    height: 116,
    paddingLeft: 0,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const TimeHistory = (props) => {
  const { createdAt } = props;
  return <div>
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
    >
      <LastSeen date={createdAt}></LastSeen>
    </Grid>
  </div>
}

const Primary = (props) => {
  const classes = useStyles();
  const { content } = props;
  return <div>
    <div className={classes.primary}>{content}</div>
  </div>
}

const Secondary = (props) => {
  const classes = useStyles();
  return <div>
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <SimpleRating {...props}></SimpleRating>
      <TimeHistory {...props} />
    </Grid>
  </div>
}

const MyList = () => {

  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(5);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState(15);
  const [first, setFirst] = useState(true);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    loadData(index, count);
  }, [index, count, type])

  const getConfig = (start, to) => {
    var user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user);
    var config = {
      method: 'get',
      url: 'https://it4483-dsd04.herokuapp.com/get_list_ntf_type',
      params: {
        index: start,
        count: to,
        userID: user.user.id,
        type: type
      }
    };
    return config;
  }

  const loadData = async (start, to) => {
    var config = getConfig(start, to);
    axios(config)
      .then(function (response) {
        if (index === 0) {
          setDatas(response.data.data.notifications)
        } else {
          setDatas([...datas, ...response.data.data.notifications]);
        }
        setTotal(response.data.data.total)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (newPage > page)
      setIndex(count * newPage)
  }

  const handleClick = (id) => {
    console.log(`/warning-detail/${id}`);
    history.push(`/warning-detail/${id}`)
  }

  const handleOnclickSubcribe = () => {
    console.log("clicked to send subcription")
    if (isPushNotificationSupported()) {
      initializePushNotifications().then(result => {
        if (result === "granted") {
          console.log("start registering sw")
          registerServiceWorker();
          createNotificationSubscription().then(subscription => {
            sendSubscriptionToPushServer({
              subscription: subscription,
              project_type: 'CHAY_RUNG'
            })
          });
        }
      })
    }
  }

  const handleOnclickSendNotification = () => {
    console.log("clicked to send notification")
    sendPushNotification({
      project_type: 'CHAY_RUNG',
      payload: {
        "title": "chay rung",
        "text": "da xay ra chay rung o khu vuc ABC",
        "image": "logo512.png",
        "url": "https://vtv.vn/chay-rung.html"
      }
    })
  }

  const reset = (type, index) => {
    setType(type);
    setIndex(index)
    setPage(0)
  }

  return <div >
    <Button variant="contained" color="primary" onClick={handleOnclickSubcribe}>
      Subcribe notification
        </Button>
    <Button style={{ margin: 2 }} variant="contained" color="secondary" onClick={handleOnclickSendNotification}>
      Send notifications
        </Button>
    <Row>
      <Col span={20}><div className={classes.title}>Danh sách cảnh báo</div></Col>
      <Col span={4}><FilterDropdown reset={reset} /></Col>
    </Row>
    <List>
      {datas.slice(page * 5, page * 5 + rowsPerPage).map(data => (
        <ListItemStyle className={classes.item} onClick={() => handleClick(data._id)}>
          <ListItemAvatar className="name">
            <Avatar src={ref.prop[data.ref._type].img} className={classes.avatar} variant="rounded">
              {data.image}
            </Avatar>
          </ListItemAvatar>
          <ListItemText className={classes.description} primary={<Primary {...data} />} secondary={<Secondary {...data} />} />
        </ListItemStyle>
      ))}
    </List>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={total}
      rowsPerPage={5}
      page={page}
      onChangePage={handleChangePage}
    />
  </div>

}

export default MyList