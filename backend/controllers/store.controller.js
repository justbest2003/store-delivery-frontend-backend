const { where } = require("sequelize");
const Store = require("../models/store.model");

// Create and Save a new Store
exports.create = async (req, res) => {
  const { storeName, address, lat, lng, deliveryRadius, direction, userId } = req.body;

  // Validate Data
  if (!storeName || !lat || !lng || !deliveryRadius || !direction) {
    return res.status(400).send({
      message: "Store Name, Latitude, Longitude, Delivery Radius, Direction and User ID cannot be empty!",
    });
  }

  try {
    const existingStore = await Store.findOne({ where: { storeName: storeName } });
    if (existingStore) {
      return res.status(400).send({
        message: "Store with this name already exists!",
      });
    }

    // Create a Store
    const newStore = {
      storeName: storeName,
      address: address,
      lat: lat, // เปลี่ยน lat เป็น latitude
      lng: lng, // เปลี่ยน long เป็น longitude
      deliveryRadius: deliveryRadius,
      direction: direction,
      userId: userId,
    };

    const store = await Store.create(newStore);
    res.send(store);
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while creating the store.",
    });
  }
};

// Get all Stores
exports.getAll = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.send(stores);
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while retrieving stores.",
    });
  }
};

// Get Store by ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).send({
        message: "Store not found with id " + id,
      });
    }
    res.send(store);
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while retrieving the store.",
    });
  }
};

// Update a Store
exports.update = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body; // สมมติว่าคุณส่ง userId มาจาก body

  try {
    // ค้นหาร้านค้าที่ต้องการอัปเดต
    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).send({
        message: "Store not found with id " + id,
      });
    }

    // ตรวจสอบว่า userId ของผู้ใช้ตรงกับ userId ของร้านค้าที่ต้องการอัปเดตหรือไม่
    if (store.userId !== userId) {
      return res.status(403).send({
        message: "You do not have permission to update this store.",
      });
    }

    // ทำการอัปเดตร้านค้า
    const [updated] = await Store.update(req.body, {
      where: { id: id },
    });
    
    if (updated) {
      res.send({
        message: "Store was updated successfully.",
      });
    } else {
      res.send({
        message:
          "Cannot update Store with id=" + id + ". Maybe Store was not found or req.body is empty!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while updating the store.",
    });
  }
};


// Delete a Store
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Store.destroy({ where: { id: id } });
    if (deleted) {
      res.send({
        message: "Store was deleted successfully.",
      });
    } else {
      res.send({
        message: "Cannot delete Store with id=" + id + ".",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while deleting the store.",
    });
  }
};
