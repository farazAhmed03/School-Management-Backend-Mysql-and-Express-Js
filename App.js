
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const limiter = require('./utils/rateLimiter');
const sequelize = require("./config/db");
require("dotenv").config();
const app = express();

// Imports 
const PORT = process.env.PORT || 8000;
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentsRoutes");
const classSectionRoutes = require("./routes/classSectionRoutes");
const operatorRoutes = require("./routes/operatorRoutes");
const marksRoutes = require("./routes/marksRoutes");
const staffRoutes = require("./routes/staffRoutes");
const feeRoutes = require("./routes/feeRoutes");
const expenseRoutes = require("./routes/expenseRoute");
const dashboardRoutes = require("./routes/dashboardRoute");


// ==================== Middleware ====================
app.use(helmet());
app.use(morgan("combined"));
app.use(cors({ origin: "*", credentials: true }));
app.use("/api/v1", limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads/profiles", express.static("uploads/profiles"));



// ==================== Routes ====================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/class-section", classSectionRoutes);
app.use("/api/v1/operators", operatorRoutes);
app.use("/api/v1/marks", marksRoutes);
app.use("/api/v1/staff", staffRoutes);
app.use("/api/v1/fee", feeRoutes);
app.use("/api/v1/expenses", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


// Test Route
app.get("/", (req, res) => {
    res.json({ message: "School Management API is LIVE!" });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        msg: "Route not found",
        path: req.originalUrl
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: "Server Error" });
});


// Server
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    try {
        await sequelize.authenticate();
        console.log("Database connected!");
        await sequelize.sync({ alter: true });
        console.log("Models synced successfully!");
        console.log("All set to go!");
    } catch (err) {
        console.error("DB Connection Failed:", err);
    }
});