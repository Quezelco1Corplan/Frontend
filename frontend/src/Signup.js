import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./App.css";
import Axios from "axios";

export default function Signup() {
  const [registerStatus, setRegisterStatus] = useState("");

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      contact: "",
    },

    validationSchema: Yup.object({
      firstname: Yup.string()
        .max(15, "Only 15 characters are needed")
        .required("Required First Name"),
      lastname: Yup.string()
        .max(15, "Only 15 characters are needed")
        .required("Required Last Name"),
      email: Yup.string().email("Wrong Email").required("Email Required"),
      password: Yup.string()
        .max(8, "Only 8 characters are needed")
        .required("Required Password"),
      contact: Yup.number()
        .min(11, "Invalid Number")
        .required("Required number"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      firstname: formik.values.firstname,
      lastname: formik.values.lastname,
      contact: formik.values.contact,
      email: formik.values.email,
      password: formik.values.password,
    }).then((response) => {
      //   // setRegisterStatus(response);
      //   // console.log(response);
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
      }
    });
  };

  console.log(formik.touched);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container">
        <div className="container1">
          <label htmlFor="firstname">First Name</label>
          <input
            className="firstname"
            name="firstname"
            type="text"
            placeholder="First Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstname}
            required
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <p> {formik.errors.firstname} </p>
          ) : null}
          <label htmlFor="lastname">Last Name</label>
          <input
            className="lastname"
            name="lastname"
            type="text"
            placeholder="Last Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastname}
            required
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <p> {formik.errors.lastname} </p>
          ) : null}
          <label htmlFor="contact">Contact Number</label>
          <input
            className="contact"
            name="contact"
            type="number"
            placeholder="Contact"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contact}
            required
          />
          {formik.touched.contact && formik.errors.contact ? (
            <p> {formik.errors.contact} </p>
          ) : null}
          <label htmlFor="email">Email</label>
          <input
            className="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <p> {formik.errors.email} </p>
          ) : null}
          <label htmlFor="password">Password</label>
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
          <button className="registerbtn" type="submit" onClick={register}>
            Register
          </button>{" "}
          {registerStatus}
        </div>
      </div>
    </form>
  );
}
