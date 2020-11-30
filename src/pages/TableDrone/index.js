import React, { useEffect, useState, useMemo } from "react";
import { TableHeader, Pagination, Search } from "../../components/DataTable";
import useFullPageLoader from "../../components/hooks/useFullPageLoader";
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ModalEditDataTable from '../../containers/ModalEditDataTable';
import ModalAddDataTable from '../../containers/ModalAddDataTable'

const DataTable = () => {

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
        { name: "Dung lượng pin (mAh)", field: "rangeBattery", sortable: false }
    ];
    const getData = () => {
        showLoader();

        fetch(`http://skyrone.cf:6789/drone/getAll`)
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

        if (search) {
            computedDrones = computedDrones.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase())
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
    }, [drones, currentPage, search, sorting]);

    return (

        <>

            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-3">
                            <ModalAddDataTable />
                        </div>
                        <div className="col-md-5">
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

                    <table className="table table-striped">
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
            </div>
            {loader}
        </>
    );
};

export default DataTable;
