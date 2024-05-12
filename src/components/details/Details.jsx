import "./Details.scss";
import useFetch from "../../hooks/useFetch";

const UserDetails = ({ info }) => {
  return (
    <div className="details">
      <h1 className="itemTitle">{info.username}</h1>
      <div className="detailItem">
        <span className="itemKey">Email:</span>
        <span className="itemValue email">{info.email}</span>
      </div>
      <div className="detailItem">
        <span className="itemKey">Phone:</span>
        <span className="itemValue">{info.phone}</span>
      </div>
      <div className="detailItem">
        <span className="itemKey">City:</span>
        <span className="itemValue">{info.city}</span>
      </div>
      <div className="detailItem">
        <span className="itemKey">Country:</span>
        <span className="itemValue">{info.country}</span>
      </div>
    </div>
  );
};

const HotelDetails = ({ info }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { data } = useFetch(`${API_URL}/hotels/room/${info.id}`);
  const roomTitles = data.map((value) => value.title);
  return (
    <div className="details">
      <h1 className="itemTitle">{info.name}</h1>
      <div className="detailItem">
        <span className="itemKey">Description:</span>
        <span className="itemValue">{info.desc}</span>
      </div>
      <div className="detailItem">
        <span className="itemKey">Type:</span>
        <span className="itemValue">{info.type}</span>
      </div>
      <div className="detailItem">
        <span className="itemKey">City:</span>
        <span className="itemValue">{info.city}</span>
      </div>
      <div className="detailItem">
        <span className="itemKey">Rating:</span>
        <span className="itemValue">{info.rating}</span>
      </div>
      <div className="detailItem">
        <span className="itemKey">Rooms:</span>
        <span className="itemValue">
          {roomTitles.map((room, i) => (
            <span key={i}>{room}</span>
          ))}
        </span>
      </div>
    </div>
  );
};

const RoomDetails = ({ info }) => {
  const roomNumbers = info.roomNumbers?.map((room) => room.number);
  return (
    <div className="details">
      <h1 className="itemTitle">{info.title}</h1>
      <div className="detailItem">
        <span className="itemKey">Description:</span>
        <span className="itemValue">{info.desc}</span>
      </div>
      <div className="detailItem">
        <span className="itemKey">Price:</span>
        <span className="itemValue">{info.price}</span>
      </div>
      <div className="detailItem">
        <span className="itemKey">Max People:</span>
        <span className="itemValue">{info.maxPeople}</span>
      </div>
      <div className="detailItem">
        <span className="itemKey">Room Numbers:</span>
        <span className="itemValue">
          {roomNumbers?.map((num) => (
            <span key={num}>{num}</span>
          ))}
        </span>
      </div>
    </div>
  );
};

const Details = ({ dataAbout, info }) => {
  return (
    <>
      {dataAbout === "users" ? (
        <UserDetails info={info} />
      ) : dataAbout === "rooms" ? (
        <RoomDetails info={info} />
      ) : (
        info.id && <HotelDetails info={info} />
      )}
    </>
  );
};

export default Details;
