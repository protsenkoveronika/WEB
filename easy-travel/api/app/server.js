const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/usersRoutes.js');
const categoryRoutes = require('./routes/categoriesRoutes.js');
const offerRoutes = require('./routes/offersRoutes.js');
const orderRoutes = require('./routes/ordersRoutes.js');
const locationRoutes = require('./routes/locationsRoutes.js');

const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", offerRoutes);
app.use("/api", orderRoutes);
app.use("/api", locationRoutes);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT} or http://127.0.0.1:${PORT}.`);
});