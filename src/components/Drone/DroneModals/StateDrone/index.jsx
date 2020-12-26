import React, {useState} from 'react';
import {Tag} from 'antd';
export default function StateModal(props){
    const {state} = props;
    return (
        <>
              {(() => {
                    if (state == 0) {
                    return (
                        <Tag color="green">Đang rảnh</Tag>
                    )
                    } else if (state == 1) {
                        return (
                            <Tag color="blue">Đang bay</Tag>
                        )
                    } else if (state == 2) {
                        return (
                            <Tag color="orange">Đang sạc</Tag>
                        )
                    } else if (state == 3) {
                        return (
                            <Tag color="orange">Đang bảo trì</Tag>
                        )
                    }
                    else if (state == 4) {
                        return (
                            <Tag color="red">Hỏng</Tag>
                        ) 
                    }
                })()}
        </>
    );
}