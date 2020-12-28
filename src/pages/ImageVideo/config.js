import { Image, Tag } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export const problemTypes = ["Cháy rừng", "Đê điều", "Lưới điện", "Cây trồng"];

export const problemTypesKD = ["CHAY_RUNG", "DE_DIEU", "LUOI_DIEN", "CAY_TRONG"];

export const problemColumns = [
    {
        title: "Tên sự cố",
        dataIndex: "name"
    },
    {
        title: "Ảnh",
        dataIndex: "images",
        render: images => <Image preview={false} src={images[0]?.link} />
    },
    {
        title: "Video",
        dataIndex: "videos",
        render: videos => <video style={{ width: "100%", height: "150px" }} src={videos[0]?.link} />
    },
    {
        title: "Mô tả",
        dataIndex: "description"
    },
    {
        title: "Loại sự cố",
        dataIndex: "type",
        render: type => <span>{type.name}</span>
    },
    {
        title: 'Vị trí',
        dataIndex: 'location',
    },
    {
        title: 'Ngày xảy ra',
        dataIndex: 'dueDate',
    },
    {
        title: 'Hành động',
        dataIndex: 'id',
        render: id => <Link to="#">Xem chi tiết</Link>
    },
]

export const columns = [
    {
        title: 'Mã',
        dataIndex: 'id',
    },
    {
        title: 'Tên',
        dataIndex: 'title',
    },
    {
        title: 'Ảnh/video',
        dataIndex: 'link'
    },
    {
        title: 'Thể loại',
        dataIndex: 'type',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
    },
    {
        title: 'Kinh độ',
        dataIndex: 'longitude',
    },
    {
        title: 'Vĩ độ',
        dataIndex: 'latitude',
    },
    {
        title: 'Vị trí',
        dataIndex: 'location',
    },
    {
        title: 'Loại sự cố',
        dataIndex: 'problemType'
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAt',
    },
    {
        title: '',
        dataIndex: 'id',
        render: id => <Link to={`/image-video-detail/${id}`} >Xem chi tiết</Link>
    }
];

export const data = [
    {
        key: '1',
        title: 'Kiểm tra lá úa',
        image_video: 'https://croplifevietnam.org/wp-content/uploads/2016/06/bigstock.jpg',
        type: 'image',
        description: 'Lá bị úa do lượng nắng nóng đỉnh điểm, cây thiếu nước trầm trọng',
        longitude: '-77.01',
        latitude: '42.02',
        status: true,
        createdAtDate: '2020-11-11',
        createdAtTime: '05:02:04',
        problemId: 'P3',
        droneId: 'D34'
    },
    {
        key: '2',
        title: 'Kiếm tra lá khô',
        image_video: 'https://vietpat.vn/wp-content/uploads/2015/06/cong-bo-chung-nhan-hop-quy-giong-cay-trong.jpg',
        type: 'image',
        description: 'Lá cây khỏe mạnh, tình trạng thiếu nước không diễn ra',
        longitude: '-77.02',
        latitude: '42.03',
        status: false,
        createdAtDate: '2020-11-15',
        createdAtTime: '07:02:04',
        problemId: 'P6',
        droneId: 'D56'
    },
    {
        key: '3',
        title: 'Kiểm tra nhiệt độ',
        image_video: 'https://vnreview.vn/image/18/98/30/1898306.jpg?t=1547703200405',
        type: 'image',
        description: 'Hình ảnh được thu thập để kiểm tra nhiệt độ của cây',
        longitude: '-77.03',
        latitude: '42.05',
        status: false,
        createdAtDate: '2020-7-11',
        createdAtTime: '09:02:04',
        problemId: 'P1',
        droneId: 'D05'
    },
    {
        key: '4',
        title: 'Kiểm tra nhiệt độ',
        image_video: <iframe width="230" height="150" src="https://www.youtube.com/embed/shccS5kJvtQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>,
        type: 'video',
        description: 'Video kiểm tra nhiệt độ của cây',
        longitude: '-77.04',
        latitude: '42.07',
        status: false,
        createdAtDate: '2020-11-10',
        createdAtTime: '02:02:04',
        problemId: 'P05',
        droneId: 'D05'
    },
    {
        key: '5',
        title: 'Kiểm tra lá úa',
        image_video: <iframe width="230" height="150" src="https://www.youtube.com/embed/u2SU8tWWp_Y" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
        type: 'video',
        description: 'Video kiểm tra tình trạng lá cây bị úa',
        longitude: '-77.05',
        latitude: '42.00',
        status: true,
        createdAtDate: '2019-11-10',
        createdAtTime: '01:02:04',
        problemId: 'P3',
        droneId: 'D34'
    }
];