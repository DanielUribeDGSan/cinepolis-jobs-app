import Toast from "react-native-toast-message";

interface ToastMessage {
  title: string;
  description?: string;
}

const toastBase = ({
  type,
  title,
  description,
}: ToastMessage & {
  type: "success" | "error" | "info" | "warning" | "loading";
}) => {
  Toast.show({
    type,
    text1: title,
    text2: description,
    position: "bottom", // equivalente a bottom-center
    autoHide: type !== "loading",
    visibilityTime: 5000,
  });
};

export const showErrorMessage = (msg: ToastMessage) =>
  toastBase({ ...msg, type: "error" });

export const showWarnMessage = (msg: ToastMessage) =>
  toastBase({ ...msg, type: "warning" });

export const showSuccessMessage = (msg: ToastMessage) =>
  toastBase({ ...msg, type: "success" });

export const showInfoMessage = (msg: ToastMessage) =>
  toastBase({ ...msg, type: "info" });

export const showLoadingMessage = (msg: ToastMessage) => {
  Toast.show({
    type: "info",
    text1: msg.title,
    text2: msg.description,
    position: "bottom",
    autoHide: false,
  });
};

export const toastDismiss = () => Toast.hide();
