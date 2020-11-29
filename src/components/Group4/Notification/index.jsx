import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, TablePagination, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { ListItemStyle, ButtonStyle } from './index.style'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import UpdateIcon from '@material-ui/icons/Update';
import SimpleRating from '../Rating';
import { useHistory } from "react-router-dom";

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
    return <div>
        <UpdateIcon />
        <span>10 phút trước</span>
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
            <TimeHistory />
        </Grid>
    </div>
}

const MyList = () => {

    const [datas, setDatas] = useState([]);
    console.log(datas.length);
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 5;
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'https://it4483-dsd04.herokuapp.com/get_list_ntf',
            headers: {
                'Content-Type': 'application/json',
                'api-token': '1fa6b94047ba20d998b44ff1a2c78bba',
                'project-type': 'CHAY_RUNG'
            }
        };

        axios(config)
            .then(function (response) {
                setDatas(response.data.data);
                console.log(datas);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleClick = (id) => {
        console.log(`/warning-detail/${id}`);
        history.push(`/warning-detail/${id}`)
    }

    return <div >
        <div className={classes.title}>Danh sách cảnh báo</div>
        <List>
            {datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(data => (
                <ListItemStyle className={classes.item} onClick={() => handleClick(data._id)}>
                    <ListItemAvatar className="name">
                        <Avatar src='/images/tree.jpg' className={classes.avatar} variant="rounded">
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
            count={datas.length}
            rowsPerPage={5}
            page={page}
            onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </div>

}

export default MyList