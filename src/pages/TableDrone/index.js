import React, { useEffect, useState, useMemo } from "react";
import { TableHeader, Pagination, Search } from "../../components/DataTable";
import useFullPageLoader from "../../components/hooks/useFullPageLoader";
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ModalEditDataTable from '../../containers/ModalEditDataTable';
import ModalAddDataTable from '../../containers/ModalAddDataTable'
import styled from "styled-components";

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
    }

    
`;

    const [drones, setDrones] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 20;

    const headers = [
        { name: "Id#", field: "id", sortable: true },
        { name: "Tên", field: "name", sortable: true },
        { name: "Nhãn hiệu", field: "brand", sortable: true },
        { name: "Màu", field: "color", sortable: true },
        { name: "Kích thước", field: "dimension", sortable: false },
        { name: "Giới hạn tầm bay (m)", field: "maxFlightRange", sortable: false },
        { name: "Tốc độ tối đa (m/min)", field: "maxFlightSpeed", sortable: false },
        { name: "Thời gian bay tối đa (min)", field: "maxFlightTime", sortable: false },
        { name: "Trần cao (m)", field: "maxFlightHeight", sortable: false },
        { name: "Dung lượng pin (mAh)", field: "rangeBattery", sortable: false },
        { name: "_____", field: "rangeBattery", sortable: false }
    ];
    const getData = () => {
        showLoader();

        fetch(`http://skyrone.cf:6789/drone/getAll`)
            .then(response => response.json())
            .then(json => {
                hideLoader();
                setDrones(json);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const dronesData = useMemo(() => {
        let computedDrones = drones;

        if (search) {
            computedDrones = computedDrones.filter(
                comment =>
                    comment.id.toLowerCase().includes(search.toLowerCase()) ||
                    comment.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedDrones.length);

        // //Sorting comments
        // if (sorting.field) {
        //     const reversed = sorting.order === "asc" ? 1 : -1;
        //     computedDrones = computedDrones.sort(
        //         (a, b) =>
        //             reversed * a[sorting.field].localeCompare(b[sorting.field.toString])
        //     );
        // }

        //Current Page slice
        return computedDrones.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [drones, currentPage, search, sorting]);

    return (

        <>
            <div className="row">
                <div className="col-md-2">
                    <ModalAddDataTable />
                </div>
                <div className="col-md-2">
                    <h4>{dronesData.length + 1} drone</h4>
                </div>
                <div className="col-md-4">
                    <Pagination
                        total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
                <div className="col-md-4 d-flex flex-row-reverse">
                    <Search
                        onSearch={value => {
                            setSearch(value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
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
                                        <th scope="row" key={drone.id}>
                                            {drone.id}
                                        </th>
                                        <td>{drone.name}</td>
                                        <td>{drone.brand}</td>
                                        <td>{drone.color}</td>
                                        <td>{drone.dimensions}</td>
                                        <td>{drone.maxFlightRange}</td>
                                        <td>{drone.maxFlightSpeed}</td>
                                        <td>{drone.maxFlightTime}</td>
                                        <td>{drone.maxFlightHeight}</td>
                                        <td>{drone.rangeBattery}</td>
                                        <td>
                                            <ModalEditDataTable code={drone.code} id={drone.id} />
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
