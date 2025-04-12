function ThemeToggle() {
    const toggleTheme = () => {
      const current = document.documentElement.getAttribute("data-theme");
      document.documentElement.setAttribute(
        "data-theme",
        current === "dark" ? "light" : "dark"
      );
    };
  
    return (
      <button className="btn " onClick={toggleTheme}>
        Toggle Theme
      </button>
    );
  }
  export default ThemeToggle