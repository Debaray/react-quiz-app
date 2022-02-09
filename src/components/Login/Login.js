import React, { useState, useEffect, useContext } from "react";
import questions from "../../questions/questions";
import { useLocation, useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [userInfo, setUserInfo] = useState({
    email: "",
    isAdmin: 0,
  });
  const [password, setPassword] = useState("");
  const initialErrors = {
    email: false,
    password: false,
  };

  const [errors, setErrors] = useState(initialErrors);
  const validEmailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  useEffect(() => {
    if (!localStorage.getItem("questions")) {
      localStorage.setItem("questions", JSON.stringify(questions));
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
      setErrors({ ...errors, [e.target.name]: e.target.value.length < 8 });
    } else {
      let existUserInfo = { ...userInfo };
      existUserInfo[e.target.name] = e.target.value;
      setUserInfo(existUserInfo);
      setErrors({ ...errors, [e.target.name]:  e.target.value > 0 });
    }
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validEmailRegex.test(userInfo.email.trim())) {
      setErrors({ ...errors, email: true });
      return;
    }

    if (password.trim().length < 8) {
      setErrors({ ...errors, password: true });
      return;
    }

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    if (parseInt(userInfo.isAdmin) === 0) {
      history.replace(from);
    } else {
      history.replace("/admin/manage_questions");
      location.reload();
    }
    window.location.reload(false);

    console.log("handle Submit");
  };
  console.log(errors);
  return (
    <div className="login">
      <h3>Sign In</h3>
      <form>
        <div>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleChange}
          />
          {errors.email ? (
            <span className="error">
              <small>Invalid Email Address</small>
            </span>
          ) : (
            <></>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
          />
          {errors.password ? (
            <span className="error">
              <small>Password should be 8 characters long without space.</small>
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="mb-2">
          <div>
            <input
              type="radio"
              className="me-1"
              id="user"
              name="isAdmin"
              value={0}
              defaultChecked={true}
              onChange={handleChange}
            />
            <label htmlFor="user">I am General User</label>
          </div>
          <div>
            <input
              type="radio"
              className="me-1"
              id="admin"
              name="isAdmin"
              value={1}
              onChange={handleChange}
            />
            <label htmlFor="admin">I am Admin</label>
          </div>
        </div>
        <button className="btn btn-primary btn-block" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
