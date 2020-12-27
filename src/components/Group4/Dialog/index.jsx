import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    dialogPaper: {
        height : '800px',
        width: '800px'
    },
});

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={onClose} open={open} classes={{ paper: classes.dialogPaper}}>
            <DialogTitle id="simple-dialog-title">Thông tin chi tiết</DialogTitle>
            <List>
                
            </List>
        </Dialog>
    );
}

export default SimpleDialog;