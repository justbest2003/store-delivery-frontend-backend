const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const storeRouter = require("./routers/store.router");
const authRouter = require("./routers/auth.router");
const db = require("./models/"); // index
const role = db.Role;

const frontend_url = process.env.FRONTEND_URL;
const cors = require("cors");
const corsOptions = {
  origin: frontend_url,
};

// Dev Mode
// db.sequelize.sync({ force: true }).then(() => {
//   initRole();
//   console.log("Drop and Sync Database");
// });

const initRole = () => {
  role.create({ id: 1, name: "user" });
  role.create({ id: 2, name: "moderator" });
  role.create({ id: 3, name: "admin" });
};

// Use Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Router
app.use("/api/v1/stores", storeRouter); // เปลี่ยนเส้นทาง
app.use("/api/v1/auth/", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello Store API</h1>"); // เปลี่ยนข้อความ
});

app.listen(PORT, () => {
  console.log("Listening on http://localhost:" + PORT);
});

// URL Paths:
// http://localhost:5000/api/v1/auth/signin
// http://localhost:5000/api/v1/auth/signup
// http://localhost:5000/api/v1/professors
