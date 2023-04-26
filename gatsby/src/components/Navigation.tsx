import React from "react";
import { Link } from "gatsby";

export default function Navigation({}) {
  return (
    <nav className="mx-auto my-9 flex max-w-7xl justify-between">
      <Link className="text-xl font-bold" to="/">
        Money &amp; Money Capital
      </Link>
      <ul id="nav-items">
        <li>
          <Link to="/blog/">Blog</Link>
        </li>
      </ul>
    </nav>
  );
}
