import { useEffect, useState } from "react";
import { getThemeFromCookie, setThemeToCookie } from "../utils/cookie";
import { FaGlasses } from "react-icons/fa";

const SelectTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>(
    getThemeFromCookie()
  );
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    setThemeToCookie(selectedTheme);
  }, [selectedTheme]);

  const handleChangeTheme = (theme: string) => {
    setSelectedTheme(theme);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <details className={`dropdown mr-3 ${dropdownOpen ? "open" : ""}`}>
      <summary
        className="btn"
        onClick={toggleDropdown}
        aria-label="Toggle Dropdown"
      >
        <FaGlasses />
      </summary>
      <ul className="w-30 menu dropdown-content rounded-box right-0 z-[1] bg-base-100 p-2 shadow">
        <li>
          <a onClick={() => handleChangeTheme("light")}>Light Theme</a>
        </li>
        <li>
          <a onClick={() => handleChangeTheme("dark")}>Dark Theme</a>
        </li>
        <li>
          <a onClick={() => handleChangeTheme("cupcake")}>Cupcake Theme</a>
        </li>
        <li>
          <a onClick={() => handleChangeTheme("retro")}>Retro Theme</a>
        </li>
      </ul>
    </details>
  );
};

export default SelectTheme;
