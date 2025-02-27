import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize theme
const initializeTheme = () => {
  const root = document.documentElement;
  const theme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  localStorage.setItem('theme', theme);
};

initializeTheme();
createRoot(document.getElementById("root")!).render(<App />);