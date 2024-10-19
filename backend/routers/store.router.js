const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");
const { authJwt } = require("../middlewares");

// POST : http://localhost:5000/api/v1/professors/
// Create a professor
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdminOrMod],
  storeController.create
);

// Get All professors
router.get("/", storeController.getAll);

// Get a professor by ID
router.get("/:id", [authJwt.verifyToken], storeController.getById);

// Update a professor by ID
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdminOrMod],
  storeController.update
);

// Delete a professor by ID
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  storeController.delete
);

module.exports = router;
