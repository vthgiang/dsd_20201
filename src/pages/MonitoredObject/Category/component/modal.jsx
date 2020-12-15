import React from "react";
import { CategoryActions } from "../redux/actions";
import { useDispatch } from "react-redux";

function Modals({ value, setCatMonitored }) {
  const dispatch = useDispatch();
  const onHandleDelete = () => {
    dispatch(CategoryActions.deleteManyCategories([value._id]));
  };
  return (
    <div
      className="modal fade"
      id="modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <h5>Bạn có muốn xóa không?</h5>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Không
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => onHandleDelete()}
            >
              Có
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modals;
