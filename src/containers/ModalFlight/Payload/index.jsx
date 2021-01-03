import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import { Image } from 'antd'; 
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function PinnedSubheaderList(props) {
  const classes = useStyles();

  
const {payload} = props;


return (
    <List className={classes.root} subheader={<li />}>
      {payload.map((item) => (
        <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Image
            width={50}
            src={item.image}
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"id: " + item.type._id} secondary= {
             <React.Fragment>
             <Typography
               component="span"
               variant="body2"
               className={classes.inline}
               color="textPrimary"
             >
                {item.type.name}  - 
             </Typography>
             {item.type.description}
           </React.Fragment>
         } />
      </ListItem>
      ))}
    </List>
  );
}
