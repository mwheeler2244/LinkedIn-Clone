import { X } from "lucide-react";

interface ToastProps {
  show: boolean;
  message: string;
  type: "success" | "info" | "warning" | "error";
  onClose: () => void;
}

const Toast = ({ show, message, type, onClose }: ToastProps) => {
  if (!show) return null;

  return (
    <div
      className={`fixed top-20 left-4 right-4 sm:top-20 sm:right-6 sm:left-auto sm:w-auto px-4 md:px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3 animate-slide-in ${
        type === "success"
          ? "bg-green-600 text-white"
          : type === "info"
          ? "bg-blue-600 text-white"
          : type === "warning"
          ? "bg-yellow-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full animate-pulse ${
          type === "success"
            ? "bg-green-300"
            : type === "info"
            ? "bg-blue-300"
            : type === "warning"
            ? "bg-yellow-300"
            : "bg-red-300"
        }`}
      ></div>
      <span className="font-medium text-sm md:text-base">{message}</span>
      <button
        onClick={onClose}
        className={`cursor-pointer hover:text-white ${
          type === "success"
            ? "text-green-200"
            : type === "info"
            ? "text-blue-200"
            : type === "warning"
            ? "text-yellow-200"
            : "text-red-200"
        }`}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
