import "./Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const { data, loading, error } = useFetch(`${API_URL}/${path}`);
  const { data: hotels } = useFetch(`${API_URL}/hotels`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDeleteRoom = async (roomId) => {
    const hotelIds = hotels
      .filter((hotel) => hotel.rooms.includes(roomId))
      .map((hotel) => hotel._id);

    try {
      await axios.put(
        `${API_URL}/${path}/delete/${roomId}`,
        { hotelIds },
        {
          withCredentials: true,
        }
      );
      setList(list.filter((item) => item._id !== roomId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (path === "rooms") {
      handleDeleteRoom(id);
    } else {
      try {
        await axios.delete(`${API_URL}/${path}/${id}`, {
          withCredentials: true,
        });
        setList(list.filter((item) => item._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/${path}/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path.toUpperCase()}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        getRowId={(row) => row._id}
        rows={list}
        columns={columns.concat(actionColumn)}
        autoHeight
        autosizeOnMount
        hideFooter
      />
    </div>
  );
};

export default Datatable;
