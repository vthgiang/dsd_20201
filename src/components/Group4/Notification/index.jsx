import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, TablePagination, Button } from '@material-ui/core'
// import datas from './contacts.json'
import { ListItemStyle, ButtonStyle } from './index.style'
import { deepOrange, green } from '@material-ui/core/colors';
import StarIcon from '@material-ui/icons/Star';
import Dialog from "../Dialog";
import { IMAGES } from '../../../constants';
import { InvertColorsOff, SentimentSatisfied } from '@material-ui/icons';
import ref from '../config4'
var axios = require('axios');


const useStyles = makeStyles((theme) => ({
    square: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    rounded: {
        color: '#fff',
        backgroundColor: green[500],
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
    }
}));

const Primary = (props) => {
    const { content, level } = props;
    return <div>
        <div>{content}</div>
        <div>{level}</div>
    </div>
}

const MyList = () => {

    const [datas, setDatas] = useState([]);

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

    },[])

    console.log(datas.length);


    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 5;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const classes = useStyles();
    return <div >
        <div className={classes.title}>Danh sách cảnh báo</div>
        <List>
            {datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(data => (
                <ListItemStyle className={classes.item} onClick={handleClickOpen}>
                    <ListItemAvatar className="name">
                        <Avatar src={ref.prop[data.ref._type].img} className={classes.avatar} variant="rounded">
                            {data.image}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className={classes.description} primary={<Primary {...data} />} secondary={<StarIcon />} />
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
        <Dialog open={open} onClose={handleClose} />
    </div>

}

export default MyList