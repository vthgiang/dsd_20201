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

    const ITEMS_PER_PAGE = 20;

    const headers = [
        { name: "Id#", field: "idDrone", sortable: true },
        { name: "Tên", field: "name", sortable: true },
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

    return (

        <>
            <div className="row">
                <div className="col-md-3">
                    <ModalAddDataTable />
                </div>
                <div className="col-md-4">
                    <Pagination
                        total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
                    />
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
                <div className="col-md-2 d-flex flex-row-reverse">
                    <Search
                        onSearch={value => {
                            setSearch(value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>
            <Styles>
            {loader}
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
                                            {drone.idDrone}
                                        </th>
                                        <td>{drone.name}</td>
                                        <td>{drone.message}</td>
                                        <td>
                                        {(() => {
                                                if (drone.state == 0) {
                                                return (
                                                    <Button
                                                    variant="contained"
                                                    color="darkslategrey"
                                                  >
                                                    Đặt lịch sạc
                                                  </Button>
                                                )
                                                } else if (drone.state == 1) {
                                                    return (
                                                        <ModalFlight id={drone.idDrone} />
                                                    )
                                                } else if (drone.state == 2 || drone.state == 3) {
                                                    return (
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
                                                    )
                                                }
                                                else if (drone.state == 4) {
                                                return (
                                                    <Button
                                                    variant="contained"
                                                    color="secondary"
                                                  >
                                                    Đặt bảo trì
                                                  </Button>
                                                ) 
                                                }
                                            })()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
               
            </Styles>
        </>
    );
};

export default DataTable;
