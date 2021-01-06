import React, { Fragment, useCallback, useEffect, useState } from "react";
import StyleListPermission from "./index.style";
import { Table, Space, Modal, notification } from "antd";
import { getListPermissions, deletePermission } from "../../../../../modules/user/store/services";
import ModalPermission from "./ModalPermission";
import moment from "moment";
import Filter from "./Filter";

const ListPermission = () => {
    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState({ page_size: 20, page_id: 0 });
    const [listPermission, setListPermission] = useState([]);
    const [meta, setMeta] = useState([]);
    const [permissionId, setPermissionId] = useState("");
    const [mode, setMode] = useState("");

    const fetchListPermission = useCallback(async () => {
        const res = await getListPermissions(filter);
        if (res.status === "successful") {
            setMeta(res.meta);
            setListPermission(res.result);
        } else {
            setMeta({ page_size: 20, page_id: 0 });
            setListPermission([]);
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
        fetchListPermission();
    }, [fetchListPermission]);

    useEffect(() => {
        if (!visible) {
            setPermissionId("");
        }
    }, [visible]);

    const handleDelete = async (role) => {
        Modal.confirm({
            title: "Xác nhận?",
            content: "Bạn có thực sự muốn xóa quyền này",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk() {
                const res = new Promise((resolve, reject) => {
                    resolve(deletePermission(role.id));
                }).catch(() => console.log("Oops errors!"));
                Promise.resolve(res).then((e) => {
                    if (e.status == "successful") {
                        notification.success({
                            message: "Thành công",
                            description: "Xóa quyền thành công",
                        });
                        fetchListPermission();
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
        { title: "Tài nguyên", dataIndex: "resource", key: "resource" },
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
        setPermissionId(record.id);
    };

    const handleView = (record) => {
        setVisible(true);
        setMode("detail");
        setPermissionId(record.id);
    };

    return (
        <StyleListPermission>
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
                dataSource={listPermission}
            />
            <ModalPermission
                mode={mode}
                setMode={setMode}
                visible={visible}
                permissionId={permissionId}
                setVisible={setVisible}
                fetchListPermission={fetchListPermission}
            />
        </StyleListPermission>
    );
};
export default ListPermission;
