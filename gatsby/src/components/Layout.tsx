import React from "react";

import { CookiesProvider } from "react-cookie";
import Navigation from "./Navigation";

export default function Layout({ children }) {
  return (
    <CookiesProvider>
      <main id="main">
        <Navigation />
        {children}
      </main>
    </CookiesProvider>
  );
}
