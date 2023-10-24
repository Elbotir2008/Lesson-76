import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../features/user/userSlice";

const Students = (props) => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.user);
  // console.log(users);
  let sliceUsers = users.slice(-5, users.length);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const handledelete = (code) => {
    if (window.confirm("Do you want to remove?")) {
      props.removeuser(code);
      props.loaduser();
    }
  };
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Phone</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sliceUsers.map((user, index) => (
            <tr key={user.id}>
              <th>{index + 1}</th>
              <th>{user.firstName}</th>
              <th>{user.lastName}</th>
              <th>{user.phone}</th>
              <th>{user.group}</th>
              <th>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handledelete(user.id);
                  }}
                >
                  Delete
                </button>
              </th>
              <th>
                <Link to="/edit">
                  <button className="btn btn-success">Edit</button>
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {loading ? <h1>Loading...</h1> : null}
      {error ? <h1>Error: {error}</h1> : null}
    </div>
  );
};

export default Students;
