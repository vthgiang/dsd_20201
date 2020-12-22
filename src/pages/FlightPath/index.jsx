import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Map from '../../components/Drone/Map';
import FlightPathList from '../../components/Drone/FlightPathList';
import AddFlightPathModel from '../../components/Drone/DroneModals/AddFlightPathModal';
import Pagination from '../../components/Drone/Pagination';
import Search from '../../components/Drone/Search';
import axios from 'axios';
import {getToken, getProjectType, getRole} from '../../components/Drone/Common/info';

function FlightPath(props) {

    const [flightPathView, setFlightPathView] = useState(null);
    // const [flightPaths, setFlightPaths] = useState(flightPathsData.slice(0, 10));
    const [flightPaths, setFlightPaths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({page: 1, totalPage: 1, perPage: 8});
    const allFlightPath = useRef(null);
    const flightPathFilter = useRef(null);
    
    const [reload, setReload] = useState(false);
    const pageReload = () => setReload(!reload);

    // for search
    const searchTypes = [
        {label: 'Tên đường bay', value: 'name'},
        {label: 'Khu vực giám sát', value: 'area'},
        {label: 'Miền giám sát', value: 'zone'}
    ];
    const [typeSelected, setTypeSelected] = useState('name');
    const [searchValue, setSearchValue] = useState('');

    const handleSelectChange = (event) => {
        console.log(event.target.value);
        setTypeSelected(event.target.value);
    }

    const handleSearch = (e) => {
        if(e.keyCode !== 13) return;
        if(searchValue == '') {
            flightPathFilter.current = allFlightPath.current;
        } else {
            const searchValueEnglishTone = removeVietnameseTones(searchValue.toLowerCase());
            if(typeSelected === 'name'){
                // filter theo tên
                flightPathFilter.current = allFlightPath.current.filter(item => {
                    const itemNameEnglishTone = removeVietnameseTones(item.name.toLowerCase());
                    return itemNameEnglishTone.includes(searchValueEnglishTone);
                });
            }else if(typeSelected === 'area'){
                // filter theo khu vực
                flightPathFilter.current = allFlightPath.current.filter(item => {
                    const itemAreaEnglishTone = removeVietnameseTones(item.monitoredAreaName.toLowerCase());
                    return itemAreaEnglishTone.includes(searchValueEnglishTone);
                });
            }else if(typeSelected === 'zone'){
                //filter theo miền
                flightPathFilter.current = allFlightPath.current.filter(item => {
                    const itemZoneEnglishTone = removeVietnameseTones(item.monitoredZoneName.toLowerCase());
                    return itemZoneEnglishTone.includes(searchValueEnglishTone);
                });
            }
        }
        // pagechange
        pageChange(1);

        // tính lại tổng trang web
        if(flightPathFilter.current.length == 0) {
            setPagination({...pagination, totalPage: 1, page: 1});
        } else {
            const totalPage = Math.ceil(flightPathFilter.current.length/pagination.perPage);
            setPagination({...pagination, totalPage: totalPage, page: 1});
        }
    }

    useEffect(()=> {
        // console.log(getRole());
        // console.log(getToken());
        // console.log(getProjectType());
        const loadFlightPath = async () => {
            const token = getToken();
            const projectType = getProjectType();
            const headers = {'token': token,'projecttype': projectType};
            let { data }= await axios.get('http://skyrone.cf:6789/flightPath/getAllPath');
            const remove = [];
            data = await Promise.all(data.map(item => {
                return new Promise( async(resolve, reject) => {
                    try{	
                        if(!item.idSupervisedArea) resolve({...item, monitoredZoneName: 'EMPTY'});
                        // console.log(item.idSupervisedArea)
                        let result = await axios.get(`https://monitoredzoneserver.herokuapp.com/monitoredzone/zoneinfo/${item.idSupervisedArea}`,{
                            headers: headers
                        })
                        console.log('result load monitoredZone: ', result);
                        let newItem = {...item, 
                            monitoredZoneName: result.data.content.zone.name, 
                            monitoredAreaId: result.data.content.zone.area,
                            zone: {
                                id: result.data.content.zone._id,
                                minHeight: result.data.content.zone.minHeight, 
                                maxHeight: result.data.content.zone.maxHeight,
                                name: result.data.content.zone.name,
                                startPoint: {
                                    lat: result.data.content.zone.startPoint.latitude,
                                    lng: result.data.content.zone.startPoint.longitude
                                },
                                endPoint: {
                                    lat: result.data.content.zone.endPoint.latitude,
                                    lng: result.data.content.zone.endPoint.longitude
                                }
                            }
                        }
                        resolve(newItem);
                    }catch(err){
                        remove.push(item);
                        console.log(err);
                        resolve({...item, monitoredZoneName: 'EMPTY'});	
                    }
                })
            }))
            console.log('remove:', remove);
            // xoá đường bay ko phải nghiệp vụ hiện tại
            data = data.filter(item => {
                for(let x of remove){
                    if(x.id === item.id)
                        return false;
                }
                return true;
            });

            data = await Promise.all(data.map(item => {
                return new Promise( async (resolve, reject) => {
                    try{	
                        if(!item.monitoredAreaId) resolve({...item, monitoredAreaName: 'EMPTY'});
                        let result = await axios.get(`https://monitoredzoneserver.herokuapp.com/area/areainfo/${item.monitoredAreaId}`,{
                            headers: headers
                        });
                        console.log('response load area:', result)
                        let newItem = {...item, 
                            monitoredAreaName: result.data.content.area.name,
                            area: {
                                name: result.data.content.area.name,
                                id: result.data.content.area._id,
                                startPoint: {
                                    lat: result.data.content.area.startPoint.latitude,
                                    lng: result.data.content.area.startPoint.longitude
                                },
                                endPoint: {
                                    lat: result.data.content.area.endPoint.latitude,
                                    lng: result.data.content.area.endPoint.longitude
                                }
                            }
                        };
                        resolve(newItem);
                    }catch(err){
                        console.log(err);
                        resolve({...item, monitoredAreaName: 'EMPTY'});	
                    }
                })
            }))
            console.log('all Flight Path: ', data)
            allFlightPath.current = data;
            flightPathFilter.current = allFlightPath.current;
            // lấy dữ liệu cho page hiện tại
            const start = (pagination.page - 1)*pagination.perPage;
            setFlightPaths(allFlightPath.current.slice(start, start + pagination.perPage));
            // tính lại tổng page
            const totalPage = Math.ceil(allFlightPath.current.length/pagination.perPage);
            if(totalPage != pagination.totalPage) setPagination({...pagination, totalPage: totalPage});
            console.log(totalPage)
            // console.log(allFlightPath);
            setLoading(false);
        }
        setLoading(true);
        loadFlightPath();
    }, [reload]);

    const pageChange = (newPage) => {
        const start = (newPage - 1)*pagination.perPage;
        const newFlightPaths = flightPathFilter.current.slice(start, start+pagination.perPage);
        setFlightPaths(newFlightPaths);
        setPagination({...pagination, page: newPage});
    }

    const viewFlightPath = (flightPath) => {
        if(flightPathView != null && flightPathView.id === flightPath.id) return;
        setFlightPathView(flightPath);
    }

    const handleDeleteFlightPath = (flightPath) => {
        var result = prompt("Nhập 'delete' để xác nhận bạn thực sự muốn xóa đường bay");
        if(result !== 'delete') return;
        axios.get(`http://skyrone.cf:6789/flightPath/delete/${flightPath.id}`)
            .then(response => {
                console.log(response);
                // pageReload();
                if(response.status !== 200){
                    console.log(response);
                    alert("Có lỗi xảy ra, xóa thất bại"); 
                }else{
                    removeFlightPath(flightPath);
                    updatePathFilter(flightPath);
                    pageRefresh();
                }
            })
            .catch(err => {
                console.log(err)
                alert("Có lỗi xảy ra, xóa thất bại");
            })
    }

    const removeFlightPath = (flightPath) => {
        let index = 0;
        for(let i=0; i<allFlightPath.current.length; i++){
            if(flightPath.id === allFlightPath.current[i].id){
                index = i;
                break;
            }
        }
        allFlightPath.current.splice(index, 1);
        // console.log(allFlightPath.current.length, flightPathFilter.current.length);
    }
    const pageRefresh = () => {
        let page = pagination.page;
        if(page == pagination.totalPage){
            const totalPage = Math.ceil(flightPathFilter.current.length/pagination.perPage);
            // console.log(totalPage, page);
            if(totalPage < pagination.totalPage && page != 1) {
                page--;
                setPagination(
                    {...pagination, totalPage: totalPage, page: page}
                );
            }
        }
        pageChange(page);
    }

    const updatePathFilter = (flightPath) => {
        let index = -1;
        for(let i=0; i<flightPathFilter.current.length; i++){
            if(flightPathFilter.current[i].id == flightPath.id){
                index = i;
                break;
            }
        }
        if(index != -1) flightPathFilter.current.splice(index, 1);
    }

    const addFlightPath = (newFlightPath) => {
        setFlightPaths([...flightPaths, newFlightPath]);
    }

    return (
        <Container>
            <Row>
                <Col md={3}><AddFlightPathModel addFlightPath={addFlightPath} pageReload={pageReload}/></Col>
                <Col md={4}><Pagination pagination={pagination} pageChange={pageChange}/></Col>
                <Col md={5}>
                    <Search 
                        searchTypes={searchTypes} 
                        typeSelected={typeSelected}
                        handleSelectChange={handleSelectChange}
                        searchValue={searchValue} setSearchValue={setSearchValue}
                        handleSearch={handleSearch}
                    />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col md={6}>
                    {loading ? <Spinner animation="border" variant="primary" /> : <FlightPathList 
                        flightPaths={flightPaths} 
                        viewFlightPath={viewFlightPath}
                        handleDeleteFlightPath={handleDeleteFlightPath}
                        baseIndex={(pagination.page-1)*pagination.perPage}
                        pageReload={pageReload}
                    />}
                </Col>
                <Col md={6}>
                    <Map flightPathView={flightPathView}/>
                </Col>
            </Row>
        </Container>
    );
}

export default FlightPath;

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    return str;
}