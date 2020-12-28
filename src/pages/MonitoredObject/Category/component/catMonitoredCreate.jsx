import React from "react";
import { CategoryActions } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function CatMonitorCreate({ value, handleChange, setCatMonitored, option }) {
  const user = useSelector((state) => state.user.user);
  const role = user.role;
  const dispatch = useDispatch();
  const handleChangeCatMonitored = () => {
    if (!!value._id) {
      dispatch(
        CategoryActions.editCategory(value._id, {
          code: "1",
          name: value.name,
          description: value.description,
          type: localStorage.getItem("project-type"),
        })
      );
    } else {
      dispatch(
        CategoryActions.createCategory({
          code: "1",
          name: value.name,
          description: value.description,
          type: localStorage.getItem("project-type"),
        })
      );
    }
    setCatMonitored({
      code: "",
      name: "",
      description: "",
    });
  };
  return (
    <div
      className="modal fade"
      id="modalCreateCatObject"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              {option === "add" && "Thêm mới danh mục giám sát"}
              {option === "view" && "Xem chi tiết danh mục giám sát"}
              {option === "edit" && "Sửa danh mục giám sát"}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group row">
                <label
                  htmlFor="inputAreaName"
                  className="col-sm-2 col-form-label"
                >
                  Tên danh mục
                </label>
                <div className="col-sm-10">
                  <input
                    disabled={option === "view"}
                    className="form-control"
                    id="inputAreaName"
                    placeholder="Tên danh mục"
                    name="name"
                    value={value.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {role === "SUPER_ADMIN" ? (
                <div className="form-group row">
                  <label
                    htmlFor="projecttype"
                    className="col-sm-2 col-form-label"
                  >
                    Loại
                  </label>
                  <div className="col-sm-10">
                    <select
                      disabled={option === "view"}
                      className="custom-select"
                      name="type"
                      value={value.type}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Chọn loại
                      </option>
                      <option value="DE_DIEU">Đê Điều</option>
                      <option value="CHAY_RUNG">Cháy rừng</option>
                      <option value="LUOI_DIEN">Lưới điện</option>
                      <option value="CAY_TRONG">Cây trồng</option>
                    </select>
                  </div>
                </div>
              ) : null}

              <div className="form-group row">
                <label
                  htmlFor="inputDescription"
                  className="col-sm-2 col-form-label"
                >
                  Mô tả
                </label>
                <div className="col-sm-10">
                  <textarea
                    disabled={option === "view"}
                    className="form-control"
                    id="inputDescription"
                    rows="3"
                    placeholder="Mô tả"
                    name="description"
                    value={value.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Đóng
            </button>
            {option !== "view" && (
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={handleChangeCatMonitored}
              >
                {option === "add" && "Thêm thông tin"}
                {option === "edit" && "Sửa thông tin"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CatMonitorCreate;
