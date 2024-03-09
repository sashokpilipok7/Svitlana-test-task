import React from "react";
import Link from "react-dom";

import styles from "./styles.scss";

function Layout({ children, isPending, navigate }) {
  return (
    <div className={styles.wrapper}>
      <header
        className="m-w-[50%]"
        style={{
          opacity: isPending ? 0.7 : 1,
        }}
      >
        <ul>
          <li>
            <a onClick={() => navigate("/")}>Головна</a>
          </li>
          <li>
            <a onClick={() => navigate("/сhanged-currencies")}>Змінені курси</a>
          </li>
          <li>
            <a onClick={() => navigate("/search")}>Пошук курсу</a>
          </li>
        </ul>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
