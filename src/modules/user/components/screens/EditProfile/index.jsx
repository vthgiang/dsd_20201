{/* <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                title="Add new item"
                onOk={handleSave}
                onCancel={handleCloseModal}
                okText="Lưu"
            >
                <Form>
                    <Row gutter={[16, 16]}>
                        <Form.Item
                            name="name"
                            style={{ width: "45%", marginRight: 10 }}
                        >
                            <label htmlFor="">Tên:</label>
                            <Input
                                className="input-box"
                                placeholder="Tên"
                                value={user?.name}
                                onChange={(e) =>
                                    setUser({ ...user, name: e.target.value })
                                }
                            />
                        </Form.Item>
                        <Form.Item name="email" style={{ width: "45%" }}>
                            <label htmlFor="">Email</label>
                            <Input
                                className="input-box"
                                type="email"
                                placeholder="Email"
                                value={user?.email}
                                onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                            />
                        </Form.Item>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Form.Item
                            name="phone"
                            style={{ width: "45%", marginRight: 10 }}
                        >
                            <label htmlFor="">Sdt:</label>
                            <Input
                                className="input-box"
                                placeholder="Số điện thoại"
                                value={user?.phone}
                                onChange={(e) =>
                                    setUser({ ...user, phone: e.target.value })
                                }
                            />
                        </Form.Item>
                        <Form.Item name="address" style={{ width: "45%" }}>
                            <label htmlFor="">Address</label>
                            <Input
                                className="input-box"
                                type="text"
                                placeholder="Địa chỉ"
                                value={user?.address}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        address: e.target.value,
                                    })
                                }
                            />
                        </Form.Item>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Form.Item
                            name="status"
                            style={{ width: "45%", marginRight: 10 }}
                        >
                            <label htmlFor="">Trạng thái:</label>
                            {renderSelectStatus("user")}
                        </Form.Item>
                        <Form.Item name="role" style={{ width: "45%" }}>
                            <label htmlFor="">Chức vụ</label>
                            {renderSelectRole("user")}
                        </Form.Item>
                    </Row>
                    <Row>
                        <Form.Item name="status" style={{ margin: "0 auto" }}>
                            <label htmlFor="">Avatar</label>
                            <UploadImage
                                imageUrl={
                                    user.avatar
                                        ? userHost + user.avatar
                                        : `/images/blank.png`
                                }
                            />
                        </Form.Item>
                    </Row>
                </Form>
            </Modal> */}