import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Tag } from 'antd';
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CRUD_DRONE, isAuthorised } from "../../components/Drone/Common/role";
import useFullPageLoader from "../../components/hooks/useFullPageLoader";
import ModalAddDataTable from '../../containers/ModalAddDataTable';
import ModalEditDataTable from '../../containers/ModalEditDataTable';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID drone"
  },
  { id: "name", numeric: true, disablePadding: false, label: "Tên drone" },
  { id: "brand", numeric: true, disablePadding: false, label: "nhãn hiệu" },
  { id: "color", numeric: true, disablePadding: false, label: "color" },
  { id: "maxFlightRange", numeric: true, disablePadding: false, label: "Tầm bay (m)" },
  { id: "maxFlightSpeed", numeric: true, disablePadding: false, label: "Tốc độ tối đa(m)" },
  { id: "maxFlightTime", numeric: true, disablePadding: false, label: "thời gian bay tối đa (p)" },
  { id: "maxFlightHeight", numeric: true, disablePadding: false, label: "Trần bay (m)" },
  { id: "rangeBattery", numeric: true, disablePadding: false, label: "dung lượng pin (mAh)" },
  { id: "type", numeric: true, disablePadding: false, label: "loại" }
];

function EnhancedTableHead(props) {
  const {
    stateDrone,
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  }
}));



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  container: {
    maxHeight: 500,
  }
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(35);

  const [drones, setDrones] = useState([]);
const getData = () => {
    showLoader();
    fetch(`http://skyrone.cf:6789/drone/getAll`)
        .then(response => response.json())
        .then(json => {
            setDrones(json);
            hideLoader();
        });
};

useEffect(() => {
    getData();
}, []);

const [loader, showLoader, hideLoader] = useFullPageLoader();
const [search, setSearch] = useState();
const [numDrone, setNumDrone] = useState();

const users = useSelector((state) => state.user.user);
const projectType = users.type;
const role = users.role;


const dronesData = useMemo(() => {
    let computedDrones = drones;
    setPage(0);
   
    setNumDrone(computedDrones.length);
    if (search) {
        computedDrones = computedDrones.filter(
            (comment) =>
                comment.id.toLowerCase().includes(search.toLowerCase()) || comment.name.toLowerCase().includes(search.toLowerCase())
        );
    } 
    return computedDrones;
}, [drones, search]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dronesData.map((n) => n.idDrone);
      setSelected(newSelecteds);
      console.log(selected);
      return;
    }
    setSelected([]);
  };

 



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dronesData.length - page * rowsPerPage);

  const EnhancedTableToolbar = (props) => {
        const classes = useToolbarStyles();
        return (
          <Toolbar>
           
           <Typography   className={classes.title}> <ModalAddDataTable></ModalAddDataTable> </Typography>
              <Typography> {numDrone}drone </Typography>
          </Toolbar>
        );
      };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <input
                key="111"
                type="text"
                className="form-control"
                style={{ width: "400px", marginRight: '1rem', marginLeft: '2rem' }}
                placeholder="Tìm kiếm ID hoặc tên drone"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        <EnhancedTableToolbar />
        <TableContainer className={classes.container}>
        {loader}
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            stickyHeader aria-label="sticky table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dronesData.length}
            />
            <TableBody>
              {stableSort(dronesData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((drone, index) => {
                  const isItemSelected = isSelected(drone.idDrone);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={drone.id}
                      selected={isItemSelected}
                    >
                      <TableCell>
                        {drone.id}
                      </TableCell>
                      <TableCell align="right">{drone.name}</TableCell>
                      <TableCell align="right">{drone.brand}</TableCell>
                      <TableCell align="right">{drone.color}</TableCell>
                      <TableCell align="right">{drone.maxFlightRange}</TableCell>
                      <TableCell align="right">{drone.maxFlightSpeed}</TableCell>
                      <TableCell align="right">{drone.maxFlightTime}</TableCell>
                      <TableCell align="right">{drone.maxFlightHeight}</TableCell>
                      <TableCell align="right">{drone.rangeBattery}</TableCell>
                      <TableCell align="right"><Tag color="green">{drone.type}</Tag></TableCell>
                      <TableCell align="center">
                              {isAuthorised(CRUD_DRONE) && <ModalEditDataTable code={drone.code} id={drone.id} />}  
                          </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[35, 50, 70]}
          component="div"
          count={dronesData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Thu gọn"
      />
    </div>
  );
}
