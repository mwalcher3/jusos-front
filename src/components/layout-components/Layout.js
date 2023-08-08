"use client";

import Header from "./Header";
import Footer from "./Footer";
import SideButtons from "./SideButtons";
import { useEffect } from "react";

const Layout = ({ children, menuData, dark }) => {
  // we are adding a body color class on the client, because we can't do so when
  // body is mounted in the root layout (the color is not known at this point).
  // this still avoid most color flickers because the background color of main is
  // generated server side.

  useEffect(() => {
    if (dark == true) {
      document.body.classList.add("dark");
    }
    return () => document.body.classList.remove("dark");
  }, [dark]);

  return (
    <>
      <Header menuData={menuData} />
      <SideButtons />
      <div className="maincontent">{children}</div>
      <Footer menuData={menuData} />
    </>
  );
};

export default Layout;
