import { create } from "zustand";

export const useToastStore = create((set) => {
  return {
    text: " ",
    type: "check",
    isOpen: false,

    showToast: (type = "check", text) => {
      set({
        type,
        text,
        isOpen: true,
      });
    },

    closeToast: () => {
      set({
        isOpen: false,
      });
    },
  };
});
