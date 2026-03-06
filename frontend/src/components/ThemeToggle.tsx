import { useEffect, useState } from "react";

export default function ThemeToggle() {

  const [dark, setDark] = useState(false);

  useEffect(() => {

    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }

  }, []);

  const toggleTheme = () => {

    const root = document.documentElement;

    if (dark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  };

  return (

    <button onClick={toggleTheme}>
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>

  );
}