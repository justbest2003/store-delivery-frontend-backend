import { useState } from "react";
import MapComponent from "../components/MapComponent";
import Swal from "sweetalert2";

function Home() {
  const [myLocation, setMylocation] = useState({ lat: "", lng: "" });
  const [selectedStore, setSelectedStore] = useState(null);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3;
    const phi_1 = (lat1 * Math.PI) / 180;
    const phi_2 = (lat2 * Math.PI) / 180;
    const delta_phi = ((lat1 - lat2) * Math.PI) / 180;
    const delta_lambda = ((lng1 - lng2) * Math.PI) / 180;

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi_1) * Math.cos(phi_2) * Math.sin(delta_lambda / 2) * Math.sin(delta_lambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMylocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

      Swal.fire({
        title: "Location Found!",
        text: "Your location has been successfully retrieved.",
        icon: "success",
      });
    });
  };
  
  const handleLocationCheck = () => {
    if (!myLocation.lat || !myLocation.lng) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid Location",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!selectedStore) {
      Swal.fire({
        title: "Error!",
        text: "Please select a store to check delivery zone",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const distance = calculateDistance(myLocation.lat, myLocation.lng, selectedStore.lat, selectedStore.lng);

    if (distance <= selectedStore.deliveryRadius) {
      Swal.fire({
        title: "Success!",
        text: `You are within the delivery zone for ${selectedStore.storeName}.`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: `You are outside the delivery zone for ${selectedStore.storeName}.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
<div className="text-center">
  <div className="flex justify-center items-center space-x-4 p-4">
  <button className="btn bg-[#FABC3F] text-white" onClick={handleGetLocation}>Get My Location</button>
  <button className="btn bg-[#FABC3F] text-white" onClick={handleLocationCheck}>Check Delivery Availability</button>
  </div>
  <MapComponent
    myLocation={myLocation}
    setMylocation={setMylocation}
    selectedStore={selectedStore}
    setSelectedStore={setSelectedStore}
    calculateDistance={calculateDistance}
    handleLocationCheck={handleLocationCheck}
  />
</div>

  );
}

export default Home;
