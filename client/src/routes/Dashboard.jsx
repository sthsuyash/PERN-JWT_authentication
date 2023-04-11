import { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../components/Toast";

export default function Dashboard({ setAuth }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const getName = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/dashboard/", {
                headers: { token: localStorage.token }
            });
            const parseRes = response.data;
            setName(parseRes.username);

        } catch (err) {
            console.error(err.message);
            toastError("Error fetching username!");
        }
    };

    const getEmail = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/dashboard/", {
                headers: { token: localStorage.token }
            });

            const parseRes = response.data;
            setEmail(parseRes.user_email);

        } catch (err) {
            console.error(err.message);
            toastError("Error fetching email!");
        }
    };

    useEffect(() => {
        getName();
        getEmail();
    }, []);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toastSuccess("Logged out successfully!");
    };

    return (
        <Fragment>
            <div className="container">
                <h1 className="text-center my-5">Dashboard</h1>
                <h3>Welcome {name}</h3>
                <p>{email}</p>

                <Button
                    variant="danger"
                    type="submit"
                    onClick={(e) => logout(e)}
                >
                    Logout
                </Button>
                <ToastContainer />
            </div>

        </Fragment>
    );
}