import React, { Fragment, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login({ setAuth }) {
    const [inputs, setInputs] = useState({
        user_email: "",
        password: ""
    });

    const { user_email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = { user_email, password };
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            // console.log(parseRes);
            localStorage.setItem("token", parseRes.token);
            setAuth(true);

        } catch (err) {
            console.error(err.message);
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
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Fragment>
    );
}
