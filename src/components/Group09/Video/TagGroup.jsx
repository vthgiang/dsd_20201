import { Tag, Input, Tooltip, AutoComplete } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import incidentTagService from '../../../services/group09/incidentTagService';
import React from 'react';
import to from 'await-to-js';

class EditableTagGroup extends React.Component {
  state = {
    tags: this.props.defaultValue || [],
    options: [],
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  };
  async componentDidMount() {
    let [error2, res = []] = await to(incidentTagService().index());
    if (!error2) {
      let options = res.map((item) => ({ value: item.name }));
      this.setState({ options: options });
    }
  }
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (value) => {
    this.setState({ inputValue: value });
  };

  getTags = () => {
    return this.state.tags;
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  saveEditInputRef = (input) => {
    this.editInput = input;
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag"
              key={tag}
              closable={true}
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    this.setState(
                      { editInputIndex: index, editInputValue: tag },
                      () => {
                        this.editInput.focus();
                      },
                    );
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <AutoComplete
            ref={this.saveInputRef}
            className="tag-input"
            style={{ width: 200 }}
            size="small"
            options={this.state.options}
            className="tag-input"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            value={inputValue}
            onChange={this.handleInputChange}
          >
            <Input.Search
              onPressEnter={this.handleInputConfirm}
              onSearch={this.handleInputConfirm}
              size="small"
              laceholder="Nhập tag sự cố"
              enterButton={'Thêm'}
            />
          </AutoComplete>
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> Thêm nhãn
          </Tag>
        )}
      </>
    );
  }
}

export default EditableTagGroup;
