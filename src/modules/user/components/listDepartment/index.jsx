import React, { Fragment, useCallback, useEffect, useState } from "react";
import StyleListDepartment from "./index.style";
import { Table, Space, Input, Modal, notification, Tag } from "antd";
import { getListDepartments, deleteDepartment } from "../../store/services";
import ModalDepartment from "./ModalDepartment";
import { useSelector } from "react-redux";
import moment from "moment";
import Filter from "./Filter";

const ListDepartment = () => {
    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState({ page_size: 20, page_id: 0 });
    const [listDepartment, setListDepartment] = useState([]);
    const [meta, setMeta] = useState([]);
    const [departmentId, setDepartmentId] = useState("");
    const user = useSelector((state) => state.user.user);
    const [mode, setMode] = useState("");

    const fetchListDepartment = useCallback(async () => {
        const res = await getListDepartments(filter);
        if (res.status === "successful") {
            setMeta(res.meta);
            setListDepartment(res.result);
        } else {
            setMeta({ page_size: 20, page_id: 0 });
            setListDepartment([]);
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
        fetchListDepartment();
    }, [fetchListDepartment]);

    useEffect(() => {
        if (!visible) {
            setDepartmentId("");
        }
    }, [visible]);

    const handleDelete = async (department) => {
        Modal.confirm({
            title: "Xác nhận?",
            content: "Bạn có thực sự muốn xóa phòng ban này",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk() {
                const res = new Promise((resolve, reject) => {
                    resolve(deleteDepartment(department.id));
                }).catch(() => console.log("Oops errors!"));
                Promise.resolve(res).then((e) => {
                    if (e.status == "successful") {
                        notification.success({
                            message: "Thành công",
                            description: "Xóa phòng ban thành công",
                        });
                        fetchListDepartment();
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
        {
            title: "Ngày tạo",
            dataIndex: "created_at",
            key: "created_at",
            render: (text) => <p>{moment(text).format("mm:hh DD-MM-YYYY")}</p>,
        },
        user.role == "SUPER_ADMIN"
            ? {
                  title: "Dự án",
                  key: "type",
                  dataIndex: "type",
                  width: "10%",
                  render: (type) => (
                      <Tag
                          color={
                              type == "CHAY_RUNG"
                                  ? "red"
                                  : type == "DE_DIEU"
                                  ? "cyan"
                                  : type == "CAY_TRONG"
                                  ? "green"
                                  : "purple"
                          }
                          key={type}
                      >
                          {type}
                      </Tag>
                  ),
              }
            : {},
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
        setDepartmentId(record.id);
    };

    const handleView = (record) => {
        setVisible(true);
        setMode("detail");
        setDepartmentId(record.id);
    };

    return (
        <StyleListDepartment>
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
                dataSource={listDepartment}
            />
            <ModalDepartment
                mode={mode}
                setMode={setMode}
                visible={visible}
                departmentId={departmentId}
                setVisible={setVisible}
                fetchListDepartment={fetchListDepartment}
            />
        </StyleListDepartment>
    );
};
export default ListDepartment;
