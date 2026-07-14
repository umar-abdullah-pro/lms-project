import toast from "react-hot-toast";
import Swal from "sweetalert2";

/**
 * Displays a success toast notification
 * @param {string} message 
 */
export const showSuccessToast = (message) => {
  toast.success(message, {
    style: {
      background: '#333',
      color: '#fff',
    },
  });
};

/**
 * Displays an error toast notification
 * @param {string} message 
 */
export const showErrorToast = (message) => {
  toast.error(message, {
    style: {
      background: '#333',
      color: '#fff',
    },
  });
};

/**
 * Shows a styled confirmation dialog
 * @param {string} title 
 * @param {string} text 
 * @param {string} confirmText 
 * @returns {Promise<boolean>} True if confirmed, false otherwise
 */
export const confirmAction = async (title = "Are you sure?", text = "You won't be able to revert this!", confirmText = "Yes, delete it!") => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: confirmText,
  });
  
  return result.isConfirmed;
};
