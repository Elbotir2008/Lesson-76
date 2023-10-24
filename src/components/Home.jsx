import React, { useEffect, useState } from "react";
import Students from "./Students";
import { Button, Modal } from "react-bootstrap";
import { addUser, fetchUsers } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [firstName, setFirtsname] = useState("");
  const [lastName, setLastname] = useState("");
  const [phone, setPhone] = useState(null);
  const [group, setGroup] = useState("");
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addUser({
        id: users[users.length - 1].id + 1,
        firstName,
        lastName,
        phone,
        group,
      })
    );
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
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                onChange={(e) => setFirtsname(e.target.value)}
              />
            </div>
            <div className="input2">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="input3">
              <label htmlFor="number">Number</label>
              <input
                type="text"
                className="form-control"
                id="number"
                name="number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input4">
              <label htmlFor="group">Group</label>
              <input
                type="text"
                className="form-control"
                id="group"
                name="group"
                onChange={(e) => setGroup(e.target.value)}
              />
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose} type="submit">
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
