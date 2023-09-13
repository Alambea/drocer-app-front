import { toast } from "react-toastify";

const showFeedback = (message: string, type: "error" | "success"): void => {
  toast[type](message, {
    position: "top-center",
  });
};

export default showFeedback;
