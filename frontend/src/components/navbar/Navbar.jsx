import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./navigation";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { isAuth, logout } = useAuth();
  const menuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (open && menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    } else {
      setMenuHeight(0);
    }
  }, [open]);

  return (
    <header className="bg-white shadow-lg rounded-lg relative z-10 text-xl font-bold">
      <nav className="flex justify-between items-center h-16 px-6 md:px-10">
        <Link to="/" className="text-lg font-semibold hover:text-blue-500">
          Vet APP
        </Link>

        <ul className="hidden md:flex space-x-6">
          {isAuth ? (
            <>
              {privateRoutes.map(({ path, name }) => (
                <li
                  key={path}
                  className={`${
                    location.pathname === path
                      ? "text-white bg-blue-300 px-3 py-1 rounded-lg hover:bg-blue-500"
                      : "hover:text-blue-500"
                  }`}
                >
                  <Link to={path}>{name}</Link>
                </li>
              ))}
              <li
                onClick={logout}
                className="hover:text-blue-500 cursor-pointer"
              >
                Logout
              </li>
            </>
          ) : (
            publicRoutes.map(({ path, name }) => (
              <li
                key={path}
                className={`${
                  location.pathname === path
                    ? "text-white bg-blue-300 px-3 py-1 rounded-lg hover:bg-blue-500"
                    : "hover:text-blue-500"
                }`}
              >
                <Link to={path}>{name}</Link>
              </li>
            ))
          )}
        </ul>

        <button
          className="md:hidden flex flex-col space-y-1 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition ${
              open ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* Menú Mobile con transición suave */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-gray-100"
        style={{ height: `${menuHeight}px` }}
      >
        <ul ref={menuRef} className="flex flex-col items-center space-y-4 py-4">
          {isAuth ? (
            <>
              {privateRoutes.map(({ path, name }) => (
                <li key={path}>
                  <Link to={path} onClick={() => setOpen(false)}>
                    {name}
                  </Link>
                </li>
              ))}
              <li
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="hover:text-blue-500 cursor-pointer"
              >
                Logout
              </li>
            </>
          ) : (
            publicRoutes.map(({ path, name }) => (
              <li key={path}>
                <Link to={path} onClick={() => setOpen(false)}>
                  {name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
