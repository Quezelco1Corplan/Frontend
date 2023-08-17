import { useFormik } from "formik";
import * as Yup from "yup";
import "./App.css";
import Axios from "axios";
import React, { useState } from "react";

export default function Signup() {
  const [loginStatus, setLoginStatus] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .max(15, "Only 15 characters are needed")
        .required("Required Email"),
      password: Yup.string()
        .max(8, "Only 8 characters are needed")
        .required("Required Password"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      email: formik.values.email,
      password: formik.values.password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].email);
      }
    });
  };

  console.log(formik.touched);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container">
        <div className="container1">
          <label for="email">Email</label>
          <input
            className="email"
            name="email"
            type="text"
            placeholder="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <p> {formik.errors.email} </p>
          ) : null}
          <label for="password">Password</label>
          <input
            className="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <p> {formik.errors.password} </p>
          ) : null}
          <button className="registerbtn" type="submit" onClick={login}>
            Login
          </button>{" "}
          {loginStatus}
        </div>
      </div>
    </form>
  );
}
