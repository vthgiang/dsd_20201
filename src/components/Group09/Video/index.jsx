import React, { useEffect, useImperativeHandle } from 'react';
import 'video.js/dist/video-js.css';
import 'videojs-markers';
import 'videojs-markers/dist/videojs.markers.css';

import videojs from 'video.js';

const SOURCES = [
  {
    src: '//vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4',
  },
  {
    src: '//vjs.zencdn.net/v/oceans.webm',
    type: 'video/webm',
  },
  {
    src: '//vjs.zencdn.net/v/oceans.ogg',
    type: 'video/ogg',
  },
];

var options = { responsive: true };
var player;
let markers = [];
const Video = React.forwardRef((props, ref) => {
  const { poster = '//vjs.zencdn.net/v/oceans.png', sources = SOURCES } = props;

  useEffect(() => {
    player = videojs('incident-video', options);
    if (typeof player.markers === 'function') {
      player.markers({
        markers: [],
      });
    } else {
      window.location.reload();
    }
  }, []);

  const setMakers = (markers = []) => {
    player.markers.reset(markers);
  };

  useImperativeHandle(ref, () => ({
    setMakersByIncidents(incidents = []) {
      setMakers(incidents);
    },
    currentTime() {
      return player.currentTime();
    },
  }));

  return (
    <video
      id="incident-video"
      className="video-js vjs-default-skin"
      controls
      // preload="auto"
      poster={poster}
      data-setup='{"fluid": true}'
      {...props}
    >
      {sources.map((item, index) => (
        <source key={index} src={item.src} type={item.type}></source>
      ))}
      <p className="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank">
          supports HTML5 video
        </a>
      </p>
    </video>
  );
});
export default Video;
