import { Field, Form, Formik } from "formik";
import { Link , Navigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT_URL } from "../../../constant/services";
import {  useState } from "react";

export default function Login(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const formSubmit = (formValues) => {
        console.log(formValues);
        
        axios.post(`${API_ENDPOINT_URL}/user/login`, formValues )
        .then(function (response) {

            if(response?.status === 200){
                let finalResponse = response?.data;
                const { data : { token } } = finalResponse;
                localStorage.setItem("token",token);
                setIsAuthenticated(true);
            }
        })
          .catch(function (error) {
            console.log(error);
        });
        

    }
    

    return  isAuthenticated === true ? (<Navigate to="/" replace={true} />)  : (<>
                <Formik
                initialValues={{
                    username : "",
                    password : ""
                }}

                onSubmit={formSubmit}
            >
                {({ errors, touched, validateField, validateForm }) => (

                    <Form >
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
                        Password:- <Field name="password" type="password" placeholder="Enter the password"/>

                        <br/>
                        <button type="submit"  className="rounded-2 shadow-md bg-slate-700 p-3">Submit</button>
                    </Form>
                )}
            </Formik>
                <Link to="/u/signup">Click here to signup</Link>
            </>
        );   
        
}