// import "./App.css";
// import Signup from "./Signup";

// function App() {

//     return (
//       <div className = "App">
//         <Signup />
//       </div>
//     )
// }

// export default App;

import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
// import { useState } from "react";

function App() {
  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("")
  const [loginStatus, setLoginStatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Only 12 characters are needed")
        .required("Required First Name"),
      password: Yup.string()
        .max(8, "Only 8 characters are needed")
        .required("Required Last Name"),
      email: Yup.string().email("Wrong Email").required("Email Required"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      email: formik.values.email,
      username: formik.values.username,
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

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: formik.values.username,
      password: formik.values.password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].email);
      }
    });
  };

  return (
    //Login Form
    <div className="container">
      <div className="loginForm">
        <form onSubmit={formik.handleSubmit}>
          <h4>Login Here</h4>
          <label htmlFor="username">Username*</label>
          <input
            className="email"
            type="email"
            name="email"
            // onChange={(e) => { setUsername(e.target.value) } }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your Username"
          />
          {formik.touched.username && formik.errors.username ? (
            <p> {formik.errors.username} </p>
          ) : null}

          <label htmlFor="password">Password*</label>
          <input
            className="password"
            type="password"
            name="password"
            // onChange={(e) => { setPassword(e.target.value) }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your Password"
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <p> {formik.errors.password} </p>
          ) : null}

          <input
            className="button"
            type="submit"
            onClick={login}
            value="Login"
          />

          <h1
            style={{
              color: "red",
              fontSize: "15px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {loginStatus}
          </h1>
        </form>
      </div>
      <div className="loginForm">
        <form onSubmit={formik.handleSubmit}>
          <h4>Register Here</h4>

          <label htmlFor="email">Email Address*</label>
          <input
            className="email"
            type="email"
            name="email"
            // onChange={(e) => { setEmail(e.target.value) }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your Email Address"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <p> {formik.errors.email} </p>
          ) : null}

          <label htmlFor="username">Username*</label>
          <input
            className="username"
            type="username"
            name="username"
            // onChange={(e) => { setUsername(e.target.value) }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your Username"
            required
          />
          {formik.touched.username && formik.errors.username ? (
            <p> {formik.errors.username} </p>
          ) : null}

          <label htmlFor="password">Password*</label>
          <input
            className="password"
            type="password"
            name="password"
            // onChange={(e) => { setPassword(e.target.value) }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your Password"
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <p> {formik.errors.password} </p>
          ) : null}

          <input
            className="button"
            type="submit"
            onClick={register}
            value="Create an account"
          />

          <h1
            style={{ fontSize: "15px", textAlign: "center", marginTop: "20px" }}
          >
            {registerStatus}
          </h1>
        </form>
      </div>
    </div>
  );
}

export default App;
