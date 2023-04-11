import React, { Fragment, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { toastSuccess, toastError } from "../components/Toast";
import validate from "../Validation/loginValidation";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login({ setAuth }) {

    const [inputs, setInputs] = useState({
        user_email: "",
        password: ""
    });

    const [error, setError] = useState({});

    const { user_email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };



    const onSubmitForm = async (e) => {
        e.preventDefault();

        const error = validate(inputs);

        if (error) {
            setError(error);
        }

        if (Object.keys(error).length === 0) {
            try {
                const body = { user_email, password };
                const response = await axios.post("https://pern-jwt-authentication-api.vercel.app/api/auth/login", body);
                const parseRes = response.data;
                // console.log(parseRes);
                if (parseRes.token) {
                    localStorage.setItem("token", parseRes.token); // localStorage is a browser API that stores data with no expiration 
                    setAuth(true);
                    toastSuccess('Logged in successfully!');
                } else {
                    setAuth(false);
                }

            } catch (err) {
                console.error(err.message);
                if (err.response.status === 422) {
                    toastError('Invalid credentials!');
                }
            }
        }
        else {
            toastError('Fill all the fields!');
        }
    };

    return (
        <Fragment>
            <div className="container">
                <h1 className="text-center my-5">Login</h1>
                <p>Login to your account</p>

                <Form onSubmit={onSubmitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="user_email"
                            placeholder="abc@domain.com"
                            value={user_email}
                            onChange={(e) => onChange(e)}
                        />
                        {error.user_email && (
                            <p className="text-danger">{error.user_email}</p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => onChange(e)}
                        />
                        {error.password && (
                            <p className="text-danger">{error.password}</p>
                        )}
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                    <ToastContainer />
                </Form>
            </div>
        </Fragment>
    );
}
