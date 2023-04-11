import { Fragment, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import { toastSuccess, toastError } from "../components/Toast";

export default function Register({ setAuth }) {

    // Create a state variable called inputs and a function called setInputs
    const [inputs, setInputs] = useState({
        user_email: "",
        username: "",
        password: ""
    });

    const [error, setError] = useState({});

    // Destructure the inputs object
    const { user_email, username, password } = inputs;

    // e is an event object
    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value }); // ...inputs is a spread operator that copies the current state of inputs 
        // [e.target.name] is a computed property name that will be the name of the input field 
        // e.target.value is the value of the input field
    };

    const onSubmitForm = async (e) => {
        e.preventDefault(); // Prevents the default behavior of the browser

        const error = validate(inputs);
        if (error) {
            setError(error);
        }

        if (Object.keys(error).length === 0) {
            try {
                const body = { user_email, username, password };
                const response = await axios.post("http://localhost:3000/api/auth/register", body);
                const parseRes = await response.data;

                if (parseRes.token) {
                    localStorage.setItem("token", parseRes.token);
                    setAuth(true);
                    toastSuccess('Registered successfully!');

                } else {
                    setAuth(false);
                }

            } catch (err) {
                console.error(err.message);
                if (err.response.status === 422) {
                    const error = err.response.data.errors;
                    const errorMessage = error.map((error) => error.msg).join(' & ');
                    toastError(errorMessage);
                }
                else {
                    toastError(error);
                }
            }
        }
    };

    return (
        <Fragment>

            <div className="container">
                <h1 className="text-center my-5">Register</h1>
                <p>Register a new account</p>

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
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                        {error.user_email && (
                            <p className="text-danger">
                                {errors.user_email}
                            </p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => onChange(e)}
                        />
                        {error.username && (
                            <p className="text-danger">
                                {error.username}
                            </p>
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
                            <p className="text-danger">
                                {error.password}
                            </p>
                        )}
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit">
                        Submit
                    </Button>
                    <ToastContainer />
                </Form>
            </div>
        </Fragment>
    );
}