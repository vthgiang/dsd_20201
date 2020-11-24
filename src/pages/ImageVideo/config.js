import { Tag } from 'antd';
import React from 'react';

export const columns = [
    {
        title: 'Mã',
        dataIndex: 'key',
    },
    {
        title: 'Tên',
        dataIndex: 'title',
    },
    {
        title: 'Ảnh/video',
        dataIndex: 'image_video',
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
        title: 'Trạng thái sự cố',
        dataIndex: 'status',
        render: status => status ? <Tag color="error">Có sự cố</Tag> : <Tag color="green">Không có sự cố</Tag>
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdAtDate',
    },
    {
        title: 'Giờ tạo',
        dataIndex: 'createdAtTime',
    },
    {
        title: 'Mã sự cố',
        dataIndex: 'problemId',
    },
    {
        title: 'Mã drone',
        dataIndex: 'droneId',
    },
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