import Header from "./Header";
import Footer from "./Footer";
import SideButtons from "./SideButtons";
import React from "react";

const Layout = ({ children, menuData }) => {
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
