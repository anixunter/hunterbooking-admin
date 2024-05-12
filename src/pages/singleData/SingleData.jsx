import "./SingleData.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Details from "../../components/details/Details";
// import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";

const SingleData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let dataAbout = location.pathname.split("/")[1];
  const dataId = location.pathname.split("/")[2];
  const API_URL = import.meta.env.VITE_API_URL;

  const editPath = dataAbout;

  if (dataAbout === "hotels") dataAbout = "hotels/find";

  const { data } = useFetch(`${API_URL}/${dataAbout}/${dataId}`);

  let info;
  switch (dataAbout) {
    case "users":
      info = {
        heading: "User Information",
        username: data.username,
        email: data.email,
        phone: data.phone,
        city: data.city,
        country: data.country,
      };
      break;
    case "hotels/find":
      info = {
        heading: "Hotel Information",
        id: data._id,
        name: data.name,
        type: data.type,
        desc: data.desc,
        cheapestPrice: data.cheapestPrice,
        city: data.city,
        address: data.address,
        distance: data.distance,
        title: data.title,
        rating: data.rating,
        rooms: data.rooms,
        featured: data.featured,
      };
      break;
    case "rooms":
      info = {
        heading: "Room Information",
        title: data.title,
        desc: data.desc,
        maxPeople: data.maxPeople,
        price: data.price,
        roomNumbers: data.roomNumbers,
      };
      break;
    default:
      break;
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {editPath && editPath !== "users" && (
              <div
                className="editButton"
                onClick={() => {
                  navigate(`/${editPath}/edit`, {
                    state: { dataId, info },
                  });
                }}
              >
                Edit
              </div>
            )}
            <h1 className="title">{info.heading}</h1>
            <div className="item">
              {/* <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              /> */}
              <Details dataAbout={dataAbout} info={info} />
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default SingleData;
