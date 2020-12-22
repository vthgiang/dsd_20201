import React, { useState, useEffect } from 'react';
import { Card, Select, Modal, Spin, Button, Table, Space, Input, Tag } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import matchInputs from './ReportTemplate/Inputify/utils/matchInputs';
import ReportRenderer from './ReportTemplate/ReportRenderer';

const { Option } = Select;
const { TextArea } = Input;

const SectionType = {
  HEADER: 'Phần mở đầu',
  FOOTER: 'Phần kết thúc',
  TEXT: 'Đoạn văn cố định',
  TEXT_KEY: 'Đoạn văn có nhập liệu',
  TABLE: 'Bảng dữ liệu',
}

const SectionTypeData = {
  [SectionType.HEADER]: {
    "type": "predefined-section",
    "format": "header",
    "keys": {
      "company_name": null,
      "number": null
    },
  },
  [SectionType.FOOTER]: {
    "type": "predefined-section",
    "format": "footer",
    "keys": {
      "author": null,
      "reviewer": null
    },
  },
  [SectionType.TEXT]: {
    "type": "text",
    "format": "paragraph",
    "text": "",
  },
  [SectionType.TEXT_KEY]: {
    "type": "text-key",
    "format": "paragraph",
    "text": "",
    // "keys": {},
  },
  [SectionType.TABLE]: {
    "type": "table",
    "headers": [],
  },
}

const sectionDataToType = (section) => {
  if (section.type === "predefined-section") {
    if (section.format === "header") {
      return SectionType.HEADER;
    }
    if (section.format === "footer") {
      return SectionType.FOOTER;
    }
  }
  if (section.type === "text") {
    return SectionType.TEXT;
  }
  if (section.type === "text-key") {
    return SectionType.TEXT_KEY;
  }
  if (section.type === "table") {
    return SectionType.TABLE;
  }
  return null;
}

const processDataToAPI = (template) => {
  return {
    type: template.type,
    typeKey: template.typeKey,
    sections: template.sections.map((section) => ({
      ...section.data,
    })),
  }
}

const processFromToAPI = (template) => {
  return {
    type: template.type || "",
    typeKey: template.typeKey || "custom",
    sections: template.sections?.map((section) => ({
      id: uuidv4(),
      type: sectionDataToType(section),
      data: {
        ...section,
      }
    })) || [],
  }
}

