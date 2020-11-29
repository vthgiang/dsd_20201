import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, TablePagination, Button } from '@material-ui/core'
import datas from './contacts.json'
import { ListItemStyle, ButtonStyle } from './index.style'
import { deepOrange, green } from '@material-ui/core/colors';
import StarIcon from '@material-ui/icons/Star';
import Dialog from "../Dialog";


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
    const { name, email } = props;
    return <div>
        <div>{name}</div>
        <div>{email}</div>
    </div>
}

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

    const classes = useStyles();
    return <div >
        <div className={classes.title}>Danh sách cảnh báo</div>
        <List>
            {datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(data => (
                <ListItemStyle className={classes.item} onClick={handleClickOpen}>
                    <ListItemAvatar className="name">
                        <Avatar className={classes.avatar} src="https://vtv1.mediacdn.vn/zoom/550_339/2020/9/29/mi290920-16013769565851267817310.jpg" variant="rounded">
                            {data.image}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText className={classes.description} primary={<Primary {...data} />} secondary={<StarIcon />}>
                    </ListItemText>
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