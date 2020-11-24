import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, TablePagination, Button } from '@material-ui/core'
// import datas from './contacts.json'
import { ListItemStyle, ButtonStyle } from './index.style'
import Dialog from "../Dialog";
import { IMAGES } from '../../../constants';
import { InvertColorsOff, SentimentSatisfied } from '@material-ui/icons';

var axios = require('axios');

const MyList = () => {

    const [datas, setDatas] = useState([]);
    const isLoad = false;
    useEffect(() => {
        if(!isLoad) {
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
        }
    })



    const [open, setOpen] = React.useState(false);
    //const [selectedValue, setSelectedValue] = React.useState(emails[1]);
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
        //setSelectedValue(value);
    };



    return <div>
        <List>
            {datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(data => (
                <ListItemStyle onClick={handleClickOpen}>
                    <ListItemAvatar className="name">
                        <Avatar src='/images/tree.jpg'>
                            {data.image}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={data.content} secondary={data.level} />

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