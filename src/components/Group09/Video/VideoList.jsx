import {List, Avatar, Checkbox, Button, Modal, Form, Input, Select, DatePicker, Row, Col} from "antd";
import TagGroup from "./TagGroup";
import CreateIncidentModel from "../Model/CreateIncidentModel";
import React, {useState, useRef, useEffect} from "react";
import _ from 'lodash'
let defaultTags = [];
let currentIndex = -1;
const VideoList = ({incidents = [], onChangeTags}) => {
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [visible, setVisible] = useState(false);
    let allTags = [];
    for (let incident of incidents) {
        allTags = allTags.concat(incident.tags || [])
        allTags = _.uniqBy(allTags, function (e) {
            return e;
        });
    }
    const [filteredVideos, setFilteredVideo] = useState(incidents);

    console.log('allTags', allTags)
    let tagRef = useRef();
    let createRef = useRef();
    const onCheck = (e, index) => {
        let _selects = [];
        if (e.target.checked) {
            _selects = selectedVideos.concat([index]);
        } else {
            _selects = selectedVideos.filter((item) => item !== index);
        }
        setSelectedVideos([..._selects]);
    };
    const handleOk = async () => {
        let tags = tagRef.getTags() || [];
        if (incidents[currentIndex]) {
            incidents[currentIndex].tags = tags;
            incidents[currentIndex].text = tags.toString();
            onChangeTags(incidents);
        }
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const onClickEdit = (tags = [], index) => {
        defaultTags = tags;
        currentIndex = index;
        setVisible(true);
    };
    const onCreateIncident = () => {
        let allTags = [];
        for (let incident of incidents) {
            allTags = allTags.concat(incident.tags || [])
        }
        createRef.setDefaultValue({tags: allTags})
        createRef.show();
    };

    const checkMatchValue = (array1, array2) => {
        const found = array1.filter( val => array2.includes(val) )
        return Boolean(found.length)
    }

    const handleFilter = (value = []) => {
        if(!value.length) setFilteredVideo(incidents)
        else setFilteredVideo(incidents.filter(item => checkMatchValue(item.tags, value)))
    }
    useEffect(() => {
        setFilteredVideo(incidents)
    }, [incidents])
    return (
        <div>
            <Row>
                <Col span={4}>
                    <Button
                        type="primary"
                        disabled={!selectedVideos.length}
                        onClick={onCreateIncident}
                    >
                        Tạo sự cố
                    </Button>
                </Col>
                <Col span={16}>
                    <Form layout="horizontal" initialValues={{}} preserve={false}>
                        <Form.Item
                            label="Tags"
                            name="tags"
                        >
                            <Select mode='multiple' onChange={handleFilter}>
                                {allTags.map((item, index) => (
                                    <Select.Option value={item} key={index}>
                                        {item}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>


            <List
                itemLayout="horizontal"
                dataSource={filteredVideos}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[
                            <Checkbox
                                key="select"
                                onChange={(event) => onCheck(event, index)}
                            >
                                Chọn
                            </Checkbox>,
                            <a key="edit" onClick={() => onClickEdit(item.tags, index)}>
                                Sửa nhãn
                            </a>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src="https://i.imgur.com/EFPQbF4.jpeg"/>}
                            title={<a href="https://ant.design">{"Video " + (index + 1)}</a>}
                            description={`Start time: ${item.time} - Duration: ${item.duration}. Các nhãn: ${item.text}`}
                        />
                    </List.Item>
                )}
            />
            <Modal
                title="Sửa nhãn sự cố"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <TagGroup
                    defaultValue={defaultTags}
                    ref={(instance) => {
                        tagRef = instance;
                    }}
                />
            </Modal>
            <CreateIncidentModel
                ref={(instance) => {
                    createRef = instance;
                }}
            />
        </div>
    );
};

export default VideoList;
