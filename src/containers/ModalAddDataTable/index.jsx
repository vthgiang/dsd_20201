import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Input, Col, Row } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import ImageUploader from "react-images-upload";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: 20,
  },
  formItem: {
    padding: 10,
    margin: 0
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow:'scroll',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  button: {
    margin: theme.spacing(1),
  },

  divButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));


export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
      
  };

  const handleClose = () => {
    setOpen(false);
  };



  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [color, setColor] = useState();
  const [dimensions, setDimensions] = useState();
  const [maxFlightHeight, setMaxFlightHeight] = useState();
  const [maxFlightRange, setMaxFlightRange] = useState();
  const [maxFlightSpeed, setMaxFlightSpeed] = useState();
  const [maxFlightTime, setMaxFlightTime] = useState();
  const [rangeBattery, setBattery] = useState();
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  
  const saveDrone = () => {
    
    // const fd = new FormData();
    // fd.append('images', selectedImage, selectedImage.name)
    // axios.post('https://luan-drive.cf/upload?token=111111&folder=images', fd)
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => console.log(err))
    
    
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', '*');

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ 
        brand: brand,
        code: props.code,
        color: color,
        dimensions: dimensions,
        id: props.id,
        idLog: 0,
        maxFlightHeight: maxFlightHeight,
        maxFlightRange: maxFlightRange,
        maxFlightSpeed: maxFlightSpeed,
        maxFlightTime: maxFlightTime,
        name: name,
        rangeBattery: rangeBattery,
        task: 0,
        used: false
      })
    };

    fetch('http://skyrone.cf:6789/drone/save', requestOptions)
    .then(response => response.text())
    .then(contents =>  {
      alert("Đã lưu thành công"); 
      setOpen(false)})
    .catch(() => console.log("Can’t access " + 'http://skyrone.cf:6789/drone/getByCode/save' + " response. Blocked by browser?"))
      
  }

  function onDrop(picture) {
    // xử lý khi chọn một ảnh
    console.log(picture);
    setSelectedImage(picture[0]);
  }

  return (
    <div>

      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        startIcon={<AddCircleIcon/>}
      >
        Thêm drone
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Row>
              <ImageUploader
                withIcon={false}
                withPreview={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                simpleImage={true}
              />
            </Row>
            <Row >
              <Col>
                <Form.Item className={classes.formItem}>
                  <h4>Tên</h4>
                  <Input
                    className={classes.input}
                    onChange={event => setName(event.target.value)}
                  />
                </Form.Item>
                <Form.Item className={classes.formItem}>
                  <h4>Nhãn Hiệu</h4>
                  <Input
                    className={classes.input}
                    onChange={event => setBrand(event.target.value)}
                  />
                </Form.Item>
                <Form.Item className={classes.formItem}>
                  <h4>Màu</h4>
                  <Input
                    type="text" 
                    className={classes.input}
                    onChange={event => setColor(event.target.value)}
                  />
                </Form.Item>
                <Form.Item className={classes.formItem}>
                  <h4>Kích thước</h4>
                  <Input
                    className={classes.input}
                    onChange={event => setDimensions(event.target.value)}
                  />
                </Form.Item>
                <Form.Item className={classes.formItem}>
                  <h4>Giới hạn tầm bay (m)</h4>
                  <Input
                    className={classes.input}
                    onChange={event => setMaxFlightRange(event.target.value)}
                  />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item className={classes.formItem}>
                  <h4>Tốc độ tối đa (m/phút)</h4>
                  <Input
                    className={classes.input}
                    onChange={event => setMaxFlightSpeed(event.target.value)}
                  />
                </Form.Item>
                <Form.Item className={classes.formItem}>
                  <h4>Thời gian bay (phút)</h4>
                  <Input
                    className={classes.input}
                    onChange={event => setMaxFlightTime(event.target.value)}
                  />
                </Form.Item>
                <Form.Item className={classes.formItem}>
                  <h4>Trần bay (m)</h4>
                  <Input
                    className={classes.input}
                    onChange={event => setMaxFlightHeight(event.target.value)}
                  />
                </Form.Item>
                <Form.Item className={classes.formItem}>
                  <h4>Dung lượng pin (mAh)</h4>
                  <Input
                    className={classes.input}
                    onChange={event => setBattery(event.target.value)}
                  />
                </Form.Item>


              </Col>

            </Row>
            <div className={classes.divButton}>
              <Button
                onClick={saveDrone}
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Lưu
              </Button>
              
             </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );

}

