import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import SimpleRating from '../Rating';
import { useParams } from "react-router-dom";
import Box from '@material-ui/core/Box';

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
        width: 700,
        height: "auto",
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
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

const DetailedNotification = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:5000/get_ntf',
            headers: {
                'Content-Type': 'application/json',
                'api-token': '1fa6b94047ba20d998b44ff1a2c78bba',
                'project-type': 'CHAY_RUNG'
            },
            params: { "idNtf": id }
        };
        axios(config).then(function (response) {
            setNotification(response.data);
        }).catch(function (error) {
            console.log(error);
        });

    }, [])

    console.log(notification);

    return (
        <div className={classes.root}>
            <div className={classes.header}>Thông tin cảnh báo chi tiết</div>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="/images/forest_fires.jpg" />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h4" className={classes.title} >Sự cố cháy rừng</Typography>
                                <Typography variant="body2" gutterBottom>ID: {notification._id}</Typography>
                                <SimpleRating level={notification.level || 0} />
                                <Typography variant="body2" gutterBottom>Mô tả: {notification.content}</Typography>
                                {notification.fromUser && <Typography variant="body2" gutterBottom>From User: {notification.fromUser._id}</Typography>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );

}

export default DetailedNotification;