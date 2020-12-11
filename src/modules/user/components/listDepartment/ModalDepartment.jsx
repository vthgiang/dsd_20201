import { Form, Input, Modal, Row, notification } from "antd";
import {
    updateDepartment,
    createDepartment,
    getDepartment,
} from "../../store/services";
import React, { useCallback, useEffect, useState } from "react";

const ModalUser = ({
    departmentId,
    setVisible,
    visible,
    fetchListDepartment,
}) => {
    const [department, setDepartment] = useState({});
    const [message, setMessage] = useState({});

    const fetchDepartment = useCallback(async () => {
        try {
            const res = await getDepartment(departmentId);
            if (res.status === "successful") {
                setDepartment(res.result);
            }
        } catch (error) {}
    }, [departmentId]);

    useEffect(() => {
        if (departmentId) {
            fetchDepartment();
        } else {
            setDepartment({});
        }
    }, [fetchDepartment, setDepartment]);

    const handleSave = async () => {
        var res = {};
        if (!validateData()) {
            return;
        }
        const dataDepartment = buildUserData();
        var description = "";
        if (departmentId && departmentId != "") {
            dataDepartment.id = departmentId;
            res = await updateDepartment(dataDepartment);
            description = "Cập nhật thành công!";
            
        } else {
            res = await createDepartment(dataDepartment);
            description = "Tạo mới thành công!";
        }
        if (res.status === "successful") {
            fetchListDepartment();
            notification.success({
                message: "Thành công",
                description: description
            })
            handleCloseModal();
        } else {
            notification.error({
                message: "Lỗi",
                description: res.message,
            });
        }
    };

    const validateData = useCallback(() => {
        var retval = true;
        if (typeof department.name === "undefined" || department.name === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập tên!",
                title: "Lỗi"
            });
            return retval;
        }
        if (
            typeof department.description === "undefined" ||
            department.description === ""
        ) {
            retval = false;
            setMessage({
                value: "Vui lòng nhập mô tả!",
                title: "Lỗi"
            });
            return retval;
        }
        return retval;
    });

    const buildUserData = () => {
        var data = {};
        var columns = ["name", "description"];
        columns.forEach((element) => {
            if (department[element] && department[element] != "") {
                data[element] = department[element];
            }
        });
        data.type = localStorage.getItem("project-type");
        return data;
    };

    const handleCloseModal = () => {
        setDepartment({});
        setVisible(false);
    };

    useEffect(() => {
        if (message && message != "") {
            if (message.type == 'error') {
                notification.error({
                    message: message.title,
                    description: message.value
                })
            }
            if (message.type == 'warning') {
                notification.warning({
                    message: message.title,
                    description: message.value
                })
            }
            if (message.type == 'success') {
                notification.success({
                    message: message.title,
                    description: message.value
                })
            }
        }
    }, [message]);

    return (
        <Modal
            visible={visible}
            title={
                departmentId && departmentId !== ""
                    ? "Cập nhật phòng ban"
                    : "Thêm phòng ban"
            }
            onOk={handleSave}
            onCancel={handleCloseModal}
            okText="Lưu"
            cancelText="Hủy"
        >
            <Form>
                <Row gutter={[16, 16]}>
                    <Form.Item
                        name="name"
                        style={{ width: "45%", marginRight: 10 }}
                    >
                        <label htmlFor="">
                            Họ tên <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            className="input-box"
                            placeholder="Tên"
                            value={department?.name}
                            onChange={(e) =>
                                setDepartment({
                                    ...department,
                                    name: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item name="username" style={{ width: "45%" }}>
                        <label htmlFor="">
                            Mô tả <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            className="input-box"
                            type="text"
                            placeholder="Mô tả"
                            value={department?.description}
                            onChange={(e) =>
                                setDepartment({
                                    ...department,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalUser;
