import { toast } from "react-toastify";

const showFeedback = (message: string, type: string): void => {
  if (type === "error") {
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export default showFeedback;
