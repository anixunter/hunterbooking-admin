import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./EditHotel.scss";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditHotel = () => {
  const [info, setInfo] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const hotelId = location.state.dataId;
  const hotelData = location.state.info;

  const API_URL = import.meta.env.VITE_API_URL;

  const hotelInputs = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: hotelData.name,
    },
    {
      id: "type",
      label: "Type",
      type: "text",
      placeholder: hotelData.type,
    },
    {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: hotelData.title,
    },
    {
      id: "desc",
      label: "Description",
      type: "text",
      placeholder: hotelData.desc,
    },
    {
      id: "address",
      label: "Address",
      type: "text",
      placeholder: hotelData.address,
    },
    {
      id: "city",
      label: "City",
      type: "text",
      placeholder: hotelData.city,
    },
    {
      id: "distance",
      label: "Distance from City Center",
      type: "text",
      placeholder: hotelData.distance,
    },
    {
      id: "cheapestPrice",
      label: "Cheapest Price",
      type: "text",
      placeholder: hotelData.cheapestPrice,
    },
    {
      id: "rating",
      label: "Rating",
      type: "number",
      placeholder: hotelData.rating,
    },
  ];

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/hotels/${hotelId}`, info, {
        withCredentials: true,
      });
      navigate("/hotels");
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
          <h1>Edit Hotel (Manage Rooms | images from Database Manually)</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              {hotelInputs.map((input) => (
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
              <div className="formInput">
                <label>Featured</label>
                <select
                  id="featured"
                  value={hotelData.featured}
                  onChange={handleChange}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <button
                disabled={info.rating < 0 || info.rating > 5}
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
