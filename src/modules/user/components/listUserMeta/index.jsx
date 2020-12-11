import React, { Fragment, useCallback, useEffect, useState } from "react";
import StyleListUser from "./index.style";
import {
    Table,
    Tag,
    Space,
    Modal,
    notification,
} from "antd";
import { getListUsersMeta } from "../../store/services";
import { useSelector } from "react-redux";
import Filter from "./Filter";

const ListUserMeta = () => {
    const [filter, setFilter] = useState({ page_size: 20, page_id: 0 });
    const [listUserMeta, setListUserMeta] = useState([]);
    const [meta, setMeta] = useState([]);
    const user = useSelector((state) => state.user.user);

    const fetchListUserMeta = useCallback(async () => {
        const res = await getListUsersMeta(filter);
        if (res.status === "successful") {
            setMeta(res.meta);
            setListUserMeta(res.result);
        } else {
            setMeta({ page_size: 20, page_id: 0 });
            setListUserMeta([]);
            notification.error({
                message: "Lỗi",
                description:
                    res.message && res.message !== ""
                        ? res.message
                        : "Có lỗi. Vui lòng thử lại!",
            });
        }
    }, [filter, user]);

    useEffect(() => {
        fetchListUserMeta();
    }, [fetchListUserMeta]);

    const columns = [
        {
            title: "#",
            render: (text, record, index) => <a>{index + 1}</a>,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            render: (text) => <p style={{ wordBreak: "break-word" }}>{text}</p>,
        },
        {
            title: "Người tạo",
            dataIndex: "user",
            key: "user",
            render: (user) => <p>{user ? user.full_name : ""}</p>,
        },
        {
            title: "Người hoàn thành",
            dataIndex: "target_user",
            key: "target_user",
            render: (user) => <p>{user ? user.full_name : ""}</p>,
        },
        {
            title: "Trạng thái",
            key: "status",
            dataIndex: "status",
            render: (status) => (
                <Tag
                    color={
                        status == "DONE"
                            ? "success"
                            : "geekblue"

                    }
                    key={status}
                >
                    {status}
                </Tag>
            ),
        },
    ];

    const changePagination = (value, pageSize) => {
        setFilter({ ...filter, page_id: value - 1, page_size: pageSize });
    };

    return (
        <StyleListUser>
            <Filter setFilter={setFilter} filter={filter}/>
            <Table
                rowKey="id"
                columns={columns}
                pagination={{
                    total: meta.total_count,
                    pageSize: meta.page_size,
                    onChange: changePagination,
                }}
                dataSource={listUserMeta}
            />
        </StyleListUser>
    );
};
export default ListUserMeta;
