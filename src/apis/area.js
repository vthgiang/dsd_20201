import axios from 'axios';

export const getAreaById = async (areaId) => {
    var data = null;
    try{
        const response = await axios.get(`https://monitoredzoneserver.herokuapp.com/area/areainfo/${areaId}`);
        console.log('area id', response);
        data = response.data.content.area;
    } catch (err){
        console.log(err);
    }
    return data;
}