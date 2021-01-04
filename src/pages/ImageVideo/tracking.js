import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
// const WS_STREAM_HOST = 'ws://localhost:7002';

function Tracking() {
    var url0=['https://cdn.videvo.net/videvo_files/video/free/2019-03/small_watermarked/181015_Extra_DanangDrone_004_preview.webm',
    'https://cdn.videvo.net/videvo_files/video/free/2017-12/small_watermarked/171124_B1_HD_001_preview.webm',
    'https://cdn.videvo.net/videvo_files/video/free/2019-12/small_watermarked/190915_A_04_Drone_16_preview.webm',
    'https://cdn.videvo.net/videvo_files/video/free/2020-01/small_watermarked/190915_A_01_Timelapse_02_preview.webm',
    'https://cdn.videvo.net/videvo_files/video/free/2020-01/small_watermarked/190915_A_01_Timelapse_01_preview.webm',
    'https://cdn.videvo.net/videvo_files/video/free/2019-12/small_watermarked/190915_A_04_Drone_11_preview.webm',
    'https://cdn.videvo.net/videvo_files/video/free/2019-12/small_watermarked/190915_A_04_Drone_19_preview.webm',
    'https://cdn.videvo.net/videvo_files/video/free/2018-01/small_watermarked/171124_D1_HD_018_preview.webm',
    'https://cdn.videvo.net/videvo_files/video/premium/video0234/small_watermarked/NO%20MR_STOCK%20FOOTAGE%20NO%20MR%20(47)_preview.webm',
    'https://cdn.videvo.net/videvo_files/video/free/2020-01/small_watermarked/190915_A_01_Timelapse_05_preview.webm',
    'https://cdn.videvo.net/videvo_files/video/free/2019-12/small_watermarked/190915_A_04_Drone_23_preview.webm']
    
            var url1=['https://ak.picdn.net/shutterstock/videos/1056066413/thumb/stock-footage-aerial-view-of-the-river-dam-boiling-water-cars-go-over-the-bridge-over-the-river-dam-side-view.mp4',
    'https://ak.picdn.net/shutterstock/videos/26717128/thumb/stock-footage-aerial-view-of-water-rushing-through-the-gates-at-a-dam.mp4',
    'https://ak.picdn.net/shutterstock/videos/1062463069/thumb/stock-footage-flowing-water-at-the-overflow-of-the-middle-dike-of-the-dam-nagoldtalsperre-near-seewald-erzgrube.mp4',
    'https://media.istockphoto.com/videos/traditional-jutland-thatched-farmhouses-aerial-view-central-jutland-video-id528521884',
    'https://media.istockphoto.com/videos/river-welland-outflow-video-id1175646135',
    'https://media.istockphoto.com/videos/aerial-view-of-manavgat-dam-video-id1184280538',
    'https://media.istockphoto.com/videos/winter-storm-at-the-ijsselmeer-in-the-netherlands-video-id1049797982',
    'https://media.istockphoto.com/videos/open-the-flood-gates-colorado-river-dam-aerial-view-austin-texas-video-id526667378',
    'https://media.istockphoto.com/videos/water-flow-on-dike-video-id472805528',]
            var url2=['https://media.istockphoto.com/videos/top-view-electricity-pylons-in-the-rural-scene-video-id1171733212',
    'https://media.istockphoto.com/videos/loopable-transformers-or-power-lines-background-video-id461972130',
    'https://media.istockphoto.com/videos/electricity-pylons-in-the-countryside-video-id517480870',
    'https://media.istockphoto.com/videos/electrical-power-line-grid-video-id699748928',
    'https://media.istockphoto.com/videos/dramatic-sky-with-power-lines-drone-video-video-id1165638123',
    'https://media.istockphoto.com/videos/supplying-the-nation-with-power-video-id1156945673',
    'https://media.istockphoto.com/videos/power-transmission-video-id104564901',
    'https://media.istockphoto.com/videos/flying-up-the-high-voltage-electricity-tower-at-sunset-video-id866214654',
    'https://media.istockphoto.com/videos/hyperlapse-electricity-pylons-in-the-sunrise-aerial-view-video-id1190877309',
    'https://media.istockphoto.com/videos/flying-up-the-high-voltage-electricity-tower-at-sunset-video-id493259246',]
    var url3=['https://media.istockphoto.com/videos/harvesting-a-wheat-field-during-a-very-dry-summer-season-aerial-view-video-id1002097560',
    'https://media.istockphoto.com/videos/aerial-view-of-field-of-wheat-in-oregon-at-sunrise-video-id864331526',
    'https://media.istockphoto.com/videos/beautiful-summertime-sunset-aerial-footage-of-the-michigan-farm-land-video-id1168488229',
    'https://media.istockphoto.com/videos/aerial-of-tractor-spraying-pesticides-on-an-agricultural-field-video-id897436132',
    'https://media.istockphoto.com/videos/the-american-heartland-at-sunset-video-id483417962',
    'https://media.istockphoto.com/videos/backgrounds-sunset-at-cloud-time-lapse-video-id889326276',
    'https://media.istockphoto.com/videos/agricultural-tractor-plowing-field-video-id956250410',
    'https://media.istockphoto.com/videos/central-valley-farmland-aerial-shot-video-id855709228',
    'https://media.istockphoto.com/videos/flight-over-the-wheat-field-at-sunrise-video-id483873821',
    'https://media.istockphoto.com/videos/aerial-shot-of-a-beautiful-meadow-on-the-morning-with-hay-stacks-and-video-id660619384',]
    
        const[drones,setDrones]=useState([]);
    const[obj0,setObj0]=useState([]);
    const[obj1,setObj1]=useState([]);
    const[obj2,setObj2]=useState([]);
    const[obj3,setObj3]=useState([]);
    
    const handleObjs = (type) => {
        axios({
            method: "GET",
            url: "https://dsd05-monitored-object.herokuapp.com/monitored-object/",
            params: {
                "type":type
            },
            headers: {
            },

            data: {
            }
        }).then(({ data }) => {
            switch(type){
                case "CHAY_RUNG": setObj0(data.content);break;
                case "DE_DIEU": setObj1(data.content); break;
                case "LUOI_DIEN": setObj2(data.content);break;
                case "CAY_TRONG": setObj3(data.content); break;  

            }
        })
    };

    
    const handleTracking = () => {
        axios({
            method: "GET",
            url: "http://skyrone.cf:6789/droneState/getAllDroneActiveRealTime",
            params: {
            },
            headers: {
                "api-token": localStorage.getItem("token"),
                "project-type": localStorage.getItem("project-type")
            },

            data: {
            }
        }).then(({ data }) => {
            setDrones(data);
        })
    };


    const getImagesPayload = async (id,drones,type,typeID,typeName,urls) => {
        console.log(drones)
        axios({
            method: "GET",
            url: "https://dsd06.herokuapp.com/api/payloadMetadata/image/"+id,
            params: {
                "project_type":type
            },
            headers: {
                "api-token": localStorage.getItem("token"),
                "project-type": localStorage.getItem("project-type")
            },
            data: {
            }
        }).then(({ data }) => {
            data.map(item=>{
                console.log(item)
                axios({
                    url:"https://it4483team2.herokuapp.com/api/records",
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      "api-token": localStorage.getItem("token"),
                      "project-type": type      
                    },
                    data: {
                    "title": "Ảnh theo dõi "+ typeName +" " +Date.now(),
                    "description":item.description,
                    "type": 0,
                    "problemType": typeID,
                    "isTraining": Math.floor(Math.random() * 10)<7,
                    "link":item.image,
                    "longitude": item.object.locationLng,
                    "latitude": item.object.locationLat,
                    "monitoredObjectId": "",
                    "idSupervisedArea": item.object.idSupervisedArea,
                    "idDrone": item.object.idDrone,
                    "idFlightPath": item.object.flightPath.id,
                    "metaData": JSON.stringify(item),
                    "monitoredObjectId": drones[Math.floor(Math.random() * drones.length)]?._id,
                    "idCampaign": item.object.idCampaign,
                }
                  })
                    .then(response => response.json())
                    .then(() => {
                    })
                    .catch(error => console.error('Unable to add item.', error));

                    axios({
                        url:"https://it4483team2.herokuapp.com/api/records",
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          "api-token": localStorage.getItem("token"),
                          "project-type": type      
                        },
                        data: {
                        "title": "Video theo dõi "+ typeName +" " +Date.now(),
                        "description":item.description,
                        "type": 1,
                        "problemType": typeID,
                        "isTraining": Math.floor(Math.random() * 10)<7,
                        "link":urls[Math.floor(Math.random() * (urls.length-1))],
                        "longitude": item.object.locationLng,
                        "latitude": item.object.locationLat,
                        "monitoredObjectId": "",
                        "idSupervisedArea": item.object.idSupervisedArea,
                        "idDrone": item.object.idDrone,
                        "idFlightPath": item.object.flightPath.id,
                        "metaData": JSON.stringify(item),
                        "monitoredObjectId": drones[Math.floor(Math.random() * drones.length)]?._id,
                        "idCampaign": item.object.idCampaign,
                    }
                      })
                        .then(response => response.json())
                        .then(() => {
                        })
                        .catch(error => console.error('Unable to add item.', error));
    
                })
            })
        }
    


    useEffect(()=>{
        drones.map((item,key)=>{
            axios({
                method:"GET",
                url:"http://dsd06.herokuapp.com/api/payload",
                params:{
                    "droneId":item.idDrone,
                },
                data:{

                }
            }).then(({ data }) => {
                data.map(item1=>{
                    getImagesPayload(item1._id,obj0,"CHAY_RUNG",0,"rừng",url0)
                    getImagesPayload(item1._id,obj1,"DE_DIEU",1,"đê điều",url1)
                    getImagesPayload(item1._id,obj2,"LUOI_DIEN",2,"lưới điện",url2)
                    getImagesPayload(item1._id,obj3,"CAY_TRONG",3,"cây trồng",url3)
                })
            })

            })
        },[drones])

    useEffect(()=>{setTimeout(()=>handleTracking(),5000);
        handleObjs("CHAY_RUNG");
        handleObjs("DE_DIEU");
        handleObjs("LUOI_DIEN");
        handleObjs("CAY_TRONG")},[])
    
  return (<button>AAAA</button>
  );
}


export default Tracking;
