import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Wrong Email").required("Email Required"),
      password: Yup.string()
        .min(8, "Only 8 characters are needed")
        .required("Required Password"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const isLoggedIn = false;
    if (isLoggedIn) {
      navigate("/Dashboard");
    }
  }, [navigate]);

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      email: formik.values.email,
      password: formik.values.password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        navigate("/Dashboard");
      }
    });
  };

  console.log(formik.touched);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="box-login">
        <h1> Login Form </h1>

        <div className="input-box-login">
          <div className="input-email">
            <label htmlFor="email">Email</label>
            <input
              className="email"
              name="email"
              type="email"
              placeholder="Input Email Address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="error"> {formik.errors.email} </p>
            ) : (
              <p className="error">ㅤ</p>
            )}
          </div>
          <div className="input-password">
            <label htmlFor="password">Password</label>
            <input
              className="password"
              name="password"
              type="password"
              placeholder="Input Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error"> {formik.errors.password} </p>
            ) : (
              <p className="error">ㅤ</p>
            )}
          </div>
          <button className="loginbtn" type="submit" onClick={login}>
            Login
          </button>{" "}
          {loginStatus}
          <div className="goto-register">
            <p>
              {" "}
              No Account Yet! <Link to="/Signup">Register Here</Link>
            </p>
          </div>
        </div>

        <div className="home-button">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go to the home page
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
