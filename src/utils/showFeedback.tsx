import { toast } from "react-toastify";

export const showFeedback = (
  message: string,
  type: "error" | "success",
): void => {
  toast[type](message, {
    position: "top-center",
  });
};
