import React, {useState, useEffect, useDebugValue} from 'react';
import to from 'await-to-js';
import {
    Button,
    Checkbox,
    Modal,
    Input,
    Form,
    Select,
    Tag,
    DatePicker,
    message,
    Spin,
    Pagination, Empty, Typography
} from 'antd';
import Gallery from 'react-grid-gallery';
import incidentLevelService from '../../../services/group09/incidentLevelService';
import incidentService from '../../../services/group09/incidentService';
import imageService from '../../../services/group09/imageService';
import monitoredService from '../../../services/group09/monitoredService';
import moment from 'moment';
import userService from '../../../services/group09/userService';

import _ from 'lodash'

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
let cacheMonitoreds = []
let cache = IMAGES
let levels = [];
let cacheImages = []
let pageSize = 20
const ImageGalley = (props) => {
    const [images, setImages] = useState([]);
    const [payloads, setPayloads] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const [selectedIds, setSelectedIds] = useState([]);
    const [total, setTotal] = useState(0);
    const [imgLoading, setImgLoading] = useState(true);
    const [monitoredIds, setMonitoredIds] = useState([])
    const convertImages = (values = []) => {
        return (values || []).map((item) => {
            let monitored = MONITORED_OBJS.find(i => i.id === item.monitoredObjectId)
            let createdAt = moment().format('DD/MM/YYYY hh:mm:ss');
            let nameType = '';
            let isTraining = item.isTraining ? 'Đang training' : null
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
                    {value: createdAt, title: 'Created At'},
                    {value: nameType, title: 'Type'},
                    {value: isTraining, title: 'Is Training'},
                ],
            };
        });
    }

    useEffect(() => {
        fetchData({page: 0, pageSize});
    }, []);

    const fetchData = async ({page, pageSize}) => {
        setImgLoading(true)
        let [leverRes = {}, imagesRes = {}, monitoreds = {}, payloads = []] = await Promise.all([
            incidentLevelService().index(),
            imageService().getImagesByMonitoredId({page, pageSize}),
            monitoredService().index(),
            userService().getAllPayload()
        ]);
        if (imagesRes.status !== 200) {
            message.error(`${imagesRes.status}: Dịch vụ ảnh video bị lỗi`)
        }
        let items = payloads.slice(0, 3);
        setPayloads(items);
        if (!monitoreds.success) {
            message.error(monitoreds.messages)
        }



        let _images = convertImages(imagesRes.result || [])
        cacheImages= _images
        setImages(_images);
        setTotal(imagesRes.total)
        console.log('imagesRes', imagesRes);
        levels = leverRes;

        cacheMonitoreds = monitoreds.content
        setImgLoading(false)
    };

    const onChangePagination = async (page) => {
        console.log('page', page)
        await fetchData({page: page - 1, pageSize})
    }


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
        let selectedImages = images.filter((item) => Boolean(item.isSelected));
        console.log('selectedImages', selectedImages)
        let _monitoredIds = _.uniq(selectedImages.map(item => item.monitoredObjectId))
        setMonitoredIds(_monitoredIds)
    };
    const renderPayload = () => {
        return payloads.map((item, key) => {
            return <Tag color="#2db7f5" style = {{marginRight: "8px"}}>Tên: {item.name}, Mã {item.code}</Tag>
        })
    }
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
                        type: localStorage.getItem("project-type"),
                        monitoredIds: monitoredIds
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
        if(!value.length) {
            setImages(cacheImages)
            return
        }
        let filterImages = images.filter(i => value.includes(i.monitoredObjectId))
        await setImages(filterImages)
    }

    const renderOptions = () => {
        return cacheMonitoreds.map((item) => (
            <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
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

            <Form>
                <Form.Item label="Đối tượng giám sát">
                    <Select mode="multiple" onChange={onChangeSelect}>{renderOptions()}</Select>
                </Form.Item>
            </Form>
            <div>
             <span style= {{fontWeight: "bold"}}>Payload: </span> {renderPayload()}
            </div>
            <Typography.Text type="secondary">*Các ảnh không hiển thị do link ảnh từ Service quản lý ảnh-video not found!</Typography.Text>
            <Spin spinning={imgLoading}>
                {images.length ? <div
                    style={{
                        display: 'block',
                        minHeight: '1px',
                        width: '100%',
                        border: '1px solid #ddd',
                        overflow: 'auto',
                    }}
                >
                    <Gallery
                        images={images}
                        onSelectImage={onSelectImage}
                        showLightboxThumbnails={true}
                    />

                </div> :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                           description={<span>Đối tượng giám sát và ảnh không trùng khớp</span>}/>}
            </Spin>
            <Pagination
                total={total}
                showTotal={(total, range) => {
                    if(!range[1]) return `1-20 of ${total} ảnh`
                    return `${range[0]}-${range[1]} of ${total} ảnh`
                }}
                defaultPageSize={pageSize}
                defaultCurrent={1}
                onChange={onChangePagination}
                style={{float:'right'}}
                showSizeChanger={false}
            />
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form layout="vertical" initialValues={{
                    monitoredIds
                }} form={form} preserve={false}>
                    <Form.Item label="Đối tượng giám sát" name="monitoredIds" disabled>
                        <Select mode="multiple">{renderOptions()}</Select>
                    </Form.Item>
                    <Form.Item
                        label="Tên sự cố"
                        name="name"
                        rules={[{required: true, message: 'Vui lòng nhập thông tin!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{required: true, message: 'Vui lòng nhập thông tin!'}]}
                    >
                        <Input.TextArea rows={5}/>
                    </Form.Item>
                    <Form.Item
                        label="Mức độ"
                        name="level"
                        rules={[{required: true, message: 'Vui lòng nhập thông tin!'}]}
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
                        rules={[{required: true, message: 'Vui lòng nhập thông tin!'}]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        label="Vị trí"
                        name="location"
                        rules={[{required: true, message: 'Vui lòng nhập thông tin!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ImageGalley;
