import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, TablePagination, Button } from '@material-ui/core'
import datas from './contacts.json'
import { ListItemStyle, ButtonStyle } from './index.style'
import Dialog from "../Dialog";

const MyList = () => {
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
                        <Avatar src="https://vtv1.mediacdn.vn/zoom/550_339/2020/9/29/mi290920-16013769565851267817310.jpg">
                            {data.image}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={data.name} secondary={data.email} />

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