import React from 'react';

function FileUpload() {
  // State to store uploaded file
  const [file, setFile] = React.useState('');

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);
    // Add code here to upload file to server
    // ...
  }
  return (
    <div
      className="modal fade"
      id="modalImport"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Thêm mới đối tượng giám sát
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
            <div id="upload-box">
              <input type="file" onChange={handleUpload} />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Đóng
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={() => alert('Thêm mới thành công')}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function AreaMonitorImport() {
  return <FileUpload />;
}
