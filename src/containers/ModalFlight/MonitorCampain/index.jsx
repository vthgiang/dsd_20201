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

  
const {monitorCampain} = props;


return (
  <>
  <div>
    {(() => {
      if (monitorCampain.status == 0) {
        return (<p>Thông tin đợt giám sát đã bị xóa</p>)
      } else {
        return(
          <div>
          <p>id : {monitorCampain.result.monitorCampaign._id}</p>
          <p>Tên : {monitorCampain.result.monitorCampaign.name}</p>
          <p>Mô tả : {monitorCampain.result.monitorCampaign.description}</p>
          <p>Nhiệm vụ : {monitorCampain.result.monitorCampaign.task}</p>
          <p>Thời gian bắt đầu : {monitorCampain.result.monitorCampaign.startTime}</p>
          <p>Thời gian kết thúc : {monitorCampain.result.monitorCampaign.endTime}</p>
          <p>Ngày tạo:  {monitorCampain.result.monitorCampaign.createdAt}</p>
        </div>
        )
      } 
    })()}
  </div>
  </>
  );
}
