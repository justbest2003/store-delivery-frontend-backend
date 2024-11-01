import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Swal from "sweetalert2";
import homeIcon from "../assets/Home.png"; // Ensure this path is correct
import storeIcon from "../assets/Store.png"; // Ensure this path and the file extension are correct
import StoreService from "../services/store.service"; // Import StoreService
import { useAuthContext } from "../context/AuthContext";

const MapComponent = ({
  myLocation,
  setMylocation,
  selectedStore,
  setSelectedStore,
}) => {
  const center = [13.83860399048006, 100.02528022088828]; // SE NPRU
  const [stores, setStores] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await StoreService.getAllStore();
        if (response.status === 200) {
          setStores(response.data);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  const LocationMap = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMylocation({ lat, lng });
      },
    });
  };

  // Custom icon for the home marker
  const customHomeIcon = new L.Icon({
    iconUrl: homeIcon,
    iconSize: [32, 32],
  });

  // Custom icon for the store marker
  const customStoreIcon = new L.Icon({
    iconUrl: storeIcon,
    iconSize: [32, 32],
  });

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "คุณแน่ใจแล้วใช่มั้ย?",
      text: "คุณต้องการที่จะลบร้านค้านี้ใช่มั้ย? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ไม่, ยกเลิก!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await StoreService.deleteStore(id);
        if (response.status === 200) {
          Swal.fire({
            title: "Store Deleted",
            text: response.data.message,
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Store Deletion Failed",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="map-container flex justify-center items-center">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "75vh", width: "80vw" }}
        scrollWheelZoom={true}
        className="shadow-lg rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {myLocation.lat && myLocation.lng && (
          <Marker
            position={[myLocation.lat, myLocation.lng]}
            icon={customHomeIcon}
          >
            <Popup>My Current Position</Popup>
          </Marker>
        )}

        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.lat, store.lng]}
            icon={customStoreIcon}
            eventHandlers={{
              click: () => {
                setSelectedStore(store);
              },
            }}
          >
            <Popup>
              <b>{store.storeName}</b>
              <p>{store.address}</p>
              <a
                href={store.direction}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Direction
              </a>
              {user &&
                (user.roles.includes("ROLES_MODERATOR") ||
                  user.roles.includes("ROLES_ADMIN")) && (
                  <div className="card-actions flex justify-center items-center p-2">
                    {/* ปุ่มลบจะแสดงเมื่อ user เป็น ADMIN และ user.id ตรงกับ store.userId */}
                    {user.roles.includes("ROLES_ADMIN") &&
                      user.id === store.userId && (
                        <button
                          className="btn btn-sm btn-error"
                          type="button"
                          onClick={() => handleDelete(store.id)}
                        >
                          ลบ
                        </button>
                      )}
                    {/* ตรวจสอบว่า user.id ตรงกับ store.userId ก่อนแสดงปุ่มแก้ไข */}
                    {user.id === store.userId && (
                      <a
                        href={`/edit/${store.id}`}
                        className="btn btn-sm btn-warning !text-black"
                        type="button"
                      >
                        แก้ไข
                      </a>
                    )}
                  </div>
                )}
            </Popup>

            {selectedStore && selectedStore.id === store.id && (
              <Circle
                center={[store.lat, store.lng]}
                radius={selectedStore.deliveryRadius} // Fixed typo from 'raduis' to 'radius'
                pathOptions={{
                  color: "green",
                  fillColor: "green",
                  fillOpacity: 0.3,
                }}
              />
            )}
          </Marker>
        ))}

        <LocationMap />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
