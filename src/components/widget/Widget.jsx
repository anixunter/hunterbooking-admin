import "./Widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import HotelIcon from "@mui/icons-material/Hotel";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Widget = ({ type }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  let data;

  //temporary
  const diff = 20;

  switch (type) {
    case "user":
      const { data: users } = useFetch(`${API_URL}/users`);
      data = {
        title: "USERS",
        count: users.length,
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "booking":
      data = {
        title: "BOOKINGS",
        count: 75,
        isMoney: false,
        link: "View all bookings",
        icon: (
          <HotelIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        count: 115,
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        count: 225,
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  const navigate = useNavigate();
  const handleClick = () => {
    if (data.title === "USERS") {
      navigate("/users");
    } else {
      return;
    }
  };
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.count}
        </span>
        <span className="link" onClick={handleClick}>
          {data.link}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
