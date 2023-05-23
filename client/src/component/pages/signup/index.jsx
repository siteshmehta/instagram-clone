import { Field, Form, Formik } from "formik";
import axios from "axios";
import { API_ENDPOINT_URL } from '../../../constant/services';
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Signup(){
    
    const [isRegistered , setIsRegistered] = useState(false);




    const formSubmit = (formValues) => {
        console.log(formValues);
        
        axios.post(`${API_ENDPOINT_URL}/user/register`, formValues )
        .then(function (response) {
            if(response?.status === 201 ){
                setIsRegistered(true);
            }
        })
          .catch(function (error) {
            console.log(error);
        });
        

    }


    return  isRegistered === true ? (<Navigate to="/u/login" replace={true} />) : (
        <>
            <Formik
                initialValues={{
                    name:"",
                    username : "",
                    password : "",
                    email : "",
                    phone : ""
                }}
                onSubmit={formSubmit}
            >
                {({ errors, touched, validateField, validateForm }) => (
                    
                    <Form >
                        Name <Field name="name" type="text" /> <br/>
                        Username:- <Field name="username" type="text" placeholder="Enter the username here"

                        validate={(username)=>{
                            const usernameRegex = /^[a-z0-9]+$/;
                            if( (usernameRegex.test(username)===false)){
                                return "Only small letter and number is allowed with length between 6 to 20.";
                            }
                        }}

                        /> 
                        {errors.username && touched.username && <div>{errors.username}</div>}
                        <br/>
                        Email :- <Field name="email" type="email" /> <br/>
                        Phone :- <Field name="phone" type="tel" /> <br/>
                        Password:- <Field name="password" type="password" placeholder="Enter the password"/>
                        
                        <br/>
                        <button type="submit" onClick={ () => validateField('username')} className="rounded-2 shadow-md bg-slate-700 p-3">Submit</button>
                    </Form>

                )}
            </Formik>
        </>
    )
}