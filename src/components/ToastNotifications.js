import { dark } from "@mui/material/styles/createPalette";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastSuccess = ({ content }) => {
  return toast.success(content, { theme: "dark" });
};

export const ToastInfo = ({ content }) => {
  return toast.info(content, { theme: "dark" });
};

export const RoomBookingToast = ({ check_in, check_out }) => {
  const success = `Your request for room booking is successful from dates ${check_in} to ${check_out}`;
  const info = `Your booking request has been submitted`;
  ToastInfo({ content: info });
  setTimeout(ToastSuccess, 2500, { content: success });
};

export const MealBookingToast = (assets) => {
  const success = `Your request for meal booking is successful`;
  const info = `Your meal order request has been submitted`;
  ToastInfo({ content: info });
  setTimeout(ToastSuccess, 2500, { content: success });
};

export const TourBookingToast = (assets) => {
  const success = `Your request for ${assets} has been completed successfully`;
  const info = `Your tour request has been submitted successfully`;
  ToastInfo({ content: info });
  setTimeout(ToastSuccess, 2500, { content: success });
};
export const TourPredictingToast = (tourPackage) => {
  const info = `Based on your booking, we suggest you to try out our ${tourPackage} tour`;
  return toast.info(info, 5000, { theme: "light" });
};
