"use client";

import { setCookie } from "cookies-next";
import sidebuttoncss from "@styles/layout-modules/sidebutton.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faEnvelope, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const SideButtons = () => {
  const toggleTheme = () => {
    const currentColor = document.getElementById("main-container").classList.contains("dark-mode")
      ? "dark"
      : "light";

    if (currentColor == "dark") {
      document.getElementById("main-container").classList.remove("dark-mode");
      document.getElementById("main-container").classList.add("light-mode");
      document.body.classList.remove("dark");
      setCookie("preferredColormode", "light", { maxAge: 180*24*60*60 });
    } else {
      document.getElementById("main-container").classList.remove("light-mode");
      document.getElementById("main-container").classList.add("dark-mode");
      document.body.classList.add("dark");
      setCookie("preferredColormode", "dark", { maxAge: 180*24*60*60 });
    }
  };

  return (
    <div className={sidebuttoncss.maincontainer}>
      <Link href="/" passHref>
        <button>
          <FontAwesomeIcon icon={faHouse} />
        </button>
      </Link>

      <button onClick={toggleTheme}>
        <FontAwesomeIcon className={sidebuttoncss.iconsun} icon={faSun} />
        <FontAwesomeIcon className={sidebuttoncss.iconmoon} icon={faMoon} />
      </button>

      <Link href="/kontakt" passHref>
        <button>
          <FontAwesomeIcon icon={faEnvelope} />
        </button>
      </Link>
    </div>
  );
};

export default SideButtons;
