import { Form, Input, Modal, Row, notification, Select, DatePicker } from "antd";
import { getRole, createRole, updateRole } from "../../store/services";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
const { Option } = Select;

const ModalRole = ({ roleId, setVisible, visible, fetchListRole, mode, setMode }) => {
    const [role, setRole] = useState({});
    const [message, setMessage] = useState({});
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (!visible) {
            setRole({
                type: "Chưa xác định",
            });
        }
    }, [visible]);

    useEffect(() => {
        if (mode == "create") {
            setTitle("Thêm mới chức vụ");
        } else if (mode == "update") {
            setTitle("Cập nhật chức vụ");
        } else {
            setTitle("Thông tin chức vụ");
        }
    }, [mode]);

    const fetchRole = useCallback(async () => {
        try {
            const res = await getRole(roleId);
            if (res.status === "successful") {
                setRole(res.result);
            }
        } catch (error) {}
    }, [roleId]);

    useEffect(() => {
        if (roleId) {
            fetchRole();
        } else {
            setRole({});
        }
    }, [fetchRole, setRole]);

    const handleSave = async () => {
        var res = {};
        if (!validateData()) {
            return;
        }
        const dataRole = buildUserData();
        var description = "";
        if (roleId && roleId != "") {
            dataRole.id = roleId;
            res = await updateRole(dataRole);
            description = "Cập nhật thành công!";
        } else {
            res = await createRole(dataRole);
            description = "Tạo mới thành công!";
        }
        if (res.status === "successful") {
            fetchListRole();
            notification.success({
                message: "Thành công",
                description: description,
            });
            handleCloseModal();
        } else {
            var errorMessage = "";
            if (res.message && res.message != "") {
                errorMessage = res.message;
            } else {
                errorMessage = res.result;
            }
            notification.error({
                message: "",
                description: errorMessage,
            });
        }
    };

    const validateData = useCallback(() => {
        var retval = true;
        if (typeof role.name === "undefined" || role.name === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập tên!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        if (typeof role.description === "undefined" || role.description === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập mô tả!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        if (typeof role.code === "undefined" || role.code === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập mã chức vụ!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        if (typeof role.ranking === "undefined" || role.ranking === "") {
            retval = false;
            setMessage({
                value: "Vui lòng nhập thứ hạng của chức vụ!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        if (role.ranking <= 0) {
            retval = false;
            setMessage({
                value: "Thứ hạng của chức vụ không hợp lệ!",
                type: "error",
                title: "Lỗi",
            });
            return retval;
        }
        return retval;
    });

    const buildUserData = () => {
        var data = {};
        var columns = ["name", "description", "code", "ranking"];
        columns.forEach((element) => {
            if (role[element] && role[element] != "") {
                data[element] = role[element];
            }
        });
        return data;
    };

    const handleCloseModal = () => {
        setRole({});
        setMode("");
        setVisible(false);
    };

    useEffect(() => {
        if (message && message != "") {
            if (message.type == "error") {
                notification.error({
                    message: message.title,
                    description: message.value,
                });
            }
            if (message.type == "warning") {
                notification.warning({
                    message: message.title,
                    description: message.value,
                });
            }
            if (message.type == "success") {
                notification.success({
                    message: message.title,
                    description: message.value,
                });
            }
        }
    }, [message]);

    return (
        <Modal visible={visible} title={title} onOk={handleSave} onCancel={handleCloseModal} okText='Lưu' cancelText='Hủy'>
            <Form>
                <Row gutter={[16, 16]}>
                    <Form.Item name='name' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>
                            Họ tên <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            disabled={mode == "detail"}
                            className='input-box'
                            placeholder='Tên'
                            value={role?.name}
                            onChange={(e) =>
                                setRole({
                                    ...role,
                                    name: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item name='username' style={{ width: "45%" }}>
                        <label htmlFor=''>
                            Mô tả <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            disabled={mode == "detail"}
                            className='input-box'
                            type='text'
                            placeholder='Mô tả'
                            value={role?.description}
                            onChange={(e) =>
                                setRole({
                                    ...role,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                </Row>
                <Row gutter={[16, 16]}>
                    <Form.Item name='username' style={{ width: "45%", marginRight: 10 }}>
                        <label htmlFor=''>
                            Thứ hạng <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                            disabled={mode == "detail"}
                            className='input-box'
                            type='text'
                            placeholder='Thứ hạng'
                            value={role?.ranking}
                            onChange={(e) =>
                                setRole({
                                    ...role,
                                    ranking: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item name='role' style={{ width: "45%" }}>
                        <label htmlFor=''>Mã chức vụ </label>
                        <Input
                            disabled={mode == "detail"}
                            className='input-box'
                            type='text'
                            placeholder='Mã chức vụ'
                            value={role?.code}
                            onChange={(e) =>
                                setRole({
                                    ...role,
                                    code: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                </Row>
                <Row gutter={[16, 16]}>
                    {mode == "detail" && (
                        <Form.Item name='role' style={{ width: "45%" }}>
                            <label htmlFor=''>Ngày tạo </label>
                            <DatePicker disabled={mode == "detail"} value={role.created_at ? moment(role?.created_at, "YYYY-MM-DD") : ""} style={{ width: "100%" }} format={"YYYY-MM-DD"} />
                        </Form.Item>
                    )}
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalRole;
