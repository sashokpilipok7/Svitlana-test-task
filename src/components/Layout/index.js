import React from "react";
import { Link } from "react-router-dom";

function Layout({ children, isPending, navigate, className }) {
  return (
    <div className="margin-auto pb-4">
      <header
        className="flex items-center my-4 bg-gray-100 p-4 rounded-sm shadow-xs"
        style={{
          opacity: isPending ? 0.7 : 1,
        }}
      >
        <ul className="m-auto flex gap-4 text-center   font-bold">
          <li>
            <Link className="text-blue-500 hover:text-blue-600" to="/">
              Головна
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 hover:text-blue-600" to="/changed">
              Змінені курси
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 hover:text-blue-600" to="/search">
              Пошук курсу
            </Link>
          </li>
        </ul>
      </header>
      <main className={className}>{children}</main>
    </div>
  );
}

export default Layout;
