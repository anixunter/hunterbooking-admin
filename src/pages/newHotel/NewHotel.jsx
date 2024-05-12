import "./NewHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const { data, loading, error } = useFetch(`${API_URL}/rooms`);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setImageUploadLoading(true);
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "hotelbooking");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/db5lefza7/image/upload",
              data
            );
            const { url } = uploadRes.data;
            return url;
          } catch (uploadErr) {
            // Handle individual image upload error
            console.log("Image upload failed:", uploadErr);
            return null; // Return null for failed uploads
          }
        })
      );

      // Filter out any null values (failed uploads)
      const successfulUploads = list.filter((url) => url !== null);

      if (successfulUploads.length > 0) {
        // Proceed with posting hotel data only if at least one image upload was successful
        const newhotel = { ...info, rooms, photos: successfulUploads };
        await axios.post(`${API_URL}/hotels`, newhotel, {
          withCredentials: true,
        });
        setImageUploadLoading(false);
        navigate("/hotels");
      } else {
        // Handle case where all image uploads failed
        console.log("All image uploads failed");
        setImageUploadLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Upload Images:{" "}
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    required
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>
                  Add Room<span>Ctrl Click to Select Multiple</span>
                </label>
                <select
                  id="rooms"
                  multiple
                  onChange={handleSelect}
                  value={rooms}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button
                disabled={
                  info.rating < 0 || info.rating > 5 || imageUploadLoading
                }
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
