import { theme } from "@cloudinary/url-gen/actions/effect";
import { create } from "zustand";

 export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme")||"halloween",
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
    },
 }));
 
  
