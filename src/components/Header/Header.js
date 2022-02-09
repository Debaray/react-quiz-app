import React, { useState, useEffect } from "react";

const Header = () => {
  const [loggedUser, setLoggedUser] = useState({});
  useEffect(() => {
    if (Object.keys(loggedUser).length <= 0) {
      localStorage.getItem("userInfo") &&
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    }
    console.log("ssds");
  });
  const handleLogOut = (e) => {
    localStorage.removeItem("userInfo");
  };
  return (
    <div className="d-flex align-items-baseline justify-content-between">
      <h3 className="ms-2 p-3">React Quiz App</h3>
      {Object.keys(loggedUser).length ? (
        <form className="d-flex">
          <h3 className="p-3">{loggedUser.email}</h3>
          <button className="btn btn-danger m-auto me-4" onClick={handleLogOut}>
            Logout
          </button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