export default function ManageReportTemplate() {
  const [templates, setTemplates] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [previewData, setPreviewData] = useState(null);

  const fetchList = React.useCallback(() => {
    Axios.get('https://dsd07.herokuapp.com/api/reports/templates', {
      headers: {
        'Access-Control-Allow-Origin': true,
        'api-token': '4e3fe3463afd3a705c0be7ec2322c335',
        'project-type': 'LUOI_DIEN',
      },
    })
      .then(response => {
        if (response.data.success) {
          setTemplates([
            ...response.data.data
          ].reverse());
        }
      }).catch(err => {
        // handleShowModal()
      });
  }, []);

  const onSubmitTemplate = () => {
    if (!(modalData && modalData.type)) {
      return;
    }
    if (modalData.isNew) {
      // Create
      Axios.post('https://dsd07.herokuapp.com/api/reports/templates', processDataToAPI(modalData), {
        headers: {
          'Access-Control-Allow-Origin': true,
          'api-token': '4e3fe3463afd3a705c0be7ec2322c335',
          'project-type': 'LUOI_DIEN',
        },
      })
        .then(response => {
          if (response.data.success) {
            handleCancel();
            fetchList();
          }
        }).catch(err => {
          // handleShowModal()
        });
    } else {
      // Patch
      Axios.patch(`https://dsd07.herokuapp.com/api/reports/templates/${modalData.templateId}`, processDataToAPI(modalData), {
        headers: {
          'Access-Control-Allow-Origin': true,
          'api-token': '4e3fe3463afd3a705c0be7ec2322c335',
          'project-type': 'LUOI_DIEN',
        },
      })
        .then(response => {
          if (response.data.success) {
            handleCancel();
            fetchList();
          }
        }).catch(err => {
          // handleShowModal()
        });
    }
    
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalData({});
  };

  const handlePreview = () => {
    setPreviewData(processDataToAPI(modalData));
  }

  const onTemplateAdd = () => {
    setModalData({
      isNew: true,
      title: "Thêm mẫu báo cáo",
      type: "",
      typeKey: "custom",
      sections: [],
    })
    showModal();
  }

  const onTemplateEdit = (templateId) => {
    Axios.get(`https://dsd07.herokuapp.com/api/reports/templates/${templateId}`, {
      headers: {
        'Access-Control-Allow-Origin': true,
        'api-token': '4e3fe3463afd3a705c0be7ec2322c335',
        'project-type': 'LUOI_DIEN',
      },
    })
      .then(response => {
        if (response.data.success) {
          setModalData({
            title: "Thêm mẫu báo cáo",
            templateId,
            ...processFromToAPI(response.data.data),
          })
          showModal();
        }
      }).catch(err => {
        // handleShowModal()
      });
  }

  const onTemplateDelete = (id) => {
    const yes = window.confirm('Bạn có muốn xoá mẫu báo cáo này?');
    if (yes) {
      Axios.delete(`https://dsd07.herokuapp.com/api/reports/templates/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': true,
          'api-token': '4e3fe3463afd3a705c0be7ec2322c335',
          'project-type': 'LUOI_DIEN',
        },
      })
        .then(response => {
          if (response.data.success) {
            fetchList();
          }
        }).catch(err => {
          // handleShowModal()
        });
    }
  }

  const onTemplateNameChange = (e) => {
    const { target: { value } } = e;
    setModalData((modalData) => ({
      ...modalData,
      type: value,
    }));
  }

  const onNewRowAdd = () => {
    setModalData((modalData) => ({
      ...modalData,
      sections: [
        ...modalData.sections,
        { 
          id: uuidv4(),
          data: {},
        }
      ],
    }));
  }

  const onRowDelete = (sectionId) => {
    setModalData((modalData) => ({
      ...modalData,
      sections: modalData.sections.filter((section) => section.id !== sectionId),
    }));
  }

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination || !modalData.sections) {
      return;
    }

    const sections = reorder(
      modalData.sections,
      result.source.index,
      result.destination.index
    );

    setModalData((modalData) => ({
      ...modalData,
      sections,
    }));
  }

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "#dddddd" : "#eeeeee",
    display: 'flex',
    justifyContent: 'space-between',

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = isDraggingOver => ({
    width: "100%"
  });

  const setSectionById = (sectionId, data) => {
    setModalData((modalData) => ({
      ...modalData,
      sections: modalData.sections.map((section) => {
        if (section.id !== sectionId) return section;
        return data;
      }),
    }));
  }

  const onSectionTypeSelect = (section, value) => {
    setSectionById(section.id, {
      ...section,
      type: value,
      data: SectionTypeData[value] || {},
    });
  }

  const SectionTypeRenderer = {
    [SectionType.HEADER]: () => {},
    [SectionType.FOOTER]: () => {},
    [SectionType.TEXT]: (section) => {
      const onFormatSelect = (format) => {
        setSectionById(section.id, {
          ...section,
          data: {
            ...section.data,
            format,
          }
        })
      }
      const onTextChange = (e) => {
        setSectionById(section.id, {
          ...section,
          data: {
            ...section.data,
            text: e.target.value,
          }
        })
      }
      return (
        <>
          <span>Định dạng:</span>
          <Select
            style={{ width: 120 }}
            onChange={onFormatSelect}
            placeholder="Chọn định dạng ..."
            value={section.data?.format}
          >
            <Option value="paragraph">Đoạn văn</Option>
            <Option value="header">Tiêu đề</Option>
          </Select>
          <div style={{ width: 600 }}>
            <TextArea placeholder="Nhập nội dung ..." onChange={onTextChange} value={section.data?.text} />
          </div>
        </>
      );
    },
    [SectionType.TEXT_KEY]: (section) => {
      const onFormatSelect = (format) => {
        setSectionById(section.id, {
          ...section,
          data: {
            ...section.data,
            format,
          }
        })
      }
      const onTextChange = (e) => {
        setSectionById(section.id, {
          ...section,
          data: {
            ...section.data,
            text: e.target.value,
            // keys: matchInputs(e.target.value).reduce((finalResult, currentItem) => {
            //   const key = currentItem.input.substring(1);
            //   return {
            //     ...finalResult,
            //     [key]: null,
            //   }
            // }, {}),
          }
        })
      }
      return (
        <>
          <span>Định dạng:</span>
          <Select
            style={{ width: 120 }}
            onChange={onFormatSelect}
            placeholder="Chọn định dạng ..."
            value={section.data?.format}
          >
            <Option value="paragraph">Đoạn văn</Option>
            <Option value="header">Tiêu đề</Option>
          </Select>
          <div style={{ width: 600 }}>
            <TextArea placeholder="VD: Doanh thu là $doanh_thu_01 VND ..." onChange={onTextChange} value={section.data?.text} />
          </div>
        </>
      );
    },
    [SectionType.TABLE]: (section) => {
      const onTextChange = (e) => {
        const headers = e.target.value
          .split(',')
          .map((item) => item.trim())
          .filter((item) => !!item)

        setSectionById(section.id, {
          ...section,
          data: {
            ...section.data,
            headers,
          }
        })
      }
      return (
        <>
          <span>Thêm cột:</span>
          <Input
            style={{ width: 360 }}
            onChange={onTextChange}
            placeholder="Tên cột cách nhau bởi dấu phẩy ..."
            defaultValue={section.data?.headers?.join(', ')}
          />
        </>
      );
    },
  }

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div>
      <Card
        className="u-shadow u-rounded"
        style={{ marginBottom: 16 }}
      >
        <h3>Danh sách mẫu báo cáo</h3>
        <Button type="primary" onClick={onTemplateAdd}>Thêm mẫu báo cáo +</Button>
        <div style={{ height: 8 }} />
        <Table
          size="small"
          columns={[
            { title: 'ID', dataIndex: 'id' },
            { title: 'Tên báo cáo', dataIndex: 'type' },
            {
              render: (value, record) => (
                <Space>
                  <Button type="primary" onClick={() => onTemplateEdit(record.id)}>Sửa</Button>
                  <Button type="primary" danger disabled={record.typeKey !== 'custom'} onClick={() => onTemplateDelete(record.id)}>Xoá</Button>
                </Space>
              ),
            },
          ]}
          dataSource={templates}
          bordered
        />
      </Card>
      <Modal
        title={modalData.title}
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button danger key="back" onClick={handleCancel}>
            Huỷ
          </Button>,
          <Button key="preview" onClick={handlePreview}>
            Xem thử
          </Button>,
          <Button key="submit" type="primary" onClick={onSubmitTemplate}>
            Lưu
          </Button>,
        ]}
      >
        <Input placeholder="Nhập tên mẫu báo cáo ..." onChange={onTemplateNameChange} value={modalData.type} />
        <div style={{ height: 8 }} />
        <div className="u-reportContainer">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {modalData?.sections?.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                          )}
                        >
                          <Space wrap>
                            <Select
                              style={{ width: 240 }}
                              onChange={(value) => onSectionTypeSelect(section, value)}
                              placeholder="Chọn loại ..."
                              value={section.type}
                            >
                              {Object.keys(SectionType).map((key) => (
                                <Option value={SectionType[key]}>{SectionType[key]}</Option>
                              ))}
                            </Select>
                            {section.type && SectionTypeRenderer[section.type]?.(section)}
                          </Space>
                          <div>
                            <Button danger type="text" shape="circle" icon={<DeleteFilled />} onClick={() => onRowDelete(section.id)} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Button type="primary" onClick={onNewRowAdd}>Thêm mục mới +</Button>
        </div>
      </Modal>
      <Modal
        title="Xem thử mẫu báo cáo"
        visible={!!previewData}
        onCancel={() => setPreviewData(null)}
        width={1000}
        footer={() => null}
      >
        {previewData && (
          <ReportRenderer
            sections={previewData.sections}
            formatted={false}
          />
        )}
      </Modal>
    </div>
  );
}
