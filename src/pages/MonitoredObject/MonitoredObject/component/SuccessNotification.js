import React from "react";

function SuccessNotification({ formatStyle, messages, history }) {
  const onChangePage = () => {
    if (history) {
      history.push({
        pathname: `/monitored-object-management`,
      });
    }
  }
  return (
    <div
      className="modal fade"
      id="modalSuccessNotification"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog    " role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              {messages}
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

          <div className="modal-footer justify-content-center">
            <button type="button" className={formatStyle} data-dismiss="modal" onClick={onChangePage}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SuccessNotification;
