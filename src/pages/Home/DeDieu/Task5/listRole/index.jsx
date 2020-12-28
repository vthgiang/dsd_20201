import React, { Fragment, useCallback, useEffect, useState } from "react";
import StyleListRole from "./index.style";
import { Table, Space, Modal, notification } from "antd";
import { getListRoles, deleteRole } from "../../../../../modules/user/store/services";
import ModalRole from "./ModalRole";
import moment from "moment";
import Filter from "./Filter";

const ListRole = () => {
    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState({ page_size: 20, page_id: 0 });
    const [listRole, setListRole] = useState([]);
    const [meta, setMeta] = useState([]);
    const [roleId, setRoleId] = useState("");
    const [mode, setMode] = useState("");

    const fetchListRole = useCallback(async () => {
        const res = await getListRoles(filter);
        if (res.status === "successful") {
            setMeta(res.meta);
            setListRole(res.result);
        } else {
            setMeta({ page_size: 20, page_id: 0 });
            setListRole([]);
            notification.error({
                message: "Lỗi",
                description:
                    res.message && res.message !== ""
                        ? res.message
                        : "Có lỗi. Vui lòng thử lại!",
            });
        }
    }, [filter]);

    useEffect(() => {
        fetchListRole();
    }, [fetchListRole]);

    useEffect(() => {
        if (!visible) {
            setRoleId("");
        }
    }, [visible]);

    const handleDelete = async (role) => {
        Modal.confirm({
            title: "Xác nhận?",
            content: "Bạn có thực sự muốn xóa chức vụ này",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk() {
                const res = new Promise((resolve, reject) => {
                    resolve(deleteRole(role.id));
                }).catch(() => console.log("Oops errors!"));
                Promise.resolve(res).then((e) => {
                    if (e.status == "successful") {
                        notification.success({
                            message: "Thành công",
                            description: "Xóa chức vụ thành công",
                        });
                        fetchListRole();
                    } else {
                        notification.error({
                            message: "Lỗi",
                            description: e.message,
                        });
                    }
                });
            },
            onCancel() {},
        });
    };

    const columns = [
        {
            title: "#",
            render: (text, record, index) => <a onClick={() => handleView(record)}>{index + 1}</a>,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            render: (text, record) => <a onClick={() => handleView(record)}>{text}</a>,
        },
        { title: "Mô tả", dataIndex: "description", key: "description" },
        { title: "Mã chức vụ", dataIndex: "code", key: "code" },
        { title: "Xếp hạng", dataIndex: "ranking", key: "ranking" },
        {
            title: "Ngày tạo",
            dataIndex: "created_at",
            key: "created_at",
            render: (text) => <p>{moment(text).format("mm:hh DD-MM-YYYY")}</p>,
        },
        {
            title: "Hành động",
            key: "action",
            render: (text, record) => (
                <Fragment>
                    <Space size="middle" style={{ marginRight: 10 }}>
                        <a onClick={() => handleEdit(record)}>Sửa</a>
                    </Space>
                    <Space size="middle">
                        <a onClick={() => handleDelete(record)}>Xóa</a>
                    </Space>
                </Fragment>
            ),
            width: "10%",
        },
    ];

    const changePagination = (value, pageSize) => {
        setFilter({ ...filter, page_id: value - 1, page_size: pageSize });
    };

    const handleEdit = (record) => {
        setVisible(true);
        setMode("update");
        setRoleId(record.id);
    };

    const handleView = (record) => {
        setVisible(true);
        setMode("detail");
        setRoleId(record.id);
    };

    return (
        <StyleListRole>
            <Filter
                setFilter={setFilter}
                setVisible={setVisible}
                filter={filter}
                setMode={setMode}
            />
            <Table
                rowKey="id"
                columns={columns}
                pagination={{
                    total: meta.total_count,
                    pageSize: meta.page_size,
                    onChange: changePagination,
                }}
                dataSource={listRole}
            />
            <ModalRole
                mode={mode}
                setMode={setMode}
                visible={visible}
                roleId={roleId}
                setVisible={setVisible}
                fetchListRole={fetchListRole}
            />
        </StyleListRole>
    );
};
export default ListRole;
