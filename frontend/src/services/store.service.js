import api from "./api";

const STORE_API = import.meta.env.VITE_STORE_API;

//get all Store
const getAllStore = async () => {
  return await api.get(STORE_API);
};

//get Store by ID
const getStoreById = async (id) => {
  return await api.get(STORE_API +  `/${id}`);
};

//update Store
const editStore = async (id, store) => {
  return await api.put(STORE_API + `/${id}`, store);
};

//add Store
const insertStore = async (store) => {
  return await api.post(STORE_API, store);
};


//delete Store
const deleteStore = async (id) => {
  return await api.delete(STORE_API + `/${id}`);
};



const StoreService = {
  getAllStore,
  getStoreById,
  editStore,
  insertStore,
  deleteStore,
};

export default StoreService;
