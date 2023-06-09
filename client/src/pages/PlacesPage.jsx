import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import UserContext from "../UserContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

function PlacesPage() {
  const { user } = useContext(UserContext);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get(`/api/v1/vehicles/user/${user._id}`).then(({ data }) => {
      setVehicles(data.data.vehicles);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new vehicle
        </Link>
      </div>
      <div className="mt-4">
        {vehicles.length > 0 &&
          vehicles.map((vehicle, index) => (
            <Link
              to={"/account/places/" + vehicle._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
              key={index}
            >
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                {vehicle.images.length > 0 && (
                  <img
                    className="object-cover"
                    src={"http://localhost:3000/uploads/" + vehicle.images[0]}
                    alt=""
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{vehicle.name}</h2>
                <p className="text-sm mt-2">{vehicle.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default PlacesPage;
