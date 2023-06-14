import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui four item menu">
      <Link className="active item" to="/">
        Rankingi województw
      </Link>
      <Link className="item" to="/about">
        O stronie
      </Link>
    </div>
  );
};

export default Header;
