import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    // const signin = async () => {
    //     await client.signin(credentials);
    //     navigate("/project/account");
    // };
    const signin = async () => {
        try {
            await client.signin(credentials);
            navigate("/project/account");
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    return (
        <div className="w-50">
            <h1>Signin</h1>
            <input value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="username"
                className="form-control mb-2" />
            <input value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="password"
                className="form-control mb-2" />
            <button onClick={signin} className="btn btn-primary w-100"> Signin </button>
        </div>
    );
}
export default Signin;
