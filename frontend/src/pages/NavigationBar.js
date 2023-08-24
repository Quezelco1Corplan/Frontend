import React, { useState } from "react";
import "../css/Sidebar.css";
import { AiOutlineUser, AiOutlineDown } from "react-icons/ai";

const NavigationBar = () => {
  const [dropdownActive, setDropdownActive] = useState({}); // To manage active state of dropdowns

  const toggleDropdown = (index) => {
    setDropdownActive((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="Navigation">
      <div className="sidebar">
        <div className="Logo">
          <h1>Quecelco 1</h1>
        </div>

        <button
          className={`dropdown-btn ${dropdownActive["main"] ? "active" : ""}`}
          onClick={() => toggleDropdown("main")}
        >
          <div className="profile">
            <span className="menu">Management</span>
            <span className="icon">
              <AiOutlineDown />
            </span>
          </div>
        </button>
        <div
          className={`dropdown-container ${
            dropdownActive["main"] ? "active" : ""
          }`}
        >
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div>

      <div className="Topbar">
        <buttom>
          <AiOutlineUser />
          <AiOutlineDown />
        </buttom>
      </div>
    </div>
  );
};

export default NavigationBar;
