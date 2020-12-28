import React, { useState, useEffect } from 'react';
import to from 'await-to-js';
import {
  Button,
  Checkbox,
  Modal,
  Input,
  Form,
  Select,
  DatePicker,
  message,
} from 'antd';
import Gallery from 'react-grid-gallery';
import incidentLevelService from '../../../services/group09/incidentLevelService';
import incidentService from '../../../services/group09/incidentService';
import imageService from '../../../services/group09/imageService';
import moment from 'moment';
let levels = [];
const MONITORED_OBJS = [
    {
        id: '1',
        name: 'Trạm HDHN 01'
    },
    {
        id: '2',
        name: 'Trạm vượt biển'
    },
    {
        id: '3',
        name: 'Cháy trạm NT3'
    },
    {
        id: '4',
        name: 'Trạm Rừng Tràm CP1'
    },
    {
        id: '5',
        name: 'Trạm Hoài Đức'
    },
    {
        id: '6',
        name: 'Trạm rừng Sơn La'
    },
    {
        id: '7',
        name: 'Trạm rừng chim Ninh Bình'
    },
    {
        id: '8',
        name: 'Cột cao thế đơn Đan Phượng km11'
    },
]
const IMAGES = [
    {
  description: "Ảnh theo dõi trạm HDHN 01 ngày 25/16/2020",
  latitude: 0.679296,
  link: "/images/luoi_dien/dien_1.jpg",
  longitude: 0.512543,
  monitoredObjectId: "1",
  problemType: 2,
  title: "Trạm HDHN 01",
  type: 0
  },
    {
  description: "Ảnh theo dõi trạm HDHN 01 ngày 25/16/2020",
  latitude: 0.679296,
  link: "/images/luoi_dien/dien_2.jpg",
  longitude: 0.512543,
  monitoredObjectId: "1",
  problemType: 2,
  title: "Trạm HDHN 01",
  type: 0
  },
  {
  description: "Ảnh theo dõi trạm HDHN 01 ngày 25/16/2020",
  latitude: 0.679296,
  link: "/images/luoi_dien/dien_3.jpeg",
  longitude: 0.512543,
  monitoredObjectId: "1",
  problemType: 2,
  title: "Trạm HDHN 03",
  type: 0
  },
{
  description: "Ảnh theo dõi trạm vượt biển 01",
  latitude: 0.679296,
  link: "/images/luoi_dien/dien_4.jpg",
  longitude: 0.512543,
  monitoredObjectId: "2",
  problemType: 2,
  title: "Trạm vượt biển",
  type: 0
  },
{
  description: "Ảnh theo dõi trạm vượt biển 01",
  latitude: 0.679296,
  link: "/images/luoi_dien/dien_5.jpg",
  longitude: 0.512543,
  monitoredObjectId: "2",
  problemType: 2,
  title: "Trạm vượt biển",
  type: 0
  },
{
  description: "Ảnh theo dõi trạm vượt biển 01",
  latitude: 0.679296,
  link: "/images/luoi_dien/dien_6.jpg",
  longitude: 0.512543,
  monitoredObjectId: "2",
  problemType: 2,
  title: "Trạm vượt biển",
  type: 0
  },
{
  description: "Ảnh theo dõi trạm vượt biển 01",
  latitude: 0.679296,
  link: "/images/luoi_dien/dien_7.jpg",
  longitude: 0.512543,
  monitoredObjectId: "2",
  problemType: 2,
  title: "Trạm vượt biển",
  type: 0
  },
  {
    description: "Cháy trạm NT3",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_8.jpg",
    longitude: 0.512543,
    monitoredObjectId: "3",
    problemType: 2,
    title: "Cháy trạm NT3",
    type: 0
  },
  {
    description: "Đổ và cháy trạm NT3",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_9.jpeg",
    longitude: 0.512543,
    monitoredObjectId: "3",
    problemType: 2,
    title: "trạm NT3",
    type: 0
  },
  {
    description: "Vượn trèo trạm trong rừng",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_10.jpg",
    longitude: 0.512543,
    monitoredObjectId: "4",
    problemType: 2,
    title: "Trạm Rừng Tràm CP1",
    type: 0
  },
{
    description: "Vượn trèo trạm trong rừng",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_11.jpg",
    longitude: 0.512543,
    monitoredObjectId: "4",
    problemType: 2,
    title: "Trạm Rừng Tràm CP1",
    type: 0
  },
{
    description: "Vượn trèo trạm trong rừng",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_12.jpg",
    longitude: 0.512543,
    monitoredObjectId: "4",
    problemType: 2,
    title: "Trạm Rừng Tràm CP1",
    type: 0
  },
{
    description: "Trạm Hoài Đức",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_13.jpg",
    longitude: 0.512543,
    monitoredObjectId: "5",
    problemType: 2,
    title: "Trạm Hoài Đức",
    type: 0
  },
{
    description: "Trạm Hoài Đức",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_14.jpg",
    longitude: 0.512543,
    monitoredObjectId: "5",
    problemType: 2,
    title: "Trạm Hoài Đức",
    type: 0
  },
{
    description: "Trạm Hoài Đức",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_15.jpg",
    longitude: 0.512543,
    monitoredObjectId: "5",
    problemType: 2,
    title: "Trạm Hoài Đức",
    type: 0
  },
{
    description: "Trạm Hoài Đức",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_16.jpg",
    longitude: 0.512543,
    monitoredObjectId: "5",
    problemType: 2,
    title: "Trạm Hoài Đức",
    type: 0
  },
{
    description: "Trạm rừng Sơn La",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_17.jpg",
    longitude: 0.512543,
    monitoredObjectId: "6",
    problemType: 2,
    title: "Trạm rừng Sơn La",
    type: 0
  },
{
    description: "Trạm rừng Sơn La",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_18.jpg",
    longitude: 0.512543,
    monitoredObjectId: "6",
    problemType: 2,
    title: "Trạm rừng Sơn La",
    type: 0
  },
{
    description: "Trạm rừng Sơn La",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_19.jpg",
    longitude: 0.512543,
    monitoredObjectId: "6",
    problemType: 2,
    title: "Trạm rừng Sơn La",
    type: 0
  },
{
    description: "Trạm rừng Sơn La",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_20.jpeg",
    longitude: 0.512543,
    monitoredObjectId: "6",
    problemType: 2,
    title: "Trạm rừng Sơn La",
    type: 0
  },
{
    description: "Trạm rừng Sơn La",
    latitude: 0.679296,
    link: "/images/luoi_dien/dien_25.jpg",
    longitude: 0.512543,
    monitoredObjectId: "6",
    problemType: 2,
    title: "Trạm rừng Sơn La",
    type: 0
  },
    {
        description: "Trạm rừng Sơn La",
        latitude: 0.679296,
        link: "/images/luoi_dien/dien_26.jpeg",
        longitude: 0.512543,
        monitoredObjectId: "6",
        problemType: 2,
        title: "Trạm rừng Sơn La",
        type: 0
    },
 {
        description: "Trạm rừng Sơn La",
        latitude: 0.679296,
        link: "/images/luoi_dien/dien_27.jpg",
        longitude: 0.512543,
        monitoredObjectId: "6",
        problemType: 2,
        title: "Trạm rừng Sơn La",
        type: 0
    },
 {
        description: "Trạm rừng chim Ninh Bình",
        latitude: 0.679296,
        link: "/images/luoi_dien/dien_21.jpeg",
        longitude: 0.512543,
        monitoredObjectId: "7",
        problemType: 2,
        title: "Trạm rừng chim Ninh Bình",
        type: 0
    },
{
        description: "Trạm rừng chim Ninh Bình",
        latitude: 0.679296,
        link: "/images/luoi_dien/dien_22.jpg",
        longitude: 0.512543,
        monitoredObjectId: "7",
        problemType: 2,
        title: "Trạm rừng chim Ninh Bình",
        type: 0
    },
{
        description: "Trạm rừng chim Ninh Bình",
        latitude: 0.679296,
        link: "/images/luoi_dien/dien_23.jpg",
        longitude: 0.512543,
        monitoredObjectId: "7",
        problemType: 2,
        title: "Trạm rừng chim Ninh Bình",
        type: 0
    },
{
        description: "Trạm rừng chim Ninh Bình",
        latitude: 0.679296,
        link: "/images/luoi_dien/dien_24.jpg",
        longitude: 0.512543,
        monitoredObjectId: "7",
        problemType: 2,
        title: "Trạm rừng chim Ninh Bình",
        type: 0
    },
{
        description: "Trạm rừng chim Ninh Bình",
        latitude: 0.679296,
        link: "/images/luoi_dien/dien_31.jpeg",
        longitude: 0.512543,
        monitoredObjectId: "7",
        problemType: 2,
        title: "Trạm rừng chim Ninh Bình",
        type: 0
    },
{
        description: "Cột cao thế đơn Đan Phượng km11",
        latitude: 0.679296,
        link: "/images/luoi_dien/dien_32.jpg",
        longitude: 0.512543,
        monitoredObjectId: "8",
        problemType: 2,
        title: "Cột cao thế đơn Đan Phượng km11",
        type: 0
    },
{
        description: "Cột cao thế đơn Đan Phượng km11",
        latitude: 0.679296,
        link: "/images/luoi_dien/dien_33.jpg",
        longitude: 0.512543,
        monitoredObjectId: "8",
        problemType: 2,
        title: "Cột cao thế đơn Đan Phượng km11",
        type: 0
    },

]
let cache = IMAGES
const ImageGalley = (props) => {
  const [images, setImages] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedIds, setSelectedIds] = useState([]);

  const convertImages = (values = []) => {
      return (values || []).map((item) => {
          let monitored = MONITORED_OBJS.find(i => i.id === item.monitoredObjectId)
          let createdAt = moment().format('DD/MM/YYYY hh:mm:ss');
          let nameType = '';
          switch (item.problemType) {
              case 0:
                  nameType = 'Cháy rừng';
                  break;
              case 1:
                  nameType = 'Đê điều';
                  break;
              case 2:
                  nameType = 'Lưới điện';
                  break;
              case 3:
                  nameType = 'Cây trồng';
                  break;
              default:
                  nameType = '';
          }
          return {
              ...item,
              src: item.link,
              caption: item.title,
              thumbnailWidth: 320,
              thumbnailHeight: 212,
              thumbnail: item.link,
              tags: [
                  { value: createdAt, title: 'Created At' },
                  { value: nameType, title: 'Type' },
                  { value: monitored.name, title: 'Monitored' },
              ],
          };
      });
  }

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
      let _images = convertImages(IMAGES)
      setImages(_images);
    console.log('fetch level');
    let [leverRes = {}] = await Promise.all([
      incidentLevelService().index()
    ]);
    console.log('leverRes', leverRes);
    levels = leverRes;
  };



  const allImagesSelected = (_images) => {
    return (
      _images.filter((img) => Boolean(img.isSelected)).length == _images.length
    );
  };

  const onSelectImage = (index, image) => {
    let _images = images.slice();
    let img = _images[index];
    img.hasOwnProperty('isSelected')
      ? (img.isSelected = !img.isSelected)
      : (img.isSelected = true);
    setImages(_images);
    allImagesSelected(images)
      ? setSelectAllChecked(true)
      : setSelectAllChecked(false);
  };

  const getSelectedImages = () => {
    let selected = [];
    for (let i = 0; i < images.length; i++)
      if (images[i].isSelected == true) selected.push(i);
    return selected;
  };

  const onClickSelectAll = () => {
    let _selectAllChecked = !selectAllChecked;
    setSelectAllChecked(_selectAllChecked);

    let _images = images.slice();
    if (_selectAllChecked) {
      for (let i = 0; i < images.length; i++) _images[i].isSelected = true;
    } else {
      for (let i = 0; i < images.length; i++) _images[i].isSelected = false;
    }
    setImages([..._images]);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let selectedImages = images.filter((item) => Boolean(item.isSelected));
    form
      .validateFields()
      .then(async (values) => {
        console.log('values', values);
        let [error, res] = await to(
          incidentService().create({
            ...values,
            dueDate: moment(values.dueDate).format('YYYY-MM-DD'),
            images: selectedImages,
            type: 'LUOI_DIEN',
          }),
        );
        if (error) message.error('Đã có lỗi xảy ra!');
        message.success('Sự cố đã được tạo mới!');
        setConfirmLoading(false);
        setVisible(false);
      })
      .catch((errorInfo) => {
        console.log('errorInfo', errorInfo);
        setConfirmLoading(false);
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChangeSelect = async (value = []) => {
      let filterImages = IMAGES.filter(i => value.includes(i.monitoredObjectId))
      await setImages(convertImages(filterImages))
  }

  const renderOptions = () => {
      return MONITORED_OBJS.map((item) => (
          <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
      ))
  }
  return (
    <div>
      <Checkbox onChange={onClickSelectAll} checked={selectAllChecked}>
        Select All
      </Checkbox>
      <Button
        disabled={!getSelectedImages().length}
        type={'primary'}
        onClick={showModal}
      >
        Tạo sự cố
      </Button>

      <div
        style={{
          padding: '2px',
          color: '#666',
        }}
      >
        Selected images: {getSelectedImages().toString()}
      </div>

       <Form layout={'horizontal'}>
           <Form.Item name={'monitoredObjectId'} label={"Chọn đối tượng giám sát"}>
               <Select mode={'multiple'} onChange={(e) => onChangeSelect(e)}>{renderOptions()}</Select>
           </Form.Item>
       </Form>
      <div
        style={{
          display: 'block',
          minHeight: '1px',
          width: '100%',
          border: '1px solid #ddd',
          overflow: 'auto',
        }}
      >
          {images && <Gallery
              images={images}
              onSelectImage={onSelectImage}
              showLightboxThumbnails={true}
          />}

      </div>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form layout="vertical" initialValues={{}} form={form} preserve={false}>
          <Form.Item
            label="Tên sự cố"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item
            label="Mức độ"
            name="level"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
          >
            <Select>
              {levels.map((item) => (
                <Select.Option value={item.code} key={item.code}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="DatePicker"
            name="dueDate"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Vị trí"
            name="location"
            rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ImageGalley;
