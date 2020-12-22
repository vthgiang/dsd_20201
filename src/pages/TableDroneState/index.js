import React, { useEffect, useState, useMemo } from "react";
import { TableHeader, Pagination, Search } from "../../components/DataTable";
import useFullPageLoader from "../../components/hooks/useFullPageLoader";
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ModalEditDataTable from '../../containers/ModalEditDataTable';
import ModalAddDataTable from '../../containers/ModalAddDataTable'
import styled from "styled-components";
import ModalFlight from '../../containers/ModalFlight'
import { Modal } from "@material-ui/core";
import StateModal from "../../components/Drone/DroneModals/StateModal";
import StateDrone from "../../components/Drone/DroneModals/StateDrone";
import GetBackDrone from "../../components/Drone/DroneModals/GetBackDrone";
import Checkbox from '@material-ui/core/Checkbox';
const DataTable = () => {

    const Styles = styled.div`
        > div {
            height: 80vh;
            overflow: auto;
        }
        table {

            border-spacing: 0;

            thead > tr {
            th {
                text-align: center;
                z-index: 50;
            }
    }`;

    const [drones, setDrones] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [numDrone, setNumDrone] = useState();

    const ITEMS_PER_PAGE = 20;

    const headers = [
        { name: "______", field: "", sortable: false },
        { name: "Id#", field: "idDrone", sortable: true },
        { name: "Tên", field: "name", sortable: false },
        { name: "Tình trạng", field: "message", sortable: true},
        { name: "______", field: "", sortable: false }
    ];
    const [stateDrone, setStateDrone] = useState("0");  
    const getData = () => {
        showLoader();

        fetch(`http://skyrone.cf:6789/droneState/getAllStateNow`)
            .then(response => response.json())
            .then(json => {
                hideLoader();
                setDrones(json);
                console.log(json);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const dronesData = useMemo(() => {
        let computedDrones = drones;

        if (stateDrone) {
            if (stateDrone === "0") {
                computedDrones = drones
            } else {
                computedDrones = computedDrones.filter(
                    comment => comment.message.includes(stateDrone));
            }
        }
        setNumDrone(computedDrones.length);
        if (search) {
            computedDrones = computedDrones.filter(
                comment =>
                    comment.idDrone.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedDrones.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedDrones = computedDrones.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field.toString])
            );
        }

        //Current Page slice
        return computedDrones.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [drones, currentPage, search, sorting, stateDrone]);

    const [listIdDrone, setListIdDrone] = useState([])

    const handleChangeCheckBox = (event) => {
        // if (event.target.checked) {
        //     setListIdDrone([...listIdDrone, event.target.name])
        //     console.log("array : "+listIdDrone)
        // } else {
        //     var array = [...listIdDrone];
        //     var index = listIdDrone.indexOf(event.target.name);
        //     if (index !== -1) {
        //         array.splice(index, 1);
        //         setListIdDrone(array)
        //         console.log("array : "+listIdDrone)
        //       }
        // }
        
      };
    
    return (

        <>
            <div className="row">
                <div className="col-md-3">
                    <h4>{numDrone} drone</h4>
                </div>
                <div className="col-md-3">
                    <select value={stateDrone} 
                        onChange={event => setStateDrone(event.target.value)}>
                        <option value="0">Tất cả</option>
                        <option value="Đang Rảnh">Đang rảnh</option>
                        <option value="Đang Bay">Đang bay</option>
                        <option value="Đang Sạc">Đang sạc</option>
                        <option value="Đang Bảo trì">Đang bảo trì</option>
                        <option value="Hỏng">Hỏng</option>
                    </select>
                </div>
                <div className="col-md-3">
                <Search
                        onSearch={value => {
                            setSearch(value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="col-md-3 d-flex flex-row-reverse">
                     <ModalAddDataTable />
                </div>
            </div>
            <div>
                    <Pagination
                        total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
                    />
            </div>
            <Styles>
                <div className="row w-100">
                    <div className="col mb-3 col-12 text-center">


                        <table className="table table-striped sticky-table">
                            <TableHeader
                                headers={headers}
                                onSorting={(field, order) =>
                                    setSorting({ field, order })
                                }
                            />
                            <tbody>
                                {dronesData.map(drone => (
                                    <tr>
                                        <th scope="row" key={drone.idDrone}>
                                        <Checkbox
                                            onChange={handleChangeCheckBox}
                                            color="primary"
                                            name={drone.idDrone}
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                         />
                                        </th>
                                        <td>
                                              {drone.idDrone}
                                        </td>
                                        <td>{drone.name}</td>
                                        <td> 
                                            <StateDrone state={drone.state} />    
                                        </td>
                                        <td>
                                        {(() => {
                                                if (drone.state == 0) {
                                                return (
                                                     <StateModal drone={drone} />
                                                )
                                                } else if (drone.state == 1) {
                                                    return (
                                                        <ModalFlight id={drone.idDrone} />
                                                    )
                                                } else if (drone.state == 2 || drone.state == 3) {

                                                    return (
                                                        <tr>

                                                            <td>
                                                                <div>{new Intl.DateTimeFormat("vi-VE", {
                                                                    year: "numeric", month: "long", day: "2-digit", 
                                                                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                                                                    hour12: true
                                                                }).format(drone.timeStart)}
                                                                <br></br>
                                                                {new Intl.DateTimeFormat("vi-VE", {
                                                                    year: "numeric", month: "long", day: "2-digit", 
                                                                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                                                                    hour12: true
                                                                }).format(drone.timeEnd)}
                                                                </div>
                                                                
                                                            </td>
                                                            <td>
                                                                <div>
                                                                <GetBackDrone drone={drone} />
                                                                </div>
                                                         
                                                                
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                else if (drone.state == 4) {
                                                return (
                                                    <StateModal drone={drone}/>
                                                ) 
                                                }
                                            })()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {loader}
                </div>
               
            </Styles>
            
        </>
    );
};

export default DataTable;