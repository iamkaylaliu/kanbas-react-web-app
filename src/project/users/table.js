import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill }
    from "react-icons/bs";
import * as client from "./client";
import { Link } from "react-router-dom";

function UserTable() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: "", password: "", role: "USER" });
    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };
    const selectUser = async (user) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => { fetchUsers(); }, []);
    return (
        <div>
            <h1>User List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <td>
                            <input value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                placeholder="username"
                                className="form-control mb-2"
                            />
                            <input value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder="password"
                                className="form-control mb-2"
                            />
                        </td>
                        <td>
                            <input value={user.firstName}
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                placeholder="firstname"
                                className="form-control mb-2"
                            />
                        </td>
                        <td>
                            <input value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                placeholder="lastname"
                                className="form-control mb-2"
                            />
                        </td>
                        <td>
                            <select value={user.role}
                                onChange={(e) => setUser({ ...user, role: e.target.value })}
                                className="form-control mb-2">
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </select>
                        </td>
                        <td className="text-nowrap">
                            <BsPlusCircleFill
                                onClick={createUser}
                                className="text-primary fs-1 text" />
                            <BsFillCheckCircleFill
                                onClick={updateUser}
                                className="me-2 text-success fs-1 text" />
                        </td>

                    </tr>

                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <Link to={`/project/account/${user._id}`}>
                                    {user.username}
                                </Link>
                            </td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td className="text-nowrap">
                                <button className="btn btn-danger me-2">
                                    <BsTrash3Fill onClick={() => deleteUser(user)} />
                                </button>
                                <button className="btn btn-warning me-2">
                                    <BsPencil onClick={() => selectUser(user)} />
                                </button>
                            </td>
                        </tr>))}


                </tbody>
            </table>
        </div>
    );
}
export default UserTable;