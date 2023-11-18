const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user_routes");
const teamRoutes = require("./routes/team_routes");
const { ConnectDB } = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

ConnectDB();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
