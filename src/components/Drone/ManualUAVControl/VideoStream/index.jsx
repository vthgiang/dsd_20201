import { Collapse } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import {UAVContext} from '../Context';

const { Panel } = Collapse;

const urlStreams = [
    'https://media.istockphoto.com/videos/aerial-view-of-amazon-rainforest-in-brazil-video-id1169794330',
    'https://media.istockphoto.com/videos/aerial-view-of-amazon-rainforest-in-brazil-video-id1169794330'
];

function VideoStream(props) {

    const [urlStream, setUrlStream] = useState('');

    const {droneSelected} = useContext(UAVContext);

    useEffect(()=>{
        setUrlStream(Math.trunc(Math.random(urlStreams.lengths)));
    }, [droneSelected]);

    function callback(key) {
        console.log(key);
    }

    return (
        <Collapse defaultActiveKey={['1']} onChange={callback}>
            <Panel header="Xem video stream">
                <div style={{textAlign: 'center'}}>
                    <video
                    controls
                    autoPlay
                    width="480"
                    height="300"
                    src={urlStream}
                    style={{ marginBottom: '15px' }}
                    >
                    </video>
              </div>
            </Panel>
        </Collapse>
    );
}

export default VideoStream;