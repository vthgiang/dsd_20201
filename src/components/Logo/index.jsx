import React from "react";
import StyleLogo from "./index.style";

const Logo = ({collapsed = false}) => {
  return (
    <StyleLogo>
      <i className="fa fa-drone-alt" />
      {!collapsed && <span className="title">DSD-20201</span>}
    </StyleLogo>
  );
};

export default Logo;
