import { useEffect } from "react";

function ToastContainer() {
  useEffect(() => {
    const toastElList = [].slice.call(
      document.querySelectorAll(".toast")
    );
    toastElList.map((toastEl) => {
      return new window.bootstrap.Toast(toastEl);
    });
  }, []);

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div
        id="appToast"
        className="toast align-items-center text-bg-success border-0"
        role="alert"
      >
        <div className="d-flex">
          <div className="toast-body" id="toastMsg">
            Success
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default ToastContainer;
