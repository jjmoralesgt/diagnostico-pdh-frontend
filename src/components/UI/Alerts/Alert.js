import { toast } from "react-toastify";

const Alert = () =>{
    return (
        toast.success('Mensaje', {
            position: "top-right",
            className: "toast-success",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: false,
          })
    )
}

export default Alert;