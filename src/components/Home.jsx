import React, { useEffect, useState } from "react";
import Students from "./Students";
import { Button, Modal } from "react-bootstrap";
import { addUser, fetchUsers } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  // const [firstName, setFirtsname] = useState("");
  // const [lastName, setLastname] = useState("");
  // const [phone, setPhone] = useState(null);
  // const [group, setGroup] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    group: "",
  });
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/students", user)
      .then((res) => {
        dispatch(fetchUsers());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-5">
      <form className="form-control d-flex pb-5">
        <select className="form-select mt-4 h-50 w-25">
          <option value="All">All</option>
          <option value="Group">Group</option>
          <option value="Designer">Designer</option>
          <option value="Coordinator">Coordinator</option>
          <option value="Technician">Technician</option>
          <option value="Manager">Manager</option>
          <option value="Engineer">Engineer</option>
        </select>
        <input
          type="search"
          className="form-control mt-4 h-50 w-50 ms-1"
          placeholder="Search..."
        />
        <button
          type="button"
          className="btn btn-outline-primary mt-4 ms-5"
          onClick={handleShow}
        >
          Add Student
        </button>
      </form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-control" onSubmit={handleSubmit}>
            <div className="input1">
              <label htmlFor="firstName">Firstname</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                value={user.firstName}
              />
            </div>
            <div className="input2">
              <label htmlFor="lastName">Lastname</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                value={user.lastName}
              />
            </div>
            <div className="input3">
              <label htmlFor="phone">Number</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                onChange={handleChange}
                value={user.phone}
              />
            </div>
            <div className="input4">
              <label htmlFor="group">Group</label>
              <input
                type="text"
                className="form-control mb-4"
                id="group"
                name="group"
                onChange={handleChange}
                value={user.group}
              />
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                className="ms-3"
                onClick={handleClose}
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Students />
    </div>
  );
};

export default Home;
