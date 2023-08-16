import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Signup() {

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
        },

        validationSchema: Yup.object({
            firstname: Yup.string()
                .max(15, "Only 15 characters are needed").required("Required First Name") ,
            lastname: Yup.string()
                .max(15, "Only 15 characters are needed").required("Required Last Name"),
            email: Yup.string()
                .email("Wrong Email").required("Email Required")
        }),

        onSubmit: (values) => {
            console.log(values);
        }
    });
    
    console.log(formik.touched);
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='input-container'> 
                <input 
                    className="firstname"
                    name="firstname"
                    type="text"
                    placeholder="First Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                />
                {formik.touched.firstname && formik.errors.firstname ? <p> {formik.errors.firstname} </p> : null }
            </div>
            <div className='input-container'> 
                <input 
                    className="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                />
                {formik.touched.lastname && formik.errors.lastname ? <p> {formik.errors.lastname} </p> : null }
            </div>
            <div className='input-container'> 
                <input 
                    className="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <p> {formik.errors.email} </p> : null }
            </div>

            <button type='submit'>Submit</button>
        </form>
    )
}