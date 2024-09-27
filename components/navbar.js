"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons

const navItems = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "losses",
    name: "Power Losses",
  },
  {
    path: "/health",
    name: "Poles Health",
  },
  {
    path: "/alerts",
    name: "Alerts",
  },
];

// ToDo
// add icons
// fix framer motion going off the screen and flashing scrollbar for a second.

export function NavBar() {
  const pathname = usePathname() || "/";

  const normalizedPathname = pathname.includes("/writing/")
    ? "/writing"
    : pathname;

  const [hoveredPath, setHoveredPath] = useState(normalizedPathname);

  // Theme state: true for light mode, false for dark mode
  const [isLightMode, setIsLightMode] = useState(true);

  // Toggle theme function
  const toggleTheme = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  // Define theme-based classes
  const containerClasses = isLightMode
    ? "border border-gray-200 bg-white/80 backdrop-blur-md"
    : "border border-stone-800/90 bg-stone-900/80 backdrop-blur-md";

  const navClasses =
    "flex gap-2 relative w-full z-[100] rounded-lg justify-evenly items-center";

  const linkBaseClasses =
    "px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in";

  const getLinkClasses = (isActive) => {
    if (isLightMode) {
      return isActive ? "text-black" : "text-gray-600";
    } else {
      return isActive ? "text-zinc-100" : "text-zinc-400";
    }
  };

  const overlayClasses = isLightMode ? "bg-gray-200/80" : "bg-stone-800/80";

  return (
    <div
      className={`${containerClasses} p-[0.4rem] rounded-lg mb-12 sticky top-4 z-[100] ml-4 mr-4 flex`}
    >
      <nav className={navClasses}>
        {navItems.map((item) => {
          const isActive = item.path === normalizedPathname;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`${linkBaseClasses} ${getLinkClasses(isActive)}`}
              data-active={isActive}
              onMouseOver={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(normalizedPathname)}
            >
              <div>{item.name}</div>
              {item.path === hoveredPath && (
                <motion.div
                  className={`absolute bottom-0 left-0 h-full rounded-md -z-10 ${overlayClasses}`}
                  layoutId="navbar"
                  aria-hidden="true"
                  style={{
                    width: "100%",
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0.25,
                    stiffness: 130,
                    damping: 9,
                    duration: 0.3,
                  }}
                />
              )}
            </Link>
          );
        })}
        {/* Theme Toggle Icon */}
      </nav>
      <button
        onClick={toggleTheme}
        className={`${linkBaseClasses} ${getLinkClasses(
          false
        )} flex items-center self-end`}
        aria-label={
          isLightMode ? "Switch to dark mode" : "Switch to light mode"
        }
      >
        {isLightMode ? <FaMoon size={18} /> : <FaSun size={18} />}
      </button>
    </div>
  );
}
