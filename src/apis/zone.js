import axios from 'axios';
import { getProjectType, getToken } from '../components/Drone/Common/info';

export const getZoneById = async (zoneId) => {

    const headers = {'token': getToken(),'projecttype': getProjectType()};

    const response = await axios.get(`https://monitoredzoneserver.herokuapp.com/monitoredzone/zoneinfo/${zoneId}`,{headers});
    // console.log('zone response', response);
    return {
        ...response.data.content.zone,
        id: response.data.content.zone._id,
        startPoint: {
            lat: response.data.content.zone.startPoint.latitude,
            lng: response.data.content.zone.startPoint.longitude
        },
        endPoint: {
            lat: response.data.content.zone.endPoint.latitude,
            lng: response.data.content.zone.endPoint.longitude
        }
    }
}

export const getZonebyAreaId = async (areaId) => {

    const headers = {'token': getToken(),'projecttype': getProjectType()};
    let zones = [];
    try{
        const response = await axios.get(`https://monitoredzoneserver.herokuapp.com/monitoredzone/area/${areaId}`,{headers: headers})
        // console.log('get zone by areaId', response);
        zones =  [...response.data.content.zone];
    }catch(err){
        console.log(err);
    }
    return zones;
};