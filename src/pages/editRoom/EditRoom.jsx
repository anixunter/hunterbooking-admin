import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./EditRoom.scss";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditRoom = () => {
  const [info, setInfo] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.state.dataId;
  const roomData = location.state.info;

  const API_URL = import.meta.env.VITE_API_URL;

  const roomInputs = [
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: roomData.title,
    },
    {
      id: "desc",
      label: "Description",
      type: "text",
      placeholder: roomData.desc,
    },
    {
      id: "price",
      label: "Price",
      type: "number",
      placeholder: roomData.price,
    },
    {
      id: "maxPeople",
      label: "Max People",
      type: "number",
      placeholder: roomData.maxPeople,
    },
  ];

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/rooms/${roomId}`, info, {
        withCredentials: true,
      });
      navigate("/rooms");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="edit">
      <Sidebar />
      <div className="editContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Room (Manage Hotels rooms from Database Manually)</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
