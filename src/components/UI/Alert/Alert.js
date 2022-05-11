import { toast } from "react-toastify";

function Alert (respuesta, msj){
  if (respuesta === "success") {
    toast.success(msj, {
      position: "top-right",
      className: "toast-success",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: false,
    });
  } else if (respuesta === "error") {
    toast.error(msj, {
      position: "top-right",
      className: "toast-error",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: false,
    });
  } else if (respuesta === "info") {
    toast.info(msj, {
      position: "top-right",
      className: "toast-error",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: false,
    });
  } else if (respuesta === "warning") {
    toast.warn(msj, {
      position: "top-right",
      className: "toast-error",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: false,
    });
  }

  return { respuesta };
};
export default Alert;
