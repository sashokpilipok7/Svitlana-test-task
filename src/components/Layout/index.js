import React from "react";
import { Link } from "react-router-dom";

function Layout({ children, isPending, navigate }) {
  return (
    <div className="margin-auto pb-4">
      <header
        className=" max-w-[50%] m-auto my-4"
        style={{
          opacity: isPending ? 0.7 : 1,
          width: "fit-content",
        }}
      >
        <ul className="flex gap-4 text-center">
          <li>
            <Link to="/">Головна</Link>
          </li>
          <li>
            <Link to="/changed">Змінені курси</Link>
          </li>
          <li>
            <Link to="/search">Пошук курсу</Link>
          </li>
        </ul>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
