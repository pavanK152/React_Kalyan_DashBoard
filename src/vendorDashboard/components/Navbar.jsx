import React from "react";

const Navbar = ({
  showLoginHandler,
  showRegisterHandler,
  showLogOut,
  logOutHandler,
}) => {
  const firmName = localStorage.getItem("firmName");
  return (
    <div className="navSection">
      <div className="company">Vendor Dashboard</div>
      <div className="firmName">
        <h4>FirmName: {firmName}</h4>
      </div>
      <div className="userAuth">
        {!showLogOut ? (
          <>
            <span onClick={showLoginHandler}> Login /</span>
            <span onClick={showRegisterHandler}>Register</span>
          </>
        ) : (
          <span onClick={logOutHandler}>LogOut</span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
